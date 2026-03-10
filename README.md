# MeetPoint Paris

Find the optimal meeting point in Paris based on public transit travel times.

Enter multiple departure addresses, and the app computes the best place to meet — minimizing overall travel time across the metro, RER, and tramway network.

**Live demo:** https://jewave.github.io/meet-point-paris/

## Features

- **Interactive map** — Click on the map or search addresses to add departure points
- **Real GTFS travel times** — Inter-station times and transfer durations extracted from the official IDFM GTFS dataset (1292 segments, 474 transfers), with realistic dwell time, boarding penalty, and transfer wait times
- **Transit-aware routing** — Precomputed all-pairs shortest paths on a graph of 750+ stations: metro (lines 1–14, 3bis, 7bis), RER (A/B/C/D/E), and tramway (T1–T13), with spatial index for fast nearest-station lookup
- **Bike mode** — Toggle bike availability per participant (cycling at ~10 km/h effective with urban detour factor); the optimizer picks the fastest option between transit, walking, and cycling
- **Google Maps itinerary** — Each departure point links to Google Maps transit/cycling directions to the optimal meeting point
- **Heatmap visualization** — Canvas overlay showing travel time across Paris with a non-linear color scale (green = best, red/purple = worst)
- **L2 optimal point** — Meeting point minimizes the L2 norm (root sum of squared travel times) for fairness across participants
- **Individual travel times** — Each departure point shows its estimated travel time to the meeting point
- **Auto-compute from URL** — When the page loads with points in the URL, the optimal meeting point is computed automatically
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
5. For each grid cell, travel time from every departure point is computed via precomputed all-pairs shortest paths (with walking/cycling to/from nearest stations)
6. Edge weights come from GTFS real scheduled times when available (+ 30s dwell time per stop, 2 min boarding penalty, 2 min transfer wait), with static fallback
7. The optimal point minimizes `sqrt(sum(t_i^2))` (L2 norm)
8. The displayed average time is the L1 mean (arithmetic average)

## GTFS data pipeline

The `scripts/` directory contains Node scripts to extract data from the IDFM GTFS feed:

1. `extract-gtfs.mjs` — Downloads and parses the GTFS zip, extracts inter-station travel times (median of `stop_times.txt`), headways per line/period, and transfer times
2. `build-gtfs-data.mjs` — Matches GTFS parent stations to app station IDs by proximity, generates `src/data/gtfs-times.ts`

To regenerate (requires ~1GB disk for the raw GTFS):

```bash
node scripts/extract-gtfs.mjs
node scripts/build-gtfs-data.mjs
```

## Tech stack

- React 19 + TypeScript
- Vite
- Tailwind CSS 4
- Leaflet + react-leaflet
- Nominatim (reverse geocoding)
- IDFM GTFS (scheduled timetables from Ile-de-France Mobilités)
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
    gtfs-times.ts          # Auto-generated GTFS travel times and transfers
  utils/
    transitGraph.ts        # Graph construction, Dijkstra, travel time + bike
    heatmap.ts             # Grid computation, L2 optimization
scripts/
  extract-gtfs.mjs         # Parse raw GTFS data
  build-gtfs-data.mjs      # Match stations and generate gtfs-times.ts
```

## License

MIT
