import { useMemo, useState, useEffect } from 'react';
import { Polyline, CircleMarker, Tooltip, useMap } from 'react-leaflet';
import type { Station } from '../data/types';
import type { LineDefinition } from '../data/types';

interface ResolvedBranch {
  ids: string[];
  coords: [number, number][];
}

function resolveBranch(ids: string[], stationMap: Map<string, Station>): ResolvedBranch {
  const resultIds: string[] = [];
  const resultCoords: [number, number][] = [];
  for (const id of ids) {
    const s = stationMap.get(id);
    if (s) {
      resultIds.push(id);
      resultCoords.push([s.lat, s.lng]);
    }
  }
  return { ids: resultIds, coords: resultCoords };
}

/** Build a segment key (order-independent) for two station IDs */
function segKey(a: string, b: string): string {
  return a < b ? `${a}|${b}` : `${b}|${a}`;
}

/**
 * For each segment shared by multiple lines, assign each line an offset index.
 * Returns a map: lineId -> segKey -> { index, total }
 */
function buildSegmentOffsets(lines: LineDefinition[]): Map<string, Map<string, { index: number; total: number }>> {
  // First pass: collect all lines per segment
  const segLines = new Map<string, string[]>();
  for (const line of lines) {
    for (const branch of line.branches) {
      for (let i = 0; i < branch.length - 1; i++) {
        const key = segKey(branch[i], branch[i + 1]);
        let arr = segLines.get(key);
        if (!arr) { arr = []; segLines.set(key, arr); }
        if (!arr.includes(line.id)) arr.push(line.id);
      }
    }
  }

  // Second pass: for segments with >1 line, assign offsets
  const result = new Map<string, Map<string, { index: number; total: number }>>();
  for (const [key, lineIds] of segLines) {
    if (lineIds.length < 2) continue;
    for (let i = 0; i < lineIds.length; i++) {
      let lineMap = result.get(lineIds[i]);
      if (!lineMap) { lineMap = new Map(); result.set(lineIds[i], lineMap); }
      lineMap.set(key, { index: i, total: lineIds.length });
    }
  }
  return result;
}

/** Offset a coordinate perpendicular to the segment direction */
function offsetPoint(
  lat: number, lng: number,
  nextLat: number, nextLng: number,
  offsetMeters: number,
): [number, number] {
  const dlat = nextLat - lat;
  const dlng = nextLng - lng;
  const len = Math.sqrt(dlat * dlat + dlng * dlng);
  if (len === 0) return [lat, lng];
  // Perpendicular unit vector (rotated 90°)
  const perpLat = -dlng / len;
  const perpLng = dlat / len;
  // Rough conversion: 1 degree lat ≈ 111320m
  const dLat = perpLat * offsetMeters / 111320;
  const dLng = perpLng * offsetMeters / (111320 * Math.cos(lat * Math.PI / 180));
  return [lat + dLat, lng + dLng];
}

/** Offset a branch's coordinates where segments are shared */
function offsetBranch(
  resolved: ResolvedBranch,
  lineId: string,
  segmentOffsets: Map<string, Map<string, { index: number; total: number }>>,
  spacingMeters: number,
): [number, number][] {
  const lineOffsets = segmentOffsets.get(lineId);
  if (!lineOffsets) return resolved.coords;
  const { ids, coords } = resolved;

  return coords.map((coord, i) => {
    // Average offset from adjacent segments
    let totalOffset = 0;
    let count = 0;

    if (i < ids.length - 1) {
      const key = segKey(ids[i], ids[i + 1]);
      const info = lineOffsets.get(key);
      if (info) {
        totalOffset += (info.index - (info.total - 1) / 2) * spacingMeters;
        count++;
      }
    }
    if (i > 0) {
      const key = segKey(ids[i - 1], ids[i]);
      const info = lineOffsets.get(key);
      if (info) {
        totalOffset += (info.index - (info.total - 1) / 2) * spacingMeters;
        count++;
      }
    }

    if (count === 0) return coord;
    const avgOffset = totalOffset / count;

    // Get direction from adjacent point
    const refIdx = i < coords.length - 1 ? i + 1 : i - 1;
    return offsetPoint(coord[0], coord[1], coords[refIdx][0], coords[refIdx][1], avgOffset);
  });
}

function getUniqueStations(stations: Station[]): (Station & { isHub: boolean })[] {
  const seen = new Set<string>();
  const result: (Station & { isHub: boolean })[] = [];
  for (const s of stations) {
    if (seen.has(s.id)) continue;
    seen.add(s.id);
    result.push({ ...s, isHub: s.lines.length >= 2 });
  }
  return result;
}

interface Props {
  showStations: boolean;
  showLines: boolean;
  stations: Station[];
  lines: LineDefinition[];
}

export default function TransitLayer({ showStations, showLines, stations, lines }: Props) {
  const map = useMap();
  const [zoom, setZoom] = useState(map.getZoom());

  useEffect(() => {
    const onZoom = () => setZoom(map.getZoom());
    map.on('zoomend', onZoom);
    return () => { map.off('zoomend', onZoom); };
  }, [map]);

  const stationMap = useMemo(() => {
    const m = new Map<string, Station>();
    for (const s of stations) m.set(s.id, s);
    return m;
  }, [stations]);

  const uniqueStations = useMemo(() => getUniqueStations(stations), [stations]);

  const segmentOffsets = useMemo(() => buildSegmentOffsets(lines), [lines]);

  const lineElements = useMemo(() => {
    if (!showLines) return null;
    const spacing = 40; // meters between parallel lines
    return lines.flatMap(line =>
      line.branches.map((branch, bi) => {
        const resolved = resolveBranch(branch, stationMap);
        if (resolved.coords.length < 2) return null;
        const coords = offsetBranch(resolved, line.id, segmentOffsets, spacing);
        return (
          <Polyline
            key={`${line.id}-${bi}`}
            positions={coords}
            pathOptions={{
              color: line.color,
              weight: line.type === 'rer' ? 4 : line.type === 'tram' || line.type === 'cable' ? 2 : 3,
              opacity: line.type === 'tram' || line.type === 'cable' ? 0.7 : 0.85,
              dashArray: line.type === 'rer' ? '8 4' : line.type === 'tram' ? '4 3' : line.type === 'cable' ? '2 6' : undefined,
            }}
          >
            <Tooltip sticky>{line.name}</Tooltip>
          </Polyline>
        );
      }).filter(Boolean)
    );
  }, [showLines, lines, stationMap, segmentOffsets]);

  const showMarkers = showStations && zoom >= 12;
  const showLabels = zoom >= 14;
  const markerRadius = zoom >= 15 ? 6 : zoom >= 14 ? 4.5 : zoom >= 13 ? 3 : 2;

  const stationElements = useMemo(() => {
    if (!showMarkers) return null;
    return uniqueStations.map(s => {
      const r = s.isHub ? markerRadius * 1.3 : markerRadius;
      return (
        <CircleMarker
          key={s.id}
          center={[s.lat, s.lng]}
          radius={r}
          pathOptions={{
            fillColor: s.isHub ? '#ffffff' : '#cbd5e1',
            color: s.isHub ? '#334155' : '#64748b',
            weight: s.isHub ? 2 : 1,
            fillOpacity: 0.95,
          }}
        >
          {showLabels && (
            <Tooltip direction="top" offset={[0, -6]}>
              <span style={{ fontSize: '11px', fontWeight: s.isHub ? 600 : 400 }}>
                {s.name}
                {s.lines.length > 1 && (
                  <span style={{ color: '#888', fontSize: '10px' }}>
                    {' '}({s.lines.join(', ')})
                  </span>
                )}
              </span>
            </Tooltip>
          )}
        </CircleMarker>
      );
    });
  }, [showMarkers, showLabels, markerRadius, uniqueStations]);

  return (
    <>
      {lineElements}
      {stationElements}
    </>
  );
}
