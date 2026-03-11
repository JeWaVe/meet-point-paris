import { useState, useEffect, useCallback } from 'react';
import LandingPage from './components/LandingPage';
import CityView from './components/CityView';
import LegalNotice from './components/LegalNotice';
import { TransitGraph } from './utils/transitGraph';
import { getCityBySlug } from './data/cities';
import type { CityDef } from './data/cities';
import { useI18n } from './i18n/context';

const DEFAULT_CITY = 'paris';

function parseRoute(): { slug: string | null } {
  // Handle GitHub Pages 404.html SPA redirect
  const params = new URLSearchParams(window.location.search);
  const redirect = params.get('redirect');
  if (redirect) {
    const decoded = decodeURIComponent(redirect);
    // Restore the original URL without reload
    const hashIdx = decoded.indexOf('#');
    const pathPart = hashIdx >= 0 ? decoded.slice(0, hashIdx) : decoded;
    const hashPart = hashIdx >= 0 ? decoded.slice(hashIdx) : '';
    history.replaceState(null, '', pathPart + hashPart);
    const slug = pathPart.replace(/^\/+|\/+$/g, '');
    return { slug: slug || null };
  }

  const path = window.location.pathname.replace(/^\/+|\/+$/g, '');

  // Backward compat: bare /#p=... → Paris
  if (!path && window.location.hash.startsWith('#p=')) {
    return { slug: DEFAULT_CITY };
  }

  if (!path) return { slug: null };

  return { slug: path };
}

function App() {
  const { t } = useI18n();
  const [citySlug, setCitySlug] = useState<string | null>(() => parseRoute().slug);
  const [city, setCity] = useState<CityDef | null>(() =>
    citySlug ? getCityBySlug(citySlug) ?? null : null
  );
  const [graph, setGraph] = useState<TransitGraph | null>(null);
  const [loading, setLoading] = useState(false);

  // Load city data when city changes
  useEffect(() => {
    if (!city) {
      setGraph(null);
      return;
    }
    let cancelled = false;
    setLoading(true);
    setGraph(null);
    city.load().then(data => {
      if (cancelled) return;
      setGraph(new TransitGraph(data));
      setLoading(false);
    });
    return () => { cancelled = true; };
  }, [city]);

  const navigateToCity = useCallback((c: CityDef) => {
    setCitySlug(c.slug);
    setCity(c);
    history.pushState(null, '', `/${c.slug}`);
  }, []);

  const navigateHome = useCallback(() => {
    setCitySlug(null);
    setCity(null);
    setShowLegal(false);
    history.pushState(null, '', '/');
  }, []);

  const [showLegal, setShowLegal] = useState(() => parseRoute().slug === 'legal');

  const navigateToLegal = useCallback(() => {
    setShowLegal(true);
    history.pushState(null, '', '/legal');
  }, []);

  // Handle browser back/forward
  useEffect(() => {
    const onPopState = () => {
      const { slug } = parseRoute();
      setShowLegal(slug === 'legal');
      setCitySlug(slug === 'legal' ? null : slug);
      setCity(slug && slug !== 'legal' ? getCityBySlug(slug) ?? null : null);
    };
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  // Legal notice page
  if (showLegal) {
    return <LegalNotice onBack={navigateHome} />;
  }

  // Landing page
  if (!city) {
    return <LandingPage onSelectCity={navigateToCity} onLegal={navigateToLegal} />;
  }

  // Loading city data
  if (loading || !graph) {
    return (
      <div className="h-full flex items-center justify-center bg-gray-900 text-white">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
          <p>{t.loadingTransit}</p>
        </div>
      </div>
    );
  }

  return <CityView key={city.slug} city={city} graph={graph} onBack={navigateHome} onLegal={navigateToLegal} />;
}

export default App;
