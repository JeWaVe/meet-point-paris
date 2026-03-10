import { stations, connections } from '../data/stations';
import type { Station } from '../data/stations';
import { lines } from '../data/lines';
import { gtfsSegmentTimes, gtfsTransferTimes } from '../data/gtfs-times';

// === Station indexing ===

const stationIdToIndex = new Map<string, number>();
const stationByIndex: Station[] = [];
for (let i = 0; i < stations.length; i++) {
  stationIdToIndex.set(stations[i].id, i);
  stationByIndex[i] = stations[i];
}
const N = stations.length;

// === Line-aware expanded graph ===
// Each node = (station, line) to model line-switching costs at shared stations

// Timing constants
const DWELL_TIME = 0.5;              // seconds at each stop (doors open)
const INTRA_STATION_TRANSFER = 4;    // same station ID, different line (walk + wait)
const INTER_STATION_TRANSFER_WAIT = 2; // different station IDs (added on top of GTFS walk time)
const BOARDING_PENALTY = 2;          // entering transit (walk to platform + wait)

// Step 1: Determine which lines each station is on (from line branches)
const stationLineSet: Set<string>[] = new Array(N);
for (let i = 0; i < N; i++) stationLineSet[i] = new Set();

for (const line of lines) {
  for (const branch of line.branches) {
    for (const stationId of branch) {
      const si = stationIdToIndex.get(stationId);
      if (si !== undefined) stationLineSet[si].add(line.id);
    }
  }
}

// Step 2: Create expanded nodes (station, line) pairs
const expandedNodes: { stationIdx: number; lineId: string }[] = [];
const expandedIndex = new Map<string, number>(); // "stationIdx|lineId" -> expandedIdx
const stationExpandedNodes: number[][] = new Array(N);

for (let si = 0; si < N; si++) {
  const lineSet = stationLineSet[si];
  const indices: number[] = [];
  if (lineSet.size === 0) {
    // Station not on any line (shouldn't happen but handle gracefully)
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
  stationExpandedNodes[si] = indices;
}

const EN = expandedNodes.length;

// Default segment time by line type (fallback when no GTFS data)
function defaultSegmentTime(lineId: string): number {
  const line = lines.find(l => l.id === lineId);
  if (!line) return 2;
  return line.type === 'rer' ? 3 : 2;
}

// Step 3: Build expanded adjacency list
const adjList: { to: number; time: number }[][] = new Array(EN);
for (let i = 0; i < EN; i++) adjList[i] = [];

// 3a: Segment edges from line branches (same line)
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
      const time = (gtfsTime ?? defaultSegmentTime(line.id)) + DWELL_TIME;

      const gtfsTimeRev = gtfsSegmentTimes[`${toId}|${fromId}`];
      const timeRev = (gtfsTimeRev ?? defaultSegmentTime(line.id)) + DWELL_TIME;

      adjList[fromEi].push({ to: toEi, time });
      adjList[toEi].push({ to: fromEi, time: timeRev });
    }
  }
}

// 3b: Intra-station transfers (same station ID, different lines)
for (let si = 0; si < N; si++) {
  const eis = stationExpandedNodes[si];
  if (eis.length <= 1) continue;
  for (let i = 0; i < eis.length; i++) {
    for (let j = i + 1; j < eis.length; j++) {
      adjList[eis[i]].push({ to: eis[j], time: INTRA_STATION_TRANSFER });
      adjList[eis[j]].push({ to: eis[i], time: INTRA_STATION_TRANSFER });
    }
  }
}

// 3c: Inter-station transfers (different station IDs — from buildTransfers)
// Build set of segment pairs to distinguish transfers from segments
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
  // Skip segment edges (already handled from line branches)
  if (segmentPairs.has(`${conn.from}|${conn.to}`)) continue;

  const fromSi = stationIdToIndex.get(conn.from);
  const toSi = stationIdToIndex.get(conn.to);
  if (fromSi === undefined || toSi === undefined) continue;

  const gtfsTransfer = gtfsTransferTimes[`${conn.from}|${conn.to}`];
  const time = (gtfsTransfer ?? conn.time) + INTER_STATION_TRANSFER_WAIT;

  const gtfsTransferRev = gtfsTransferTimes[`${conn.to}|${conn.from}`];
  const timeRev = (gtfsTransferRev ?? conn.time) + INTER_STATION_TRANSFER_WAIT;

  // Connect all expanded nodes at source to all at destination
  const fromEis = stationExpandedNodes[fromSi];
  const toEis = stationExpandedNodes[toSi];
  for (const fei of fromEis) {
    for (const tei of toEis) {
      adjList[fei].push({ to: tei, time });
      adjList[tei].push({ to: fei, time: timeRev });
    }
  }
}

// Deduplicate adjacency lists (keep shortest edge per neighbor)
for (let i = 0; i < EN; i++) {
  const best = new Map<number, number>();
  for (const e of adjList[i]) {
    const existing = best.get(e.to);
    if (existing === undefined || e.time < existing) {
      best.set(e.to, e.time);
    }
  }
  adjList[i] = Array.from(best, ([to, time]) => ({ to, time }));
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

// === All-pairs shortest paths on expanded graph ===

const allPairs = new Float32Array(EN * EN);
allPairs.fill(Infinity);

function dijkstraFromIndex(source: number) {
  const dist = new Float32Array(EN);
  dist.fill(Infinity);
  dist[source] = 0;
  const visited = new Uint8Array(EN);
  const pq = new MinHeap();
  pq.push(source, 0);

  while (pq.size > 0) {
    const cur = pq.pop()!;
    if (visited[cur.node]) continue;
    visited[cur.node] = 1;

    for (const edge of adjList[cur.node]) {
      if (visited[edge.to]) continue;
      const newDist = cur.dist + edge.time;
      if (newDist < dist[edge.to]) {
        dist[edge.to] = newDist;
        pq.push(edge.to, newDist);
      }
    }
  }

  const offset = source * EN;
  for (let j = 0; j < EN; j++) {
    allPairs[offset + j] = dist[j];
  }
}

// Precompute all-pairs at module init
for (let i = 0; i < EN; i++) {
  dijkstraFromIndex(i);
}

// Best transit time between two original stations (min over all line-node pairs)
function transitTimeBetween(fromStationIdx: number, toStationIdx: number): number {
  let best = Infinity;
  const fromEis = stationExpandedNodes[fromStationIdx];
  const toEis = stationExpandedNodes[toStationIdx];
  for (const fei of fromEis) {
    const offset = fei * EN;
    for (const tei of toEis) {
      const t = allPairs[offset + tei];
      if (t < best) best = t;
    }
  }
  return best;
}

// === Spatial grid for fast nearest-station lookup ===

const SPATIAL_LAT_MIN = 48.7;
const SPATIAL_LNG_MIN = 2.1;
const SPATIAL_LAT_MAX = 49.0;
const SPATIAL_LNG_MAX = 2.6;
const SPATIAL_CELLS = 30;
const SPATIAL_LAT_STEP = (SPATIAL_LAT_MAX - SPATIAL_LAT_MIN) / SPATIAL_CELLS;
const SPATIAL_LNG_STEP = (SPATIAL_LNG_MAX - SPATIAL_LNG_MIN) / SPATIAL_CELLS;

const spatialGrid: number[][] = new Array(SPATIAL_CELLS * SPATIAL_CELLS);
for (let i = 0; i < spatialGrid.length; i++) spatialGrid[i] = [];

function spatialCellIdx(lat: number, lng: number): { row: number; col: number } {
  const row = Math.max(0, Math.min(SPATIAL_CELLS - 1, Math.floor((lat - SPATIAL_LAT_MIN) / SPATIAL_LAT_STEP)));
  const col = Math.max(0, Math.min(SPATIAL_CELLS - 1, Math.floor((lng - SPATIAL_LNG_MIN) / SPATIAL_LNG_STEP)));
  return { row, col };
}

for (let i = 0; i < N; i++) {
  const { row, col } = spatialCellIdx(stations[i].lat, stations[i].lng);
  spatialGrid[row * SPATIAL_CELLS + col].push(i);
}

// Station index for fast lookup
const stationMap = new Map<string, Station>();
for (const s of stations) {
  stationMap.set(s.id, s);
}

// Haversine distance in km
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

export interface NearStation {
  stationIdx: number;
  station: Station;
  walkTime: number;
}

// Find N nearest stations using spatial grid
export function findNearestStations(lat: number, lng: number, n: number = 3): NearStation[] {
  const { row, col } = spatialCellIdx(lat, lng);
  let candidates: { idx: number; dist: number }[] = [];

  for (let radius = 0; radius <= SPATIAL_CELLS; radius++) {
    for (let dr = -radius; dr <= radius; dr++) {
      for (let dc = -radius; dc <= radius; dc++) {
        if (radius > 0 && Math.abs(dr) < radius && Math.abs(dc) < radius) continue;
        const r = row + dr;
        const c = col + dc;
        if (r < 0 || r >= SPATIAL_CELLS || c < 0 || c >= SPATIAL_CELLS) continue;
        for (const idx of spatialGrid[r * SPATIAL_CELLS + c]) {
          const dist = haversineDistance(lat, lng, stationByIndex[idx].lat, stationByIndex[idx].lng);
          candidates.push({ idx, dist });
        }
      }
    }
    if (candidates.length >= n) {
      candidates.sort((a, b) => a.dist - b.dist);
      const nthBest = candidates[n - 1].dist;
      const nextRingMinDist = radius * Math.min(SPATIAL_LAT_STEP, SPATIAL_LNG_STEP) * 111;
      if (nextRingMinDist > nthBest) break;
    }
  }

  if (candidates.length > n) {
    candidates.sort((a, b) => a.dist - b.dist);
  }
  return candidates.slice(0, n).map(c => ({
    stationIdx: c.idx,
    station: stationByIndex[c.idx],
    walkTime: walkingTime(c.dist),
  }));
}

// Calculate travel time from point A to point B using transit (and optionally bike)
export function travelTime(fromLat: number, fromLng: number, toLat: number, toLng: number, hasBike: boolean = false): number {
  const directDist = haversineDistance(fromLat, fromLng, toLat, toLng);
  const directWalk = walkingTime(directDist);

  let bestTime = directWalk;

  if (hasBike) {
    const bikeTime = cyclingTime(directDist);
    if (bikeTime < bestTime) bestTime = bikeTime;
  }

  const nearFrom = findNearestStations(fromLat, fromLng, 3);
  const nearTo = findNearestStations(toLat, toLng, 3);

  for (const from of nearFrom) {
    if (from.walkTime > 20) continue;
    for (const to of nearTo) {
      if (to.walkTime > 20) continue;
      const transitTime = transitTimeBetween(from.stationIdx, to.stationIdx);
      if (transitTime < Infinity) {
        const totalTime = from.walkTime + BOARDING_PENALTY + transitTime + to.walkTime;
        if (totalTime < bestTime) {
          bestTime = totalTime;
        }
      }
    }
  }

  return bestTime;
}

// Optimized travel time using precomputed nearest stations for the "from" side
export function travelTimeFromCached(
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

  const nearTo = findNearestStations(toLat, toLng, 3);

  for (const from of fromNearStations) {
    if (from.walkTime > 20) continue;
    for (const to of nearTo) {
      if (to.walkTime > 20) continue;
      const transitTime = transitTimeBetween(from.stationIdx, to.stationIdx);
      if (transitTime < Infinity) {
        const totalTime = from.walkTime + BOARDING_PENALTY + transitTime + to.walkTime;
        if (totalTime < bestTime) {
          bestTime = totalTime;
        }
      }
    }
  }

  return bestTime;
}

// Get all stations (for display)
export function getAllStations(): Station[] {
  return stations;
}

export { stationMap };
