import type { LineDefinition } from '../../types';

export type { LineDefinition };

export const lines: LineDefinition[] = [
  {
    id: "A", name: "Métro A", color: "#E2231A", type: "metro",
    branches: [[
      "ma_basso_cambo", "ma_bellefontaine", "ma_reynerie", "ma_mirail",
      "ma_bagatelle", "ma_mermoz", "ma_fontaine_lestang", "ma_arenes",
      "ma_patte_doie", "ma_st_cyprien", "ma_esquirol", "ma_capitole",
      "ma_jean_jaures", "ma_marengo", "ma_jolimont", "ma_roseraie",
      "ma_argoulets", "ma_balma_gramont",
    ]],
  },
  {
    id: "B", name: "Métro B", color: "#FFB531", type: "metro",
    branches: [[
      "mb_borderouge", "mb_trois_cocus", "mb_la_vache", "mb_barriere_paris",
      "mb_minimes", "mb_canal_du_midi", "mb_compans", "mb_jeanne_darc",
      "ma_jean_jaures", "mb_francois_verdier", "mb_carmes", "mb_palais_justice",
      "mb_st_michel", "mb_empalot", "mb_st_agne", "mb_saouzelong",
      "mb_rangueil", "mb_faculte_pharma", "mb_ups", "mb_ramonville",
    ]],
  },
  {
    id: "T1", name: "Tramway T1", color: "#0B6E4F", type: "tram",
    branches: [[
      "mb_palais_justice", "t1_ile_du_ramier", "t1_fer_a_cheval",
      "t1_ave_muret", "t1_croix_de_pierre", "t1_deodat", "ma_arenes",
      "t1_hippodrome", "t1_zenith", "t1_cartoucherie", "t1_casselardit",
      "t1_purpan", "t1_arenes_romaines", "t1_ancely", "t1_servanty",
      "t1_guyenne_berry", "t1_pasteur", "t1_place_relais", "t1_odyssud",
      "t1_patinoire", "t1_grand_noble", "t1_brassens", "t1_andromede",
      "t1_beauzelle", "t1_aeroconstellation", "t1_meett",
    ]],
  },
];
