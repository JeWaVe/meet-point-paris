import type { LineDefinition } from '../../types';

export type { LineDefinition };

export const lines: LineDefinition[] = [
  {
    id: "A", name: "Métro A", color: "#E31836", type: "metro",
    branches: [[
      "ma_perrache", "ma_ampere", "ma_bellecour", "ma_cordeliers",
      "ma_hotel_de_ville", "ma_foch", "ma_massena", "ma_charpennes",
      "ma_republique", "ma_gratte_ciel", "ma_flachet", "ma_cusset",
      "ma_laurent_bonnevay", "ma_vaulx_en_velin",
    ]],
  },
  {
    id: "B", name: "Métro B", color: "#0070B8", type: "metro",
    branches: [[
      "ma_charpennes", "mb_brotteaux", "mb_part_dieu", "mb_place_guichard",
      "mb_saxe_gambetta", "mb_jean_mace", "mb_place_jean_jaures", "mb_debourg",
      "mb_stade_gerland", "mb_oullins", "mb_oullins_centre", "mb_st_genis_laval",
    ]],
  },
  {
    id: "C", name: "Métro C", color: "#F59C00", type: "metro",
    branches: [[
      "ma_hotel_de_ville", "mc_croix_paquet", "mc_croix_rousse",
      "mc_henon", "mc_cuire",
    ]],
  },
  {
    id: "D", name: "Métro D", color: "#00A84F", type: "metro",
    branches: [[
      "md_gare_de_vaise", "md_valmy", "md_gorge_de_loup", "md_vieux_lyon",
      "ma_bellecour", "md_guillotiere", "mb_saxe_gambetta", "md_garibaldi",
      "md_sans_souci", "md_monplaisir_lumiere", "md_grange_blanche",
      "md_laennec", "md_mermoz_pinel", "md_parilly", "md_gare_venissieux",
    ]],
  },
  {
    id: "F1", name: "Funiculaire F1", color: "#7B2D8E", type: "funicular",
    branches: [["md_vieux_lyon", "f1_minimes", "f1_saint_just"]],
  },
  {
    id: "F2", name: "Funiculaire F2", color: "#7B2D8E", type: "funicular",
    branches: [["md_vieux_lyon", "f2_fourviere"]],
  },
  {
    id: "T1", name: "Tramway T1", color: "#0098D4", type: "tram",
    branches: [[
      "t1_iut_feyssine", "t1_croix_luizet", "t1_insa_einstein",
      "t1_la_doua_gaston_berger", "t1_universite_lyon_1", "t1_condorcet",
      "t1_le_tonkin", "ma_charpennes", "t1_college_bellecombe",
      "t1_thiers_lafayette", "mb_part_dieu", "t1_part_dieu_auditorium",
      "t1_palais_justice", "t1_saxe_prefecture", "t1_liberte",
      "t1_guillotiere", "t1_saint_andre", "t1_rue_universite",
      "t1_quai_claude_bernard", "t1_perrache", "t1_place_archives",
      "t1_sainte_blandine", "t1_hotel_region", "t1_musee_confluences",
      "t1_halle_tony_garnier", "t1_ens_lyon", "mb_debourg",
    ]],
  },
  {
    id: "T2", name: "Tramway T2", color: "#6C1D81", type: "tram",
    branches: [[
      "t2_hotel_de_region", "t2_sainte_blandine", "t2_place_archives",
      "t2_perrache", "t2_centre_berthelot", "t2_jean_mace",
      "t2_garibaldi_berthelot", "t2_route_de_vienne", "t2_jet_eau",
      "t2_villon", "t2_bachut", "t2_jean_xxiii", "md_grange_blanche",
      "t2_ambroise_pare", "t2_desgenettes", "t2_essarts_iris",
      "t2_boutasse", "t2_bron_hotel_de_ville", "t2_les_alizes",
      "t2_rebufer", "t2_parilly", "t2_europe_universite",
      "t2_porte_des_alpes", "t2_parc_techno", "t2_hauts_de_feuilly",
      "t2_salvador_allende", "t2_alfred_de_vigny", "t2_st_priest_hdv",
      "t2_esplanade_arts", "t2_jules_ferry", "t2_cordiere",
      "t2_st_priest_bel_air",
    ]],
  },
  {
    id: "T3", name: "Tramway T3", color: "#E4583E", type: "tram",
    branches: [[
      "mb_part_dieu", "t3_dauphine_lacassagne", "t3_reconnaissance_balzac",
      "t3_gare_villeurbanne", "t3_bel_air_les_brosses", "ma_vaulx_en_velin",
      "t3_decines_roosevelt", "t3_decines_centre", "t3_decines_grand_large",
      "t3_meyzieu_gare", "t3_meyzieu_lycee", "t3_meyzieu_zi",
      "t3_meyzieu_panettes",
    ]],
  },
  {
    id: "T4", name: "Tramway T4", color: "#F2A100", type: "tram",
    branches: [[
      "t1_la_doua_gaston_berger", "t1_universite_lyon_1", "t1_condorcet",
      "t1_le_tonkin", "ma_charpennes", "t1_college_bellecombe",
      "t1_thiers_lafayette", "mb_part_dieu", "t4_archives_departementales",
      "t4_manufacture_montluc", "t4_lycee_colbert", "t2_jet_eau",
      "t4_lycee_lumiere", "t4_etats_unis_tony_garnier", "t4_beauvisage_cisl",
      "t4_etats_unis_viviani", "t4_joliot_curie", "t4_la_borelle",
      "md_gare_venissieux", "t4_croizat_paul_bert", "t4_marcel_houel",
      "t4_lycee_jacques_brel", "t4_herriot_cagne", "t4_venissy_frida_kahlo",
      "t4_division_leclerc", "t4_maurice_thorez", "t4_lenine_corsiere",
      "t4_darnaise", "t4_hopital_feyzin",
    ]],
  },
  {
    id: "T5", name: "Tramway T5", color: "#4DBFB8", type: "tram",
    branches: [[
      "md_grange_blanche", "t5_ambroise_pare", "t2_desgenettes",
      "t2_essarts_iris", "t2_boutasse", "t2_bron_hotel_de_ville",
      "t2_les_alizes", "t5_de_tassigny_curial", "t5_lycee_jp_sartre",
      "t5_parc_du_chene", "t5_chassieu_zac", "t5_eurexpo",
    ]],
  },
  {
    id: "T6", name: "Tramway T6", color: "#83D0F5", type: "tram",
    branches: [[
      "mb_debourg", "t6_challemel_lacour", "t6_moulin_a_vent",
      "t6_petite_guille", "t6_beauvisage_pressense", "t6_beauvisage_cisl",
      "t6_grange_rouge_santy", "t6_mermoz_californie", "t6_mermoz_moselle",
      "t6_mermoz_pinel", "t6_essarts_laennec", "t2_desgenettes",
      "t6_vinatier", "t6_hopitaux_est", "t6_kimmerling",
      "t3_gare_villeurbanne", "t6_grandclement", "t6_saint_exupery_jaures",
      "t6_verlaine_tolstoi", "t6_hotel_de_ville_tnp", "t6_gratte_ciel",
      "t6_genevieve_de_gaulle", "t6_roger_planchon", "t1_la_doua_gaston_berger",
    ]],
  },
  {
    id: "T7", name: "Tramway T7", color: "#A0006E", type: "tram",
    branches: [[
      "ma_vaulx_en_velin", "t3_decines_roosevelt", "t3_decines_centre",
      "t3_decines_grand_large", "t7_ol_vallee",
    ]],
  },
];
