import type { LatLngBoundsExpression } from 'leaflet';
import type { CityTransitData } from '../../utils/transitGraph';
import type { AmenityGrid } from '../../utils/amenities';

export interface CityDef {
  slug: string;
  name: string;
  country: string;
  description: string;
  transitTypes: string[];
  center: [number, number];
  defaultZoom: number;
  maxBounds: LatLngBoundsExpression;
  minZoom: number;
  load: () => Promise<CityTransitData>;
  loadAmenities: () => Promise<{ amenityGrid: AmenityGrid }>;
}

export const cities: CityDef[] = [
  {
    slug: 'paris',
    name: 'Paris',
    country: 'France',
    description: 'Métro, RER, Tramway',
    transitTypes: ['metro', 'rer', 'tram'],
    center: [48.8566, 2.3522],
    defaultZoom: 12,
    maxBounds: [[48.65, 1.9], [49.05, 2.8]],
    minZoom: 10,
    load: async () => {
      const [{ stations, connections }, { lines }, { gtfsSegmentTimes, gtfsTransferTimes }] = await Promise.all([
        import('./paris/stations'),
        import('./paris/lines'),
        import('./paris/gtfs-times'),
      ]);
      return { stations, connections, lines, gtfsSegmentTimes, gtfsTransferTimes };
    },
    loadAmenities: async () => import('./paris/amenities'),
  },
  {
    slug: 'toulouse',
    name: 'Toulouse',
    country: 'France',
    description: 'Métro, Tramway, Téléphérique',
    transitTypes: ['metro', 'tram', 'cable'],
    center: [43.6047, 1.4442],
    defaultZoom: 13,
    maxBounds: [[43.53, 1.33], [43.68, 1.52]],
    minZoom: 12,
    load: async () => {
      const [{ stations, connections }, { lines }, { gtfsSegmentTimes, gtfsTransferTimes }] = await Promise.all([
        import('./toulouse/stations'),
        import('./toulouse/lines'),
        import('./toulouse/gtfs-times'),
      ]);
      return { stations, connections, lines, gtfsSegmentTimes, gtfsTransferTimes };
    },
    loadAmenities: async () => import('./toulouse/amenities'),
  },
  {
    slug: 'marseille',
    name: 'Marseille',
    country: 'France',
    description: 'Métro, Tramway',
    transitTypes: ['metro', 'tram'],
    center: [43.2965, 5.3698],
    defaultZoom: 13,
    maxBounds: [[43.23, 5.30], [43.36, 5.46]],
    minZoom: 12,
    load: async () => {
      const [{ stations, connections }, { lines }, { gtfsSegmentTimes, gtfsTransferTimes }] = await Promise.all([
        import('./marseille/stations'),
        import('./marseille/lines'),
        import('./marseille/gtfs-times'),
      ]);
      return { stations, connections, lines, gtfsSegmentTimes, gtfsTransferTimes };
    },
    loadAmenities: async () => import('./marseille/amenities'),
  },
  {
    slug: 'lyon',
    name: 'Lyon',
    country: 'France',
    description: 'Métro, Tramway, Funiculaire',
    transitTypes: ['metro', 'tram', 'funicular'],
    center: [45.7640, 4.8357],
    defaultZoom: 13,
    maxBounds: [[45.68, 4.76], [45.82, 5.02]],
    minZoom: 12,
    load: async () => {
      const [{ stations, connections }, { lines }, { gtfsSegmentTimes, gtfsTransferTimes }] = await Promise.all([
        import('./lyon/stations'),
        import('./lyon/lines'),
        import('./lyon/gtfs-times'),
      ]);
      return { stations, connections, lines, gtfsSegmentTimes, gtfsTransferTimes };
    },
    loadAmenities: async () => import('./lyon/amenities'),
  },
  {
    slug: 'london',
    name: 'London',
    country: 'United Kingdom',
    description: 'Underground (Tube)',
    transitTypes: ['metro'],
    center: [51.509, -0.118],
    defaultZoom: 12,
    maxBounds: [[51.28, -0.65], [51.72, 0.35]],
    minZoom: 10,
    load: async () => {
      const [{ stations, connections }, { lines }, { gtfsSegmentTimes, gtfsTransferTimes }] = await Promise.all([
        import('./london/stations'),
        import('./london/lines'),
        import('./london/gtfs-times'),
      ]);
      return { stations, connections, lines, gtfsSegmentTimes, gtfsTransferTimes };
    },
    loadAmenities: async () => import('./london/amenities'),
  },
  {
    slug: 'berlin',
    name: 'Berlin',
    country: 'Germany',
    description: 'U-Bahn, S-Bahn',
    transitTypes: ['metro', 'rer'],
    center: [52.52, 13.405],
    defaultZoom: 11,
    maxBounds: [[52.33, 13.05], [52.70, 13.78]],
    minZoom: 10,
    load: async () => {
      const [{ stations, connections }, { lines }, { gtfsSegmentTimes, gtfsTransferTimes }] = await Promise.all([
        import('./berlin/stations'),
        import('./berlin/lines'),
        import('./berlin/gtfs-times'),
      ]);
      return { stations, connections, lines, gtfsSegmentTimes, gtfsTransferTimes };
    },
    loadAmenities: async () => import('./berlin/amenities'),
  },
  {
    slug: 'new-york',
    name: 'New York',
    country: 'United States',
    description: 'Subway',
    transitTypes: ['metro'],
    center: [40.7128, -74.006],
    defaultZoom: 12,
    maxBounds: [[40.47, -74.28], [40.93, -73.68]],
    minZoom: 10,
    load: async () => {
      const [{ stations, connections }, { lines }, { gtfsSegmentTimes, gtfsTransferTimes }] = await Promise.all([
        import('./new-york/stations'),
        import('./new-york/lines'),
        import('./new-york/gtfs-times'),
      ]);
      return { stations, connections, lines, gtfsSegmentTimes, gtfsTransferTimes };
    },
    loadAmenities: async () => import('./new-york/amenities'),
  },
];

export function getCityBySlug(slug: string): CityDef | undefined {
  return cities.find(c => c.slug === slug);
}
