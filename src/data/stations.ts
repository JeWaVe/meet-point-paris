export interface Station {
  id: string;
  name: string;
  lat: number;
  lng: number;
  lines: string[];
}

export interface Connection {
  from: string;
  to: string;
  time: number; // minutes
}

export const stations: Station[] = [
  // === METRO LINE 1 ===
  { id: "m1_la_defense", name: "La Défense", lat: 48.8919, lng: 2.2380, lines: ["1", "RER A"] },
  { id: "m1_esplanade", name: "Esplanade de La Défense", lat: 48.8876, lng: 2.2498, lines: ["1"] },
  { id: "m1_pont_neuilly", name: "Pont de Neuilly", lat: 48.8848, lng: 2.2590, lines: ["1"] },
  { id: "m1_sablons", name: "Les Sablons", lat: 48.8811, lng: 2.2718, lines: ["1"] },
  { id: "m1_maillot", name: "Porte Maillot", lat: 48.8777, lng: 2.2827, lines: ["1"] },
  { id: "m1_argentine", name: "Argentine", lat: 48.8759, lng: 2.2893, lines: ["1"] },
  { id: "m1_cdg_etoile", name: "Charles de Gaulle - Étoile", lat: 48.8738, lng: 2.2950, lines: ["1", "2", "6", "RER A"] },
  { id: "m1_george_v", name: "George V", lat: 48.8720, lng: 2.3008, lines: ["1"] },
  { id: "m1_franklin", name: "Franklin D. Roosevelt", lat: 48.8688, lng: 2.3097, lines: ["1", "9"] },
  { id: "m1_champs_elysees", name: "Champs-Élysées - Clemenceau", lat: 48.8673, lng: 2.3140, lines: ["1", "13"] },
  { id: "m1_concorde", name: "Concorde", lat: 48.8656, lng: 2.3211, lines: ["1", "8", "12"] },
  { id: "m1_tuileries", name: "Tuileries", lat: 48.8644, lng: 2.3297, lines: ["1"] },
  { id: "m1_palais_royal", name: "Palais Royal - Musée du Louvre", lat: 48.8621, lng: 2.3365, lines: ["1", "7"] },
  { id: "m1_louvre", name: "Louvre - Rivoli", lat: 48.8607, lng: 2.3408, lines: ["1"] },
  { id: "m1_chatelet", name: "Châtelet", lat: 48.8584, lng: 2.3474, lines: ["1", "4", "7", "11", "14", "RER A", "RER B", "RER D"] },
  { id: "m1_hotel_ville", name: "Hôtel de Ville", lat: 48.8572, lng: 2.3516, lines: ["1", "11"] },
  { id: "m1_st_paul", name: "Saint-Paul", lat: 48.8553, lng: 2.3613, lines: ["1"] },
  { id: "m1_bastille", name: "Bastille", lat: 48.8531, lng: 2.3690, lines: ["1", "5", "8"] },
  { id: "m1_gare_lyon", name: "Gare de Lyon", lat: 48.8448, lng: 2.3735, lines: ["1", "14", "RER A", "RER D"] },
  { id: "m1_reuilly", name: "Reuilly - Diderot", lat: 48.8471, lng: 2.3862, lines: ["1", "8"] },
  { id: "m1_nation", name: "Nation", lat: 48.8483, lng: 2.3960, lines: ["1", "2", "6", "9", "RER A"] },
  { id: "m1_vincennes", name: "Porte de Vincennes", lat: 48.8472, lng: 2.4108, lines: ["1"] },
  { id: "m1_berault", name: "Bérault", lat: 48.8454, lng: 2.4282, lines: ["1"] },
  { id: "m1_chateau_vincennes", name: "Château de Vincennes", lat: 48.8443, lng: 2.4401, lines: ["1"] },

  // === METRO LINE 2 ===
  { id: "m2_porte_dauphine", name: "Porte Dauphine", lat: 48.8714, lng: 2.2770, lines: ["2"] },
  { id: "m2_victor_hugo", name: "Victor Hugo", lat: 48.8697, lng: 2.2855, lines: ["2"] },
  { id: "m2_ternes", name: "Ternes", lat: 48.8782, lng: 2.2983, lines: ["2"] },
  { id: "m2_courcelles", name: "Courcelles", lat: 48.8791, lng: 2.3056, lines: ["2"] },
  { id: "m2_monceau", name: "Monceau", lat: 48.8802, lng: 2.3094, lines: ["2"] },
  { id: "m2_villiers", name: "Villiers", lat: 48.8813, lng: 2.3155, lines: ["2", "3"] },
  { id: "m2_rome", name: "Rome", lat: 48.8822, lng: 2.3218, lines: ["2"] },
  { id: "m2_place_clichy", name: "Place de Clichy", lat: 48.8835, lng: 2.3274, lines: ["2", "13"] },
  { id: "m2_blanche", name: "Blanche", lat: 48.8840, lng: 2.3325, lines: ["2"] },
  { id: "m2_pigalle", name: "Pigalle", lat: 48.8822, lng: 2.3375, lines: ["2", "12"] },
  { id: "m2_anvers", name: "Anvers", lat: 48.8829, lng: 2.3443, lines: ["2"] },
  { id: "m2_barbes", name: "Barbès - Rochechouart", lat: 48.8838, lng: 2.3494, lines: ["2", "4"] },
  { id: "m2_chapelle", name: "La Chapelle", lat: 48.8848, lng: 2.3596, lines: ["2"] },
  { id: "m2_stalingrad", name: "Stalingrad", lat: 48.8842, lng: 2.3687, lines: ["2", "5", "7"] },
  { id: "m2_jaures", name: "Jaurès", lat: 48.8826, lng: 2.3703, lines: ["2", "5", "7bis"] },
  { id: "m2_colonel_fabien", name: "Colonel Fabien", lat: 48.8783, lng: 2.3706, lines: ["2"] },
  { id: "m2_belleville", name: "Belleville", lat: 48.8718, lng: 2.3764, lines: ["2", "11"] },
  { id: "m2_couronnes", name: "Couronnes", lat: 48.8693, lng: 2.3800, lines: ["2"] },
  { id: "m2_menilmontant", name: "Ménilmontant", lat: 48.8668, lng: 2.3832, lines: ["2"] },
  { id: "m2_pere_lachaise", name: "Père Lachaise", lat: 48.8627, lng: 2.3867, lines: ["2", "3"] },
  { id: "m2_philippe_auguste", name: "Philippe Auguste", lat: 48.8583, lng: 2.3895, lines: ["2"] },
  { id: "m2_alexandre_dumas", name: "Alexandre Dumas", lat: 48.8562, lng: 2.3940, lines: ["2"] },
  { id: "m2_avron", name: "Avron", lat: 48.8516, lng: 2.3968, lines: ["2"] },

  // === METRO LINE 3 ===
  { id: "m3_pont_levallois", name: "Pont de Levallois - Bécon", lat: 48.8972, lng: 2.2802, lines: ["3"] },
  { id: "m3_anatole_france", name: "Anatole France", lat: 48.8924, lng: 2.2855, lines: ["3"] },
  { id: "m3_louise_michel", name: "Louise Michel", lat: 48.8891, lng: 2.2890, lines: ["3"] },
  { id: "m3_porte_champerret", name: "Porte de Champerret", lat: 48.8859, lng: 2.2935, lines: ["3"] },
  { id: "m3_pereire", name: "Pereire", lat: 48.8847, lng: 2.2992, lines: ["3"] },
  { id: "m3_wagram", name: "Wagram", lat: 48.8841, lng: 2.3053, lines: ["3"] },
  { id: "m3_malesherbes", name: "Malesherbes", lat: 48.8826, lng: 2.3108, lines: ["3"] },
  { id: "m3_europe", name: "Europe", lat: 48.8789, lng: 2.3218, lines: ["3"] },
  { id: "m3_st_lazare", name: "Saint-Lazare", lat: 48.8758, lng: 2.3257, lines: ["3", "12", "13", "14"] },
  { id: "m3_havre_caumartin", name: "Havre - Caumartin", lat: 48.8735, lng: 2.3279, lines: ["3", "9"] },
  { id: "m3_opera", name: "Opéra", lat: 48.8710, lng: 2.3317, lines: ["3", "7", "8"] },
  { id: "m3_quatre_septembre", name: "Quatre-Septembre", lat: 48.8696, lng: 2.3364, lines: ["3"] },
  { id: "m3_bourse", name: "Bourse", lat: 48.8685, lng: 2.3408, lines: ["3"] },
  { id: "m3_sentier", name: "Sentier", lat: 48.8672, lng: 2.3470, lines: ["3"] },
  { id: "m3_reaumur", name: "Réaumur - Sébastopol", lat: 48.8662, lng: 2.3520, lines: ["3", "4"] },
  { id: "m3_arts_metiers", name: "Arts et Métiers", lat: 48.8654, lng: 2.3563, lines: ["3", "11"] },
  { id: "m3_temple", name: "Temple", lat: 48.8663, lng: 2.3611, lines: ["3"] },
  { id: "m3_republique", name: "République", lat: 48.8674, lng: 2.3637, lines: ["3", "5", "8", "9", "11"] },
  { id: "m3_parmentier", name: "Parmentier", lat: 48.8653, lng: 2.3745, lines: ["3"] },
  { id: "m3_rue_st_maur", name: "Rue Saint-Maur", lat: 48.8640, lng: 2.3808, lines: ["3"] },
  { id: "m3_gambetta", name: "Gambetta", lat: 48.8649, lng: 2.3985, lines: ["3", "3bis"] },
  { id: "m3_porte_bagnolet", name: "Porte de Bagnolet", lat: 48.8640, lng: 2.4097, lines: ["3"] },
  { id: "m3_gallieni", name: "Gallieni", lat: 48.8637, lng: 2.4160, lines: ["3"] },

  // === METRO LINE 3bis ===
  { id: "m3b_pelleport", name: "Pelleport", lat: 48.8686, lng: 2.4013, lines: ["3bis"] },
  { id: "m3b_saint_fargeau", name: "Saint-Fargeau", lat: 48.8713, lng: 2.4043, lines: ["3bis"] },
  { id: "m11_porte_lilas", name: "Porte des Lilas", lat: 48.8770, lng: 2.4068, lines: ["11", "3bis"] },

  // === METRO LINE 4 ===
  { id: "m4_porte_clignancourt", name: "Porte de Clignancourt", lat: 48.8975, lng: 2.3449, lines: ["4"] },
  { id: "m4_simplon", name: "Simplon", lat: 48.8939, lng: 2.3478, lines: ["4"] },
  { id: "m4_marcadet", name: "Marcadet - Poissonniers", lat: 48.8912, lng: 2.3494, lines: ["4", "12"] },
  { id: "m4_chateau_rouge", name: "Château Rouge", lat: 48.8869, lng: 2.3497, lines: ["4"] },
  { id: "m4_gare_nord", name: "Gare du Nord", lat: 48.8799, lng: 2.3553, lines: ["4", "5", "RER B", "RER D", "RER E"] },
  { id: "m4_gare_est", name: "Gare de l'Est", lat: 48.8762, lng: 2.3587, lines: ["4", "5", "7"] },
  { id: "m4_strasbourg_st_denis", name: "Strasbourg - Saint-Denis", lat: 48.8693, lng: 2.3543, lines: ["4", "8", "9"] },
  { id: "m4_etienne_marcel", name: "Étienne Marcel", lat: 48.8636, lng: 2.3488, lines: ["4"] },
  { id: "m4_les_halles", name: "Les Halles", lat: 48.8622, lng: 2.3455, lines: ["4", "RER A", "RER B", "RER D"] },
  { id: "m4_cite", name: "Cité", lat: 48.8553, lng: 2.3463, lines: ["4"] },
  { id: "m4_st_michel", name: "Saint-Michel", lat: 48.8534, lng: 2.3438, lines: ["4", "RER B", "RER C"] },
  { id: "m4_odeon", name: "Odéon", lat: 48.8494, lng: 2.3387, lines: ["4", "10"] },
  { id: "m4_st_germain", name: "Saint-Germain-des-Prés", lat: 48.8538, lng: 2.3334, lines: ["4"] },
  { id: "m4_st_sulpice", name: "Saint-Sulpice", lat: 48.8511, lng: 2.3309, lines: ["4"] },
  { id: "m4_st_placide", name: "Saint-Placide", lat: 48.8470, lng: 2.3266, lines: ["4"] },
  { id: "m4_montparnasse", name: "Montparnasse - Bienvenüe", lat: 48.8431, lng: 2.3241, lines: ["4", "6", "12", "13"] },
  { id: "m4_vavin", name: "Vavin", lat: 48.8422, lng: 2.3288, lines: ["4"] },
  { id: "m4_raspail", name: "Raspail", lat: 48.8389, lng: 2.3305, lines: ["4", "6"] },
  { id: "m4_denfert", name: "Denfert-Rochereau", lat: 48.8338, lng: 2.3325, lines: ["4", "6", "RER B"] },
  { id: "m4_mouton_duvernet", name: "Mouton-Duvernet", lat: 48.8316, lng: 2.3300, lines: ["4"] },
  { id: "m4_alesia", name: "Alésia", lat: 48.8283, lng: 2.3270, lines: ["4"] },
  { id: "m4_porte_orleans", name: "Porte d'Orléans", lat: 48.8234, lng: 2.3255, lines: ["4"] },
  { id: "m4_mairie_montrouge", name: "Mairie de Montrouge", lat: 48.8187, lng: 2.3196, lines: ["4"] },
  { id: "m4_bagneux", name: "Bagneux - Lucie Aubrac", lat: 48.8118, lng: 2.3147, lines: ["4"] },

  // === METRO LINE 5 ===
  { id: "m5_bobigny", name: "Bobigny - Pablo Picasso", lat: 48.9064, lng: 2.4498, lines: ["5"] },
  { id: "m5_bobigny_pantin", name: "Bobigny - Pantin - Raymond Queneau", lat: 48.8966, lng: 2.4252, lines: ["5"] },
  { id: "m5_eglise_pantin", name: "Église de Pantin", lat: 48.8935, lng: 2.4122, lines: ["5"] },
  { id: "m5_hoche", name: "Hoche", lat: 48.8908, lng: 2.4032, lines: ["5"] },
  { id: "m5_porte_pantin", name: "Porte de Pantin", lat: 48.8877, lng: 2.3920, lines: ["5"] },
  { id: "m5_ourcq", name: "Ourcq", lat: 48.8864, lng: 2.3858, lines: ["5"] },
  { id: "m5_laumiere", name: "Laumière", lat: 48.8850, lng: 2.3792, lines: ["5"] },
  { id: "m5_jacques_bonsergent", name: "Jacques Bonsergent", lat: 48.8705, lng: 2.3610, lines: ["5"] },
  { id: "m5_oberkampf", name: "Oberkampf", lat: 48.8649, lng: 2.3678, lines: ["5", "9"] },
  { id: "m5_richard_lenoir", name: "Richard-Lenoir", lat: 48.8596, lng: 2.3719, lines: ["5"] },
  { id: "m5_breguet_sabin", name: "Bréguet - Sabin", lat: 48.8565, lng: 2.3709, lines: ["5"] },
  { id: "m5_quai_rapee", name: "Quai de la Rapée", lat: 48.8463, lng: 2.3660, lines: ["5"] },
  { id: "m5_gare_austerlitz", name: "Gare d'Austerlitz", lat: 48.8424, lng: 2.3647, lines: ["5", "10", "RER C"] },
  { id: "m5_st_marcel", name: "Saint-Marcel", lat: 48.8384, lng: 2.3611, lines: ["5"] },
  { id: "m5_campo_formio", name: "Campo-Formio", lat: 48.8356, lng: 2.3586, lines: ["5"] },
  { id: "m5_place_italie", name: "Place d'Italie", lat: 48.8310, lng: 2.3558, lines: ["5", "6", "7"] },

  // === METRO LINE 6 ===
  { id: "m6_kleber", name: "Kléber", lat: 48.8712, lng: 2.2930, lines: ["6"] },
  { id: "m6_boissiere", name: "Boissière", lat: 48.8668, lng: 2.2898, lines: ["6"] },
  { id: "m6_trocadero", name: "Trocadéro", lat: 48.8628, lng: 2.2869, lines: ["6", "9"] },
  { id: "m6_passy", name: "Passy", lat: 48.8578, lng: 2.2860, lines: ["6"] },
  { id: "m6_bir_hakeim", name: "Bir-Hakeim", lat: 48.8543, lng: 2.2895, lines: ["6"] },
  { id: "m6_dupleix", name: "Dupleix", lat: 48.8507, lng: 2.2934, lines: ["6"] },
  { id: "m6_la_motte", name: "La Motte-Picquet - Grenelle", lat: 48.8491, lng: 2.2987, lines: ["6", "8", "10"] },
  { id: "m6_cambronne", name: "Cambronne", lat: 48.8474, lng: 2.3023, lines: ["6"] },
  { id: "m6_sevres_lecourbe", name: "Sèvres - Lecourbe", lat: 48.8451, lng: 2.3086, lines: ["6"] },
  { id: "m6_pasteur", name: "Pasteur", lat: 48.8427, lng: 2.3126, lines: ["6", "12"] },
  { id: "m6_edgar_quinet", name: "Edgar Quinet", lat: 48.8411, lng: 2.3255, lines: ["6"] },
  { id: "m6_st_jacques", name: "Saint-Jacques", lat: 48.8329, lng: 2.3371, lines: ["6"] },
  { id: "m6_glaciere", name: "Glacière", lat: 48.8312, lng: 2.3433, lines: ["6"] },
  { id: "m6_corvisart", name: "Corvisart", lat: 48.8297, lng: 2.3504, lines: ["6"] },
  { id: "m6_nationale", name: "Nationale", lat: 48.8327, lng: 2.3632, lines: ["6"] },
  { id: "m6_chevaleret", name: "Chevaleret", lat: 48.8348, lng: 2.3681, lines: ["6"] },
  { id: "m6_quai_gare", name: "Quai de la Gare", lat: 48.8367, lng: 2.3726, lines: ["6"] },
  { id: "m6_bercy", name: "Bercy", lat: 48.8400, lng: 2.3796, lines: ["6", "14"] },
  { id: "m6_dugommier", name: "Dugommier", lat: 48.8388, lng: 2.3894, lines: ["6"] },
  { id: "m6_daumesnil", name: "Daumesnil", lat: 48.8393, lng: 2.3961, lines: ["6", "8"] },
  { id: "m6_bel_air", name: "Bel-Air", lat: 48.8412, lng: 2.4012, lines: ["6"] },
  { id: "m6_picpus", name: "Picpus", lat: 48.8451, lng: 2.4017, lines: ["6"] },

  // === METRO LINE 7 ===
  { id: "m7_la_courneuve", name: "La Courneuve - 8 Mai 1945", lat: 48.9209, lng: 2.4103, lines: ["7"] },
  { id: "m7_fort_aubervilliers", name: "Fort d'Aubervilliers", lat: 48.9148, lng: 2.4049, lines: ["7"] },
  { id: "m7_aubervilliers", name: "Aubervilliers - Pantin - 4 Chemins", lat: 48.9035, lng: 2.3922, lines: ["7"] },
  { id: "m7_porte_villette", name: "Porte de la Villette", lat: 48.8975, lng: 2.3856, lines: ["7"] },
  { id: "m7_corentin_cariou", name: "Corentin Cariou", lat: 48.8946, lng: 2.3824, lines: ["7"] },
  { id: "m7_riquet", name: "Riquet", lat: 48.8884, lng: 2.3742, lines: ["7"] },
  { id: "m7_louis_blanc", name: "Louis Blanc", lat: 48.8813, lng: 2.3647, lines: ["7", "7bis"] },
  { id: "m7_chateau_landon", name: "Château-Landon", lat: 48.8784, lng: 2.3623, lines: ["7"] },
  { id: "m7_poissonniere", name: "Poissonnière", lat: 48.8770, lng: 2.3489, lines: ["7"] },
  { id: "m7_cadet", name: "Cadet", lat: 48.8750, lng: 2.3440, lines: ["7"] },
  { id: "m7_le_peletier", name: "Le Peletier", lat: 48.8738, lng: 2.3396, lines: ["7"] },
  { id: "m7_chaussee_antin", name: "Chaussée d'Antin - La Fayette", lat: 48.8727, lng: 2.3342, lines: ["7", "9"] },
  { id: "m7_pyramides", name: "Pyramides", lat: 48.8669, lng: 2.3345, lines: ["7", "14"] },
  { id: "m7_pont_neuf", name: "Pont Neuf", lat: 48.8587, lng: 2.3425, lines: ["7"] },
  { id: "m7_pont_marie", name: "Pont Marie", lat: 48.8538, lng: 2.3569, lines: ["7"] },
  { id: "m7_sully", name: "Sully - Morland", lat: 48.8512, lng: 2.3614, lines: ["7"] },
  { id: "m7_jussieu", name: "Jussieu", lat: 48.8462, lng: 2.3550, lines: ["7", "10"] },
  { id: "m7_place_monge", name: "Place Monge", lat: 48.8430, lng: 2.3519, lines: ["7"] },
  { id: "m7_censier", name: "Censier - Daubenton", lat: 48.8404, lng: 2.3511, lines: ["7"] },
  { id: "m7_gobelins", name: "Les Gobelins", lat: 48.8354, lng: 2.3527, lines: ["7"] },
  { id: "m7_tolbiac", name: "Tolbiac", lat: 48.8264, lng: 2.3576, lines: ["7"] },
  { id: "m7_maison_blanche", name: "Maison Blanche", lat: 48.8225, lng: 2.3589, lines: ["7"] },
  { id: "m7_porte_ivry", name: "Porte d'Ivry", lat: 48.8212, lng: 2.3695, lines: ["7"] },
  { id: "m7_porte_italie", name: "Porte d'Italie", lat: 48.8188, lng: 2.3601, lines: ["7"] },
  { id: "m7_kremlin", name: "Le Kremlin-Bicêtre", lat: 48.8101, lng: 2.3620, lines: ["7"] },
  { id: "m7_villejuif_leo", name: "Villejuif - Léo Lagrange", lat: 48.8043, lng: 2.3631, lines: ["7"] },
  { id: "m7_villejuif_aragon", name: "Villejuif - Louis Aragon", lat: 48.7874, lng: 2.3686, lines: ["7"] },
  { id: "m7_villejuif_paul_vaillant", name: "Villejuif - Paul Vaillant-Couturier", lat: 48.7960, lng: 2.3682, lines: ["7"] },
  { id: "m7_pierre_marie_curie", name: "Pierre et Marie Curie", lat: 48.8149, lng: 2.3799, lines: ["7"] },
  { id: "m7_mairie_ivry", name: "Mairie d'Ivry", lat: 48.8105, lng: 2.3843, lines: ["7"] },

  // === METRO LINE 7bis ===
  { id: "m7b_bolivar", name: "Bolivar", lat: 48.8807, lng: 2.3742, lines: ["7bis"] },
  { id: "m7b_buttes_chaumont", name: "Buttes Chaumont", lat: 48.8788, lng: 2.3814, lines: ["7bis"] },
  { id: "m7b_botzaris", name: "Botzaris", lat: 48.8793, lng: 2.3889, lines: ["7bis"] },
  { id: "m7b_danube", name: "Danube", lat: 48.8816, lng: 2.3936, lines: ["7bis"] },
  { id: "m11_place_fetes", name: "Place des Fêtes", lat: 48.8768, lng: 2.3928, lines: ["11", "7bis"] },
  { id: "m7b_pre_st_gervais", name: "Pré-Saint-Gervais", lat: 48.8800, lng: 2.3989, lines: ["7bis"] },

  // === METRO LINE 8 ===
  { id: "m8_balard", name: "Balard", lat: 48.8363, lng: 2.2784, lines: ["8"] },
  { id: "m8_lourmel", name: "Lourmel", lat: 48.8386, lng: 2.2822, lines: ["8"] },
  { id: "m8_boucicaut", name: "Boucicaut", lat: 48.8408, lng: 2.2878, lines: ["8"] },
  { id: "m8_felix_faure", name: "Félix Faure", lat: 48.8426, lng: 2.2921, lines: ["8"] },
  { id: "m8_commerce", name: "Commerce", lat: 48.8446, lng: 2.2940, lines: ["8"] },
  { id: "m8_ecole_militaire", name: "École Militaire", lat: 48.8546, lng: 2.3062, lines: ["8"] },
  { id: "m8_la_tour_maubourg", name: "La Tour-Maubourg", lat: 48.8575, lng: 2.3101, lines: ["8"] },
  { id: "m8_invalides", name: "Invalides", lat: 48.8609, lng: 2.3144, lines: ["8", "13", "RER C"] },
  { id: "m8_madeleine", name: "Madeleine", lat: 48.8700, lng: 2.3249, lines: ["8", "12", "14"] },
  { id: "m8_richelieu", name: "Richelieu - Drouot", lat: 48.8720, lng: 2.3386, lines: ["8", "9"] },
  { id: "m8_grands_boulevards", name: "Grands Boulevards", lat: 48.8711, lng: 2.3429, lines: ["8", "9"] },
  { id: "m8_bonne_nouvelle", name: "Bonne Nouvelle", lat: 48.8705, lng: 2.3488, lines: ["8", "9"] },
  { id: "m8_filles_calvaire", name: "Filles du Calvaire", lat: 48.8635, lng: 2.3663, lines: ["8"] },
  { id: "m8_st_sebastien", name: "Saint-Sébastien - Froissart", lat: 48.8609, lng: 2.3668, lines: ["8"] },
  { id: "m8_chemin_vert", name: "Chemin Vert", lat: 48.8572, lng: 2.3680, lines: ["8"] },
  { id: "m8_ledru_rollin", name: "Ledru-Rollin", lat: 48.8516, lng: 2.3769, lines: ["8"] },
  { id: "m8_faidherbe", name: "Faidherbe - Chaligny", lat: 48.8498, lng: 2.3838, lines: ["8"] },
  { id: "m8_montgallet", name: "Montgallet", lat: 48.8441, lng: 2.3898, lines: ["8"] },
  { id: "m8_michel_bizot", name: "Michel Bizot", lat: 48.8372, lng: 2.4024, lines: ["8"] },
  { id: "m8_porte_doree", name: "Porte Dorée", lat: 48.8353, lng: 2.4057, lines: ["8"] },
  { id: "m8_porte_charenton", name: "Porte de Charenton", lat: 48.8331, lng: 2.4015, lines: ["8"] },
  { id: "m8_liberte", name: "Liberté", lat: 48.8263, lng: 2.4083, lines: ["8"] },
  { id: "m8_charenton_ecoles", name: "Charenton - Écoles", lat: 48.8213, lng: 2.4143, lines: ["8"] },
  { id: "m8_ecole_veterinaire", name: "École Vétérinaire de Maisons-Alfort", lat: 48.8150, lng: 2.4222, lines: ["8"] },
  { id: "m8_maisons_alfort_stade", name: "Maisons-Alfort - Stade", lat: 48.8086, lng: 2.4349, lines: ["8"] },
  { id: "m8_maisons_alfort_juilliottes", name: "Maisons-Alfort - Les Juilliottes", lat: 48.8020, lng: 2.4412, lines: ["8"] },
  { id: "m8_creteil_universite", name: "Créteil - Université", lat: 48.7896, lng: 2.4506, lines: ["8"] },
  { id: "m8_creteil_prefecture", name: "Créteil - Préfecture", lat: 48.7791, lng: 2.4591, lines: ["8"] },
  { id: "m8_pointe_lac", name: "Pointe du Lac", lat: 48.7688, lng: 2.4641, lines: ["8"] },

  // === METRO LINE 9 ===
  { id: "m9_pont_sevres", name: "Pont de Sèvres", lat: 48.8296, lng: 2.2305, lines: ["9"] },
  { id: "m9_billancourt", name: "Billancourt", lat: 48.8320, lng: 2.2386, lines: ["9"] },
  { id: "m9_marcel_sembat", name: "Marcel Sembat", lat: 48.8333, lng: 2.2436, lines: ["9"] },
  { id: "m9_porte_st_cloud", name: "Porte de Saint-Cloud", lat: 48.8381, lng: 2.2566, lines: ["9"] },
  { id: "m9_exelmans", name: "Exelmans", lat: 48.8425, lng: 2.2596, lines: ["9"] },
  { id: "m9_michel_ange_molitor", name: "Michel-Ange - Molitor", lat: 48.8452, lng: 2.2616, lines: ["9", "10"] },
  { id: "m9_michel_ange_auteuil", name: "Michel-Ange - Auteuil", lat: 48.8480, lng: 2.2638, lines: ["9", "10"] },
  { id: "m9_jasmin", name: "Jasmin", lat: 48.8522, lng: 2.2680, lines: ["9"] },
  { id: "m9_ranelagh", name: "Ranelagh", lat: 48.8554, lng: 2.2704, lines: ["9"] },
  { id: "m9_muette", name: "La Muette", lat: 48.8584, lng: 2.2733, lines: ["9"] },
  { id: "m9_rue_pompe", name: "Rue de la Pompe", lat: 48.8641, lng: 2.2784, lines: ["9"] },
  { id: "m9_iena", name: "Iéna", lat: 48.8643, lng: 2.2932, lines: ["9"] },
  { id: "m9_alma_marceau", name: "Alma - Marceau", lat: 48.8644, lng: 2.3010, lines: ["9"] },
  { id: "m9_st_philippe", name: "Saint-Philippe du Roule", lat: 48.8723, lng: 2.3093, lines: ["9"] },
  { id: "m9_miromesnil", name: "Miromesnil", lat: 48.8733, lng: 2.3144, lines: ["9", "13"] },
  { id: "m9_voltaire", name: "Voltaire", lat: 48.8576, lng: 2.3804, lines: ["9"] },
  { id: "m9_charonne", name: "Charonne", lat: 48.8546, lng: 2.3926, lines: ["9"] },
  { id: "m9_rue_boulets", name: "Rue des Boulets", lat: 48.8526, lng: 2.3888, lines: ["9"] },
  { id: "m9_buzenval", name: "Buzenval", lat: 48.8516, lng: 2.4007, lines: ["9"] },
  { id: "m9_maraichers", name: "Maraîchers", lat: 48.8529, lng: 2.4064, lines: ["9"] },
  { id: "m9_porte_montreuil", name: "Porte de Montreuil", lat: 48.8535, lng: 2.4109, lines: ["9"] },
  { id: "m9_robespierre", name: "Robespierre", lat: 48.8567, lng: 2.4234, lines: ["9"] },
  { id: "m9_croix_chavaux", name: "Croix de Chavaux", lat: 48.8578, lng: 2.4357, lines: ["9"] },
  { id: "m9_mairie_montreuil", name: "Mairie de Montreuil", lat: 48.8622, lng: 2.4436, lines: ["9"] },

  // === METRO LINE 10 ===
  { id: "m10_boulogne_pont_st_cloud", name: "Boulogne - Pont de Saint-Cloud", lat: 48.8408, lng: 2.2283, lines: ["10"] },
  { id: "m10_boulogne_jean_jaures", name: "Boulogne - Jean Jaurès", lat: 48.8420, lng: 2.2385, lines: ["10"] },
  { id: "m10_eglise_auteuil", name: "Église d'Auteuil", lat: 48.8475, lng: 2.2700, lines: ["10"] },
  { id: "m10_porte_auteuil", name: "Porte d'Auteuil", lat: 48.8480, lng: 2.2580, lines: ["10"] },
  { id: "m10_chardon_lagache", name: "Chardon Lagache", lat: 48.8451, lng: 2.2664, lines: ["10"] },
  { id: "m10_mirabeau", name: "Mirabeau", lat: 48.8467, lng: 2.2730, lines: ["10"] },
  { id: "m10_javel", name: "Javel - André Citroën", lat: 48.8462, lng: 2.2784, lines: ["10"] },
  { id: "m10_charles_michels", name: "Charles Michels", lat: 48.8462, lng: 2.2862, lines: ["10"] },
  { id: "m10_avenue_emile_zola", name: "Avenue Émile Zola", lat: 48.8468, lng: 2.2948, lines: ["10"] },
  { id: "m10_segur", name: "Ségur", lat: 48.8470, lng: 2.3076, lines: ["10"] },
  { id: "m10_duroc", name: "Duroc", lat: 48.8472, lng: 2.3162, lines: ["10", "13"] },
  { id: "m10_vaneau", name: "Vaneau", lat: 48.8488, lng: 2.3207, lines: ["10"] },
  { id: "m10_sevres_babylone", name: "Sèvres - Babylone", lat: 48.8510, lng: 2.3267, lines: ["10", "12"] },
  { id: "m10_mabillon", name: "Mabillon", lat: 48.8529, lng: 2.3349, lines: ["10"] },
  { id: "m10_cluny", name: "Cluny - La Sorbonne", lat: 48.8511, lng: 2.3442, lines: ["10", "RER B"] },
  { id: "m10_maubert", name: "Maubert - Mutualité", lat: 48.8501, lng: 2.3484, lines: ["10"] },
  { id: "m10_cardinal_lemoine", name: "Cardinal Lemoine", lat: 48.8467, lng: 2.3515, lines: ["10"] },
  { id: "m10_gare_austerlitz_l10", name: "Gare d'Austerlitz", lat: 48.8435, lng: 2.3656, lines: ["10"] },

  // === METRO LINE 11 ===
  { id: "m11_chatelet_l11", name: "Châtelet", lat: 48.8580, lng: 2.3478, lines: ["11"] },
  { id: "m11_rambuteau", name: "Rambuteau", lat: 48.8614, lng: 2.3532, lines: ["11"] },
  { id: "m11_goncourt", name: "Goncourt", lat: 48.8698, lng: 2.3715, lines: ["11"] },
  { id: "m11_pyrennes", name: "Pyrénées", lat: 48.8731, lng: 2.3848, lines: ["11"] },
  { id: "m11_jourdain", name: "Jourdain", lat: 48.8756, lng: 2.3893, lines: ["11"] },
  { id: "m11_telegraphe", name: "Télégraphe", lat: 48.8758, lng: 2.3985, lines: ["11"] },
  { id: "m11_mairie_lilas", name: "Mairie des Lilas", lat: 48.8798, lng: 2.4161, lines: ["11"] },
  { id: "m11_serge_gainsbourg", name: "Serge Gainsbourg", lat: 48.8812, lng: 2.4240, lines: ["11"] },
  { id: "m11_place_carnot", name: "Place Carnot", lat: 48.8849, lng: 2.4364, lines: ["11"] },
  { id: "m11_jean_rostand", name: "Jean Rostand", lat: 48.8869, lng: 2.4484, lines: ["11"] },
  { id: "m11_rosny_bois_perrier", name: "Rosny-Bois-Perrier", lat: 48.8865, lng: 2.4836, lines: ["11"] },

  // === METRO LINE 12 ===
  { id: "m12_front_populaire", name: "Front Populaire", lat: 48.9066, lng: 2.3653, lines: ["12"] },
  { id: "m12_aubervilliers_mairie", name: "Mairie d'Aubervilliers", lat: 48.9139, lng: 2.3825, lines: ["12"] },
  { id: "m12_porte_chapelle", name: "Porte de la Chapelle", lat: 48.8971, lng: 2.3591, lines: ["12"] },
  { id: "m12_marx_dormoy", name: "Marx Dormoy", lat: 48.8905, lng: 2.3593, lines: ["12"] },
  { id: "m12_jules_joffrin", name: "Jules Joffrin", lat: 48.8920, lng: 2.3444, lines: ["12"] },
  { id: "m12_lamarck", name: "Lamarck - Caulaincourt", lat: 48.8895, lng: 2.3387, lines: ["12"] },
  { id: "m12_abbesses", name: "Abbesses", lat: 48.8841, lng: 2.3382, lines: ["12"] },
  { id: "m12_notre_dame_lorette", name: "Notre-Dame-de-Lorette", lat: 48.8762, lng: 2.3386, lines: ["12"] },
  { id: "m12_trinite", name: "Trinité - d'Estienne d'Orves", lat: 48.8763, lng: 2.3330, lines: ["12"] },
  { id: "m12_assemblee", name: "Assemblée Nationale", lat: 48.8607, lng: 2.3194, lines: ["12"] },
  { id: "m12_solferino", name: "Solférino", lat: 48.8584, lng: 2.3230, lines: ["12"] },
  { id: "m12_rue_bac", name: "Rue du Bac", lat: 48.8557, lng: 2.3250, lines: ["12"] },
  { id: "m12_rennes", name: "Rennes", lat: 48.8488, lng: 2.3272, lines: ["12"] },
  { id: "m12_falguiere", name: "Falguière", lat: 48.8440, lng: 2.3190, lines: ["12"] },
  { id: "m12_volontaires", name: "Volontaires", lat: 48.8415, lng: 2.3080, lines: ["12"] },
  { id: "m12_vaugirard", name: "Vaugirard", lat: 48.8394, lng: 2.3013, lines: ["12"] },
  { id: "m12_convention", name: "Convention", lat: 48.8373, lng: 2.2967, lines: ["12"] },
  { id: "m12_porte_versailles", name: "Porte de Versailles", lat: 48.8328, lng: 2.2881, lines: ["12"] },
  { id: "m12_corentin_celton", name: "Corentin Celton", lat: 48.8268, lng: 2.2790, lines: ["12"] },
  { id: "m12_mairie_issy", name: "Mairie d'Issy", lat: 48.8244, lng: 2.2735, lines: ["12"] },

  // === METRO LINE 13 ===
  { id: "m13_chatillon", name: "Châtillon - Montrouge", lat: 48.8109, lng: 2.3017, lines: ["13"] },
  { id: "m13_malakoff_plateau", name: "Malakoff - Plateau de Vanves", lat: 48.8176, lng: 2.3008, lines: ["13"] },
  { id: "m13_malakoff_etienne_dolet", name: "Malakoff - Rue Étienne Dolet", lat: 48.8200, lng: 2.2987, lines: ["13"] },
  { id: "m13_porte_vanves", name: "Porte de Vanves", lat: 48.8274, lng: 2.3060, lines: ["13"] },
  { id: "m13_plaisance", name: "Plaisance", lat: 48.8319, lng: 2.3138, lines: ["13"] },
  { id: "m13_pernety", name: "Pernety", lat: 48.8343, lng: 2.3183, lines: ["13"] },
  { id: "m13_gaite", name: "Gaîté", lat: 48.8385, lng: 2.3223, lines: ["13"] },
  { id: "m13_liege", name: "Liège", lat: 48.8798, lng: 2.3264, lines: ["13"] },
  { id: "m13_la_fourche", name: "La Fourche", lat: 48.8868, lng: 2.3258, lines: ["13"] },
  { id: "m13_guy_moquet", name: "Guy Môquet", lat: 48.8926, lng: 2.3267, lines: ["13"] },
  { id: "m13_porte_st_ouen", name: "Porte de Saint-Ouen", lat: 48.8975, lng: 2.3274, lines: ["13"] },
  { id: "m13_garibaldi", name: "Garibaldi", lat: 48.9066, lng: 2.3321, lines: ["13"] },
  { id: "m13_mairie_st_ouen", name: "Mairie de Saint-Ouen", lat: 48.9114, lng: 2.3341, lines: ["13"] },
  { id: "m13_carrefour_pleyel", name: "Carrefour Pleyel", lat: 48.9196, lng: 2.3434, lines: ["13"] },
  { id: "m13_st_denis_universite", name: "Saint-Denis - Université", lat: 48.9461, lng: 2.3626, lines: ["13"] },
  { id: "m13_basilique", name: "Basilique de Saint-Denis", lat: 48.9367, lng: 2.3599, lines: ["13"] },
  { id: "m13_st_denis_porte_paris", name: "Saint-Denis - Porte de Paris", lat: 48.9306, lng: 2.3565, lines: ["13"] },
  { id: "m13_brochant", name: "Brochant", lat: 48.8907, lng: 2.3198, lines: ["13"] },
  { id: "m13_porte_clichy", name: "Porte de Clichy", lat: 48.8944, lng: 2.3134, lines: ["13", "RER C"] },
  { id: "m13_mairie_clichy", name: "Mairie de Clichy", lat: 48.9037, lng: 2.3065, lines: ["13"] },
  { id: "m13_gabriel_peri", name: "Gabriel Péri", lat: 48.9165, lng: 2.2948, lines: ["13"] },
  { id: "m13_les_courtilles", name: "Les Courtilles", lat: 48.9308, lng: 2.2842, lines: ["13"] },
  { id: "m13_les_agnettes", name: "Les Agnettes", lat: 48.9233, lng: 2.2859, lines: ["13"] },

  // === METRO LINE 14 ===
  { id: "m14_st_denis_pleyel", name: "Saint-Denis Pleyel", lat: 48.9195, lng: 2.3467, lines: ["14"] },
  { id: "m14_mairie_st_ouen_l14", name: "Mairie de Saint-Ouen", lat: 48.9114, lng: 2.3345, lines: ["14"] },
  { id: "m14_pont_cardinet", name: "Pont Cardinet", lat: 48.8875, lng: 2.3163, lines: ["14"] },
  { id: "m14_st_lazare_l14", name: "Saint-Lazare", lat: 48.8755, lng: 2.3255, lines: ["14"] },
  { id: "m14_pyramides_l14", name: "Pyramides", lat: 48.8668, lng: 2.3342, lines: ["14"] },
  { id: "m14_chatelet_l14", name: "Châtelet", lat: 48.8582, lng: 2.3470, lines: ["14"] },
  { id: "m14_gare_lyon_l14", name: "Gare de Lyon", lat: 48.8450, lng: 2.3738, lines: ["14"] },
  { id: "m14_cour_st_emilion", name: "Cour Saint-Émilion", lat: 48.8332, lng: 2.3870, lines: ["14"] },
  { id: "m14_bibliotheque", name: "Bibliothèque François Mitterrand", lat: 48.8294, lng: 2.3770, lines: ["14", "RER C"] },
  { id: "m14_olympiades", name: "Olympiades", lat: 48.8271, lng: 2.3678, lines: ["14"] },
  { id: "m14_villejuif_igr", name: "Villejuif - Institut Gustave Roussy", lat: 48.7969, lng: 2.3480, lines: ["14"] },
  { id: "m14_chevilly_trois_communes", name: "Chevilly Trois Communes", lat: 48.7755, lng: 2.3500, lines: ["14"] },
  { id: "m14_m_i_n_porte_thiais", name: "M.I.N. Porte de Thiais", lat: 48.7592, lng: 2.3671, lines: ["14"] },
  { id: "m14_aeroport_orly", name: "Aéroport d'Orly", lat: 48.7262, lng: 2.3652, lines: ["14"] },

  // === RER A ===
  { id: "rera_nanterre_prefecture", name: "Nanterre-Préfecture", lat: 48.8923, lng: 2.2193, lines: ["RER A"] },
  // Branche Saint-Germain (sud depuis Nanterre-Préfecture)
  { id: "rera_nanterre_ville", name: "Nanterre-Ville", lat: 48.8922, lng: 2.2070, lines: ["RER A"] },
  { id: "rera_rueil", name: "Rueil-Malmaison", lat: 48.8793, lng: 2.1843, lines: ["RER A"] },
  { id: "rera_chatou", name: "Chatou - Croissy", lat: 48.8874, lng: 2.1543, lines: ["RER A"] },
  { id: "rera_vesinet_le_pecq", name: "Le Vésinet - Le Pecq", lat: 48.8949, lng: 2.1284, lines: ["RER A"] },
  { id: "rera_vesinet_centre", name: "Le Vésinet - Centre", lat: 48.8929, lng: 2.1108, lines: ["RER A"] },
  { id: "rera_st_germain", name: "Saint-Germain-en-Laye", lat: 48.8984, lng: 2.0936, lines: ["RER A"] },
  // Branche nord (vers Sartrouville)
  { id: "rera_houilles", name: "Houilles - Carrières-sur-Seine", lat: 48.9199, lng: 2.1852, lines: ["RER A"] },
  { id: "rera_sartrouville", name: "Sartrouville", lat: 48.9373, lng: 2.1590, lines: ["RER A"] },
  // Branche Poissy (depuis Maisons-Laffitte)
  { id: "rera_maisons_laffitte", name: "Maisons-Laffitte", lat: 48.9456, lng: 2.1438, lines: ["RER A"] },
  { id: "rera_acheres_ville", name: "Achères-Ville", lat: 48.9698, lng: 2.0779, lines: ["RER A"] },
  { id: "rera_poissy", name: "Poissy", lat: 48.9271, lng: 2.0517, lines: ["RER A"] },
  // Branche Cergy (depuis Maisons-Laffitte)
  { id: "rera_conflans", name: "Conflans-Fin d'Oise", lat: 48.9920, lng: 2.0753, lines: ["RER A"] },
  { id: "rera_neuville", name: "Neuville-Université", lat: 49.0170, lng: 2.0744, lines: ["RER A"] },
  { id: "rera_cergy_prefecture", name: "Cergy - Préfecture", lat: 49.0360, lng: 2.0803, lines: ["RER A"] },
  { id: "rera_cergy_st_christophe", name: "Cergy - Saint-Christophe", lat: 49.0499, lng: 2.0347, lines: ["RER A"] },
  { id: "rera_cergy", name: "Cergy-Le Haut", lat: 49.0488, lng: 2.0110, lines: ["RER A"] },
  { id: "rera_auber", name: "Auber", lat: 48.8727, lng: 2.3298, lines: ["RER A"] },
  { id: "rera_vincennes", name: "Vincennes", lat: 48.8471, lng: 2.4336, lines: ["RER A"] },
  { id: "rera_val_fontenay", name: "Val de Fontenay", lat: 48.8558, lng: 2.4804, lines: ["RER A", "RER E"] },
  { id: "rera_noisy", name: "Noisy-le-Grand - Mont d'Est", lat: 48.8427, lng: 2.5551, lines: ["RER A"] },
  { id: "rera_marne_vallee", name: "Marne-la-Vallée - Chessy", lat: 48.8666, lng: 2.7825, lines: ["RER A"] },
  { id: "rera_neuilly_plaisance", name: "Neuilly-Plaisance", lat: 48.8614, lng: 2.5093, lines: ["RER A"] },
  { id: "rera_bry", name: "Bry-sur-Marne", lat: 48.8384, lng: 2.5226, lines: ["RER A"] },
  { id: "rera_noisy_champs", name: "Noisy - Champs", lat: 48.8436, lng: 2.5785, lines: ["RER A"] },
  { id: "rera_fontenay", name: "Fontenay-sous-Bois", lat: 48.8437, lng: 2.4631, lines: ["RER A"] },
  { id: "rera_nogent", name: "Nogent-sur-Marne", lat: 48.8384, lng: 2.4939, lines: ["RER A"] },
  { id: "rera_joinville", name: "Joinville-le-Pont", lat: 48.8196, lng: 2.4642, lines: ["RER A"] },
  { id: "rera_st_maur", name: "Saint-Maur - Créteil", lat: 48.8076, lng: 2.4716, lines: ["RER A"] },
  { id: "rera_parc_st_maur", name: "Le Parc de Saint-Maur", lat: 48.8041, lng: 2.4869, lines: ["RER A"] },
  { id: "rera_champigny", name: "Champigny", lat: 48.8070, lng: 2.5107, lines: ["RER A"] },
  { id: "rera_la_varenne", name: "La Varenne - Chennevières", lat: 48.7941, lng: 2.5135, lines: ["RER A"] },
  { id: "rera_sucy", name: "Sucy - Bonneuil", lat: 48.7704, lng: 2.5063, lines: ["RER A"] },
  { id: "rera_boissy", name: "Boissy-Saint-Léger", lat: 48.7529, lng: 2.5065, lines: ["RER A"] },

  // === RER B ===
  { id: "rerb_cdg_airport", name: "Aéroport CDG", lat: 49.0097, lng: 2.5710, lines: ["RER B"] },
  { id: "rerb_cdg1", name: "Aéroport CDG 1", lat: 49.0097, lng: 2.5560, lines: ["RER B"] },
  { id: "rerb_parc_expo", name: "Parc des Expositions", lat: 48.9746, lng: 2.5137, lines: ["RER B"] },
  { id: "rerb_aulnay", name: "Aulnay-sous-Bois", lat: 48.9317, lng: 2.4938, lines: ["RER B"] },
  { id: "rerb_drancy", name: "Le Bourget", lat: 48.9309, lng: 2.4259, lines: ["RER B"] },
  { id: "rerb_la_plaine", name: "La Plaine - Stade de France", lat: 48.9178, lng: 2.3621, lines: ["RER B"] },
  { id: "rerb_gare_nord", name: "Gare du Nord", lat: 48.8802, lng: 2.3550, lines: ["RER B", "RER D", "RER E"] },
  { id: "rerb_chatelet_halles", name: "Châtelet - Les Halles", lat: 48.8618, lng: 2.3468, lines: ["RER A", "RER B", "RER D"] },
  { id: "rerb_st_michel_nd", name: "Saint-Michel - Notre-Dame", lat: 48.8531, lng: 2.3441, lines: ["RER B", "RER C"] },
  { id: "rerb_luxembourg", name: "Luxembourg", lat: 48.8462, lng: 2.3398, lines: ["RER B"] },
  { id: "rerb_port_royal", name: "Port-Royal", lat: 48.8402, lng: 2.3368, lines: ["RER B"] },
  { id: "rerb_denfert_rer", name: "Denfert-Rochereau", lat: 48.8340, lng: 2.3326, lines: ["RER B"] },
  { id: "rerb_cite_universitaire", name: "Cité Universitaire", lat: 48.8206, lng: 2.3386, lines: ["RER B"] },
  { id: "rerb_bourg_reine", name: "Bourg-la-Reine", lat: 48.7814, lng: 2.3138, lines: ["RER B"] },
  { id: "rerb_antony", name: "Antony", lat: 48.7538, lng: 2.2966, lines: ["RER B"] },
  { id: "rerb_massy", name: "Massy - Palaiseau", lat: 48.7254, lng: 2.2604, lines: ["RER B", "RER C"] },
  { id: "rerb_orsay", name: "Orsay-Ville", lat: 48.6978, lng: 2.1862, lines: ["RER B"] },
  { id: "rerb_robinson", name: "Robinson", lat: 48.7805, lng: 2.2810, lines: ["RER B"] },
  { id: "rerb_laplace", name: "Laplace", lat: 48.7993, lng: 2.3278, lines: ["RER B"] },
  { id: "rerb_gentilly", name: "Gentilly", lat: 48.8133, lng: 2.3427, lines: ["RER B"] },

  // === RER C ===
  // Branche Nord (Pontoise → Ermont-Eaubonne)
  { id: "rerc_pontoise", name: "Pontoise", lat: 49.0629, lng: 2.0576, lines: ["RER C"] },
  { id: "rerc_st_ouen_aumone", name: "Saint-Ouen-l'Aumône", lat: 49.0340, lng: 2.1282, lines: ["RER C"] },
  { id: "rerc_pierrelaye", name: "Pierrelaye", lat: 49.0195, lng: 2.1537, lines: ["RER C"] },
  { id: "rerc_montigny", name: "Montigny - Beauchamp", lat: 49.0074, lng: 2.1975, lines: ["RER C"] },
  { id: "rerc_franconville", name: "Franconville", lat: 48.9934, lng: 2.2350, lines: ["RER C"] },
  { id: "rerc_cernay", name: "Cernay", lat: 48.9856, lng: 2.2564, lines: ["RER C"] },
  { id: "rerc_ermont", name: "Ermont - Eaubonne", lat: 48.9801, lng: 2.2717, lines: ["RER C"] },
  // Arc nord-ouest (Ermont → Champ de Mars)
  { id: "rerc_st_gratien", name: "Saint-Gratien", lat: 48.9638, lng: 2.2852, lines: ["RER C"] },
  { id: "rerc_epinay", name: "Épinay-sur-Seine", lat: 48.9542, lng: 2.3025, lines: ["RER C"] },
  { id: "rerc_gennevilliers", name: "Gennevilliers", lat: 48.9337, lng: 2.3072, lines: ["RER C"] },
  { id: "rerc_gresillons", name: "Les Grésillons", lat: 48.9200, lng: 2.3154, lines: ["RER C"] },
  { id: "rerc_st_ouen", name: "Saint-Ouen", lat: 48.9045, lng: 2.3216, lines: ["RER C"] },
  { id: "rerc_porte_clichy", name: "Porte de Clichy", lat: 48.8948, lng: 2.3133, lines: ["RER C"] },
  { id: "rerc_pereire", name: "Pereire - Levallois", lat: 48.8855, lng: 2.2982, lines: ["RER C"] },
  { id: "rerc_neuilly_porte_maillot", name: "Neuilly - Porte Maillot", lat: 48.8779, lng: 2.2844, lines: ["RER C"] },
  { id: "rerc_avenue_foch", name: "Avenue Foch", lat: 48.8737, lng: 2.2893, lines: ["RER C"] },
  { id: "rerc_avenue_henri_martin", name: "Avenue Henri Martin", lat: 48.8644, lng: 2.2721, lines: ["RER C"] },
  { id: "rerc_boulainvilliers", name: "Boulainvilliers", lat: 48.8566, lng: 2.2751, lines: ["RER C"] },
  { id: "rerc_ave_president_kennedy", name: "Avenue du Président Kennedy", lat: 48.8531, lng: 2.2803, lines: ["RER C"] },
  // Tronc central
  { id: "rerc_champ_mars", name: "Champ de Mars - Tour Eiffel", lat: 48.8561, lng: 2.2895, lines: ["RER C"] },
  { id: "rerc_pont_alma", name: "Pont de l'Alma", lat: 48.8625, lng: 2.3010, lines: ["RER C"] },
  { id: "rerc_invalides_rer", name: "Invalides", lat: 48.8626, lng: 2.3147, lines: ["RER C"] },
  { id: "rerc_musee_orsay", name: "Musée d'Orsay", lat: 48.8604, lng: 2.3252, lines: ["RER C"] },
  { id: "rerc_gare_austerlitz_rer", name: "Gare d'Austerlitz", lat: 48.8418, lng: 2.3661, lines: ["RER C"] },
  { id: "rerc_bibliotheque_rer", name: "Bibliothèque François Mitterrand", lat: 48.8299, lng: 2.3767, lines: ["RER C"] },
  // Sud (Bibliothèque → Choisy-le-Roi)
  { id: "rerc_ivry", name: "Ivry-sur-Seine", lat: 48.8147, lng: 2.3915, lines: ["RER C"] },
  { id: "rerc_vitry", name: "Vitry-sur-Seine", lat: 48.7900, lng: 2.3872, lines: ["RER C"] },
  { id: "rerc_ardoines", name: "Les Ardoines", lat: 48.7827, lng: 2.4084, lines: ["RER C"] },
  { id: "rerc_choisy", name: "Choisy-le-Roi", lat: 48.7643, lng: 2.4108, lines: ["RER C"] },
  // Branche Juvisy (depuis Choisy)
  { id: "rerc_villeneuve", name: "Villeneuve-le-Roi", lat: 48.7399, lng: 2.4264, lines: ["RER C"] },
  { id: "rerc_ablon", name: "Ablon", lat: 48.7254, lng: 2.4186, lines: ["RER C"] },
  { id: "rerc_athis_mons", name: "Athis-Mons", lat: 48.7129, lng: 2.4023, lines: ["RER C"] },
  { id: "rerc_juvisy", name: "Juvisy", lat: 48.6898, lng: 2.3864, lines: ["RER C"] },
  { id: "rerc_savigny", name: "Savigny-sur-Orge", lat: 48.6761, lng: 2.3518, lines: ["RER C"] },
  { id: "rerc_epinay_orge", name: "Épinay-sur-Orge", lat: 48.6708, lng: 2.3348, lines: ["RER C"] },
  { id: "rerc_ste_genevieve", name: "Sainte-Geneviève-des-Bois", lat: 48.6531, lng: 2.3133, lines: ["RER C"] },
  { id: "rerc_st_michel_orge", name: "Saint-Michel-sur-Orge", lat: 48.6361, lng: 2.3072, lines: ["RER C"] },
  { id: "rerc_bretigny", name: "Brétigny", lat: 48.6065, lng: 2.3027, lines: ["RER C"] },
  // Branche Massy via Orly (depuis Choisy)
  { id: "rerc_les_saules", name: "Les Saules", lat: 48.7455, lng: 2.4176, lines: ["RER C"] },
  { id: "rerc_orly_ville", name: "Orly-Ville", lat: 48.7419, lng: 2.4030, lines: ["RER C"] },
  { id: "rerc_pont_rungis", name: "Pont de Rungis - Aéroport d'Orly", lat: 48.7482, lng: 2.3729, lines: ["RER C"] },
  { id: "rerc_rungis", name: "Rungis - La Fraternelle", lat: 48.7415, lng: 2.3530, lines: ["RER C"] },
  { id: "rerc_chemin_antony", name: "Chemin d'Antony", lat: 48.7358, lng: 2.3096, lines: ["RER C"] },
  { id: "rerc_massy_verrieres", name: "Massy - Verrières", lat: 48.7340, lng: 2.2731, lines: ["RER C"] },
  // Boucle sud-ouest (Versailles Château → Javel)
  { id: "rerc_versailles_rg", name: "Versailles Château Rive Gauche", lat: 48.8003, lng: 2.1289, lines: ["RER C"] },
  { id: "rerc_porchefontaine", name: "Porchefontaine", lat: 48.7969, lng: 2.1536, lines: ["RER C"] },
  { id: "rerc_viroflay", name: "Viroflay - Rive Gauche", lat: 48.8011, lng: 2.1713, lines: ["RER C"] },
  { id: "rerc_chaville", name: "Chaville - Vélizy", lat: 48.7997, lng: 2.1844, lines: ["RER C"] },
  { id: "rerc_meudon", name: "Meudon Val Fleury", lat: 48.8080, lng: 2.2410, lines: ["RER C"] },
  { id: "rerc_issy", name: "Issy", lat: 48.8293, lng: 2.2635, lines: ["RER C"] },
  { id: "rerc_pont_garigliano", name: "Pont du Garigliano", lat: 48.8394, lng: 2.2710, lines: ["RER C"] },
  { id: "rerc_javel_rer", name: "Javel", lat: 48.8462, lng: 2.2790, lines: ["RER C"] },
  // Branche C7 (Saint-Quentin-en-Yvelines → Versailles-Chantiers → Porchefontaine)
  { id: "rerc_st_quentin", name: "Saint-Quentin-en-Yvelines", lat: 48.7868, lng: 2.0447, lines: ["RER C"] },
  { id: "rerc_st_cyr", name: "Saint-Cyr", lat: 48.7989, lng: 2.0712, lines: ["RER C"] },
  { id: "rerc_versailles_chantiers", name: "Versailles-Chantiers", lat: 48.7945, lng: 2.1378, lines: ["RER C"] },

  // === RER D ===
  { id: "rerd_gare_nord_rer", name: "Gare du Nord", lat: 48.8798, lng: 2.3555, lines: ["RER D"] },
  { id: "rerd_chatelet_halles", name: "Châtelet - Les Halles", lat: 48.8620, lng: 2.3472, lines: ["RER D"] },
  { id: "rerd_gare_lyon_rer", name: "Gare de Lyon", lat: 48.8446, lng: 2.3730, lines: ["RER D"] },
  { id: "rerd_maisons_alfort", name: "Maisons-Alfort - Alfortville", lat: 48.8042, lng: 2.4245, lines: ["RER D"] },
  { id: "rerd_creteil_pompadour", name: "Créteil-Pompadour", lat: 48.7699, lng: 2.4418, lines: ["RER D"] },
  { id: "rerd_villeneuve_st_georges", name: "Villeneuve-Saint-Georges", lat: 48.7311, lng: 2.4467, lines: ["RER D"] },
  { id: "rerd_stade_france", name: "Stade de France - Saint-Denis", lat: 48.9168, lng: 2.3503, lines: ["RER D"] },
  { id: "rerd_st_denis", name: "Saint-Denis", lat: 48.9347, lng: 2.3458, lines: ["RER D"] },

  // === RER E ===
  { id: "rere_haussmann", name: "Haussmann - Saint-Lazare", lat: 48.8754, lng: 2.3267, lines: ["RER E"] },
  { id: "rere_magenta", name: "Magenta", lat: 48.8808, lng: 2.3565, lines: ["RER E"] },
  { id: "rere_rosa_parks", name: "Rosa Parks", lat: 48.8966, lng: 2.3731, lines: ["RER E"] },
  { id: "rere_pantin", name: "Pantin", lat: 48.8952, lng: 2.3929, lines: ["RER E"] },
  { id: "rere_noisy_sec", name: "Noisy-le-Sec", lat: 48.8914, lng: 2.4562, lines: ["RER E"] },
  { id: "rere_bondy", name: "Bondy", lat: 48.8940, lng: 2.4870, lines: ["RER E"] },
  { id: "rere_le_raincy", name: "Le Raincy - Villemomble - Montfermeil", lat: 48.8938, lng: 2.5101, lines: ["RER E"] },
  { id: "rere_gagny", name: "Gagny", lat: 48.8837, lng: 2.5243, lines: ["RER E"] },
  { id: "rere_le_chenay_gagny", name: "Le Chénay - Gagny", lat: 48.8791, lng: 2.5468, lines: ["RER E"] },
  { id: "rere_chelles", name: "Chelles - Gournay", lat: 48.8810, lng: 2.5853, lines: ["RER E"] },
  { id: "rere_villiers_sur_marne", name: "Villiers-sur-Marne - Le Plessis-Trévise", lat: 48.8270, lng: 2.5438, lines: ["RER E"] },
  { id: "rere_les_yvris", name: "Les Yvris - Noisy-le-Grand", lat: 48.8310, lng: 2.5720, lines: ["RER E"] },
  { id: "rere_emerainville", name: "Émerainville - Pontault-Combault", lat: 48.8068, lng: 2.6191, lines: ["RER E"] },
  { id: "rere_roissy_en_brie", name: "Roissy-en-Brie", lat: 48.7937, lng: 2.6514, lines: ["RER E"] },
  { id: "rere_ozoir", name: "Ozoir-la-Ferrière", lat: 48.7691, lng: 2.6861, lines: ["RER E"] },
  { id: "rere_gretz", name: "Gretz-Armainvilliers", lat: 48.7415, lng: 2.7308, lines: ["RER E"] },
  { id: "rere_tournan", name: "Tournan", lat: 48.7395, lng: 2.7711, lines: ["RER E"] },
  { id: "rere_nanterre_la_folie", name: "Nanterre-La Folie", lat: 48.8943, lng: 2.2314, lines: ["RER E"] },
];

// Build connections between adjacent stations on each line
function buildLineConnections(stationIds: string[], time: number = 2): Connection[] {
  const conns: Connection[] = [];
  for (let i = 0; i < stationIds.length - 1; i++) {
    conns.push({ from: stationIds[i], to: stationIds[i + 1], time });
    conns.push({ from: stationIds[i + 1], to: stationIds[i], time });
  }
  return conns;
}

// Transfer connections (walking between lines at same station) ~3-5 min
function buildTransfers(): Connection[] {
  const transfers: Connection[] = [];
  const stationsByName = new Map<string, Station[]>();

  for (const s of stations) {
    const key = s.name;
    if (!stationsByName.has(key)) stationsByName.set(key, []);
    stationsByName.get(key)!.push(s);
  }

  // Connect stations with same name (transfers)
  for (const [, group] of stationsByName) {
    for (let i = 0; i < group.length; i++) {
      for (let j = i + 1; j < group.length; j++) {
        transfers.push({ from: group[i].id, to: group[j].id, time: 4 });
        transfers.push({ from: group[j].id, to: group[i].id, time: 4 });
      }
    }
  }

  // Connect nearby stations that are transfer hubs (different names but same complex)
  const hubTransfers: [string, string, number][] = [
    // Châtelet - Les Halles complex
    ["m1_chatelet", "m4_les_halles", 4],
    ["m1_chatelet", "m11_chatelet_l11", 3],
    ["m1_chatelet", "m14_chatelet_l14", 4],
    ["m4_les_halles", "rerb_chatelet_halles", 4],
    ["m14_chatelet_l14", "rerb_chatelet_halles", 3],
    ["m11_chatelet_l11", "m14_chatelet_l14", 3],
    ["m11_chatelet_l11", "m4_les_halles", 4],
    ["rerd_chatelet_halles", "rerb_chatelet_halles", 2],
    ["rerd_chatelet_halles", "m1_chatelet", 4],
    // Gare du Nord
    ["m4_gare_nord", "rerb_gare_nord", 4],
    ["m4_gare_nord", "rerd_gare_nord_rer", 4],
    ["m4_gare_nord", "rere_magenta", 5],
    ["rerb_gare_nord", "rerd_gare_nord_rer", 2],
    ["rerb_gare_nord", "rere_magenta", 4],
    // Gare de Lyon
    ["m1_gare_lyon", "m14_gare_lyon_l14", 3],
    ["m1_gare_lyon", "rerd_gare_lyon_rer", 4],
    ["m14_gare_lyon_l14", "rerd_gare_lyon_rer", 3],
    // Saint-Lazare
    ["m3_st_lazare", "m14_st_lazare_l14", 3],
    ["m3_st_lazare", "rere_haussmann", 5],
    ["m14_st_lazare_l14", "rere_haussmann", 4],
    // Auber / Opéra / Havre-Caumartin
    ["rera_auber", "m3_opera", 4],
    ["rera_auber", "m3_havre_caumartin", 3],
    // Nation
    ["m1_nation", "rera_vincennes", 6],
    // La Défense
    ["m1_la_defense", "rera_nanterre_prefecture", 8],
    // CDG Étoile
    ["m1_cdg_etoile", "m2_ternes", 6],
    // Denfert
    ["m4_denfert", "rerb_denfert_rer", 3],
    // Invalides
    ["m8_invalides", "rerc_invalides_rer", 3],
    // Bibliothèque
    ["m14_bibliotheque", "rerc_bibliotheque_rer", 3],
    // Gare d'Austerlitz
    ["m5_gare_austerlitz", "m10_gare_austerlitz_l10", 3],
    ["m5_gare_austerlitz", "rerc_gare_austerlitz_rer", 4],
    ["m10_gare_austerlitz_l10", "rerc_gare_austerlitz_rer", 3],
    // Saint-Michel
    ["m4_st_michel", "rerb_st_michel_nd", 3],
    // Montparnasse
    ["m4_montparnasse", "m6_edgar_quinet", 5],
    // République
    ["m3_republique", "m5_oberkampf", 6],
    // Pyramides
    ["m7_pyramides", "m14_pyramides_l14", 3],
    // Javel
    ["m10_javel", "rerc_javel_rer", 3],
    // Porte de Clichy (RER C ↔ métro 13)
    ["m13_porte_clichy", "rerc_porte_clichy", 3],
    // Porte Maillot (RER C ↔ métro 1)
    ["m1_maillot", "rerc_neuilly_porte_maillot", 4],
    // Bir-Hakeim ↔ Champ de Mars RER C
    ["m6_bir_hakeim", "rerc_champ_mars", 5],
    // Louis Blanc / 7bis
    ["m7_louis_blanc", "m7b_bolivar", 5],
  ];

  for (const [from, to, time] of hubTransfers) {
    transfers.push({ from, to, time });
    transfers.push({ from: to, to: from, time });
  }

  return transfers;
}

export const connections: Connection[] = [
  // Line 1
  ...buildLineConnections([
    "m1_la_defense", "m1_esplanade", "m1_pont_neuilly", "m1_sablons",
    "m1_maillot", "m1_argentine", "m1_cdg_etoile", "m1_george_v",
    "m1_franklin", "m1_champs_elysees", "m1_concorde", "m1_tuileries",
    "m1_palais_royal", "m1_louvre", "m1_chatelet", "m1_hotel_ville",
    "m1_st_paul", "m1_bastille", "m1_gare_lyon", "m1_reuilly",
    "m1_nation", "m1_vincennes", "m1_berault", "m1_chateau_vincennes"
  ]),
  // Line 2
  ...buildLineConnections([
    "m2_porte_dauphine", "m2_victor_hugo", "m1_cdg_etoile", "m2_ternes",
    "m2_courcelles", "m2_monceau", "m2_villiers", "m2_rome",
    "m2_place_clichy", "m2_blanche", "m2_pigalle", "m2_anvers",
    "m2_barbes", "m2_chapelle", "m2_stalingrad", "m2_jaures",
    "m2_colonel_fabien", "m2_belleville", "m2_couronnes",
    "m2_menilmontant", "m2_pere_lachaise", "m2_philippe_auguste",
    "m2_alexandre_dumas", "m2_avron", "m1_nation"
  ]),
  // Line 3
  ...buildLineConnections([
    "m3_pont_levallois", "m3_anatole_france", "m3_louise_michel",
    "m3_porte_champerret", "m3_pereire", "m3_wagram", "m3_malesherbes",
    "m2_villiers", "m3_europe",
    "m3_st_lazare", "m3_havre_caumartin", "m3_opera",
    "m3_quatre_septembre", "m3_bourse", "m3_sentier", "m3_reaumur",
    "m3_arts_metiers", "m3_temple", "m3_republique", "m3_parmentier",
    "m3_rue_st_maur", "m2_pere_lachaise", "m3_gambetta",
    "m3_porte_bagnolet", "m3_gallieni"
  ]),
  // Line 3bis
  ...buildLineConnections([
    "m3_gambetta", "m3b_pelleport", "m3b_saint_fargeau", "m11_porte_lilas"
  ]),
  // Line 4
  ...buildLineConnections([
    "m4_porte_clignancourt", "m4_simplon", "m4_marcadet",
    "m4_chateau_rouge", "m2_barbes", "m4_gare_nord", "m4_gare_est",
    "m4_strasbourg_st_denis", "m3_reaumur", "m4_etienne_marcel",
    "m4_les_halles", "m1_chatelet", "m4_cite", "m4_st_michel",
    "m4_odeon", "m4_st_germain", "m4_st_sulpice", "m4_st_placide",
    "m4_montparnasse", "m4_vavin", "m4_raspail", "m4_denfert",
    "m4_mouton_duvernet", "m4_alesia", "m4_porte_orleans",
    "m4_mairie_montrouge", "m4_bagneux"
  ]),
  // Line 5
  ...buildLineConnections([
    "m5_bobigny", "m5_bobigny_pantin", "m5_eglise_pantin", "m5_hoche",
    "m5_porte_pantin", "m5_ourcq", "m5_laumiere", "m2_stalingrad",
    "m2_jaures", "m5_jacques_bonsergent", "m3_republique",
    "m5_oberkampf", "m5_richard_lenoir", "m5_breguet_sabin",
    "m1_bastille", "m5_quai_rapee", "m5_gare_austerlitz",
    "m5_st_marcel", "m5_campo_formio", "m5_place_italie"
  ]),
  // Line 6
  ...buildLineConnections([
    "m1_cdg_etoile", "m6_kleber", "m6_boissiere", "m6_trocadero",
    "m6_passy", "m6_bir_hakeim", "m6_dupleix", "m6_la_motte",
    "m6_cambronne", "m6_sevres_lecourbe", "m6_pasteur",
    "m4_montparnasse", "m6_edgar_quinet", "m4_raspail",
    "m4_denfert", "m6_st_jacques", "m6_glaciere", "m6_corvisart",
    "m5_place_italie", "m6_nationale", "m6_chevaleret", "m6_quai_gare",
    "m6_bercy", "m6_dugommier", "m6_daumesnil",
    "m6_bel_air", "m6_picpus", "m1_nation"
  ]),
  // Line 7
  ...buildLineConnections([
    "m7_la_courneuve", "m7_fort_aubervilliers", "m7_aubervilliers",
    "m7_porte_villette", "m7_corentin_cariou", "m7_riquet",
    "m2_stalingrad", "m7_louis_blanc", "m7_chateau_landon",
    "m4_gare_est", "m7_poissonniere", "m7_cadet", "m7_le_peletier",
    "m7_chaussee_antin", "m3_opera", "m7_pyramides",
    "m1_palais_royal", "m7_pont_neuf", "m1_chatelet",
    "m7_pont_marie", "m7_sully", "m7_jussieu", "m7_place_monge",
    "m7_censier", "m7_gobelins", "m5_place_italie", "m7_tolbiac",
    "m7_maison_blanche"
  ]),
  // Line 7 branch Villejuif
  ...buildLineConnections([
    "m7_maison_blanche", "m7_porte_italie", "m7_kremlin",
    "m7_villejuif_leo", "m7_villejuif_paul_vaillant", "m7_villejuif_aragon"
  ]),
  // Line 7 branch Ivry
  ...buildLineConnections([
    "m7_maison_blanche", "m7_porte_ivry", "m7_pierre_marie_curie", "m7_mairie_ivry"
  ]),
  // Line 7bis (tronc + boucle)
  ...buildLineConnections([
    "m7_louis_blanc", "m2_jaures", "m7b_bolivar", "m7b_buttes_chaumont",
    "m7b_botzaris",
  ]),
  // Boucle Botzaris → Place des Fêtes → Pré-Saint-Gervais → Danube → Botzaris
  ...buildLineConnections([
    "m7b_botzaris", "m11_place_fetes", "m7b_pre_st_gervais",
    "m7b_danube", "m7b_botzaris",
  ]),
  // Line 8
  ...buildLineConnections([
    "m8_balard", "m8_lourmel", "m8_boucicaut", "m8_felix_faure",
    "m8_commerce", "m6_la_motte", "m8_ecole_militaire",
    "m8_la_tour_maubourg", "m8_invalides", "m1_concorde",
    "m8_madeleine", "m3_opera", "m8_richelieu", "m8_grands_boulevards",
    "m8_bonne_nouvelle", "m4_strasbourg_st_denis", "m3_republique",
    "m8_filles_calvaire", "m8_st_sebastien", "m8_chemin_vert",
    "m1_bastille", "m8_ledru_rollin", "m8_faidherbe", "m1_reuilly",
    "m8_montgallet", "m6_daumesnil", "m8_michel_bizot",
    "m8_porte_doree", "m8_porte_charenton", "m8_liberte",
    "m8_charenton_ecoles", "m8_ecole_veterinaire",
    "m8_maisons_alfort_stade", "m8_maisons_alfort_juilliottes",
    "m8_creteil_universite", "m8_creteil_prefecture", "m8_pointe_lac"
  ]),
  // Line 9
  ...buildLineConnections([
    "m9_pont_sevres", "m9_billancourt", "m9_marcel_sembat",
    "m9_porte_st_cloud", "m9_exelmans", "m9_michel_ange_molitor",
    "m9_michel_ange_auteuil", "m9_jasmin", "m9_ranelagh",
    "m9_muette", "m9_rue_pompe", "m6_trocadero", "m9_iena",
    "m9_alma_marceau", "m1_franklin", "m9_st_philippe",
    "m9_miromesnil", "m7_chaussee_antin", "m3_havre_caumartin",
    "m8_richelieu", "m8_grands_boulevards", "m8_bonne_nouvelle",
    "m4_strasbourg_st_denis", "m3_republique", "m5_oberkampf",
    "m9_voltaire", "m9_charonne", "m9_rue_boulets",
    "m9_buzenval", "m9_maraichers", "m9_porte_montreuil",
    "m9_robespierre", "m9_croix_chavaux", "m9_mairie_montreuil"
  ]),
  // Line 10 (tronc est : Gare d'Austerlitz → Javel)
  ...buildLineConnections([
    "m10_gare_austerlitz_l10", "m7_jussieu", "m10_cardinal_lemoine",
    "m10_maubert", "m10_cluny", "m4_odeon", "m10_mabillon",
    "m10_sevres_babylone", "m10_vaneau", "m10_duroc", "m10_segur",
    "m6_la_motte", "m10_avenue_emile_zola", "m10_charles_michels",
    "m10_javel",
  ]),
  // Line 10 terminus : Boulogne Pont de St-Cloud → Boulogne Jean Jaurès
  ...buildLineConnections([
    "m10_boulogne_pont_st_cloud", "m10_boulogne_jean_jaures",
  ]),
  // Line 10 boucle nord : Boulogne Jean Jaurès → Porte d'Auteuil → Michel-Ange Auteuil → Église d'Auteuil → Javel
  ...buildLineConnections([
    "m10_boulogne_jean_jaures", "m10_porte_auteuil",
    "m9_michel_ange_auteuil", "m10_eglise_auteuil", "m10_javel",
  ]),
  // Line 10 boucle sud : Boulogne Jean Jaurès → Michel-Ange Molitor → Chardon Lagache → Mirabeau → Javel
  ...buildLineConnections([
    "m10_boulogne_jean_jaures", "m9_michel_ange_molitor",
    "m10_chardon_lagache", "m10_mirabeau", "m10_javel",
  ]),
  // Line 11
  ...buildLineConnections([
    "m11_chatelet_l11", "m1_hotel_ville", "m11_rambuteau",
    "m3_arts_metiers", "m3_republique", "m11_goncourt",
    "m2_belleville", "m11_pyrennes", "m11_jourdain",
    "m11_place_fetes", "m11_telegraphe", "m11_porte_lilas",
    "m11_mairie_lilas", "m11_serge_gainsbourg", "m11_place_carnot",
    "m11_jean_rostand", "m11_rosny_bois_perrier"
  ]),
  // Line 12
  ...buildLineConnections([
    "m12_aubervilliers_mairie", "m12_front_populaire",
    "m12_porte_chapelle", "m12_marx_dormoy", "m4_marcadet",
    "m12_jules_joffrin", "m12_lamarck", "m12_abbesses",
    "m2_pigalle", "m12_notre_dame_lorette", "m12_trinite",
    "m3_st_lazare", "m8_madeleine", "m1_concorde",
    "m12_assemblee", "m12_solferino", "m12_rue_bac",
    "m10_sevres_babylone", "m12_rennes", "m4_montparnasse",
    "m12_falguiere", "m6_pasteur", "m12_volontaires",
    "m12_vaugirard", "m12_convention", "m12_porte_versailles",
    "m12_corentin_celton", "m12_mairie_issy"
  ]),
  // Line 13 (Châtillon branch)
  ...buildLineConnections([
    "m13_chatillon", "m13_malakoff_plateau", "m13_malakoff_etienne_dolet",
    "m13_porte_vanves", "m13_plaisance", "m13_pernety", "m13_gaite",
    "m4_montparnasse", "m10_duroc", "m8_invalides",
    "m1_champs_elysees", "m9_miromesnil", "m3_st_lazare",
    "m13_liege", "m2_place_clichy", "m13_la_fourche"
  ]),
  // Line 13 Saint-Denis branch
  ...buildLineConnections([
    "m13_la_fourche", "m13_guy_moquet",
    "m13_porte_st_ouen", "m13_garibaldi", "m13_mairie_st_ouen",
    "m13_carrefour_pleyel", "m13_st_denis_porte_paris",
    "m13_basilique", "m13_st_denis_universite"
  ]),
  // Line 13 Asnières branch
  ...buildLineConnections([
    "m13_la_fourche", "m13_brochant", "m13_porte_clichy", "m13_mairie_clichy",
    "m13_gabriel_peri", "m13_les_agnettes", "m13_les_courtilles"
  ]),
  // Line 14
  ...buildLineConnections([
    "m14_st_denis_pleyel", "m14_mairie_st_ouen_l14",
    "m14_pont_cardinet", "m14_st_lazare_l14", "m14_pyramides_l14",
    "m14_chatelet_l14", "m14_gare_lyon_l14", "m6_bercy",
    "m14_cour_st_emilion", "m14_bibliotheque", "m14_olympiades",
    "m14_villejuif_igr", "m14_chevilly_trois_communes",
    "m14_m_i_n_porte_thiais", "m14_aeroport_orly"
  ], 2.5),
  // RER A (tronc commun : La Défense ↔ Vincennes)
  ...buildLineConnections([
    "rera_nanterre_prefecture",
    "m1_la_defense", "rera_auber", "rerb_chatelet_halles",
    "m1_gare_lyon", "rera_vincennes",
  ], 3),
  // RER A branche Saint-Germain (sud-ouest depuis Nanterre-Préfecture)
  ...buildLineConnections([
    "rera_nanterre_prefecture", "rera_nanterre_ville", "rera_rueil",
    "rera_chatou", "rera_vesinet_le_pecq", "rera_vesinet_centre",
    "rera_st_germain",
  ], 3),
  // RER A Nanterre-Préfecture → Sartrouville (nord-ouest)
  ...buildLineConnections([
    "rera_nanterre_prefecture", "rera_houilles", "rera_sartrouville",
    "rera_maisons_laffitte",
  ], 3),
  // RER A branche Poissy (depuis Maisons-Laffitte)
  ...buildLineConnections([
    "rera_maisons_laffitte", "rera_acheres_ville", "rera_poissy",
  ], 3),
  // RER A branche Cergy (depuis Maisons-Laffitte)
  ...buildLineConnections([
    "rera_maisons_laffitte", "rera_conflans", "rera_neuville",
    "rera_cergy_prefecture", "rera_cergy_st_christophe", "rera_cergy",
  ], 4),
  // RER A branche Marne-la-Vallée (nord-est depuis Vincennes)
  ...buildLineConnections([
    "rera_vincennes", "rera_val_fontenay", "rera_neuilly_plaisance",
    "rera_bry", "rera_noisy", "rera_noisy_champs", "rera_marne_vallee",
  ], 3),
  // RER A branche Boissy (sud-est depuis Vincennes)
  ...buildLineConnections([
    "rera_vincennes", "rera_fontenay", "rera_nogent", "rera_joinville",
    "rera_st_maur", "rera_parc_st_maur", "rera_champigny",
    "rera_la_varenne", "rera_sucy", "rera_boissy",
  ], 3),
  // RER B Nord
  ...buildLineConnections([
    "rerb_cdg_airport", "rerb_cdg1", "rerb_parc_expo",
    "rerb_aulnay", "rerb_drancy", "rerb_la_plaine",
    "rerd_stade_france", "rerb_gare_nord", "rerb_chatelet_halles",
    "rerb_st_michel_nd", "rerb_luxembourg", "rerb_port_royal",
    "rerb_denfert_rer", "rerb_cite_universitaire", "rerb_gentilly",
    "rerb_laplace", "rerb_bourg_reine"
  ], 3),
  // RER B branch Robinson
  ...buildLineConnections(["rerb_bourg_reine", "rerb_robinson"], 3),
  // RER B branch Massy
  ...buildLineConnections(["rerb_bourg_reine", "rerb_antony", "rerb_massy", "rerb_orsay"], 4),
  // RER C branche nord (Pontoise → Ermont)
  ...buildLineConnections([
    "rerc_pontoise", "rerc_st_ouen_aumone", "rerc_pierrelaye",
    "rerc_montigny", "rerc_franconville", "rerc_cernay", "rerc_ermont",
  ], 4),
  // RER C arc nord-ouest (Ermont → Champ de Mars)
  ...buildLineConnections([
    "rerc_ermont", "rerc_st_gratien", "rerc_epinay",
    "rerc_gennevilliers", "rerc_gresillons", "rerc_st_ouen",
    "rerc_porte_clichy", "rerc_pereire", "rerc_neuilly_porte_maillot",
    "rerc_avenue_foch", "rerc_avenue_henri_martin",
    "rerc_boulainvilliers", "rerc_ave_president_kennedy", "rerc_champ_mars",
  ], 3),
  // RER C boucle sud-ouest (Versailles Château → Javel → Champ de Mars)
  ...buildLineConnections([
    "rerc_versailles_rg", "rerc_porchefontaine", "rerc_viroflay",
    "rerc_chaville", "rerc_meudon", "rerc_issy",
    "rerc_pont_garigliano", "rerc_javel_rer", "rerc_champ_mars",
  ], 3),
  // RER C branche C7 (Saint-Quentin → Versailles-Chantiers → Porchefontaine)
  ...buildLineConnections([
    "rerc_st_quentin", "rerc_st_cyr", "rerc_versailles_chantiers",
    "rerc_porchefontaine",
  ], 5),
  // RER C tronc central (Champ de Mars → Bibliothèque)
  ...buildLineConnections([
    "rerc_champ_mars", "rerc_pont_alma", "rerc_invalides_rer",
    "rerc_musee_orsay", "rerb_st_michel_nd", "rerc_gare_austerlitz_rer",
    "rerc_bibliotheque_rer",
  ], 2),
  // RER C sud (Bibliothèque → Choisy)
  ...buildLineConnections([
    "rerc_bibliotheque_rer", "rerc_ivry", "rerc_vitry",
    "rerc_ardoines", "rerc_choisy",
  ], 3),
  // RER C branche Juvisy (Choisy → Brétigny)
  ...buildLineConnections([
    "rerc_choisy", "rerc_villeneuve", "rerc_ablon",
    "rerc_athis_mons", "rerc_juvisy", "rerc_savigny",
    "rerc_epinay_orge", "rerc_ste_genevieve",
    "rerc_st_michel_orge", "rerc_bretigny",
  ], 3),
  // RER C branche Massy via Orly (Choisy → Massy-Palaiseau)
  ...buildLineConnections([
    "rerc_choisy", "rerc_les_saules", "rerc_orly_ville",
    "rerc_pont_rungis", "rerc_rungis", "rerc_chemin_antony",
    "rerc_massy_verrieres", "rerb_massy",
  ], 3),
  // RER D
  ...buildLineConnections([
    "rerd_st_denis", "rerd_stade_france", "rerd_gare_nord_rer",
    "rerd_chatelet_halles", "rerd_gare_lyon_rer",
    "rerd_maisons_alfort", "rerd_creteil_pompadour",
    "rerd_villeneuve_st_georges"
  ], 3),
  // RER E (tronc commun ouest → Noisy-le-Sec)
  ...buildLineConnections([
    "rere_nanterre_la_folie", "rere_haussmann", "rere_magenta",
    "rere_rosa_parks", "rere_pantin", "rere_noisy_sec",
  ], 3),
  // RER E branche Chelles (nord depuis Noisy-le-Sec)
  ...buildLineConnections([
    "rere_noisy_sec", "rere_bondy", "rere_le_raincy",
    "rere_gagny", "rere_le_chenay_gagny", "rere_chelles",
  ], 3),
  // RER E branche Tournan (sud depuis Noisy-le-Sec)
  ...buildLineConnections([
    "rere_noisy_sec", "rera_val_fontenay", "rere_villiers_sur_marne",
    "rere_les_yvris", "rere_emerainville", "rere_roissy_en_brie",
    "rere_ozoir", "rere_gretz", "rere_tournan",
  ], 3),
  // All transfers
  ...buildTransfers(),
];
