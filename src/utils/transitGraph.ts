import { stations, connections } from '../data/stations';
import type { Station } from '../data/stations';
import { gtfsSegmentTimes, gtfsTransferTimes } from '../data/gtfs-times';

// === Index-based graph for performance ===

// Map station IDs to dense indices
const stationIdToIndex = new Map<string, number>();
const stationByIndex: Station[] = [];
for (let i = 0; i < stations.length; i++) {
  stationIdToIndex.set(stations[i].id, i);
  stationByIndex[i] = stations[i];
}
const N = stations.length;

// Wait time penalty added to transfers (average wait for connecting train)
const TRANSFER_WAIT_PENALTY = 2; // minutes
// Dwell time at each intermediate station (doors open, not included in GTFS departure→arrival times)
const DWELL_TIME = 0.5; // minutes (~30 seconds per stop)

// Adjacency list using arrays (index-based)
const adjList: { to: number; time: number }[][] = new Array(N);
for (let i = 0; i < N; i++) adjList[i] = [];

for (const conn of connections) {
  const fromIdx = stationIdToIndex.get(conn.from);
  const toIdx = stationIdToIndex.get(conn.to);
  if (fromIdx === undefined || toIdx === undefined) continue;

  const gtfsTime = gtfsSegmentTimes[`${conn.from}|${conn.to}`];
  const gtfsTransfer = gtfsTransferTimes[`${conn.from}|${conn.to}`];
  // Segment edges get dwell time, transfer edges get wait penalty
  const isTransfer = gtfsTime === undefined && gtfsTransfer !== undefined;
  const isSegment = gtfsTime !== undefined;
  const time = (gtfsTime ?? gtfsTransfer ?? conn.time)
    + (isTransfer ? TRANSFER_WAIT_PENALTY : 0)
    + (isSegment ? DWELL_TIME : 0);

  const gtfsTimeRev = gtfsSegmentTimes[`${conn.to}|${conn.from}`];
  const gtfsTransferRev = gtfsTransferTimes[`${conn.to}|${conn.from}`];
  const isTransferRev = gtfsTimeRev === undefined && gtfsTransferRev !== undefined;
  const isSegmentRev = gtfsTimeRev !== undefined;
  const timeRev = (gtfsTimeRev ?? gtfsTransferRev ?? conn.time)
    + (isTransferRev ? TRANSFER_WAIT_PENALTY : 0)
    + (isSegmentRev ? DWELL_TIME : 0);

  adjList[fromIdx].push({ to: toIdx, time });
  adjList[toIdx].push({ to: fromIdx, time: timeRev });
}

// Deduplicate adjacency lists (keep shortest edge per neighbor)
for (let i = 0; i < N; i++) {
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

// === All-pairs shortest paths (precomputed at module load) ===

// Flat Float32Array: allPairs[from * N + to] = time in minutes (Infinity if unreachable)
const allPairs = new Float32Array(N * N);
allPairs.fill(Infinity);

function dijkstraFromIndex(source: number) {
  const dist = new Float32Array(N);
  dist.fill(Infinity);
  dist[source] = 0;
  const visited = new Uint8Array(N);
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

  // Write row into allPairs
  const offset = source * N;
  for (let j = 0; j < N; j++) {
    allPairs[offset + j] = dist[j];
  }
}

// Precompute all-pairs at module init
for (let i = 0; i < N; i++) {
  dijkstraFromIndex(i);
}

// === Spatial grid for fast nearest-station lookup ===

// Paris area roughly: lat [48.7, 49.0], lng [2.1, 2.6]
const SPATIAL_LAT_MIN = 48.7;
const SPATIAL_LNG_MIN = 2.1;
const SPATIAL_LAT_MAX = 49.0;
const SPATIAL_LNG_MAX = 2.6;
const SPATIAL_CELLS = 30; // 30x30 grid
const SPATIAL_LAT_STEP = (SPATIAL_LAT_MAX - SPATIAL_LAT_MIN) / SPATIAL_CELLS;
const SPATIAL_LNG_STEP = (SPATIAL_LNG_MAX - SPATIAL_LNG_MIN) / SPATIAL_CELLS;

// Each cell contains indices of stations in that cell and neighbors
const spatialGrid: number[][] = new Array(SPATIAL_CELLS * SPATIAL_CELLS);
for (let i = 0; i < spatialGrid.length; i++) spatialGrid[i] = [];

function spatialCellIdx(lat: number, lng: number): { row: number; col: number } {
  const row = Math.max(0, Math.min(SPATIAL_CELLS - 1, Math.floor((lat - SPATIAL_LAT_MIN) / SPATIAL_LAT_STEP)));
  const col = Math.max(0, Math.min(SPATIAL_CELLS - 1, Math.floor((lng - SPATIAL_LNG_MIN) / SPATIAL_LNG_STEP)));
  return { row, col };
}

// Populate spatial grid
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

// Walking time in minutes (5 km/h)
function walkingTime(distKm: number): number {
  return (distKm / 5) * 60;
}

// Cycling time in minutes (~15 km/h, with 1.3x detour factor for urban streets)
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

  // Search expanding rings until we have enough candidates
  let candidates: { idx: number; dist: number }[] = [];

  for (let radius = 0; radius <= SPATIAL_CELLS; radius++) {
    for (let dr = -radius; dr <= radius; dr++) {
      for (let dc = -radius; dc <= radius; dc++) {
        // Only process cells on the border of this ring (skip inner cells already processed)
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
    // If we have enough candidates and the closest station in the next ring would be
    // farther than our nth-best, we can stop
    if (candidates.length >= n) {
      candidates.sort((a, b) => a.dist - b.dist);
      const nthBest = candidates[n - 1].dist;
      // Minimum distance to next ring border (conservative)
      const nextRingMinDist = radius * Math.min(SPATIAL_LAT_STEP, SPATIAL_LNG_STEP) * 111; // ~111 km per degree
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

// Initial boarding penalty: time to enter station + average wait for first train
const BOARDING_PENALTY = 2; // minutes

// Calculate travel time from point A to point B using transit (and optionally bike)
export function travelTime(fromLat: number, fromLng: number, toLat: number, toLng: number, hasBike: boolean = false): number {
  // Direct walking distance
  const directDist = haversineDistance(fromLat, fromLng, toLat, toLng);
  const directWalk = walkingTime(directDist);

  let bestTime = directWalk; // Walking is always an option

  // Bike is an alternative if available
  if (hasBike) {
    const bikeTime = cyclingTime(directDist);
    if (bikeTime < bestTime) bestTime = bikeTime;
  }

  // Always consider transit even for short distances
  const nearFrom = findNearestStations(fromLat, fromLng, 3);
  const nearTo = findNearestStations(toLat, toLng, 3);

  for (const from of nearFrom) {
    if (from.walkTime > 20) continue;
    for (const to of nearTo) {
      if (to.walkTime > 20) continue;
      const transitTime = allPairs[from.stationIdx * N + to.stationIdx];
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
// Used by heatmap where the from-point is fixed across many grid cells
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
      const transitTime = allPairs[from.stationIdx * N + to.stationIdx];
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
