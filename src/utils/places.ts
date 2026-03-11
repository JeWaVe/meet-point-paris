export interface NearbyPlace {
  id: string;
  name: string;
  lat: number;
  lng: number;
  rating?: number;
  userRatingCount?: number;
  priceLevel?: string;
  types: string[];
  address?: string;
  googleMapsUri?: string;
}

const API_KEY = import.meta.env.VITE_GOOGLE_PLACES_KEY as string;

const PRICE_LABELS: Record<string, string> = {
  PRICE_LEVEL_FREE: '🆓',
  PRICE_LEVEL_INEXPENSIVE: '€',
  PRICE_LEVEL_MODERATE: '€€',
  PRICE_LEVEL_EXPENSIVE: '€€€',
  PRICE_LEVEL_VERY_EXPENSIVE: '€€€€',
};

export async function searchNearbyPlaces(
  lat: number,
  lng: number,
  radiusMeters = 500,
  maxResults = 10,
): Promise<NearbyPlace[]> {
  if (!API_KEY) return [];

  const res = await fetch('https://places.googleapis.com/v1/places:searchNearby', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Goog-Api-Key': API_KEY,
      'X-Goog-FieldMask': 'places.id,places.displayName,places.location,places.rating,places.userRatingCount,places.priceLevel,places.types,places.shortFormattedAddress,places.googleMapsUri',
    },
    body: JSON.stringify({
      locationRestriction: {
        circle: {
          center: { latitude: lat, longitude: lng },
          radius: radiusMeters,
        },
      },
      includedTypes: ['restaurant', 'cafe', 'bar'],
      maxResultCount: maxResults,
      rankPreference: 'POPULARITY',
      languageCode: localStorage.getItem('locale') || 'fr',
    }),
  });

  if (!res.ok) return [];

  const data = await res.json();
  if (!data.places) return [];

  return data.places.map((p: any) => ({
    id: p.id,
    name: p.displayName?.text || '?',
    lat: p.location?.latitude,
    lng: p.location?.longitude,
    rating: p.rating,
    userRatingCount: p.userRatingCount,
    priceLevel: p.priceLevel ? PRICE_LABELS[p.priceLevel] : undefined,
    types: p.types || [],
    address: p.shortFormattedAddress,
    googleMapsUri: p.googleMapsUri,
  }));
}
