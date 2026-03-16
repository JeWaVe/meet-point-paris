#!/usr/bin/env node
/**
 * Fetches restaurant/bar/cafe data from Overpass API (OpenStreetMap)
 * and generates amenity density grid files for each city.
 */

const cities = [
  { slug: 'paris', bounds: [[48.65, 1.9], [49.05, 2.8]] },
  { slug: 'toulouse', bounds: [[43.53, 1.33], [43.68, 1.52]] },
  { slug: 'marseille', bounds: [[43.23, 5.30], [43.36, 5.46]] },
  { slug: 'london', bounds: [[51.28, -0.65], [51.72, 0.35]] },
  { slug: 'new-york', bounds: [[40.47, -74.28], [40.93, -73.68]] },
];

const CELL_SIZE = 0.005; // ~500m
const OVERPASS_URL = 'https://overpass-api.de/api/interpreter';

async function fetchPOIs(south, west, north, east, retries = 3) {
  const query = `[out:json][timeout:120];(node["amenity"~"^(restaurant|bar|cafe)$"](${south},${west},${north},${east}););out center;`;
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      const res = await fetch(OVERPASS_URL, {
        method: 'POST',
        body: `data=${encodeURIComponent(query)}`,
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      });
      if (!res.ok) {
        if (attempt < retries && (res.status === 429 || res.status >= 500)) {
          console.log(`  Attempt ${attempt} failed (${res.status}), retrying in 15s...`);
          await new Promise(r => setTimeout(r, 15000));
          continue;
        }
        throw new Error(`Overpass API error: ${res.status} ${res.statusText}`);
      }
      const json = await res.json();
      return json.elements;
    } catch (err) {
      if (attempt < retries && err.message.includes('fetch')) {
        console.log(`  Attempt ${attempt} failed (${err.message}), retrying in 15s...`);
        await new Promise(r => setTimeout(r, 15000));
        continue;
      }
      throw err;
    }
  }
}

function buildGrid(pois, south, west, north, east) {
  const latMin = south;
  const lngMin = west;
  const rows = Math.ceil((north - south) / CELL_SIZE);
  const cols = Math.ceil((east - west) / CELL_SIZE);
  const data = {};

  for (const poi of pois) {
    const lat = poi.lat;
    const lng = poi.lon;
    const i = Math.floor((lat - latMin) / CELL_SIZE);
    const j = Math.floor((lng - lngMin) / CELL_SIZE);
    if (i < 0 || i >= rows || j < 0 || j >= cols) continue;
    const idx = i * cols + j;
    data[idx] = (data[idx] || 0) + 1;
  }

  return { latMin, lngMin, latStep: CELL_SIZE, lngStep: CELL_SIZE, rows, cols, data };
}

function generateTS(grid) {
  const dataEntries = Object.entries(grid.data)
    .sort(([a], [b]) => Number(a) - Number(b))
    .map(([k, v]) => `${k}:${v}`)
    .join(',');

  return `import type { AmenityGrid } from '../../../utils/amenities';

export const amenityGrid: AmenityGrid = {
  latMin: ${grid.latMin},
  lngMin: ${grid.lngMin},
  latStep: ${grid.latStep},
  lngStep: ${grid.lngStep},
  rows: ${grid.rows},
  cols: ${grid.cols},
  data: {${dataEntries}},
};
`;
}

import { writeFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

async function main() {
  const skipSlugs = new Set(process.argv.slice(2).filter(a => a.startsWith('--skip=')).map(a => a.split('=')[1]));
  for (let ci = 0; ci < cities.length; ci++) {
    const city = cities[ci];
    if (skipSlugs.has(city.slug)) { console.log(`\n[${city.slug}] Skipped`); continue; }
    const [[south, west], [north, east]] = city.bounds;

    console.log(`\n[${city.slug}] Fetching POIs from Overpass...`);
    const pois = await fetchPOIs(south, west, north, east);
    console.log(`[${city.slug}] Found ${pois.length} restaurants/bars/cafes`);

    const grid = buildGrid(pois, south, west, north, east);
    const nonZero = Object.keys(grid.data).length;
    console.log(`[${city.slug}] Grid: ${grid.rows}x${grid.cols} cells, ${nonZero} non-empty`);

    const ts = generateTS(grid);
    const outPath = resolve(__dirname, '..', 'src', 'data', 'cities', city.slug, 'amenities.ts');
    writeFileSync(outPath, ts, 'utf-8');
    console.log(`[${city.slug}] Written to ${outPath}`);

    // Rate limit: wait 10s between cities (except last)
    if (ci < cities.length - 1) {
      console.log('Waiting 10s...');
      await new Promise(r => setTimeout(r, 10000));
    }
  }
  console.log('\nDone!');
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
