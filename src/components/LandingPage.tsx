import { cities } from '../data/cities';
import type { CityDef } from '../data/cities';

interface Props {
  onSelectCity: (city: CityDef) => void;
}

export default function LandingPage({ onSelectCity }: Props) {
  return (
    <div className="min-h-full bg-gray-950 text-white flex flex-col">
      {/* Header */}
      <header className="pt-12 pb-6 px-4 text-center">
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-3">
          Where<span className="text-indigo-400">To</span>Meet
        </h1>
        <p className="text-gray-400 text-lg max-w-md mx-auto">
          Trouvez le lieu de rendez-vous idéal en transports en commun
        </p>
      </header>

      {/* City grid */}
      <main className="flex-1 flex items-start justify-center px-4 pb-12">
        <div className="w-full max-w-2xl">
          <h2 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-4 px-1">
            Choisissez une ville
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {cities.map(city => (
              <button
                key={city.slug}
                onClick={() => onSelectCity(city)}
                className="group relative bg-gray-900 border border-gray-800 rounded-xl p-6 text-left transition-all hover:border-indigo-500/50 hover:bg-gray-900/80 hover:shadow-lg hover:shadow-indigo-500/5 cursor-pointer"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-xl font-semibold group-hover:text-indigo-400 transition-colors">
                      {city.name}
                    </h3>
                    <p className="text-gray-500 text-sm mt-0.5">{city.country}</p>
                  </div>
                  <span className="text-2xl opacity-80 group-hover:scale-110 transition-transform">
                    {city.transitTypes.includes('metro') ? '🚇' : '🚊'}
                  </span>
                </div>
                <p className="text-gray-400 text-sm mt-3">{city.description}</p>
                <div className="mt-4 flex items-center text-indigo-400 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                  Ouvrir la carte
                  <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </button>
            ))}

            {/* Coming soon placeholder */}
            <div className="bg-gray-900/40 border border-gray-800/50 border-dashed rounded-xl p-6 text-left">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-xl font-semibold text-gray-600">
                    Bientôt...
                  </h3>
                  <p className="text-gray-700 text-sm mt-0.5">D'autres villes arrivent</p>
                </div>
                <span className="text-2xl opacity-30">🏙️</span>
              </div>
              <p className="text-gray-700 text-sm mt-3">Lyon, Marseille, Toulouse...</p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-6 text-center text-gray-600 text-sm">
        <a href="https://github.com/JeWaVe/meet-point-paris" target="_blank" rel="noopener noreferrer" className="hover:text-gray-400 transition-colors">
          GitHub
        </a>
      </footer>
    </div>
  );
}
