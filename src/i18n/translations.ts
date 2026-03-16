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
  openPanel: 'Options & adresses',
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
  alternativePoint: 'Point alternatif',
  nearbyAmenities: 'commerces à proximité',
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
  unitedStates: 'États-Unis',

  // City names
  london: 'Londres',
  newYork: 'New York',

  // Transit descriptions
  underground: 'Métro souterrain (Tube)',
  nycSubway: 'Métro (Subway)',

  // Legal
  legalNotice: 'Mentions légales',
  legalPublisher: 'Éditeur',
  legalDirector: 'Directeur de la publication',
  legalHost: 'Hébergement',
  legalData: 'Données personnelles',
  legalDataDesc: "Ce site ne collecte aucune donnée personnelle. Aucun cookie n'est déposé. Les adresses saisies sont traitées uniquement côté client et ne sont jamais transmises à nos serveurs.",
  legalAnalytics: "L'analyse d'audience est réalisée par Umami Cloud, un outil respectueux de la vie privée, sans cookies et conforme au RGPD.",
  legalIP: 'Propriété intellectuelle',
  legalIPDesc: "Le contenu de ce site est protégé par la licence Business Source License 1.1. Toute reproduction à des fins commerciales est interdite sans autorisation préalable de l'éditeur.",
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
  openPanel: 'Options & addresses',
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
  alternativePoint: 'Alternative point',
  nearbyAmenities: 'nearby amenities',
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
  unitedStates: 'United States',
  london: 'London',
  newYork: 'New York',
  underground: 'Underground (Tube)',
  nycSubway: 'Subway',
  legalNotice: 'Legal notice',
  legalPublisher: 'Publisher',
  legalDirector: 'Publication director',
  legalHost: 'Hosting',
  legalData: 'Personal data',
  legalDataDesc: 'This site does not collect any personal data. No cookies are used. Addresses entered are processed client-side only and are never sent to our servers.',
  legalAnalytics: 'Analytics are provided by Umami Cloud, a privacy-friendly, cookie-free, GDPR-compliant tool.',
  legalIP: 'Intellectual property',
  legalIPDesc: 'The content of this site is protected under the Business Source License 1.1. Any commercial reproduction is prohibited without prior authorization from the publisher.',
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
  openPanel: 'Optionen & Adressen',
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
  alternativePoint: 'Alternativer Punkt',
  nearbyAmenities: 'Geschäfte in der Nähe',
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
  unitedStates: 'Vereinigte Staaten',
  london: 'London',
  newYork: 'New York',
  underground: 'U-Bahn (Tube)',
  nycSubway: 'U-Bahn (Subway)',
  legalNotice: 'Impressum',
  legalPublisher: 'Herausgeber',
  legalDirector: 'Verantwortlicher',
  legalHost: 'Hosting',
  legalData: 'Datenschutz',
  legalDataDesc: 'Diese Website erhebt keine personenbezogenen Daten. Es werden keine Cookies verwendet. Eingegebene Adressen werden nur clientseitig verarbeitet und nie an unsere Server übermittelt.',
  legalAnalytics: 'Die Webanalyse erfolgt über Umami Cloud, ein datenschutzfreundliches, cookiefreies und DSGVO-konformes Tool.',
  legalIP: 'Geistiges Eigentum',
  legalIPDesc: 'Der Inhalt dieser Website ist durch die Business Source License 1.1 geschützt. Jede kommerzielle Vervielfältigung ist ohne vorherige Genehmigung des Herausgebers untersagt.',
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
  openPanel: 'Opzioni & indirizzi',
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
  alternativePoint: 'Punto alternativo',
  nearbyAmenities: 'locali nelle vicinanze',
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
  unitedStates: 'Stati Uniti',
  london: 'Londra',
  newYork: 'New York',
  underground: 'Metropolitana (Tube)',
  nycSubway: 'Metropolitana (Subway)',
  legalNotice: 'Note legali',
  legalPublisher: 'Editore',
  legalDirector: 'Direttore della pubblicazione',
  legalHost: 'Hosting',
  legalData: 'Dati personali',
  legalDataDesc: 'Questo sito non raccoglie alcun dato personale. Non vengono utilizzati cookie. Gli indirizzi inseriti vengono elaborati solo lato client e non vengono mai inviati ai nostri server.',
  legalAnalytics: "L'analisi del traffico è fornita da Umami Cloud, uno strumento rispettoso della privacy, senza cookie e conforme al GDPR.",
  legalIP: 'Proprietà intellettuale',
  legalIPDesc: "Il contenuto di questo sito è protetto dalla Business Source License 1.1. Qualsiasi riproduzione commerciale è vietata senza previa autorizzazione dell'editore.",
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
  openPanel: 'Opciones y direcciones',
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
  alternativePoint: 'Punto alternativo',
  nearbyAmenities: 'comercios cercanos',
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
  unitedStates: 'Estados Unidos',
  london: 'Londres',
  newYork: 'Nueva York',
  underground: 'Metro subterráneo (Tube)',
  nycSubway: 'Metro (Subway)',
  legalNotice: 'Aviso legal',
  legalPublisher: 'Editor',
  legalDirector: 'Director de publicación',
  legalHost: 'Alojamiento',
  legalData: 'Datos personales',
  legalDataDesc: 'Este sitio no recopila ningún dato personal. No se utilizan cookies. Las direcciones introducidas se procesan únicamente en el cliente y nunca se envían a nuestros servidores.',
  legalAnalytics: 'El análisis de tráfico es proporcionado por Umami Cloud, una herramienta respetuosa con la privacidad, sin cookies y conforme al RGPD.',
  legalIP: 'Propiedad intelectual',
  legalIPDesc: 'El contenido de este sitio está protegido por la Business Source License 1.1. Queda prohibida toda reproducción comercial sin autorización previa del editor.',
};

export const translations: Record<Locale, TranslationKeys> = { fr, en, de, it, es };

export type Translations = TranslationKeys;
