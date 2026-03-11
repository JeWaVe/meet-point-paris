#!/usr/bin/env node
/**
 * Generates London Underground station and line data from public JSON.
 * Usage: node scripts/generate-london-data.mjs
 */

import { writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');

const DATA_URL = 'https://gist.githubusercontent.com/drupol/930f851017c44e1176d3aa0a1212c369/raw/data.json';

// Only these Underground lines
const ALLOWED_LINES = {
  'Bakerloo Line': 'BAK',
  'Central Line': 'CEN',
  'Circle Line': 'CIR',
  'District Line': 'DIS',
  'Hammersmith & City Line': 'HAM',
  'Jubilee Line': 'JUB',
  'Metropolitan Line': 'MET',
  'Northern Line': 'NOR',
  'Piccadilly Line': 'PIC',
  'Victoria Line': 'VIC',
  'Waterloo & City Line': 'WAC',
};

function toSnakeCase(name) {
  return name
    .toLowerCase()
    .replace(/['']/g, '')       // remove apostrophes
    .replace(/[&]/g, 'and')     // & -> and
    .replace(/[.\-/()]/g, ' ') // dots, dashes, slashes, parens -> space
    .replace(/\s+/g, '_')      // spaces -> underscore
    .replace(/_+/g, '_')       // collapse multiple underscores
    .replace(/^_|_$/g, '');    // trim leading/trailing underscores
}

async function main() {
  console.log('Fetching London Underground data...');
  const resp = await fetch(DATA_URL);
  const data = await resp.json();

  // Build lookup maps
  const lineById = new Map();
  for (const l of data.lines) {
    lineById.set(String(l.line), l);
  }

  // Determine which line IDs are allowed
  const allowedLineIds = new Set();
  const lineIdToAbbr = new Map();
  const lineIdToInfo = new Map();
  for (const l of data.lines) {
    const abbr = ALLOWED_LINES[l.name];
    if (abbr) {
      allowedLineIds.add(String(l.line));
      lineIdToAbbr.set(String(l.line), abbr);
      lineIdToInfo.set(String(l.line), { name: l.name, colour: l.colour });
    }
  }

  console.log('Allowed lines:', [...lineIdToAbbr.entries()].map(([id, a]) => `${lineIdToInfo.get(id).name} (${a})`).join(', '));

  // Filter connections to allowed lines only
  const allowedConnections = data.connections.filter(c => allowedLineIds.has(String(c.line)));

  // Determine which stations appear in allowed connections
  const stationIdsInUse = new Set();
  for (const c of allowedConnections) {
    stationIdsInUse.add(String(c.station1));
    stationIdsInUse.add(String(c.station2));
  }

  // Build station map
  const stationById = new Map();
  for (const s of data.stations) {
    if (stationIdsInUse.has(String(s.id))) {
      stationById.set(String(s.id), s);
    }
  }

  // Figure out which lines each station is on (from connections)
  const stationLines = new Map(); // stationId -> Set of line abbreviations
  for (const c of allowedConnections) {
    const abbr = lineIdToAbbr.get(String(c.line));
    for (const sid of [String(c.station1), String(c.station2)]) {
      if (!stationLines.has(sid)) stationLines.set(sid, new Set());
      stationLines.get(sid).add(abbr);
    }
  }

  // Build snake_case IDs, handle duplicates
  const snakeIdCount = new Map();
  const stationSnakeIds = new Map(); // original id -> snake_case id
  const sortedStationIds = [...stationById.keys()].sort((a, b) => {
    const sa = stationById.get(a), sb = stationById.get(b);
    return sa.name.localeCompare(sb.name);
  });

  for (const sid of sortedStationIds) {
    const s = stationById.get(sid);
    let snake = toSnakeCase(s.name);
    const count = (snakeIdCount.get(snake) || 0) + 1;
    snakeIdCount.set(snake, count);
    if (count > 1) snake = `${snake}_${count}`;
    stationSnakeIds.set(sid, snake);
  }

  // ---- Generate stations.ts ----
  console.log(`Generating stations.ts with ${stationById.size} stations...`);

  // Sort by line abbreviation for nicer grouping
  const abbrOrder = Object.values(ALLOWED_LINES);
  const stationsArray = sortedStationIds.map(sid => {
    const s = stationById.get(sid);
    const lines = [...stationLines.get(sid)].sort((a, b) => abbrOrder.indexOf(a) - abbrOrder.indexOf(b));
    return {
      id: stationSnakeIds.get(sid),
      name: s.name,
      lat: parseFloat(s.latitude),
      lng: parseFloat(s.longitude),
      lines,
    };
  });

  // Build connection edges with snake_case IDs
  // Group by line for the buildLineConnections function
  const connectionEdges = [];
  for (const c of allowedConnections) {
    const from = stationSnakeIds.get(String(c.station1));
    const to = stationSnakeIds.get(String(c.station2));
    const time = parseFloat(c.time);
    if (from && to) {
      connectionEdges.push({ from, to, time });
    }
  }

  let stationsTs = `import type { Station, Connection } from '../../types';

export type { Station, Connection };

export const stations: Station[] = [
`;

  for (const s of stationsArray) {
    const linesStr = s.lines.map(l => `"${l}"`).join(', ');
    stationsTs += `  { id: "${s.id}", name: "${s.name}", lat: ${s.lat.toFixed(4)}, lng: ${s.lng.toFixed(4)}, lines: [${linesStr}] },\n`;
  }

  stationsTs += `];

// Connections between adjacent stations (bidirectional)
function buildLineConnections(): Connection[] {
  const edges: [string, string, number][] = [
`;

  for (const e of connectionEdges) {
    stationsTs += `    ["${e.from}", "${e.to}", ${e.time}],\n`;
  }

  stationsTs += `  ];

  const conns: Connection[] = [];
  for (const [from, to, time] of edges) {
    conns.push({ from, to, time });
    conns.push({ from: to, to: from, time });
  }
  return conns;
}

export const connections: Connection[] = [
  ...buildLineConnections(),
];
`;

  writeFileSync(join(ROOT, 'src/data/cities/london/stations.ts'), stationsTs);
  console.log('  -> src/data/cities/london/stations.ts');

  // ---- Generate lines.ts with branches ----
  console.log('Generating lines.ts with branch detection...');

  // For each allowed line, build a graph and detect branches
  const linesArray = [];

  for (const [lineId, abbr] of lineIdToAbbr.entries()) {
    const info = lineIdToInfo.get(lineId);
    const lineConns = allowedConnections.filter(c => String(c.line) === lineId);

    // Build adjacency graph (using snake_case IDs)
    const adj = new Map(); // snakeId -> Set of snakeId
    for (const c of lineConns) {
      const s1 = stationSnakeIds.get(String(c.station1));
      const s2 = stationSnakeIds.get(String(c.station2));
      if (!s1 || !s2) continue;
      if (!adj.has(s1)) adj.set(s1, new Set());
      if (!adj.has(s2)) adj.set(s2, new Set());
      adj.get(s1).add(s2);
      adj.get(s2).add(s1);
    }

    // Find terminals (degree 1) and junctions (degree 3+)
    const terminals = [];
    const junctions = [];
    for (const [node, neighbors] of adj.entries()) {
      if (neighbors.size === 1) terminals.push(node);
      if (neighbors.size >= 3) junctions.push(node);
    }

    // Build branches by DFS from each terminal
    const branches = [];
    const usedEdges = new Set(); // "a->b"

    function edgeKey(a, b) { return a < b ? `${a}|${b}` : `${b}|${a}`; }

    // For lines with no junctions (simple line), just walk from a terminal
    if (junctions.length === 0 && terminals.length >= 1) {
      const path = [];
      const visited = new Set();
      let current = terminals[0];
      while (current) {
        visited.add(current);
        path.push(current);
        const neighbors = adj.get(current) || new Set();
        let next = null;
        for (const n of neighbors) {
          if (!visited.has(n)) { next = n; break; }
        }
        current = next;
      }
      branches.push(path);
    } else {
      // Lines with branches: DFS from each terminal, stop at visited junctions
      // First, do a full traversal to get all branches

      // Strategy: walk from each terminal until we hit another terminal or a junction
      // that has been fully explored
      const globalVisitedEdges = new Set();

      for (const term of terminals) {
        // DFS from this terminal
        const path = [term];
        const visited = new Set([term]);
        let current = term;
        let stuck = false;

        while (!stuck) {
          const neighbors = adj.get(current) || new Set();
          let next = null;
          for (const n of neighbors) {
            const ek = edgeKey(current, n);
            if (!globalVisitedEdges.has(ek)) {
              next = n;
              break;
            }
          }
          if (next) {
            globalVisitedEdges.add(edgeKey(current, next));
            path.push(next);
            current = next;
            // Stop if we hit another terminal (that's not our starting point)
            if (terminals.includes(next) && next !== term) {
              stuck = true;
            }
          } else {
            stuck = true;
          }
        }

        if (path.length > 1) {
          branches.push(path);
        }
      }

      // If some edges weren't covered (e.g., Circle line loop), walk remaining
      for (const c of lineConns) {
        const s1 = stationSnakeIds.get(String(c.station1));
        const s2 = stationSnakeIds.get(String(c.station2));
        if (!s1 || !s2) continue;
        const ek = edgeKey(s1, s2);
        if (!globalVisitedEdges.has(ek)) {
          // There's an uncovered edge - build a path from it
          const path = [s1];
          let current = s1;
          const localVisited = new Set();
          let stuck = false;
          while (!stuck) {
            const neighbors = adj.get(current) || new Set();
            let next = null;
            for (const n of neighbors) {
              const ek2 = edgeKey(current, n);
              if (!globalVisitedEdges.has(ek2) && !localVisited.has(ek2)) {
                next = n;
                localVisited.add(ek2);
                globalVisitedEdges.add(ek2);
                break;
              }
            }
            if (next) {
              path.push(next);
              current = next;
            } else {
              stuck = true;
            }
          }
          if (path.length > 1) {
            branches.push(path);
          }
        }
      }
    }

    linesArray.push({
      id: abbr,
      name: info.name,
      color: `#${info.colour}`,
      type: 'metro',
      branches,
    });
  }

  // Sort lines by a canonical order
  const lineOrder = Object.values(ALLOWED_LINES);
  linesArray.sort((a, b) => lineOrder.indexOf(a.id) - lineOrder.indexOf(b.id));

  let linesTs = `import type { LineDefinition } from '../../types';

export type { LineDefinition };

export const lines: LineDefinition[] = [
`;

  for (const line of linesArray) {
    linesTs += `  {\n`;
    linesTs += `    id: "${line.id}", name: "${line.name}", color: "${line.color}", type: "${line.type}",\n`;
    linesTs += `    branches: [\n`;
    for (const branch of line.branches) {
      // Format branch array
      const items = branch.map(s => `"${s}"`);
      // Wrap at ~100 chars
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

  writeFileSync(join(ROOT, 'src/data/cities/london/lines.ts'), linesTs);
  console.log('  -> src/data/cities/london/lines.ts');

  // ---- Generate gtfs-times.ts ----
  const gtfsTs = `export const gtfsSegmentTimes: Record<string, Record<string, number>> = {};
export const gtfsTransferTimes: Record<string, number> = {};
`;
  writeFileSync(join(ROOT, 'src/data/cities/london/gtfs-times.ts'), gtfsTs);
  console.log('  -> src/data/cities/london/gtfs-times.ts');

  console.log('Done!');
}

main().catch(err => { console.error(err); process.exit(1); });
