/**
 * Match GTFS stations to our app station IDs by proximity,
 * then generate a compact TypeScript data file with:
 * - Inter-station travel times (replacing fixed 2 min)
 * - Average headways per line per period (for wait time estimation)
 * - Transfer times between stations
 */

import { readFileSync, writeFileSync } from 'fs';

const gtfs = JSON.parse(readFileSync('./gtfs-cache/gtfs-extracted.json', 'utf8'));

// Dynamically import our stations data - we'll parse it from the TS source
const stationsSource = readFileSync('./src/data/cities/paris/stations.ts', 'utf8');

// Extract station objects from source using regex
const stationRegex = /\{\s*id:\s*"([^"]+)",\s*name:\s*"([^"]+)",\s*lat:\s*([\d.]+),\s*lng:\s*([\d.]+)/g;
const ourStations = [];
let match;
while ((match = stationRegex.exec(stationsSource)) !== null) {
  ourStations.push({ id: match[1], name: match[2], lat: parseFloat(match[3]), lng: parseFloat(match[4]) });
}
console.log(`Our stations: ${ourStations.length}`);

// Build GTFS parent station list with coords
const gtfsParents = Object.entries(gtfs.parentStations).map(([id, s]) => ({
  id, name: s.name, lat: s.lat, lng: s.lng,
}));
console.log(`GTFS parent stations: ${gtfsParents.length}`);

// Haversine distance in km
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
const ourToGtfs = new Map(); // our station id -> GTFS parent id
const gtfsToOur = new Map(); // GTFS parent id -> our station id

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
    // Only keep closest our station per GTFS station
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
// For each segment in GTFS, try to find matching our-station pair
const segmentData = {}; // "ourFromId|ourToId" -> time in minutes

for (const [key, seg] of Object.entries(gtfs.segments)) {
  const ourFrom = gtfsToOur.get(seg.from);
  const ourTo = gtfsToOur.get(seg.to);
  if (!ourFrom || !ourTo || ourFrom === ourTo) continue;

  const pairKey = `${ourFrom}|${ourTo}`;
  const reversePairKey = `${ourTo}|${ourFrom}`;

  // Keep minimum observed time for each direction
  if (!segmentData[pairKey] || seg.time < segmentData[pairKey]) {
    segmentData[pairKey] = seg.time;
  }
  if (!segmentData[reversePairKey] || seg.time < segmentData[reversePairKey]) {
    segmentData[reversePairKey] = seg.time;
  }
}

console.log(`Segment pairs (our IDs): ${Object.keys(segmentData).length}`);

// ---- 2. HEADWAYS ----
// Map route names to our line identifiers
const routeToLine = {
  'M1': '1', 'M2': '2', 'M3': '3', 'M4': '4', 'M5': '5', 'M6': '6',
  'M7': '7', 'M8': '8', 'M9': '9', 'M10': '10', 'M11': '11', 'M12': '12',
  'M13': '13', 'M14': '14', 'M3B': '3bis', 'M7B': '7bis',
  'T1': 'T1', 'T2': 'T2', 'T3a': 'T3a', 'T3b': 'T3b', 'T4': 'T4',
  'T5': 'T5', 'T6': 'T6', 'T7': 'T7', 'T8': 'T8', 'T9': 'T9',
  'T10': 'T10', 'T11': 'T11', 'T13': 'T13',
  'RER_A': 'A', 'RER_B': 'B', 'RER_C': 'C', 'RER_D': 'D', 'RER_E': 'E',
};

// The headways from GTFS seem to count per-direction independently
// For RER with many branches, frequency at a given station can be much lower
// The computed headways represent system-level frequency summed across all branches
// For a user's wait time, we want the frequency at their specific station
// As approximation: use the computed headway (already per-direction) and multiply by 2 for branch factor on branched lines
// But for now, let's keep it simple: headway/2 = average wait time

const headwayData = {};
for (const [route, periods] of Object.entries(gtfs.headways)) {
  const line = routeToLine[route];
  if (!line) continue;
  headwayData[line] = {
    peak: periods.peak || null,
    offpeak: periods.offpeak || null,
    evening: periods.evening || null,
  };
}

// ---- 3. TRANSFER TIMES ----
const transferData = {}; // "ourFromId|ourToId" -> time in minutes

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
// Generate a compact data file

let ts = `// Auto-generated from GTFS IDFM data - do not edit manually
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

writeFileSync('./src/data/cities/paris/gtfs-times.ts', ts);
console.log(`\nWrote src/data/cities/paris/gtfs-times.ts (${(ts.length / 1024).toFixed(0)} KB)`);

// Print some diagnostics
console.log('\n=== UNMATCHED STATIONS ===');
const unmatched = ourStations.filter(s => !ourToGtfs.has(s.id));
for (const s of unmatched.slice(0, 20)) {
  console.log(`  ${s.id} (${s.name}) - ${s.lat}, ${s.lng}`);
}
if (unmatched.length > 20) console.log(`  ... and ${unmatched.length - 20} more`);

// Print sample matched segments
console.log('\n=== SAMPLE MATCHED SEGMENTS ===');
const sampleKeys = Object.keys(segmentData).slice(0, 15);
for (const key of sampleKeys) {
  const [from, to] = key.split('|');
  const fromStation = ourStations.find(s => s.id === from);
  const toStation = ourStations.find(s => s.id === to);
  console.log(`  ${fromStation?.name || from} -> ${toStation?.name || to} = ${segmentData[key]} min`);
}
