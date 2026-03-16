import { useState, useCallback, useEffect } from 'react';
import MapView from './MapView';
import Sidebar from './Sidebar';
import { computeHeatmap, extractTopCandidates } from '../utils/heatmap';
import { TransitGraph } from '../utils/transitGraph';
import { searchNearbyPlaces } from '../utils/places';
import { reverseGeocode } from '../utils/geocoding';
import type { NearbyPlace } from '../utils/places';
import type { SelectedPoint, HeatmapResult } from '../utils/heatmap';
import type { CityDef } from '../data/cities';
import type { AmenityGrid } from '../utils/amenities';

export interface CandidateResult {
  lat: number;
  lng: number;
  address: string;
  avgTime: number;
  amenityScore: number;
  rank: number;
  travelTimes: Map<string, number>;
}

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
  onLegal: () => void;
}

export default function CityView({ city, graph, onBack, onLegal }: Props) {
  const [points, setPoints] = useState<SelectedPoint[]>(() => {
    const hash = window.location.hash.slice(1);
    if (hash.startsWith('p=')) {
      return decodePoints(hash.slice(2));
    }
    return [];
  });
  const [heatmapResult, setHeatmapResult] = useState<HeatmapResult | null>(null);
  const [computing, setComputing] = useState(false);
  const [candidates, setCandidates] = useState<CandidateResult[]>([]);
  const [activeCandidate, setActiveCandidate] = useState(0);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [showTransit, setShowTransit] = useState(true);
  const [showHeatmap, setShowHeatmap] = useState(false);
  const [nearbyPlaces, setNearbyPlaces] = useState<NearbyPlace[]>([]);
  const [flyTo, setFlyTo] = useState<[number, number] | null>(null);
  const [amenityGrid, setAmenityGrid] = useState<AmenityGrid | null>(null);

  // Load amenity data (non-blocking)
  useEffect(() => {
    city.loadAmenities().then(m => setAmenityGrid(m.amenityGrid)).catch(() => {});
  }, [city]);

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

  const clearResults = useCallback(() => {
    setHeatmapResult(null);
    setCandidates([]);
    setActiveCandidate(0);
    setNearbyPlaces([]);
  }, []);

  const addPoint = useCallback((lat: number, lng: number, address: string) => {
    const newPoint: SelectedPoint = {
      id: `${Date.now()}_${Math.random().toString(36).slice(2)}`,
      lat,
      lng,
      address,
      hasBike: false,
    };
    setPoints(prev => [...prev, newPoint]);
    clearResults();
  }, [clearResults]);

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
    clearResults();
  }, [clearResults]);

  const toggleBike = useCallback((id: string) => {
    setPoints(prev => prev.map(p => p.id === id ? { ...p, hasBike: !p.hasBike } : p));
    clearResults();
  }, [clearResults]);

  const clearAll = useCallback(() => {
    setPoints([]);
    clearResults();
  }, [clearResults]);

  const handleSelectCandidate = useCallback((idx: number) => {
    setActiveCandidate(idx);
    if (candidates[idx]) {
      searchNearbyPlaces(candidates[idx].lat, candidates[idx].lng).then(setNearbyPlaces).catch(() => {});
    }
  }, [candidates]);

  const handleCompute = useCallback(async () => {
    if (points.length < 2) return;

    setSidebarOpen(false);
    setComputing(true);

    setTimeout(async () => {
      try {
        const result = computeHeatmap(points, graph);
        setHeatmapResult(result);

        // Extract top 3 candidates
        const topCandidates = extractTopCandidates(result, amenityGrid, 3);

        // Compute travel times and reverse geocode for each candidate
        const candidateResults: CandidateResult[] = [];

        for (let ci = 0; ci < topCandidates.length; ci++) {
          const c = topCandidates[ci];
          const times = new Map<string, number>();
          let totalTime = 0;
          for (const p of points) {
            const t = graph.travelTime(p.lat, p.lng, c.lat, c.lng, p.hasBike);
            times.set(p.id, t);
            totalTime += t;
          }

          let address: string;
          try {
            // Stagger geocoding requests to respect rate limits
            if (ci > 0) await new Promise(r => setTimeout(r, 350));
            const data = await reverseGeocode(c.lat, c.lng);
            address = data.display_name?.split(',').slice(0, 3).join(',') || `${c.lat.toFixed(4)}, ${c.lng.toFixed(4)}`;
          } catch {
            address = `${c.lat.toFixed(4)}, ${c.lng.toFixed(4)}`;
          }

          candidateResults.push({
            lat: c.lat,
            lng: c.lng,
            address,
            avgTime: totalTime / points.length,
            amenityScore: c.amenityScore,
            rank: ci + 1,
            travelTimes: times,
          });
        }

        setCandidates(candidateResults);

        // Search nearby places for the top candidate + fly to it
        if (candidateResults.length > 0) {
          setFlyTo([candidateResults[0].lat, candidateResults[0].lng]);
          searchNearbyPlaces(candidateResults[0].lat, candidateResults[0].lng).then(setNearbyPlaces).catch(() => {});
        }

        // On mobile, open the panel and scroll to results
        setSidebarOpen(true);
        setTimeout(() => {
          const el = document.getElementById('optimal-result');
          const container = el?.closest('[data-scroll-container]') as HTMLElement | null;
          if (el && container) {
            container.scrollTo({ top: el.offsetTop - container.offsetTop, behavior: 'smooth' });
          }
        }, 350);
      } finally {
        setComputing(false);
      }
    }, 50);
  }, [points, graph, amenityGrid]);

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
        candidates={candidates}
        activeCandidate={activeCandidate}
        onSelectCandidate={handleSelectCandidate}
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
        onLegal={onLegal}
        cityName={city.name}
        citySlug={city.slug}
        cityCountry={city.country}
      />
      <div className="flex-1 relative">
        <MapView
          points={points}
          heatmapResult={heatmapResult}
          showHeatmap={showHeatmap}
          candidates={candidates}
          activeCandidate={activeCandidate}
          onSelectCandidate={handleSelectCandidate}
          onMapClick={handleMapClick}
          showTransit={showTransit}
          nearbyPlaces={nearbyPlaces}
          stations={graph.stations}
          lines={graph.lines}
          center={city.center}
          defaultZoom={city.defaultZoom}
          maxBounds={city.maxBounds}
          minZoom={city.minZoom}
          flyTo={flyTo}
        />
      </div>
    </div>
  );
}
