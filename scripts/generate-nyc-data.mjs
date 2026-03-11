#!/usr/bin/env node
/**
 * Generates NYC Subway station and line data from MTA GTFS static feed.
 * Usage: node scripts/generate-nyc-data.mjs
 *
 * Sources:
 *   - Stations CSV: https://data.ny.gov/api/views/39hk-dx4f/rows.csv?accessType=DOWNLOAD
 *   - GTFS static:  http://web.mta.info/developers/data/nyct/subway/google_transit.zip
 */

import { writeFileSync, mkdirSync, existsSync, readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { inflateRawSync } from 'zlib';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const OUT_DIR = join(ROOT, 'src/data/cities/new-york');
const TMP_DIR = join(ROOT, '.nyc-gtfs-tmp');

// ---------- Line colors (official MTA) ----------
const LINE_COLORS = {
  '1': '#EE352E', '2': '#EE352E', '3': '#EE352E',
  '4': '#00933C', '5': '#00933C', '6': '#00933C',
  '7': '#B933AD',
  'A': '#2850AD', 'C': '#2850AD', 'E': '#2850AD',
  'B': '#FF6319', 'D': '#FF6319', 'F': '#FF6319', 'M': '#FF6319',
  'G': '#6CBE45',
  'J': '#996633', 'Z': '#996633',
  'L': '#A7A9AC',
  'N': '#FCCC0A', 'Q': '#FCCC0A', 'R': '#FCCC0A', 'W': '#FCCC0A',
  'S': '#808183',
};

const LINE_ORDER = ['1','2','3','4','5','6','7','A','B','C','D','E','F','G','J','L','M','N','Q','R','S','W','Z'];

// ---------- Minimal ZIP reader (no external deps) ----------
function readZipEntries(buffer) {
  // Find End of Central Directory record
  const EOCD_SIG = 0x06054b50;
  let eocdPos = -1;
  for (let i = buffer.length - 22; i >= 0; i--) {
    if (buffer.readUInt32LE(i) === EOCD_SIG) {
      eocdPos = i;
      break;
    }
  }
  if (eocdPos < 0) throw new Error('No EOCD found in ZIP');

  const cdSize = buffer.readUInt32LE(eocdPos + 12);
  const cdOffset = buffer.readUInt32LE(eocdPos + 16);

  const entries = new Map(); // filename -> Buffer content
  let pos = cdOffset;
  const CD_SIG = 0x02014b50;

  while (pos < cdOffset + cdSize) {
    if (buffer.readUInt32LE(pos) !== CD_SIG) break;
    const compressionMethod = buffer.readUInt16LE(pos + 10);
    const compressedSize = buffer.readUInt32LE(pos + 20);
    const uncompressedSize = buffer.readUInt32LE(pos + 24);
    const fileNameLength = buffer.readUInt16LE(pos + 28);
    const extraFieldLength = buffer.readUInt16LE(pos + 30);
    const fileCommentLength = buffer.readUInt16LE(pos + 32);
    const localHeaderOffset = buffer.readUInt32LE(pos + 42);
    const fileName = buffer.subarray(pos + 46, pos + 46 + fileNameLength).toString('utf8');

    // Read local file header
    const LFH_SIG = 0x04034b50;
    const lPos = localHeaderOffset;
    if (buffer.readUInt32LE(lPos) !== LFH_SIG) {
      pos += 46 + fileNameLength + extraFieldLength + fileCommentLength;
      continue;
    }
    const lFileNameLen = buffer.readUInt16LE(lPos + 26);
    const lExtraLen = buffer.readUInt16LE(lPos + 28);
    const dataStart = lPos + 30 + lFileNameLen + lExtraLen;
    const compressedData = buffer.subarray(dataStart, dataStart + compressedSize);

    let content;
    if (compressionMethod === 0) {
      content = compressedData;
    } else if (compressionMethod === 8) {
      content = inflateRawSync(compressedData);
    } else {
      // skip unsupported
      pos += 46 + fileNameLength + extraFieldLength + fileCommentLength;
      continue;
    }
    entries.set(fileName, content);
    pos += 46 + fileNameLength + extraFieldLength + fileCommentLength;
  }
  return entries;
}

// ---------- CSV parsing ----------
function parseCsv(text) {
  const lines = text.split('\n');
  const headers = parseCsvLine(lines[0]);
  const rows = [];
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;
    const vals = parseCsvLine(line);
    const row = {};
    for (let j = 0; j < headers.length; j++) {
      row[headers[j].trim()] = (vals[j] || '').trim();
    }
    rows.push(row);
  }
  return rows;
}

function parseCsvLine(line) {
  const result = [];
  let inQuotes = false;
  let current = '';
  for (let i = 0; i < line.length; i++) {
    const ch = line[i];
    if (ch === '"') {
      if (inQuotes && line[i + 1] === '"') { current += '"'; i++; }
      else inQuotes = !inQuotes;
    } else if (ch === ',' && !inQuotes) {
      result.push(current);
      current = '';
    } else {
      current += ch;
    }
  }
  result.push(current);
  return result;
}

async function fetchBuf(url) {
  console.log(`  Fetching ${url}`);
  const resp = await fetch(url);
  if (!resp.ok) throw new Error(`HTTP ${resp.status} for ${url}`);
  const ab = await resp.arrayBuffer();
  return Buffer.from(ab);
}

async function fetchText(url) {
  const buf = await fetchBuf(url);
  return buf.toString('utf8');
}

function toId(complexId) {
  return `c_${complexId}`;
}

// ---------- Main ----------
async function main() {
  if (!existsSync(OUT_DIR)) mkdirSync(OUT_DIR, { recursive: true });
  if (!existsSync(TMP_DIR)) mkdirSync(TMP_DIR, { recursive: true });

  // ---------- Step 1: Fetch station data with Complex IDs ----------
  console.log('\n[1/5] Fetching MTA station data (Complex IDs)...');
  const stationsCsvText = await fetchText(
    'https://data.ny.gov/api/views/39hk-dx4f/rows.csv?accessType=DOWNLOAD'
  );
  const stationRows = parseCsv(stationsCsvText);
  console.log(`  ${stationRows.length} stop rows`);

  // Build complexMap: complexId -> station info
  const complexMap = new Map();
  // gtfsStopId -> complexId (for matching GTFS stop_times)
  const gtfsStopToComplex = new Map();

  for (const row of stationRows) {
    // Handle both possible column name formats
    const complexId = (row['Complex ID'] || row['complex_id'] || '').trim();
    const stopName = (row['Stop Name'] || row['stop_name'] || '').trim();
    const borough = (row['Borough'] || row['borough'] || '').trim();
    const daytimeRoutes = (row['Daytime Routes'] || row['daytime_routes'] || '').trim();
    const lat = parseFloat(row['GTFS Latitude'] || row['gtfs_latitude'] || '0');
    const lng = parseFloat(row['GTFS Longitude'] || row['gtfs_longitude'] || '0');
    const gtfsStopId = (row['GTFS Stop ID'] || row['gtfs_stop_id'] || '').trim();

    if (!complexId || isNaN(lat) || isNaN(lng) || lat === 0) continue;

    // Skip Staten Island Railway
    if (borough === 'SI') continue;
    const routes = daytimeRoutes.split(/\s+/).filter(r => r && r !== 'SIR');
    if (routes.length === 0) continue;

    if (!complexMap.has(complexId)) {
      complexMap.set(complexId, {
        id: toId(complexId),
        name: stopName,
        lat: 0, lng: 0,
        routes: new Set(),
        gtfsStopIds: new Set(),
        latSum: 0, lngSum: 0, count: 0,
      });
    }
    const c = complexMap.get(complexId);
    for (const r of routes) c.routes.add(r);
    if (gtfsStopId) {
      c.gtfsStopIds.add(gtfsStopId);
      gtfsStopToComplex.set(gtfsStopId, complexId);
      const baseId = gtfsStopId.replace(/[NS]$/, '');
      gtfsStopToComplex.set(baseId, complexId);
    }
    c.latSum += lat;
    c.lngSum += lng;
    c.count++;
  }

  for (const [, c] of complexMap) {
    c.lat = c.latSum / c.count;
    c.lng = c.lngSum / c.count;
  }

  console.log(`  ${complexMap.size} complexes found`);

  // ---------- Step 2: Download / load GTFS static feed ----------
  const zipPath = join(TMP_DIR, 'gtfs.zip');
  let zipEntries;

  if (!existsSync(zipPath)) {
    console.log('\n[2/5] Downloading MTA GTFS static feed...');
    const zipBuf = await fetchBuf(
      'http://web.mta.info/developers/data/nyct/subway/google_transit.zip'
    );
    writeFileSync(zipPath, zipBuf);
    console.log(`  Saved (${Math.round(zipBuf.length / 1024)} KB)`);
    zipEntries = readZipEntries(zipBuf);
  } else {
    console.log('\n[2/5] Loading cached GTFS zip...');
    const zipBuf = readFileSync(zipPath);
    zipEntries = readZipEntries(zipBuf);
  }

  const zipFileNames = [...zipEntries.keys()];
  console.log(`  ZIP entries: ${zipFileNames.join(', ')}`);

  function getZipText(name) {
    // Try exact name, then with/without directory prefix
    if (zipEntries.has(name)) return zipEntries.get(name).toString('utf8');
    for (const key of zipEntries.keys()) {
      if (key.endsWith('/' + name) || key === name) return zipEntries.get(key).toString('utf8');
    }
    throw new Error(`${name} not found in GTFS zip. Available: ${zipFileNames.join(', ')}`);
  }

  // ---------- Step 3: Parse GTFS ----------
  console.log('\n[3/5] Parsing GTFS routes + trips + stop_times...');

  // routes
  const routesData = parseCsv(getZipText('routes.txt'));
  const routeShortName = new Map();
  for (const r of routesData) {
    routeShortName.set(r['route_id'], r['route_short_name'] || r['route_id']);
  }
  console.log(`  routes: ${routesData.length}`);

  // trips
  const tripsData = parseCsv(getZipText('trips.txt'));
  const tripToRoute = new Map();
  for (const t of tripsData) {
    tripToRoute.set(t['trip_id'], t['route_id']);
  }
  console.log(`  trips: ${tripsData.length}`);

  // stop_times - parse per trip to build sequences
  console.log('  Parsing stop_times.txt...');
  const stopTimesText = getZipText('stop_times.txt');
  const stLines = stopTimesText.split('\n');
  const stHdr = parseCsvLine(stLines[0]);
  const idxTrip = stHdr.indexOf('trip_id');
  const idxStop = stHdr.indexOf('stop_id');
  const idxSeq  = stHdr.indexOf('stop_sequence');

  // Build per-trip stop sequences
  const tripStops = new Map(); // tripId -> { lineKey, stops: [{seq,complexId}] }

  for (let i = 1; i < stLines.length; i++) {
    const raw = stLines[i];
    if (!raw.trim()) continue;
    const vals = parseCsvLine(raw);
    const tripId = vals[idxTrip];
    const stopId = vals[idxStop];
    const seq = parseInt(vals[idxSeq], 10);
    if (!tripId || !stopId || isNaN(seq)) continue;

    const routeId = tripToRoute.get(tripId);
    if (!routeId) continue;

    const lineName = routeShortName.get(routeId) || routeId;
    // Normalize: FS/GS shuttles -> S, skip SIR/SI
    let lineKey = lineName;
    if (lineKey === 'FS' || lineKey === 'GS') lineKey = 'S';
    if (lineKey === 'SIR' || lineKey === 'SI') continue;

    const baseStop = stopId.replace(/[NS]$/, '');
    const complexId = gtfsStopToComplex.get(stopId) || gtfsStopToComplex.get(baseStop);
    if (!complexId) continue;

    if (!tripStops.has(tripId)) tripStops.set(tripId, { lineKey, stops: [] });
    tripStops.get(tripId).stops.push({ seq, complexId });
  }

  console.log(`  Processed ${tripStops.size} trips`);

  // ---------- Step 4: Build branch patterns per route ----------
  console.log('\n[4/5] Building branches...');

  // routePatterns: lineKey -> Map<patternStr, {count, stops: complexId[]}>
  const routePatterns = new Map();

  for (const [, { lineKey, stops }] of tripStops) {
    stops.sort((a, b) => a.seq - b.seq);
    // Deduplicate consecutive same complexId
    const deduped = [];
    for (const s of stops) {
      if (!deduped.length || deduped[deduped.length - 1] !== s.complexId) {
        deduped.push(s.complexId);
      }
    }
    if (deduped.length < 2) continue;

    const pat = deduped.join(',');
    if (!routePatterns.has(lineKey)) routePatterns.set(lineKey, new Map());
    const pm = routePatterns.get(lineKey);
    if (!pm.has(pat)) pm.set(pat, { count: 0, stops: deduped });
    pm.get(pat).count++;
  }

  function buildBranches(lineKey) {
    const pm = routePatterns.get(lineKey);
    if (!pm || pm.size === 0) return [];

    const sorted = [...pm.values()].sort((a, b) => b.count - a.count);

    // Collect all complexIds across all patterns for this line
    const allStops = new Set();
    for (const { stops } of sorted) for (const s of stops) allStops.add(s);

    const branches = [];
    const coveredStops = new Set();

    for (const { stops } of sorted) {
      const newStops = stops.filter(s => !coveredStops.has(s));
      if (newStops.length > 0 || branches.length === 0) {
        branches.push(stops.map(toId));
        for (const s of stops) coveredStops.add(s);
      }
      if (coveredStops.size >= allStops.size) break;
      if (branches.length >= 8) break;
    }

    return branches;
  }

  // ---------- Build final lines ----------
  const linesOut = [];
  for (const lineKey of LINE_ORDER) {
    const branches = buildBranches(lineKey);
    if (branches.length === 0) continue;
    linesOut.push({
      id: lineKey,
      name: lineDisplayName(lineKey),
      color: LINE_COLORS[lineKey] || '#888888',
      branches,
    });
  }

  // ---------- Build station list ----------
  // Determine used complexIds from branches
  const usedComplexIds = new Set();
  for (const line of linesOut) {
    for (const branch of line.branches) {
      for (const stId of branch) {
        usedComplexIds.add(stId.replace(/^c_/, ''));
      }
    }
  }

  // Station lines from branch membership
  const stationLinesMap = new Map(); // complexId -> Set<lineKey>
  for (const line of linesOut) {
    for (const branch of line.branches) {
      for (const stId of branch) {
        const cid = stId.replace(/^c_/, '');
        if (!stationLinesMap.has(cid)) stationLinesMap.set(cid, new Set());
        stationLinesMap.get(cid).add(line.id);
      }
    }
  }

  const stationsOut = [];
  for (const [complexId, c] of complexMap) {
    if (!usedComplexIds.has(complexId)) continue;
    const linesArr = [...(stationLinesMap.get(complexId) || new Set())]
      .filter(r => LINE_ORDER.includes(r))
      .sort((a, b) => LINE_ORDER.indexOf(a) - LINE_ORDER.indexOf(b));
    stationsOut.push({
      id: toId(complexId),
      name: c.name,
      lat: Math.round(c.lat * 10000) / 10000,
      lng: Math.round(c.lng * 10000) / 10000,
      lines: linesArr,
    });
  }
  stationsOut.sort((a, b) => a.name.localeCompare(b.name));

  // ---------- Connections ----------
  const connectionSet = new Set();
  const connectionsOut = [];
  for (const line of linesOut) {
    for (const branch of line.branches) {
      for (let i = 0; i < branch.length - 1; i++) {
        const from = branch[i];
        const to = branch[i + 1];
        const key = from < to ? `${from}|${to}` : `${to}|${from}`;
        if (!connectionSet.has(key)) {
          connectionSet.add(key);
          connectionsOut.push({ from, to, time: 2 });
        }
      }
    }
  }

  console.log(`  ${stationsOut.length} stations, ${linesOut.length} lines, ${connectionsOut.length} connections`);

  // ---------- Step 5: Write TypeScript files ----------
  console.log('\n[5/5] Writing TypeScript files...');

  // stations.ts
  let stationsTs = `import type { Station, Connection } from '../../types';

export type { Station, Connection };

export const stations: Station[] = [
`;
  for (const s of stationsOut) {
    const linesStr = s.lines.map(l => `"${l}"`).join(', ');
    stationsTs += `  { id: "${s.id}", name: "${s.name}", lat: ${s.lat}, lng: ${s.lng}, lines: [${linesStr}] },\n`;
  }
  stationsTs += `];

// Connections between adjacent stations (bidirectional, default 2 min)
function buildConnections(): Connection[] {
  const edges: [string, string, number][] = [
`;
  for (const c of connectionsOut) {
    stationsTs += `    ["${c.from}", "${c.to}", ${c.time}],\n`;
  }
  stationsTs += `  ];
  const conns: Connection[] = [];
  for (const [from, to, time] of edges) {
    conns.push({ from, to, time });
    conns.push({ from: to, to: from, time });
  }
  return conns;
}

export const connections: Connection[] = buildConnections();
`;
  writeFileSync(join(OUT_DIR, 'stations.ts'), stationsTs);
  console.log('  -> src/data/cities/new-york/stations.ts');

  // lines.ts
  let linesTs = `import type { LineDefinition } from '../../types';

export type { LineDefinition };

export const lines: LineDefinition[] = [
`;
  for (const line of linesOut) {
    linesTs += `  {\n`;
    linesTs += `    id: "${line.id}", name: "${line.name}", color: "${line.color}", type: "metro",\n`;
    linesTs += `    branches: [\n`;
    for (const branch of line.branches) {
      const items = branch.map(s => `"${s}"`);
      let branchStr = '      [';
      let lineLen = branchStr.length;
      for (let i = 0; i < items.length; i++) {
        const item = items[i] + (i < items.length - 1 ? ', ' : '');
        if (lineLen + item.length > 100 && i > 0) {
          branchStr += '\n       ';
          lineLen = 7;
        }
        branchStr += item;
        lineLen += item.length;
      }
      branchStr += '],\n';
      linesTs += branchStr;
    }
    linesTs += `    ],\n`;
    linesTs += `  },\n`;
  }
  linesTs += `];\n`;
  writeFileSync(join(OUT_DIR, 'lines.ts'), linesTs);
  console.log('  -> src/data/cities/new-york/lines.ts');

  // gtfs-times.ts
  writeFileSync(join(OUT_DIR, 'gtfs-times.ts'),
    `export const gtfsSegmentTimes: Record<string, number> = {};\nexport const gtfsTransferTimes: Record<string, number> = {};\n`
  );
  console.log('  -> src/data/cities/new-york/gtfs-times.ts');

  console.log('\nDone!');
  console.log(`Lines: ${linesOut.map(l => l.id).join(', ')}`);
}

function lineDisplayName(lineKey) {
  return lineKey === 'S' ? 'S Shuttle' : `${lineKey} Train`;
}

main().catch(err => { console.error(err); process.exit(1); });
