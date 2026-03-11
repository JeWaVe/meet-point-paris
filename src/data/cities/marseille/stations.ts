import type { Station, Connection } from '../../types';

export type { Station, Connection };

export const stations: Station[] = [
  // === METRO M1 ===
  { id: "m1_la_rose", name: "La Rose", lat: 43.3331, lng: 5.4296, lines: ["M1"] },
  { id: "m1_frais_vallon", name: "Frais Vallon", lat: 43.3255, lng: 5.4232, lines: ["M1"] },
  { id: "m1_malpasse", name: "Malpassé", lat: 43.3210, lng: 5.4164, lines: ["M1"] },
  { id: "m1_saint_just", name: "Saint-Just", lat: 43.3155, lng: 5.4064, lines: ["M1"] },
  { id: "m1_chartreux", name: "Chartreux", lat: 43.3092, lng: 5.4014, lines: ["M1"] },
  { id: "m1_cinq_avenues", name: "Cinq Avenues Longchamp", lat: 43.3041, lng: 5.3961, lines: ["M1"] },
  { id: "m1_reformes", name: "Réformés Canebière", lat: 43.3004, lng: 5.3862, lines: ["M1"] },
  { id: "m1_saint_charles", name: "Saint-Charles", lat: 43.3024, lng: 5.3802, lines: ["M1", "M2"] },
  { id: "m1_colbert", name: "Colbert", lat: 43.3003, lng: 5.3743, lines: ["M1"] },
  { id: "m1_vieux_port", name: "Vieux-Port", lat: 43.2956, lng: 5.3742, lines: ["M1"] },
  { id: "m1_estrangin", name: "Estrangin Préfecture", lat: 43.2903, lng: 5.3780, lines: ["M1"] },
  { id: "m1_castellane", name: "Castellane", lat: 43.2861, lng: 5.3846, lines: ["M1", "M2", "T3"] },
  { id: "m1_baille", name: "Baille", lat: 43.2881, lng: 5.3920, lines: ["M1"] },
  { id: "m1_la_timone", name: "La Timone", lat: 43.2911, lng: 5.4005, lines: ["M1"] },
  { id: "m1_la_blancarde", name: "La Blancarde", lat: 43.2954, lng: 5.4062, lines: ["M1", "T1", "T2"] },
  { id: "m1_louis_armand", name: "Louis Armand", lat: 43.3000, lng: 5.4136, lines: ["M1"] },
  { id: "m1_saint_barnabe", name: "Saint-Barnabé", lat: 43.3032, lng: 5.4186, lines: ["M1"] },
  { id: "m1_la_fourragere", name: "La Fourragère", lat: 43.3039, lng: 5.4242, lines: ["M1"] },

  // === METRO M2 ===
  { id: "m2_geze", name: "Gèze", lat: 43.3279, lng: 5.3672, lines: ["M2", "T3"] },
  { id: "m2_bougainville", name: "Bougainville", lat: 43.3208, lng: 5.3714, lines: ["M2"] },
  { id: "m2_national", name: "National", lat: 43.3151, lng: 5.3730, lines: ["M2"] },
  { id: "m2_desiree_clary", name: "Désirée Clary", lat: 43.3094, lng: 5.3723, lines: ["M2"] },
  { id: "m2_joliette", name: "Joliette", lat: 43.3039, lng: 5.3679, lines: ["M2", "T2", "T3"] },
  { id: "m2_jules_guesde", name: "Jules Guesde", lat: 43.3020, lng: 5.3740, lines: ["M2"] },
  // Saint-Charles: shared with M1 (m1_saint_charles)
  { id: "m2_noailles", name: "Noailles", lat: 43.2968, lng: 5.3812, lines: ["M2", "T1", "T2"] },
  { id: "m2_notre_dame", name: "Notre-Dame du Mont", lat: 43.2928, lng: 5.3836, lines: ["M2"] },
  // Castellane: shared with M1 (m1_castellane)
  { id: "m2_perier", name: "Périer", lat: 43.2794, lng: 5.3876, lines: ["M2"] },
  { id: "m2_rond_point_prado", name: "Rond-Point du Prado", lat: 43.2714, lng: 5.3925, lines: ["M2"] },
  { id: "m2_ste_marguerite", name: "Sainte-Marguerite Dromel", lat: 43.2705, lng: 5.4022, lines: ["M2", "T3"] },

  // === TRAMWAY T1 ===
  // Noailles: shared with M2 (m2_noailles)
  { id: "t1_eugene_pierre", name: "Eugène Pierre", lat: 43.2951, lng: 5.3897, lines: ["T1"] },
  { id: "t1_camas", name: "Camas", lat: 43.2953, lng: 5.3932, lines: ["T1"] },
  { id: "t1_george", name: "George", lat: 43.2956, lng: 5.3974, lines: ["T1"] },
  { id: "t1_jean_martin", name: "Jean Martin", lat: 43.2958, lng: 5.4018, lines: ["T1"] },
  // La Blancarde: shared with M1 (m1_la_blancarde)
  { id: "t1_sainte_therese", name: "Sainte-Thérèse", lat: 43.2941, lng: 5.4096, lines: ["T1"] },
  { id: "t1_saint_pierre", name: "Saint-Pierre", lat: 43.2918, lng: 5.4142, lines: ["T1"] },
  { id: "t1_la_parette", name: "La Parette", lat: 43.2950, lng: 5.4192, lines: ["T1"] },
  { id: "t1_la_boiseraie", name: "La Boiseraie", lat: 43.2949, lng: 5.4226, lines: ["T1"] },
  { id: "t1_air_bel", name: "Air Bel", lat: 43.2943, lng: 5.4291, lines: ["T1"] },
  { id: "t1_la_grognarde", name: "La Grognarde", lat: 43.2946, lng: 5.4323, lines: ["T1"] },
  { id: "t1_william_booth", name: "William Booth", lat: 43.2926, lng: 5.4369, lines: ["T1"] },
  { id: "t1_les_caillols", name: "Les Caillols", lat: 43.2947, lng: 5.4441, lines: ["T1"] },

  // === TRAMWAY T2 ===
  { id: "t2_arenc", name: "Arenc Euroméditerranée", lat: 43.3133, lng: 5.3681, lines: ["T2", "T3"] },
  { id: "t2_euromed_silo", name: "Euroméditerranée Le Silo", lat: 43.3087, lng: 5.3681, lines: ["T2", "T3"] },
  // Joliette: shared with M2 (m2_joliette)
  { id: "t2_republique", name: "République Dames", lat: 43.3022, lng: 5.3693, lines: ["T2", "T3"] },
  { id: "t2_sadi_carnot", name: "Sadi Carnot", lat: 43.2999, lng: 5.3712, lines: ["T2", "T3"] },
  { id: "t2_belsunce", name: "Belsunce Alcazar", lat: 43.2985, lng: 5.3766, lines: ["T2", "T3"] },
  { id: "t2_canebiere_capucins", name: "Canebière Capucins", lat: 43.2967, lng: 5.3790, lines: ["T2"] },
  // Noailles (T2): shared with M2 (m2_noailles) — T2 uses different stop but same station
  { id: "t2_reformes", name: "Réformés Canebière", lat: 43.3000, lng: 5.3856, lines: ["T2"] },
  { id: "t2_longchamp", name: "Longchamp National", lat: 43.3015, lng: 5.3887, lines: ["T2"] },
  { id: "t2_palais_longchamp", name: "Palais Longchamp", lat: 43.3032, lng: 5.3925, lines: ["T2"] },
  { id: "t2_cinq_avenues", name: "Cinq Avenues", lat: 43.3023, lng: 5.3971, lines: ["T2"] },
  { id: "t2_foch_sakakini", name: "Foch Sakakini", lat: 43.3003, lng: 5.4001, lines: ["T2"] },
  { id: "t2_boisson", name: "Foch Boisson", lat: 43.2981, lng: 5.4033, lines: ["T2"] },
  // La Blancarde: shared with M1 (m1_la_blancarde)

  // === TRAMWAY T3 ===
  // Castellane: shared with M1 (m1_castellane)
  { id: "t3_rome_dragon", name: "Rome Dragon", lat: 43.2891, lng: 5.3819, lines: ["T3"] },
  { id: "t3_place_de_rome", name: "Place de Rome", lat: 43.2914, lng: 5.3806, lines: ["T3"] },
  { id: "t3_rome_davso", name: "Rome Davso", lat: 43.2935, lng: 5.3793, lines: ["T3"] },
  { id: "t3_cours_st_louis", name: "Cours Saint-Louis", lat: 43.2959, lng: 5.3779, lines: ["T3"] },
  // Belsunce → Joliette → Euromed → Arenc: shared with T2
  // Gèze extension (north)
  { id: "t3_salengro_bachas", name: "Salengro Bachas", lat: 43.3172, lng: 5.3688, lines: ["T3"] },
  { id: "t3_salengro_cougit", name: "Salengro Cougit", lat: 43.3216, lng: 5.3675, lines: ["T3"] },
  // Gèze: shared with M2 (m2_geze)
  // Castellane extension (south)
  { id: "t3_parc_26e", name: "Parc du 26ème Centenaire", lat: 43.2823, lng: 5.3903, lines: ["T3"] },
  { id: "t3_cantini_rouet", name: "Cantini Rouet", lat: 43.2799, lng: 5.3949, lines: ["T3"] },
  { id: "t3_place_ferrie", name: "Place Ferrié", lat: 43.2770, lng: 5.3992, lines: ["T3"] },
  // Sainte-Marguerite Dromel: shared with M2 (m2_ste_marguerite)
  { id: "t3_aubert_ganay", name: "Aubert Ganay", lat: 43.2660, lng: 5.4031, lines: ["T3"] },
  { id: "t3_parc_sevigne", name: "Parc Sévigné", lat: 43.2618, lng: 5.4048, lines: ["T3"] },
  { id: "t3_hopital_ste_marguerite", name: "Hôpital Sainte-Marguerite", lat: 43.2594, lng: 5.4087, lines: ["T3"] },
  { id: "t3_la_gaye", name: "La Gaye", lat: 43.2565, lng: 5.4112, lines: ["T3"] },
];

// Connections between adjacent stations
function buildLineConnections(): Connection[] {
  const conns: Connection[] = [];

  // Metro M1
  const lineM1 = [
    "m1_la_rose", "m1_frais_vallon", "m1_malpasse", "m1_saint_just",
    "m1_chartreux", "m1_cinq_avenues", "m1_reformes", "m1_saint_charles",
    "m1_colbert", "m1_vieux_port", "m1_estrangin", "m1_castellane",
    "m1_baille", "m1_la_timone", "m1_la_blancarde", "m1_louis_armand",
    "m1_saint_barnabe", "m1_la_fourragere",
  ];
  for (let i = 0; i < lineM1.length - 1; i++) {
    conns.push({ from: lineM1[i], to: lineM1[i + 1], time: 1.5 });
    conns.push({ from: lineM1[i + 1], to: lineM1[i], time: 1.5 });
  }

  // Metro M2
  const lineM2 = [
    "m2_geze", "m2_bougainville", "m2_national", "m2_desiree_clary",
    "m2_joliette", "m2_jules_guesde", "m1_saint_charles",
    "m2_noailles", "m2_notre_dame", "m1_castellane",
    "m2_perier", "m2_rond_point_prado", "m2_ste_marguerite",
  ];
  for (let i = 0; i < lineM2.length - 1; i++) {
    conns.push({ from: lineM2[i], to: lineM2[i + 1], time: 1.5 });
    conns.push({ from: lineM2[i + 1], to: lineM2[i], time: 1.5 });
  }

  // Tram T1
  const lineT1 = [
    "m2_noailles", "t1_eugene_pierre", "t1_camas", "t1_george",
    "t1_jean_martin", "m1_la_blancarde", "t1_sainte_therese",
    "t1_saint_pierre", "t1_la_parette", "t1_la_boiseraie",
    "t1_air_bel", "t1_la_grognarde", "t1_william_booth", "t1_les_caillols",
  ];
  for (let i = 0; i < lineT1.length - 1; i++) {
    conns.push({ from: lineT1[i], to: lineT1[i + 1], time: 2 });
    conns.push({ from: lineT1[i + 1], to: lineT1[i], time: 2 });
  }

  // Tram T2
  const lineT2 = [
    "t2_arenc", "t2_euromed_silo", "m2_joliette",
    "t2_republique", "t2_sadi_carnot", "t2_belsunce",
    "t2_canebiere_capucins", "m2_noailles", "t2_reformes",
    "t2_longchamp", "t2_palais_longchamp", "t2_cinq_avenues",
    "t2_foch_sakakini", "t2_boisson", "m1_la_blancarde",
  ];
  for (let i = 0; i < lineT2.length - 1; i++) {
    conns.push({ from: lineT2[i], to: lineT2[i + 1], time: 2 });
    conns.push({ from: lineT2[i + 1], to: lineT2[i], time: 2 });
  }

  // Tram T3
  const lineT3 = [
    "t3_la_gaye", "t3_hopital_ste_marguerite", "t3_parc_sevigne",
    "t3_aubert_ganay", "m2_ste_marguerite", "t3_place_ferrie",
    "t3_cantini_rouet", "t3_parc_26e", "m1_castellane",
    "t3_rome_dragon", "t3_place_de_rome", "t3_rome_davso",
    "t3_cours_st_louis", "t2_belsunce", "t2_sadi_carnot",
    "t2_republique", "m2_joliette", "t2_euromed_silo", "t2_arenc",
    "t3_salengro_bachas", "t3_salengro_cougit", "m2_geze",
  ];
  for (let i = 0; i < lineT3.length - 1; i++) {
    conns.push({ from: lineT3[i], to: lineT3[i + 1], time: 2 });
    conns.push({ from: lineT3[i + 1], to: lineT3[i], time: 2 });
  }

  return conns;
}

export const connections: Connection[] = [
  ...buildLineConnections(),
];
