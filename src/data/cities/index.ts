import type { LatLngBoundsExpression } from 'leaflet';
import type { CityTransitData } from '../../utils/transitGraph';

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
  },
  {
    slug: 'toulouse',
    name: 'Toulouse',
    country: 'France',
    description: 'Métro, Tramway',
    transitTypes: ['metro', 'tram'],
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
  },
];

export function getCityBySlug(slug: string): CityDef | undefined {
  return cities.find(c => c.slug === slug);
}
