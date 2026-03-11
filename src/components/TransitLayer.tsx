import { useMemo, useState, useEffect } from 'react';
import { Polyline, CircleMarker, Tooltip, useMap } from 'react-leaflet';
import type { Station } from '../data/types';
import type { LineDefinition } from '../data/types';

function resolveCoords(ids: string[], stationMap: Map<string, Station>): [number, number][] {
  return ids
    .map(id => {
      const s = stationMap.get(id);
      return s ? [s.lat, s.lng] as [number, number] : null;
    })
    .filter((c): c is [number, number] => c !== null);
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

  const lineElements = useMemo(() => {
    if (!showLines) return null;
    return lines.flatMap(line =>
      line.branches.map((branch, bi) => {
        const coords = resolveCoords(branch, stationMap);
        if (coords.length < 2) return null;
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
  }, [showLines, lines, stationMap]);

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
