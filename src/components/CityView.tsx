import { useState, useCallback, useEffect } from 'react';
import MapView from './MapView';
import Sidebar from './Sidebar';
import { computeHeatmap } from '../utils/heatmap';
import { TransitGraph } from '../utils/transitGraph';
import { searchNearbyPlaces } from '../utils/places';
import { reverseGeocode } from '../utils/geocoding';
import type { NearbyPlace } from '../utils/places';
import type { SelectedPoint, HeatmapResult } from '../utils/heatmap';
import type { CityDef } from '../data/cities';

function encodePoints(pts: SelectedPoint[]): string {
  return pts.map(p => `${p.lat.toFixed(5)},${p.lng.toFixed(5)},${p.hasBike ? '1' : '0'},${encodeURIComponent(p.address)}`).join('|');
}

function decodePoints(hash: string): SelectedPoint[] {
  if (!hash) return [];
  try {
    return hash.split('|').map(segment => {
      const [lat, lng, bike, ...rest] = segment.split(',');
      const address = decodeURIComponent(rest.join(','));
      return {
        id: `${Date.now()}_${Math.random().toString(36).slice(2)}`,
        lat: parseFloat(lat),
        lng: parseFloat(lng),
        address,
        hasBike: bike === '1',
      };
    }).filter(p => !isNaN(p.lat) && !isNaN(p.lng));
  } catch {
    return [];
  }
}

interface Props {
  city: CityDef;
  graph: TransitGraph;
  onBack: () => void;
}

export default function CityView({ city, graph, onBack }: Props) {
  const [points, setPoints] = useState<SelectedPoint[]>(() => {
    const hash = window.location.hash.slice(1);
    if (hash.startsWith('p=')) {
      return decodePoints(hash.slice(2));
    }
    return [];
  });
  const [heatmapResult, setHeatmapResult] = useState<HeatmapResult | null>(null);
  const [computing, setComputing] = useState(false);
  const [optimalAddress, setOptimalAddress] = useState<string | null>(null);
  const [optimalTime, setOptimalTime] = useState<number | null>(null);
  const [optimalLat, setOptimalLat] = useState<number | null>(null);
  const [optimalLng, setOptimalLng] = useState<number | null>(null);
  const [travelTimes, setTravelTimes] = useState<Map<string, number>>(new Map());
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showTransit, setShowTransit] = useState(true);
  const [showHeatmap, setShowHeatmap] = useState(false);
  const [nearbyPlaces, setNearbyPlaces] = useState<NearbyPlace[]>([]);

  // Update URL hash when points change (use replaceState to avoid popstate triggers)
  useEffect(() => {
    if (points.length > 0) {
      history.replaceState(null, '', `/${city.slug}#p=${encodePoints(points)}`);
    } else {
      const path = `/${city.slug}`;
      if (window.location.pathname !== path || window.location.hash) {
        history.replaceState(null, '', path);
      }
    }
  }, [points, city.slug]);

  const getShareUrl = useCallback(() => {
    const base = `${window.location.origin}/${city.slug}`;
    if (points.length === 0) return base;
    return `${base}#p=${encodePoints(points)}`;
  }, [points, city.slug]);

  const addPoint = useCallback((lat: number, lng: number, address: string) => {
    const newPoint: SelectedPoint = {
      id: `${Date.now()}_${Math.random().toString(36).slice(2)}`,
      lat,
      lng,
      address,
      hasBike: false,
    };
    setPoints(prev => [...prev, newPoint]);
    setHeatmapResult(null);
    setOptimalAddress(null);
    setOptimalTime(null);
    setOptimalLat(null);
    setOptimalLng(null);
    setTravelTimes(new Map());
    setNearbyPlaces([]);
    setSidebarOpen(false);
  }, []);

  const handleMapClick = useCallback(async (lat: number, lng: number) => {
    let address = `${lat.toFixed(4)}, ${lng.toFixed(4)}`;
    try {
      const data = await reverseGeocode(lat, lng);
      if (data.display_name) {
        address = data.display_name.split(',').slice(0, 2).join(',');
      }
    } catch {
      // Keep coordinate-based address
    }
    addPoint(lat, lng, address);
  }, [addPoint]);

  const removePoint = useCallback((id: string) => {
    setPoints(prev => prev.filter(p => p.id !== id));
    setHeatmapResult(null);
    setOptimalAddress(null);
    setOptimalTime(null);
    setOptimalLat(null);
    setOptimalLng(null);
    setTravelTimes(new Map());
    setNearbyPlaces([]);
  }, []);

  const toggleBike = useCallback((id: string) => {
    setPoints(prev => prev.map(p => p.id === id ? { ...p, hasBike: !p.hasBike } : p));
    setHeatmapResult(null);
    setOptimalAddress(null);
    setOptimalTime(null);
    setOptimalLat(null);
    setOptimalLng(null);
    setTravelTimes(new Map());
    setNearbyPlaces([]);
  }, []);

  const clearAll = useCallback(() => {
    setPoints([]);
    setHeatmapResult(null);
    setOptimalAddress(null);
    setOptimalTime(null);
    setOptimalLat(null);
    setOptimalLng(null);
    setTravelTimes(new Map());
    setNearbyPlaces([]);
  }, []);

  const handleCompute = useCallback(async () => {
    if (points.length < 2) return;

    setComputing(true);

    setTimeout(async () => {
      try {
        const result = computeHeatmap(points, graph);
        setHeatmapResult(result);

        const times = new Map<string, number>();
        let totalTime = 0;
        for (const p of points) {
          const t = graph.travelTime(p.lat, p.lng, result.optimal.lat, result.optimal.lng, p.hasBike);
          times.set(p.id, t);
          totalTime += t;
        }
        setTravelTimes(times);
        setOptimalTime(totalTime / points.length);
        setOptimalLat(result.optimal.lat);
        setOptimalLng(result.optimal.lng);

        try {
          const data = await reverseGeocode(result.optimal.lat, result.optimal.lng);
          setOptimalAddress(data.display_name?.split(',').slice(0, 3).join(',') || 'Point optimal');
        } catch {
          setOptimalAddress(`${result.optimal.lat.toFixed(4)}, ${result.optimal.lng.toFixed(4)}`);
        }

        searchNearbyPlaces(result.optimal.lat, result.optimal.lng).then(setNearbyPlaces).catch(() => {});
      } finally {
        setComputing(false);
      }
    }, 50);
  }, [points, graph]);

  // Auto-compute on load if points came from URL
  const [hasUrlPoints] = useState(() => window.location.hash.startsWith('#p='));
  const [autoComputed, setAutoComputed] = useState(false);
  useEffect(() => {
    if (hasUrlPoints && !autoComputed && points.length >= 2) {
      setAutoComputed(true);
      handleCompute();
    }
  }, [hasUrlPoints, autoComputed, points, handleCompute]);

  return (
    <div className="h-full flex">
      <Sidebar
        points={points}
        onAddPoint={addPoint}
        onRemovePoint={removePoint}
        onCompute={handleCompute}
        computing={computing}
        optimalAddress={optimalAddress}
        optimalTime={optimalTime}
        optimalLat={optimalLat}
        optimalLng={optimalLng}
        travelTimes={travelTimes}
        isOpen={sidebarOpen}
        onToggle={() => setSidebarOpen(!sidebarOpen)}
        showTransit={showTransit}
        onToggleTransit={() => setShowTransit(!showTransit)}
        showHeatmap={showHeatmap}
        onToggleHeatmap={() => setShowHeatmap(!showHeatmap)}
        onToggleBike={toggleBike}
        onClearAll={clearAll}
        getShareUrl={getShareUrl}
        nearbyPlaces={nearbyPlaces}
        onBack={onBack}
        cityName={city.name}
        citySlug={city.slug}
        cityCountry={city.country}
      />
      <div className="flex-1 relative">
        <MapView
          points={points}
          heatmapResult={heatmapResult}
          showHeatmap={showHeatmap}
          optimalAddress={optimalAddress}
          onMapClick={handleMapClick}
          showTransit={showTransit}
          nearbyPlaces={nearbyPlaces}
          stations={graph.stations}
          lines={graph.lines}
          center={city.center}
          defaultZoom={city.defaultZoom}
          maxBounds={city.maxBounds}
          minZoom={city.minZoom}
        />
      </div>
    </div>
  );
}
