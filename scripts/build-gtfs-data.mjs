/**
 * Match GTFS stations to our app station IDs by proximity,
 * then generate a compact TypeScript data file.
 *
 * Usage: node scripts/build-gtfs-data.mjs [city]
 * Default city: paris
 */

import { readFileSync, writeFileSync } from 'fs';
import { cities } from './gtfs-config.mjs';

const cityName = process.argv[2] || 'paris';
const config = cities[cityName];
if (!config) {
  console.error(`Unknown city: ${cityName}. Available: ${Object.keys(cities).join(', ')}`);
  process.exit(1);
}

console.log(`=== Building GTFS data for ${config.name} ===\n`);

const gtfs = JSON.parse(readFileSync(`${config.cacheDir}/gtfs-extracted.json`, 'utf8'));

// Parse our stations from TypeScript source
const stationsSource = readFileSync(config.stationsFile, 'utf8');
const stationRegex = /\{\s*id:\s*"([^"]+)",\s*name:\s*"([^"]+)",\s*lat:\s*([\d.]+),\s*lng:\s*([\d.]+)/g;
const ourStations = [];
let match;
while ((match = stationRegex.exec(stationsSource)) !== null) {
  ourStations.push({ id: match[1], name: match[2], lat: parseFloat(match[3]), lng: parseFloat(match[4]) });
}
console.log(`Our stations: ${ourStations.length}`);

// Build GTFS parent station list
const gtfsParents = Object.entries(gtfs.parentStations).map(([id, s]) => ({
  id, name: s.name, lat: s.lat, lng: s.lng,
}));
console.log(`GTFS parent stations: ${gtfsParents.length}`);

function haversine(lat1, lng1, lat2, lng2) {
  const R = 6371;
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLng = (lng2 - lng1) * Math.PI / 180;
  const a = Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLng / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

// Match each of our stations to nearest GTFS parent station
const ourToGtfs = new Map();
const gtfsToOur = new Map();

for (const s of ourStations) {
  let bestDist = Infinity;
  let bestGtfs = null;
  for (const g of gtfsParents) {
    const d = haversine(s.lat, s.lng, g.lat, g.lng);
    if (d < bestDist) {
      bestDist = d;
      bestGtfs = g;
    }
  }
  if (bestDist < 0.5) { // within 500m
    ourToGtfs.set(s.id, bestGtfs.id);
    if (!gtfsToOur.has(bestGtfs.id) || bestDist < haversine(
      ourStations.find(os => os.id === gtfsToOur.get(bestGtfs.id)).lat,
      ourStations.find(os => os.id === gtfsToOur.get(bestGtfs.id)).lng,
      bestGtfs.lat, bestGtfs.lng
    )) {
      gtfsToOur.set(bestGtfs.id, s.id);
    }
  }
}

console.log(`Matched: ${ourToGtfs.size} of ${ourStations.length} stations`);

// ---- 1. INTER-STATION TRAVEL TIMES ----
const segmentData = {};

for (const [key, seg] of Object.entries(gtfs.segments)) {
  const ourFrom = gtfsToOur.get(seg.from);
  const ourTo = gtfsToOur.get(seg.to);
  if (!ourFrom || !ourTo || ourFrom === ourTo) continue;

  const pairKey = `${ourFrom}|${ourTo}`;
  const reversePairKey = `${ourTo}|${ourFrom}`;

  if (!segmentData[pairKey] || seg.time < segmentData[pairKey]) {
    segmentData[pairKey] = seg.time;
  }
  if (!segmentData[reversePairKey] || seg.time < segmentData[reversePairKey]) {
    segmentData[reversePairKey] = seg.time;
  }
}

console.log(`Segment pairs (our IDs): ${Object.keys(segmentData).length}`);

// ---- 2. HEADWAYS ----
const routeToLine = config.routeToLine || {};
const headwayData = {};
for (const [route, periods] of Object.entries(gtfs.headways)) {
  const line = routeToLine[route] || route;
  headwayData[line] = {
    peak: periods.peak || null,
    offpeak: periods.offpeak || null,
    evening: periods.evening || null,
  };
}

// ---- 3. TRANSFER TIMES ----
const transferData = {};

for (const [key, t] of Object.entries(gtfs.transfers)) {
  const ourFrom = gtfsToOur.get(t.from);
  const ourTo = gtfsToOur.get(t.to);
  if (!ourFrom || !ourTo || ourFrom === ourTo) continue;

  const pairKey = `${ourFrom}|${ourTo}`;
  if (!transferData[pairKey] || t.time < transferData[pairKey]) {
    transferData[pairKey] = t.time;
  }
}

console.log(`Transfer pairs (our IDs): ${Object.keys(transferData).length}`);

// ---- GENERATE TypeScript ----
let ts = `// ${config.generatedComment}
// Generated on ${new Date().toISOString().slice(0, 10)}

/**
 * Inter-station travel times in minutes (from GTFS stop_times.txt median values).
 * Key format: "stationA|stationB" -> time in minutes.
 * Both directions are included.
 */
export const gtfsSegmentTimes: Record<string, number> = {\n`;

for (const [key, time] of Object.entries(segmentData).sort((a, b) => a[0].localeCompare(b[0]))) {
  ts += `  "${key}": ${time},\n`;
}
ts += `};\n\n`;

ts += `/**
 * Average headway (minutes between trains) per line per time period.
 * Wait time ~= headway / 2.
 */
export const gtfsHeadways: Record<string, { peak: number | null; offpeak: number | null; evening: number | null }> = {\n`;

for (const [line, periods] of Object.entries(headwayData).sort((a, b) => a[0].localeCompare(b[0]))) {
  ts += `  "${line}": { peak: ${periods.peak}, offpeak: ${periods.offpeak}, evening: ${periods.evening} },\n`;
}
ts += `};\n\n`;

ts += `/**
 * Transfer times between stations in minutes (from GTFS transfers.txt).
 * Key format: "stationA|stationB" -> time in minutes.
 */
export const gtfsTransferTimes: Record<string, number> = {\n`;

for (const [key, time] of Object.entries(transferData).sort((a, b) => a[0].localeCompare(b[0]))) {
  ts += `  "${key}": ${time},\n`;
}
ts += `};\n`;

writeFileSync(config.outputFile, ts);
console.log(`\nWrote ${config.outputFile} (${(ts.length / 1024).toFixed(0)} KB)`);

// Diagnostics
console.log('\n=== UNMATCHED STATIONS ===');
const unmatched = ourStations.filter(s => !ourToGtfs.has(s.id));
for (const s of unmatched.slice(0, 20)) {
  console.log(`  ${s.id} (${s.name}) - ${s.lat}, ${s.lng}`);
}
if (unmatched.length > 20) console.log(`  ... and ${unmatched.length - 20} more`);

console.log('\n=== SAMPLE MATCHED SEGMENTS ===');
for (const key of Object.keys(segmentData).slice(0, 15)) {
  const [from, to] = key.split('|');
  const fromStation = ourStations.find(s => s.id === from);
  const toStation = ourStations.find(s => s.id === to);
  console.log(`  ${fromStation?.name || from} -> ${toStation?.name || to} = ${segmentData[key]} min`);
}
