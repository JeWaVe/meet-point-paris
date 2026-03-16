export interface AmenityGrid {
  latMin: number;
  lngMin: number;
  latStep: number;
  lngStep: number;
  rows: number;
  cols: number;
  data: Record<number, number>;
}

/** Returns the amenity count for the grid cell containing (lat, lng). O(1) lookup. */
export function getAmenityScore(grid: AmenityGrid, lat: number, lng: number): number {
  const i = Math.floor((lat - grid.latMin) / grid.latStep);
  const j = Math.floor((lng - grid.lngMin) / grid.lngStep);
  if (i < 0 || i >= grid.rows || j < 0 || j >= grid.cols) return 0;
  return grid.data[i * grid.cols + j] ?? 0;
}
