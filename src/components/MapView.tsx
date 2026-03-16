import { useEffect, useRef, useCallback } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents, useMap } from 'react-leaflet';
import L from 'leaflet';
import type { LatLngBoundsExpression } from 'leaflet';
import type { SelectedPoint, HeatmapResult } from '../utils/heatmap';
import type { NearbyPlace } from '../utils/places';
import type { CandidateResult } from './CityView';
import type { Station } from '../data/types';
import type { LineDefinition } from '../data/types';
import TransitLayer from './TransitLayer';
import { useI18n } from '../i18n/context';

import iconUrl from 'leaflet/dist/images/marker-icon.png';
import iconRetinaUrl from 'leaflet/dist/images/marker-icon-2x.png';
import shadowUrl from 'leaflet/dist/images/marker-shadow.png';

L.Icon.Default.mergeOptions({ iconUrl, iconRetinaUrl, shadowUrl });

const userIcons: L.DivIcon[] = [];
function getUserIcon(index: number): L.DivIcon {
  if (!userIcons[index]) {
    const label = index + 1;
    userIcons[index] = new L.DivIcon({
      html: `<div style="background: #6366f1; width: 28px; height: 28px; border-radius: 50%; border: 3px solid white; box-shadow: 0 2px 8px rgba(0,0,0,0.4); display: flex; align-items: center; justify-content: center; color: white; font-size: 13px; font-weight: 700; font-family: system-ui, sans-serif;">${label}</div>`,
      className: '',
      iconSize: [28, 28],
      iconAnchor: [14, 14],
    });
  }
  return userIcons[index];
}

const optimalIcon = new L.DivIcon({
  html: `<div style="background: #10b981; width: 36px; height: 36px; border-radius: 50%; border: 3px solid white; box-shadow: 0 2px 12px rgba(16,185,129,0.5); display: flex; align-items: center; justify-content: center; font-size: 18px;">⭐</div>`,
  className: '',
  iconSize: [36, 36],
  iconAnchor: [18, 18],
});

const candidateIcons: Record<number, L.DivIcon> = {};
function getCandidateIcon(rank: number): L.DivIcon {
  if (!candidateIcons[rank]) {
    candidateIcons[rank] = new L.DivIcon({
      html: `<div style="background: #64748b; width: 30px; height: 30px; border-radius: 50%; border: 2px solid white; box-shadow: 0 2px 8px rgba(0,0,0,0.3); display: flex; align-items: center; justify-content: center; color: white; font-size: 13px; font-weight: 700; font-family: system-ui, sans-serif;">#${rank}</div>`,
      className: '',
      iconSize: [30, 30],
      iconAnchor: [15, 15],
    });
  }
  return candidateIcons[rank];
}

function getPlaceCategory(types: string[], t: { bar: string; cafe: string; restaurant: string }): { emoji: string; label: string } {
  if (types.includes('bar')) return { emoji: '🍸', label: t.bar };
  if (types.includes('cafe')) return { emoji: '☕', label: t.cafe };
  return { emoji: '🍽️', label: t.restaurant };
}

const placeIcons: Record<string, L.DivIcon> = {};
function getPlaceIcon(emoji: string) {
  if (!placeIcons[emoji]) {
    placeIcons[emoji] = new L.DivIcon({
      html: `<div style="background: #f59e0b; width: 24px; height: 24px; border-radius: 50%; border: 2px solid white; box-shadow: 0 2px 6px rgba(0,0,0,0.3); display: flex; align-items: center; justify-content: center; font-size: 12px;">${emoji}</div>`,
      className: '',
      iconSize: [24, 24],
      iconAnchor: [12, 12],
    });
  }
  return placeIcons[emoji];
}

function MapClickHandler({ onClick }: { onClick: (lat: number, lng: number) => void }) {
  useMapEvents({
    click(e) {
      onClick(e.latlng.lat, e.latlng.lng);
    },
  });
  return null;
}

function timeToColor(t: number, minTime: number, maxTime: number): [number, number, number, number] {
  const range = maxTime - minTime || 1;
  const linear = Math.max(0, Math.min(1, (t - minTime) / range));
  // Power curve: stretches low values (good areas) for better discrimination
  const ratio = Math.pow(linear, 0.3);

  let r: number, g: number, b: number;
  if (ratio < 0.15) {
    // Deep green → bright green (best zones, more granularity)
    const f = ratio / 0.15;
    r = Math.round(0 + f * 34);
    g = Math.round(130 + f * (197 - 130));
    b = Math.round(60 + f * (94 - 60));
  } else if (ratio < 0.35) {
    // Bright green → yellow-green
    const f = (ratio - 0.15) / 0.20;
    r = Math.round(34 + f * (180 - 34));
    g = Math.round(197 + f * (210 - 197));
    b = Math.round(94 - f * 60);
  } else if (ratio < 0.55) {
    // Yellow-green → orange
    const f = (ratio - 0.35) / 0.20;
    r = Math.round(180 + f * (245 - 180));
    g = Math.round(210 - f * (210 - 158));
    b = Math.round(34 - f * 10);
  } else if (ratio < 0.75) {
    // Orange → red
    const f = (ratio - 0.55) / 0.20;
    r = Math.round(245 - f * 6);
    g = Math.round(158 - f * 90);
    b = Math.round(24 + f * 20);
  } else {
    // Red → dark purple
    const f = (ratio - 0.75) / 0.25;
    r = Math.round(239 - f * 119);
    g = Math.round(68 - f * 50);
    b = Math.round(44 + f * 56);
  }

  return [r, g, b, 160];
}

function CanvasHeatmapLayer({ heatmapResult }: { heatmapResult: HeatmapResult | null }) {
  const map = useMap();
  const canvasLayerRef = useRef<L.Layer | null>(null);

  const drawHeatmap = useCallback(() => {
    if (canvasLayerRef.current) {
      map.removeLayer(canvasLayerRef.current);
      canvasLayerRef.current = null;
    }

    if (!heatmapResult || heatmapResult.points.length === 0) return;

    const { grid, gridSize, bounds, minTime, maxTime } = heatmapResult;
    if (!grid) return;

    const canvasOverlay = L.Layer.extend({
      onAdd(map: L.Map) {
        this._map = map;
        this._canvas = L.DomUtil.create('canvas', 'leaflet-heatmap-canvas') as HTMLCanvasElement;
        this._canvas.style.position = 'absolute';
        this._canvas.style.pointerEvents = 'none';
        const pane = map.getPane('overlayPane');
        if (pane) pane.appendChild(this._canvas);
        map.on('moveend zoomend resize', this._reset, this);
        this._reset();
      },
      onRemove(map: L.Map) {
        map.off('moveend zoomend resize', this._reset, this);
        if (this._canvas && this._canvas.parentNode) {
          this._canvas.parentNode.removeChild(this._canvas);
        }
      },
      _reset() {
        const map = this._map;
        const canvas = this._canvas;
        if (!map || !canvas) return;

        const size = map.getSize();
        canvas.width = size.x;
        canvas.height = size.y;

        const topLeft = map.containerPointToLayerPoint([0, 0]);
        L.DomUtil.setPosition(canvas, topLeft);

        const ctx = canvas.getContext('2d');
        if (!ctx) return;
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        const latStep = (bounds.latMax - bounds.latMin) / gridSize;
        const lngStep = (bounds.lngMax - bounds.lngMin) / gridSize;

        for (let i = 0; i < gridSize; i++) {
          for (let j = 0; j < gridSize; j++) {
            const time = grid[i][j];
            const lat = bounds.latMin + i * latStep;
            const lng = bounds.lngMin + j * lngStep;
            const lat2 = lat + latStep;
            const lng2 = lng + lngStep;

            const topLeftPx = map.latLngToContainerPoint([lat2, lng]);
            const bottomRightPx = map.latLngToContainerPoint([lat, lng2]);

            const w = bottomRightPx.x - topLeftPx.x;
            const h = bottomRightPx.y - topLeftPx.y;

            if (topLeftPx.x + w < 0 || topLeftPx.x > size.x ||
                topLeftPx.y + h < 0 || topLeftPx.y > size.y) continue;

            const [r, g, b, a] = timeToColor(time, minTime, maxTime);
            ctx.fillStyle = `rgba(${r},${g},${b},${a / 255})`;
            ctx.fillRect(topLeftPx.x, topLeftPx.y, Math.max(w, 1), Math.max(h, 1));
          }
        }
      },
    });

    const layer = new canvasOverlay();
    layer.addTo(map);
    canvasLayerRef.current = layer;
  }, [heatmapResult, map]);

  useEffect(() => {
    drawHeatmap();
    return () => {
      if (canvasLayerRef.current) {
        map.removeLayer(canvasLayerRef.current);
        canvasLayerRef.current = null;
      }
    };
  }, [drawHeatmap, map]);

  return null;
}

interface Props {
  points: SelectedPoint[];
  heatmapResult: HeatmapResult | null;
  candidates: CandidateResult[];
  activeCandidate: number;
  onSelectCandidate: (idx: number) => void;
  onMapClick: (lat: number, lng: number) => void;
  showTransit: boolean;
  showHeatmap: boolean;
  nearbyPlaces: NearbyPlace[];
  stations: Station[];
  lines: LineDefinition[];
  center: [number, number];
  defaultZoom: number;
  maxBounds: LatLngBoundsExpression;
  minZoom: number;
}

export default function MapView({ points, heatmapResult, candidates, activeCandidate, onSelectCandidate, onMapClick, showTransit, showHeatmap, nearbyPlaces, stations, lines, center, defaultZoom, maxBounds, minZoom }: Props) {
  const { t } = useI18n();
  return (
    <MapContainer
      center={center}
      zoom={defaultZoom}
      className="h-full w-full"
      zoomControl={false}
      maxBounds={maxBounds}
      maxBoundsViscosity={0.9}
      minZoom={minZoom}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
        url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
      />

      <MapClickHandler onClick={onMapClick} />

      {/* Transit lines and stations layer (below heatmap when heatmap is active) */}
      <TransitLayer showLines={showTransit} showStations={showTransit} stations={stations} lines={lines} />

      <CanvasHeatmapLayer heatmapResult={showHeatmap ? heatmapResult : null} />

      {points.map((p, i) => (
        <Marker key={p.id} position={[p.lat, p.lng]} icon={getUserIcon(i)}>
          <Popup>
            <div className="text-sm">
              <strong>{t.point} {i + 1}</strong><br />
              {p.address}
            </div>
          </Popup>
        </Marker>
      ))}

      {nearbyPlaces.map(place => {
        const cat = getPlaceCategory(place.types, t);
        return (
        <Marker key={place.id} position={[place.lat, place.lng]} icon={getPlaceIcon(cat.emoji)}>
          <Popup>
            <div className="text-sm">
              <span style={{marginRight: 4}}>{cat.emoji}</span>
              <strong>{place.name}</strong>
              <span style={{color: '#888', marginLeft: 4}}>{cat.label}</span>
              {place.rating && <span> — {place.rating}★ ({place.userRatingCount})</span>}
              {place.priceLevel && <span> · {place.priceLevel}</span>}
              {place.address && <><br />{place.address}</>}
              {place.googleMapsUri && (
                <><br /><a href={place.googleMapsUri} target="_blank" rel="noopener noreferrer" style={{color: '#6366f1'}}>{t.viewOnGoogleMaps}</a></>
              )}
            </div>
          </Popup>
        </Marker>
        );
      })}

      {candidates.map((c, idx) => (
        <Marker
          key={`candidate-${idx}`}
          position={[c.lat, c.lng]}
          icon={idx === activeCandidate ? optimalIcon : getCandidateIcon(idx + 1)}
          zIndexOffset={idx === activeCandidate ? 1000 : 900}
          eventHandlers={{ click: () => onSelectCandidate(idx) }}
        >
          <Popup>
            <div className="text-sm">
              <strong>{idx === 0 ? t.optimalPoint : `${t.alternativePoint} #${idx + 1}`}</strong><br />
              {c.address}<br />
              {t.avgTime} : {Math.round(c.avgTime)} min
              {c.amenityScore > 0 && <><br />🍽️ {c.amenityScore} {t.nearbyAmenities}</>}
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
