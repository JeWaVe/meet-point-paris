import { defineConfig } from 'vite'
import type { Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { mkdirSync, readFileSync, writeFileSync } from 'fs'
import { join } from 'path'

const BASE_URL = 'https://wheretomeet.app'

interface CitySeo {
  title: string
  description: string
  areaServed: { name: string; sameAs: string }
}

const citySeo: Record<string, CitySeo> = {
  paris: {
    title: 'WhereToMeet — Find the ideal meeting point in Paris by metro, RER, tram',
    description:
      'Find the optimal meeting point in Paris using Métro, RER, and Tramway. Over 750 stations covered with real GTFS travel times. Add departure addresses and meet halfway.',
    areaServed: { name: 'Paris', sameAs: 'https://www.wikidata.org/wiki/Q90' },
  },
  toulouse: {
    title: 'WhereToMeet — Find the ideal meeting point in Toulouse by metro, tram, cable car',
    description:
      'Find the optimal meeting point in Toulouse using Métro, Tramway, and Téléo cable car. 66 stations covered with real GTFS travel times.',
    areaServed: { name: 'Toulouse', sameAs: 'https://www.wikidata.org/wiki/Q7880' },
  },
  marseille: {
    title: 'WhereToMeet — Find the ideal meeting point in Marseille by metro, tram',
    description:
      'Find the optimal meeting point in Marseille using Métro and Tramway. 68 stations covered with real GTFS travel times.',
    areaServed: { name: 'Marseille', sameAs: 'https://www.wikidata.org/wiki/Q2619' },
  },
  lyon: {
    title: 'WhereToMeet — Find the ideal meeting point in Lyon by metro, tram, funicular',
    description:
      'Find the optimal meeting point in Lyon using Métro, Tramway, and Funiculaire. 170+ stations covered. Add departure addresses and meet halfway.',
    areaServed: { name: 'Lyon', sameAs: 'https://www.wikidata.org/wiki/Q456' },
  },
  london: {
    title: 'WhereToMeet — Find the ideal meeting point in London by Underground',
    description:
      'Find the optimal meeting point in London using the Underground (Tube). 11 lines, 266 stations covered. Add departure addresses and meet halfway.',
    areaServed: { name: 'London', sameAs: 'https://www.wikidata.org/wiki/Q84' },
  },
  berlin: {
    title: 'WhereToMeet — Find the ideal meeting point in Berlin by U-Bahn, S-Bahn',
    description:
      'Find the optimal meeting point in Berlin using U-Bahn and S-Bahn. 9 U-Bahn lines, 15 S-Bahn lines, 270+ stations covered. Add departure addresses and meet halfway.',
    areaServed: { name: 'Berlin', sameAs: 'https://www.wikidata.org/wiki/Q64' },
  },
  'new-york': {
    title: 'WhereToMeet — Find the ideal meeting point in New York by subway',
    description:
      'Find the optimal meeting point in New York City using the Subway. 23 lines, 424 stations covered. Add departure addresses and meet halfway.',
    areaServed: { name: 'New York City', sameAs: 'https://www.wikidata.org/wiki/Q60' },
  },
}

function buildCityHtml(html: string, slug: string): string {
  const seo = citySeo[slug]
  if (!seo) return html // legal page: just copy as-is

  const url = `${BASE_URL}/${slug}`

  // Title
  html = html.replace(
    /<title>[^<]*<\/title>/,
    `<title>${seo.title}</title>`,
  )

  // Meta description
  html = html.replace(
    /<meta name="description" content="[^"]*"/,
    `<meta name="description" content="${seo.description}"`,
  )

  // Canonical
  html = html.replace(
    /<link rel="canonical" href="[^"]*"/,
    `<link rel="canonical" href="${url}"`,
  )

  // OG tags
  html = html.replace(
    /<meta property="og:title" content="[^"]*"/,
    `<meta property="og:title" content="${seo.title}"`,
  )
  html = html.replace(
    /<meta property="og:description" content="[^"]*"/,
    `<meta property="og:description" content="${seo.description}"`,
  )
  html = html.replace(
    /<meta property="og:url" content="[^"]*"/,
    `<meta property="og:url" content="${url}"`,
  )

  // Twitter tags
  html = html.replace(
    /<meta name="twitter:title" content="[^"]*"/,
    `<meta name="twitter:title" content="${seo.title}"`,
  )
  html = html.replace(
    /<meta name="twitter:description" content="[^"]*"/,
    `<meta name="twitter:description" content="${seo.description}"`,
  )

  // Structured data: narrow areaServed to just this city
  const { name, sameAs } = seo.areaServed
  const singleArea = JSON.stringify([{ '@type': 'City', name, sameAs }])
  html = html.replace(
    /"areaServed"\s*:\s*\[[\s\S]*?\]/,
    `"areaServed": ${singleArea}`,
  )

  return html
}

// Generate {slug}/index.html for each SPA route so GitHub Pages serves 200 (not 404)
function spaRoutes(): Plugin {
  const routes = ['paris', 'toulouse', 'marseille', 'lyon', 'london', 'berlin', 'new-york', 'legal']
  return {
    name: 'spa-routes',
    closeBundle() {
      const outDir = join(__dirname, 'dist')
      const baseHtml = readFileSync(join(outDir, 'index.html'), 'utf-8')
      for (const route of routes) {
        const dir = join(outDir, route)
        mkdirSync(dir, { recursive: true })
        writeFileSync(join(dir, 'index.html'), buildCityHtml(baseHtml, route))
      }
    },
  }
}

export default defineConfig({
  base: "/",
  plugins: [react(), tailwindcss(), spaRoutes()],
})
