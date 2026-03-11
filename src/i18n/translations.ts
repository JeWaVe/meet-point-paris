export const locales = ['fr', 'en', 'de', 'it', 'es'] as const;
export type Locale = (typeof locales)[number];

export const localeNames: Record<Locale, string> = {
  fr: 'Français',
  en: 'English',
  de: 'Deutsch',
  it: 'Italiano',
  es: 'Español',
};

const fr = {
  // Landing page
  tagline: 'Trouvez le lieu de rendez-vous idéal en transports en commun',
  chooseCity: 'Choisissez une ville',
  openMap: 'Ouvrir la carte',
  comingSoon: 'Bientôt...',
  moreCities: "D'autres villes arrivent",
  comingCities: 'Lyon, Lille...',

  // Sidebar header
  subtitle: 'Trouvez le lieu de rendez-vous idéal',
  changeCity: 'Changer de ville',

  // Search
  addDeparture: 'Ajouter un point de départ',
  searchPlaceholder: 'Rechercher une adresse...',
  clickOnMap: 'Ou cliquez directement sur la carte',

  // Toggles
  showLinesStations: 'Afficher lignes et stations',
  showTravelZones: 'Zones de temps de trajet',

  // Points list
  departurePoints: 'Points de départ',
  deleteAll: 'Tout supprimer',
  emptyHint: 'Ajoutez au moins 2 points pour calculer le lieu de rendez-vous optimal',
  minTravel: 'min de trajet',
  viewRoute: "Voir l'itinéraire sur Google Maps",
  byBike: 'À vélo',
  noBike: 'Sans vélo',

  // Compute
  computing: 'Calcul...',
  computingLong: 'Calcul en cours...',
  compute: 'Calculer',
  computeFull: 'Calculer le point de rencontre',

  // Results
  optimalPoint: 'Point de rencontre optimal',
  avgTravelTime: 'Temps moyen de trajet',
  nearby: 'À proximité',
  viewOnGoogleMaps: 'Voir sur Google Maps',

  // Share
  share: 'Partager',
  linkCopied: 'Lien copié !',
  copyLink: 'Copier le lien',
  shareMessage: 'Retrouvons-nous !',

  // Loading
  loadingTransit: 'Chargement des données de transport...',

  // Map popups
  point: 'Point',
  avgTime: 'Temps moyen',

  // Places
  bar: 'Bar',
  cafe: 'Café',
  restaurant: 'Restaurant',
  free: 'Gratuit',
  noName: 'Sans nom',

  // Countries
  france: 'France',
  unitedKingdom: 'Royaume-Uni',

  // City names
  london: 'Londres',

  // Transit descriptions
  underground: 'Métro souterrain (Tube)',
};

type TranslationKeys = typeof fr;

const en: TranslationKeys = {
  tagline: 'Find the ideal meeting point using public transit',
  chooseCity: 'Choose a city',
  openMap: 'Open map',
  comingSoon: 'Coming soon...',
  moreCities: 'More cities coming',
  comingCities: 'Lyon, Lille...',

  subtitle: 'Find the ideal meeting point',
  changeCity: 'Change city',

  addDeparture: 'Add a departure point',
  searchPlaceholder: 'Search for an address...',
  clickOnMap: 'Or click directly on the map',

  showLinesStations: 'Show lines and stations',
  showTravelZones: 'Travel time zones',

  departurePoints: 'Departure points',
  deleteAll: 'Delete all',
  emptyHint: 'Add at least 2 points to find the optimal meeting point',
  minTravel: 'min travel',
  viewRoute: 'View route on Google Maps',
  byBike: 'By bike',
  noBike: 'No bike',

  computing: 'Computing...',
  computingLong: 'Computing...',
  compute: 'Compute',
  computeFull: 'Find meeting point',

  optimalPoint: 'Optimal meeting point',
  avgTravelTime: 'Average travel time',
  nearby: 'Nearby',
  viewOnGoogleMaps: 'View on Google Maps',

  share: 'Share',
  linkCopied: 'Link copied!',
  copyLink: 'Copy link',
  shareMessage: "Let's meet up!",

  loadingTransit: 'Loading transit data...',

  point: 'Point',
  avgTime: 'Average time',

  bar: 'Bar',
  cafe: 'Café',
  restaurant: 'Restaurant',
  free: 'Free',
  noName: 'Unnamed',
  france: 'France',
  unitedKingdom: 'United Kingdom',
  london: 'London',
  underground: 'Underground (Tube)',
};

const de: TranslationKeys = {
  tagline: 'Finden Sie den idealen Treffpunkt mit öffentlichen Verkehrsmitteln',
  chooseCity: 'Stadt wählen',
  openMap: 'Karte öffnen',
  comingSoon: 'Demnächst...',
  moreCities: 'Weitere Städte folgen',
  comingCities: 'Lyon, Lille...',

  subtitle: 'Finden Sie den idealen Treffpunkt',
  changeCity: 'Stadt wechseln',

  addDeparture: 'Startpunkt hinzufügen',
  searchPlaceholder: 'Adresse suchen...',
  clickOnMap: 'Oder direkt auf die Karte klicken',

  showLinesStations: 'Linien und Stationen anzeigen',
  showTravelZones: 'Fahrzeitzonen',

  departurePoints: 'Startpunkte',
  deleteAll: 'Alle löschen',
  emptyHint: 'Mindestens 2 Punkte hinzufügen, um den optimalen Treffpunkt zu berechnen',
  minTravel: 'Min. Fahrzeit',
  viewRoute: 'Route auf Google Maps anzeigen',
  byBike: 'Mit Fahrrad',
  noBike: 'Ohne Fahrrad',

  computing: 'Berechnung...',
  computingLong: 'Berechnung läuft...',
  compute: 'Berechnen',
  computeFull: 'Treffpunkt berechnen',

  optimalPoint: 'Optimaler Treffpunkt',
  avgTravelTime: 'Durchschnittliche Fahrzeit',
  nearby: 'In der Nähe',
  viewOnGoogleMaps: 'Auf Google Maps ansehen',

  share: 'Teilen',
  linkCopied: 'Link kopiert!',
  copyLink: 'Link kopieren',
  shareMessage: 'Lass uns treffen!',

  loadingTransit: 'Verkehrsdaten werden geladen...',

  point: 'Punkt',
  avgTime: 'Durchschn. Zeit',

  bar: 'Bar',
  cafe: 'Café',
  restaurant: 'Restaurant',
  free: 'Kostenlos',
  noName: 'Unbenannt',
  france: 'Frankreich',
  unitedKingdom: 'Vereinigtes Königreich',
  london: 'London',
  underground: 'U-Bahn (Tube)',
};

const it: TranslationKeys = {
  tagline: 'Trova il punto di incontro ideale con i mezzi pubblici',
  chooseCity: 'Scegli una città',
  openMap: 'Apri la mappa',
  comingSoon: 'Prossimamente...',
  moreCities: 'Altre città in arrivo',
  comingCities: 'Lyon, Lille...',

  subtitle: 'Trova il punto di incontro ideale',
  changeCity: 'Cambia città',

  addDeparture: 'Aggiungi un punto di partenza',
  searchPlaceholder: 'Cerca un indirizzo...',
  clickOnMap: 'Oppure clicca direttamente sulla mappa',

  showLinesStations: 'Mostra linee e stazioni',
  showTravelZones: 'Zone tempi di percorrenza',

  departurePoints: 'Punti di partenza',
  deleteAll: 'Elimina tutti',
  emptyHint: 'Aggiungi almeno 2 punti per calcolare il punto di incontro ottimale',
  minTravel: 'min di viaggio',
  viewRoute: 'Vedi percorso su Google Maps',
  byBike: 'In bici',
  noBike: 'Senza bici',

  computing: 'Calcolo...',
  computingLong: 'Calcolo in corso...',
  compute: 'Calcola',
  computeFull: 'Calcola il punto di incontro',

  optimalPoint: 'Punto di incontro ottimale',
  avgTravelTime: 'Tempo medio di viaggio',
  nearby: 'Nelle vicinanze',
  viewOnGoogleMaps: 'Vedi su Google Maps',

  share: 'Condividi',
  linkCopied: 'Link copiato!',
  copyLink: 'Copia il link',
  shareMessage: 'Incontriamoci!',

  loadingTransit: 'Caricamento dati trasporti...',

  point: 'Punto',
  avgTime: 'Tempo medio',

  bar: 'Bar',
  cafe: 'Caffè',
  restaurant: 'Ristorante',
  free: 'Gratuito',
  noName: 'Senza nome',
  france: 'Francia',
  unitedKingdom: 'Regno Unito',
  london: 'Londra',
  underground: 'Metropolitana (Tube)',
};

const es: TranslationKeys = {
  tagline: 'Encuentra el punto de encuentro ideal en transporte público',
  chooseCity: 'Elige una ciudad',
  openMap: 'Abrir mapa',
  comingSoon: 'Próximamente...',
  moreCities: 'Más ciudades próximamente',
  comingCities: 'Lyon, Lille...',

  subtitle: 'Encuentra el punto de encuentro ideal',
  changeCity: 'Cambiar de ciudad',

  addDeparture: 'Añadir un punto de partida',
  searchPlaceholder: 'Buscar una dirección...',
  clickOnMap: 'O haz clic directamente en el mapa',

  showLinesStations: 'Mostrar líneas y estaciones',
  showTravelZones: 'Zonas de tiempo de viaje',

  departurePoints: 'Puntos de partida',
  deleteAll: 'Eliminar todos',
  emptyHint: 'Añade al menos 2 puntos para calcular el punto de encuentro óptimo',
  minTravel: 'min de viaje',
  viewRoute: 'Ver ruta en Google Maps',
  byBike: 'En bici',
  noBike: 'Sin bici',

  computing: 'Calculando...',
  computingLong: 'Calculando...',
  compute: 'Calcular',
  computeFull: 'Calcular punto de encuentro',

  optimalPoint: 'Punto de encuentro óptimo',
  avgTravelTime: 'Tiempo medio de viaje',
  nearby: 'Cerca',
  viewOnGoogleMaps: 'Ver en Google Maps',

  share: 'Compartir',
  linkCopied: '¡Enlace copiado!',
  copyLink: 'Copiar enlace',
  shareMessage: '¡Quedemos!',

  loadingTransit: 'Cargando datos de transporte...',

  point: 'Punto',
  avgTime: 'Tiempo medio',

  bar: 'Bar',
  cafe: 'Café',
  restaurant: 'Restaurante',
  free: 'Gratis',
  noName: 'Sin nombre',
  france: 'Francia',
  unitedKingdom: 'Reino Unido',
  london: 'Londres',
  underground: 'Metro subterráneo (Tube)',
};

export const translations: Record<Locale, TranslationKeys> = { fr, en, de, it, es };

export type Translations = TranslationKeys;
