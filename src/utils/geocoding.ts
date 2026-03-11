const LOCATIONIQ_KEY = import.meta.env.VITE_LOCATIONIQ_KEY as string;
const BASE = `https://us1.locationiq.com/v1`;

export async function searchAddress(query: string, cityName: string, limit = 5, country?: string) {
  const suffix = country ? `, ${cityName}, ${country}` : `, ${cityName}`;
  const q = encodeURIComponent(query + suffix);
  const res = await fetch(`${BASE}/search?key=${LOCATIONIQ_KEY}&format=json&q=${q}&limit=${limit}&addressdetails=1`);
  return res.json();
}

export async function reverseGeocode(lat: number, lng: number) {
  const res = await fetch(`${BASE}/reverse?key=${LOCATIONIQ_KEY}&format=json&lat=${lat}&lon=${lng}&zoom=18`);
  return res.json();
}
