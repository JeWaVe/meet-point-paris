import { useState } from 'react';
import type { SelectedPoint } from '../utils/heatmap';
import type { NearbyPlace } from '../utils/places';
import AddressSearch from './AddressSearch';

function placeEmoji(types: string[]): string {
  if (types.includes('bar')) return '🍸';
  if (types.includes('cafe')) return '☕';
  return '🍽️';
}

interface Props {
  points: SelectedPoint[];
  onAddPoint: (lat: number, lng: number, address: string) => void;
  onRemovePoint: (id: string) => void;
  onCompute: () => void;
  computing: boolean;
  optimalAddress: string | null;
  optimalTime: number | null;
  optimalLat: number | null;
  optimalLng: number | null;
  travelTimes: Map<string, number>;
  isOpen: boolean;
  onToggle: () => void;
  showTransit: boolean;
  onToggleTransit: () => void;
  onToggleBike: (id: string) => void;
  onClearAll: () => void;
  getShareUrl: () => string;
  nearbyPlaces: NearbyPlace[];
  onBack: () => void;
  cityName: string;
}

export default function Sidebar({
  points, onAddPoint, onRemovePoint, onCompute, computing,
  optimalAddress, optimalTime, optimalLat, optimalLng, travelTimes, isOpen, onToggle, showTransit, onToggleTransit, onToggleBike, onClearAll, getShareUrl, nearbyPlaces, onBack, cityName,
}: Props) {
  const [shareOpen, setShareOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black/40 z-30"
          onClick={onToggle}
        />
      )}

      {/* Mobile FAB toggle */}
      <button
        onClick={onToggle}
        className="md:hidden fixed bottom-6 right-4 z-50 bg-indigo-600 text-white p-3.5 rounded-full shadow-xl active:bg-indigo-700 transition-colors"
      >
        {isOpen ? (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        ) : (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        )}
      </button>

      {/* Panel: bottom sheet on mobile, sidebar on desktop */}
      <div className={`
        fixed inset-x-0 bottom-0 z-40
        md:relative md:inset-auto
        bg-slate-800 border-t border-slate-700 md:border-t-0 md:border-r
        rounded-t-2xl md:rounded-none
        max-h-[80vh] md:max-h-none md:h-full
        w-full md:w-96 flex-shrink-0
        transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-y-0' : 'translate-y-full'} md:translate-y-0
      `}>
        {/* Drag handle - mobile only */}
        <div className="md:hidden flex justify-center pt-3 pb-1">
          <div className="w-10 h-1.5 bg-slate-600 rounded-full" />
        </div>

        <div className="md:h-full flex flex-col overflow-hidden">
          {/* Header - desktop only */}
          <div className="hidden md:block p-5 border-b border-slate-700">
            <div className="flex items-center gap-2">
              <button
                onClick={onBack}
                className="text-slate-400 hover:text-white transition-colors p-1 -ml-1 rounded"
                title="Changer de ville"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <h1 className="text-xl font-bold text-white flex items-center gap-2">
                <span className="text-2xl">📍</span> WhereToMeet
              </h1>
            </div>
            <p className="text-slate-400 text-sm mt-1">
              Trouvez le lieu de rendez-vous idéal — {cityName}
            </p>
          </div>

          {/* Search */}
          <div className="p-3 md:p-4 border-b border-slate-700">
            <label className="text-sm font-medium text-slate-300 mb-2 block">
              Ajouter un point de départ
            </label>
            <AddressSearch onSelect={onAddPoint} />
            <p className="text-xs text-slate-500 mt-2 hidden md:block">
              Ou cliquez directement sur la carte
            </p>
          </div>

          {/* Transit toggle */}
          <div className="px-3 md:px-4 py-2 md:py-3 border-b border-slate-700">
            <label className="flex items-center gap-3 cursor-pointer">
              <div className="relative">
                <input
                  type="checkbox"
                  checked={showTransit}
                  onChange={onToggleTransit}
                  className="sr-only peer"
                />
                <div className="w-9 h-5 bg-slate-600 rounded-full peer-checked:bg-indigo-600 transition-colors" />
                <div className="absolute left-0.5 top-0.5 w-4 h-4 bg-white rounded-full transition-transform peer-checked:translate-x-4" />
              </div>
              <span className="text-sm text-slate-300">
                Afficher lignes et stations
              </span>
            </label>
          </div>

          {/* Points list */}
          <div className="flex-1 overflow-y-auto min-h-0 p-3 md:p-4">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-sm font-medium text-slate-300">
                Points de départ ({points.length})
              </h2>
              {points.length > 0 && (
                <button
                  onClick={onClearAll}
                  className="text-xs text-slate-500 hover:text-red-400 active:text-red-400 transition-colors"
                >
                  Tout supprimer
                </button>
              )}
            </div>

            {points.length === 0 ? (
              <div className="text-center py-4 md:py-8">
                <div className="text-4xl mb-3 hidden md:block">🗺️</div>
                <p className="text-slate-400 text-sm">
                  Ajoutez au moins 2 points pour calculer le lieu de rendez-vous optimal
                </p>
              </div>
            ) : (
              <div className="space-y-2">
                {points.map((p, i) => (
                  <div
                    key={p.id}
                    className="flex items-center gap-2 bg-slate-700/50 rounded-lg p-2.5 md:p-3 group"
                  >
                    <div className="w-6 h-6 rounded-full bg-indigo-600 flex items-center justify-center text-xs font-bold text-white flex-shrink-0">
                      {i + 1}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-white truncate">{p.address}</p>
                      {travelTimes.has(p.id) ? (
                        <p className="text-xs text-indigo-400 font-medium flex items-center gap-1">
                          {Math.round(travelTimes.get(p.id)!)} min de trajet
                          {optimalLat !== null && optimalLng !== null && (
                            <a
                              href={`https://www.google.com/maps/dir/?api=1&origin=${p.lat},${p.lng}&destination=${optimalLat},${optimalLng}&travelmode=${p.hasBike ? 'bicycling' : 'transit'}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              title="Voir l'itinéraire sur Google Maps"
                              className="text-slate-400 hover:text-indigo-300 transition-colors"
                            >
                              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                              </svg>
                            </a>
                          )}
                        </p>
                      ) : (
                        <p className="text-xs text-slate-400">
                          {p.lat.toFixed(4)}, {p.lng.toFixed(4)}
                        </p>
                      )}
                    </div>
                    <button
                      onClick={() => onToggleBike(p.id)}
                      title={p.hasBike ? 'A vélo' : 'Sans vélo'}
                      className={`flex-shrink-0 p-1 rounded transition-colors ${p.hasBike ? 'text-emerald-400' : 'text-slate-600 hover:text-slate-400'}`}
                    >
                      <svg className="w-5 h-5 md:w-6 md:h-6" viewBox="0 0 512 512" fill="currentColor">
                        <circle cx="125" cy="370" r="70" fill="none" stroke="currentColor" strokeWidth="40"/>
                        <circle cx="387" cy="370" r="70" fill="none" stroke="currentColor" strokeWidth="40"/>
                        <path d="M125 370L205 190h80" fill="none" stroke="currentColor" strokeWidth="36" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M285 190l102 180M285 190l-60 180" fill="none" stroke="currentColor" strokeWidth="36" strokeLinecap="round" strokeLinejoin="round"/>
                        <circle cx="285" cy="155" r="35"/>
                      </svg>
                    </button>
                    <button
                      onClick={() => onRemovePoint(p.id)}
                      className="text-slate-500 hover:text-red-400 active:text-red-400 transition-colors flex-shrink-0 opacity-100 md:opacity-0 md:group-hover:opacity-100"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="p-3 md:p-4 border-t border-slate-700 space-y-2 md:space-y-3">
            <button
              onClick={onCompute}
              disabled={points.length < 2 || computing}
              className="w-full py-2.5 md:py-3 px-4 bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-700 disabled:bg-slate-700 disabled:text-slate-500 text-white font-medium rounded-lg transition-colors flex items-center justify-center gap-2"
            >
              {computing ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Calcul en cours...
                </>
              ) : (
                <>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                  </svg>
                  Calculer le point de rencontre
                </>
              )}
            </button>

            {/* Optimal result */}
            {optimalAddress && optimalTime !== null && (
              <div className="bg-emerald-900/30 border border-emerald-700/50 rounded-lg p-3 md:p-4">
                <div className="flex items-center gap-2 mb-1 md:mb-2">
                  <span className="text-emerald-400 text-lg">⭐</span>
                  <h3 className="text-sm font-medium text-emerald-300">
                    Point de rencontre optimal
                  </h3>
                </div>
                <p className="text-white text-sm font-medium">{optimalAddress}</p>
                <p className="text-emerald-400 text-sm mt-1">
                  Temps moyen de trajet : {Math.round(optimalTime)} min
                </p>
              </div>
            )}

            {/* Nearby places */}
            {nearbyPlaces.length > 0 && (
              <div className="bg-amber-900/20 border border-amber-700/40 rounded-lg p-3 md:p-4">
                <h3 className="text-sm font-medium text-amber-300 mb-2 flex items-center gap-2">
                  🍽️ À proximité
                </h3>
                <div className="space-y-1.5 max-h-40 overflow-y-auto">
                  {nearbyPlaces.map(place => (
                    <a
                      key={place.id}
                      href={place.googleMapsUri || '#'}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between gap-2 text-sm hover:bg-amber-900/30 active:bg-amber-900/30 rounded px-2 py-1.5 transition-colors group"
                    >
                      <div className="min-w-0 flex-1">
                        <span className="text-white group-hover:text-amber-200 truncate block">{placeEmoji(place.types)} {place.name}</span>
                        {place.address && (
                          <span className="text-slate-500 text-xs truncate block">{place.address}</span>
                        )}
                      </div>
                      <div className="flex items-center gap-1.5 flex-shrink-0 text-xs">
                        {place.priceLevel && <span className="text-amber-400">{place.priceLevel}</span>}
                        {place.rating && <span className="text-amber-300">{place.rating}★</span>}
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            )}

            {/* Share button */}
            {points.length >= 1 && (
              <div className="relative">
                <button
                  onClick={() => setShareOpen(!shareOpen)}
                  className="w-full py-2 md:py-2.5 px-4 bg-slate-700 hover:bg-slate-600 active:bg-slate-600 text-slate-300 font-medium rounded-lg transition-colors flex items-center justify-center gap-2 text-sm"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                  </svg>
                  Partager
                </button>
                {shareOpen && (
                  <div className="absolute bottom-full mb-2 md:relative md:bottom-auto md:mb-0 md:mt-2 left-0 right-0 bg-slate-700 rounded-lg border border-slate-600 overflow-hidden">
                    <button
                      onClick={() => {
                        const url = getShareUrl();
                        const text = `Retrouvons-nous ! ${url}`;
                        window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
                        setShareOpen(false);
                      }}
                      className="w-full px-4 py-2.5 text-left text-sm text-slate-200 hover:bg-slate-600 active:bg-slate-600 transition-colors flex items-center gap-3"
                    >
                      <svg className="w-5 h-5 text-[#25D366]" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                      </svg>
                      WhatsApp
                    </button>
                    <button
                      onClick={() => {
                        const url = getShareUrl();
                        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank');
                        setShareOpen(false);
                      }}
                      className="w-full px-4 py-2.5 text-left text-sm text-slate-200 hover:bg-slate-600 active:bg-slate-600 transition-colors flex items-center gap-3"
                    >
                      <svg className="w-5 h-5 text-[#0099FF]" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 0C5.373 0 0 4.974 0 11.111c0 3.498 1.744 6.614 4.469 8.654V24l4.088-2.242c1.092.301 2.246.464 3.443.464 6.627 0 12-4.975 12-11.111C24 4.974 18.627 0 12 0zm1.191 14.963l-3.055-3.26-5.963 3.26L10.732 8.2l3.131 3.259L19.752 8.2l-6.561 6.763z"/>
                      </svg>
                      Messenger
                    </button>
                    <button
                      onClick={async () => {
                        const url = getShareUrl();
                        await navigator.clipboard.writeText(url);
                        setCopied(true);
                        setTimeout(() => setCopied(false), 2000);
                        setShareOpen(false);
                      }}
                      className="w-full px-4 py-2.5 text-left text-sm text-slate-200 hover:bg-slate-600 active:bg-slate-600 transition-colors flex items-center gap-3"
                    >
                      <span className="text-lg">{copied ? '✅' : '📋'}</span>
                      {copied ? 'Lien copié !' : 'Copier le lien'}
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
