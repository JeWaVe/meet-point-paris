import { stations, connections } from '../data/stations';
import type { Station } from '../data/stations';
import { gtfsSegmentTimes, gtfsTransferTimes } from '../data/gtfs-times';

interface GraphNode {
  neighbors: Map<string, number>; // stationId -> time in minutes
}

// Build adjacency list graph
const graph = new Map<string, GraphNode>();

for (const station of stations) {
  graph.set(station.id, { neighbors: new Map() });
}

for (const conn of connections) {
  const fromNode = graph.get(conn.from);
  const toNode = graph.get(conn.to);
  if (fromNode && toNode) {
    // Use GTFS time if available, otherwise fall back to static estimate
    const gtfsTime = gtfsSegmentTimes[`${conn.from}|${conn.to}`];
    const gtfsTransfer = gtfsTransferTimes[`${conn.from}|${conn.to}`];
    const time = gtfsTime ?? gtfsTransfer ?? conn.time;

    const existing = fromNode.neighbors.get(conn.to);
    if (!existing || time < existing) {
      fromNode.neighbors.set(conn.to, time);
    }

    const gtfsTimeRev = gtfsSegmentTimes[`${conn.to}|${conn.from}`];
    const gtfsTransferRev = gtfsTransferTimes[`${conn.to}|${conn.from}`];
    const timeRev = gtfsTimeRev ?? gtfsTransferRev ?? conn.time;

    const existingReverse = toNode.neighbors.get(conn.from);
    if (!existingReverse || timeRev < existingReverse) {
      toNode.neighbors.set(conn.from, timeRev);
    }
  }
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

// Find N nearest stations to a point
function findNearestStations(lat: number, lng: number, n: number = 3): { station: Station; walkTime: number }[] {
  const distances = stations.map(s => ({
    station: s,
    dist: haversineDistance(lat, lng, s.lat, s.lng),
  }));
  distances.sort((a, b) => a.dist - b.dist);
  return distances.slice(0, n).map(d => ({
    station: d.station,
    walkTime: walkingTime(d.dist),
  }));
}

// Dijkstra from a single source station - returns times to ALL stations
function dijkstraFromStation(sourceId: string): Map<string, number> {
  const dist = new Map<string, number>();
  const visited = new Set<string>();

  // Simple priority queue using sorted array (good enough for ~300 stations)
  const pq: { id: string; time: number }[] = [];

  dist.set(sourceId, 0);
  pq.push({ id: sourceId, time: 0 });

  while (pq.length > 0) {
    // Find min
    let minIdx = 0;
    for (let i = 1; i < pq.length; i++) {
      if (pq[i].time < pq[minIdx].time) minIdx = i;
    }
    const current = pq[minIdx];
    pq.splice(minIdx, 1);

    if (visited.has(current.id)) continue;
    visited.add(current.id);

    const node = graph.get(current.id);
    if (!node) continue;

    for (const [neighborId, edgeTime] of node.neighbors) {
      if (visited.has(neighborId)) continue;
      const newDist = current.time + edgeTime;
      const oldDist = dist.get(neighborId);
      if (oldDist === undefined || newDist < oldDist) {
        dist.set(neighborId, newDist);
        pq.push({ id: neighborId, time: newDist });
      }
    }
  }

  return dist;
}

// Cache Dijkstra results
const dijkstraCache = new Map<string, Map<string, number>>();

function getDijkstra(stationId: string): Map<string, number> {
  if (!dijkstraCache.has(stationId)) {
    dijkstraCache.set(stationId, dijkstraFromStation(stationId));
  }
  return dijkstraCache.get(stationId)!;
}

// Cycling time in minutes (~15 km/h, with 1.3x detour factor for urban streets)
function cyclingTime(distKm: number): number {
  return (distKm * 1.3 / 15) * 60;
}

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
    // Skip if walking to station takes too long
    if (from.walkTime > 20) continue;

    const dijkstra = getDijkstra(from.station.id);

    for (const to of nearTo) {
      if (to.walkTime > 20) continue;

      const transitTime = dijkstra.get(to.station.id);
      if (transitTime !== undefined) {
        const totalTime = from.walkTime + transitTime + to.walkTime;
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
