import type { Station, Connection } from '../../types';

export type { Station, Connection };

export const stations: Station[] = [
  // === METRO LIGNE A ===
  { id: "ma_perrache", name: "Perrache", lat: 45.7496, lng: 4.8268, lines: ["A"] },
  { id: "ma_ampere", name: "Ampère - Victor Hugo", lat: 45.7520, lng: 4.8321, lines: ["A"] },
  { id: "ma_bellecour", name: "Bellecour", lat: 45.7574, lng: 4.8335, lines: ["A", "D"] },
  { id: "ma_cordeliers", name: "Cordeliers", lat: 45.7633, lng: 4.8359, lines: ["A"] },
  { id: "ma_hotel_de_ville", name: "Hôtel de Ville - Louis Pradel", lat: 45.7675, lng: 4.8361, lines: ["A", "C"] },
  { id: "ma_foch", name: "Foch", lat: 45.7687, lng: 4.8441, lines: ["A"] },
  { id: "ma_massena", name: "Masséna", lat: 45.7693, lng: 4.8534, lines: ["A"] },
  { id: "ma_charpennes", name: "Charpennes - Charles Hernu", lat: 45.7710, lng: 4.8631, lines: ["A", "B", "T1", "T4", "T6"] },
  { id: "ma_republique", name: "République - Villeurbanne", lat: 45.7672, lng: 4.8721, lines: ["A"] },
  { id: "ma_gratte_ciel", name: "Gratte-Ciel", lat: 45.7668, lng: 4.8802, lines: ["A"] },
  { id: "ma_flachet", name: "Flachet - Alain Gilles", lat: 45.7666, lng: 4.8899, lines: ["A"] },
  { id: "ma_cusset", name: "Cusset", lat: 45.7662, lng: 4.8987, lines: ["A"] },
  { id: "ma_laurent_bonnevay", name: "Laurent Bonnevay - Astroballe", lat: 45.7655, lng: 4.9078, lines: ["A"] },
  { id: "ma_vaulx_en_velin", name: "Vaulx-en-Velin La Soie", lat: 45.7611, lng: 4.9221, lines: ["A", "T3", "T7"] },

  // === METRO LIGNE B ===
  // Charpennes: shared with Ligne A (ma_charpennes)
  { id: "mb_brotteaux", name: "Brotteaux", lat: 45.7670, lng: 4.8594, lines: ["B"] },
  { id: "mb_part_dieu", name: "Gare Part-Dieu - Vivier Merle", lat: 45.7616, lng: 4.8579, lines: ["B", "T1", "T3", "T4"] },
  { id: "mb_place_guichard", name: "Place Guichard - Bourse du Travail", lat: 45.7583, lng: 4.8471, lines: ["B"] },
  { id: "mb_saxe_gambetta", name: "Saxe - Gambetta", lat: 45.7537, lng: 4.8468, lines: ["B", "D"] },
  { id: "mb_jean_mace", name: "Jean Macé", lat: 45.7462, lng: 4.8425, lines: ["B"] },
  { id: "mb_place_jean_jaures", name: "Place Jean Jaurès", lat: 45.7383, lng: 4.8399, lines: ["B"] },
  { id: "mb_debourg", name: "Debourg", lat: 45.7312, lng: 4.8346, lines: ["B", "T1", "T6"] },
  { id: "mb_stade_gerland", name: "Stade de Gerland", lat: 45.7274, lng: 4.8312, lines: ["B"] },
  { id: "mb_oullins", name: "Gare d'Oullins", lat: 45.7167, lng: 4.8145, lines: ["B"] },
  { id: "mb_oullins_centre", name: "Oullins Centre", lat: 45.7143, lng: 4.8052, lines: ["B"] },
  { id: "mb_st_genis_laval", name: "Saint-Genis-Laval - Hôpital Lyon Sud", lat: 45.7015, lng: 4.8041, lines: ["B"] },

  // === METRO LIGNE C ===
  // Hôtel de Ville: shared with Ligne A (ma_hotel_de_ville)
  { id: "mc_croix_paquet", name: "Croix-Paquet", lat: 45.7764, lng: 4.8429, lines: ["C"] },
  { id: "mc_croix_rousse", name: "Croix-Rousse", lat: 45.7800, lng: 4.8387, lines: ["C"] },
  { id: "mc_henon", name: "Hénon", lat: 45.7847, lng: 4.8341, lines: ["C"] },
  { id: "mc_cuire", name: "Cuire", lat: 45.7908, lng: 4.8395, lines: ["C"] },

  // === METRO LIGNE D ===
  { id: "md_gare_de_vaise", name: "Gare de Vaise", lat: 45.7801, lng: 4.8038, lines: ["D"] },
  { id: "md_valmy", name: "Valmy", lat: 45.7747, lng: 4.8054, lines: ["D"] },
  { id: "md_gorge_de_loup", name: "Gorge de Loup", lat: 45.7664, lng: 4.8054, lines: ["D"] },
  { id: "md_vieux_lyon", name: "Vieux Lyon - Cathédrale Saint-Jean", lat: 45.7601, lng: 4.8259, lines: ["D", "F1", "F2"] },
  // Bellecour: shared with Ligne A (ma_bellecour)
  { id: "md_guillotiere", name: "Guillotière", lat: 45.7554, lng: 4.8426, lines: ["D"] },
  // Saxe-Gambetta: shared with Ligne B (mb_saxe_gambetta)
  { id: "md_garibaldi", name: "Garibaldi", lat: 45.7517, lng: 4.8535, lines: ["D"] },
  { id: "md_sans_souci", name: "Sans Souci", lat: 45.7476, lng: 4.8651, lines: ["D"] },
  { id: "md_monplaisir_lumiere", name: "Monplaisir - Lumière", lat: 45.7455, lng: 4.8714, lines: ["D"] },
  { id: "md_grange_blanche", name: "Grange Blanche", lat: 45.7424, lng: 4.8796, lines: ["D", "T2", "T5"] },
  { id: "md_laennec", name: "Laënnec", lat: 45.7384, lng: 4.8866, lines: ["D"] },
  { id: "md_mermoz_pinel", name: "Mermoz - Pinel", lat: 45.7306, lng: 4.8873, lines: ["D"] },
  { id: "md_parilly", name: "Parilly", lat: 45.7195, lng: 4.8875, lines: ["D"] },
  { id: "md_gare_venissieux", name: "Gare de Vénissieux", lat: 45.7057, lng: 4.8878, lines: ["D", "T4"] },

  // === FUNICULAIRE F1 (Vieux Lyon → Saint-Just) ===
  // Vieux Lyon: shared with Ligne D (md_vieux_lyon)
  { id: "f1_minimes", name: "Minimes - Théâtres Romains", lat: 45.7586, lng: 4.8213, lines: ["F1"] },
  { id: "f1_saint_just", name: "Saint-Just", lat: 45.7571, lng: 4.8163, lines: ["F1"] },

  // === FUNICULAIRE F2 (Vieux Lyon → Fourvière) ===
  // Vieux Lyon: shared with Ligne D (md_vieux_lyon)
  { id: "f2_fourviere", name: "Fourvière", lat: 45.7624, lng: 4.8215, lines: ["F2"] },

  // === TRAMWAY T1 (IUT-Feyssine → Debourg) — 27 stations ===
  { id: "t1_iut_feyssine", name: "IUT - Feyssine", lat: 45.7869, lng: 4.8819, lines: ["T1"] },
  { id: "t1_croix_luizet", name: "Croix-Luizet", lat: 45.7837, lng: 4.8833, lines: ["T1"] },
  { id: "t1_insa_einstein", name: "INSA - Einstein", lat: 45.7824, lng: 4.8777, lines: ["T1"] },
  { id: "t1_la_doua_gaston_berger", name: "La Doua - Gaston Berger", lat: 45.7815, lng: 4.8721, lines: ["T1", "T4", "T6"] },
  { id: "t1_universite_lyon_1", name: "Université Lyon 1", lat: 45.7809, lng: 4.8663, lines: ["T1", "T4"] },
  { id: "t1_condorcet", name: "Condorcet", lat: 45.7779, lng: 4.8670, lines: ["T1", "T4"] },
  { id: "t1_le_tonkin", name: "Le Tonkin", lat: 45.7741, lng: 4.8640, lines: ["T1", "T4"] },
  // Charpennes: shared with Metro A (ma_charpennes)
  { id: "t1_college_bellecombe", name: "Collège Bellecombe", lat: 45.7667, lng: 4.8619, lines: ["T1", "T4"] },
  { id: "t1_thiers_lafayette", name: "Thiers - Lafayette", lat: 45.7643, lng: 4.8620, lines: ["T1", "T4"] },
  // Part-Dieu Vivier Merle: shared with Metro B (mb_part_dieu)
  { id: "t1_part_dieu_auditorium", name: "Part-Dieu - Auditorium", lat: 45.7607, lng: 4.8538, lines: ["T1"] },
  { id: "t1_palais_justice", name: "Palais de Justice - Mairie du 3e", lat: 45.7603, lng: 4.8484, lines: ["T1"] },
  { id: "t1_saxe_prefecture", name: "Saxe - Préfecture", lat: 45.7601, lng: 4.8453, lines: ["T1"] },
  { id: "t1_liberte", name: "Liberté", lat: 45.7589, lng: 4.8425, lines: ["T1"] },
  { id: "t1_guillotiere", name: "Guillotière", lat: 45.7549, lng: 4.8425, lines: ["T1"] },
  { id: "t1_saint_andre", name: "Saint-André", lat: 45.7529, lng: 4.8411, lines: ["T1"] },
  { id: "t1_rue_universite", name: "Rue de l'Université", lat: 45.7511, lng: 4.8390, lines: ["T1"] },
  { id: "t1_quai_claude_bernard", name: "Quai Claude Bernard", lat: 45.7497, lng: 4.8353, lines: ["T1"] },
  { id: "t1_perrache", name: "Perrache", lat: 45.7495, lng: 4.8270, lines: ["T1"] },
  { id: "t1_place_archives", name: "Place des Archives", lat: 45.7471, lng: 4.8246, lines: ["T1"] },
  { id: "t1_sainte_blandine", name: "Sainte-Blandine", lat: 45.7442, lng: 4.8221, lines: ["T1"] },
  { id: "t1_hotel_region", name: "Hôtel de Région - Montrochet", lat: 45.7406, lng: 4.8190, lines: ["T1"] },
  { id: "t1_musee_confluences", name: "Musée des Confluences", lat: 45.7337, lng: 4.8189, lines: ["T1"] },
  { id: "t1_halle_tony_garnier", name: "Halle Tony Garnier", lat: 45.7317, lng: 4.8228, lines: ["T1"] },
  { id: "t1_ens_lyon", name: "ENS Lyon", lat: 45.7314, lng: 4.8288, lines: ["T1"] },
  // Debourg: shared with Metro B (mb_debourg)

  // === TRAMWAY T2 (Hôtel de Région Montrochet → Saint-Priest Bel Air) — 32 stations ===
  { id: "t2_hotel_de_region", name: "Hôtel de Région - Montrochet", lat: 45.7406, lng: 4.8190, lines: ["T2"] },
  { id: "t2_sainte_blandine", name: "Sainte-Blandine", lat: 45.7442, lng: 4.8221, lines: ["T2"] },
  { id: "t2_place_archives", name: "Place des Archives", lat: 45.7471, lng: 4.8246, lines: ["T2"] },
  { id: "t2_perrache", name: "Perrache", lat: 45.7495, lng: 4.8270, lines: ["T2"] },
  { id: "t2_centre_berthelot", name: "Centre Berthelot - Sciences Po Lyon", lat: 45.7470, lng: 4.8363, lines: ["T2"] },
  { id: "t2_jean_mace", name: "Jean Macé", lat: 45.7451, lng: 4.8423, lines: ["T2"] },
  { id: "t2_garibaldi_berthelot", name: "Garibaldi - Berthelot", lat: 45.7437, lng: 4.8469, lines: ["T2"] },
  { id: "t2_route_de_vienne", name: "Route de Vienne", lat: 45.7421, lng: 4.8518, lines: ["T2"] },
  { id: "t2_jet_eau", name: "Jet d'Eau - Mendès France", lat: 45.7399, lng: 4.8588, lines: ["T2", "T4"] },
  { id: "t2_villon", name: "Villon", lat: 45.7384, lng: 4.8633, lines: ["T2"] },
  { id: "t2_bachut", name: "Bachut - Mairie du 8e", lat: 45.7368, lng: 4.8683, lines: ["T2"] },
  { id: "t2_jean_xxiii", name: "Jean XXIII - Maryse Bastié", lat: 45.7402, lng: 4.8746, lines: ["T2"] },
  // Grange Blanche: shared with Metro D (md_grange_blanche)
  { id: "t2_ambroise_pare", name: "Ambroise Paré", lat: 45.7415, lng: 4.8840, lines: ["T2"] },
  { id: "t2_desgenettes", name: "Desgenettes", lat: 45.7388, lng: 4.8932, lines: ["T2", "T5", "T6"] },
  { id: "t2_essarts_iris", name: "Essarts - Iris", lat: 45.7372, lng: 4.8982, lines: ["T2", "T5"] },
  { id: "t2_boutasse", name: "Boutasse - Camille Rousset", lat: 45.7349, lng: 4.9045, lines: ["T2", "T5"] },
  { id: "t2_bron_hotel_de_ville", name: "Hôtel de Ville - Bron", lat: 45.7334, lng: 4.9091, lines: ["T2", "T5"] },
  { id: "t2_les_alizes", name: "Les Alizés", lat: 45.7315, lng: 4.9147, lines: ["T2", "T5"] },
  { id: "t2_rebufer", name: "Rebufer", lat: 45.7275, lng: 4.9156, lines: ["T2"] },
  { id: "t2_parilly", name: "Parilly - Université - Hippodrome", lat: 45.7221, lng: 4.9152, lines: ["T2"] },
  { id: "t2_europe_universite", name: "Europe - Université", lat: 45.7196, lng: 4.9182, lines: ["T2"] },
  { id: "t2_porte_des_alpes", name: "Porte des Alpes", lat: 45.7184, lng: 4.9258, lines: ["T2"] },
  { id: "t2_parc_techno", name: "Parc Technologique", lat: 45.7144, lng: 4.9313, lines: ["T2"] },
  { id: "t2_hauts_de_feuilly", name: "Hauts de Feuilly", lat: 45.7081, lng: 4.9376, lines: ["T2"] },
  { id: "t2_salvador_allende", name: "Salvador Allende", lat: 45.7034, lng: 4.9349, lines: ["T2"] },
  { id: "t2_alfred_de_vigny", name: "Alfred de Vigny", lat: 45.6996, lng: 4.9361, lines: ["T2"] },
  { id: "t2_st_priest_hdv", name: "Saint-Priest - Hôtel de Ville", lat: 45.6950, lng: 4.9369, lines: ["T2"] },
  { id: "t2_esplanade_arts", name: "Esplanade des Arts", lat: 45.6945, lng: 4.9406, lines: ["T2"] },
  { id: "t2_jules_ferry", name: "Saint-Priest - Jules Ferry", lat: 45.6947, lng: 4.9469, lines: ["T2"] },
  { id: "t2_cordiere", name: "Cordière", lat: 45.6937, lng: 4.9497, lines: ["T2"] },
  { id: "t2_st_priest_bel_air", name: "Saint-Priest Bel Air", lat: 45.6926, lng: 4.9558, lines: ["T2"] },

  // === TRAMWAY T3 (Gare Part-Dieu Villette → Meyzieu les Panettes) — 13 stations ===
  // Part-Dieu Villette: shared with Metro B (mb_part_dieu)
  { id: "t3_dauphine_lacassagne", name: "Dauphiné - Lacassagne", lat: 45.7530, lng: 4.8688, lines: ["T3"] },
  { id: "t3_reconnaissance_balzac", name: "Reconnaissance - Balzac", lat: 45.7545, lng: 4.8850, lines: ["T3"] },
  { id: "t3_gare_villeurbanne", name: "Gare de Villeurbanne", lat: 45.7559, lng: 4.8918, lines: ["T3", "T6"] },
  { id: "t3_bel_air_les_brosses", name: "Bel Air - Les Brosses", lat: 45.7584, lng: 4.9105, lines: ["T3"] },
  // Vaulx-en-Velin La Soie: shared with Metro A (ma_vaulx_en_velin)
  { id: "t3_decines_roosevelt", name: "Décines Roosevelt", lat: 45.7649, lng: 4.9376, lines: ["T3", "T7"] },
  { id: "t3_decines_centre", name: "Décines Centre", lat: 45.7718, lng: 4.9559, lines: ["T3", "T7"] },
  { id: "t3_decines_grand_large", name: "Décines Grand Large", lat: 45.7747, lng: 4.9760, lines: ["T3", "T7"] },
  { id: "t3_meyzieu_gare", name: "Meyzieu Gare", lat: 45.7717, lng: 4.9988, lines: ["T3"] },
  { id: "t3_meyzieu_lycee", name: "Meyzieu Lycée Colonel Beltrame", lat: 45.7699, lng: 5.0131, lines: ["T3"] },
  { id: "t3_meyzieu_zi", name: "Meyzieu Z.I.", lat: 45.7677, lng: 5.0317, lines: ["T3"] },
  { id: "t3_meyzieu_panettes", name: "Meyzieu les Panettes", lat: 45.7662, lng: 5.0350, lines: ["T3"] },

  // === TRAMWAY T4 (La Doua Gaston Berger → Hôpital Feyzin Vénissieux) — 29 stations ===
  // La Doua - Gaston Berger: shared with T1 (t1_la_doua_gaston_berger)
  // Université Lyon 1: shared with T1 (t1_universite_lyon_1)
  // Condorcet: shared with T1 (t1_condorcet)
  // Le Tonkin: shared with T1 (t1_le_tonkin)
  // Charpennes: shared with Metro A (ma_charpennes)
  // Collège Bellecombe: shared with T1 (t1_college_bellecombe)
  // Thiers-Lafayette: shared with T1 (t1_thiers_lafayette)
  // Part-Dieu Villette: shared with Metro B (mb_part_dieu)
  { id: "t4_archives_departementales", name: "Archives Départementales", lat: 45.7544, lng: 4.8618, lines: ["T4"] },
  { id: "t4_manufacture_montluc", name: "Manufacture Montluc", lat: 45.7501, lng: 4.8603, lines: ["T4"] },
  { id: "t4_lycee_colbert", name: "Lycée Colbert", lat: 45.7457, lng: 4.8591, lines: ["T4"] },
  // Jet d'eau: shared with T2 (t2_jet_eau)
  { id: "t4_lycee_lumiere", name: "Lycée Lumière", lat: 45.7369, lng: 4.8618, lines: ["T4"] },
  { id: "t4_etats_unis_tony_garnier", name: "États-Unis - Musée Tony Garnier", lat: 45.7330, lng: 4.8648, lines: ["T4"] },
  { id: "t4_beauvisage_cisl", name: "Beauvisage - C.I.S.L.", lat: 45.7298, lng: 4.8673, lines: ["T4"] },
  { id: "t4_etats_unis_viviani", name: "États-Unis Viviani", lat: 45.7249, lng: 4.8711, lines: ["T4"] },
  { id: "t4_joliot_curie", name: "Joliot Curie - Marcel Sembat", lat: 45.7155, lng: 4.8784, lines: ["T4"] },
  { id: "t4_la_borelle", name: "La Borelle", lat: 45.7112, lng: 4.8821, lines: ["T4"] },
  // Gare de Vénissieux: shared with Metro D (md_gare_venissieux)
  { id: "t4_croizat_paul_bert", name: "Croizat - Paul Bert", lat: 45.7000, lng: 4.8876, lines: ["T4"] },
  { id: "t4_marcel_houel", name: "Marcel Houël - Hôtel de Ville", lat: 45.6965, lng: 4.8845, lines: ["T4"] },
  { id: "t4_lycee_jacques_brel", name: "Lycée Jacques Brel", lat: 45.6949, lng: 4.8799, lines: ["T4"] },
  { id: "t4_herriot_cagne", name: "Herriot - Cagne", lat: 45.6938, lng: 4.8754, lines: ["T4"] },
  { id: "t4_venissy_frida_kahlo", name: "Vénissy - Frida Kahlo", lat: 45.6960, lng: 4.8719, lines: ["T4"] },
  { id: "t4_division_leclerc", name: "Division Leclerc", lat: 45.6984, lng: 4.8682, lines: ["T4"] },
  { id: "t4_maurice_thorez", name: "Maurice Thorez", lat: 45.6998, lng: 4.8633, lines: ["T4"] },
  { id: "t4_lenine_corsiere", name: "Lénine - Corsière", lat: 45.6968, lng: 4.8618, lines: ["T4"] },
  { id: "t4_darnaise", name: "Darnaise", lat: 45.6927, lng: 4.8643, lines: ["T4"] },
  { id: "t4_hopital_feyzin", name: "Hôpital Feyzin Vénissieux", lat: 45.6883, lng: 4.8652, lines: ["T4"] },

  // === TRAMWAY T5 (Grange Blanche → Eurexpo) — 12 stations ===
  // Grange Blanche: shared with Metro D (md_grange_blanche)
  { id: "t5_ambroise_pare", name: "Ambroise Paré", lat: 45.7415, lng: 4.8840, lines: ["T5"] },
  // Desgenettes: shared with T2 (t2_desgenettes)
  // Essarts-Iris: shared with T2 (t2_essarts_iris)
  // Boutasse: shared with T2 (t2_boutasse)
  // Bron HdV: shared with T2 (t2_bron_hotel_de_ville)
  // Les Alizés: shared with T2 (t2_les_alizes)
  { id: "t5_de_tassigny_curial", name: "De Tassigny - Curial", lat: 45.7358, lng: 4.9170, lines: ["T5"] },
  { id: "t5_lycee_jp_sartre", name: "Lycée Jean-Paul Sartre", lat: 45.7380, lng: 4.9222, lines: ["T5"] },
  { id: "t5_parc_du_chene", name: "Parc du Chêne", lat: 45.7390, lng: 4.9266, lines: ["T5"] },
  { id: "t5_chassieu_zac", name: "Chassieu - ZAC du Chêne", lat: 45.7394, lng: 4.9347, lines: ["T5"] },
  { id: "t5_eurexpo", name: "Eurexpo", lat: 45.7319, lng: 4.9480, lines: ["T5"] },

  // === TRAMWAY T6 (Debourg → La Doua Gaston Berger) — 24 stations ===
  // Debourg: shared with Metro B (mb_debourg)
  { id: "t6_challemel_lacour", name: "Challemel Lacour - Artillerie", lat: 45.7297, lng: 4.8436, lines: ["T6"] },
  { id: "t6_moulin_a_vent", name: "Moulin à Vent", lat: 45.7295, lng: 4.8531, lines: ["T6"] },
  { id: "t6_petite_guille", name: "Petite Guille", lat: 45.7310, lng: 4.8588, lines: ["T6"] },
  { id: "t6_beauvisage_pressense", name: "Beauvisage - Pressensé", lat: 45.7277, lng: 4.8627, lines: ["T6"] },
  { id: "t6_beauvisage_cisl", name: "Beauvisage - C.I.S.L.", lat: 45.7295, lng: 4.8673, lines: ["T6"] },
  { id: "t6_grange_rouge_santy", name: "Grange Rouge - Santy", lat: 45.7313, lng: 4.8734, lines: ["T6"] },
  { id: "t6_mermoz_californie", name: "Mermoz - Californie", lat: 45.7331, lng: 4.8785, lines: ["T6"] },
  { id: "t6_mermoz_moselle", name: "Mermoz - Moselle", lat: 45.7322, lng: 4.8824, lines: ["T6"] },
  { id: "t6_mermoz_pinel", name: "Mermoz - Pinel", lat: 45.7308, lng: 4.8868, lines: ["T6"] },
  { id: "t6_essarts_laennec", name: "Essarts - Laennec", lat: 45.7355, lng: 4.8900, lines: ["T6"] },
  // Desgenettes: shared with T2 (t2_desgenettes)
  { id: "t6_vinatier", name: "Vinatier", lat: 45.7425, lng: 4.8941, lines: ["T6"] },
  { id: "t6_hopitaux_est", name: "Hôpitaux Est - Pinel", lat: 45.7475, lng: 4.8967, lines: ["T6"] },
  { id: "t6_kimmerling", name: "Kimmerling - Genêts", lat: 45.7524, lng: 4.8980, lines: ["T6"] },
  // Gare de Villeurbanne: shared with T3 (t3_gare_villeurbanne)
  { id: "t6_grandclement", name: "Grandclément", lat: 45.7591, lng: 4.8883, lines: ["T6"] },
  { id: "t6_saint_exupery_jaures", name: "Saint-Exupéry - Jaurès", lat: 45.7580, lng: 4.8816, lines: ["T6"] },
  { id: "t6_verlaine_tolstoi", name: "Verlaine - Tolstoï", lat: 45.7616, lng: 4.8808, lines: ["T6"] },
  { id: "t6_hotel_de_ville_tnp", name: "Hôtel de Ville - TNP", lat: 45.7659, lng: 4.8803, lines: ["T6"] },
  { id: "t6_gratte_ciel", name: "Gratte-Ciel", lat: 45.7689, lng: 4.8803, lines: ["T6"] },
  { id: "t6_genevieve_de_gaulle", name: "Geneviève De Gaulle", lat: 45.7723, lng: 4.8791, lines: ["T6"] },
  { id: "t6_roger_planchon", name: "Roger Planchon", lat: 45.7764, lng: 4.8771, lines: ["T6"] },
  // La Doua - Gaston Berger: shared with T1 (t1_la_doua_gaston_berger)

  // === TRAMWAY T7 (Vaulx-en-Velin La Soie → Décines OL Vallée) — 5 stations ===
  // Vaulx-en-Velin La Soie: shared with Metro A (ma_vaulx_en_velin)
  // Décines Roosevelt: shared with T3 (t3_decines_roosevelt)
  // Décines Centre: shared with T3 (t3_decines_centre)
  // Décines Grand Large: shared with T3 (t3_decines_grand_large)
  { id: "t7_ol_vallee", name: "Décines - OL Vallée", lat: 45.7688, lng: 4.9819, lines: ["T7"] },
];

// Connections between adjacent stations
function buildLineConnections(): Connection[] {
  const conns: Connection[] = [];

  function addLine(ids: string[], time: number) {
    for (let i = 0; i < ids.length - 1; i++) {
      conns.push({ from: ids[i], to: ids[i + 1], time });
      conns.push({ from: ids[i + 1], to: ids[i], time });
    }
  }

  // Metro A
  addLine([
    "ma_perrache", "ma_ampere", "ma_bellecour", "ma_cordeliers",
    "ma_hotel_de_ville", "ma_foch", "ma_massena", "ma_charpennes",
    "ma_republique", "ma_gratte_ciel", "ma_flachet", "ma_cusset",
    "ma_laurent_bonnevay", "ma_vaulx_en_velin",
  ], 1.5);

  // Metro B
  addLine([
    "ma_charpennes", "mb_brotteaux", "mb_part_dieu", "mb_place_guichard",
    "mb_saxe_gambetta", "mb_jean_mace", "mb_place_jean_jaures", "mb_debourg",
    "mb_stade_gerland", "mb_oullins", "mb_oullins_centre", "mb_st_genis_laval",
  ], 1.5);

  // Metro C
  addLine([
    "ma_hotel_de_ville", "mc_croix_paquet", "mc_croix_rousse",
    "mc_henon", "mc_cuire",
  ], 1.5);

  // Metro D
  addLine([
    "md_gare_de_vaise", "md_valmy", "md_gorge_de_loup", "md_vieux_lyon",
    "ma_bellecour", "md_guillotiere", "mb_saxe_gambetta", "md_garibaldi",
    "md_sans_souci", "md_monplaisir_lumiere", "md_grange_blanche",
    "md_laennec", "md_mermoz_pinel", "md_parilly", "md_gare_venissieux",
  ], 1.5);

  // Funicular F1 (Vieux Lyon → Saint-Just)
  addLine(["md_vieux_lyon", "f1_minimes", "f1_saint_just"], 2);

  // Funicular F2 (Vieux Lyon → Fourvière)
  addLine(["md_vieux_lyon", "f2_fourviere"], 2);

  // Tram T1 (IUT-Feyssine → Debourg)
  addLine([
    "t1_iut_feyssine", "t1_croix_luizet", "t1_insa_einstein",
    "t1_la_doua_gaston_berger", "t1_universite_lyon_1", "t1_condorcet",
    "t1_le_tonkin", "ma_charpennes", "t1_college_bellecombe",
    "t1_thiers_lafayette", "mb_part_dieu", "t1_part_dieu_auditorium",
    "t1_palais_justice", "t1_saxe_prefecture", "t1_liberte",
    "t1_guillotiere", "t1_saint_andre", "t1_rue_universite",
    "t1_quai_claude_bernard", "t1_perrache", "t1_place_archives",
    "t1_sainte_blandine", "t1_hotel_region", "t1_musee_confluences",
    "t1_halle_tony_garnier", "t1_ens_lyon", "mb_debourg",
  ], 2);

  // Tram T2 (Hôtel de Région Montrochet → Saint-Priest Bel Air)
  addLine([
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
  ], 2);

  // Tram T3 (Gare Part-Dieu Villette → Meyzieu les Panettes)
  addLine([
    "mb_part_dieu", "t3_dauphine_lacassagne", "t3_reconnaissance_balzac",
    "t3_gare_villeurbanne", "t3_bel_air_les_brosses", "ma_vaulx_en_velin",
    "t3_decines_roosevelt", "t3_decines_centre", "t3_decines_grand_large",
    "t3_meyzieu_gare", "t3_meyzieu_lycee", "t3_meyzieu_zi",
    "t3_meyzieu_panettes",
  ], 2);

  // Tram T4 (La Doua Gaston Berger → Hôpital Feyzin Vénissieux)
  addLine([
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
  ], 2);

  // Tram T5 (Grange Blanche → Eurexpo)
  addLine([
    "md_grange_blanche", "t5_ambroise_pare", "t2_desgenettes",
    "t2_essarts_iris", "t2_boutasse", "t2_bron_hotel_de_ville",
    "t2_les_alizes", "t5_de_tassigny_curial", "t5_lycee_jp_sartre",
    "t5_parc_du_chene", "t5_chassieu_zac", "t5_eurexpo",
  ], 2);

  // Tram T6 (Debourg → La Doua Gaston Berger)
  addLine([
    "mb_debourg", "t6_challemel_lacour", "t6_moulin_a_vent",
    "t6_petite_guille", "t6_beauvisage_pressense", "t6_beauvisage_cisl",
    "t6_grange_rouge_santy", "t6_mermoz_californie", "t6_mermoz_moselle",
    "t6_mermoz_pinel", "t6_essarts_laennec", "t2_desgenettes",
    "t6_vinatier", "t6_hopitaux_est", "t6_kimmerling",
    "t3_gare_villeurbanne", "t6_grandclement", "t6_saint_exupery_jaures",
    "t6_verlaine_tolstoi", "t6_hotel_de_ville_tnp", "t6_gratte_ciel",
    "t6_genevieve_de_gaulle", "t6_roger_planchon", "t1_la_doua_gaston_berger",
  ], 2);

  // Tram T7 (Vaulx-en-Velin La Soie → Décines OL Vallée)
  addLine([
    "ma_vaulx_en_velin", "t3_decines_roosevelt", "t3_decines_centre",
    "t3_decines_grand_large", "t7_ol_vallee",
  ], 2);

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
