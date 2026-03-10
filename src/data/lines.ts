// Official Paris metro/RER line colors and station sequences for map rendering
export interface LineDefinition {
  id: string;
  name: string;
  color: string;
  type: 'metro' | 'rer' | 'tram';
  // Each branch is an ordered array of station IDs
  branches: string[][];
}

export const lines: LineDefinition[] = [
  {
    id: "1", name: "Ligne 1", color: "#FFCD00", type: "metro",
    branches: [[
      "m1_la_defense", "m1_esplanade", "m1_pont_neuilly", "m1_sablons",
      "m1_maillot", "m1_argentine", "m1_cdg_etoile", "m1_george_v",
      "m1_franklin", "m1_champs_elysees", "m1_concorde", "m1_tuileries",
      "m1_palais_royal", "m1_louvre", "m1_chatelet", "m1_hotel_ville",
      "m1_st_paul", "m1_bastille", "m1_gare_lyon", "m1_reuilly",
      "m1_nation", "m1_vincennes", "m1_berault", "m1_chateau_vincennes",
    ]],
  },
  {
    id: "2", name: "Ligne 2", color: "#003CA6", type: "metro",
    branches: [[
      "m2_porte_dauphine", "m2_victor_hugo", "m1_cdg_etoile", "m2_ternes",
      "m2_courcelles", "m2_monceau", "m2_villiers", "m2_rome",
      "m2_place_clichy", "m2_blanche", "m2_pigalle", "m2_anvers",
      "m2_barbes", "m2_chapelle", "m2_stalingrad", "m2_jaures",
      "m2_colonel_fabien", "m2_belleville", "m2_couronnes",
      "m2_menilmontant", "m2_pere_lachaise", "m2_philippe_auguste",
      "m2_alexandre_dumas", "m2_avron", "m1_nation",
    ]],
  },
  {
    id: "3", name: "Ligne 3", color: "#837902", type: "metro",
    branches: [[
      "m3_pont_levallois", "m3_anatole_france", "m3_louise_michel",
      "m3_porte_champerret", "m3_pereire", "m3_wagram", "m3_malesherbes",
      "m2_villiers", "m3_europe",
      "m3_st_lazare", "m3_havre_caumartin", "m3_opera",
      "m3_quatre_septembre", "m3_bourse", "m3_sentier", "m3_reaumur",
      "m3_arts_metiers", "m3_temple", "m3_republique", "m3_parmentier",
      "m3_rue_st_maur", "m2_pere_lachaise", "m3_gambetta",
      "m3_porte_bagnolet", "m3_gallieni",
    ]],
  },
  {
    id: "3bis", name: "Ligne 3bis", color: "#6EC4E8", type: "metro",
    branches: [[
      "m3_gambetta", "m3b_pelleport", "m3b_saint_fargeau", "m11_porte_lilas",
    ]],
  },
  {
    id: "4", name: "Ligne 4", color: "#CF009E", type: "metro",
    branches: [[
      "m4_porte_clignancourt", "m4_simplon", "m4_marcadet",
      "m4_chateau_rouge", "m2_barbes", "m4_gare_nord", "m4_gare_est",
      "m4_strasbourg_st_denis", "m3_reaumur", "m4_etienne_marcel",
      "m4_les_halles", "m1_chatelet", "m4_cite", "m4_st_michel",
      "m4_odeon", "m4_st_germain", "m4_st_sulpice", "m4_st_placide",
      "m4_montparnasse", "m4_vavin", "m4_raspail", "m4_denfert",
      "m4_mouton_duvernet", "m4_alesia", "m4_porte_orleans",
      "m4_mairie_montrouge", "m4_bagneux",
    ]],
  },
  {
    id: "5", name: "Ligne 5", color: "#FF7E2E", type: "metro",
    branches: [[
      "m5_bobigny", "m5_bobigny_pantin", "m5_eglise_pantin", "m5_hoche",
      "m5_porte_pantin", "m5_ourcq", "m5_laumiere", "m2_stalingrad",
      "m2_jaures", "m5_jacques_bonsergent", "m3_republique",
      "m5_oberkampf", "m5_richard_lenoir", "m5_breguet_sabin",
      "m1_bastille", "m5_quai_rapee", "m5_gare_austerlitz",
      "m5_st_marcel", "m5_campo_formio", "m5_place_italie",
    ]],
  },
  {
    id: "6", name: "Ligne 6", color: "#6ECA97", type: "metro",
    branches: [[
      "m1_cdg_etoile", "m6_kleber", "m6_boissiere", "m6_trocadero",
      "m6_passy", "m6_bir_hakeim", "m6_dupleix", "m6_la_motte",
      "m6_cambronne", "m6_sevres_lecourbe", "m6_pasteur",
      "m4_montparnasse", "m6_edgar_quinet", "m4_raspail",
      "m4_denfert", "m6_st_jacques", "m6_glaciere", "m6_corvisart",
      "m5_place_italie", "m6_nationale", "m6_chevaleret", "m6_quai_gare",
      "m6_bercy", "m6_dugommier", "m6_daumesnil",
      "m6_bel_air", "m6_picpus", "m1_nation",
    ]],
  },
  {
    id: "7", name: "Ligne 7", color: "#FA9ABA", type: "metro",
    branches: [
      // Main trunk
      [
        "m7_la_courneuve", "m7_fort_aubervilliers", "m7_aubervilliers",
        "m7_porte_villette", "m7_corentin_cariou", "m7_riquet",
        "m2_stalingrad", "m7_louis_blanc", "m7_chateau_landon",
        "m4_gare_est", "m7_poissonniere", "m7_cadet", "m7_le_peletier",
        "m7_chaussee_antin", "m3_opera", "m7_pyramides",
        "m1_palais_royal", "m7_pont_neuf", "m1_chatelet",
        "m7_pont_marie", "m7_sully", "m7_jussieu", "m7_place_monge",
        "m7_censier", "m7_gobelins", "m5_place_italie", "m7_tolbiac",
        "m7_maison_blanche",
      ],
      // Villejuif branch
      [
        "m7_maison_blanche", "m7_porte_italie", "m7_kremlin",
        "m7_villejuif_leo", "m7_villejuif_paul_vaillant", "m7_villejuif_aragon",
      ],
      // Ivry branch
      [
        "m7_maison_blanche", "m7_porte_ivry", "m7_pierre_marie_curie", "m7_mairie_ivry",
      ],
    ],
  },
  {
    id: "7bis", name: "Ligne 7bis", color: "#6ECA97", type: "metro",
    branches: [
      // Tronc Louis Blanc → Botzaris
      ["m7_louis_blanc", "m2_jaures", "m7b_bolivar", "m7b_buttes_chaumont",
       "m7b_botzaris"],
      // Boucle Botzaris → Place des Fêtes → Pré-Saint-Gervais → Danube → Botzaris
      ["m7b_botzaris", "m11_place_fetes", "m7b_pre_st_gervais",
       "m7b_danube", "m7b_botzaris"],
    ],
  },
  {
    id: "8", name: "Ligne 8", color: "#E19BDF", type: "metro",
    branches: [[
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
      "m8_creteil_universite", "m8_creteil_prefecture", "m8_pointe_lac",
    ]],
  },
  {
    id: "9", name: "Ligne 9", color: "#B6BD00", type: "metro",
    branches: [[
      "m9_pont_sevres", "m9_billancourt", "m9_marcel_sembat",
      "m9_porte_st_cloud", "m9_exelmans", "m9_michel_ange_molitor",
      "m9_michel_ange_auteuil", "m9_jasmin", "m9_ranelagh",
      "m9_muette", "m9_rue_pompe", "m6_trocadero", "m9_iena",
      "m9_alma_marceau", "m1_franklin", "m9_st_philippe",
      "m9_miromesnil", "m3_havre_caumartin", "m7_chaussee_antin",
      "m8_richelieu", "m8_grands_boulevards", "m8_bonne_nouvelle",
      "m4_strasbourg_st_denis", "m3_republique", "m5_oberkampf",
      "m9_voltaire", "m9_charonne", "m9_rue_boulets",
      "m9_buzenval", "m9_maraichers", "m9_porte_montreuil",
      "m9_robespierre", "m9_croix_chavaux", "m9_mairie_montreuil",
    ]],
  },
  {
    id: "10", name: "Ligne 10", color: "#C9910D", type: "metro",
    branches: [
      // Tronc est : Gare d'Austerlitz → Javel
      [
        "m10_gare_austerlitz_l10", "m7_jussieu", "m10_cardinal_lemoine",
        "m10_maubert", "m10_cluny", "m4_odeon", "m10_mabillon",
        "m10_sevres_babylone", "m10_vaneau", "m10_duroc", "m10_segur",
        "m6_la_motte", "m10_avenue_emile_zola", "m10_charles_michels",
        "m10_javel",
      ],
      // Terminus : Boulogne Pont de St-Cloud → Boulogne Jean Jaurès
      [
        "m10_boulogne_pont_st_cloud", "m10_boulogne_jean_jaures",
      ],
      // Boucle nord : B. Jean Jaurès → Porte d'Auteuil → Michel-Ange Auteuil → Église d'Auteuil → Javel
      [
        "m10_boulogne_jean_jaures", "m10_porte_auteuil",
        "m9_michel_ange_auteuil", "m10_eglise_auteuil", "m10_javel",
      ],
      // Boucle sud : B. Jean Jaurès → Michel-Ange Molitor → Chardon Lagache → Mirabeau → Javel
      [
        "m10_boulogne_jean_jaures", "m9_michel_ange_molitor",
        "m10_chardon_lagache", "m10_mirabeau", "m10_javel",
      ],
    ],
  },
  {
    id: "11", name: "Ligne 11", color: "#704B1C", type: "metro",
    branches: [[
      "m11_chatelet_l11", "m1_hotel_ville", "m11_rambuteau",
      "m3_arts_metiers", "m3_republique", "m11_goncourt",
      "m2_belleville", "m11_pyrennes", "m11_jourdain",
      "m11_place_fetes", "m11_telegraphe", "m11_porte_lilas",
      "m11_mairie_lilas", "m11_serge_gainsbourg", "m11_place_carnot",
      "m11_jean_rostand", "m11_rosny_bois_perrier",
    ]],
  },
  {
    id: "12", name: "Ligne 12", color: "#007852", type: "metro",
    branches: [[
      "m12_aubervilliers_mairie", "m12_front_populaire",
      "m12_porte_chapelle", "m12_marx_dormoy", "m4_marcadet",
      "m12_jules_joffrin", "m12_lamarck", "m12_abbesses",
      "m2_pigalle", "m12_notre_dame_lorette", "m12_trinite",
      "m3_st_lazare", "m8_madeleine", "m1_concorde",
      "m12_assemblee", "m12_solferino", "m12_rue_bac",
      "m10_sevres_babylone", "m12_rennes", "m4_montparnasse",
      "m12_falguiere", "m6_pasteur", "m12_volontaires",
      "m12_vaugirard", "m12_convention", "m12_porte_versailles",
      "m12_corentin_celton", "m12_mairie_issy",
    ]],
  },
  {
    id: "13", name: "Ligne 13", color: "#6EC4E8", type: "metro",
    branches: [
      // Châtillon → La Fourche
      [
        "m13_chatillon", "m13_malakoff_plateau", "m13_malakoff_etienne_dolet",
        "m13_porte_vanves", "m13_plaisance", "m13_pernety", "m13_gaite",
        "m4_montparnasse", "m10_duroc", "m8_invalides",
        "m1_champs_elysees", "m9_miromesnil", "m3_st_lazare",
        "m13_liege", "m2_place_clichy", "m13_la_fourche",
      ],
      // Saint-Denis branch
      [
        "m13_la_fourche", "m13_guy_moquet",
        "m13_porte_st_ouen", "m13_garibaldi", "m13_mairie_st_ouen",
        "m13_carrefour_pleyel", "m13_st_denis_porte_paris",
        "m13_basilique", "m13_st_denis_universite",
      ],
      // Asnières branch
      [
        "m13_la_fourche", "m13_brochant", "m13_porte_clichy", "m13_mairie_clichy",
        "m13_gabriel_peri", "m13_les_agnettes", "m13_les_courtilles",
      ],
    ],
  },
  {
    id: "14", name: "Ligne 14", color: "#62259D", type: "metro",
    branches: [[
      "m14_st_denis_pleyel", "m14_mairie_st_ouen_l14",
      "m14_pont_cardinet", "m14_st_lazare_l14", "m14_pyramides_l14",
      "m14_chatelet_l14", "m14_gare_lyon_l14", "m6_bercy",
      "m14_cour_st_emilion", "m14_bibliotheque", "m14_olympiades",
      "m14_villejuif_igr", "m14_chevilly_trois_communes",
      "m14_m_i_n_porte_thiais", "m14_aeroport_orly",
    ]],
  },
  {
    id: "RER A", name: "RER A", color: "#E2231A", type: "rer",
    branches: [
      // Tronc commun (Nanterre-Préfecture ↔ Vincennes)
      [
        "rera_nanterre_prefecture",
        "m1_la_defense", "rera_auber", "rerb_chatelet_halles",
        "m1_gare_lyon", "rera_vincennes",
      ],
      // Branche Saint-Germain-en-Laye (sud-ouest)
      [
        "rera_nanterre_prefecture", "rera_nanterre_ville", "rera_rueil",
        "rera_chatou", "rera_vesinet_le_pecq", "rera_vesinet_centre",
        "rera_st_germain",
      ],
      // Nanterre-Préf → Maisons-Laffitte
      [
        "rera_nanterre_prefecture", "rera_houilles", "rera_sartrouville",
        "rera_maisons_laffitte",
      ],
      // Branche Poissy (depuis Maisons-Laffitte)
      [
        "rera_maisons_laffitte", "rera_acheres_ville", "rera_poissy",
      ],
      // Branche Cergy-Le Haut (depuis Maisons-Laffitte)
      [
        "rera_maisons_laffitte", "rera_conflans", "rera_neuville",
        "rera_cergy_prefecture", "rera_cergy_st_christophe", "rera_cergy",
      ],
      // Branche Marne-la-Vallée (nord-est)
      [
        "rera_vincennes", "rera_val_fontenay", "rera_neuilly_plaisance",
        "rera_bry", "rera_noisy", "rera_noisy_champs", "rera_marne_vallee",
      ],
      // Branche Boissy-Saint-Léger (sud-est)
      [
        "rera_vincennes", "rera_fontenay", "rera_nogent", "rera_joinville",
        "rera_st_maur", "rera_parc_st_maur", "rera_champigny",
        "rera_la_varenne", "rera_sucy", "rera_boissy",
      ],
    ],
  },
  {
    id: "RER B", name: "RER B", color: "#7BA3DC", type: "rer",
    branches: [
      [
        "rerb_cdg_airport", "rerb_cdg1", "rerb_parc_expo",
        "rerb_aulnay", "rerb_drancy", "rerb_la_plaine",
        "rerd_stade_france", "rerb_gare_nord", "rerb_chatelet_halles",
        "rerb_st_michel_nd", "rerb_luxembourg", "rerb_port_royal",
        "rerb_denfert_rer", "rerb_cite_universitaire", "rerb_gentilly",
        "rerb_laplace", "rerb_bourg_reine",
      ],
      ["rerb_bourg_reine", "rerb_robinson"],
      ["rerb_bourg_reine", "rerb_antony", "rerb_massy", "rerb_orsay"],
    ],
  },
  {
    id: "RER C", name: "RER C", color: "#FFCD00", type: "rer",
    branches: [
      // Branche nord (Pontoise → Ermont)
      [
        "rerc_pontoise", "rerc_st_ouen_aumone", "rerc_pierrelaye",
        "rerc_montigny", "rerc_franconville", "rerc_cernay", "rerc_ermont",
      ],
      // Arc nord-ouest (Ermont → Champ de Mars)
      [
        "rerc_ermont", "rerc_st_gratien", "rerc_epinay",
        "rerc_gennevilliers", "rerc_gresillons", "rerc_st_ouen",
        "rerc_porte_clichy", "rerc_pereire", "rerc_neuilly_porte_maillot",
        "rerc_avenue_foch", "rerc_avenue_henri_martin",
        "rerc_boulainvilliers", "rerc_ave_president_kennedy", "rerc_champ_mars",
      ],
      // Boucle sud-ouest (Versailles Château → Javel → Champ de Mars)
      [
        "rerc_versailles_rg", "rerc_porchefontaine", "rerc_viroflay",
        "rerc_chaville", "rerc_meudon", "rerc_issy",
        "rerc_pont_garigliano", "rerc_javel_rer", "rerc_champ_mars",
      ],
      // C7 (Saint-Quentin → Versailles-Chantiers → Porchefontaine)
      [
        "rerc_st_quentin", "rerc_st_cyr", "rerc_versailles_chantiers",
        "rerc_porchefontaine",
      ],
      // Tronc central (Champ de Mars → Bibliothèque)
      [
        "rerc_champ_mars", "rerc_pont_alma", "rerc_invalides_rer",
        "rerc_musee_orsay", "rerb_st_michel_nd", "rerc_gare_austerlitz_rer",
        "rerc_bibliotheque_rer",
      ],
      // Sud (Bibliothèque → Choisy)
      [
        "rerc_bibliotheque_rer", "rerc_ivry", "rerc_vitry",
        "rerc_ardoines", "rerc_choisy",
      ],
      // Branche Juvisy (Choisy → Brétigny)
      [
        "rerc_choisy", "rerc_villeneuve", "rerc_ablon",
        "rerc_athis_mons", "rerc_juvisy", "rerc_savigny",
        "rerc_epinay_orge", "rerc_ste_genevieve",
        "rerc_st_michel_orge", "rerc_bretigny",
      ],
      // Branche Massy via Orly (Choisy → Massy)
      [
        "rerc_choisy", "rerc_les_saules", "rerc_orly_ville",
        "rerc_pont_rungis", "rerc_rungis", "rerc_chemin_antony",
        "rerc_massy_verrieres", "rerb_massy",
      ],
    ],
  },
  {
    id: "RER D", name: "RER D", color: "#00814F", type: "rer",
    branches: [[
      "rerd_st_denis", "rerd_stade_france", "rerd_gare_nord_rer",
      "rerd_chatelet_halles", "rerd_gare_lyon_rer",
      "rerd_maisons_alfort", "rerd_creteil_pompadour",
      "rerd_villeneuve_st_georges",
    ]],
  },
  {
    id: "RER E", name: "RER E", color: "#CF76C8", type: "rer",
    branches: [
      // Tronc commun ouest → Noisy-le-Sec
      [
        "rere_nanterre_la_folie", "rere_haussmann", "rere_magenta",
        "rere_rosa_parks", "rere_pantin", "rere_noisy_sec",
      ],
      // Branche Chelles (nord)
      [
        "rere_noisy_sec", "rere_bondy", "rere_le_raincy",
        "rere_gagny", "rere_le_chenay_gagny", "rere_chelles",
      ],
      // Branche Tournan (sud)
      [
        "rere_noisy_sec", "rera_val_fontenay", "rere_villiers_sur_marne",
        "rere_les_yvris", "rere_emerainville", "rere_roissy_en_brie",
        "rere_ozoir", "rere_gretz", "rere_tournan",
      ],
    ],
  },
  // === TRAMWAY LINES ===
  {
    id: "T1", name: "Tramway T1", color: "#0064B0", type: "tram",
    branches: [[
      "t1_courtilles", "t1_le_luth", "t1_le_village", "t1_timbaud",
      "t1_gare_gennevilliers", "t1_parc_chanteraines", "t1_chemin_reniers",
      "t1_la_noue", "t1_mairie_villeneuve", "t1_ile_saint_denis",
      "t1_gare_saint_denis", "t1_theatre_gerard_philipe", "t1_marche_saint_denis",
      "t1_basilique_saint_denis", "t1_cimetiere_saint_denis", "t1_hopital_delafontaine",
      "t1_cosmonautes", "t1_courneuve_six_routes", "t1_hdv_courneuve",
      "t1_stade_geo_andre", "t1_danton", "t1_courneuve_8_mai",
      "t1_maurice_lachatre", "t1_drancy_avenir", "t1_hopital_avicenne",
      "t1_gaston_roulaud", "t1_escadrille", "t1_la_ferme",
      "t1_liberation", "t1_hdv_bobigny", "t1_bobigny_picasso",
      "t1_jean_rostand", "t1_auguste_delaune", "t1_pont_bondy",
      "t1_petit_noisy", "t1_gare_noisy",
    ]],
  },
  {
    id: "T2", name: "Tramway T2", color: "#CF5DAD", type: "tram",
    branches: [[
      "t2_pont_bezons", "t2_parc_lagravere", "t2_victor_basch",
      "t2_jacqueline_auriol", "t2_charlebourg", "t2_les_fauvelles",
      "t2_faubourg_arche", "t2_la_defense", "t2_puteaux",
      "t2_belvedere", "t2_suresnes_longchamp", "t2_les_coteaux",
      "t2_les_milons", "t2_parc_st_cloud", "t2_musee_sevres",
      "t2_brimborion", "t2_meudon_sur_seine", "t2_les_moulineaux",
      "t2_lartigue", "t2_issy_val_seine", "t2_henri_farman",
      "t2_suzanne_lenglen", "t2_porte_issy", "t2_porte_versailles",
    ]],
  },
  {
    id: "T3a", name: "Tramway T3a", color: "#F28E42", type: "tram",
    branches: [[
      "t3a_pont_garigliano", "t3a_balard", "t3a_desnouettes",
      "t3a_porte_versailles", "t3a_georges_brassens", "t3a_brancion",
      "t3a_porte_vanves", "t3a_didot", "t3a_jean_moulin",
      "t3a_porte_orleans", "t3a_montsouris", "t3a_cite_universitaire",
      "t3a_stade_charlety", "t3a_poterne_peupliers", "t3a_porte_italie",
      "t3a_porte_choisy", "t3a_porte_ivry", "t3a_maryse_bastie",
      "t3a_avenue_france", "t3a_baron_le_roy", "t3a_porte_charenton",
      "t3a_porte_doree", "t3a_montempoivre", "t3a_alexandra_david_neel",
      "t3a_porte_vincennes",
    ]],
  },
  {
    id: "T3b", name: "Tramway T3b", color: "#00814F", type: "tram",
    branches: [[
      "t3b_porte_vincennes", "t3b_porte_montreuil", "t3b_marie_miribel",
      "t3b_porte_bagnolet", "t3b_severine", "t3b_adrienne_bolland",
      "t3b_porte_lilas", "t3b_hopital_robert_debre", "t3b_butte_chapeau_rouge",
      "t3b_porte_pantin", "t3b_delphine_seyrig", "t3b_ella_fitzgerald",
      "t3b_porte_villette", "t3b_canal_saint_denis", "t3b_rosa_parks",
      "t3b_porte_aubervilliers", "t3b_colette_besson", "t3b_porte_chapelle",
      "t3b_diane_arbus", "t3b_porte_clignancourt", "t3b_angelique_compoint",
      "t3b_porte_saint_ouen", "t3b_epinettes_pouchet", "t3b_honore_balzac",
      "t3b_porte_clichy", "t3b_marguerite_long", "t3b_square_ste_odile",
      "t3b_porte_champerret", "t3b_therese_pierre", "t3b_anny_flore",
      "t3b_porte_maillot", "t3b_anna_noailles", "t3b_porte_dauphine",
    ]],
  },
  {
    id: "T4", name: "Tramway T4", color: "#F2A1B3", type: "tram",
    branches: [
      // Bondy → Aulnay
      [
        "t4_bondy", "t4_remise_jorelle", "t4_coquetiers", "t4_allee_tour",
        "t4_pavillons_bois", "t4_gargan", "t4_lycee_sellier", "t4_abbaye",
        "t4_freinville", "t4_henri_iv", "t4_rougemont_chanteloup", "t4_aulnay",
      ],
      // Gargan → Montfermeil
      [
        "t4_gargan", "t4_republique_marx_dormoy", "t4_leon_blum",
        "t4_maurice_audin", "t4_clichy_mairie", "t4_romain_rolland",
        "t4_clichy_montfermeil", "t4_notre_dame_anges", "t4_arboretum",
        "t4_hopital_montfermeil",
      ],
    ],
  },
  {
    id: "T5", name: "Tramway T5", color: "#6E491E", type: "tram",
    branches: [[
      "t5_marche_saint_denis", "t5_baudelaire", "t5_roger_semat",
      "t5_guynemer", "t5_petit_pierrefitte", "t5_joncherolles",
      "t5_suzanne_valadon", "t5_mairie_pierrefitte", "t5_alcide_orbigny",
      "t5_jacques_prevert", "t5_butte_pinson", "t5_les_cholettes",
      "t5_les_flanades", "t5_paul_valery", "t5_locheres", "t5_garges_sarcelles",
    ]],
  },
  {
    id: "T6", name: "Tramway T6", color: "#E4003A", type: "tram",
    branches: [[
      "t6_chatillon_montrouge", "t6_vauban", "t6_centre_chatillon",
      "t6_parc_andre_malraux", "t6_division_leclerc", "t6_soleil_levant",
      "t6_hopital_beclere", "t6_mail_plaine", "t6_pave_blanc",
      "t6_georges_pompidou", "t6_georges_millandy", "t6_meudon_la_foret",
      "t6_velizy_2", "t6_dewoitine", "t6_inovel_parc_nord", "t6_louvois",
      "t6_mairie_velizy", "t6_onde", "t6_robert_wagner",
      "t6_viroflay_rg", "t6_viroflay_rd",
    ]],
  },
  {
    id: "T7", name: "Tramway T7", color: "#6E491E", type: "tram",
    branches: [[
      "t7_villejuif_aragon", "t7_lamartine", "t7_domaine_cherioux",
      "t7_moulin_vert", "t7_bretagne", "t7_auguste_perret",
      "t7_chevilly_larue", "t7_belle_epine", "t7_place_logistique",
      "t7_porte_rungis", "t7_saarinen", "t7_robert_schuman",
      "t7_la_fraternelle", "t7_helene_boucher", "t7_caroline_aigle",
      "t7_coeur_orly", "t7_aeroport_orly", "t7_porte_essonne",
    ]],
  },
  {
    id: "T8", name: "Tramway T8", color: "#837902", type: "tram",
    branches: [
      // Épinay-Orgemont → Saint-Denis Porte de Paris
      [
        "t8_epinay_orgemont", "t8_epinay_gare", "t8_gilbert_bonnemaison",
        "t8_lacepede", "t8_rose_bertin", "t8_les_beatus", "t8_les_mobiles",
        "t8_blumenthal", "t8_delaunay_belleville", "t8_paul_eluard",
        "t8_saint_denis_gare", "t8_pierre_de_geyter", "t8_saint_denis_porte_paris",
      ],
      // Villetaneuse-Université → Saint-Denis (joining at Delaunay-Belleville)
      [
        "t8_villetaneuse_universite", "t8_pablo_neruda", "t8_jean_vilar",
        "t8_cesar", "t8_delaunay_belleville",
      ],
    ],
  },
  {
    id: "T9", name: "Tramway T9", color: "#0064B0", type: "tram",
    branches: [[
      "t9_porte_choisy", "t9_chateaudun_barbes", "t9_cimetiere_ivry",
      "t9_germaine_tailleferre", "t9_la_briqueterie",
      "t9_beethoven_concorde", "t9_musee_mac_val", "t9_mairie_vitry",
      "t9_camille_groult", "t9_constant_coquelin", "t9_watteau_rondenay",
      "t9_trois_communes", "t9_verdun_hoche", "t9_rouget_lisle",
      "t9_carle_darthe", "t9_four_peary", "t9_orly_gaston_viens",
      "t9_christophe_colomb", "t9_les_saules",
    ]],
  },
  {
    id: "T10", name: "Tramway T10", color: "#837902", type: "tram",
    branches: [[
      "t10_croix_berny", "t10_la_vallee", "t10_petit_chatenay",
      "t10_theatre_piscine", "t10_les_peintres", "t10_cite_jardin",
      "t10_vallee_aux_loups", "t10_malabry", "t10_noveos",
      "t10_parc_sports", "t10_le_hameau", "t10_hopital_beclere",
      "t10_jardin_parisien",
    ]],
  },
  {
    id: "T11", name: "Tramway T11", color: "#F28E42", type: "tram",
    branches: [[
      "t11_epinay_sur_seine", "t11_epinay_villetaneuse", "t11_villetaneuse_universite",
      "t11_pierrefitte_stains", "t11_stains_cerisaie", "t11_dugny_courneuve",
      "t11_le_bourget",
    ]],
  },
  {
    id: "T13", name: "Tramway T13", color: "#00814F", type: "tram",
    branches: [[
      "t13_saint_germain", "t13_camp_loges", "t13_lisiere_pereire",
      "t13_fourqueux", "t13_mareil_marly", "t13_etang_sablons",
      "t13_saint_nom_breteche", "t13_noisy_roi", "t13_bailly",
      "t13_allee_royale", "t13_portes_saint_cyr", "t13_saint_cyr",
    ]],
  },
];
