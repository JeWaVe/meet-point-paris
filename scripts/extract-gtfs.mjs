/**
 * Extract inter-station travel times, headways, and transfer times from GTFS data.
 * Outputs a JSON file used by build-gtfs-data.mjs to generate TypeScript data.
 *
 * Usage: node scripts/extract-gtfs.mjs [city]
 * Default city: paris
 */

import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'fs';
import { createReadStream } from 'fs';
import { createInterface } from 'readline';
import { execSync } from 'child_process';
import { cities } from './gtfs-config.mjs';

const cityName = process.argv[2] || 'paris';
const config = cities[cityName];
if (!config) {
  console.error(`Unknown city: ${cityName}. Available: ${Object.keys(cities).join(', ')}`);
  process.exit(1);
}

const GTFS_DIR = config.cacheDir;

console.log(`=== Extracting GTFS for ${config.name} ===\n`);

// Download GTFS zip if not cached
if (!existsSync(GTFS_DIR)) mkdirSync(GTFS_DIR, { recursive: true });

const zipPath = `${GTFS_DIR}/gtfs.zip`;
if (!existsSync(zipPath)) {
  console.log(`Downloading GTFS from ${config.gtfsUrl}...`);
  execSync(`curl -L -o "${zipPath}" "${config.gtfsUrl}"`, { stdio: 'inherit' });
}

// Extract zip if stops.txt doesn't exist
if (!existsSync(`${GTFS_DIR}/stops.txt`)) {
  console.log('Extracting zip...');
  execSync(`cd "${GTFS_DIR}" && unzip -o gtfs.zip`, { stdio: 'inherit' });
}

function parseCsvLine(line) {
  const result = [];
  let current = '';
  let inQuotes = false;
  for (const ch of line) {
    if (ch === '"') { inQuotes = !inQuotes; continue; }
    if (ch === ',' && !inQuotes) { result.push(current); current = ''; continue; }
    current += ch;
  }
  result.push(current);
  return result;
}

async function readCsv(filename) {
  const path = `${GTFS_DIR}/${filename}`;
  if (!existsSync(path)) return [];
  const rows = [];
  const rl = createInterface({ input: createReadStream(path), crlfDelay: Infinity });
  let headers = null;
  for await (const line of rl) {
    if (!headers) { headers = parseCsvLine(line); continue; }
    const vals = parseCsvLine(line);
    const obj = {};
    for (let i = 0; i < headers.length; i++) obj[headers[i]] = vals[i] || '';
    rows.push(obj);
  }
  return rows;
}

function timeToMinutes(timeStr) {
  if (!timeStr) return null;
  const [h, m, s] = timeStr.split(':').map(Number);
  return h * 60 + m + s / 60;
}

async function main() {
  console.log('Reading routes...');
  const routes = await readCsv('routes.txt');
  const routeMap = new Map();
  for (const r of routes) routeMap.set(r.route_id, r);

  // Determine which routes to include
  let relevantRouteIds;
  const routeNames = { ...config.routeNames };

  if (config.routeFilter === 'ids') {
    relevantRouteIds = config.routeIds;
  } else {
    // Filter by route_type
    relevantRouteIds = new Set();
    for (const r of routes) {
      if (config.routeTypes.has(r.route_type)) {
        relevantRouteIds.add(r.route_id);
        const name = r.route_short_name || r.route_long_name || r.route_id;
        routeNames[r.route_id] = name;
      }
    }
  }
  console.log(`  Relevant routes: ${relevantRouteIds.size}`);

  console.log('Reading stops...');
  const stops = await readCsv('stops.txt');
  const stopMap = new Map();
  for (const s of stops) {
    stopMap.set(s.stop_id, {
      name: s.stop_name,
      lat: parseFloat(s.stop_lat),
      lng: parseFloat(s.stop_lon),
      parent: s.parent_station || null,
    });
  }

  console.log('Reading trips...');
  const trips = await readCsv('trips.txt');

  const tripRouteMap = new Map();
  for (const t of trips) {
    if (relevantRouteIds.has(t.route_id)) {
      tripRouteMap.set(t.trip_id, t.route_id);
    }
  }
  console.log(`  Relevant trips: ${tripRouteMap.size}`);

  console.log('Reading stop_times (this may take a moment)...');
  const stopTimes = await readCsv('stop_times.txt');
  console.log(`  Total stop times: ${stopTimes.length}`);

  // Group stop_times by trip_id, sorted by stop_sequence
  const tripStops = new Map();
  let filtered = 0;
  for (const st of stopTimes) {
    const routeId = tripRouteMap.get(st.trip_id);
    if (!routeId) continue;
    filtered++;
    if (!tripStops.has(st.trip_id)) tripStops.set(st.trip_id, []);
    tripStops.get(st.trip_id).push({
      stop_id: st.stop_id,
      arrival: timeToMinutes(st.arrival_time),
      departure: timeToMinutes(st.departure_time),
      seq: parseInt(st.stop_sequence),
    });
  }

  for (const [, stops] of tripStops) {
    stops.sort((a, b) => a.seq - b.seq);
  }
  console.log(`  Relevant stop times: ${filtered}, trips with stops: ${tripStops.size}`);

  // ---- 1. INTER-STATION TRAVEL TIMES ----
  const segmentTimes = new Map();

  function getParent(stopId) {
    const s = stopMap.get(stopId);
    return s?.parent || stopId;
  }

  for (const [tripId, stops] of tripStops) {
    const routeId = tripRouteMap.get(tripId);
    const routeName = routeNames[routeId] || routeId;

    for (let i = 0; i < stops.length - 1; i++) {
      const fromParent = getParent(stops[i].stop_id);
      const toParent = getParent(stops[i + 1].stop_id);
      if (fromParent === toParent) continue;

      const dep = stops[i].departure;
      const arr = stops[i + 1].arrival;
      if (dep === null || arr === null) continue;
      const time = arr - dep;
      if (time <= 0 || time > 15) continue;

      const key = `${fromParent}|${toParent}`;
      if (!segmentTimes.has(key)) segmentTimes.set(key, { times: [], route: routeName });
      segmentTimes.get(key).times.push(time);
    }
  }

  // Compute median travel time per segment
  const segments = {};
  for (const [key, data] of segmentTimes) {
    const sorted = data.times.sort((a, b) => a - b);
    const median = sorted[Math.floor(sorted.length / 2)];
    const [from, to] = key.split('|');
    const fromStop = stopMap.get(from);
    const toStop = stopMap.get(to);
    segments[key] = {
      from, to,
      fromName: fromStop?.name || from,
      toName: toStop?.name || to,
      time: Math.round(median * 10) / 10,
      samples: sorted.length,
      route: data.route,
    };
  }
  console.log(`\nSegments: ${Object.keys(segments).length}`);

  // ---- 2. HEADWAYS ----
  const headways = {};
  const routeDirTrips = new Map();

  for (const [tripId, stops] of tripStops) {
    const routeId = tripRouteMap.get(tripId);
    const routeName = routeNames[routeId] || routeId;
    const trip = trips.find(t => t.trip_id === tripId);
    const dir = trip?.direction_id || '0';

    if (stops.length === 0) continue;
    const dep = stops[0].departure;
    if (dep === null) continue;
    const hour = Math.floor(dep / 60);
    if (hour < 5 || hour > 25) continue;

    const key = `${routeName}|${dir}`;
    if (!routeDirTrips.has(key)) routeDirTrips.set(key, new Map());
    const hourMap = routeDirTrips.get(key);
    hourMap.set(hour, (hourMap.get(hour) || 0) + 1);
  }

  for (const [key, hourMap] of routeDirTrips) {
    const [route] = key.split('|');
    if (!headways[route]) headways[route] = {};

    const periods = {
      peak: [7, 8, 17, 18],
      offpeak: [10, 11, 12, 13, 14, 15, 16],
      evening: [20, 21, 22, 23],
    };

    for (const [period, hours] of Object.entries(periods)) {
      let totalTrips = 0;
      let totalHours = 0;
      for (const h of hours) {
        const count = hourMap.get(h);
        if (count) { totalTrips += count; totalHours++; }
      }
      if (totalHours > 0) {
        const headway = 60 / (totalTrips / totalHours);
        if (!headways[route][period]) headways[route][period] = [];
        headways[route][period].push(Math.round(headway * 10) / 10);
      }
    }
  }

  const headwaysFinal = {};
  for (const [route, periods] of Object.entries(headways)) {
    headwaysFinal[route] = {};
    for (const [period, values] of Object.entries(periods)) {
      const avg = values.reduce((a, b) => a + b, 0) / values.length;
      headwaysFinal[route][period] = Math.round(avg * 10) / 10;
    }
  }

  // ---- 3. TRANSFERS ----
  console.log('\nReading transfers...');
  const transfers = await readCsv('transfers.txt');
  const transferTimes = {};
  for (const t of transfers) {
    const fromParent = getParent(t.from_stop_id);
    const toParent = getParent(t.to_stop_id);
    if (fromParent === toParent) continue;
    const time = parseInt(t.min_transfer_time);
    if (isNaN(time) || time <= 0) continue;
    const timeMin = Math.round(time / 6) / 10;
    const key = `${fromParent}|${toParent}`;
    if (!transferTimes[key] || timeMin < transferTimes[key].time) {
      transferTimes[key] = {
        from: fromParent, to: toParent,
        fromName: stopMap.get(fromParent)?.name || fromParent,
        toName: stopMap.get(toParent)?.name || toParent,
        time: timeMin,
      };
    }
  }
  console.log(`Transfers: ${Object.keys(transferTimes).length}`);

  // ---- 4. Parent stations ----
  const parentStations = {};
  for (const s of stops) {
    if (s.location_type === '1' || (!s.parent_station && s.location_type !== '2')) {
      parentStations[s.stop_id] = {
        name: s.stop_name,
        lat: parseFloat(s.stop_lat),
        lng: parseFloat(s.stop_lon),
      };
    }
  }

  // ---- OUTPUT ----
  const output = { segments, headways: headwaysFinal, transfers: transferTimes, parentStations };
  const outPath = `${GTFS_DIR}/gtfs-extracted.json`;
  writeFileSync(outPath, JSON.stringify(output, null, 2));
  console.log(`\nWrote ${outPath}`);

  // Stats
  console.log('\n=== HEADWAYS (minutes) ===');
  for (const [route, periods] of Object.entries(headwaysFinal).sort((a, b) => a[0].localeCompare(b[0]))) {
    console.log(`  ${route}: peak=${periods.peak || '?'} offpeak=${periods.offpeak || '?'} evening=${periods.evening || '?'}`);
  }

  console.log('\n=== SAMPLE SEGMENTS ===');
  for (const s of Object.values(segments).slice(0, 15)) {
    console.log(`  ${s.route}: ${s.fromName} -> ${s.toName} = ${s.time} min (${s.samples} samples)`);
  }
}

main().catch(console.error);
