import type { LineDefinition } from '../../types';

export type { LineDefinition };

export const lines: LineDefinition[] = [
  {
    id: "M1", name: "Métro M1", color: "#009FE3", type: "metro",
    branches: [[
      "m1_la_rose", "m1_frais_vallon", "m1_malpasse", "m1_saint_just",
      "m1_chartreux", "m1_cinq_avenues", "m1_reformes", "m1_saint_charles",
      "m1_colbert", "m1_vieux_port", "m1_estrangin", "m1_castellane",
      "m1_baille", "m1_la_timone", "m1_la_blancarde", "m1_louis_armand",
      "m1_saint_barnabe", "m1_la_fourragere",
    ]],
  },
  {
    id: "M2", name: "Métro M2", color: "#E30613", type: "metro",
    branches: [[
      "m2_geze", "m2_bougainville", "m2_national", "m2_desiree_clary",
      "m2_joliette", "m2_jules_guesde", "m1_saint_charles",
      "m2_noailles", "m2_notre_dame", "m1_castellane",
      "m2_perier", "m2_rond_point_prado", "m2_ste_marguerite",
    ]],
  },
  {
    id: "T1", name: "Tramway T1", color: "#F28C00", type: "tram",
    branches: [[
      "m2_noailles", "t1_eugene_pierre", "t1_camas", "t1_george",
      "t1_jean_martin", "m1_la_blancarde", "t1_sainte_therese",
      "t1_saint_pierre", "t1_la_parette", "t1_la_boiseraie",
      "t1_air_bel", "t1_la_grognarde", "t1_william_booth", "t1_les_caillols",
    ]],
  },
  {
    id: "T2", name: "Tramway T2", color: "#F4E718", type: "tram",
    branches: [[
      "t2_arenc", "t2_euromed_silo", "m2_joliette",
      "t2_republique", "t2_sadi_carnot", "t2_belsunce",
      "t2_canebiere_capucins", "m2_noailles", "t2_reformes",
      "t2_longchamp", "t2_palais_longchamp", "t2_cinq_avenues",
      "t2_foch_sakakini", "t2_boisson", "m1_la_blancarde",
    ]],
  },
  {
    id: "T3", name: "Tramway T3", color: "#95C11F", type: "tram",
    branches: [[
      "t3_la_gaye", "t3_hopital_ste_marguerite", "t3_parc_sevigne",
      "t3_aubert_ganay", "m2_ste_marguerite", "t3_place_ferrie",
      "t3_cantini_rouet", "t3_parc_26e", "m1_castellane",
      "t3_rome_dragon", "t3_place_de_rome", "t3_rome_davso",
      "t3_cours_st_louis", "t2_belsunce", "t2_sadi_carnot",
      "t2_republique", "m2_joliette", "t2_euromed_silo", "t2_arenc",
      "t3_salengro_bachas", "t3_salengro_cougit", "m2_geze",
    ]],
  },
];
