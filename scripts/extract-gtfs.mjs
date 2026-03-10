/**
 * Extract inter-station travel times, headways, and transfer times from GTFS data.
 * Outputs a JSON file used by the app to replace fixed 2-min estimates.
 */

import { readFileSync, writeFileSync } from 'fs';
import { createReadStream } from 'fs';
import { createInterface } from 'readline';

const GTFS_DIR = './gtfs-cache';

function parseCsvLine(line) {
  // Simple CSV parser handling commas in quotes
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
  const rows = [];
  const rl = createInterface({ input: createReadStream(`${GTFS_DIR}/${filename}`), crlfDelay: Infinity });
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

// Route IDs for metro, RER, tram
const ROUTE_IDS = new Set([
  // Metro 1-14, 3B, 7B
  'IDFM:C01371','IDFM:C01372','IDFM:C01373','IDFM:C01374','IDFM:C01375',
  'IDFM:C01376','IDFM:C01377','IDFM:C01378','IDFM:C01379','IDFM:C01380',
  'IDFM:C01381','IDFM:C01382','IDFM:C01383','IDFM:C01384','IDFM:C01386','IDFM:C01387',
  // Tram T1-T13
  'IDFM:C01389','IDFM:C01390','IDFM:C01391','IDFM:C01679','IDFM:C01684',
  'IDFM:C01774','IDFM:C01794','IDFM:C01795','IDFM:C01843','IDFM:C01999',
  'IDFM:C02317','IDFM:C02344','IDFM:C02528',
  // RER A-E
  'IDFM:C01742','IDFM:C01743','IDFM:C01727','IDFM:C01728','IDFM:C01729',
]);

const ROUTE_NAMES = {
  'IDFM:C01371':'M1','IDFM:C01372':'M2','IDFM:C01373':'M3','IDFM:C01374':'M4',
  'IDFM:C01375':'M5','IDFM:C01376':'M6','IDFM:C01377':'M7','IDFM:C01378':'M8',
  'IDFM:C01379':'M9','IDFM:C01380':'M10','IDFM:C01381':'M11','IDFM:C01382':'M12',
  'IDFM:C01383':'M13','IDFM:C01384':'M14','IDFM:C01386':'M3B','IDFM:C01387':'M7B',
  'IDFM:C01389':'T1','IDFM:C01390':'T2','IDFM:C01391':'T3a','IDFM:C01679':'T3b',
  'IDFM:C01684':'T5','IDFM:C01774':'T7','IDFM:C01794':'T6','IDFM:C01795':'T8',
  'IDFM:C01843':'T4','IDFM:C01999':'T11','IDFM:C02317':'T9','IDFM:C02344':'T13',
  'IDFM:C02528':'T10',
  'IDFM:C01742':'RER_A','IDFM:C01743':'RER_B','IDFM:C01727':'RER_C',
  'IDFM:C01728':'RER_D','IDFM:C01729':'RER_E',
};

async function main() {
  console.log('Reading routes...');
  const routes = await readCsv('routes.txt');
  const routeMap = new Map();
  for (const r of routes) routeMap.set(r.route_id, r);

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
  const trips = await readCsv('relevant_trips.txt');
  // Add header manually since relevant_trips.txt has no header
  const tripsHeaders = 'route_id,service_id,trip_id,trip_headsign,trip_short_name,direction_id,block_id,shape_id,wheelchair_accessible,bikes_allowed'.split(',');

  const tripRouteMap = new Map(); // trip_id -> route_id
  for (const t of trips) {
    if (ROUTE_IDS.has(t.route_id)) {
      tripRouteMap.set(t.trip_id, t.route_id);
    }
  }
  console.log(`  Relevant trips: ${tripRouteMap.size}`);

  console.log('Reading stop_times (this may take a moment)...');
  const stopTimes = await readCsv('relevant_stop_times.txt');
  console.log(`  Stop times: ${stopTimes.length}`);

  // Group stop_times by trip_id, sorted by stop_sequence
  const tripStops = new Map(); // trip_id -> [{stop_id, arrival, departure, seq}]
  for (const st of stopTimes) {
    const routeId = tripRouteMap.get(st.trip_id);
    if (!routeId) continue;
    if (!tripStops.has(st.trip_id)) tripStops.set(st.trip_id, []);
    tripStops.get(st.trip_id).push({
      stop_id: st.stop_id,
      arrival: timeToMinutes(st.arrival_time),
      departure: timeToMinutes(st.departure_time),
      seq: parseInt(st.stop_sequence),
    });
  }

  // Sort each trip's stops by sequence
  for (const [, stops] of tripStops) {
    stops.sort((a, b) => a.seq - b.seq);
  }

  console.log(`  Trips with stops: ${tripStops.size}`);

  // ---- 1. INTER-STATION TRAVEL TIMES ----
  // For each pair of consecutive stops on a route, collect all observed travel times
  // Key: "parentA->parentB" (using parent station IDs for consistency)
  const segmentTimes = new Map(); // "stopA|stopB" -> {times: number[], route: string}

  function getParent(stopId) {
    const s = stopMap.get(stopId);
    return s?.parent || stopId;
  }

  for (const [tripId, stops] of tripStops) {
    const routeId = tripRouteMap.get(tripId);
    const routeName = ROUTE_NAMES[routeId] || routeId;

    for (let i = 0; i < stops.length - 1; i++) {
      const fromParent = getParent(stops[i].stop_id);
      const toParent = getParent(stops[i + 1].stop_id);
      if (fromParent === toParent) continue; // same station, different platform

      const dep = stops[i].departure;
      const arr = stops[i + 1].arrival;
      if (dep === null || arr === null) continue;
      const time = arr - dep;
      if (time <= 0 || time > 15) continue; // sanity check

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
      from: from,
      to: to,
      fromName: fromStop?.name || from,
      toName: toStop?.name || to,
      time: Math.round(median * 10) / 10,
      samples: sorted.length,
      route: data.route,
    };
  }

  console.log(`\nSegments: ${Object.keys(segments).length}`);

  // ---- 2. HEADWAYS (frequency) ----
  // For each route+direction, count trips per hour at a reference stop
  // Group by route -> direction -> hour -> count
  const headways = {};
  const routeDirTrips = new Map(); // "route|dir" -> Map<hour, count>

  for (const [tripId, stops] of tripStops) {
    const routeId = tripRouteMap.get(tripId);
    const routeName = ROUTE_NAMES[routeId] || routeId;
    // Use the trip from relevant_trips to get direction
    const trip = trips.find(t => t.trip_id === tripId);
    const dir = trip?.direction_id || '0';

    if (stops.length === 0) continue;
    // Use the first stop's departure as representative time
    const dep = stops[0].departure;
    if (dep === null) continue;
    const hour = Math.floor(dep / 60);
    if (hour < 5 || hour > 25) continue; // operating hours only

    const key = `${routeName}|${dir}`;
    if (!routeDirTrips.has(key)) routeDirTrips.set(key, new Map());
    const hourMap = routeDirTrips.get(key);
    hourMap.set(hour, (hourMap.get(hour) || 0) + 1);
  }

  // Compute average headway per route per time period
  for (const [key, hourMap] of routeDirTrips) {
    const [route, dir] = key.split('|');
    if (!headways[route]) headways[route] = {};

    // Peak hours: 7-9, 17-19. Off-peak: 10-16. Evening: 20-24
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
        if (count) {
          totalTrips += count;
          totalHours++;
        }
      }
      if (totalHours > 0) {
        const avgTripsPerHour = totalTrips / totalHours;
        const headway = avgTripsPerHour > 0 ? 60 / avgTripsPerHour : null;
        if (!headways[route][period]) headways[route][period] = [];
        headways[route][period].push(Math.round(headway * 10) / 10);
      }
    }
  }

  // Average both directions
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
    const timeMin = Math.round(time / 6) / 10; // seconds -> minutes, 1 decimal
    const key = `${fromParent}|${toParent}`;
    // Keep minimum transfer time
    if (!transferTimes[key] || timeMin < transferTimes[key].time) {
      transferTimes[key] = {
        from: fromParent,
        to: toParent,
        fromName: stopMap.get(fromParent)?.name || fromParent,
        toName: stopMap.get(toParent)?.name || toParent,
        time: timeMin,
      };
    }
  }

  console.log(`Transfers: ${Object.keys(transferTimes).length}`);

  // ---- 4. Build GTFS stop ID -> name mapping for matching ----
  // Export parent stations with coordinates for matching to our station IDs
  const parentStations = {};
  for (const s of stops) {
    if (s.parent_station === '' && s.location_type === '1') {
      parentStations[s.stop_id] = {
        name: s.stop_name,
        lat: parseFloat(s.stop_lat),
        lng: parseFloat(s.stop_lon),
      };
    }
  }

  // ---- OUTPUT ----
  const output = {
    segments,      // inter-station travel times
    headways: headwaysFinal,      // average headway per route per period
    transfers: transferTimes,     // transfer times between parent stations
    parentStations,               // GTFS parent station coords for matching
  };

  writeFileSync('./gtfs-cache/gtfs-extracted.json', JSON.stringify(output, null, 2));
  console.log('\nWrote gtfs-cache/gtfs-extracted.json');

  // Print some stats
  console.log('\n=== HEADWAYS (minutes) ===');
  for (const [route, periods] of Object.entries(headwaysFinal).sort((a, b) => a[0].localeCompare(b[0]))) {
    console.log(`  ${route}: peak=${periods.peak || '?'} offpeak=${periods.offpeak || '?'} evening=${periods.evening || '?'}`);
  }

  // Print a few sample segments
  console.log('\n=== SAMPLE SEGMENTS ===');
  const sampleSegments = Object.values(segments).slice(0, 15);
  for (const s of sampleSegments) {
    console.log(`  ${s.route}: ${s.fromName} -> ${s.toName} = ${s.time} min (${s.samples} samples)`);
  }
}

main().catch(console.error);
