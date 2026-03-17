import type { Station, Connection } from '../../types';

export type { Station, Connection };

export const stations: Station[] = [
  // =============================================
  // SHARED STATIONS (U-Bahn + S-Bahn)
  // Using U-Bahn coordinates for central stations
  // =============================================
  { id: "alexanderplatz", name: "Alexanderplatz", lat: 52.5215849, lng: 13.4139082, lines: ["U2", "U5", "U8", "S3", "S5", "S7", "S9"] },
  { id: "bundesplatz", name: "Bundesplatz", lat: 52.4776476, lng: 13.3285001, lines: ["U9", "S41", "S46"] },
  { id: "frankfurter_allee", name: "Frankfurter Allee", lat: 52.5136227, lng: 13.4754364, lines: ["U5", "S8", "S85", "S41"] },
  { id: "friedrichstrasse", name: "Friedrichstraße", lat: 52.5202635, lng: 13.3882862, lines: ["U6", "S1", "S2", "S25", "S26", "S3", "S5", "S7", "S9"] },
  { id: "gesundbrunnen", name: "Gesundbrunnen", lat: 52.5488223, lng: 13.3883057, lines: ["U8", "S1", "S2", "S25", "S26", "S41"] },
  { id: "hauptbahnhof", name: "Hauptbahnhof", lat: 52.5252819, lng: 13.3701242, lines: ["U5", "S3", "S5", "S7", "S9"] },
  { id: "heidelberger_platz", name: "Heidelberger Platz", lat: 52.4797961, lng: 13.3128835, lines: ["U3", "S41", "S46"] },
  { id: "hermannstrasse", name: "Hermannstraße", lat: 52.4672622, lng: 13.4314659, lines: ["U8", "S41", "S46", "S47"] },
  { id: "innsbrucker_platz", name: "Innsbrucker Platz", lat: 52.4789870, lng: 13.3436736, lines: ["U4", "S41", "S46"] },
  { id: "jannowitzbruecke", name: "Jannowitzbrücke", lat: 52.5153554, lng: 13.4181732, lines: ["U8", "S3", "S5", "S7", "S9"] },
  { id: "jungfernheide", name: "Jungfernheide", lat: 52.5307879, lng: 13.3006301, lines: ["U7", "S41"] },
  { id: "karl_bonhoeffer_nervenklinik", name: "Karl-Bonhoeffer-Nervenklinik", lat: 52.5786231, lng: 13.3335031, lines: ["U8", "S25"] },
  { id: "lichtenberg", name: "Lichtenberg", lat: 52.5111151, lng: 13.4986022, lines: ["U5", "S5", "S7", "S75"] },
  { id: "neukoelln", name: "Neukölln", lat: 52.4685956, lng: 13.4418203, lines: ["U7", "S41", "S46", "S47"] },
  { id: "pankow", name: "Pankow", lat: 52.5667800, lng: 13.4117203, lines: ["U2", "S2", "S8", "S26", "S85"] },
  { id: "rathaus_steglitz", name: "Rathaus Steglitz", lat: 52.4567983, lng: 13.3209344, lines: ["U9", "S1"] },
  { id: "schoenhauser_allee", name: "Schönhauser Allee", lat: 52.5494885, lng: 13.4137114, lines: ["U2", "S8", "S85", "S41"] },
  { id: "tempelhof", name: "Tempelhof", lat: 52.4695462, lng: 13.3856268, lines: ["U6", "S41", "S46", "S47"] },
  { id: "warschauer_strasse", name: "Warschauer Straße", lat: 52.5050140, lng: 13.4490065, lines: ["U1", "U3", "S3", "S5", "S7", "S9", "S75"] },
  { id: "wedding", name: "Wedding", lat: 52.5430625, lng: 13.3650375, lines: ["U6", "S41"] },
  { id: "westhafen", name: "Westhafen", lat: 52.5367350, lng: 13.3425741, lines: ["U9", "S41"] },
  { id: "wittenau", name: "Wittenau", lat: 52.5956412, lng: 13.3347115, lines: ["U8", "S1", "S85"] },
  { id: "wuhletal", name: "Wuhletal", lat: 52.5126122, lng: 13.5752134, lines: ["U5", "S5"] },
  { id: "yorckstrasse", name: "Yorckstraße", lat: 52.4929715, lng: 13.3706891, lines: ["U7", "S1", "S2", "S25", "S26"] },
  { id: "zoologischer_garten", name: "Zoologischer Garten", lat: 52.5058669, lng: 13.3330236, lines: ["U2", "U9", "S3", "S5", "S7", "S9"] },

  // =============================================
  // U-BAHN ONLY STATIONS
  // =============================================
  { id: "u_adenauerplatz", name: "Adenauerplatz", lat: 52.5000028, lng: 13.3073226, lines: ["U7"] },
  { id: "u_afrikanische_strasse", name: "Afrikanische Straße", lat: 52.5602382, lng: 13.3346178, lines: ["U6"] },
  { id: "u_alt_mariendorf", name: "Alt-Mariendorf", lat: 52.4396754, lng: 13.3875138, lines: ["U6"] },
  { id: "u_alt_tempelhof", name: "Alt-Tempelhof", lat: 52.4655217, lng: 13.3856299, lines: ["U6"] },
  { id: "u_alt_tegel", name: "Alt-Tegel", lat: 52.5894565, lng: 13.2837514, lines: ["U6"] },
  { id: "u_altstadt_spandau", name: "Altstadt Spandau", lat: 52.5388381, lng: 13.2062573, lines: ["U7"] },
  { id: "u_amrumer_strasse", name: "Amrumer Straße", lat: 52.5423332, lng: 13.3501546, lines: ["U9"] },
  { id: "u_anton_wilhelm_amo_strasse", name: "Anton-Wilhelm-Amo-Straße", lat: 52.5117915, lng: 13.3850915, lines: ["U2"] },
  { id: "u_augsburger_strasse", name: "Augsburger Straße", lat: 52.5004423, lng: 13.3364644, lines: ["U3"] },
  { id: "u_bayerischer_platz", name: "Bayerischer Platz", lat: 52.4885755, lng: 13.3405436, lines: ["U4", "U7"] },
  { id: "u_berliner_strasse", name: "Berliner Straße", lat: 52.4873298, lng: 13.3310103, lines: ["U7", "U9"] },
  { id: "u_bernauer_strasse", name: "Bernauer Straße", lat: 52.5374381, lng: 13.3966175, lines: ["U8"] },
  { id: "u_biesdorf_sued", name: "Biesdorf-Süd", lat: 52.4996047, lng: 13.5465321, lines: ["U5"] },
  { id: "u_birkenstrasse", name: "Birkenstraße", lat: 52.5323818, lng: 13.3413533, lines: ["U9"] },
  { id: "u_bismarckstrasse", name: "Bismarckstraße", lat: 52.5115148, lng: 13.3052393, lines: ["U2", "U7"] },
  { id: "u_blaschkoallee", name: "Blaschkoallee", lat: 52.4520801, lng: 13.4492022, lines: ["U7"] },
  { id: "u_blissestrasse", name: "Blissestraße", lat: 52.4864895, lng: 13.3205449, lines: ["U7"] },
  { id: "u_boddinstrasse", name: "Boddinstraße", lat: 52.4801685, lng: 13.4252810, lines: ["U8"] },
  { id: "u_brandenburger_tor", name: "Brandenburger Tor", lat: 52.5166047, lng: 13.3809897, lines: ["U5"] },
  { id: "u_breitenbachplatz", name: "Breitenbachplatz", lat: 52.4670266, lng: 13.3088711, lines: ["U3"] },
  { id: "u_britz_sued", name: "Britz-Süd", lat: 52.4377918, lng: 13.4481868, lines: ["U7"] },
  { id: "u_buelowstrasse", name: "Bülowstraße", lat: 52.4975858, lng: 13.3632209, lines: ["U2"] },
  { id: "u_bundestag", name: "Bundestag", lat: 52.5201123, lng: 13.3729545, lines: ["U5"] },
  { id: "u_cottbusser_platz", name: "Cottbusser Platz", lat: 52.5338331, lng: 13.5964015, lines: ["U5"] },
  { id: "u_dahlem_dorf", name: "Dahlem-Dorf", lat: 52.4574096, lng: 13.2897049, lines: ["U3"] },
  { id: "u_deutsche_oper", name: "Deutsche Oper", lat: 52.5118370, lng: 13.3105328, lines: ["U2"] },
  { id: "u_eberswalder_strasse", name: "Eberswalder Straße", lat: 52.5415154, lng: 13.4121769, lines: ["U2"] },
  { id: "u_eisenacher_strasse", name: "Eisenacher Straße", lat: 52.4895529, lng: 13.3501694, lines: ["U7"] },
  { id: "u_elsterwerdaer_platz", name: "Elsterwerdaer Platz", lat: 52.5052929, lng: 13.5608780, lines: ["U5"] },
  { id: "u_ernst_reuter_platz", name: "Ernst-Reuter-Platz", lat: 52.5118853, lng: 13.3221613, lines: ["U2"] },
  { id: "u_fehrbelliner_platz", name: "Fehrbelliner Platz", lat: 52.4902993, lng: 13.3148438, lines: ["U3", "U7"] },
  { id: "u_frankfurter_tor", name: "Frankfurter Tor", lat: 52.5158180, lng: 13.4539745, lines: ["U5"] },
  { id: "u_franz_neumann_platz", name: "Franz-Neumann-Platz", lat: 52.5645392, lng: 13.3639236, lines: ["U8"] },
  { id: "u_freie_universitaet", name: "Freie Universität (Thielplatz)", lat: 52.4510388, lng: 13.2817440, lines: ["U3"] },
  { id: "u_friedrichsfelde", name: "Friedrichsfelde", lat: 52.5061644, lng: 13.5128387, lines: ["U5"] },
  { id: "u_friedrich_wilhelm_platz", name: "Friedrich-Wilhelm-Platz", lat: 52.4721217, lng: 13.3287301, lines: ["U9"] },
  { id: "u_gleisdreieck", name: "Gleisdreieck", lat: 52.4995261, lng: 13.3740318, lines: ["U1", "U2"] },
  { id: "u_gneisenaustrasse", name: "Gneisenaustraße", lat: 52.4912895, lng: 13.3958247, lines: ["U7"] },
  { id: "u_goerlitzer_bahnhof", name: "Görlitzer Bahnhof", lat: 52.4992628, lng: 13.4280355, lines: ["U1", "U3"] },
  { id: "u_grenzallee", name: "Grenzallee", lat: 52.4628825, lng: 13.4447716, lines: ["U7"] },
  { id: "u_guentzelstrasse", name: "Güntzelstraße", lat: 52.4920843, lng: 13.3310064, lines: ["U9"] },
  { id: "u_halemweg", name: "Halemweg", lat: 52.5366262, lng: 13.2861036, lines: ["U7"] },
  { id: "u_hallesches_tor", name: "Hallesches Tor", lat: 52.4977596, lng: 13.3906496, lines: ["U1", "U3", "U6"] },
  { id: "u_hansaplatz", name: "Hansaplatz", lat: 52.5180080, lng: 13.3420365, lines: ["U9"] },
  { id: "u_haselhorst", name: "Haselhorst", lat: 52.5387183, lng: 13.2330942, lines: ["U7"] },
  { id: "u_hausvogteiplatz", name: "Hausvogteiplatz", lat: 52.5133502, lng: 13.3955910, lines: ["U2"] },
  { id: "u_heinrich_heine_strasse", name: "Heinrich-Heine-Straße", lat: 52.5104484, lng: 13.4160272, lines: ["U8"] },
  { id: "u_hellersdorf", name: "Hellersdorf", lat: 52.5366883, lng: 13.6066720, lines: ["U5"] },
  { id: "u_hermannplatz", name: "Hermannplatz", lat: 52.4862857, lng: 13.4245531, lines: ["U7", "U8"] },
  { id: "u_hohenzollernplatz", name: "Hohenzollernplatz", lat: 52.4940847, lng: 13.3247547, lines: ["U3"] },
  { id: "u_hoenow", name: "Hönow", lat: 52.5384335, lng: 13.6331230, lines: ["U5"] },
  { id: "u_jakob_kaiser_platz", name: "Jakob-Kaiser-Platz", lat: 52.5362794, lng: 13.2933009, lines: ["U7"] },
  { id: "u_johannisthaler_chaussee", name: "Johannisthaler Chaussee", lat: 52.4293213, lng: 13.4533376, lines: ["U7"] },
  { id: "u_kaiserdamm", name: "Kaiserdamm", lat: 52.5100921, lng: 13.2831263, lines: ["U2"] },
  { id: "u_kaiserin_augusta_strasse", name: "Kaiserin-Augusta-Straße", lat: 52.4599764, lng: 13.3846346, lines: ["U6"] },
  { id: "u_karl_marx_strasse", name: "Karl-Marx-Straße", lat: 52.4762696, lng: 13.4393375, lines: ["U7"] },
  { id: "u_kaulsdorf_nord", name: "Kaulsdorf-Nord", lat: 52.5211535, lng: 13.5889176, lines: ["U5"] },
  { id: "u_kienberg", name: "Kienberg (Gärten der Welt)", lat: 52.5286152, lng: 13.5906369, lines: ["U5"] },
  { id: "u_kleistpark", name: "Kleistpark", lat: 52.4903665, lng: 13.3602198, lines: ["U7"] },
  { id: "u_klosterstrasse", name: "Klosterstraße", lat: 52.5172347, lng: 13.4124323, lines: ["U2"] },
  { id: "u_kochstrasse", name: "Kochstraße/Checkpoint Charlie", lat: 52.5060447, lng: 13.3906125, lines: ["U6"] },
  { id: "u_konstanzer_strasse", name: "Konstanzer Straße", lat: 52.4945315, lng: 13.3090745, lines: ["U7"] },
  { id: "u_kottbusser_tor", name: "Kottbusser Tor", lat: 52.4989853, lng: 13.4183107, lines: ["U1", "U3", "U8"] },
  { id: "u_krumme_lanke", name: "Krumme Lanke", lat: 52.4434481, lng: 13.2413921, lines: ["U3"] },
  { id: "u_kurfuerstendamm", name: "Kurfürstendamm", lat: 52.5038223, lng: 13.3314365, lines: ["U1", "U9"] },
  { id: "u_kurfuerstenstrasse", name: "Kurfürstenstraße", lat: 52.4999599, lng: 13.3619411, lines: ["U1"] },
  { id: "u_kurt_schumacher_platz", name: "Kurt-Schumacher-Platz", lat: 52.5632274, lng: 13.3271290, lines: ["U6"] },
  { id: "u_leinestrasse", name: "Leinestraße", lat: 52.4729787, lng: 13.4283545, lines: ["U8"] },
  { id: "u_leopoldplatz", name: "Leopoldplatz", lat: 52.5463833, lng: 13.3591672, lines: ["U6", "U9"] },
  { id: "u_lindauer_allee", name: "Lindauer Allee", lat: 52.5754161, lng: 13.3384251, lines: ["U8"] },
  { id: "u_lipschitzallee", name: "Lipschitzallee", lat: 52.4246425, lng: 13.4626984, lines: ["U7"] },
  { id: "u_louis_lewin_strasse", name: "Louis-Lewin-Straße", lat: 52.5389770, lng: 13.6183463, lines: ["U5"] },
  { id: "u_magdalenenstrasse", name: "Magdalenenstraße (Campus für Demokratie)", lat: 52.5124541, lng: 13.4870792, lines: ["U5"] },
  { id: "u_maerkisches_museum", name: "Märkisches Museum", lat: 52.5123348, lng: 13.4101754, lines: ["U2"] },
  { id: "u_mehringdamm", name: "Mehringdamm", lat: 52.4941308, lng: 13.3886168, lines: ["U6", "U7"] },
  { id: "u_mendelssohn_bartholdy_park", name: "Mendelssohn-Bartholdy-Park", lat: 52.5037240, lng: 13.3748605, lines: ["U2"] },
  { id: "u_mierendorffplatz", name: "Mierendorffplatz", lat: 52.5263437, lng: 13.3047721, lines: ["U7"] },
  { id: "u_moeckernbruecke", name: "Möckernbrücke", lat: 52.4986927, lng: 13.3831230, lines: ["U1", "U3", "U7"] },
  { id: "u_moritzplatz", name: "Moritzplatz", lat: 52.5036623, lng: 13.4107479, lines: ["U8"] },
  { id: "u_museumsinsel", name: "Museumsinsel", lat: 52.5172626, lng: 13.3988844, lines: ["U5"] },
  { id: "u_naturkundemuseum", name: "Naturkundemuseum", lat: 52.5312724, lng: 13.3821605, lines: ["U6"] },
  { id: "u_nauener_platz", name: "Nauener Platz", lat: 52.5514056, lng: 13.3671696, lines: ["U9"] },
  { id: "u_neu_westend", name: "Neu-Westend", lat: 52.5162154, lng: 13.2592357, lines: ["U2"] },
  { id: "u_nollendorfplatz", name: "Nollendorfplatz", lat: 52.4995972, lng: 13.3537297, lines: ["U1", "U2", "U3", "U4"] },
  { id: "u_olympia_stadion", name: "Olympia-Stadion", lat: 52.5168643, lng: 13.2504479, lines: ["U2"] },
  { id: "u_onkel_toms_huette", name: "Onkel Toms Hütte", lat: 52.4498912, lng: 13.2530752, lines: ["U3"] },
  { id: "u_oranienburger_tor", name: "Oranienburger Tor", lat: 52.5255998, lng: 13.3873583, lines: ["U6"] },
  { id: "u_oskar_helene_heim", name: "Oskar-Helene-Heim", lat: 52.4503608, lng: 13.2690711, lines: ["U3"] },
  { id: "u_osloer_strasse", name: "Osloer Straße", lat: 52.5571597, lng: 13.3732715, lines: ["U8", "U9"] },
  { id: "u_otisstrasse", name: "Otisstraße", lat: 52.5710338, lng: 13.3029254, lines: ["U6"] },
  { id: "u_pankstrasse", name: "Pankstraße", lat: 52.5522617, lng: 13.3814583, lines: ["U8"] },
  { id: "u_paracelsus_bad", name: "Paracelsus-Bad", lat: 52.5742433, lng: 13.3485110, lines: ["U8"] },
  { id: "u_paradestrasse", name: "Paradestraße", lat: 52.4780189, lng: 13.3862561, lines: ["U6"] },
  { id: "u_parchimer_allee", name: "Parchimer Allee", lat: 52.4447743, lng: 13.4495999, lines: ["U7"] },
  { id: "u_paulsternstrasse", name: "Paulsternstraße", lat: 52.5379819, lng: 13.2478176, lines: ["U7"] },
  { id: "u_platz_der_luftbruecke", name: "Platz der Luftbrücke", lat: 52.4860843, lng: 13.3859508, lines: ["U6"] },
  { id: "u_podbielskiallee", name: "Podbielskiallee", lat: 52.4641033, lng: 13.2957519, lines: ["U3"] },
  { id: "u_potsdamer_platz", name: "Potsdamer Platz", lat: 52.5091586, lng: 13.3782147, lines: ["U2"] },
  { id: "u_prinzenstrasse", name: "Prinzenstraße", lat: 52.4983972, lng: 13.4059100, lines: ["U1", "U3"] },
  { id: "u_rathaus_neukoelln", name: "Rathaus Neukölln", lat: 52.4816522, lng: 13.4341793, lines: ["U7"] },
  { id: "u_rathaus_reinickendorf", name: "Rathaus Reinickendorf", lat: 52.5884057, lng: 13.3257334, lines: ["U8"] },
  { id: "u_rathaus_schoeneberg", name: "Rathaus Schöneberg", lat: 52.4831773, lng: 13.3419720, lines: ["U4"] },
  { id: "u_rathaus_spandau", name: "Rathaus Spandau", lat: 52.5351709, lng: 13.1997742, lines: ["U7"] },
  { id: "u_rehberge", name: "Rehberge", lat: 52.5566893, lng: 13.3409843, lines: ["U6"] },
  { id: "u_reinickendorfer_strasse", name: "Reinickendorfer Straße", lat: 52.5400429, lng: 13.3702888, lines: ["U6"] },
  { id: "u_residenzstrasse", name: "Residenzstraße", lat: 52.5711895, lng: 13.3604739, lines: ["U8"] },
  { id: "u_richard_wagner_platz", name: "Richard-Wagner-Platz", lat: 52.5173870, lng: 13.3065880, lines: ["U7"] },
  { id: "u_rohrdamm", name: "Rohrdamm", lat: 52.5369951, lng: 13.2623060, lines: ["U7"] },
  { id: "u_rosa_luxemburg_platz", name: "Rosa-Luxemburg-Platz", lat: 52.5276951, lng: 13.4104868, lines: ["U2"] },
  { id: "u_rosenthaler_platz", name: "Rosenthaler Platz", lat: 52.5298999, lng: 13.4011206, lines: ["U8"] },
  { id: "u_rotes_rathaus", name: "Rotes Rathaus", lat: 52.5188425, lng: 13.4080828, lines: ["U5"] },
  { id: "u_ruedesheimer_platz", name: "Rüdesheimer Platz", lat: 52.4732464, lng: 13.3144150, lines: ["U3"] },
  { id: "u_rudow", name: "Rudow", lat: 52.4161700, lng: 13.4953978, lines: ["U7"] },
  { id: "u_ruhleben", name: "Ruhleben", lat: 52.5256744, lng: 13.2414191, lines: ["U2"] },
  { id: "u_samariterstrasse", name: "Samariterstraße", lat: 52.5147399, lng: 13.4644405, lines: ["U5"] },
  { id: "u_scharnweberstrasse", name: "Scharnweberstraße", lat: 52.5668172, lng: 13.3126219, lines: ["U6"] },
  { id: "u_schillingstrasse", name: "Schillingstraße", lat: 52.5207900, lng: 13.4211125, lines: ["U5"] },
  { id: "u_schlesisches_tor", name: "Schlesisches Tor", lat: 52.5008341, lng: 13.4414625, lines: ["U1", "U3"] },
  { id: "u_schlossstrasse", name: "Schloßstraße", lat: 52.4614810, lng: 13.3250946, lines: ["U9"] },
  { id: "u_schoenleinstrasse", name: "Schönleinstraße", lat: 52.4930552, lng: 13.4220572, lines: ["U8"] },
  { id: "u_schwartzkopffstrasse", name: "Schwartzkopffstraße", lat: 52.5351574, lng: 13.3773180, lines: ["U6"] },
  { id: "u_seestrasse", name: "Seestraße", lat: 52.5498029, lng: 13.3531176, lines: ["U6"] },
  { id: "u_senefelderplatz", name: "Senefelderplatz", lat: 52.5323899, lng: 13.4126861, lines: ["U2"] },
  { id: "u_siemensdamm", name: "Siemensdamm", lat: 52.5367748, lng: 13.2727638, lines: ["U7"] },
  { id: "u_sophie_charlotte_platz", name: "Sophie-Charlotte-Platz", lat: 52.5109137, lng: 13.2963306, lines: ["U2"] },
  { id: "u_spichernstrasse", name: "Spichernstraße", lat: 52.4964453, lng: 13.3310091, lines: ["U3", "U9"] },
  { id: "u_spittelmarkt", name: "Spittelmarkt", lat: 52.5112959, lng: 13.4041155, lines: ["U2"] },
  { id: "u_stadtmitte", name: "Stadtmitte", lat: 52.5120808, lng: 13.3896554, lines: ["U2", "U6"] },
  { id: "u_strausberger_platz", name: "Strausberger Platz", lat: 52.5180981, lng: 13.4315264, lines: ["U5"] },
  { id: "u_suedstern", name: "Südstern", lat: 52.4892983, lng: 13.4076671, lines: ["U7"] },
  { id: "u_theodor_heuss_platz", name: "Theodor-Heuss-Platz", lat: 52.5099869, lng: 13.2722217, lines: ["U2"] },
  { id: "u_tierpark", name: "Tierpark", lat: 52.4977241, lng: 13.5229595, lines: ["U5"] },
  { id: "u_turmstrasse", name: "Turmstraße", lat: 52.5261489, lng: 13.3412971, lines: ["U9"] },
  { id: "u_uhlandstrasse", name: "Uhlandstraße", lat: 52.5028118, lng: 13.3266968, lines: ["U1"] },
  { id: "u_ullsteinstrasse", name: "Ullsteinstraße", lat: 52.4537449, lng: 13.3844659, lines: ["U6"] },
  { id: "u_unter_den_linden", name: "Unter den Linden", lat: 52.5169884, lng: 13.3888200, lines: ["U5", "U6"] },
  { id: "u_viktoria_luise_platz", name: "Viktoria-Luise-Platz", lat: 52.4961755, lng: 13.3431855, lines: ["U4"] },
  { id: "u_vinetastrasse", name: "Vinetastraße", lat: 52.5593248, lng: 13.4132780, lines: ["U2"] },
  { id: "u_voltastrasse", name: "Voltastraße", lat: 52.5422898, lng: 13.3928760, lines: ["U8"] },
  { id: "u_walther_schreiber_platz", name: "Walther-Schreiber-Platz", lat: 52.4653254, lng: 13.3282601, lines: ["U9"] },
  { id: "u_weberwiese", name: "Weberwiese", lat: 52.5167465, lng: 13.4447135, lines: ["U5"] },
  { id: "u_weinmeisterstrasse", name: "Weinmeisterstraße", lat: 52.5254666, lng: 13.4050194, lines: ["U8"] },
  { id: "u_westphalweg", name: "Westphalweg", lat: 52.4462674, lng: 13.3856905, lines: ["U6"] },
  { id: "u_wilmersdorfer_strasse", name: "Wilmersdorfer Straße", lat: 52.5066749, lng: 13.3066372, lines: ["U7"] },
  { id: "u_wittenbergplatz", name: "Wittenbergplatz", lat: 52.5017976, lng: 13.3430005, lines: ["U1", "U2", "U3"] },
  { id: "u_wutzkyallee", name: "Wutzkyallee", lat: 52.4233264, lng: 13.4745668, lines: ["U7"] },
  { id: "u_zitadelle", name: "Zitadelle", lat: 52.5376520, lng: 13.2175358, lines: ["U7"] },
  { id: "u_zwickauer_damm", name: "Zwickauer Damm", lat: 52.4233803, lng: 13.4839403, lines: ["U7"] },
  { id: "u_holzhauser_strasse", name: "Holzhauser Straße", lat: 52.5756920, lng: 13.2961132, lines: ["U6"] },
  { id: "u_borsigwerke", name: "Borsigwerke", lat: 52.5818407, lng: 13.2905918, lines: ["U6"] },

  // =============================================
  // S-BAHN ONLY STATIONS
  // =============================================
  { id: "s_adlershof", name: "Adlershof", lat: 52.4347350, lng: 13.5415575, lines: ["S8", "S85", "S9", "S46"] },
  { id: "s_ahrensfelde", name: "Ahrensfelde", lat: 52.5714452, lng: 13.5653023, lines: ["S7"] },
  { id: "s_alt_reinickendorf", name: "Alt-Reinickendorf", lat: 52.5777843, lng: 13.3512427, lines: ["S25"] },
  { id: "s_altglienicke", name: "Altglienicke", lat: 52.4069533, lng: 13.5582554, lines: ["S85", "S9"] },
  { id: "s_anhalter_bahnhof", name: "Anhalter Bahnhof", lat: 52.5035788, lng: 13.3814763, lines: ["S1", "S2", "S25", "S26"] },
  { id: "s_attilastrasse", name: "Attilastraße", lat: 52.4480308, lng: 13.3607503, lines: ["S2"] },
  { id: "s_babelsberg", name: "Babelsberg", lat: 52.3914035, lng: 13.0929636, lines: ["S7"] },
  { id: "s_baumschulenweg", name: "Baumschulenweg", lat: 52.4674002, lng: 13.4898621, lines: ["S8", "S85", "S9", "S46", "S47"] },
  { id: "s_bellevue", name: "Bellevue", lat: 52.5199850, lng: 13.3480704, lines: ["S3", "S5", "S7", "S9"] },
  { id: "s_bergfelde", name: "Bergfelde", lat: 52.6701184, lng: 13.3204109, lines: ["S8"] },
  { id: "s_bernau", name: "Bernau", lat: 52.6753854, lng: 13.5919415, lines: ["S2"] },
  { id: "s_bernau_friedenstal", name: "Bernau-Friedenstal", lat: 52.6683942, lng: 13.5646108, lines: ["S2"] },
  { id: "s_betriebsbahnhof_rummelsburg", name: "Betriebsbahnhof Rummelsburg", lat: 52.4938868, lng: 13.4977302, lines: ["S3"] },
  { id: "s_beusselstrasse", name: "Beusselstraße", lat: 52.5344077, lng: 13.3293873, lines: ["S41"] },
  { id: "s_biesdorf", name: "Biesdorf", lat: 52.5130873, lng: 13.5558463, lines: ["S5"] },
  { id: "s_birkenwerder", name: "Birkenwerder", lat: 52.6886604, lng: 13.2886929, lines: ["S1", "S8"] },
  { id: "s_birkenstein", name: "Birkenstein", lat: 52.5156381, lng: 13.6466028, lines: ["S5"] },
  { id: "s_blankenburg", name: "Blankenburg", lat: 52.5914655, lng: 13.4434822, lines: ["S2", "S8", "S26"] },
  { id: "s_blankenfelde", name: "Blankenfelde", lat: 52.3371846, lng: 13.4161461, lines: ["S2"] },
  { id: "s_borgsdorf", name: "Borgsdorf", lat: 52.7152140, lng: 13.2764576, lines: ["S1"] },
  { id: "s_bornholmer_strasse", name: "Bornholmer Straße", lat: 52.5547713, lng: 13.3978451, lines: ["S1", "S2", "S25", "S26", "S8", "S85"] },
  { id: "s_botanischer_garten", name: "Botanischer Garten", lat: 52.4479557, lng: 13.3071282, lines: ["S1"] },
  { id: "s_buch", name: "Buch", lat: 52.6358345, lng: 13.4916378, lines: ["S2"] },
  { id: "s_buckower_chaussee", name: "Buckower Chaussee", lat: 52.4105417, lng: 13.3827559, lines: ["S2"] },
  { id: "s_charlottenburg", name: "Charlottenburg", lat: 52.5050484, lng: 13.3045162, lines: ["S3", "S5", "S7", "S9"] },
  { id: "s_eichborndamm", name: "Eichborndamm", lat: 52.5776294, lng: 13.3166204, lines: ["S25"] },
  { id: "s_eichwalde", name: "Eichwalde", lat: 52.3709698, lng: 13.6155551, lines: ["S8", "S46"] },
  { id: "s_erkner", name: "Erkner", lat: 52.4272087, lng: 13.7524646, lines: ["S3"] },
  { id: "s_feuerbachstrasse", name: "Feuerbachstraße", lat: 52.4636730, lng: 13.3326994, lines: ["S1"] },
  { id: "s_flughafen_ber", name: "Flughafen BER", lat: 52.3642841, lng: 13.5081573, lines: ["S85", "S9"] },
  { id: "s_fredersdorf", name: "Fredersdorf", lat: 52.5262465, lng: 13.7604458, lines: ["S5"] },
  { id: "s_friedenau", name: "Friedenau", lat: 52.4707164, lng: 13.3415003, lines: ["S1"] },
  { id: "s_friedrichsfelde_ost", name: "Friedrichsfelde Ost", lat: 52.5141126, lng: 13.5200880, lines: ["S5", "S7", "S75"] },
  { id: "s_friedrichshagen", name: "Friedrichshagen", lat: 52.4573763, lng: 13.6232934, lines: ["S3"] },
  { id: "s_frohnau", name: "Frohnau", lat: 52.6324090, lng: 13.2902205, lines: ["S1", "S85"] },
  { id: "s_gehrenseestrasse", name: "Gehrenseestraße", lat: 52.5564975, lng: 13.5247623, lines: ["S75"] },
  { id: "s_greifswalder_strasse", name: "Greifswalder Straße", lat: 52.5402462, lng: 13.4389887, lines: ["S8", "S85", "S41"] },
  { id: "s_griebnitzsee", name: "Griebnitzsee", lat: 52.3944579, lng: 13.1272716, lines: ["S7"] },
  { id: "s_gruenau", name: "Grünau", lat: 52.4128789, lng: 13.5736378, lines: ["S8", "S46"] },
  { id: "s_gruenbergallee", name: "Grünbergallee", lat: 52.3992998, lng: 13.5419036, lines: ["S85", "S9"] },
  { id: "s_grunewald", name: "Grunewald", lat: 52.4882479, lng: 13.2610104, lines: ["S7"] },
  { id: "s_hackescher_markt", name: "Hackescher Markt", lat: 52.5226808, lng: 13.4023418, lines: ["S3", "S5", "S7", "S9"] },
  { id: "s_halensee", name: "Halensee", lat: 52.4960247, lng: 13.2905555, lines: ["S41", "S46"] },
  { id: "s_heerstrasse", name: "Heerstraße", lat: 52.5078537, lng: 13.2598587, lines: ["S3", "S9"] },
  { id: "s_heiligensee", name: "Heiligensee", lat: 52.6246647, lng: 13.2291940, lines: ["S25"] },
  { id: "s_hennigsdorf", name: "Hennigsdorf", lat: 52.6374079, lng: 13.2060771, lines: ["S25"] },
  { id: "s_hermsdorf", name: "Hermsdorf", lat: 52.6174544, lng: 13.3075189, lines: ["S1", "S85"] },
  { id: "s_hirschgarten", name: "Hirschgarten", lat: 52.4579033, lng: 13.6031386, lines: ["S3"] },
  { id: "s_hohen_neuendorf", name: "Hohen Neuendorf", lat: 52.6686500, lng: 13.2870408, lines: ["S1", "S8"] },
  { id: "s_hohenschoenhausen", name: "Hohenschönhausen", lat: 52.5661794, lng: 13.5122261, lines: ["S75"] },
  { id: "s_hohenzollerndamm", name: "Hohenzollerndamm", lat: 52.4886270, lng: 13.3002415, lines: ["S41", "S46"] },
  { id: "s_hoppegarten", name: "Hoppegarten (Mark)", lat: 52.5182432, lng: 13.6742567, lines: ["S5"] },
  { id: "s_humboldthain", name: "Humboldthain", lat: 52.5449517, lng: 13.3794684, lines: ["S1", "S2", "S25", "S26"] },
  { id: "s_johannisthal", name: "Johannisthal", lat: 52.4469899, lng: 13.5235435, lines: ["S8", "S85", "S9", "S46"] },
  { id: "s_julius_leber_bruecke", name: "Julius-Leber-Brücke", lat: 52.4865053, lng: 13.3611679, lines: ["S1"] },
  { id: "s_karlshorst", name: "Karlshorst", lat: 52.4804671, lng: 13.5272790, lines: ["S3"] },
  { id: "s_karow", name: "Karow", lat: 52.6152148, lng: 13.4694647, lines: ["S2"] },
  { id: "s_kaulsdorf", name: "Kaulsdorf", lat: 52.5121351, lng: 13.5901922, lines: ["S5"] },
  { id: "s_koellnische_heide", name: "Köllnische Heide", lat: 52.4696457, lng: 13.4679658, lines: ["S46", "S47"] },
  { id: "s_koenigs_wusterhausen", name: "Königs Wusterhausen", lat: 52.2967046, lng: 13.6315280, lines: ["S46"] },
  { id: "s_koepenick", name: "Köpenick", lat: 52.4585770, lng: 13.5815192, lines: ["S3"] },
  { id: "s_landsberger_allee", name: "Landsberger Allee", lat: 52.5294820, lng: 13.4547803, lines: ["S8", "S85", "S41"] },
  { id: "s_lankwitz", name: "Lankwitz", lat: 52.4387852, lng: 13.3420633, lines: ["S25", "S26"] },
  { id: "s_lehnitz", name: "Lehnitz", lat: 52.7409702, lng: 13.2634681, lines: ["S1"] },
  { id: "s_lichtenrade", name: "Lichtenrade", lat: 52.3869393, lng: 13.3964496, lines: ["S2"] },
  { id: "s_lichterfelde_ost", name: "Lichterfelde Ost", lat: 52.4298633, lng: 13.3280815, lines: ["S25", "S26"] },
  { id: "s_lichterfelde_sued", name: "Lichterfelde Süd", lat: 52.4099669, lng: 13.3085527, lines: ["S25", "S26"] },
  { id: "s_lichterfelde_west", name: "Lichterfelde West", lat: 52.4433056, lng: 13.2935862, lines: ["S1"] },
  { id: "s_mahlow", name: "Mahlow", lat: 52.3606346, lng: 13.4078294, lines: ["S2"] },
  { id: "s_mahlsdorf", name: "Mahlsdorf", lat: 52.5120903, lng: 13.6104126, lines: ["S5"] },
  { id: "s_marienfelde", name: "Marienfelde", lat: 52.4242122, lng: 13.3746844, lines: ["S2"] },
  { id: "s_marzahn", name: "Marzahn", lat: 52.5436548, lng: 13.5413545, lines: ["S7"] },
  { id: "s_mehrower_allee", name: "Mehrower Allee", lat: 52.5576080, lng: 13.5535509, lines: ["S7"] },
  { id: "s_messe_nord", name: "Messe Nord/ZOB", lat: 52.5077057, lng: 13.2834702, lines: ["S41", "S46"] },
  { id: "s_messe_sued", name: "Messe Süd (Eichkamp)", lat: 52.4986377, lng: 13.2702326, lines: ["S3", "S9"] },
  { id: "s_mexikoplatz", name: "Mexikoplatz", lat: 52.4367661, lng: 13.2332397, lines: ["S1"] },
  { id: "s_muehlenbeck", name: "Mühlenbeck-Mönchmühle", lat: 52.6547490, lng: 13.3862202, lines: ["S8"] },
  { id: "s_neuenhagen", name: "Neuenhagen", lat: 52.5208741, lng: 13.7016949, lines: ["S5"] },
  { id: "s_nikolassee", name: "Nikolassee", lat: 52.4320176, lng: 13.1930501, lines: ["S1", "S7"] },
  { id: "s_noeldnerplatz", name: "Nöldnerplatz", lat: 52.5036899, lng: 13.4849359, lines: ["S5", "S7", "S75"] },
  { id: "s_nordbahnhof", name: "Nordbahnhof", lat: 52.5322749, lng: 13.3878392, lines: ["S1", "S2", "S25", "S26"] },
  { id: "s_oberspree", name: "Oberspree", lat: 52.4524146, lng: 13.5380750, lines: ["S47"] },
  { id: "s_olympiastadion", name: "Olympiastadion", lat: 52.5112644, lng: 13.2428280, lines: ["S3", "S9"] },
  { id: "s_oranienburger_strasse", name: "Oranienburger Straße", lat: 52.5252246, lng: 13.3930145, lines: ["S1", "S2", "S25", "S26"] },
  { id: "s_oranienburg", name: "Oranienburg", lat: 52.7539059, lng: 13.2493207, lines: ["S1"] },
  { id: "s_osdorfer_strasse", name: "Osdorfer Straße", lat: 52.4188742, lng: 13.3142499, lines: ["S25", "S26"] },
  { id: "s_ostbahnhof", name: "Ostbahnhof", lat: 52.5107448, lng: 13.4351709, lines: ["S3", "S5", "S7", "S9"] },
  { id: "s_ostkreuz", name: "Ostkreuz", lat: 52.5031523, lng: 13.4695776, lines: ["S3", "S5", "S7", "S8", "S85", "S9", "S75", "S41"] },
  { id: "s_pankow_heinersdorf", name: "Pankow-Heinersdorf", lat: 52.5780653, lng: 13.4295093, lines: ["S2", "S8", "S26"] },
  { id: "s_petershagen_nord", name: "Petershagen Nord", lat: 52.5288655, lng: 13.7890139, lines: ["S5"] },
  { id: "s_pichelsberg", name: "Pichelsberg", lat: 52.5101503, lng: 13.2276304, lines: ["S3", "S9"] },
  { id: "s_plaenterwald", name: "Plänterwald", lat: 52.4785887, lng: 13.4732395, lines: ["S8", "S85", "S9"] },
  { id: "s_poelchaustrasse", name: "Poelchaustraße", lat: 52.5358712, lng: 13.5355776, lines: ["S7"] },
  { id: "s_potsdamer_platz", name: "Potsdamer Platz", lat: 52.5094035, lng: 13.3766399, lines: ["S1", "S2", "S25", "S26"] },
  { id: "s_potsdam_hbf", name: "Potsdam Hbf", lat: 52.3917908, lng: 13.0672397, lines: ["S7"] },
  { id: "s_prenzlauer_allee", name: "Prenzlauer Allee", lat: 52.5447901, lng: 13.4259805, lines: ["S8", "S85", "S41"] },
  { id: "s_priesterweg", name: "Priesterweg", lat: 52.4599231, lng: 13.3562530, lines: ["S2", "S25", "S26"] },
  { id: "s_rahnsdorf", name: "Rahnsdorf", lat: 52.4516372, lng: 13.6899776, lines: ["S3"] },
  { id: "s_raoul_wallenberg_strasse", name: "Raoul-Wallenberg-Straße", lat: 52.5507334, lng: 13.5475595, lines: ["S7"] },
  { id: "s_roentgental", name: "Röntgental", lat: 52.6486814, lng: 13.5136021, lines: ["S2"] },
  { id: "s_rummelsburg", name: "Rummelsburg", lat: 52.5012880, lng: 13.4783670, lines: ["S3"] },
  { id: "s_savignyplatz", name: "Savignyplatz", lat: 52.5051746, lng: 13.3190659, lines: ["S3", "S5", "S7", "S9"] },
  { id: "s_schichauweg", name: "Schichauweg", lat: 52.3985451, lng: 13.3894102, lines: ["S2"] },
  { id: "s_schlachtensee", name: "Schlachtensee", lat: 52.4400880, lng: 13.2154373, lines: ["S1"] },
  { id: "s_schoeneberg", name: "Schöneberg", lat: 52.4793491, lng: 13.3519181, lines: ["S1", "S41", "S46"] },
  { id: "s_schoenefeld", name: "Schönefeld (bei Berlin)", lat: 52.3909067, lng: 13.5130469, lines: ["S85", "S9"] },
  { id: "s_schoenflies", name: "Schönfließ", lat: 52.6647002, lng: 13.3400405, lines: ["S8"] },
  { id: "s_schoenholz", name: "Schönholz", lat: 52.5715004, lng: 13.3809904, lines: ["S1", "S25", "S85"] },
  { id: "s_schoeneweide", name: "Schöneweide", lat: 52.4549058, lng: 13.5097653, lines: ["S8", "S85", "S9", "S46", "S47"] },
  { id: "s_schulzendorf", name: "Schulzendorf", lat: 52.6129169, lng: 13.2460234, lines: ["S25"] },
  { id: "s_sonnenallee", name: "Sonnenallee", lat: 52.4729807, lng: 13.4556896, lines: ["S41"] },
  { id: "s_spandau", name: "Spandau", lat: 52.5347694, lng: 13.1956287, lines: ["S3", "S9"] },
  { id: "s_spindlersfeld", name: "Spindlersfeld", lat: 52.4468976, lng: 13.5615738, lines: ["S47"] },
  { id: "s_springpfuhl", name: "Springpfuhl", lat: 52.5270400, lng: 13.5365518, lines: ["S7", "S75"] },
  { id: "s_storkower_strasse", name: "Storkower Straße", lat: 52.5237432, lng: 13.4648885, lines: ["S8", "S85", "S41"] },
  { id: "s_strausberg", name: "Strausberg", lat: 52.5327622, lng: 13.8359863, lines: ["S5"] },
  { id: "s_strausberg_nord", name: "Strausberg Nord", lat: 52.5903172, lng: 13.9084343, lines: ["S5"] },
  { id: "s_strausberg_stadt", name: "Strausberg Stadt", lat: 52.5766818, lng: 13.8878521, lines: ["S5"] },
  { id: "s_stresow", name: "Stresow", lat: 52.5319419, lng: 13.2093454, lines: ["S3", "S9"] },
  { id: "s_suedende", name: "Südende", lat: 52.4482790, lng: 13.3537492, lines: ["S25", "S26"] },
  { id: "s_suedkreuz", name: "Südkreuz", lat: 52.4765716, lng: 13.3660396, lines: ["S1", "S2", "S25", "S26", "S41", "S46", "S47"] },
  { id: "s_sundgauer_strasse", name: "Sundgauer Straße", lat: 52.4364399, lng: 13.2742012, lines: ["S1"] },
  { id: "s_tegel", name: "Tegel", lat: 52.5881913, lng: 13.2896968, lines: ["S25"] },
  { id: "s_teltow_stadt", name: "Teltow Stadt", lat: 52.3968440, lng: 13.2762483, lines: ["S25", "S26"] },
  { id: "s_tiergarten", name: "Tiergarten", lat: 52.5143746, lng: 13.3364504, lines: ["S3", "S5", "S7", "S9"] },
  { id: "s_treptower_park", name: "Treptower Park", lat: 52.4938491, lng: 13.4618296, lines: ["S8", "S85", "S9", "S41"] },
  { id: "s_waidmannslust", name: "Waidmannslust", lat: 52.6062718, lng: 13.3211940, lines: ["S1", "S85"] },
  { id: "s_wannsee", name: "Wannsee", lat: 52.4214071, lng: 13.1798077, lines: ["S1", "S7"] },
  { id: "s_wartenberg", name: "Wartenberg", lat: 52.5729820, lng: 13.5038322, lines: ["S75"] },
  { id: "s_wassmannsdorf", name: "Waßmannsdorf", lat: 52.3682829, lng: 13.4634328, lines: ["S85", "S9"] },
  { id: "s_westend", name: "Westend", lat: 52.5180135, lng: 13.2844201, lines: ["S41", "S46"] },
  { id: "s_westkreuz", name: "Westkreuz", lat: 52.5010288, lng: 13.2847452, lines: ["S3", "S5", "S7", "S9", "S41", "S46"] },
  { id: "s_wilhelmshagen", name: "Wilhelmshagen", lat: 52.4379951, lng: 13.7227770, lines: ["S3"] },
  { id: "s_wilhelmsruh", name: "Wilhelmsruh", lat: 52.5816944, lng: 13.3622403, lines: ["S1", "S85"] },
  { id: "s_wollankstrasse", name: "Wollankstraße", lat: 52.5651525, lng: 13.3923627, lines: ["S1", "S25", "S85"] },
  { id: "s_wuhlheide", name: "Wuhlheide", lat: 52.4685507, lng: 13.5543359, lines: ["S3"] },
  { id: "s_zehlendorf", name: "Zehlendorf", lat: 52.4310735, lng: 13.2585888, lines: ["S1"] },
  { id: "s_zepernick", name: "Zepernick", lat: 52.6596833, lng: 13.5338475, lines: ["S2"] },
  { id: "s_zeuthen", name: "Zeuthen", lat: 52.3484435, lng: 13.6276470, lines: ["S8", "S46"] },
  { id: "s_hegermuhle", name: "Hegermühle", lat: 52.5483832, lng: 13.8663624, lines: ["S5"] },
  { id: "s_wildau", name: "Wildau", lat: 52.3194124, lng: 13.6338248, lines: ["S46", "S8"] },
  { id: "s_brandenburger_tor", name: "Brandenburger Tor", lat: 52.5166047, lng: 13.3809897, lines: ["S1", "S2", "S25", "S26"] },

  // S-Bahn Ringbahn-only stations (not shared with U-Bahn above)
  // Ringbahn stations already covered: gesundbrunnen, schoenhauser_allee, frankfurter_allee,
  // tempelhof, hermannstrasse, neukoelln, innsbrucker_platz, bundesplatz, heidelberger_platz,
  // westhafen, wedding, jungfernheide, warschauer_strasse
  // + s_prenzlauer_allee, s_greifswalder_strasse, s_landsberger_allee, s_storkower_strasse,
  //   s_ostkreuz, s_treptower_park, s_sonnenallee, s_suedkreuz, s_schoeneberg,
  //   s_hohenzollerndamm, s_halensee, s_westkreuz, s_messe_nord, s_westend, s_beusselstrasse
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

  function addRing(ids: string[], time: number) {
    addLine(ids, time);
    // Connect last to first for circular line
    conns.push({ from: ids[ids.length - 1], to: ids[0], time });
    conns.push({ from: ids[0], to: ids[ids.length - 1], time });
  }

  // === U-BAHN (1.5 min between stations) ===

  // U1: Warschauer Straße → Uhlandstraße
  addLine([
    "warschauer_strasse", "u_schlesisches_tor", "u_goerlitzer_bahnhof",
    "u_kottbusser_tor", "u_prinzenstrasse", "u_hallesches_tor",
    "u_moeckernbruecke", "u_gleisdreieck", "u_kurfuerstenstrasse",
    "u_nollendorfplatz", "u_wittenbergplatz", "u_kurfuerstendamm",
    "u_uhlandstrasse",
  ], 1.5);

  // U2: Pankow → Ruhleben
  addLine([
    "pankow", "u_vinetastrasse", "schoenhauser_allee",
    "u_eberswalder_strasse", "u_senefelderplatz", "u_rosa_luxemburg_platz",
    "alexanderplatz", "u_klosterstrasse", "u_maerkisches_museum",
    "u_spittelmarkt", "u_hausvogteiplatz", "u_stadtmitte",
    "u_anton_wilhelm_amo_strasse", "u_potsdamer_platz",
    "u_mendelssohn_bartholdy_park", "u_gleisdreieck", "u_buelowstrasse",
    "u_nollendorfplatz", "u_wittenbergplatz", "zoologischer_garten",
    "u_ernst_reuter_platz", "u_deutsche_oper", "u_bismarckstrasse",
    "u_sophie_charlotte_platz", "u_kaiserdamm", "u_theodor_heuss_platz",
    "u_neu_westend", "u_olympia_stadion", "u_ruhleben",
  ], 1.5);

  // U3: Warschauer Straße → Krumme Lanke
  addLine([
    "warschauer_strasse", "u_schlesisches_tor", "u_goerlitzer_bahnhof",
    "u_kottbusser_tor", "u_prinzenstrasse", "u_hallesches_tor",
    "u_moeckernbruecke", "u_gleisdreieck", "u_kurfuerstenstrasse",
    "u_nollendorfplatz", "u_wittenbergplatz", "u_augsburger_strasse",
    "u_spichernstrasse", "u_hohenzollernplatz", "u_fehrbelliner_platz",
    "heidelberger_platz", "u_ruedesheimer_platz", "u_breitenbachplatz",
    "u_podbielskiallee", "u_dahlem_dorf", "u_freie_universitaet",
    "u_oskar_helene_heim", "u_onkel_toms_huette", "u_krumme_lanke",
  ], 1.5);

  // U4: Nollendorfplatz → Innsbrucker Platz
  addLine([
    "u_nollendorfplatz", "u_viktoria_luise_platz", "u_bayerischer_platz",
    "u_rathaus_schoeneberg", "innsbrucker_platz",
  ], 1.5);

  // U5: Hönow → Hauptbahnhof
  addLine([
    "u_hoenow", "u_louis_lewin_strasse", "u_hellersdorf",
    "u_cottbusser_platz", "u_kienberg", "u_kaulsdorf_nord",
    "wuhletal", "u_elsterwerdaer_platz", "u_biesdorf_sued",
    "u_tierpark", "u_friedrichsfelde", "lichtenberg",
    "u_magdalenenstrasse", "frankfurter_allee", "u_samariterstrasse",
    "u_frankfurter_tor", "u_weberwiese", "u_strausberger_platz",
    "u_schillingstrasse", "alexanderplatz", "u_rotes_rathaus",
    "u_museumsinsel", "u_unter_den_linden", "u_brandenburger_tor",
    "u_bundestag", "hauptbahnhof",
  ], 1.5);

  // U6: Alt-Tegel → Alt-Mariendorf
  addLine([
    "u_alt_tegel", "u_borsigwerke", "u_holzhauser_strasse",
    "u_otisstrasse", "u_scharnweberstrasse", "u_kurt_schumacher_platz",
    "u_afrikanische_strasse", "u_rehberge", "u_seestrasse",
    "u_leopoldplatz", "wedding", "u_reinickendorfer_strasse",
    "u_schwartzkopffstrasse", "u_naturkundemuseum", "u_oranienburger_tor",
    "friedrichstrasse", "u_unter_den_linden", "u_stadtmitte",
    "u_kochstrasse", "u_hallesches_tor", "u_mehringdamm",
    "u_platz_der_luftbruecke", "u_paradestrasse", "tempelhof",
    "u_alt_tempelhof", "u_kaiserin_augusta_strasse", "u_ullsteinstrasse",
    "u_westphalweg", "u_alt_mariendorf",
  ], 1.5);

  // U7: Rathaus Spandau → Rudow
  addLine([
    "u_rathaus_spandau", "u_altstadt_spandau", "u_zitadelle",
    "u_haselhorst", "u_paulsternstrasse", "u_rohrdamm",
    "u_siemensdamm", "u_halemweg", "u_jakob_kaiser_platz",
    "jungfernheide", "u_mierendorffplatz", "u_richard_wagner_platz",
    "u_bismarckstrasse", "u_wilmersdorfer_strasse", "u_adenauerplatz",
    "u_konstanzer_strasse", "u_fehrbelliner_platz", "u_blissestrasse",
    "u_berliner_strasse", "u_bayerischer_platz", "u_eisenacher_strasse",
    "u_kleistpark", "yorckstrasse", "u_moeckernbruecke",
    "u_mehringdamm", "u_gneisenaustrasse", "u_suedstern",
    "u_hermannplatz", "u_rathaus_neukoelln", "u_karl_marx_strasse",
    "neukoelln", "u_grenzallee", "u_blaschkoallee",
    "u_parchimer_allee", "u_britz_sued", "u_johannisthaler_chaussee",
    "u_lipschitzallee", "u_wutzkyallee", "u_zwickauer_damm", "u_rudow",
  ], 1.5);

  // U8: Wittenau → Hermannstraße
  addLine([
    "wittenau", "u_rathaus_reinickendorf", "karl_bonhoeffer_nervenklinik",
    "u_lindauer_allee", "u_paracelsus_bad", "u_residenzstrasse",
    "u_franz_neumann_platz", "u_osloer_strasse", "u_pankstrasse",
    "gesundbrunnen", "u_voltastrasse", "u_bernauer_strasse",
    "u_rosenthaler_platz", "u_weinmeisterstrasse", "alexanderplatz",
    "jannowitzbruecke", "u_heinrich_heine_strasse", "u_moritzplatz",
    "u_kottbusser_tor", "u_schoenleinstrasse", "u_hermannplatz",
    "u_boddinstrasse", "u_leinestrasse", "hermannstrasse",
  ], 1.5);

  // U9: Osloer Straße → Rathaus Steglitz
  addLine([
    "u_osloer_strasse", "u_nauener_platz", "u_leopoldplatz",
    "u_amrumer_strasse", "westhafen", "u_birkenstrasse",
    "u_turmstrasse", "u_hansaplatz", "zoologischer_garten",
    "u_kurfuerstendamm", "u_spichernstrasse", "u_guentzelstrasse",
    "u_berliner_strasse", "bundesplatz", "u_friedrich_wilhelm_platz",
    "u_walther_schreiber_platz", "u_schlossstrasse", "rathaus_steglitz",
  ], 1.5);

  // === S-BAHN (2.5 min between stations) ===

  // S1: Wannsee → Oranienburg
  addLine([
    "s_wannsee", "s_nikolassee", "s_schlachtensee", "s_mexikoplatz",
    "s_zehlendorf", "s_sundgauer_strasse", "s_lichterfelde_west",
    "s_botanischer_garten", "rathaus_steglitz", "s_feuerbachstrasse",
    "s_friedenau", "s_schoeneberg", "s_julius_leber_bruecke",
    "yorckstrasse", "s_anhalter_bahnhof", "s_potsdamer_platz",
    "s_brandenburger_tor", "friedrichstrasse", "s_oranienburger_strasse",
    "s_nordbahnhof", "s_humboldthain", "gesundbrunnen",
    "s_bornholmer_strasse", "s_wollankstrasse", "s_schoenholz",
    "s_wilhelmsruh", "wittenau", "s_waidmannslust", "s_hermsdorf",
    "s_frohnau", "s_hohen_neuendorf", "s_birkenwerder",
    "s_borgsdorf", "s_lehnitz", "s_oranienburg",
  ], 2.5);

  // S2: Blankenfelde → Bernau
  addLine([
    "s_blankenfelde", "s_mahlow", "s_lichtenrade", "s_schichauweg",
    "s_buckower_chaussee", "s_marienfelde", "s_attilastrasse",
    "s_priesterweg", "s_suedkreuz", "yorckstrasse",
    "s_anhalter_bahnhof", "s_potsdamer_platz", "s_brandenburger_tor",
    "friedrichstrasse", "s_oranienburger_strasse", "s_nordbahnhof",
    "s_humboldthain", "gesundbrunnen", "s_bornholmer_strasse",
    "pankow", "s_pankow_heinersdorf", "s_blankenburg",
    "s_karow", "s_buch", "s_roentgental", "s_zepernick",
    "s_bernau_friedenstal", "s_bernau",
  ], 2.5);

  // S25: Teltow Stadt → Hennigsdorf
  addLine([
    "s_teltow_stadt", "s_lichterfelde_sued", "s_osdorfer_strasse",
    "s_lichterfelde_ost", "s_lankwitz", "s_suedende",
    "s_priesterweg", "s_suedkreuz", "yorckstrasse",
    "s_anhalter_bahnhof", "s_potsdamer_platz", "s_brandenburger_tor",
    "friedrichstrasse", "s_oranienburger_strasse", "s_nordbahnhof",
    "s_humboldthain", "gesundbrunnen", "s_bornholmer_strasse",
    "s_wollankstrasse", "s_schoenholz", "s_alt_reinickendorf",
    "karl_bonhoeffer_nervenklinik", "s_eichborndamm", "s_tegel",
    "s_schulzendorf", "s_heiligensee", "s_hennigsdorf",
  ], 2.5);

  // S26: Teltow Stadt → Blankenburg
  addLine([
    "s_teltow_stadt", "s_lichterfelde_sued", "s_osdorfer_strasse",
    "s_lichterfelde_ost", "s_lankwitz", "s_suedende",
    "s_priesterweg", "s_suedkreuz", "yorckstrasse",
    "s_anhalter_bahnhof", "s_potsdamer_platz", "s_brandenburger_tor",
    "friedrichstrasse", "s_oranienburger_strasse", "s_nordbahnhof",
    "s_humboldthain", "gesundbrunnen", "s_bornholmer_strasse",
    "pankow", "s_pankow_heinersdorf", "s_blankenburg",
  ], 2.5);

  // S3: Erkner → Spandau
  addLine([
    "s_erkner", "s_wilhelmshagen", "s_rahnsdorf", "s_friedrichshagen",
    "s_hirschgarten", "s_koepenick", "s_wuhlheide", "s_karlshorst",
    "s_betriebsbahnhof_rummelsburg", "s_rummelsburg", "s_ostkreuz",
    "warschauer_strasse", "s_ostbahnhof", "jannowitzbruecke",
    "alexanderplatz", "s_hackescher_markt", "friedrichstrasse",
    "hauptbahnhof", "s_bellevue", "s_tiergarten",
    "zoologischer_garten", "s_savignyplatz", "s_charlottenburg",
    "s_westkreuz", "s_messe_sued", "s_heerstrasse",
    "s_olympiastadion", "s_pichelsberg", "s_stresow", "s_spandau",
  ], 2.5);

  // S5: Strausberg Nord → Westkreuz
  addLine([
    "s_strausberg_nord", "s_strausberg_stadt", "s_hegermuhle",
    "s_strausberg", "s_petershagen_nord", "s_fredersdorf",
    "s_neuenhagen", "s_hoppegarten", "s_birkenstein",
    "s_mahlsdorf", "s_kaulsdorf", "wuhletal", "s_biesdorf",
    "s_friedrichsfelde_ost", "lichtenberg", "s_noeldnerplatz",
    "s_ostkreuz", "warschauer_strasse", "s_ostbahnhof",
    "jannowitzbruecke", "alexanderplatz", "s_hackescher_markt",
    "friedrichstrasse", "hauptbahnhof", "s_bellevue",
    "s_tiergarten", "zoologischer_garten", "s_savignyplatz",
    "s_charlottenburg", "s_westkreuz",
  ], 2.5);

  // S7: Ahrensfelde → Potsdam Hbf
  addLine([
    "s_ahrensfelde", "s_mehrower_allee", "s_raoul_wallenberg_strasse",
    "s_marzahn", "s_poelchaustrasse", "s_springpfuhl",
    "s_friedrichsfelde_ost", "lichtenberg", "s_noeldnerplatz",
    "s_ostkreuz", "warschauer_strasse", "s_ostbahnhof",
    "jannowitzbruecke", "alexanderplatz", "s_hackescher_markt",
    "friedrichstrasse", "hauptbahnhof", "s_bellevue",
    "s_tiergarten", "zoologischer_garten", "s_savignyplatz",
    "s_charlottenburg", "s_westkreuz", "s_grunewald",
    "s_nikolassee", "s_wannsee", "s_griebnitzsee",
    "s_babelsberg", "s_potsdam_hbf",
  ], 2.5);

  // S75: Wartenberg → Warschauer Straße
  addLine([
    "s_wartenberg", "s_hohenschoenhausen", "s_gehrenseestrasse",
    "s_springpfuhl", "s_friedrichsfelde_ost", "lichtenberg",
    "s_noeldnerplatz", "s_ostkreuz", "warschauer_strasse",
  ], 2.5);

  // S8: Wildau → Birkenwerder
  addLine([
    "s_wildau", "s_zeuthen", "s_eichwalde", "s_gruenau",
    "s_adlershof", "s_johannisthal", "s_schoeneweide",
    "s_baumschulenweg", "s_plaenterwald", "s_treptower_park",
    "s_ostkreuz", "frankfurter_allee", "s_storkower_strasse",
    "s_landsberger_allee", "s_greifswalder_strasse", "s_prenzlauer_allee",
    "schoenhauser_allee", "s_bornholmer_strasse", "pankow",
    "s_pankow_heinersdorf", "s_blankenburg", "s_muehlenbeck",
    "s_schoenflies", "s_bergfelde", "s_hohen_neuendorf",
    "s_birkenwerder",
  ], 2.5);

  // S85: Flughafen BER → Frohnau
  addLine([
    "s_flughafen_ber", "s_wassmannsdorf", "s_schoenefeld",
    "s_gruenbergallee", "s_altglienicke", "s_adlershof",
    "s_johannisthal", "s_schoeneweide", "s_baumschulenweg",
    "s_plaenterwald", "s_treptower_park", "s_ostkreuz",
    "frankfurter_allee", "s_storkower_strasse", "s_landsberger_allee",
    "s_greifswalder_strasse", "s_prenzlauer_allee", "schoenhauser_allee",
    "s_bornholmer_strasse", "pankow", "s_wollankstrasse",
    "s_schoenholz", "s_wilhelmsruh", "wittenau",
    "s_waidmannslust", "s_hermsdorf", "s_frohnau",
  ], 2.5);

  // S9: Flughafen BER → Spandau
  addLine([
    "s_flughafen_ber", "s_wassmannsdorf", "s_schoenefeld",
    "s_gruenbergallee", "s_altglienicke", "s_adlershof",
    "s_johannisthal", "s_schoeneweide", "s_baumschulenweg",
    "s_plaenterwald", "s_treptower_park", "warschauer_strasse",
    "s_ostbahnhof", "jannowitzbruecke", "alexanderplatz",
    "s_hackescher_markt", "friedrichstrasse", "hauptbahnhof",
    "s_bellevue", "s_tiergarten", "zoologischer_garten",
    "s_savignyplatz", "s_charlottenburg", "s_westkreuz",
    "s_messe_sued", "s_heerstrasse", "s_olympiastadion",
    "s_pichelsberg", "s_stresow", "s_spandau",
  ], 2.5);

  // S41/S42 Ringbahn (single circular line)
  addRing([
    "gesundbrunnen", "schoenhauser_allee", "s_prenzlauer_allee",
    "s_greifswalder_strasse", "s_landsberger_allee", "s_storkower_strasse",
    "frankfurter_allee", "s_ostkreuz", "s_treptower_park",
    "s_sonnenallee", "neukoelln", "hermannstrasse",
    "tempelhof", "s_suedkreuz", "s_schoeneberg",
    "innsbrucker_platz", "bundesplatz", "heidelberger_platz",
    "s_hohenzollerndamm", "s_halensee", "s_westkreuz",
    "s_messe_nord", "s_westend", "jungfernheide",
    "s_beusselstrasse", "westhafen", "wedding",
  ], 2.5);

  // S46: Königs Wusterhausen → Westend
  addLine([
    "s_koenigs_wusterhausen", "s_wildau", "s_zeuthen", "s_eichwalde",
    "s_gruenau", "s_adlershof", "s_johannisthal", "s_schoeneweide",
    "s_baumschulenweg", "s_koellnische_heide", "neukoelln",
    "hermannstrasse", "tempelhof", "s_suedkreuz",
    "s_schoeneberg", "innsbrucker_platz", "bundesplatz",
    "heidelberger_platz", "s_hohenzollerndamm", "s_halensee",
    "s_westkreuz", "s_messe_nord", "s_westend",
  ], 2.5);

  // S47: Spindlersfeld → Südkreuz
  addLine([
    "s_spindlersfeld", "s_oberspree", "s_schoeneweide",
    "s_baumschulenweg", "s_koellnische_heide", "neukoelln",
    "hermannstrasse", "tempelhof", "s_suedkreuz",
  ], 2.5);

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
