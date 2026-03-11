import { useI18n } from '../i18n/context';
import { locales, localeNames } from '../i18n/translations';

const localeFlags: Record<string, string> = {
  fr: '🇫🇷',
  en: '🇬🇧',
  de: '🇩🇪',
  it: '🇮🇹',
  es: '🇪🇸',
};

export default function LanguageSelector({ className = '' }: { className?: string }) {
  const { locale, setLocale } = useI18n();

  return (
    <select
      value={locale}
      onChange={e => setLocale(e.target.value as typeof locale)}
      className={`bg-transparent text-sm cursor-pointer outline-none ${className}`}
      aria-label="Language"
    >
      {locales.map(l => (
        <option key={l} value={l} className="bg-slate-800">
          {localeFlags[l]} {localeNames[l]}
        </option>
      ))}
    </select>
  );
}
