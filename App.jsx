import { useState } from "react";

// ─── H2O GROUP BRAND ──────────────────────────────────────────────────────────
const H2O = {
  blue:       "#1B9AE4",
  blueDark:   "#0F6EB5",
  blueDeep:   "#0A4D8C",
  blueLight:  "#E8F4FD",
  blueMid:    "#5BB8F0",
  white:      "#FFFFFF",
  gray900:    "#1A1A2E",
  gray800:    "#2D2D44",
  gray700:    "#484860",
  gray500:    "#767690",
  gray300:    "#C8C8D8",
  gray100:    "#F0F0F8",
  gray50:     "#F8F8FC",
  red:        "#E63946",
  redLight:   "#FFF0F1",
  amber:      "#F4A261",
  amberLight: "#FFF8EE",
  green:      "#2DC653",
  greenLight: "#EAFAF0",
  bg:         "#F4F6FA",
};

// ─── BEDRIJVEN ────────────────────────────────────────────────────────────────
const BEDRIJVEN = {
  h2o:    { naam:"H2O Group",       kleur:"#1B9AE4", emoji:"💧", locatie:"Burcht / Zwijndrecht",  sector:"Groep" },
  hye:    { naam:"HYE",             kleur:"#0A4D8C", emoji:"⚓", locatie:"Antwerpen",             sector:"Waterbouw & staalconstructie" },
  argex:  { naam:"Argex",           kleur:"#8B6914", emoji:"🏗", locatie:"Burcht",                sector:"Kleiverwerking & lichte granulaten" },
  pdk:    { naam:"Pylonen De Kerf", kleur:"#C0392B", emoji:"📡", locatie:"Bazel / Kruibeke",      sector:"Masten & verlichtingspalen" },
  navitec:{ naam:"Navitec",         kleur:"#117A65", emoji:"⚓", locatie:"Antwerpen",             sector:"Scheepsherstellingen" },
};

// ─── GEBRUIKERS ───────────────────────────────────────────────────────────────
const USERS = {
  "admin@safetysam.be":         { pw:"admin2026",    id:1, name:"Kurt Vernimmen",     role:"admin",          bedrijf:"h2o",     avatar:"KV", onboardingDone:true  },
  "hye@safetysam.be":           { pw:"hye2026",      id:2, name:"Thomas De Backer",   role:"leidinggevende", bedrijf:"hye",     avatar:"TB", onboardingDone:true  },
  "argex@safetysam.be":         { pw:"argex2026",    id:3, name:"Jonas Willems",      role:"leidinggevende", bedrijf:"argex",   avatar:"JW", onboardingDone:true  },
  "pdk@safetysam.be":           { pw:"pdk2026",      id:4, name:"Marc Van Laeken",    role:"leidinggevende", bedrijf:"pdk",     avatar:"MV", onboardingDone:true  },
  "navitec@safetysam.be":       { pw:"navitec2026",  id:5, name:"Jan Stevens",        role:"leidinggevende", bedrijf:"navitec", avatar:"JS", onboardingDone:true  },
  "werknemer@safetysam.be":     { pw:"werk2026",     id:6, name:"Pieter Claes",       role:"medewerker",     bedrijf:"hye",     avatar:"PC", onboardingDone:true  },
  "nieuw@safetysam.be":         { pw:"nieuw2026",    id:7, name:"Nieuwe Medewerker",  role:"medewerker",     bedrijf:"hye",     avatar:"NM", onboardingDone:false },
  "aannemer@safetysam.be":      { pw:"aan2026",      id:8, name:"Externe Aannemer",   role:"aannemer",       bedrijf:"hye",     avatar:"EA", onboardingDone:false },
};

// ─── PROCEDURES PER BEDRIJF ───────────────────────────────────────────────────
const PROCEDURES = {
  h2o: [
    { id:1, cat:"Procedures", titel:"H2O Group — Veiligheidsbeleid groepsniveau", versie:"v1.0", datum:"jan 2025", auteur:"H2O Group H&S", tags:["Groep","Beleid","Alle sites"], beschrijving:"Overkoepelend veiligheidsbeleid voor alle H2O Group bedrijven.", kernpunten:["Nultolerantie voor onveilig gedrag","Elk incident melden, hoe klein ook","LMRA verplicht vóór elke risicovolle taak","PBM's verplicht in alle aangewezen zones","Veiligheidscoördinator is aanspreekpunt voor alle bedrijven"] },
    { id:2, cat:"Procedures", titel:"H2O Group — Bezoekers & aannemers op de site", versie:"v1.1", datum:"feb 2025", auteur:"H2O Group H&S", tags:["Bezoekers","Aannemers","Inductie","Alle sites"], beschrijving:"Procedure voor veilig onthaal van bezoekers en externe aannemers op alle H2O Group locaties.", kernpunten:["Verplichte veiligheidsinductie bij aankomst","Begeleider verplicht voor bezoekers","Aannemers leggen eigen risicoanalyse voor","PBM's verplicht in productiezones","Melden van incidenten geldt ook voor externen"] },
  ],
  hye: [
    { id:3, cat:"Procedures", titel:"HYE — Werken op en nabij water", versie:"v2.0", datum:"mrt 2025", auteur:"HYE H&S", tags:["Water","Verdrinking","Reddingsvest","Kaai"], beschrijving:"Specifieke procedure voor werkzaamheden op kades, pontons, schepen en in de nabijheid van open water.", kernpunten:["Reddingsvest (100N min.) verplicht op <2m van open water","Reddingslijn aanwezig op elke werkpost aan water","Nooit alleen werken aan of op het water","Schepen en pontons alleen betreden via goedgekeurde loopplank","Werkvergunning vereist voor werken op drijvende constructies","Noodprocedure 'man overboord' kennen en oefenen"] , verboden:["Werken aan water zonder reddingsvest","Alleen werken op ponton of schip","Alcohol vóór of tijdens werkzaamheden op het water"], pbm:["Reddingsvest (100N)","Helm","Antislipschoeisel","Werkhandschoenen"] },
    { id:4, cat:"Procedures", titel:"HYE — Hijswerken en kraanactiviteiten", versie:"v1.3", datum:"jan 2025", auteur:"HYE H&S", tags:["Hijsen","Kraan","Lasten","SWL"], beschrijving:"Procedure voor veilige uitvoering van hijswerken met mobiele en vaste kranen.", kernpunten:["Hijsplan verplicht voor lasten >1T of complexe operaties","Gecertificeerde kraanman (BCTVO) verplicht","Hijszone afbakenen en vrij houden van personen","Nooit onder hangende last doorlopen of staan","SWL (Safe Working Load) nooit overschrijden","Daghijsinspectie uitvoeren vóór gebruik"], verboden:["Onder hangende last staan of doorlopen","Kraan bedienen zonder certificaat","SWL overschrijden"], pbm:["Helm","Fluovest","Veiligheidsschoenen","Handschoenen"] },
  ],
  argex: [
    { id:5, cat:"Procedures", titel:"Argex — Werken in de groeve & kleiwinning", versie:"v1.2", datum:"feb 2025", auteur:"Argex H&S", tags:["Groeve","Grondverzet","Val","Instorting"], beschrijving:"Veiligheidsregels voor werkzaamheden in en rondom de groeve voor kleiwinning.", kernpunten:["Talud-inspectie verplicht voor aanvang dagelijkse werkzaamheden","Veilige afstand tot groeverand: min. 2x hoogte talud","Voertuigen rijden altijd met gedoofde koplampen in groeve bij goed zicht","Nooit in de groeve lopen zonder goedkeuring ploegchef","LMRA verplicht bij elk nieuw werk in de groeve","Grondverzet machines hebben achteruitrijcamera en -alarm"], verboden:["Betreden groeve zonder toestemming","Rijden langs rand groeve bij nat/glad weer zonder begeleiding"], pbm:["Helm","Fluovest","Veiligheidsschoenen","Stofmasker (FFP2) bij droge omstandigheden"] },
    { id:6, cat:"Procedures", titel:"Argex — Ovens & hoge temperaturen", versie:"v1.0", datum:"dec 2024", auteur:"Argex H&S", tags:["Oven","Temperatuur","Brand","Warmte"], beschrijving:"Procedure voor veilig werken rond de draaiovens voor het bakken van klei-granulaten.", kernpunten:["Minimumafstand 1,5m tot oven bij normaal bedrijf","Hittebestendige PBM's bij onderhoud of storing","LOTO verplicht voor elke interventie aan de oven","Ventilatie controleren vóór betreden machinekamer oven","Brandblusser aanwezig op max. 10m van oven"], verboden:["Aanraken hete oven-oppervlakken zonder hittebestendige handschoenen","Onderhoud oven zonder LOTO","Werken solo bij oven buiten diensturen"], pbm:["Hittewerende handschoenen","Gezichtsscherm","Hittebestendig werkpak"] },
  ],
  pdk: [
    { id:7, cat:"Procedures", titel:"PDK — Werken op hoogte (masten & pylonen)", versie:"v3.0", datum:"mrt 2025", auteur:"PDK H&S", tags:["Hoogte","Mast","Pyloon","Val","Harnas"], beschrijving:"Specifieke procedure voor klimmen en werken op masten, pylonen en verlichtingspalen tot 100m+ hoogte.", kernpunten:["Klimautorisatie verplicht: medisch geschikt + klimopleiding","Dubbel harnas-systeem verplicht: altijd min. 1 verbindingspunt actief","Windmeting vóór en tijdens klimmen: stop bij >50 km/u","Werkvergunning voor masten >10m hoogte","Reddingsplan opstellen vóór elke klimoperatie","Personen op de grond dragen helm in valzone"], verboden:["Klimmen zonder dubbel harnassysteem","Klimmen bij onweer of wind >50km/u","Onbevoegde personen in de valzone"], pbm:["Volledig valstopharnas","Dubbele lanyard","Klimhelm met kinriem","Klimschoenen","Handschoenen"] },
    { id:8, cat:"Procedures", titel:"PDK — Las- en snijwerken in het atelier", versie:"v1.4", datum:"jan 2025", auteur:"PDK H&S", tags:["Lassen","Snijden","Vonken","UV","Ogen"], beschrijving:"Veiligheidsprocedure voor las- en snijwerkzaamheden in het productieatelier.", kernpunten:["Lasdeken of vuurscherm verplaatsen naar werkpost","Brandblusser op max. 5m van laspost aanwezig","Laszone afbakenen met verblindingsschermen","Ventilatie AAN vóór aanvang laswerk","Personeel zonder lasmasker op min. 3m afstand","Rookontwikkeling bij zink/coating: ademhalingsbescherming verplicht"], verboden:["Lassen zonder geldig lascertificaat","Lassen zonder lasmasker","Lassen op verfcoating of gegalvaniseerde stukken zonder ventilatie"], pbm:["Lasmasker auto-dim","Lashandschoenen","Lasschort","Veiligheidsschoenen S3","Ademhalingsbescherming bij coating"] },
  ],
  navitec: [
    { id:9,  cat:"Procedures", titel:"Navitec — Scheepsreparaties aan boord", versie:"v1.1", datum:"feb 2025", auteur:"Navitec H&S", tags:["Schip","Reparatie","Besloten ruimte","Bunker"], beschrijving:"Procedure voor veilige uitvoering van reparatiewerkzaamheden aan boord van schepen.", kernpunten:["Toestemming kapitein/eigenaar verplicht voor betreden schip","Gasdetectie verplicht bij betreden laadruimtes, bunkers en ketelruimtes","Elektrische installaties: coördinatie met scheepselektriciën","Werkvergunning voor snijden, lassen en warme werken aan boord","Reddingsvest verplicht bij werken op dek","Veilige loopplank met relingleuning verplicht"] , verboden:["Werken in laadruimte zonder gasdetectie","Open vuur zonder werkvergunning aan boord","Betreden schip zonder toestemming bemanning"], pbm:["Reddingsvest op dek","Helm","Veiligheidsschoenen zeelaarzen-type","Gasdetector (persoonlijk)"] },
    { id:10, cat:"Procedures", titel:"Navitec — Kade- en havenactiviteiten", versie:"v1.0", datum:"jan 2025", auteur:"Navitec H&S", tags:["Kade","Haven","Water","Meertrossen"], beschrijving:"Veiligheidsregels voor werkzaamheden op de kade en bij het manoeuvreren van schepen.", kernpunten:["Reddingsvest verplicht op de kade","Veilige afstand tot varen de schepen: min. 5m","Meertrossen: nooit tussen tros en meerpaal staan","Communicatie met sleepboot via VHF (kanaal 9)","Noodstop-procedure gekend door iedereen op de kade"], verboden:["Op de kade zonder reddingsvest","Tussen aktieve meertros en meerpaal staan"], pbm:["Reddingsvest","Helm","Waterdichte veiligheidsschoenen","Handschoenen"] },
  ],
};

// ─── TOOLBOXEN PER BEDRIJF ────────────────────────────────────────────────────
const TOOLBOXEN = {
  h2o: [
    { id:1, titel:"Veiligheid bij H2O Group — Introductie",  duur:"20 min", cat:"Groep algemeen",  verplicht:true,  gevolgd:false, datum:null },
    { id:2, titel:"Bezoekers & aannemers ontvangen",          duur:"15 min", cat:"Groep algemeen",  verplicht:false, gevolgd:false, datum:null },
  ],
  hye: [
    { id:3, titel:"Werken op en nabij water — dag 1",         duur:"25 min", cat:"Water & kade",    verplicht:true,  gevolgd:false, datum:null },
    { id:4, titel:"Veilig hijsen — theorie & praktijk",       duur:"30 min", cat:"Hijswerken",      verplicht:true,  gevolgd:false, datum:null },
    { id:5, titel:"Staalconstructie — snijden & lassen",      duur:"25 min", cat:"Staalwerk",       verplicht:true,  gevolgd:false, datum:null },
  ],
  argex: [
    { id:6, titel:"Veilig werken in en rond de groeve",       duur:"25 min", cat:"Groeve",          verplicht:true,  gevolgd:false, datum:null },
    { id:7, titel:"Ovens & hoge temperaturen — gevaren",      duur:"20 min", cat:"Procesinstallaties",verplicht:true, gevolgd:false, datum:null },
  ],
  pdk: [
    { id:8,  titel:"Klimmen op masten & pylonen",             duur:"35 min", cat:"Werken op hoogte",verplicht:true,  gevolgd:false, datum:null },
    { id:9,  titel:"Las- en snijwerken — atelier PDK",        duur:"20 min", cat:"Laswerk",         verplicht:true,  gevolgd:false, datum:null },
  ],
  navitec: [
    { id:10, titel:"Scheepsreparaties aan boord — veilig",    duur:"25 min", cat:"Scheepvaart",     verplicht:true,  gevolgd:false, datum:null },
    { id:11, titel:"Kade & haven — gevaren en regels",        duur:"20 min", cat:"Kade & haven",    verplicht:true,  gevolgd:false, datum:null },
  ],
};

// ─── TEAM & CERTIFICATEN ──────────────────────────────────────────────────────
const TEAM = [
  { id:6, name:"Pieter Claes",      avatar:"PC", bedrijf:"hye",     functie:"Lasser",           opleidingen:[{naam:"VCA Basis",verval:"2027-03-01",ok:true},{naam:"Lassen B+C",verval:"2026-05-20",ok:true},{naam:"Werken op hoogte",verval:"2025-05-10",ok:false}]},
  { id:9, name:"Stijn De Ben",      avatar:"SD", bedrijf:"hye",     functie:"Kraanman",         opleidingen:[{naam:"BCTVO Kraanman",verval:"2026-01-15",ok:true},{naam:"VCA VOL",verval:"2028-02-01",ok:true}]},
  { id:10,name:"Koen Raignier",     avatar:"KR", bedrijf:"hye",     functie:"Waterbouwer",      opleidingen:[{naam:"VCA Basis",verval:"2025-06-30",ok:false},{naam:"Reddingsvest gebruik",verval:"2026-03-01",ok:true}]},
  { id:11,name:"Raf Bogaert",       avatar:"RB", bedrijf:"argex",   functie:"Machine-operator", opleidingen:[{naam:"Heftruck",verval:"2026-08-01",ok:true},{naam:"VCA Basis",verval:"2025-04-15",ok:false}]},
  { id:12,name:"Rudy De Kerf",      avatar:"RD", bedrijf:"pdk",     functie:"Klimmer",          opleidingen:[{naam:"Klimopleiding (40j)",verval:"2026-12-01",ok:true},{naam:"Valbeveiliging",verval:"2025-09-01",ok:false}]},
  { id:13,name:"Ann Van Remoortere",avatar:"AR", bedrijf:"navitec", functie:"Kade-technicus",   opleidingen:[{naam:"VCA Basis",verval:"2027-01-10",ok:true},{naam:"Reddingsvest gebruik",verval:"2026-06-01",ok:true}]},
];

const MIJN_OPL = [
  { naam:"VCA Basis",              datum:"2022-03-01", verval:"2027-03-01", status:"ok"         },
  { naam:"Werken op hoogte",       datum:"2023-05-10", verval:"2025-05-10", status:"verlopen"   },
  { naam:"Lassen B+C",             datum:"2024-05-20", verval:"2026-05-20", status:"ok"         },
  { naam:"EHBO Level 1",           datum:"2023-09-01", verval:"2025-09-01", status:"binnenkort" },
];

// ─── EHBO & VERTROUWENSPERSONEN ───────────────────────────────────────────────
const EHBO_LEDEN = [
  { naam:"Sofie Mertens",    rol:"EHBO'er — HYE Antwerpen",     tel:"0479 11 22 33", email:"s.mertens@hye.be",       desc:"AED: ingang werkplaats HYE.", kleur:H2O.blue, init:"SM" },
  { naam:"David Claes",      rol:"EHBO'er — Argex Burcht",      tel:"0476 44 55 66", email:"d.claes@argex.be",        desc:"AED: kantinegebouw Argex.",   kleur:H2O.blue, init:"DC" },
  { naam:"Nathalie Bogaert", rol:"EHBO'er — PDK Bazel",         tel:"0472 77 88 99", email:"n.bogaert@pylonendekerf.be",desc:"AED: receptie PDK.",         kleur:H2O.blue, init:"NB" },
];
const VERTROUWENSPERSONEN = [
  { naam:"Karen De Smedt",   rol:"Vertrouwenspersoon intern",   tel:"0478 55 23 10", email:"k.desmedt@h2ogroup.be",   desc:"Bereikbaar ma–vr 8u–17u. Vertrouwelijk gesprek. Alle H2O bedrijven.", kleur:"#7B2FBE", init:"KD" },
  { naam:"Marc Willems",     rol:"Ext. vertrouwenspersoon",     tel:"0474 88 01 34", email:"m.willems@idewe.be",       desc:"Via IDEWE. NL/FR/EN. Anoniem: 0800 30 801 (gratis).", kleur:"#7B2FBE", init:"MW" },
];

// ─── NOODSCENARIOS ────────────────────────────────────────────────────────────
const NOODSCENARIOS = [
  { id:"brand",     ico:"🔥", label:"Brand",               kleur:"#E63946", bg:"#FFF0F1", stappen:[
    {nr:1,ico:"🔴",tit:"Alarm slaan",           txt:"Druk op het dichtstbijzijnde brandalarm of bel intern 333."},
    {nr:2,ico:"📢",tit:"Collega's verwittigen",  txt:"Waarschuw iedereen. Niemand mag achterblijven."},
    {nr:3,ico:"🚪",tit:"Evacueer onmiddellijk",  txt:"Dichtstbijzijnde nooduitgang. NOOIT de lift."},
    {nr:4,ico:"🚒",tit:"Bel 112",                txt:"Locatie, wat brandt, hoeveel personen."},
    {nr:5,ico:"📍",tit:"Verzamelplaats",         txt:"Parking hoofdingang — zone aangeduid per site. Meld je bij BHV."},
    {nr:6,ico:"🚫",tit:"Niet terugkeren",        txt:"NOOIT terug tot brandweer toestemming geeft."},
  ]},
  { id:"water",     ico:"🌊", label:"Man overboord",        kleur:"#1B9AE4", bg:"#E8F4FD", stappen:[
    {nr:1,ico:"📢",tit:"Alarm slaan",            txt:"Roep 'MAN OVERBOORD!' en wijs onafgebroken naar het slachtoffer."},
    {nr:2,ico:"🟠",tit:"Reddingsboei gooien",    txt:"Gooi de dichtstbijzijnde reddingsboei/lijn naar het slachtoffer."},
    {nr:3,ico:"📞",tit:"Bel 112 en intern 333",  txt:"Geef locatie en situatie door. Vraag naar reddingsdienst te water."},
    {nr:4,ico:"👁",tit:"Blijf kijken",           txt:"Houd het slachtoffer ALTIJD in het oog. Wijs anderen de weg."},
    {nr:5,ico:"⛵",tit:"Reddingsoperatie",       txt:"Enkel getrainde personen gaan te water. Gebruik reddingsboot indien beschikbaar."},
    {nr:6,ico:"🩺",tit:"Eerste hulp na redding", txt:"Hypothermie behandelen: warm, droog, liggen. Wacht op 112."},
  ]},
  { id:"hoogte",    ico:"🪂", label:"Val van hoogte",       kleur:"#F4A261", bg:"#FFF8EE", stappen:[
    {nr:1,ico:"📞",tit:"Bel 112 onmiddellijk",  txt:"Bij val van hoogte altijd 112 bellen, ook bij bewustzijn."},
    {nr:2,ico:"🛑",tit:"Beweeg slachtoffer NIET",txt:"Mogelijke ruggengraatletsel. Slachtoffer NIET verplaatsen."},
    {nr:3,ico:"🩺",tit:"Bel EHBO'er",           txt:"Onmiddellijk EHBO'er ter plaatse roepen."},
    {nr:4,ico:"🔒",tit:"Zone beveiligen",       txt:"Gebied afzetten. Hijszone vrijmaken voor hulpdiensten."},
    {nr:5,ico:"📋",tit:"Bewaar situatie",       txt:"Niets verplaatsen op de werkplek tot onderzoek klaar."},
    {nr:6,ico:"👔",tit:"Verwittig leidinggevende",txt:"Onmiddellijk leidinggevende en veiligheidscoördinator informeren."},
  ]},
  { id:"gaslek",    ico:"💨", label:"Gaslek",               kleur:"#8338EC", bg:"#F3EEFF", stappen:[
    {nr:1,ico:"🚫",tit:"Stop activiteit",       txt:"Alle werkzaamheden stoppen. Machines uitschakelen."},
    {nr:2,ico:"💡",tit:"Geen elektriciteit",    txt:"GEEN lichten/apparaten aan of uit. Vonkgevaar!"},
    {nr:3,ico:"🚪",tit:"Evacueer en ventileer", txt:"Ruimte verlaten, deuren open. Gebruik de trap."},
    {nr:4,ico:"📵",tit:"GSM pas op afstand",    txt:"Minimaal 50m weg voor je belt. Geen vonken!"},
    {nr:5,ico:"📞",tit:"Bel 112 en 333",        txt:"Hulpdiensten en intern 333. Locatie doorgeven."},
    {nr:6,ico:"🚫",tit:"Niet terugkeren",       txt:"Niet betreden tot brandweer bevestigt dat het veilig is."},
  ]},
  { id:"incident",  ico:"🚑", label:"Arbeidsongeval",       kleur:"#E63946", bg:"#FFF0F1", stappen:[
    {nr:1,ico:"🔒",tit:"Beveilig de omgeving",  txt:"Zone veiligstellen. Geen extra slachtoffers."},
    {nr:2,ico:"🩺",tit:"Eerste hulp verlenen",  txt:"Bel EHBO'er. Slachtoffer NIET bewegen."},
    {nr:3,ico:"📞",tit:"Bel 112 bij ernstig letsel",txt:"Intern noodnummer 333. Locatie doorgeven."},
    {nr:4,ico:"📢",tit:"Verwittig leidinggevende",txt:"Leidinggevende + veiligheidscoördinator direct informeren."},
    {nr:5,ico:"🔍",tit:"Bewaar de situatie",    txt:"NIETS wijzigen tot onderzoek is afgerond."},
    {nr:6,ico:"📋",tit:"Registreer in SafetySam",txt:"Zo snel mogelijk melden via de app."},
  ]},
];

// ─── INCIDENTEN ───────────────────────────────────────────────────────────────
const INCIDENT_TYPES = [
  { id:"gevaarlijk", ico:"⚠️", label:"Gevaarlijke situatie",  kleur:H2O.amber,  bg:H2O.amberLight },
  { id:"ongeval",    ico:"🚨", label:"Ongeval met letsel",     kleur:H2O.red,    bg:H2O.redLight   },
  { id:"materieel",  ico:"🔧", label:"Materiële schade",       kleur:"#1B9AE4",  bg:"#E8F4FD"      },
];
const OORZAKEN = ["Menselijke fout","Onvoldoende instructie","Defect materieel","Onveilige omstandigheid","Ontbrekende PBM's","Procedure niet gevolgd","Tijdsdruk","Communicatiefout","Andere"];
const MOCK_MELDINGEN = [
  { id:1, type:"gevaarlijk", bedrijf:"hye",     titel:"Losse steiger reling hal A",          ernst:"hoog",  status:"onderzoek",   datum:"11 mrt 2025", melder:"Pieter Claes",  locatie:"HYE — hal A steigerwerk", beschrijving:"Steigerreling los bij trap naar 2e niveau.", oorzaak:"Defect materieel", directeActie:"Reling vastgemaakt, zone afgezet", actie:"Alle steigers inspecteren", verantwoordelijke:"Thomas De Backer", deadline:"18 mrt 2025" },
  { id:2, type:"materieel",  bedrijf:"argex",   titel:"Schade transportband segment 3",      ernst:"matig", status:"gemeld",       datum:"12 mrt 2025", melder:"Raf Bogaert",   locatie:"Argex — transportband 3", beschrijving:"Afdekplaat transportband beschadigd na botsing met heftruck.", oorzaak:"Menselijke fout", directeActie:"Machine stilgelegd, markering aangebracht", actie:"Rijroute heftruck aanpassen + extra markeringen", verantwoordelijke:"Jonas Willems", deadline:"20 mrt 2025" },
  { id:3, type:"gevaarlijk", bedrijf:"pdk",     titel:"Sterke wind tijdens klimoperatie",    ernst:"hoog",  status:"afgehandeld",  datum:"08 mrt 2025", melder:"Rudy De Kerf",  locatie:"PDK — mast project Gent", beschrijving:"Windsnelheid >60km/u tijdens klimoperatie. Werk stopgezet.", oorzaak:"Weersomstandigheden", directeActie:"Werk gestopt, klimmer veilig naar beneden", actie:"Weerstations raadplegen voor klimoperaties", verantwoordelijke:"Marc Van Laeken", deadline:"15 mrt 2025" },
];

// ─── COMITÉ VERSLAGEN ─────────────────────────────────────────────────────────
const COMITE = [
  { id:1, datum:"13 feb 2025", bedrijf:"h2o", titel:"H2O Group — Veiligheidsoverleg Q1 2025", punten:["Incidentenrapport Q4 2024 alle bedrijven","SafetySam app gelanceerd — 87% adoptie","Actieplan verouderde PBM's HYE en PDK","Vernieuwde procedure bezoekers & aannemers"] },
  { id:2, datum:"15 nov 2024", bedrijf:"h2o", titel:"H2O Group — Veiligheidsoverleg Q4 2024", punten:["Evaluatie toolbox-campagne groep","Vervallende certificaten teamoverzicht besproken","Nieuw EHBO-team Navitec gecertificeerd","Vragen medewerkers: rijveiligheid Argex-site"] },
];

// ─── ONBOARDING STAPPEN ───────────────────────────────────────────────────────
const ONBOARDING_STAPPEN = [
  { id:"welkom",     ico:"💧", tit:"Welkom bij H2O Group",       desc:"Maak kennis met SafetySam en de H2O Group veiligheidsaanpak." },
  { id:"huisregels", ico:"📜", tit:"Huisregels & gedragscode",   desc:"Lees en bevestig de H2O Group gedragscode." },
  { id:"noodplan",   ico:"🚨", tit:"Noodplan & evacuatie",       desc:"Ken de noodsituaties en evacuatieprocedures." },
  { id:"contacten",  ico:"🩺", tit:"EHBO & vertrouwenspersonen", desc:"Wie kan je helpen bij problemen op het werk." },
  { id:"toolbox",    ico:"🎬", tit:"Introductietoolbox",         desc:"Verplichte veiligheidstoolbox volgen & tekenen." },
  { id:"quiz",       ico:"🧠", tit:"Kennisquiz",                 desc:"5 vragen om je onboarding af te sluiten." },
];

const QUIZ = [
  { v:"Wat is het interne noodnummer bij H2O Group?",                     opts:["222","333","444","999"],                                   juist:1 },
  { v:"Wat roep je bij een man-overboord situatie?",                      opts:["Help!","Brand!","Man overboord!","Alarm!"],                juist:2 },
  { v:"Hoever van open water ben je reddingsvest verplicht?",             opts:["5 meter","2 meter","10 meter","1 meter"],                  juist:1 },
  { v:"Wat is de eerste stap bij een val van hoogte?",                    opts:["Slachtoffer oprichten","Bel 112","Foto nemen","Wachten"],  juist:1 },
  { v:"Hoe heet de mascotte van SafetySam?",                              opts:["Dropje","Bubbles","Sam","Aqua"],                           juist:2 },
];

// ─── CSS ──────────────────────────────────────────────────────────────────────
const css = `
@import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800;900&display=swap');
*{box-sizing:border-box;margin:0;padding:0;}
body{background:#F4F6FA;font-family:'Nunito',sans-serif;}
@keyframes spin{to{transform:rotate(360deg);}}
@keyframes fadeUp{from{opacity:0;transform:translateY(10px);}to{opacity:1;transform:translateY(0);}}
@keyframes bounce{0%,100%{transform:translateY(0);}50%{transform:translateY(-6px);}}
.fu{animation:fadeUp 0.25s ease forwards;}
.sam-bounce{animation:bounce 2s ease-in-out infinite;}
input,select,textarea{outline:none;font-family:inherit;}
input:focus,select:focus,textarea:focus{border-color:#1B9AE4!important;box-shadow:0 0 0 3px rgba(27,154,228,0.15)!important;}
::-webkit-scrollbar{width:5px;}
::-webkit-scrollbar-track{background:#F4F6FA;}
::-webkit-scrollbar-thumb{background:#C8C8D8;border-radius:3px;}
select option{background:#fff;color:#1A1A2E;}
.rh:hover{background:#EEF6FD!important;cursor:pointer;}
.bh{transition:all .15s;} .bh:hover{filter:brightness(0.91);transform:translateY(-1px);}
`;

// ─── SAM MASCOTTE (SVG) ───────────────────────────────────────────────────────
const Sam = ({ size = 48 }) => (
  <svg width={size} height={size} viewBox="0 0 100 120" fill="none">
    {/* Body - waterdruppel */}
    <ellipse cx="50" cy="70" rx="38" ry="38" fill="#1B9AE4"/>
    <path d="M50 10 Q65 35 75 55 Q82 70 80 80 Q75 108 50 108 Q25 108 20 80 Q18 70 25 55 Q35 35 50 10Z" fill="#1B9AE4"/>
    {/* Glans */}
    <ellipse cx="38" cy="55" rx="8" ry="12" fill="rgba(255,255,255,0.35)" transform="rotate(-20 38 55)"/>
    {/* Ogen */}
    <circle cx="38" cy="68" r="11" fill="white"/>
    <circle cx="62" cy="68" r="11" fill="white"/>
    <circle cx="40" cy="69" r="6" fill="#1A1A2E"/>
    <circle cx="64" cy="69" r="6" fill="#1A1A2E"/>
    <circle cx="42" cy="66" r="2.5" fill="white"/>
    <circle cx="66" cy="66" r="2.5" fill="white"/>
    {/* Lach */}
    <path d="M36 82 Q50 94 64 82" stroke="#1A1A2E" strokeWidth="3" strokeLinecap="round" fill="none"/>
    <path d="M38 82 Q50 92 62 82 Q50 96 38 82Z" fill="#E63946" opacity="0.7"/>
    {/* Helm */}
    <ellipse cx="50" cy="44" rx="28" ry="14" fill="white"/>
    <rect x="24" y="44" width="52" height="8" rx="4" fill="white"/>
    <rect x="28" y="44" width="44" height="4" rx="2" fill="#E8E8E8"/>
    <text x="50" y="42" textAnchor="middle" fontSize="7" fontWeight="bold" fill="#1B9AE4" fontFamily="Nunito,sans-serif">H2O</text>
    {/* Schoenen */}
    <ellipse cx="36" cy="110" rx="14" ry="7" fill="#1A1A2E"/>
    <ellipse cx="64" cy="110" rx="14" ry="7" fill="#1A1A2E"/>
    <ellipse cx="36" cy="107" rx="13" ry="6" fill="#2D2D44"/>
    <ellipse cx="64" cy="107" rx="13" ry="6" fill="#2D2D44"/>
    {/* Druppeltje boven */}
    <ellipse cx="62" cy="14" rx="5" ry="7" fill="#5BB8F0"/>
  </svg>
);

// ─── UI COMPONENTEN ───────────────────────────────────────────────────────────
const Av = ({ i, s=36, c=H2O.blue }) => (
  <div style={{width:s,height:s,borderRadius:"50%",background:c+"22",border:`2px solid ${c}44`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:s*.3,fontWeight:800,color:c,flexShrink:0}}>{i}</div>
);
const Tag = ({ label, color=H2O.blue }) => (
  <span style={{fontSize:11,fontWeight:700,padding:"3px 10px",borderRadius:20,background:color+"18",color,letterSpacing:".02em",whiteSpace:"nowrap"}}>{label}</span>
);
const Card = ({ children, style={}, onClick, className="" }) => (
  <div className={className} onClick={onClick} style={{background:H2O.white,borderRadius:12,border:`1px solid #DDE8F5`,boxShadow:"0 2px 8px rgba(27,154,228,0.06)",padding:20,...style}}>{children}</div>
);
const SectionHead = ({ children, sub, right }) => (
  <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:22}}>
    <div style={{display:"flex",alignItems:"center",gap:10}}>
      <div style={{width:4,height:26,background:H2O.blue,borderRadius:2}}/>
      <div>
        <h2 style={{fontFamily:"'Nunito',sans-serif",fontSize:20,fontWeight:900,color:H2O.gray900,letterSpacing:"-0.01em"}}>{children}</h2>
        {sub && <div style={{fontSize:12,color:H2O.gray500,marginTop:2}}>{sub}</div>}
      </div>
    </div>
    {right && <div>{right}</div>}
  </div>
);
const Btn = ({ onClick, children, variant="primary", disabled, style:sx={} }) => {
  const v = {
    primary:{background:disabled?"#aaa":H2O.blue,color:H2O.white,border:"none"},
    ghost:{background:"transparent",color:H2O.gray700,border:`1.5px solid ${H2O.gray300}`},
    danger:{background:H2O.redLight,color:H2O.red,border:`1px solid ${H2O.red}44`},
  };
  return <button onClick={onClick} disabled={disabled} className="bh" style={{padding:"10px 20px",borderRadius:8,cursor:disabled?"not-allowed":"pointer",fontFamily:"inherit",fontWeight:700,fontSize:13,...v[variant],...sx}}>{children}</button>;
};
const Inp = ({ label, type="text", value, onChange, placeholder, rows }) => (
  <div style={{marginBottom:14}}>
    {label && <div style={{fontSize:11,fontWeight:700,color:H2O.gray500,letterSpacing:".08em",textTransform:"uppercase",marginBottom:5}}>{label}</div>}
    {rows
      ? <textarea value={value} onChange={e=>onChange(e.target.value)} placeholder={placeholder} rows={rows} style={{width:"100%",border:`1.5px solid ${H2O.gray300}`,borderRadius:8,padding:"10px 13px",color:H2O.gray900,fontSize:13,lineHeight:1.6,resize:"vertical"}}/>
      : <input type={type} value={value} onChange={e=>onChange(e.target.value)} placeholder={placeholder} style={{width:"100%",border:`1.5px solid ${H2O.gray300}`,borderRadius:8,padding:"10px 13px",color:H2O.gray900,fontSize:13}}/>
    }
  </div>
);
const Sel = ({ label, value, onChange, options }) => (
  <div style={{marginBottom:14}}>
    {label && <div style={{fontSize:11,fontWeight:700,color:H2O.gray500,letterSpacing:".08em",textTransform:"uppercase",marginBottom:5}}>{label}</div>}
    <select value={value} onChange={e=>onChange(e.target.value)} style={{width:"100%",border:`1.5px solid ${H2O.gray300}`,borderRadius:8,padding:"10px 13px",color:H2O.gray900,fontSize:13,background:H2O.white,cursor:"pointer"}}>
      {options.map(o=><option key={o.value||o} value={o.value||o}>{o.label||o}</option>)}
    </select>
  </div>
);

// ─── HELPER: mijn bedrijf procedures + toolboxen ──────────────────────────────
const getMijnProcedures = (bedrijf) => [
  ...(PROCEDURES.h2o || []),
  ...(PROCEDURES[bedrijf] || []),
];
const getMijnToolboxen = (bedrijf) => [
  ...(TOOLBOXEN.h2o || []),
  ...(TOOLBOXEN[bedrijf] || []),
];

// ─── LOGIN ─────────────────────────────────────────────────────────────────────
function Login({ onLogin }) {
  const [email,setEmail]=useState(""); const [pw,setPw]=useState("");
  const [err,setErr]=useState(""); const [loading,setLoading]=useState(false);
  const go = async () => {
    setErr(""); if(!email||!pw){setErr("Vul e-mail en wachtwoord in.");return;}
    setLoading(true); await new Promise(r=>setTimeout(r,700));
    const u = USERS[email.toLowerCase()];
    if(!u||u.pw!==pw){setErr("Ongeldige combinatie.");setLoading(false);return;}
    setLoading(false); onLogin({...u,email:email.toLowerCase()});
  };
  const DEMO = [
    ["admin@safetysam.be","admin2026","H2O Group — Admin","#0A4D8C"],
    ["hye@safetysam.be","hye2026","HYE — Leidinggevende","#0A4D8C"],
    ["argex@safetysam.be","argex2026","Argex — Leidinggevende","#8B6914"],
    ["pdk@safetysam.be","pdk2026","Pylonen De Kerf — Leidinggevende","#C0392B"],
    ["navitec@safetysam.be","navitec2026","Navitec — Leidinggevende","#117A65"],
    ["werknemer@safetysam.be","werk2026","HYE — Medewerker","#1B9AE4"],
    ["nieuw@safetysam.be","nieuw2026","Nieuwe medewerker (onboarding)","#7B2FBE"],
  ];
  return (
    <div style={{minHeight:"100vh",background:`linear-gradient(160deg,${H2O.blueDeep} 0%,${H2O.blueDark} 55%,${H2O.blue} 100%)`,display:"flex",alignItems:"center",justifyContent:"center",padding:20}}>
      <div className="fu" style={{width:"100%",maxWidth:440}}>
        {/* Header met Sam */}
        <div style={{textAlign:"center",marginBottom:24}}>
          <div className="sam-bounce" style={{display:"inline-block",marginBottom:8}}>
            <Sam size={80}/>
          </div>
          <div style={{fontFamily:"'Nunito',sans-serif",fontSize:28,fontWeight:900,color:H2O.white,letterSpacing:"-0.02em"}}>SafetySam</div>
          <div style={{fontSize:13,color:"rgba(255,255,255,0.7)",marginTop:2}}>H2O Group · Veiligheidsplatform</div>
        </div>

        <div style={{background:H2O.white,borderRadius:16,padding:28,boxShadow:"0 20px 60px rgba(10,77,140,0.4)"}}>
          <div style={{fontFamily:"'Nunito',sans-serif",fontSize:17,fontWeight:900,color:H2O.gray900,marginBottom:20}}>Aanmelden</div>
          {[["E-mailadres","email",email,setEmail,"naam@bedrijf.be"],["Wachtwoord","password",pw,setPw,"••••••••"]].map(([l,t,v,s,p])=>(
            <div key={l} style={{marginBottom:14}}>
              <div style={{fontSize:11,fontWeight:700,color:H2O.gray500,letterSpacing:".08em",textTransform:"uppercase",marginBottom:5}}>{l}</div>
              <input type={t} value={v} onChange={e=>s(e.target.value)} placeholder={p} style={{width:"100%",border:`1.5px solid ${H2O.gray300}`,borderRadius:8,padding:"11px 13px",color:H2O.gray900,fontSize:14,fontFamily:"inherit"}}/>
            </div>
          ))}
          {err && <div style={{fontSize:13,color:H2O.red,marginBottom:12,padding:"9px 13px",background:H2O.redLight,borderRadius:8}}>⚠ {err}</div>}
          <button onClick={go} disabled={loading} className="bh" style={{width:"100%",padding:12,background:loading?"#aaa":H2O.blue,color:H2O.white,border:"none",borderRadius:9,fontFamily:"'Nunito',sans-serif",fontWeight:800,fontSize:15,cursor:loading?"not-allowed":"pointer"}}>
            {loading?"Aanmelden…":"Aanmelden →"}
          </button>

          <div style={{marginTop:18}}>
            <div style={{fontSize:11,fontWeight:700,color:H2O.gray500,letterSpacing:".08em",textTransform:"uppercase",marginBottom:8}}>💧 Klik om in te loggen</div>
            {DEMO.map(([e,p,r,c])=>(
              <div key={e} onClick={()=>{setEmail(e);setPw(p);}}
                style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"9px 12px",borderRadius:9,marginBottom:5,cursor:"pointer",border:`1.5px solid ${c}22`,background:email===e?c+"12":"#fafafa",transition:"all .15s"}}
                onMouseEnter={ev=>ev.currentTarget.style.background=c+"12"} onMouseLeave={ev=>ev.currentTarget.style.background=email===e?c+"12":"#fafafa"}>
                <div style={{display:"flex",alignItems:"center",gap:8}}>
                  <div style={{width:28,height:28,borderRadius:"50%",background:c+"22",border:`1.5px solid ${c}44`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:10,fontWeight:800,color:c,flexShrink:0}}>{r.substring(0,2).toUpperCase()}</div>
                  <div>
                    <div style={{fontSize:12,fontWeight:700,color:H2O.gray900}}>{r}</div>
                    <div style={{fontSize:10,color:H2O.gray500}}>{e}</div>
                  </div>
                </div>
                <div style={{fontSize:10,color:c,fontWeight:700,background:c+"15",padding:"2px 8px",borderRadius:4}}>{email===e?"✓ OK":"Klik"}</div>
              </div>
            ))}
          </div>
        </div>
        <div style={{textAlign:"center",marginTop:12,fontSize:11,color:"rgba(255,255,255,0.4)"}}>🔒 HTTPS beveiligd · H2O Group · Alleen bevoegde gebruikers</div>
      </div>
    </div>
  );
}

// ─── ONBOARDING ────────────────────────────────────────────────────────────────
function Onboarding({ user, onComplete }) {
  const [stap,setStap]=useState(0); const [gedaan,setGedaan]=useState({});
  const [naam,setNaam]=useState(""); const [quizAntw,setQuizAntw]=useState({}); const [quizDone,setQuizDone]=useState(false);
  const h = ONBOARDING_STAPPEN[stap];
  const score = Object.entries(quizAntw).filter(([i,a])=>QUIZ[+i].juist===a).length;
  const bevestig = () => { setGedaan(p=>({...p,[h.id]:true})); if(stap<ONBOARDING_STAPPEN.length-1) setStap(s=>s+1); };
  const bedrijfInfo = BEDRIJVEN[user.bedrijf];

  return (
    <div style={{minHeight:"100vh",background:H2O.bg}}>
      <div style={{background:`linear-gradient(90deg,${H2O.blueDeep},${H2O.blue})`,padding:"0 20px",height:58,display:"flex",alignItems:"center",gap:12}}>
        <Sam size={36}/>
        <div>
          <div style={{fontFamily:"'Nunito',sans-serif",fontSize:15,fontWeight:900,color:H2O.white}}>SafetySam</div>
          <div style={{fontSize:11,color:"rgba(255,255,255,0.7)"}}>Welkom, {user.name.split(" ")[0]}! · {bedrijfInfo?.naam}</div>
        </div>
      </div>
      <div style={{maxWidth:580,margin:"0 auto",padding:"28px 20px"}}>

        {/* Sam welkomst */}
        {stap===0 && (
          <div style={{textAlign:"center",marginBottom:24,padding:"20px",background:H2O.white,borderRadius:16,border:`1px solid #DDE8F5`,boxShadow:"0 2px 8px rgba(27,154,228,0.08)"}}>
            <div className="sam-bounce" style={{display:"inline-block",marginBottom:8}}><Sam size={80}/></div>
            <div style={{fontFamily:"'Nunito',sans-serif",fontSize:20,fontWeight:900,color:H2O.gray900}}>Hé {user.name.split(" ")[0]}, ik ben Sam! 👋</div>
            <div style={{fontSize:14,color:H2O.gray500,marginTop:6,lineHeight:1.6}}>Jouw veiligheidsmascotte bij <strong>{bedrijfInfo?.naam}</strong>.<br/>Samen doorlopen we je onboarding. Dit duurt maar 20 minuten!</div>
          </div>
        )}

        {/* Voortgangsbalk */}
        <div style={{marginBottom:22}}>
          <div style={{display:"flex",justifyContent:"space-between",fontSize:12,color:H2O.gray500,marginBottom:6}}>
            <span>Stap {stap+1} van {ONBOARDING_STAPPEN.length}</span>
            <span style={{color:H2O.blue,fontWeight:700}}>{Math.round((Object.keys(gedaan).length/ONBOARDING_STAPPEN.length)*100)}% klaar</span>
          </div>
          <div style={{height:8,background:"#D0E8FA",borderRadius:4,overflow:"hidden"}}>
            <div style={{height:"100%",width:`${(Object.keys(gedaan).length/ONBOARDING_STAPPEN.length)*100}%`,background:`linear-gradient(90deg,${H2O.blueDark},${H2O.blue})`,borderRadius:4,transition:"width .4s"}}/>
          </div>
          <div style={{display:"flex",gap:5,marginTop:8}}>
            {ONBOARDING_STAPPEN.map((s,i)=>(
              <div key={s.id} style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",gap:2}}>
                <div style={{width:22,height:22,borderRadius:"50%",background:gedaan[s.id]?H2O.blue:i===stap?H2O.blueLight:"#fff",border:`2px solid ${gedaan[s.id]?H2O.blue:i===stap?H2O.blue:H2O.gray300}`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:10,fontWeight:800,color:gedaan[s.id]?H2O.white:i===stap?H2O.blue:H2O.gray300}}>{gedaan[s.id]?"✓":i+1}</div>
                <span style={{fontSize:8,color:gedaan[s.id]?H2O.blue:i===stap?H2O.blue:H2O.gray300,fontWeight:700,textTransform:"uppercase",textAlign:"center"}}>{s.tit.split(" ")[0].substring(0,5)}</span>
              </div>
            ))}
          </div>
        </div>

        <Card>
          <div style={{display:"flex",gap:14,alignItems:"center",marginBottom:18,paddingBottom:14,borderBottom:`1px solid ${H2O.gray100}`}}>
            <div style={{width:48,height:48,borderRadius:12,background:H2O.blueLight,display:"flex",alignItems:"center",justifyContent:"center",fontSize:24}}>{h.ico}</div>
            <div>
              <div style={{fontFamily:"'Nunito',sans-serif",fontSize:17,fontWeight:900,color:H2O.gray900}}>{h.tit}</div>
              <div style={{fontSize:13,color:H2O.gray500,marginTop:2}}>{h.desc}</div>
            </div>
          </div>

          {h.id==="welkom" && (
            <div>
              <div style={{background:H2O.blueLight,borderRadius:10,padding:16,marginBottom:14}}>
                <div style={{fontSize:13,fontWeight:700,color:H2O.blueDark,marginBottom:8}}>{bedrijfInfo?.emoji} Jouw bedrijf: {bedrijfInfo?.naam}</div>
                <div style={{fontSize:13,color:H2O.gray700,lineHeight:1.7}}>
                  <div>📍 Locatie: <strong>{bedrijfInfo?.locatie}</strong></div>
                  <div>🏭 Sector: <strong>{bedrijfInfo?.sector}</strong></div>
                </div>
              </div>
              <div style={{fontSize:13,color:H2O.gray600,marginBottom:14,lineHeight:1.7}}>
                SafetySam is het veiligheidsplatform voor alle H2O Group bedrijven. In de volgende stappen leer je de huisregels, noodprocedures en veiligheidscontacten kennen.
              </div>
              <Btn onClick={bevestig}>Laten we beginnen! →</Btn>
            </div>
          )}

          {h.id==="huisregels" && (
            <div>
              <div style={{background:H2O.gray50,borderRadius:9,padding:14,fontSize:13,color:H2O.gray700,lineHeight:1.85,marginBottom:14,maxHeight:200,overflowY:"auto",border:`1px solid ${H2O.gray100}`}}>
                <div style={{fontWeight:800,color:H2O.gray900,marginBottom:8}}>H2O Group — Gedragscode & Huisregels</div>
                {["Draag altijd de verplichte PBM's in aangewezen zones.",
                  "Meld elk incident, hoe klein ook, via SafetySam of aan je leidinggevende.",
                  "Voer altijd een LMRA uit vóór je aan een risicovolle taak begint.",
                  "Geen gsm bij het bedienen van machines of rijden met intern transport.",
                  "Nultolerantie: pesten, discriminatie of agressie wordt niet getolereerd.",
                  "Reddingsvest verplicht op <2m van open water — zonder uitzondering.",
                  "Bij twijfel over veiligheid: STOP het werk en vraag advies. Dat is je recht.",
                  "Alcohol en drugs: absolute nultolerantie tijdens werkuren.",
                  "Beveiligingen van machines nooit verwijderen of omzeilen.",
                  "Sam kijkt mee! Elke veilige dag is een goede dag. 💧",
                ].map((r,i)=><div key={i} style={{paddingBottom:6,paddingTop:i>0?6:0,borderBottom:i<9?`1px solid ${H2O.gray100}`:"none"}}>{i+1}. {r}</div>)}
              </div>
              <Inp label="Digitale handtekening — typ je volledige naam" value={naam} onChange={setNaam} placeholder="Volledige naam"/>
              <Btn onClick={bevestig} disabled={naam.trim().length<3}>✅ Ik bevestig de huisregels begrepen te hebben</Btn>
            </div>
          )}

          {h.id==="noodplan" && (
            <div>
              <div style={{display:"flex",gap:10,marginBottom:14}}>
                {[["112","Hulpdiensten",H2O.red],["333","Intern noodnum.",H2O.blue]].map(([n,l,c])=>(
                  <div key={n} style={{flex:1,background:c+"12",border:`2px solid ${c}33`,borderRadius:10,padding:"12px 14px",textAlign:"center"}}>
                    <div style={{fontSize:11,fontWeight:700,color:c,textTransform:"uppercase"}}>{l}</div>
                    <div style={{fontSize:32,fontWeight:900,color:c,fontFamily:"'Nunito',sans-serif"}}>{n}</div>
                  </div>
                ))}
              </div>
              <div style={{fontSize:12,color:H2O.gray500,marginBottom:10}}>H2O Group heeft 5 noodscenario's — speciaal ook voor werken aan water! Klik in de Noodplan-module om ze allemaal te bekijken.</div>
              <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:6,marginBottom:14}}>
                {NOODSCENARIOS.map(s=>(
                  <div key={s.id} style={{padding:"8px 6px",borderRadius:8,background:s.bg,border:`1px solid ${s.kleur}33`,textAlign:"center"}}>
                    <div style={{fontSize:18,marginBottom:2}}>{s.ico}</div>
                    <div style={{fontSize:10,fontWeight:700,color:s.kleur}}>{s.label}</div>
                  </div>
                ))}
              </div>
              <Btn onClick={bevestig}>✅ Noodplan begrepen</Btn>
            </div>
          )}

          {h.id==="contacten" && (
            <div>
              {[["EHBO'ers",EHBO_LEDEN],["Vertrouwenspersonen",VERTROUWENSPERSONEN]].map(([tit,lijst])=>(
                <div key={tit} style={{marginBottom:14}}>
                  <div style={{fontSize:11,fontWeight:700,color:H2O.gray500,letterSpacing:".08em",textTransform:"uppercase",marginBottom:8}}>{tit}</div>
                  {lijst.map(p=>(
                    <div key={p.naam} style={{display:"flex",gap:10,alignItems:"center",background:H2O.gray50,borderRadius:9,padding:"10px 12px",marginBottom:7,border:`1px solid ${H2O.gray100}`}}>
                      <Av i={p.init} s={38} c={p.kleur}/>
                      <div>
                        <div style={{fontSize:13,fontWeight:700,color:H2O.gray900}}>{p.naam}</div>
                        <div style={{fontSize:11,color:p.kleur,fontWeight:600}}>{p.rol}</div>
                        <div style={{fontSize:12,color:H2O.gray500}}>📞 {p.tel}</div>
                      </div>
                    </div>
                  ))}
                </div>
              ))}
              <Btn onClick={bevestig}>✅ Kennisgemaakt met contactpersonen</Btn>
            </div>
          )}

          {h.id==="toolbox" && (
            <div>
              <div style={{background:H2O.gray50,borderRadius:9,padding:14,marginBottom:14,border:`1px solid ${H2O.gray100}`}}>
                <div style={{fontWeight:800,color:H2O.gray900,marginBottom:10}}>🎬 Introductietoolbox H2O Group (20 min)</div>
                {["Veiligheidsbeleid H2O Group — alle bedrijven",
                  "Risicobeoordeling en LMRA: denk vóór je doet",
                  "Specifieke risico's van jouw bedrijf ({bedrijfInfo?.naam})",
                  "Noodprocedures en man-overboord bij waterwerk",
                  "Melden van incidenten via SafetySam",
                  "Sam's 10 gouden veiligheidsregels",
                ].map((p,i)=><div key={i} style={{fontSize:13,color:H2O.gray700,paddingBottom:5,borderBottom:i<5?`1px solid ${H2O.gray100}`:"none"}}>{i+1}. {p}</div>)}
                <div style={{background:H2O.blueLight,borderRadius:7,padding:"9px 12px",marginTop:10,fontSize:12,color:H2O.blueDark}}>
                  ✅ In de volledige app: video + automatische voortgang + digitale handtekening.
                </div>
              </div>
              <Btn onClick={bevestig}>✍ Toolbox gevolgd & ondertekend</Btn>
            </div>
          )}

          {h.id==="quiz" && !quizDone && (
            <div>
              {QUIZ.map((q,i)=>(
                <div key={i} style={{marginBottom:18}}>
                  <div style={{fontSize:13,fontWeight:700,color:H2O.gray900,marginBottom:8}}>{i+1}. {q.v}</div>
                  <div style={{display:"flex",flexDirection:"column",gap:6}}>
                    {q.opts.map((o,j)=>(
                      <div key={j} onClick={()=>setQuizAntw(p=>({...p,[i]:j}))}
                        style={{padding:"9px 13px",borderRadius:8,cursor:"pointer",fontSize:13,transition:"all .15s",background:quizAntw[i]===j?H2O.blueLight:H2O.gray50,border:`1.5px solid ${quizAntw[i]===j?H2O.blue:H2O.gray300}`,color:quizAntw[i]===j?H2O.blueDark:H2O.gray700,fontWeight:quizAntw[i]===j?700:400}}>
                        {["A","B","C","D"][j]}. {o}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
              <Btn onClick={()=>setQuizDone(true)} disabled={Object.keys(quizAntw).length<QUIZ.length}>📊 Resultaat bekijken</Btn>
            </div>
          )}

          {h.id==="quiz" && quizDone && (
            <div style={{textAlign:"center",padding:"12px 0"}}>
              <div className="sam-bounce" style={{display:"inline-block",marginBottom:8}}><Sam size={60}/></div>
              <div style={{fontFamily:"'Nunito',sans-serif",fontSize:26,fontWeight:900,color:score>=4?H2O.blue:H2O.amber,marginBottom:8}}>{score}/5 correct</div>
              <div style={{fontSize:14,color:H2O.gray500,marginBottom:20}}>
                {score===5?"Uitstekend! Sam is trots op je! 💧":score>=3?"Goed gedaan! Je bent klaar om veilig te starten!":"Bekijk het noodplan en de huisregels nog eens."}
              </div>
              {score>=3
                ? <Btn onClick={onComplete}>🚀 Aan de slag! SafetySam openen →</Btn>
                : <Btn variant="ghost" onClick={()=>{setQuizDone(false);setQuizAntw({});}}>🔄 Quiz opnieuw</Btn>}
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}

// ─── DASHBOARD ─────────────────────────────────────────────────────────────────
function Dashboard({ user, setTab }) {
  const isLead = user.role==="leidinggevende"||user.role==="admin";
  const isAdmin = user.role==="admin";
  const bedrijfInfo = BEDRIJVEN[user.bedrijf];
  const mijnToolboxen = getMijnToolboxen(user.bedrijf);
  const openToolboxen = mijnToolboxen.filter(t=>t.verplicht&&!t.gevolgd).length;
  const mijnVerlopen = MIJN_OPL.filter(o=>o.status!=="ok").length;

  return (
    <div className="fu">
      {/* Sam begroeting */}
      <div style={{display:"flex",alignItems:"center",gap:16,background:H2O.white,borderRadius:14,padding:"16px 20px",marginBottom:20,border:`1px solid #DDE8F5`,boxShadow:"0 2px 8px rgba(27,154,228,0.06)"}}>
        <div className="sam-bounce"><Sam size={52}/></div>
        <div>
          <div style={{fontFamily:"'Nunito',sans-serif",fontSize:17,fontWeight:900,color:H2O.gray900}}>Hé {user.name.split(" ")[0]}! 👋</div>
          <div style={{fontSize:13,color:H2O.gray500,marginTop:2}}>{bedrijfInfo?.emoji} {bedrijfInfo?.naam} · {bedrijfInfo?.locatie}</div>
          {openToolboxen>0 && <div style={{fontSize:12,color:H2O.red,fontWeight:700,marginTop:4}}>⚠ Je hebt nog {openToolboxen} verplichte toolbox(en) te volgen!</div>}
        </div>
      </div>

      <div style={{display:"grid",gridTemplateColumns:"repeat(2,1fr)",gap:10,marginBottom:22}}>
        {[
          {v:openToolboxen, l:"Toolboxen te doen",      c:openToolboxen>0?H2O.red:H2O.green, ico:"🎬"},
          {v:MIJN_OPL.filter(o=>o.status==="ok").length, l:"Mijn certs geldig", c:H2O.green,  ico:"✅"},
          {v:mijnVerlopen,  l:"Certs vervallen",         c:mijnVerlopen>0?H2O.amber:H2O.green,ico:"⚠"},
          {v:MOCK_MELDINGEN.filter(m=>m.bedrijf===user.bedrijf&&m.status!=="afgehandeld").length, l:"Open incidenten", c:H2O.blue, ico:"⚠️"},
        ].map(s=>(
          <Card key={s.l} style={{borderLeft:`4px solid ${s.c}`}}>
            <div style={{fontSize:11,color:H2O.gray500,marginBottom:4}}>{s.ico} {s.l}</div>
            <div style={{fontSize:28,fontWeight:900,color:s.c,fontFamily:"'Nunito',sans-serif"}}>{s.v}</div>
          </Card>
        ))}
      </div>

      <div style={{fontSize:11,fontWeight:700,color:H2O.gray500,letterSpacing:".08em",textTransform:"uppercase",marginBottom:10}}>Snelle toegang</div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(2,1fr)",gap:8,marginBottom:22}}>
        {[{ico:"🩺",lbl:"EHBO & Contacten",tab:"contacten"},{ico:"🚨",lbl:"Noodplan",tab:"noodplan"},{ico:"📚",lbl:"Procedures",tab:"bibliotheek"},{ico:"⚠️",lbl:"Incident melden",tab:"incidenten"}].map(({ico,lbl,tab})=>(
          <Card key={lbl} className="rh" onClick={()=>setTab(tab)} style={{display:"flex",alignItems:"center",gap:12,padding:"13px 16px",cursor:"pointer"}}>
            <div style={{width:34,height:34,borderRadius:9,background:H2O.blueLight,display:"flex",alignItems:"center",justifyContent:"center",fontSize:17}}>{ico}</div>
            <span style={{fontSize:13,fontWeight:700,color:H2O.gray800}}>{lbl}</span>
            <span style={{marginLeft:"auto",color:H2O.gray300,fontSize:14}}>→</span>
          </Card>
        ))}
      </div>

      {/* Admin: overzicht alle bedrijven */}
      {isAdmin && (
        <>
          <div style={{fontSize:11,fontWeight:700,color:H2O.gray500,letterSpacing:".08em",textTransform:"uppercase",marginBottom:10}}>H2O Group — Alle bedrijven</div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(2,1fr)",gap:8,marginBottom:20}}>
            {Object.entries(BEDRIJVEN).filter(([k])=>k!=="h2o").map(([key,b])=>(
              <Card key={key} style={{borderLeft:`4px solid ${b.kleur}`,padding:"13px 16px"}}>
                <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:4}}>
                  <span style={{fontSize:18}}>{b.emoji}</span>
                  <span style={{fontSize:13,fontWeight:800,color:H2O.gray900}}>{b.naam}</span>
                </div>
                <div style={{fontSize:11,color:H2O.gray500}}>{b.locatie}</div>
                <div style={{fontSize:11,color:H2O.gray500}}>{b.sector}</div>
              </Card>
            ))}
          </div>
        </>
      )}

      {isLead && (
        <>
          <div style={{fontSize:11,fontWeight:700,color:H2O.gray500,letterSpacing:".08em",textTransform:"uppercase",marginBottom:10}}>Open incidenten — {bedrijfInfo?.naam}</div>
          <Card style={{marginBottom:16}}>
            {MOCK_MELDINGEN.filter(m=>(isAdmin||m.bedrijf===user.bedrijf)&&m.status!=="afgehandeld").map(m=>{
              const t = INCIDENT_TYPES.find(x=>x.id===m.type);
              const b = BEDRIJVEN[m.bedrijf];
              return (
                <div key={m.id} style={{display:"flex",gap:12,alignItems:"center",padding:"10px 0",borderBottom:`1px solid ${H2O.gray100}`}}>
                  <div style={{width:34,height:34,borderRadius:9,background:t.bg,display:"flex",alignItems:"center",justifyContent:"center",fontSize:17,flexShrink:0}}>{t.ico}</div>
                  <div style={{flex:1}}>
                    <div style={{fontSize:13,fontWeight:700,color:H2O.gray900}}>{m.titel}</div>
                    <div style={{fontSize:11,color:H2O.gray500}}>{m.datum} · {m.locatie} {isAdmin?`· ${b?.emoji} ${b?.naam}`:""}</div>
                  </div>
                  <Tag label={m.status==="onderzoek"?"In onderzoek":"Gemeld"} color={m.status==="onderzoek"?H2O.blue:H2O.amber}/>
                </div>
              );
            })}
            {MOCK_MELDINGEN.filter(m=>(isAdmin||m.bedrijf===user.bedrijf)&&m.status!=="afgehandeld").length===0 && (
              <div style={{textAlign:"center",padding:16,color:H2O.green,fontWeight:700}}>✅ Geen open incidenten — goed bezig!</div>
            )}
          </Card>
        </>
      )}
    </div>
  );
}

// ─── BIBLIOTHEEK ──────────────────────────────────────────────────────────────
function Bibliotheek({ user }) {
  const [zoek,setZoek]=useState("");
  const [geselecteerd,setGeselecteerd]=useState(null);
  const [filterBedrijf,setFilterBedrijf]=useState("mijn");
  const isAdmin = user.role==="admin";

  const alleProcs = isAdmin&&filterBedrijf==="alles"
    ? Object.values(PROCEDURES).flat()
    : getMijnProcedures(user.bedrijf);

  const gefilterd = alleProcs.filter(d=>{
    if(zoek&&!d.titel.toLowerCase().includes(zoek.toLowerCase())&&!d.tags.some(t=>t.toLowerCase().includes(zoek.toLowerCase()))) return false;
    return true;
  });

  if(geselecteerd) {
    const d = [...Object.values(PROCEDURES).flat()].find(x=>x.id===geselecteerd);
    return (
      <div className="fu">
        <button onClick={()=>setGeselecteerd(null)} style={{background:"transparent",border:`1px solid ${H2O.gray300}`,color:H2O.gray700,padding:"7px 13px",borderRadius:8,cursor:"pointer",fontSize:13,fontFamily:"inherit",marginBottom:20}}>← Terug</button>
        <Card>
          <div style={{display:"flex",gap:14,alignItems:"flex-start",marginBottom:18,paddingBottom:16,borderBottom:`1px solid ${H2O.gray100}`}}>
            <div style={{width:52,height:52,borderRadius:12,background:H2O.blueLight,display:"flex",alignItems:"center",justifyContent:"center",fontSize:26,flexShrink:0}}>📋</div>
            <div style={{flex:1}}>
              <Tag label={d.cat}/>
              <div style={{fontFamily:"'Nunito',sans-serif",fontSize:17,fontWeight:900,color:H2O.gray900,marginTop:6,marginBottom:4}}>{d.titel}</div>
              <div style={{display:"flex",gap:10,fontSize:12,color:H2O.gray500,flexWrap:"wrap"}}>
                <span>Versie: <strong>{d.versie}</strong></span>
                <span>Datum: <strong>{d.datum}</strong></span>
                <span>Auteur: <strong>{d.auteur}</strong></span>
              </div>
            </div>
          </div>
          <div style={{fontSize:14,color:H2O.gray700,lineHeight:1.7,marginBottom:16}}>{d.beschrijving}</div>
          <div style={{display:"flex",gap:5,flexWrap:"wrap",marginBottom:16}}>{d.tags.map(t=><Tag key={t} label={t} color={H2O.blueDark}/>)}</div>
          {d.kernpunten && (
            <div style={{marginBottom:16}}>
              <div style={{fontSize:12,fontWeight:700,color:H2O.gray500,textTransform:"uppercase",letterSpacing:".08em",marginBottom:10}}>Kernpunten</div>
              {d.kernpunten.map((k,i)=>(
                <div key={i} style={{display:"flex",gap:10,padding:"7px 0",borderBottom:`1px solid ${H2O.gray100}`,fontSize:13,color:H2O.gray700}}>
                  <span style={{color:H2O.blue,fontWeight:700,flexShrink:0}}>✓</span>{k}
                </div>
              ))}
            </div>
          )}
          {d.verboden && (
            <div style={{background:H2O.redLight,borderRadius:9,padding:14,marginBottom:14,border:`1px solid ${H2O.red}33`}}>
              <div style={{fontSize:12,fontWeight:700,color:H2O.red,textTransform:"uppercase",letterSpacing:".08em",marginBottom:8}}>🚫 Verboden handelingen</div>
              {d.verboden.map((v,i)=><div key={i} style={{fontSize:13,color:H2O.red,padding:"4px 0",borderBottom:i<d.verboden.length-1?`1px solid ${H2O.red}22`:"none"}}>✗ {v}</div>)}
            </div>
          )}
          {d.pbm && (
            <div style={{background:H2O.blueLight,borderRadius:9,padding:14,border:`1px solid ${H2O.blue}33`}}>
              <div style={{fontSize:12,fontWeight:700,color:H2O.blueDark,textTransform:"uppercase",letterSpacing:".08em",marginBottom:8}}>🦺 Verplichte PBM's</div>
              <div style={{display:"flex",flexWrap:"wrap",gap:6}}>{d.pbm.map(p=><Tag key={p} label={p} color={H2O.blueDark}/>)}</div>
            </div>
          )}
        </Card>
      </div>
    );
  }

  return (
    <div className="fu">
      <SectionHead sub="Officiële procedures per bedrijf">Procedurebibliotheek</SectionHead>
      {isAdmin && (
        <div style={{display:"flex",gap:6,marginBottom:16}}>
          {[["mijn","Mijn bedrijven"],["alles","Alle H2O bedrijven"]].map(([v,l])=>(
            <button key={v} onClick={()=>setFilterBedrijf(v)} style={{padding:"7px 14px",borderRadius:20,border:"none",cursor:"pointer",fontSize:12,fontWeight:700,fontFamily:"inherit",background:filterBedrijf===v?H2O.blue:H2O.gray100,color:filterBedrijf===v?H2O.white:H2O.gray700,transition:"all .15s"}}>{l}</button>
          ))}
        </div>
      )}
      {/* Bedrijfssecties */}
      {!zoek && (
        <div style={{display:"grid",gridTemplateColumns:"repeat(2,1fr)",gap:8,marginBottom:16}}>
          {Object.entries(BEDRIJVEN).filter(([k])=>k==="h2o"||(getMijnProcedures(user.bedrijf).some(p=>PROCEDURES[k]?.includes(p)))||isAdmin).map(([key,b])=>(
            (PROCEDURES[key]||[]).length>0 && (
              <Card key={key} style={{padding:"11px 14px",borderLeft:`4px solid ${b.kleur}`}}>
                <div style={{display:"flex",alignItems:"center",gap:8}}>
                  <span style={{fontSize:18}}>{b.emoji}</span>
                  <div>
                    <div style={{fontSize:12,fontWeight:800,color:H2O.gray900}}>{b.naam}</div>
                    <div style={{fontSize:11,color:H2O.gray500}}>{(PROCEDURES[key]||[]).length} procedures</div>
                  </div>
                </div>
              </Card>
            )
          ))}
        </div>
      )}
      <div style={{position:"relative",marginBottom:16}}>
        <span style={{position:"absolute",left:13,top:"50%",transform:"translateY(-50%)",color:H2O.gray400,fontSize:14}}>🔍</span>
        <input value={zoek} onChange={e=>setZoek(e.target.value)} placeholder="Zoek op titel of trefwoord…" style={{width:"100%",border:`1.5px solid ${H2O.gray300}`,borderRadius:9,padding:"10px 12px 10px 36px",color:H2O.gray900,fontSize:13,fontFamily:"inherit"}}/>
      </div>
      {gefilterd.map(d=>(
        <Card key={d.id} className="rh" onClick={()=>setGeselecteerd(d.id)} style={{padding:"13px 16px",marginBottom:7}}>
          <div style={{display:"flex",gap:12,alignItems:"flex-start"}}>
            <div style={{width:38,height:38,borderRadius:9,background:H2O.blueLight,display:"flex",alignItems:"center",justifyContent:"center",fontSize:19,flexShrink:0}}>📋</div>
            <div style={{flex:1,minWidth:0}}>
              <div style={{display:"flex",alignItems:"flex-start",justifyContent:"space-between",gap:8,flexWrap:"wrap",marginBottom:3}}>
                <div style={{fontSize:14,fontWeight:700,color:H2O.gray900,flex:1}}>{d.titel}</div>
                <Tag label={d.cat}/>
              </div>
              <div style={{fontSize:11,color:H2O.gray500,marginBottom:5}}>{d.versie} · {d.datum} · {d.auteur}</div>
              <div style={{display:"flex",gap:5,flexWrap:"wrap"}}>{d.tags.slice(0,4).map(t=><Tag key={t} label={t} color={H2O.blueDark}/>)}</div>
            </div>
            <span style={{color:H2O.gray300,fontSize:14,flexShrink:0}}>→</span>
          </div>
        </Card>
      ))}
    </div>
  );
}

// ─── TOOLBOXEN ─────────────────────────────────────────────────────────────────
function Toolboxen({ user }) {
  const [toolboxen,setToolboxen]=useState(getMijnToolboxen(user.bedrijf));
  const [actief,setActief]=useState(null);
  const [signing,setSigning]=useState(false);
  const [signNaam,setSignNaam]=useState("");
  const teken = (id) => { setToolboxen(p=>p.map(t=>t.id===id?{...t,gevolgd:true,datum:new Date().toLocaleDateString("nl-BE")}:t)); setSigning(false); setActief(null); setSignNaam(""); };

  if(actief) {
    const t = toolboxen.find(x=>x.id===actief);
    return (
      <div className="fu">
        <button onClick={()=>setActief(null)} style={{background:"transparent",border:`1px solid ${H2O.gray300}`,color:H2O.gray700,padding:"7px 13px",borderRadius:8,cursor:"pointer",fontSize:13,fontFamily:"inherit",marginBottom:20}}>← Terug</button>
        <SectionHead>{t.titel}</SectionHead>
        <Card>
          <div style={{display:"flex",gap:7,marginBottom:14,flexWrap:"wrap"}}>
            <Tag label={t.cat}/><Tag label={t.duur} color={H2O.gray500}/>{t.verplicht&&<Tag label="Verplicht" color={H2O.red}/>}
          </div>
          <div style={{background:H2O.gray50,borderRadius:9,padding:14,marginBottom:14,border:`1px solid ${H2O.gray100}`}}>
            <div style={{fontWeight:800,color:H2O.gray900,marginBottom:10}}>🎬 Inhoud van deze toolbox ({t.duur})</div>
            <div style={{fontSize:13,color:H2O.gray600,padding:12,background:H2O.blueLight,borderRadius:8}}>
              Deze toolbox behandelt de specifieke veiligheidsrisico's en regels voor <strong>{t.cat}</strong> bij H2O Group.
            </div>
            <div style={{marginTop:12,padding:"9px 12px",background:"#FFFBF0",borderRadius:7,fontSize:12,color:H2O.amber,fontWeight:600,border:`1px solid ${H2O.amber}33`}}>
              🎬 Echte app: video + voortgang bijhouden + digitale handtekening.
            </div>
          </div>
          {!t.gevolgd && !signing && <Btn onClick={()=>setSigning(true)}>✍ Toolbox ondertekenen</Btn>}
          {t.gevolgd && <div style={{color:H2O.green,fontWeight:700,fontSize:14}}>✅ Gevolgd op {t.datum}</div>}
          {signing && (
            <div style={{marginTop:14,borderTop:`1px solid ${H2O.gray100}`,paddingTop:14}}>
              <div style={{fontSize:13,color:H2O.gray500,marginBottom:8}}>Typ je naam als digitale handtekening:</div>
              <input value={signNaam} onChange={e=>setSignNaam(e.target.value)} placeholder="Volledige naam" style={{width:"100%",border:`1.5px solid ${H2O.gray300}`,borderRadius:8,padding:"10px 13px",color:H2O.gray900,fontSize:13,fontFamily:"inherit",marginBottom:10}}/>
              <div style={{display:"flex",gap:8}}><Btn onClick={()=>teken(t.id)} disabled={signNaam.trim().length<3}>✅ Bevestigen</Btn><Btn variant="ghost" onClick={()=>setSigning(false)}>Annuleren</Btn></div>
            </div>
          )}
        </Card>
      </div>
    );
  }

  return (
    <div className="fu">
      <SectionHead sub={`${toolboxen.filter(t=>t.gevolgd).length}/${toolboxen.length} gevolgd`}>Toolboxen</SectionHead>
      {toolboxen.filter(t=>t.verplicht&&!t.gevolgd).length>0 && (
        <div style={{background:H2O.redLight,border:`1px solid ${H2O.red}33`,borderRadius:10,padding:"11px 16px",marginBottom:16,fontSize:13,color:H2O.red,fontWeight:700}}>
          ⚠ Nog {toolboxen.filter(t=>t.verplicht&&!t.gevolgd).length} verplichte toolbox(en) te volgen!
        </div>
      )}
      {[["⚠ Verplicht — te volgen",toolboxen.filter(t=>t.verplicht&&!t.gevolgd),H2O.red],["✅ Gevolgd",toolboxen.filter(t=>t.gevolgd),H2O.green]].map(([tit,lijst,klr])=> lijst.length>0 && (
        <div key={tit} style={{marginBottom:20}}>
          <div style={{fontSize:11,fontWeight:700,color:H2O.gray500,letterSpacing:".08em",textTransform:"uppercase",marginBottom:8}}>{tit}</div>
          {lijst.map(t=>(
            <Card key={t.id} className="rh" onClick={()=>setActief(t.id)} style={{marginBottom:7,display:"flex",justifyContent:"space-between",alignItems:"center",padding:"13px 16px"}}>
              <div>
                <div style={{fontSize:14,fontWeight:700,color:H2O.gray900,marginBottom:4}}>{t.titel}</div>
                <div style={{display:"flex",gap:6,flexWrap:"wrap"}}><Tag label={t.cat}/><Tag label={t.duur} color={H2O.gray500}/>{t.datum&&<span style={{fontSize:11,color:H2O.green,fontWeight:700}}>✓ {t.datum}</span>}</div>
              </div>
              <span style={{color:klr,fontSize:18}}>{t.gevolgd?"✅":t.verplicht?"⚠":"→"}</span>
            </Card>
          ))}
        </div>
      ))}
    </div>
  );
}

// ─── OPLEIDINGEN ──────────────────────────────────────────────────────────────
function Opleidingen({ user }) {
  const isLead = user.role==="leidinggevende"||user.role==="admin";
  const [sel,setSel]=useState(null);
  const klr = s=>({ok:H2O.green,binnenkort:H2O.amber,verlopen:H2O.red}[s]);
  const lbl = s=>({ok:"Geldig",binnenkort:"Binnenkort",verlopen:"Verlopen"}[s]);
  const mijnTeam = TEAM.filter(m=>user.role==="admin"||m.bedrijf===user.bedrijf);

  return (
    <div className="fu">
      <SectionHead>{isLead?"Opleidingen & Certificaten":"Mijn Opleidingen"}</SectionHead>
      <div style={{display:"flex",gap:8,marginBottom:14}}>
        {["ok","binnenkort","verlopen"].map(s=>(
          <Card key={s} style={{flex:1,textAlign:"center",borderTop:`3px solid ${klr(s)}`}}>
            <div style={{fontSize:22,fontWeight:900,color:klr(s),fontFamily:"'Nunito',sans-serif"}}>{MIJN_OPL.filter(o=>o.status===s).length}</div>
            <div style={{fontSize:11,color:H2O.gray500}}>{lbl(s)}</div>
          </Card>
        ))}
      </div>
      {MIJN_OPL.map(o=>(
        <Card key={o.naam} style={{marginBottom:7,display:"flex",justifyContent:"space-between",alignItems:"center"}}>
          <div><div style={{fontSize:14,fontWeight:700,color:H2O.gray900,marginBottom:3}}>{o.naam}</div><div style={{fontSize:12,color:H2O.gray500}}>Behaald: {o.datum} · Geldig tot: <span style={{color:klr(o.status),fontWeight:700}}>{o.verval}</span></div></div>
          <Tag label={lbl(o.status)} color={klr(o.status)}/>
        </Card>
      ))}
      <Card style={{background:H2O.blueLight,border:`1px solid ${H2O.blue}33`,marginBottom:22}}>
        <div style={{fontSize:12,color:H2O.blueDark}}>💡 Verlopen certificaat? Meld dit aan je leidinggevende voor herinschrijving.</div>
      </Card>
      {isLead && mijnTeam.length>0 && (
        <>
          <div style={{fontSize:11,fontWeight:700,color:H2O.gray500,letterSpacing:".08em",textTransform:"uppercase",marginBottom:10}}>Team certificaten</div>
          {mijnTeam.map(m=>(
            <Card key={m.id} className="rh" onClick={()=>setSel(sel===m.id?null:m.id)} style={{marginBottom:8}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:sel===m.id?10:0}}>
                <div style={{display:"flex",gap:10,alignItems:"center"}}>
                  <Av i={m.avatar} s={38} c={m.opleidingen.some(o=>!o.ok)?H2O.amber:H2O.green}/>
                  <div>
                    <div style={{fontSize:14,fontWeight:700,color:H2O.gray900}}>{m.name}</div>
                    <div style={{fontSize:12,color:H2O.gray500}}>{m.functie} · {BEDRIJVEN[m.bedrijf]?.naam}</div>
                  </div>
                </div>
                <div style={{display:"flex",gap:8,alignItems:"center"}}>
                  {m.opleidingen.some(o=>!o.ok)&&<Tag label={`${m.opleidingen.filter(o=>!o.ok).length} verlopen`} color={H2O.red}/>}
                  <span style={{color:H2O.gray300,fontSize:13}}>{sel===m.id?"▲":"▼"}</span>
                </div>
              </div>
              {sel===m.id && (
                <div style={{borderTop:`1px solid ${H2O.gray100}`,paddingTop:10}}>
                  {m.opleidingen.map(o=>(
                    <div key={o.naam} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"7px 0",borderBottom:`1px solid ${H2O.gray100}`}}>
                      <div><div style={{fontSize:13,color:H2O.gray900}}>{o.naam}</div><div style={{fontSize:11,color:H2O.gray500}}>Geldig tot {o.verval}</div></div>
                      <Tag label={o.ok?"Geldig":"Verlopen"} color={o.ok?H2O.green:H2O.red}/>
                    </div>
                  ))}
                </div>
              )}
            </Card>
          ))}
        </>
      )}
    </div>
  );
}

// ─── NOODPLAN ─────────────────────────────────────────────────────────────────
function Noodplan() {
  const [actief,setActief]=useState(null);
  const sc = actief?NOODSCENARIOS.find(s=>s.id===actief):null;
  if(sc) return (
    <div className="fu">
      <button onClick={()=>setActief(null)} style={{background:"transparent",border:`1px solid ${H2O.gray300}`,color:H2O.gray700,padding:"7px 13px",borderRadius:8,cursor:"pointer",fontSize:13,fontFamily:"inherit",marginBottom:20}}>← Terug</button>
      <div style={{background:sc.bg,border:`1px solid ${sc.kleur}33`,borderRadius:12,padding:"16px 18px",marginBottom:18,display:"flex",alignItems:"center",gap:12}}>
        <div style={{fontSize:36}}>{sc.ico}</div>
        <div>
          <div style={{fontFamily:"'Nunito',sans-serif",fontSize:20,fontWeight:900,color:H2O.gray900}}>{sc.label}</div>
          <div style={{fontSize:13,color:H2O.gray500}}>Volg de stappen in volgorde op</div>
        </div>
      </div>
      <div style={{display:"flex",gap:10,marginBottom:16}}>
        {[["112","Hulpdiensten",H2O.red],["333","Intern noodnum.",H2O.blue]].map(([n,l,c])=>(
          <div key={n} style={{flex:1,background:c+"12",border:`2px solid ${c}33`,borderRadius:10,padding:"10px 14px",textAlign:"center"}}>
            <div style={{fontSize:11,fontWeight:700,color:c,textTransform:"uppercase"}}>{l}</div>
            <div style={{fontSize:30,fontWeight:900,color:c,fontFamily:"'Nunito',sans-serif"}}>{n}</div>
          </div>
        ))}
      </div>
      {sc.stappen.map((s,i)=>(
        <div key={s.nr} style={{display:"flex",gap:0,alignItems:"stretch",marginBottom:8}}>
          <div style={{display:"flex",flexDirection:"column",alignItems:"center",marginRight:12}}>
            <div style={{width:36,height:36,borderRadius:"50%",background:sc.kleur,display:"flex",alignItems:"center",justifyContent:"center",fontSize:14,fontWeight:800,color:"#fff",flexShrink:0}}>{s.nr}</div>
            {i<sc.stappen.length-1&&<div style={{width:2,flex:1,background:sc.kleur+"33",marginTop:4}}/>}
          </div>
          <Card style={{flex:1,padding:"12px 14px",marginBottom:0,display:"flex",gap:10,alignItems:"flex-start"}}>
            <span style={{fontSize:20,flexShrink:0}}>{s.ico}</span>
            <div><div style={{fontSize:13,fontWeight:700,color:H2O.gray900,marginBottom:2}}>{s.tit}</div><div style={{fontSize:12,color:H2O.gray500,lineHeight:1.6}}>{s.txt}</div></div>
          </Card>
        </div>
      ))}
    </div>
  );
  return (
    <div className="fu">
      <SectionHead sub="Klik op een scenario voor de stap-voor-stap procedure">Noodplan & Evacuatie</SectionHead>
      <div style={{display:"flex",gap:10,marginBottom:18}}>
        {[["112","Hulpdiensten",H2O.red],["333","Intern noodnum.",H2O.blue]].map(([n,l,c])=>(
          <Card key={n} style={{flex:1,textAlign:"center",borderTop:`4px solid ${c}`}}>
            <div style={{fontSize:11,fontWeight:700,color:c,textTransform:"uppercase"}}>{l}</div>
            <div style={{fontSize:34,fontWeight:900,color:c,fontFamily:"'Nunito',sans-serif"}}>{n}</div>
          </Card>
        ))}
      </div>
      <div style={{background:H2O.blueLight,borderRadius:10,padding:"10px 16px",marginBottom:16,fontSize:13,color:H2O.blueDark,fontWeight:600}}>
        💧 H2O Group heeft een speciaal scenario voor <strong>man overboord</strong> — ken het van buiten!
      </div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(2,1fr)",gap:10,marginBottom:20}}>
        {NOODSCENARIOS.map(s=>(
          <Card key={s.id} className="rh" onClick={()=>setActief(s.id)} style={{padding:"14px 16px",borderLeft:`4px solid ${s.kleur}`,cursor:"pointer"}}>
            <div style={{fontSize:28,marginBottom:6}}>{s.ico}</div>
            <div style={{fontSize:14,fontWeight:800,color:H2O.gray900,marginBottom:2}}>{s.label}</div>
            <div style={{fontSize:11,color:s.kleur,fontWeight:700}}>{s.stappen.length} stappen →</div>
          </Card>
        ))}
      </div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
        <Card><div style={{fontSize:11,fontWeight:700,color:H2O.gray500,marginBottom:8,textTransform:"uppercase",letterSpacing:".08em"}}>BHV Team</div>{["Sofie Mertens (HYE)","David Claes (Argex)","Nathalie Bogaert (PDK)"].map(b=><div key={b} style={{fontSize:12,color:H2O.gray700,marginBottom:4}}>🦺 {b}</div>)}</Card>
        <Card><div style={{fontSize:11,fontWeight:700,color:H2O.gray500,marginBottom:8,textTransform:"uppercase",letterSpacing:".08em"}}>AED Locaties</div>{["Ingang werkplaats HYE","Kantinegebouw Argex","Receptie PDK Bazel"].map(a=><div key={a} style={{fontSize:12,color:H2O.gray700,marginBottom:4}}>❤️ {a}</div>)}</Card>
      </div>
    </div>
  );
}

// ─── CONTACTEN ─────────────────────────────────────────────────────────────────
function Contacten() {
  return (
    <div className="fu">
      <SectionHead sub="Contactpersonen voor alle H2O Group bedrijven">EHBO & Vertrouwenspersonen</SectionHead>
      {[["EHBO'ers",EHBO_LEDEN],["Vertrouwenspersonen",VERTROUWENSPERSONEN]].map(([tit,lijst])=>(
        <div key={tit} style={{marginBottom:22}}>
          <div style={{fontSize:11,fontWeight:700,color:H2O.gray500,letterSpacing:".08em",textTransform:"uppercase",marginBottom:10}}>{tit}</div>
          {lijst.map(p=>(
            <Card key={p.naam} style={{marginBottom:10}}>
              <div style={{display:"flex",gap:14,alignItems:"center"}}>
                <Av i={p.init} s={50} c={p.kleur}/>
                <div style={{flex:1}}>
                  <div style={{fontSize:15,fontWeight:800,color:H2O.gray900}}>{p.naam}</div>
                  <Tag label={p.rol} color={p.kleur}/>
                  <div style={{fontSize:12,color:H2O.gray500,marginTop:6,lineHeight:1.6}}>{p.desc}</div>
                  <div style={{display:"flex",gap:14,marginTop:8,flexWrap:"wrap"}}>
                    <a href={`tel:${p.tel}`} style={{fontSize:13,color:p.kleur,fontWeight:700,textDecoration:"none"}}>📞 {p.tel}</a>
                    <a href={`mailto:${p.email}`} style={{fontSize:13,color:H2O.gray500,textDecoration:"none"}}>✉ {p.email}</a>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      ))}
      <Card style={{background:H2O.blueLight,border:`1px solid ${H2O.blue}33`}}>
        <div style={{fontSize:12,color:H2O.blueDark,lineHeight:1.7}}>🔒 <strong>Vertrouwelijk:</strong> Gesprekken zijn strikt vertrouwelijk. Anoniem via IDEWE: <strong>0800 30 801</strong> (gratis, 24/7).</div>
      </Card>
    </div>
  );
}

// ─── INCIDENTEN ────────────────────────────────────────────────────────────────
function Incidenten({ user }) {
  const [view,setView]=useState("lijst"); const [meldingen,setMeldingen]=useState(MOCK_MELDINGEN);
  const [detailId,setDetailId]=useState(null); const [filter,setFilter]=useState("alles");
  const leeg={type:"",ernst:"matig",datum:new Date().toISOString().split("T")[0],tijd:"",locatie:"",beschrijving:"",letsel:"",getuigen:"",directeActie:"",oorzaak:"",actie:"",verantwoordelijke:"",deadline:""};
  const [form,setForm]=useState(leeg); const [stap,setStap]=useState(0);
  const set=k=>v=>setForm(p=>({...p,[k]:v}));
  const isLead=user.role==="leidinggevende"||user.role==="admin";

  const verstuur=()=>{
    const nieuw={id:meldingen.length+1,...form,status:"gemeld",bedrijf:user.bedrijf,melder:user.name,titel:form.beschrijving.substring(0,45)+(form.beschrijving.length>45?"…":"")};
    setMeldingen(p=>[nieuw,...p]); setForm(leeg); setStap(0); setView("lijst");
  };

  const gefilterd=(filter==="alles"?meldingen:meldingen.filter(m=>m.status===filter)).filter(m=>user.role==="admin"||m.bedrijf===user.bedrijf);

  if(view==="detail"&&detailId){
    const m=meldingen.find(x=>x.id===detailId); const t=INCIDENT_TYPES.find(x=>x.id===m.type);
    const SI=["gemeld","onderzoek","afgehandeld"]; const si=SI.indexOf(m.status);
    const b=BEDRIJVEN[m.bedrijf];
    return (
      <div className="fu">
        <button onClick={()=>{setView("lijst");setDetailId(null);}} style={{background:"transparent",border:`1px solid ${H2O.gray300}`,color:H2O.gray700,padding:"7px 13px",borderRadius:8,cursor:"pointer",fontSize:13,fontFamily:"inherit",marginBottom:20}}>← Terug</button>
        <div style={{background:t.bg,border:`1px solid ${t.kleur}33`,borderRadius:12,padding:"16px 18px",marginBottom:14}}>
          <div style={{display:"flex",gap:12,alignItems:"flex-start"}}>
            <div style={{fontSize:32}}>{t.ico}</div>
            <div style={{flex:1}}>
              <div style={{display:"flex",gap:8,flexWrap:"wrap",marginBottom:4}}><Tag label={t.label} color={t.kleur}/>{b&&<Tag label={b.naam} color={b.kleur}/>}</div>
              <div style={{fontFamily:"'Nunito',sans-serif",fontSize:17,fontWeight:900,color:H2O.gray900,marginBottom:3}}>{m.titel}</div>
              <div style={{fontSize:12,color:H2O.gray500}}>{m.datum} · {m.locatie} · {m.melder}</div>
            </div>
          </div>
        </div>
        <Card style={{marginBottom:12}}>
          <div style={{display:"flex",alignItems:"center",gap:0,marginBottom:4}}>
            {["Gemeld","In onderzoek","Afgehandeld"].map((s,i)=>(
              <div key={s} style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",gap:4}}>
                <div style={{display:"flex",alignItems:"center",width:"100%"}}>
                  {i>0&&<div style={{flex:1,height:3,background:i<=si?H2O.blue:H2O.gray100}}/>}
                  <div style={{width:26,height:26,borderRadius:"50%",background:i<=si?H2O.blue:"#fff",border:`2.5px solid ${i<=si?H2O.blue:H2O.gray300}`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:11,color:i<=si?H2O.white:H2O.gray400,fontWeight:800,flexShrink:0}}>{i<si?"✓":i+1}</div>
                  {i<2&&<div style={{flex:1,height:3,background:i<si?H2O.blue:H2O.gray100}}/>}
                </div>
                <span style={{fontSize:10,fontWeight:700,color:i<=si?H2O.blue:H2O.gray400,textTransform:"uppercase",textAlign:"center"}}>{s}</span>
              </div>
            ))}
          </div>
        </Card>
        <Card style={{marginBottom:12}}>
          <div style={{fontSize:13,color:H2O.gray800,lineHeight:1.7,marginBottom:12}}>{m.beschrijving}</div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}>
            {[["📍 Locatie",m.locatie],["📅 Datum",m.datum],["👤 Getuigen",m.getuigen||"—"],m.letsel&&["🩺 Letsel",m.letsel]].filter(Boolean).map(([l,v])=>(
              <div key={l} style={{background:H2O.gray50,borderRadius:8,padding:"9px 12px"}}><div style={{fontSize:11,color:H2O.gray500,marginBottom:2}}>{l}</div><div style={{fontSize:13,color:H2O.gray900,fontWeight:700}}>{v}</div></div>
            ))}
          </div>
        </Card>
        <Card style={{marginBottom:12,borderLeft:`4px solid ${H2O.blue}`}}>
          {[["🔍 Oorzaak",m.oorzaak||"—"],["✅ Direct genomen actie",m.directeActie||"—"],["🔧 Corrigerende maatregel",m.actie||"—"]].map(([l,v])=>(
            <div key={l} style={{marginBottom:10}}><div style={{fontSize:11,color:H2O.gray500,marginBottom:2}}>{l}</div><div style={{fontSize:13,color:H2O.gray900}}>{v}</div></div>
          ))}
          <div style={{display:"flex",gap:10,flexWrap:"wrap"}}>
            {[["👤 Verantwoordelijke",m.verantwoordelijke||"—"],["📅 Deadline",m.deadline||"—"]].map(([l,v])=>(
              <div key={l} style={{background:H2O.blueLight,borderRadius:8,padding:"9px 12px",flex:1}}><div style={{fontSize:11,color:H2O.gray500,marginBottom:2}}>{l}</div><div style={{fontSize:13,fontWeight:700,color:H2O.blueDark}}>{v}</div></div>
            ))}
          </div>
        </Card>
        {isLead&&m.status!=="afgehandeld"&&(
          <div style={{display:"flex",gap:8}}>
            {m.status==="gemeld"&&<Btn onClick={()=>setMeldingen(p=>p.map(x=>x.id===m.id?{...x,status:"onderzoek"}:x))}>🔍 In onderzoek</Btn>}
            {m.status==="onderzoek"&&<Btn onClick={()=>setMeldingen(p=>p.map(x=>x.id===m.id?{...x,status:"afgehandeld"}:x))}>✅ Afhandelen</Btn>}
          </div>
        )}
      </div>
    );
  }

  if(view==="nieuw") return (
    <div className="fu">
      <button onClick={()=>{setView("lijst");setStap(0);setForm(leeg);}} style={{background:"transparent",border:`1px solid ${H2O.gray300}`,color:H2O.gray700,padding:"7px 13px",borderRadius:8,cursor:"pointer",fontSize:13,fontFamily:"inherit",marginBottom:20}}>← Annuleren</button>
      <SectionHead sub="Vul zo volledig mogelijk in">Nieuwe melding</SectionHead>
      <div style={{display:"flex",gap:6,marginBottom:20}}>
        {["Type","Details","Analyse","Bevestig"].map((s,i)=>(
          <div key={s} style={{flex:1,padding:"7px 0",textAlign:"center",borderRadius:8,fontSize:11,fontWeight:700,background:stap===i?H2O.blue:i<stap?H2O.blueLight:"#fff",color:stap===i?H2O.white:i<stap?H2O.blueDark:H2O.gray400,border:`1.5px solid ${stap===i?H2O.blue:i<stap?H2O.blue+"44":H2O.gray200}`}}>{i<stap?"✓ ":""}{s}</div>
        ))}
      </div>
      {stap===0&&<Card><div style={{fontFamily:"'Nunito',sans-serif",fontSize:16,fontWeight:900,color:H2O.gray900,marginBottom:14}}>Wat wil je melden?</div>
        {INCIDENT_TYPES.map(t=>(<div key={t.id} onClick={()=>set("type")(t.id)} style={{display:"flex",gap:14,alignItems:"center",padding:14,borderRadius:10,marginBottom:8,cursor:"pointer",background:form.type===t.id?t.bg:"#fafafa",border:`2px solid ${form.type===t.id?t.kleur:H2O.gray200}`,transition:"all .15s"}}>
          <div style={{width:44,height:44,borderRadius:10,background:t.bg,display:"flex",alignItems:"center",justifyContent:"center",fontSize:24,flexShrink:0}}>{t.ico}</div>
          <div style={{fontSize:14,fontWeight:700,color:H2O.gray900}}>{t.label}</div>
          {form.type===t.id&&<div style={{marginLeft:"auto",width:22,height:22,borderRadius:"50%",background:t.kleur,display:"flex",alignItems:"center",justifyContent:"center",fontSize:12,color:"#fff"}}>✓</div>}
        </div>))}
        <div style={{marginTop:14}}><Btn onClick={()=>setStap(1)} disabled={!form.type}>Volgende →</Btn></div>
      </Card>}
      {stap===1&&<Card>
        <div style={{fontFamily:"'Nunito',sans-serif",fontSize:16,fontWeight:900,color:H2O.gray900,marginBottom:14}}>Wat is er gebeurd?</div>
        {form.type==="ongeval"&&<div style={{background:H2O.redLight,border:`1px solid ${H2O.red}33`,borderRadius:9,padding:"10px 14px",marginBottom:14,fontSize:13,color:H2O.red,fontWeight:700}}>🚨 Bij ernstig letsel: bel direct <strong>112</strong> en intern <strong>333</strong></div>}
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"0 12px"}}><Inp label="Datum" type="date" value={form.datum} onChange={set("datum")}/><Inp label="Tijdstip" type="time" value={form.tijd} onChange={set("tijd")}/></div>
        <Inp label="Locatie / afdeling" value={form.locatie} onChange={set("locatie")} placeholder="bijv. HYE — kade, PDK — mast project..."/>
        <Inp label="Beschrijving" value={form.beschrijving} onChange={set("beschrijving")} placeholder="Wat is er precies gebeurd?" rows={4}/>
        {form.type==="ongeval"&&<Inp label="Letsel" value={form.letsel} onChange={set("letsel")} placeholder="bijv. Snijwond, kneuzin…"/>}
        <Inp label="Getuigen" value={form.getuigen} onChange={set("getuigen")} placeholder="Namen of 'geen getuigen'"/>
        <Inp label="Direct genomen actie" value={form.directeActie} onChange={set("directeActie")} placeholder="bijv. Zone afgezet, EHBO toegepast…"/>
        <div style={{display:"flex",gap:8}}><Btn variant="ghost" onClick={()=>setStap(0)}>← Terug</Btn><Btn onClick={()=>setStap(2)} disabled={!form.beschrijving||!form.locatie}>Volgende →</Btn></div>
      </Card>}
      {stap===2&&<Card>
        <div style={{fontFamily:"'Nunito',sans-serif",fontSize:16,fontWeight:900,color:H2O.gray900,marginBottom:14}}>Oorzaak & actie</div>
        <Sel label="Oorzaak" value={form.oorzaak} onChange={set("oorzaak")} options={["Selecteer oorzaak...",...OORZAKEN]}/>
        <Inp label="Corrigerende maatregel" value={form.actie} onChange={set("actie")} placeholder="Wat moet er gebeuren?" rows={3}/>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"0 12px"}}><Inp label="Verantwoordelijke" value={form.verantwoordelijke} onChange={set("verantwoordelijke")} placeholder="Naam…"/><Inp label="Deadline" type="date" value={form.deadline} onChange={set("deadline")}/></div>
        <div style={{display:"flex",gap:8}}><Btn variant="ghost" onClick={()=>setStap(1)}>← Terug</Btn><Btn onClick={()=>setStap(3)}>Controleren →</Btn></div>
      </Card>}
      {stap===3&&<Card>
        <div style={{fontFamily:"'Nunito',sans-serif",fontSize:16,fontWeight:900,color:H2O.gray900,marginBottom:14}}>Controleer je melding</div>
        {[["Type",INCIDENT_TYPES.find(x=>x.id===form.type)?.label],["Datum",form.datum],["Locatie",form.locatie],["Beschrijving",form.beschrijving],form.letsel&&["Letsel",form.letsel],["Oorzaak",form.oorzaak||"—"],["Corrigerende maatregel",form.actie||"—"],["Verantwoordelijke",form.verantwoordelijke||"—"]].filter(Boolean).map(([l,v])=>(
          <div key={l} style={{display:"flex",gap:10,padding:"7px 0",borderBottom:`1px solid ${H2O.gray100}`,flexWrap:"wrap"}}><span style={{fontSize:12,color:H2O.gray500,minWidth:130,flexShrink:0}}>{l}</span><span style={{fontSize:13,color:H2O.gray900,fontWeight:700,flex:1}}>{v}</span></div>
        ))}
        <div style={{display:"flex",gap:8,marginTop:14}}><Btn variant="ghost" onClick={()=>setStap(2)}>← Aanpassen</Btn><Btn onClick={verstuur}>📤 Indienen</Btn></div>
      </Card>}
    </div>
  );

  return (
    <div className="fu">
      <SectionHead sub={`${gefilterd.length} meldingen`} right={<Btn onClick={()=>{setStap(0);setForm(leeg);setView("nieuw");}}>+ Nieuwe melding</Btn>}>Incidenten</SectionHead>
      <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:8,marginBottom:18}}>
        {[["gemeld","Gemeld",H2O.amber],["onderzoek","In onderzoek",H2O.blue],["afgehandeld","Afgehandeld",H2O.green]].map(([s,l,c])=>(
          <Card key={s} style={{textAlign:"center",borderTop:`3px solid ${c}`,cursor:"pointer",background:filter===s?c+"10":H2O.white}} onClick={()=>setFilter(filter===s?"alles":s)}>
            <div style={{fontSize:22,fontWeight:900,color:c,fontFamily:"'Nunito',sans-serif"}}>{meldingen.filter(m=>m.status===s&&(user.role==="admin"||m.bedrijf===user.bedrijf)).length}</div>
            <div style={{fontSize:11,color:H2O.gray500}}>{l}</div>
          </Card>
        ))}
      </div>
      {gefilterd.length===0&&<Card style={{textAlign:"center",padding:28}}><div className="sam-bounce" style={{display:"inline-block",marginBottom:8}}><Sam size={48}/></div><div style={{color:H2O.green,fontWeight:700}}>✅ Geen meldingen — Sam is blij!</div></Card>}
      {gefilterd.map(m=>{
        const t=INCIDENT_TYPES.find(x=>x.id===m.type); const b=BEDRIJVEN[m.bedrijf];
        const sc={gemeld:H2O.amber,onderzoek:H2O.blue,afgehandeld:H2O.green}[m.status];
        return (
          <Card key={m.id} className="rh" onClick={()=>{setDetailId(m.id);setView("detail");}} style={{marginBottom:8,padding:"13px 16px"}}>
            <div style={{display:"flex",gap:12,alignItems:"flex-start"}}>
              <div style={{width:40,height:40,borderRadius:9,background:t?.bg,display:"flex",alignItems:"center",justifyContent:"center",fontSize:20,flexShrink:0}}>{t?.ico}</div>
              <div style={{flex:1,minWidth:0}}>
                <div style={{display:"flex",justifyContent:"space-between",gap:8,flexWrap:"wrap",marginBottom:3}}>
                  <div style={{fontSize:14,fontWeight:700,color:H2O.gray900,flex:1}}>{m.titel}</div>
                  <Tag label={m.status==="gemeld"?"Nieuw":m.status==="onderzoek"?"Onderzoek":"Afgehandeld"} color={sc}/>
                </div>
                <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
                  <span style={{fontSize:11,color:H2O.gray500}}>📅 {m.datum}</span>
                  {b&&<span style={{fontSize:11,color:b.kleur,fontWeight:700}}>{b.emoji} {b.naam}</span>}
                </div>
              </div>
            </div>
          </Card>
        );
      })}
    </div>
  );
}

// ─── COMITÉ ────────────────────────────────────────────────────────────────────
function Comite() {
  const [open,setOpen]=useState(null);
  return (
    <div className="fu">
      <SectionHead sub="H2O Group — veiligheidsoverleg verslagen">CPBW Vergadering</SectionHead>
      <Card style={{background:H2O.blueLight,border:`1px solid ${H2O.blue}33`,marginBottom:18}}>
        <div style={{fontSize:12,color:H2O.blueDark}}>ℹ Veiligheidsoverleg H2O Group vindt 4x per jaar plaats voor alle bedrijven. Verslagen zijn openbaar voor alle medewerkers.</div>
      </Card>
      {COMITE.map(v=>(
        <Card key={v.id} className="rh" onClick={()=>setOpen(open===v.id?null:v.id)} style={{marginBottom:8}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:open===v.id?10:0}}>
            <div><div style={{fontSize:14,fontWeight:700,color:H2O.gray900}}>{v.titel}</div><div style={{fontSize:12,color:H2O.gray500,marginTop:2}}>📅 {v.datum}</div></div>
            <span style={{color:H2O.gray400}}>{open===v.id?"▲":"▼"}</span>
          </div>
          {open===v.id&&<div style={{borderTop:`1px solid ${H2O.gray100}`,paddingTop:10}}>{v.punten.map((p,i)=><div key={i} style={{fontSize:13,color:H2O.gray700,padding:"6px 0",borderBottom:i<v.punten.length-1?`1px solid ${H2O.gray100}`:"none",display:"flex",gap:8}}><span style={{color:H2O.blue,fontWeight:700,flexShrink:0}}>{i+1}.</span>{p}</div>)}</div>}
        </Card>
      ))}
    </div>
  );
}

// ─── NAV ──────────────────────────────────────────────────────────────────────
const NAV = [
  {id:"dashboard",   ico:"⊞", lbl:"Home",      roles:["admin","leidinggevende","medewerker","aannemer"]},
  {id:"toolboxen",   ico:"🎬", lbl:"Toolboxen", roles:["admin","leidinggevende","medewerker","aannemer"]},
  {id:"opleidingen", ico:"🎓", lbl:"Opleiding", roles:["admin","leidinggevende","medewerker"]},
  {id:"bibliotheek", ico:"📚", lbl:"Procedures",roles:["admin","leidinggevende","medewerker","aannemer"]},
  {id:"contacten",   ico:"🩺", lbl:"EHBO",      roles:["admin","leidinggevende","medewerker","aannemer"]},
  {id:"noodplan",    ico:"🚨", lbl:"Noodplan",  roles:["admin","leidinggevende","medewerker","aannemer"]},
  {id:"incidenten",  ico:"⚠️", lbl:"Incident",  roles:["admin","leidinggevende","medewerker","aannemer"]},
  {id:"comite",      ico:"📋", lbl:"Comité",    roles:["admin","leidinggevende","medewerker"]},
];
const ROLE_LABELS = {admin:"H2O Group Admin",leidinggevende:"Leidinggevende",medewerker:"Medewerker",aannemer:"Aannemer"};

// ─── MAIN APP ─────────────────────────────────────────────────────────────────
function MainApp({ user, onLogout }) {
  const [tab,setTab]=useState("dashboard");
  const nav = NAV.filter(n=>n.roles.includes(user.role));
  const bedrijfInfo = BEDRIJVEN[user.bedrijf];
  const renderTab = () => {
    switch(tab) {
      case "dashboard":   return <Dashboard user={user} setTab={setTab}/>;
      case "toolboxen":   return <Toolboxen user={user}/>;
      case "opleidingen": return <Opleidingen user={user}/>;
      case "bibliotheek": return <Bibliotheek user={user}/>;
      case "contacten":   return <Contacten/>;
      case "noodplan":    return <Noodplan/>;
      case "incidenten":  return <Incidenten user={user}/>;
      case "comite":      return <Comite/>;
      default:            return <Dashboard user={user} setTab={setTab}/>;
    }
  };
  return (
    <div style={{display:"flex",height:"100vh",background:H2O.bg,fontFamily:"'Nunito',sans-serif",color:H2O.gray900}}>
      {/* Sidebar */}
      <div style={{width:68,background:`linear-gradient(180deg,${H2O.blueDeep} 0%,${H2O.blueDark} 100%)`,display:"flex",flexDirection:"column",alignItems:"center",paddingTop:12,flexShrink:0}}>
        <div style={{marginBottom:14}}><Sam size={40}/></div>
        <div style={{flex:1,display:"flex",flexDirection:"column",gap:1,width:"100%",padding:"0 5px",overflowY:"auto"}}>
          {nav.map(n=>(
            <button key={n.id} onClick={()=>setTab(n.id)} style={{width:"100%",display:"flex",flexDirection:"column",alignItems:"center",gap:2,padding:"8px 3px",borderRadius:9,border:"none",cursor:"pointer",fontFamily:"inherit",transition:"all .15s",background:tab===n.id?"rgba(255,255,255,0.2)":"transparent",marginBottom:1}}>
              <span style={{fontSize:17}}>{n.ico}</span>
              <span style={{fontSize:7.5,fontWeight:700,letterSpacing:".03em",textTransform:"uppercase",color:tab===n.id?H2O.white:"rgba(255,255,255,0.45)"}}>{n.lbl.substring(0,7)}</span>
            </button>
          ))}
        </div>
        <div style={{padding:"10px 5px",borderTop:"1px solid rgba(255,255,255,0.15)",width:"100%",display:"flex",flexDirection:"column",alignItems:"center",gap:5}}>
          <div style={{width:30,height:30,borderRadius:"50%",background:"rgba(255,255,255,0.2)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:11,fontWeight:800,color:H2O.white}}>{user.avatar}</div>
          <button onClick={onLogout} style={{fontSize:7.5,color:"rgba(255,255,255,0.35)",background:"transparent",border:"none",cursor:"pointer",fontFamily:"inherit",textTransform:"uppercase",letterSpacing:".03em"}}>Uit</button>
        </div>
      </div>
      {/* Main */}
      <div style={{flex:1,display:"flex",flexDirection:"column",overflow:"hidden"}}>
        <div style={{height:52,background:H2O.white,borderBottom:`1px solid #DDE8F5`,display:"flex",alignItems:"center",justifyContent:"space-between",padding:"0 22px",flexShrink:0,boxShadow:"0 2px 8px rgba(27,154,228,0.06)"}}>
          <div style={{display:"flex",alignItems:"center",gap:10}}>
            <div style={{fontFamily:"'Nunito',sans-serif",fontSize:16,fontWeight:900,color:H2O.gray900}}>SafetySam</div>
            {bedrijfInfo && <div style={{display:"flex",alignItems:"center",gap:5,background:bedrijfInfo.kleur+"15",padding:"3px 10px",borderRadius:20}}><span style={{fontSize:13}}>{bedrijfInfo.emoji}</span><span style={{fontSize:12,fontWeight:700,color:bedrijfInfo.kleur}}>{bedrijfInfo.naam}</span></div>}
          </div>
          <div style={{display:"flex",alignItems:"center",gap:10}}>
            <Tag label={ROLE_LABELS[user.role]} color={H2O.blue}/>
            <span style={{fontSize:13,color:H2O.gray700,fontWeight:700}}>{user.name}</span>
            <div style={{width:7,height:7,borderRadius:"50%",background:H2O.green}}/>
          </div>
        </div>
        <div style={{flex:1,overflowY:"auto",padding:22}}>{renderTab()}</div>
      </div>
    </div>
  );
}

// ─── ROOT ─────────────────────────────────────────────────────────────────────
export default function App() {
  const [user,setUser]=useState(null);
  const [onboardingDone,setOnboardingDone]=useState(false);
  return (
    <>
      <style>{css}</style>
      {!user
        ? <Login onLogin={u=>{setUser(u);setOnboardingDone(u.onboardingDone);}}/>
        : !onboardingDone
        ? <Onboarding user={user} onComplete={()=>setOnboardingDone(true)}/>
        : <MainApp user={user} onLogout={()=>{setUser(null);setOnboardingDone(false);}}/>
      }
    </>
  );
}
