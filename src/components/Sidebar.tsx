import { useState } from 'react';
import type { SelectedPoint } from '../utils/heatmap';
import AddressSearch from './AddressSearch';

interface Props {
  points: SelectedPoint[];
  onAddPoint: (lat: number, lng: number, address: string) => void;
  onRemovePoint: (id: string) => void;
  onCompute: () => void;
  computing: boolean;
  optimalAddress: string | null;
  optimalTime: number | null;
  travelTimes: Map<string, number>;
  isOpen: boolean;
  onToggle: () => void;
  showTransit: boolean;
  onToggleTransit: () => void;
  onClearAll: () => void;
  getShareUrl: () => string;
}

export default function Sidebar({
  points, onAddPoint, onRemovePoint, onCompute, computing,
  optimalAddress, optimalTime, travelTimes, isOpen, onToggle, showTransit, onToggleTransit, onClearAll, getShareUrl,
}: Props) {
  const [shareOpen, setShareOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  return (
    <>
      {/* Mobile toggle button */}
      <button
        onClick={onToggle}
        className="md:hidden fixed top-4 left-4 z-50 bg-slate-800 text-white p-2 rounded-lg shadow-lg border border-slate-700"
      >
        {isOpen ? (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        )}
      </button>

      {/* Sidebar */}
      <div className={`
        fixed md:relative z-40 h-full bg-slate-800 border-r border-slate-700
        transition-transform duration-300 ease-in-out
        w-80 md:w-96 flex-shrink-0
        ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
      `}>
        <div className="h-full flex flex-col overflow-hidden">
          {/* Header */}
          <div className="p-5 border-b border-slate-700">
            <h1 className="text-xl font-bold text-white flex items-center gap-2">
              <span className="text-2xl">📍</span> MeetPoint Paris
            </h1>
            <p className="text-slate-400 text-sm mt-1">
              Trouvez le lieu de rendez-vous idéal
            </p>
          </div>

          {/* Search */}
          <div className="p-4 border-b border-slate-700">
            <label className="text-sm font-medium text-slate-300 mb-2 block">
              Ajouter un point de départ
            </label>
            <AddressSearch onSelect={onAddPoint} />
            <p className="text-xs text-slate-500 mt-2">
              Ou cliquez directement sur la carte
            </p>
          </div>

          {/* Transit toggle */}
          <div className="px-4 py-3 border-b border-slate-700">
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
          <div className="flex-1 overflow-y-auto p-4">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-sm font-medium text-slate-300">
                Points de départ ({points.length})
              </h2>
              {points.length > 0 && (
                <button
                  onClick={onClearAll}
                  className="text-xs text-slate-500 hover:text-red-400 transition-colors"
                >
                  Tout supprimer
                </button>
              )}
            </div>

            {points.length === 0 ? (
              <div className="text-center py-8">
                <div className="text-4xl mb-3">🗺️</div>
                <p className="text-slate-400 text-sm">
                  Ajoutez au moins 2 points pour calculer le lieu de rendez-vous optimal
                </p>
              </div>
            ) : (
              <div className="space-y-2">
                {points.map((p, i) => (
                  <div
                    key={p.id}
                    className="flex items-center gap-2 bg-slate-700/50 rounded-lg p-3 group"
                  >
                    <div className="w-6 h-6 rounded-full bg-indigo-600 flex items-center justify-center text-xs font-bold text-white flex-shrink-0">
                      {i + 1}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-white truncate">{p.address}</p>
                      {travelTimes.has(p.id) ? (
                        <p className="text-xs text-indigo-400 font-medium">
                          {Math.round(travelTimes.get(p.id)!)} min de trajet
                        </p>
                      ) : (
                        <p className="text-xs text-slate-400">
                          {p.lat.toFixed(4)}, {p.lng.toFixed(4)}
                        </p>
                      )}
                    </div>
                    <button
                      onClick={() => onRemovePoint(p.id)}
                      className="text-slate-500 hover:text-red-400 transition-colors opacity-0 group-hover:opacity-100 flex-shrink-0"
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
          <div className="p-4 border-t border-slate-700 space-y-3">
            <button
              onClick={onCompute}
              disabled={points.length < 2 || computing}
              className="w-full py-3 px-4 bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-700 disabled:text-slate-500 text-white font-medium rounded-lg transition-colors flex items-center justify-center gap-2"
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
              <div className="bg-emerald-900/30 border border-emerald-700/50 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
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

            {/* Share button */}
            {points.length >= 1 && (
              <div className="relative">
                <button
                  onClick={() => setShareOpen(!shareOpen)}
                  className="w-full py-2.5 px-4 bg-slate-700 hover:bg-slate-600 text-slate-300 font-medium rounded-lg transition-colors flex items-center justify-center gap-2 text-sm"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                  </svg>
                  Partager
                </button>
                {shareOpen && (
                  <div className="mt-2 bg-slate-700 rounded-lg border border-slate-600 overflow-hidden">
                    <button
                      onClick={() => {
                        const url = getShareUrl();
                        const text = `Retrouvons-nous ! ${url}`;
                        window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
                        setShareOpen(false);
                      }}
                      className="w-full px-4 py-2.5 text-left text-sm text-slate-200 hover:bg-slate-600 transition-colors flex items-center gap-3"
                    >
                      <span className="text-lg">💬</span>
                      WhatsApp
                    </button>
                    <button
                      onClick={() => {
                        const url = getShareUrl();
                        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank');
                        setShareOpen(false);
                      }}
                      className="w-full px-4 py-2.5 text-left text-sm text-slate-200 hover:bg-slate-600 transition-colors flex items-center gap-3"
                    >
                      <span className="text-lg">📘</span>
                      Messenger / Facebook
                    </button>
                    <button
                      onClick={async () => {
                        const url = getShareUrl();
                        await navigator.clipboard.writeText(url);
                        setCopied(true);
                        setTimeout(() => setCopied(false), 2000);
                        setShareOpen(false);
                      }}
                      className="w-full px-4 py-2.5 text-left text-sm text-slate-200 hover:bg-slate-600 transition-colors flex items-center gap-3"
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
