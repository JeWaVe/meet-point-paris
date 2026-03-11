import type { Station, Connection } from '../data/types';
import type { LineDefinition } from '../data/types';

// === Types ===

export interface CityTransitData {
  stations: Station[];
  connections: Connection[];
  lines: LineDefinition[];
  gtfsSegmentTimes: Record<string, number>;
  gtfsTransferTimes: Record<string, number>;
}

export interface NearStation {
  stationIdx: number;
  station: Station;
  walkTime: number;
}

// === Pure utility functions ===

export function haversineDistance(lat1: number, lng1: number, lat2: number, lng2: number): number {
  const R = 6371;
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLng = (lng2 - lng1) * Math.PI / 180;
  const a = Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLng / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

function walkingTime(distKm: number): number {
  return (distKm * 1.3 / 5) * 60;
}

function cyclingTime(distKm: number): number {
  return (distKm * 1.5 / 15) * 60;
}

// === Binary heap priority queue ===

class MinHeap {
  private heap: { node: number; dist: number }[] = [];

  push(node: number, dist: number) {
    this.heap.push({ node, dist });
    this._bubbleUp(this.heap.length - 1);
  }

  pop(): { node: number; dist: number } | undefined {
    const top = this.heap[0];
    const last = this.heap.pop();
    if (this.heap.length > 0 && last) {
      this.heap[0] = last;
      this._sinkDown(0);
    }
    return top;
  }

  get size() { return this.heap.length; }

  private _bubbleUp(i: number) {
    const heap = this.heap;
    while (i > 0) {
      const parent = (i - 1) >> 1;
      if (heap[i].dist >= heap[parent].dist) break;
      [heap[i], heap[parent]] = [heap[parent], heap[i]];
      i = parent;
    }
  }

  private _sinkDown(i: number) {
    const heap = this.heap;
    const len = heap.length;
    while (true) {
      let smallest = i;
      const left = 2 * i + 1;
      const right = 2 * i + 2;
      if (left < len && heap[left].dist < heap[smallest].dist) smallest = left;
      if (right < len && heap[right].dist < heap[smallest].dist) smallest = right;
      if (smallest === i) break;
      [heap[i], heap[smallest]] = [heap[smallest], heap[i]];
      i = smallest;
    }
  }
}

// === TransitGraph class ===

export class TransitGraph {
  private readonly stationByIndex: Station[];
  private readonly stationExpandedNodes: number[][];
  private readonly adjList: { to: number; time: number }[][];
  private readonly allPairs: Float32Array;
  private readonly EN: number;
  private readonly N: number;

  // Spatial grid
  private readonly spatialGrid: number[][];
  private readonly spatialLatMin: number;
  private readonly spatialLngMin: number;
  private readonly spatialLatStep: number;
  private readonly spatialLngStep: number;
  private readonly SPATIAL_CELLS = 30;

  readonly stations: Station[];
  readonly lines: LineDefinition[];
  readonly stationMap: Map<string, Station>;

  // Timing constants
  private readonly DWELL_TIME = 0.5;
  private readonly INTRA_STATION_TRANSFER = 4;
  private readonly INTER_STATION_TRANSFER_WAIT = 2;
  private readonly BOARDING_PENALTY = 2;

  constructor(data: CityTransitData) {
    const { stations, connections, lines, gtfsSegmentTimes, gtfsTransferTimes } = data;

    this.stations = stations;
    this.lines = lines;
    this.N = stations.length;

    // Station map for lookups
    this.stationMap = new Map<string, Station>();
    for (const s of stations) {
      this.stationMap.set(s.id, s);
    }

    // Station indexing
    const stationIdToIndex = new Map<string, number>();
    this.stationByIndex = [];
    for (let i = 0; i < stations.length; i++) {
      stationIdToIndex.set(stations[i].id, i);
      this.stationByIndex[i] = stations[i];
    }

    // Determine which lines each station is on
    const stationLineSet: Set<string>[] = new Array(this.N);
    for (let i = 0; i < this.N; i++) stationLineSet[i] = new Set();

    for (const line of lines) {
      for (const branch of line.branches) {
        for (const stationId of branch) {
          const si = stationIdToIndex.get(stationId);
          if (si !== undefined) stationLineSet[si].add(line.id);
        }
      }
    }

    // Create expanded nodes (station, line) pairs
    const expandedNodes: { stationIdx: number; lineId: string }[] = [];
    const expandedIndex = new Map<string, number>();
    this.stationExpandedNodes = new Array(this.N);

    for (let si = 0; si < this.N; si++) {
      const lineSet = stationLineSet[si];
      const indices: number[] = [];
      if (lineSet.size === 0) {
        const ei = expandedNodes.length;
        expandedNodes.push({ stationIdx: si, lineId: '_none' });
        expandedIndex.set(`${si}|_none`, ei);
        indices.push(ei);
      } else {
        for (const lineId of lineSet) {
          const ei = expandedNodes.length;
          expandedNodes.push({ stationIdx: si, lineId });
          expandedIndex.set(`${si}|${lineId}`, ei);
          indices.push(ei);
        }
      }
      this.stationExpandedNodes[si] = indices;
    }

    this.EN = expandedNodes.length;

    // Default segment time by line type
    const defaultSegmentTime = (lineId: string): number => {
      const line = lines.find(l => l.id === lineId);
      if (!line) return 2;
      return line.type === 'rer' ? 3 : 2;
    };

    // Build expanded adjacency list
    this.adjList = new Array(this.EN);
    for (let i = 0; i < this.EN; i++) this.adjList[i] = [];

    // Segment edges from line branches
    for (const line of lines) {
      for (const branch of line.branches) {
        for (let i = 0; i < branch.length - 1; i++) {
          const fromSi = stationIdToIndex.get(branch[i]);
          const toSi = stationIdToIndex.get(branch[i + 1]);
          if (fromSi === undefined || toSi === undefined) continue;

          const fromEi = expandedIndex.get(`${fromSi}|${line.id}`);
          const toEi = expandedIndex.get(`${toSi}|${line.id}`);
          if (fromEi === undefined || toEi === undefined) continue;

          const fromId = branch[i];
          const toId = branch[i + 1];

          const gtfsTime = gtfsSegmentTimes[`${fromId}|${toId}`];
          const time = (gtfsTime ?? defaultSegmentTime(line.id)) + this.DWELL_TIME;

          const gtfsTimeRev = gtfsSegmentTimes[`${toId}|${fromId}`];
          const timeRev = (gtfsTimeRev ?? defaultSegmentTime(line.id)) + this.DWELL_TIME;

          this.adjList[fromEi].push({ to: toEi, time });
          this.adjList[toEi].push({ to: fromEi, time: timeRev });
        }
      }
    }

    // Intra-station transfers
    for (let si = 0; si < this.N; si++) {
      const eis = this.stationExpandedNodes[si];
      if (eis.length <= 1) continue;
      for (let i = 0; i < eis.length; i++) {
        for (let j = i + 1; j < eis.length; j++) {
          this.adjList[eis[i]].push({ to: eis[j], time: this.INTRA_STATION_TRANSFER });
          this.adjList[eis[j]].push({ to: eis[i], time: this.INTRA_STATION_TRANSFER });
        }
      }
    }

    // Inter-station transfers
    const segmentPairs = new Set<string>();
    for (const line of lines) {
      for (const branch of line.branches) {
        for (let i = 0; i < branch.length - 1; i++) {
          segmentPairs.add(`${branch[i]}|${branch[i + 1]}`);
          segmentPairs.add(`${branch[i + 1]}|${branch[i]}`);
        }
      }
    }

    for (const conn of connections) {
      if (segmentPairs.has(`${conn.from}|${conn.to}`)) continue;

      const fromSi = stationIdToIndex.get(conn.from);
      const toSi = stationIdToIndex.get(conn.to);
      if (fromSi === undefined || toSi === undefined) continue;

      const gtfsTransfer = gtfsTransferTimes[`${conn.from}|${conn.to}`];
      const time = (gtfsTransfer ?? conn.time) + this.INTER_STATION_TRANSFER_WAIT;

      const gtfsTransferRev = gtfsTransferTimes[`${conn.to}|${conn.from}`];
      const timeRev = (gtfsTransferRev ?? conn.time) + this.INTER_STATION_TRANSFER_WAIT;

      const fromEis = this.stationExpandedNodes[fromSi];
      const toEis = this.stationExpandedNodes[toSi];
      for (const fei of fromEis) {
        for (const tei of toEis) {
          this.adjList[fei].push({ to: tei, time });
          this.adjList[tei].push({ to: fei, time: timeRev });
        }
      }
    }

    // Deduplicate adjacency lists
    for (let i = 0; i < this.EN; i++) {
      const best = new Map<number, number>();
      for (const e of this.adjList[i]) {
        const existing = best.get(e.to);
        if (existing === undefined || e.time < existing) {
          best.set(e.to, e.time);
        }
      }
      this.adjList[i] = Array.from(best, ([to, time]) => ({ to, time }));
    }

    // All-pairs shortest paths
    this.allPairs = new Float32Array(this.EN * this.EN);
    this.allPairs.fill(Infinity);

    for (let i = 0; i < this.EN; i++) {
      this.dijkstraFromIndex(i);
    }

    // Spatial grid — compute bounds from stations
    let latMin = Infinity, latMax = -Infinity, lngMin = Infinity, lngMax = -Infinity;
    for (const s of stations) {
      if (s.lat < latMin) latMin = s.lat;
      if (s.lat > latMax) latMax = s.lat;
      if (s.lng < lngMin) lngMin = s.lng;
      if (s.lng > lngMax) lngMax = s.lng;
    }
    // Add margin
    const latMargin = (latMax - latMin) * 0.1 || 0.05;
    const lngMargin = (lngMax - lngMin) * 0.1 || 0.05;
    this.spatialLatMin = latMin - latMargin;
    this.spatialLngMin = lngMin - lngMargin;
    const spatialLatMax = latMax + latMargin;
    const spatialLngMax = lngMax + lngMargin;
    this.spatialLatStep = (spatialLatMax - this.spatialLatMin) / this.SPATIAL_CELLS;
    this.spatialLngStep = (spatialLngMax - this.spatialLngMin) / this.SPATIAL_CELLS;

    this.spatialGrid = new Array(this.SPATIAL_CELLS * this.SPATIAL_CELLS);
    for (let i = 0; i < this.spatialGrid.length; i++) this.spatialGrid[i] = [];

    for (let i = 0; i < this.N; i++) {
      const { row, col } = this.spatialCellIdx(stations[i].lat, stations[i].lng);
      this.spatialGrid[row * this.SPATIAL_CELLS + col].push(i);
    }
  }

  private dijkstraFromIndex(source: number) {
    const dist = new Float32Array(this.EN);
    dist.fill(Infinity);
    dist[source] = 0;
    const visited = new Uint8Array(this.EN);
    const pq = new MinHeap();
    pq.push(source, 0);

    while (pq.size > 0) {
      const cur = pq.pop()!;
      if (visited[cur.node]) continue;
      visited[cur.node] = 1;

      for (const edge of this.adjList[cur.node]) {
        if (visited[edge.to]) continue;
        const newDist = cur.dist + edge.time;
        if (newDist < dist[edge.to]) {
          dist[edge.to] = newDist;
          pq.push(edge.to, newDist);
        }
      }
    }

    const offset = source * this.EN;
    for (let j = 0; j < this.EN; j++) {
      this.allPairs[offset + j] = dist[j];
    }
  }

  private transitTimeBetween(fromStationIdx: number, toStationIdx: number): number {
    let best = Infinity;
    const fromEis = this.stationExpandedNodes[fromStationIdx];
    const toEis = this.stationExpandedNodes[toStationIdx];
    for (const fei of fromEis) {
      const offset = fei * this.EN;
      for (const tei of toEis) {
        const t = this.allPairs[offset + tei];
        if (t < best) best = t;
      }
    }
    return best;
  }

  private spatialCellIdx(lat: number, lng: number): { row: number; col: number } {
    const row = Math.max(0, Math.min(this.SPATIAL_CELLS - 1, Math.floor((lat - this.spatialLatMin) / this.spatialLatStep)));
    const col = Math.max(0, Math.min(this.SPATIAL_CELLS - 1, Math.floor((lng - this.spatialLngMin) / this.spatialLngStep)));
    return { row, col };
  }

  findNearestStations(lat: number, lng: number, n: number = 3): NearStation[] {
    const { row, col } = this.spatialCellIdx(lat, lng);
    let candidates: { idx: number; dist: number }[] = [];

    for (let radius = 0; radius <= this.SPATIAL_CELLS; radius++) {
      for (let dr = -radius; dr <= radius; dr++) {
        for (let dc = -radius; dc <= radius; dc++) {
          if (radius > 0 && Math.abs(dr) < radius && Math.abs(dc) < radius) continue;
          const r = row + dr;
          const c = col + dc;
          if (r < 0 || r >= this.SPATIAL_CELLS || c < 0 || c >= this.SPATIAL_CELLS) continue;
          for (const idx of this.spatialGrid[r * this.SPATIAL_CELLS + c]) {
            const dist = haversineDistance(lat, lng, this.stationByIndex[idx].lat, this.stationByIndex[idx].lng);
            candidates.push({ idx, dist });
          }
        }
      }
      if (candidates.length >= n) {
        candidates.sort((a, b) => a.dist - b.dist);
        const nthBest = candidates[n - 1].dist;
        const nextRingMinDist = radius * Math.min(this.spatialLatStep, this.spatialLngStep) * 111;
        if (nextRingMinDist > nthBest) break;
      }
    }

    if (candidates.length > n) {
      candidates.sort((a, b) => a.dist - b.dist);
    }
    return candidates.slice(0, n).map(c => ({
      stationIdx: c.idx,
      station: this.stationByIndex[c.idx],
      walkTime: walkingTime(c.dist),
    }));
  }

  travelTime(fromLat: number, fromLng: number, toLat: number, toLng: number, hasBike: boolean = false): number {
    const directDist = haversineDistance(fromLat, fromLng, toLat, toLng);
    const directWalk = walkingTime(directDist);

    let bestTime = directWalk;

    if (hasBike) {
      const bikeTime = cyclingTime(directDist);
      if (bikeTime < bestTime) bestTime = bikeTime;
    }

    const nearFrom = this.findNearestStations(fromLat, fromLng, 3);
    const nearTo = this.findNearestStations(toLat, toLng, 3);

    for (const from of nearFrom) {
      if (from.walkTime > 20) continue;
      for (const to of nearTo) {
        if (to.walkTime > 20) continue;
        const transitTime = this.transitTimeBetween(from.stationIdx, to.stationIdx);
        if (transitTime < Infinity) {
          const totalTime = from.walkTime + this.BOARDING_PENALTY + transitTime + to.walkTime;
          if (totalTime < bestTime) {
            bestTime = totalTime;
          }
        }
      }
    }

    return bestTime;
  }

  travelTimeFromCached(
    fromNearStations: NearStation[],
    fromLat: number, fromLng: number,
    toLat: number, toLng: number,
    hasBike: boolean = false
  ): number {
    const directDist = haversineDistance(fromLat, fromLng, toLat, toLng);
    const directWalk = walkingTime(directDist);

    let bestTime = directWalk;

    if (hasBike) {
      const bikeTime = cyclingTime(directDist);
      if (bikeTime < bestTime) bestTime = bikeTime;
    }

    const nearTo = this.findNearestStations(toLat, toLng, 3);

    for (const from of fromNearStations) {
      if (from.walkTime > 20) continue;
      for (const to of nearTo) {
        if (to.walkTime > 20) continue;
        const transitTime = this.transitTimeBetween(from.stationIdx, to.stationIdx);
        if (transitTime < Infinity) {
          const totalTime = from.walkTime + this.BOARDING_PENALTY + transitTime + to.walkTime;
          if (totalTime < bestTime) {
            bestTime = totalTime;
          }
        }
      }
    }

    return bestTime;
  }

  getAllStations(): Station[] {
    return this.stations;
  }
}
