# MeetPoint Paris

Find the optimal meeting point in Paris based on public transit travel times.

Enter multiple departure addresses, and the app computes the best place to meet — minimizing overall travel time across the metro, RER, and tramway network.

**Live demo:** https://jewave.github.io/meet-point-paris/

## Features

- **Interactive map** — Click on the map or search addresses to add departure points
- **Transit-aware routing** — Dijkstra shortest path on a graph of 750+ stations: metro (lines 1–14, 3bis, 7bis), RER (A/B/C/D/E), and tramway (T1–T13), with walking time to/from stations
- **Bike mode** — Toggle bike availability per participant (cycling at ~15 km/h with urban detour factor); the optimizer picks the fastest option between transit, walking, and cycling
- **Heatmap visualization** — Canvas overlay showing travel time across Paris with a non-linear color scale (green = best, red/purple = worst)
- **L2 optimal point** — Meeting point minimizes the L2 norm (root sum of squared travel times) for fairness across participants
- **Individual travel times** — Each departure point shows its estimated travel time to the meeting point
- **Share** — Share your meeting setup via WhatsApp, Messenger, or a copyable link (points and options encoded in URL hash)
- **Social media preview** — Open Graph and Twitter Card meta tags with preview image
- **Dark theme** — CARTO dark basemap with metro, RER, and tramway lines overlay

## How it works

1. Add 2+ departure points (address search or map click)
2. Optionally toggle the bike icon per participant
3. Click "Calculer le point de rencontre"
4. The app runs a two-pass computation:
   - Coarse 30x30 grid to approximate the optimal zone
   - Fine 80x80 grid centered on the optimal + all departure points
5. For each grid cell, travel time from every departure point is computed using Dijkstra on the transit graph (with walking/cycling to/from nearest stations)
6. The optimal point minimizes `sqrt(sum(t_i^2))` (L2 norm)
7. The displayed average time is the L1 mean (arithmetic average)

## Tech stack

- React 19 + TypeScript
- Vite
- Tailwind CSS 4
- Leaflet + react-leaflet
- Nominatim (reverse geocoding)
- No backend — everything runs client-side

## Getting started

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
npm run preview
```

## Project structure

```
src/
  App.tsx                  # Main state management, URL sharing logic
  components/
    MapView.tsx            # Leaflet map, canvas heatmap overlay, markers
    Sidebar.tsx            # Point list, controls, bike toggle, share menu
    AddressSearch.tsx       # Address autocomplete (Nominatim)
    TransitLayer.tsx        # Metro/RER/tramway lines and stations overlay
  data/
    stations.ts            # Station coordinates, connections, transfers
    lines.ts               # Line definitions for visual rendering
  utils/
    transitGraph.ts        # Graph construction, Dijkstra, travel time + bike
    heatmap.ts             # Grid computation, L2 optimization
```

## License

MIT
