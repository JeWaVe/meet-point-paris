import { createContext, useContext, useState, useCallback } from 'react';
import type { ReactNode } from 'react';
import { translations, locales } from './translations';
import type { Locale, Translations } from './translations';

function detectLocale(): Locale {
  const saved = localStorage.getItem('locale');
  if (saved && locales.includes(saved as Locale)) return saved as Locale;
  const browserLang = navigator.language.slice(0, 2);
  if (locales.includes(browserLang as Locale)) return browserLang as Locale;
  return 'en';
}

interface I18nContextValue {
  locale: Locale;
  setLocale: (l: Locale) => void;
  t: Translations;
}

const I18nContext = createContext<I18nContextValue>(null!);

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(detectLocale);

  const setLocale = useCallback((l: Locale) => {
    setLocaleState(l);
    localStorage.setItem('locale', l);
    document.documentElement.lang = l;
  }, []);

  // Set initial lang attribute
  if (document.documentElement.lang !== locale) {
    document.documentElement.lang = locale;
  }

  const t = translations[locale];

  return (
    <I18nContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  return useContext(I18nContext);
}
