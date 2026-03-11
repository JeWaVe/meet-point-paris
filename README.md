# WhereToMeet

Find the optimal meeting point in a city based on public transit travel times.

Enter multiple departure addresses, and the app computes the best place to meet — minimizing overall travel time across metro, Underground, RER, tramway, and bike networks.

**Live demo:** https://wheretomeet.app/

## Supported cities

| City | Transit network | Data source |
|------|----------------|-------------|
| **Paris** | Metro (1–14, 3bis, 7bis), RER (A–E), Tramway (T1–T13) — 750+ stations | IDFM GTFS |
| **Toulouse** | Metro (A, B), Tramway (T1), Téléphérique (Téléo) — 66 stations | Tisséo GTFS |
| **Marseille** | Metro (M1, M2), Tramway (T1, T2, T3) — 68 stations | RTM GTFS |
| **London** | Underground (Tube) — 11 lines, 266 stations | TfL open data |

Each city has its own lazy-loaded data bundle (stations, lines, GTFS times), so only the selected city's data is downloaded.

## Features

- **Multi-city support** — Landing page with city picker, path-based routing (`/paris`, `/toulouse`, `/london`)
- **Interactive map** — Click on the map or search addresses to add departure points
- **Real GTFS travel times** — Inter-station times and transfer durations extracted from official GTFS datasets, with realistic dwell time, boarding penalty, and transfer wait times
- **Line-aware routing** — Expanded graph where each node is a (station, line) pair, so line switches at shared stations incur a realistic transfer cost. Precomputed all-pairs shortest paths with spatial index for fast nearest-station lookup
- **Bike mode** — Toggle bike availability per participant (cycling at ~10 km/h effective with urban detour factor); the optimizer picks the fastest option between transit, walking, and cycling
- **Nearby places** — Google Places API shows restaurants, cafes, and bars within 500m of the optimal point, with ratings, price levels, and Google Maps links
- **Google Maps itinerary** — Each departure point links to Google Maps transit/cycling directions to the optimal meeting point
- **Heatmap visualization** — Canvas overlay showing travel time with a non-linear color scale (green = best, red/purple = worst)
- **L2 optimal point** — Meeting point minimizes the L2 norm (root sum of squared travel times) for fairness across participants
- **Share** — Share your meeting setup via WhatsApp, Messenger, or a copyable link (points encoded in URL)
- **Multilingual** — French, English, German, Italian, Spanish — auto-detected from browser language, switchable in-app
- **Mobile-friendly** — Responsive bottom sheet UI with fixed compute button, full sidebar on desktop
- **Dark theme** — CARTO dark basemap with transit lines overlay

## How it works

1. Pick a city from the landing page
2. Add 2+ departure points (address search or map click)
3. Optionally toggle the bike icon per participant
4. Click "Find meeting point"
5. The app runs a two-pass computation:
   - Coarse 30x30 grid to approximate the optimal zone
   - Fine 80x80 grid centered on the optimal + all departure points
6. For each grid cell, travel time from every departure point is computed via precomputed all-pairs shortest paths (with walking/cycling to/from nearest stations)
7. Edge weights come from GTFS real scheduled times when available (+ 30s dwell time per stop, 2 min boarding penalty, 4 min intra-station line switch, 2 min inter-station transfer wait), with static fallback
8. The optimal point minimizes `sqrt(sum(t_i^2))` (L2 norm)

## GTFS data pipeline

The `scripts/` directory contains Node scripts to extract data from GTFS feeds:

1. `gtfs-config.mjs` — Per-city configuration (GTFS URL, route filters, file paths)
2. `extract-gtfs.mjs` — Downloads and parses the GTFS zip, extracts inter-station travel times (median of `stop_times.txt`), headways per line/period, and transfer times
3. `build-gtfs-data.mjs` — Matches GTFS parent stations to app station IDs by proximity, generates the TypeScript data file

To regenerate GTFS data for a city:

```bash
node scripts/extract-gtfs.mjs paris      # or toulouse, marseille
node scripts/build-gtfs-data.mjs paris    # or toulouse, marseille
```

## Adding a new city

1. Create `src/data/cities/{slug}/stations.ts` with station coordinates and connections
2. Create `src/data/cities/{slug}/lines.ts` with line definitions (color, branches)
3. Create `src/data/cities/{slug}/gtfs-times.ts` (empty or generated from GTFS)
4. Add the city to `src/data/cities/index.ts` (center, bounds, zoom, async loader)
5. Optionally add GTFS config to `scripts/gtfs-config.mjs`

## Tech stack

- React 19 + TypeScript
- Vite (with automatic code splitting per city)
- Tailwind CSS 4
- Leaflet + react-leaflet
- LocationIQ (geocoding & reverse geocoding)
- No backend — everything runs client-side

## Getting started

```bash
npm install
cp .env.local.example .env.local  # add your API keys
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
  App.tsx                        # Router: landing page or city view
  components/
    LandingPage.tsx              # City picker grid
    CityView.tsx                 # City map page, state management
    MapView.tsx                  # Leaflet map, canvas heatmap, markers
    Sidebar.tsx                  # Point list, controls, share menu
    AddressSearch.tsx            # Address autocomplete (LocationIQ)
    TransitLayer.tsx             # Transit lines and stations overlay
    LanguageSelector.tsx         # Language picker (FR/EN/DE/IT/ES)
  i18n/
    translations.ts              # All UI strings in 5 languages
    context.tsx                  # React context + useI18n hook
  data/
    types.ts                     # Shared interfaces (Station, Connection, LineDefinition)
    cities/
      index.ts                   # City registry with lazy loaders
      paris/                     # Paris data (stations, lines, gtfs-times)
      toulouse/                  # Toulouse data (stations, lines, gtfs-times)
      marseille/                 # Marseille data (stations, lines, gtfs-times)
      london/                    # London data (stations, lines, gtfs-times)
  utils/
    transitGraph.ts              # TransitGraph class, Dijkstra, spatial index
    heatmap.ts                   # Grid computation, L2 optimization
    geocoding.ts                 # LocationIQ search & reverse geocoding
scripts/
  gtfs-config.mjs                # Per-city GTFS configuration
  extract-gtfs.mjs               # Parse raw GTFS data
  build-gtfs-data.mjs            # Match stations and generate gtfs-times.ts
```

## License

[Business Source License 1.1](LICENSE) — Free for personal and non-commercial use. Converts to MIT on 2030-03-11. For commercial use, contact the author.
