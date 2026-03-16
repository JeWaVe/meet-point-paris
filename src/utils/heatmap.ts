import type { TransitGraph, NearStation } from './transitGraph';
import type { AmenityGrid } from './amenities';
import { getAmenityScore } from './amenities';

export interface HeatmapPoint {
  lat: number;
  lng: number;
  time: number;
}

export interface HeatmapResult {
  points: HeatmapPoint[];
  grid: number[][]; // grid[i][j] = average time for cell (i,j)
  gridSize: number;
  bounds: { latMin: number; latMax: number; lngMin: number; lngMax: number };
  optimal: HeatmapPoint;
  minTime: number;
  maxTime: number;
}

export interface SelectedPoint {
  id: string;
  lat: number;
  lng: number;
  address: string;
  hasBike: boolean;
}

const GRID_SIZE = 80;

// Margin around selected points (in degrees)
const MARGIN_LAT = 0.04;
const MARGIN_LNG = 0.06;
// Minimum extent so the grid isn't too tiny
const MIN_EXTENT_LAT = 0.08;
const MIN_EXTENT_LNG = 0.12;

function computeBounds(keyPoints: { lat: number; lng: number }[]) {
  let latMin = Infinity, latMax = -Infinity, lngMin = Infinity, lngMax = -Infinity;
  for (const p of keyPoints) {
    if (p.lat < latMin) latMin = p.lat;
    if (p.lat > latMax) latMax = p.lat;
    if (p.lng < lngMin) lngMin = p.lng;
    if (p.lng > lngMax) lngMax = p.lng;
  }
  // Add margin
  latMin -= MARGIN_LAT;
  latMax += MARGIN_LAT;
  lngMin -= MARGIN_LNG;
  lngMax += MARGIN_LNG;
  // Enforce minimum extent
  const latCenter = (latMin + latMax) / 2;
  const lngCenter = (lngMin + lngMax) / 2;
  if (latMax - latMin < MIN_EXTENT_LAT) {
    latMin = latCenter - MIN_EXTENT_LAT / 2;
    latMax = latCenter + MIN_EXTENT_LAT / 2;
  }
  if (lngMax - lngMin < MIN_EXTENT_LNG) {
    lngMin = lngCenter - MIN_EXTENT_LNG / 2;
    lngMax = lngCenter + MIN_EXTENT_LNG / 2;
  }
  return { latMin, latMax, lngMin, lngMax };
}

interface CachedSelectedPoint {
  lat: number;
  lng: number;
  hasBike: boolean;
  nearStations: NearStation[];
}

function computeL2Cached(lat: number, lng: number, cachedPoints: CachedSelectedPoint[], graph: TransitGraph): number {
  let sumSquares = 0;
  for (const sp of cachedPoints) {
    const t = graph.travelTimeFromCached(sp.nearStations, sp.lat, sp.lng, lat, lng, sp.hasBike);
    sumSquares += t * t;
  }
  return Math.sqrt(sumSquares);
}

// Quick coarse pass to find approximate optimal point
const COARSE_SIZE = 30;
function findApproxOptimal(cachedPoints: CachedSelectedPoint[], selectedPoints: SelectedPoint[], graph: TransitGraph): { lat: number; lng: number } {
  const coarseBounds = computeBounds(selectedPoints);
  const latStep = (coarseBounds.latMax - coarseBounds.latMin) / COARSE_SIZE;
  const lngStep = (coarseBounds.lngMax - coarseBounds.lngMin) / COARSE_SIZE;
  let bestTime = Infinity;
  let bestLat = selectedPoints[0].lat;
  let bestLng = selectedPoints[0].lng;

  for (let i = 0; i < COARSE_SIZE; i++) {
    for (let j = 0; j < COARSE_SIZE; j++) {
      const lat = coarseBounds.latMin + (i + 0.5) * latStep;
      const lng = coarseBounds.lngMin + (j + 0.5) * lngStep;
      const t = computeL2Cached(lat, lng, cachedPoints, graph);
      if (t < bestTime) {
        bestTime = t;
        bestLat = lat;
        bestLng = lng;
      }
    }
  }
  return { lat: bestLat, lng: bestLng };
}

export function computeHeatmap(selectedPoints: SelectedPoint[], graph: TransitGraph): HeatmapResult {
  const defaultBounds = { latMin: 48.790, latMax: 48.930, lngMin: 2.220, lngMax: 2.470 };
  if (selectedPoints.length === 0) {
    return {
      points: [], grid: [], gridSize: GRID_SIZE, bounds: defaultBounds,
      optimal: { lat: 48.8566, lng: 2.3522, time: 0 }, minTime: 0, maxTime: 0,
    };
  }

  // Precompute nearest stations for each selected point (done once, reused for all grid cells)
  const cachedPoints: CachedSelectedPoint[] = selectedPoints.map(sp => ({
    lat: sp.lat,
    lng: sp.lng,
    hasBike: sp.hasBike,
    nearStations: graph.findNearestStations(sp.lat, sp.lng, 3),
  }));

  // 1. Find approximate optimal on coarse grid
  const approxOptimal = findApproxOptimal(cachedPoints, selectedPoints, graph);

  // 2. Compute bounds that include all selected points AND the optimal
  const bounds = computeBounds([...selectedPoints, approxOptimal]);
  const latStep = (bounds.latMax - bounds.latMin) / GRID_SIZE;
  const lngStep = (bounds.lngMax - bounds.lngMin) / GRID_SIZE;

  // 3. Compute full heatmap on fine grid
  const points: HeatmapPoint[] = [];
  const grid: number[][] = [];
  let minTime = Infinity;
  let maxTime = -Infinity;
  let optimal: HeatmapPoint = { lat: approxOptimal.lat, lng: approxOptimal.lng, time: Infinity };

  for (let i = 0; i < GRID_SIZE; i++) {
    grid[i] = [];
    for (let j = 0; j < GRID_SIZE; j++) {
      const lat = bounds.latMin + (i + 0.5) * latStep;
      const lng = bounds.lngMin + (j + 0.5) * lngStep;
      const avgTime = computeL2Cached(lat, lng, cachedPoints, graph);

      grid[i][j] = avgTime;
      points.push({ lat, lng, time: avgTime });

      if (avgTime < minTime) {
        minTime = avgTime;
        optimal = { lat, lng, time: avgTime };
      }
      if (avgTime > maxTime) {
        maxTime = avgTime;
      }
    }
  }

  return { points, grid, gridSize: GRID_SIZE, bounds, optimal, minTime, maxTime };
}

export interface CandidatePoint extends HeatmapPoint {
  amenityScore: number;
  combinedScore: number;
  rank: number;
}

function haversineKm(lat1: number, lng1: number, lat2: number, lng2: number): number {
  const R = 6371;
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLng = (lng2 - lng1) * Math.PI / 180;
  const a = Math.sin(dLat / 2) ** 2 + Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * Math.sin(dLng / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

/**
 * Extract top N spatially-distinct candidates from heatmap, ranked by
 * a mix of travel time (70%) and amenity density (30%).
 */
export function extractTopCandidates(
  result: HeatmapResult,
  amenityGrid: AmenityGrid | null,
  count: number = 3,
  minDistKm: number = 0.5,
): CandidatePoint[] {
  if (result.points.length === 0) return [];

  // 1. Sort by time ascending
  const sorted = [...result.points].sort((a, b) => a.time - b.time);

  // 2. Pick spatially-distinct pool (up to 10)
  const pool: HeatmapPoint[] = [];
  for (const p of sorted) {
    if (pool.length >= 10) break;
    const tooClose = pool.some(q => haversineKm(p.lat, p.lng, q.lat, q.lng) < minDistKm);
    if (!tooClose) pool.push(p);
  }

  // 3. Score with amenity data
  const timeRange = result.maxTime - result.minTime || 1;
  let maxAmenity = 1;
  const scored = pool.map(p => {
    const amenityScore = amenityGrid ? getAmenityScore(amenityGrid, p.lat, p.lng) : 0;
    if (amenityScore > maxAmenity) maxAmenity = amenityScore;
    return { ...p, amenityScore, combinedScore: 0, rank: 0 };
  });

  // Compute combined score (lower = better)
  for (const s of scored) {
    const normalizedTime = (s.time - result.minTime) / timeRange;
    const normalizedAmenity = amenityGrid ? s.amenityScore / maxAmenity : 0;
    s.combinedScore = 0.7 * normalizedTime + 0.3 * (1 - normalizedAmenity);
  }

  // 4. Sort by combined score, return top N
  scored.sort((a, b) => a.combinedScore - b.combinedScore);
  return scored.slice(0, count).map((s, i) => ({ ...s, rank: i + 1 }));
}
