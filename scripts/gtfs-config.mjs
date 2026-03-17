// Per-city GTFS configuration

export const cities = {
  paris: {
    name: 'Paris (IDFM)',
    gtfsUrl: 'https://eu.ftp.opendatasoft.com/stif/GTFS/IDFM-gtfs.zip',
    cacheDir: './gtfs-cache/paris',
    stationsFile: './src/data/cities/paris/stations.ts',
    outputFile: './src/data/cities/paris/gtfs-times.ts',
    generatedComment: 'Auto-generated from GTFS IDFM data - do not edit manually',
    // Filter by known route IDs
    routeFilter: 'ids',
    routeIds: new Set([
      // Metro 1-14, 3B, 7B
      'IDFM:C01371','IDFM:C01372','IDFM:C01373','IDFM:C01374','IDFM:C01375',
      'IDFM:C01376','IDFM:C01377','IDFM:C01378','IDFM:C01379','IDFM:C01380',
      'IDFM:C01381','IDFM:C01382','IDFM:C01383','IDFM:C01384','IDFM:C01386','IDFM:C01387',
      // Tram T1-T13
      'IDFM:C01389','IDFM:C01390','IDFM:C01391','IDFM:C01679','IDFM:C01684',
      'IDFM:C01774','IDFM:C01794','IDFM:C01795','IDFM:C01843','IDFM:C01999',
      'IDFM:C02317','IDFM:C02344','IDFM:C02528',
      // RER A-E
      'IDFM:C01742','IDFM:C01743','IDFM:C01727','IDFM:C01728','IDFM:C01729',
    ]),
    routeNames: {
      'IDFM:C01371':'M1','IDFM:C01372':'M2','IDFM:C01373':'M3','IDFM:C01374':'M4',
      'IDFM:C01375':'M5','IDFM:C01376':'M6','IDFM:C01377':'M7','IDFM:C01378':'M8',
      'IDFM:C01379':'M9','IDFM:C01380':'M10','IDFM:C01381':'M11','IDFM:C01382':'M12',
      'IDFM:C01383':'M13','IDFM:C01384':'M14','IDFM:C01386':'M3B','IDFM:C01387':'M7B',
      'IDFM:C01389':'T1','IDFM:C01390':'T2','IDFM:C01391':'T3a','IDFM:C01679':'T3b',
      'IDFM:C01684':'T5','IDFM:C01774':'T7','IDFM:C01794':'T6','IDFM:C01795':'T8',
      'IDFM:C01843':'T4','IDFM:C01999':'T11','IDFM:C02317':'T9','IDFM:C02344':'T13',
      'IDFM:C02528':'T10',
      'IDFM:C01742':'RER_A','IDFM:C01743':'RER_B','IDFM:C01727':'RER_C',
      'IDFM:C01728':'RER_D','IDFM:C01729':'RER_E',
    },
    routeToLine: {
      'M1': '1', 'M2': '2', 'M3': '3', 'M4': '4', 'M5': '5', 'M6': '6',
      'M7': '7', 'M8': '8', 'M9': '9', 'M10': '10', 'M11': '11', 'M12': '12',
      'M13': '13', 'M14': '14', 'M3B': '3bis', 'M7B': '7bis',
      'T1': 'T1', 'T2': 'T2', 'T3a': 'T3a', 'T3b': 'T3b', 'T4': 'T4',
      'T5': 'T5', 'T6': 'T6', 'T7': 'T7', 'T8': 'T8', 'T9': 'T9',
      'T10': 'T10', 'T11': 'T11', 'T13': 'T13',
      'RER_A': 'A', 'RER_B': 'B', 'RER_C': 'C', 'RER_D': 'D', 'RER_E': 'E',
    },
  },

  toulouse: {
    name: 'Toulouse (Tisséo)',
    gtfsUrl: 'https://data.toulouse-metropole.fr/explore/dataset/tisseo-gtfs/files/fc1dda89077cf37e4f7521760e0ef4e9/download/',
    cacheDir: './gtfs-cache/toulouse',
    stationsFile: './src/data/cities/toulouse/stations.ts',
    outputFile: './src/data/cities/toulouse/gtfs-times.ts',
    generatedComment: 'Auto-generated from GTFS Tisséo data - do not edit manually',
    // Filter by route_type: 0=tram, 1=metro
    routeFilter: 'types',
    routeTypes: new Set(['0', '1']),
    routeNames: {}, // filled dynamically from routes.txt
    routeToLine: {}, // filled dynamically from routes.txt
  },

  marseille: {
    name: 'Marseille (RTM)',
    gtfsUrl: 'https://app.mecatran.com/utw/ws/gtfsfeed/static/mamp-rtm?apiKey=16421b08630a7d065c6d250051780f484b673659',
    cacheDir: './gtfs-cache/marseille',
    stationsFile: './src/data/cities/marseille/stations.ts',
    outputFile: './src/data/cities/marseille/gtfs-times.ts',
    generatedComment: 'Auto-generated from GTFS RTM data - do not edit manually',
    // Filter by route_type: 0=tram, 1=metro
    routeFilter: 'types',
    routeTypes: new Set(['0', '1']),
    routeNames: {}, // filled dynamically from routes.txt
    routeToLine: {}, // filled dynamically from routes.txt
  },

  lyon: {
    name: 'Lyon (TCL)',
    gtfsUrl: 'https://transport.data.gouv.fr/resources/11681/download',
    cacheDir: './gtfs-cache/lyon',
    stationsFile: './src/data/cities/lyon/stations.ts',
    outputFile: './src/data/cities/lyon/gtfs-times.ts',
    generatedComment: 'Auto-generated from GTFS TCL data - do not edit manually',
    // Filter by route_type: 0=tram, 1=metro, 7=funicular
    routeFilter: 'types',
    routeTypes: new Set(['0', '1', '7']),
    routeNames: {}, // filled dynamically from routes.txt
    routeToLine: {}, // filled dynamically from routes.txt
  },
};
