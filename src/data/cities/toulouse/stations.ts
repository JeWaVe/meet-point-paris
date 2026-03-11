import type { Station, Connection } from '../../types';

export type { Station, Connection };

export const stations: Station[] = [
  // === METRO LIGNE A ===
  { id: "ma_basso_cambo", name: "Basso Cambo", lat: 43.5700, lng: 1.3923, lines: ["A"] },
  { id: "ma_bellefontaine", name: "Bellefontaine", lat: 43.5661, lng: 1.3982, lines: ["A"] },
  { id: "ma_reynerie", name: "Reynerie", lat: 43.5709, lng: 1.4018, lines: ["A"] },
  { id: "ma_mirail", name: "Mirail - Université", lat: 43.5747, lng: 1.4020, lines: ["A"] },
  { id: "ma_bagatelle", name: "Bagatelle", lat: 43.5800, lng: 1.4123, lines: ["A"] },
  { id: "ma_mermoz", name: "Mermoz", lat: 43.5835, lng: 1.4151, lines: ["A"] },
  { id: "ma_fontaine_lestang", name: "Fontaine Lestang", lat: 43.5875, lng: 1.4184, lines: ["A"] },
  { id: "ma_arenes", name: "Arènes", lat: 43.5934, lng: 1.4186, lines: ["A", "T1"] },
  { id: "ma_patte_doie", name: "Patte d'Oie", lat: 43.5964, lng: 1.4230, lines: ["A"] },
  { id: "ma_st_cyprien", name: "Saint-Cyprien - République", lat: 43.5979, lng: 1.4314, lines: ["A"] },
  { id: "ma_esquirol", name: "Esquirol", lat: 43.6001, lng: 1.4439, lines: ["A"] },
  { id: "ma_capitole", name: "Capitole", lat: 43.6043, lng: 1.4452, lines: ["A"] },
  { id: "ma_jean_jaures", name: "Jean Jaurès", lat: 43.6056, lng: 1.4485, lines: ["A", "B"] },
  { id: "ma_marengo", name: "Marengo - SNCF", lat: 43.6109, lng: 1.4552, lines: ["A"] },
  { id: "ma_jolimont", name: "Jolimont", lat: 43.6153, lng: 1.4634, lines: ["A"] },
  { id: "ma_roseraie", name: "Roseraie", lat: 43.6200, lng: 1.4697, lines: ["A"] },
  { id: "ma_argoulets", name: "Argoulets", lat: 43.6243, lng: 1.4767, lines: ["A"] },
  { id: "ma_balma_gramont", name: "Balma - Gramont", lat: 43.6290, lng: 1.4828, lines: ["A"] },

  // === METRO LIGNE B ===
  { id: "mb_borderouge", name: "Borderouge", lat: 43.6404, lng: 1.4525, lines: ["B"] },
  { id: "mb_trois_cocus", name: "Trois Cocus", lat: 43.6380, lng: 1.4449, lines: ["B"] },
  { id: "mb_la_vache", name: "La Vache", lat: 43.6341, lng: 1.4360, lines: ["B"] },
  { id: "mb_barriere_paris", name: "Barrière de Paris", lat: 43.6263, lng: 1.4341, lines: ["B"] },
  { id: "mb_minimes", name: "Minimes - Claude Nougaro", lat: 43.6205, lng: 1.4358, lines: ["B"] },
  { id: "mb_canal_du_midi", name: "Canal du Midi", lat: 43.6155, lng: 1.4346, lines: ["B"] },
  { id: "mb_compans", name: "Compans-Caffarelli", lat: 43.6105, lng: 1.4356, lines: ["B"] },
  { id: "mb_jeanne_darc", name: "Jeanne d'Arc", lat: 43.6091, lng: 1.4451, lines: ["B"] },
  // Jean Jaurès: shared with Ligne A (ma_jean_jaures)
  { id: "mb_francois_verdier", name: "François Verdier", lat: 43.6005, lng: 1.4522, lines: ["B"] },
  { id: "mb_carmes", name: "Carmes", lat: 43.5975, lng: 1.4454, lines: ["B"] },
  { id: "mb_palais_justice", name: "Palais de Justice", lat: 43.5925, lng: 1.4446, lines: ["B", "T1"] },
  { id: "mb_st_michel", name: "Saint-Michel - Marcel Langer", lat: 43.5863, lng: 1.4471, lines: ["B"] },
  { id: "mb_empalot", name: "Empalot", lat: 43.5797, lng: 1.4421, lines: ["B"] },
  { id: "mb_st_agne", name: "Saint-Agne - SNCF", lat: 43.5805, lng: 1.4501, lines: ["B"] },
  { id: "mb_saouzelong", name: "Saouzelong", lat: 43.5797, lng: 1.4591, lines: ["B"] },
  { id: "mb_rangueil", name: "Rangueil", lat: 43.5747, lng: 1.4619, lines: ["B"] },
  { id: "mb_faculte_pharma", name: "Faculté de Pharmacie", lat: 43.5681, lng: 1.4645, lines: ["B"] },
  { id: "mb_ups", name: "Université Paul Sabatier", lat: 43.5609, lng: 1.4633, lines: ["B"] },
  { id: "mb_ramonville", name: "Ramonville", lat: 43.5558, lng: 1.4764, lines: ["B"] },

  // === TRAMWAY T1 ===
  // Palais de Justice: shared with Ligne B (mb_palais_justice)
  { id: "t1_ile_du_ramier", name: "Île du Ramier", lat: 43.5922, lng: 1.4404, lines: ["T1"] },
  { id: "t1_fer_a_cheval", name: "Fer à Cheval", lat: 43.5926, lng: 1.4355, lines: ["T1"] },
  { id: "t1_ave_muret", name: "Avenue de Muret", lat: 43.5894, lng: 1.4318, lines: ["T1"] },
  { id: "t1_croix_de_pierre", name: "Croix de Pierre", lat: 43.5856, lng: 1.4279, lines: ["T1"] },
  { id: "t1_deodat", name: "Déodat de Séverac", lat: 43.5896, lng: 1.4217, lines: ["T1"] },
  // Arènes: shared with Ligne A (ma_arenes)
  { id: "t1_hippodrome", name: "Hippodrome", lat: 43.5949, lng: 1.4094, lines: ["T1"] },
  { id: "t1_zenith", name: "Zénith", lat: 43.6009, lng: 1.4114, lines: ["T1"] },
  { id: "t1_cartoucherie", name: "Cartoucherie", lat: 43.6031, lng: 1.4077, lines: ["T1"] },
  { id: "t1_casselardit", name: "Casselardit", lat: 43.6060, lng: 1.4050, lines: ["T1"] },
  { id: "t1_purpan", name: "Purpan", lat: 43.6091, lng: 1.4020, lines: ["T1"] },
  { id: "t1_arenes_romaines", name: "Arènes Romaines", lat: 43.6141, lng: 1.3983, lines: ["T1"] },
  { id: "t1_ancely", name: "Ancely", lat: 43.6182, lng: 1.3969, lines: ["T1"] },
  { id: "t1_servanty", name: "Servanty - Airbus", lat: 43.6255, lng: 1.3935, lines: ["T1"] },
  { id: "t1_guyenne_berry", name: "Guyenne - Berry", lat: 43.6309, lng: 1.3917, lines: ["T1"] },
  { id: "t1_pasteur", name: "Pasteur - Mairie de Blagnac", lat: 43.6342, lng: 1.3912, lines: ["T1"] },
  { id: "t1_place_relais", name: "Place du Relais", lat: 43.6367, lng: 1.3901, lines: ["T1"] },
  { id: "t1_odyssud", name: "Odyssud - Ritouret", lat: 43.6362, lng: 1.3853, lines: ["T1"] },
  { id: "t1_patinoire", name: "Patinoire - Barradels", lat: 43.6404, lng: 1.3824, lines: ["T1"] },
  { id: "t1_grand_noble", name: "Grand Noble", lat: 43.6447, lng: 1.3775, lines: ["T1"] },
  { id: "t1_brassens", name: "Place Georges Brassens", lat: 43.6485, lng: 1.3756, lines: ["T1"] },
  { id: "t1_andromede", name: "Andromède - Lycée", lat: 43.6548, lng: 1.3736, lines: ["T1"] },
  { id: "t1_beauzelle", name: "Beauzelle - Aéroscopia", lat: 43.6603, lng: 1.3695, lines: ["T1"] },
  { id: "t1_aeroconstellation", name: "Aéroconstellation", lat: 43.6635, lng: 1.3626, lines: ["T1"] },
  { id: "t1_meett", name: "MEETT", lat: 43.6676, lng: 1.3600, lines: ["T1"] },
];

// Connections between adjacent stations
function buildLineConnections(): Connection[] {
  const conns: Connection[] = [];

  // Metro A
  const lineA = [
    "ma_basso_cambo", "ma_bellefontaine", "ma_reynerie", "ma_mirail",
    "ma_bagatelle", "ma_mermoz", "ma_fontaine_lestang", "ma_arenes",
    "ma_patte_doie", "ma_st_cyprien", "ma_esquirol", "ma_capitole",
    "ma_jean_jaures", "ma_marengo", "ma_jolimont", "ma_roseraie",
    "ma_argoulets", "ma_balma_gramont",
  ];
  for (let i = 0; i < lineA.length - 1; i++) {
    conns.push({ from: lineA[i], to: lineA[i + 1], time: 1.5 });
    conns.push({ from: lineA[i + 1], to: lineA[i], time: 1.5 });
  }

  // Metro B
  const lineB = [
    "mb_borderouge", "mb_trois_cocus", "mb_la_vache", "mb_barriere_paris",
    "mb_minimes", "mb_canal_du_midi", "mb_compans", "mb_jeanne_darc",
    "ma_jean_jaures", "mb_francois_verdier", "mb_carmes", "mb_palais_justice",
    "mb_st_michel", "mb_empalot", "mb_st_agne", "mb_saouzelong",
    "mb_rangueil", "mb_faculte_pharma", "mb_ups", "mb_ramonville",
  ];
  for (let i = 0; i < lineB.length - 1; i++) {
    conns.push({ from: lineB[i], to: lineB[i + 1], time: 1.5 });
    conns.push({ from: lineB[i + 1], to: lineB[i], time: 1.5 });
  }

  // Tram T1
  const lineT1 = [
    "mb_palais_justice", "t1_ile_du_ramier", "t1_fer_a_cheval",
    "t1_ave_muret", "t1_croix_de_pierre", "t1_deodat", "ma_arenes",
    "t1_hippodrome", "t1_zenith", "t1_cartoucherie", "t1_casselardit",
    "t1_purpan", "t1_arenes_romaines", "t1_ancely", "t1_servanty",
    "t1_guyenne_berry", "t1_pasteur", "t1_place_relais", "t1_odyssud",
    "t1_patinoire", "t1_grand_noble", "t1_brassens", "t1_andromede",
    "t1_beauzelle", "t1_aeroconstellation", "t1_meett",
  ];
  for (let i = 0; i < lineT1.length - 1; i++) {
    conns.push({ from: lineT1[i], to: lineT1[i + 1], time: 2 });
    conns.push({ from: lineT1[i + 1], to: lineT1[i], time: 2 });
  }

  return conns;
}

// Transfer connections between lines at shared stations
function buildTransfers(): Connection[] {
  // Transfers are handled implicitly via shared station IDs in branches
  return [];
}

export const connections: Connection[] = [
  ...buildLineConnections(),
  ...buildTransfers(),
];
