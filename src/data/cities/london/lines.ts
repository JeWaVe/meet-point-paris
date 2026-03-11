import type { LineDefinition } from '../../types';

export type { LineDefinition };

export const lines: LineDefinition[] = [
  {
    id: "BAK", name: "Bakerloo Line", color: "#AE6017", type: "metro",
    branches: [
      ["elephant_and_castle", "lambeth_north", "waterloo", "embankment", "charing_cross", 
       "picadilly_circus", "oxford_circus", "regents_park", "baker_street", "marylebone", 
       "edgware_road_b", "paddington", "warwick_avenue", "maida_vale", "kilburn_park", 
       "queens_park", "kensal_green", "willesden_junction", "harlesden", "stonebridge_park", 
       "wembley_central", "north_wembley", "south_kenton", "kenton", "harrow_and_wealdston"],
    ],
  },
  {
    id: "CEN", name: "Central Line", color: "#F15B2E", type: "metro",
    branches: [
      ["ealing_broadway", "west_acton", "north_acton", "east_acton", "white_city", 
       "shepherds_bush_c", "holland_park", "notting_hill_gate", "queensway", "lancaster_gate", 
       "marble_arch", "bond_street", "oxford_circus", "tottenham_court_road", "holborn", 
       "chancery_lane", "st_pauls", "bank", "liverpool_street", "bethnal_green", "mile_end", 
       "stratford", "leyton", "leytonstone", "snaresbrook", "south_woodford", "woodford", 
       "buckhurst_hill", "loughton", "debden", "theydon_bois", "epping"],
      ["west_ruislip", "ruislip_gardens", "south_ruislip", "northolt", "greenford", "perivale", 
       "hanger_lane", "north_acton"],
      ["barkingside", "fairlop", "hainault", "grange_hill", "chigwell", "roding_valley", "woodford"],
      ["barkingside", "newbury_park", "gants_hill", "redbridge", "wanstead", "leytonstone"],
    ],
  },
  {
    id: "CIR", name: "Circle Line", color: "#FFE02B", type: "metro",
    branches: [
      ["aldgate", "liverpool_street", "moorgate", "barbican", "farringdon", 
       "kings_cross_st_pancras", "euston_square", "great_portland_street", "baker_street", 
       "edgware_road_c", "paddington", "bayswater", "notting_hill_gate", "high_street_kensington", 
       "gloucester_road", "south_kensington", "sloane_square", "victoria", "st_jamess_park", 
       "westminster", "embankment", "temple", "blackfriars", "mansion_house", "cannon_street", 
       "monument", "tower_hill", "aldgate"],
    ],
  },
  {
    id: "DIS", name: "District Line", color: "#00A166", type: "metro",
    branches: [
      ["ealing_broadway", "ealing_common", "acton_town", "chiswick_park", "turnham_green", 
       "gunnersbury", "kew_gardens", "richmond"],
      ["kensington_olympia", "earls_court", "gloucester_road", "south_kensington", "sloane_square", 
       "victoria", "st_jamess_park", "westminster", "embankment", "temple", "blackfriars", 
       "mansion_house", "cannon_street", "monument", "tower_hill", "aldgate_east", "whitechapel", 
       "stepney_green", "mile_end", "bow_road", "bromley_by_bow", "west_ham", "plaistow", 
       "upton_park", "east_ham", "barking", "upney", "becontree", "dagenham_heathway", 
       "dagenham_east", "elm_park", "hornchurch", "upminster_bridge", "upminster"],
      ["edgware_road_c", "paddington", "bayswater", "notting_hill_gate", "high_street_kensington", 
       "earls_court", "west_brompton", "fulham_broadway", "parsons_green", "putney_bridge", 
       "east_putney", "southfields", "wimbledon_park", "wimbledon"],
      ["barons_court", "hammersmith", "ravenscourt_park", "stamford_brook", "turnham_green"],
      ["barons_court", "west_kensington", "earls_court"],
    ],
  },
  {
    id: "HAM", name: "Hammersmith & City Line", color: "#F491A8", type: "metro",
    branches: [
      ["barking", "east_ham", "upton_park", "plaistow", "west_ham", "bromley_by_bow", "bow_road", 
       "mile_end", "stepney_green", "whitechapel", "aldgate_east", "liverpool_street", "moorgate", 
       "barbican", "farringdon", "kings_cross_st_pancras", "euston_square", 
       "great_portland_street", "baker_street", "edgware_road_c", "paddington", "royal_oak", 
       "westbourne_park", "ladbroke_grove", "latimer_road", "shepherds_bush_h", "goldhawk_road", 
       "hammersmith"],
    ],
  },
  {
    id: "JUB", name: "Jubilee Line", color: "#949699", type: "metro",
    branches: [
      ["stanmore", "canons_park", "queensbury", "kingsbury", "wembley_park", "neasden", 
       "dollis_hill", "willesden_green", "kilburn", "west_hampstead", "finchley_road", 
       "swiss_cottage", "st_johns_wood", "baker_street", "bond_street", "green_park", 
       "westminster", "waterloo", "southwark", "london_bridge", "bermondsey", "canada_water", 
       "canary_wharf", "north_greenwich", "canning_town", "west_ham", "stratford"],
    ],
  },
  {
    id: "MET", name: "Metropolitan Line", color: "#91005A", type: "metro",
    branches: [
      ["aldgate", "liverpool_street", "moorgate", "barbican", "farringdon", 
       "kings_cross_st_pancras", "euston_square", "great_portland_street", "baker_street", 
       "finchley_road", "wembley_park", "preston_road", "northwick_park", "harrow_on_the_hill", 
       "north_harrow", "pinner", "northwood_hills", "northwood", "moor_park", "croxley", "watford"],
      ["amersham", "chalfont_and_latimer", "chesham"],
      ["uxbridge", "hillingdon", "ickenham", "ruislip", "ruislip_manor", "eastcote", 
       "rayners_lane", "west_harrow", "harrow_on_the_hill"],
      ["chalfont_and_latimer", "chorleywood", "rickmansworth", "moor_park"],
    ],
  },
  {
    id: "NOR", name: "Northern Line", color: "#2D2D2D", type: "metro",
    branches: [
      ["edgware", "burnt_oak", "colindale", "hendon_central", "brent_cross", "golders_green", 
       "hampstead", "belsize_park", "chalk_farm", "camden_town", "euston", 
       "kings_cross_st_pancras", "angel", "old_street", "moorgate", "bank", "london_bridge", 
       "borough", "elephant_and_castle", "kennington", "oval", "stockwell", "clapham_north", 
       "clapham_common", "clapham_south", "balham", "tooting_bec", "tooting_broadway", 
       "colliers_wood", "south_wimbledon", "morden"],
      ["mill_hill_east", "finchley_central", "east_finchley", "highgate", "archway", 
       "tufnell_park", "kentish_town", "camden_town", "mornington_crescent", "euston", 
       "warren_street", "goodge_street", "tottenham_court_road", "leicester_square", 
       "charing_cross", "embankment", "waterloo", "kennington"],
      ["high_barnet", "totteridge_and_whetstone", "woodside_park", "west_finchley", 
       "finchley_central"],
    ],
  },
  {
    id: "PIC", name: "Piccadilly Line", color: "#094FA3", type: "metro",
    branches: [
      ["cockfosters", "oakwood", "southgate", "arnos_grove", "bounds_green", "wood_green", 
       "turnpike_lane", "manor_house", "finsbury_park", "arsenal", "holloway_road", 
       "caledonian_road", "kings_cross_st_pancras", "russell_square", "holborn", "covent_garden", 
       "leicester_square", "picadilly_circus", "green_park", "hyde_park_corner", "knightsbridge", 
       "south_kensington", "gloucester_road", "earls_court", "barons_court", "hammersmith", 
       "turnham_green", "acton_town", "ealing_common", "north_ealing", "park_royal", "alperton", 
       "sudbury_town", "sudbury_hill", "south_harrow", "rayners_lane", "eastcote", "ruislip_manor", 
       "ruislip", "ickenham", "hillingdon", "uxbridge"],
      ["acton_town", "south_ealing", "northfields", "boston_manor", "osterley", "hounslow_east", 
       "hounslow_central", "hounslow_west", "hatton_cross", "heathrow_terminals_1,_2_and_3", 
       "heathrow_terminal_4", "hatton_cross"],
    ],
  },
  {
    id: "VIC", name: "Victoria Line", color: "#0A9CDA", type: "metro",
    branches: [
      ["walthamstow_central", "blackhorse_road", "tottenham_hale", "seven_sisters", 
       "finsbury_park", "highbury_and_islington", "kings_cross_st_pancras", "euston", 
       "warren_street", "oxford_circus", "green_park", "victoria", "pimlico", "vauxhall", 
       "stockwell", "brixton"],
    ],
  },
  {
    id: "WAC", name: "Waterloo & City Line", color: "#88D0C4", type: "metro",
    branches: [
      ["bank", "waterloo"],
    ],
  },
];
