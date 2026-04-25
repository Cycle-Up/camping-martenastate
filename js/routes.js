// Wandel- en fietsroutes vanaf Martenastate
//
// Coordinaten zijn realistische benaderingen op basis van bekende
// landmarks (Martenastate, Jelsum kerk, Stiens, Leeuwarden Oldehove,
// Dokkum). De polyline is een visuele indicatie; voor de werkelijke
// routebeschrijving gebruik je de externe link.
//
// Externe links openen waar mogelijk Google Maps in voet- of fietsmodus
// (origin → destination), of de officiele routebeschrijving voor
// langeafstandspaden.

const MARTENASTATE = [53.2013, 5.7745];          // Túnmanswente / camping
const JELSUM = [53.2186, 5.7733];                // Jelsum dorp/kerk
const STIENS = [53.2572, 5.7634];                // Stiens centrum
const LEEUWARDEN_OLDEHOVE = [53.2031, 5.7929];   // Oldehove (centrum LWD)
const LEEUWARDEN_FRIESMUSEUM = [53.2009, 5.7986];
const DOKKUM = [53.3257, 5.9994];

const walkingRoutes = [
  {
    id: 'ochtendrondje',
    name_nl: 'Ochtendrondje door het park',
    name_en: 'Morning park loop',
    distance: '~1,5 km',
    duration_nl: '±25 min',
    duration_en: '±25 min',
    difficulty_nl: 'Gemakkelijk',
    difficulty_en: 'Easy',
    desc_nl: 'Wandel vrij door het landschapspark van Martenastate. Volg de hoofdpaden vanaf de ingang naar het kasteel en terug langs de stinzenflora-velden. Vlak terrein, paden zijn doorgaans goed begaanbaar.',
    desc_en: 'Wander freely through the Martenastate landscape park. Follow the main paths from the entrance to the castle and back past the stinzenflora fields. Flat terrain, paths are generally easy to walk.',
    coords: [
      [53.2013, 5.7745],
      [53.2018, 5.7762],
      [53.2025, 5.7770],
      [53.2030, 5.7755],
      [53.2025, 5.7740],
      [53.2018, 5.7735],
      [53.2013, 5.7745]
    ],
    externalUrl: 'https://www.google.com/maps/place/Martenastate/@53.2018,5.7762,17z',
    type: 'loop',
  },
  {
    id: 'middagtocht-jelsum',
    name_nl: 'Middagwandeling naar Jelsum',
    name_en: 'Afternoon walk to Jelsum',
    distance: '~4 km heen & terug',
    duration_nl: '±1 uur',
    duration_en: '±1 hour',
    difficulty_nl: 'Gemakkelijk',
    difficulty_en: 'Easy',
    desc_nl: 'Vanaf Martenastate via de Brédyk noordwaarts naar het buurdorp Jelsum (~2 km). Onderweg zicht op weidevogels en de oude kerk van Jelsum. Terug via dezelfde route of via de polderpaden — typisch Fries weidelandschap.',
    desc_en: 'From Martenastate north via the Brédyk to the neighbouring village of Jelsum (~2 km). Watch for meadow birds and the historic Jelsum church. Return via the same route or via the polder paths — typical Frisian meadow landscape.',
    coords: [
      MARTENASTATE,
      [53.2050, 5.7750],
      [53.2100, 5.7745],
      [53.2150, 5.7740],
      JELSUM
    ],
    externalUrl: `https://www.google.com/maps/dir/?api=1&origin=${MARTENASTATE[0]},${MARTENASTATE[1]}&destination=${JELSUM[0]},${JELSUM[1]}&travelmode=walking`,
    type: 'oneway',
  },
  {
    id: 'wandeling-leeuwarden',
    name_nl: 'Wandeling naar Leeuwarden',
    name_en: 'Walk to Leeuwarden',
    distance: '~5,5 km enkele reis',
    duration_nl: '±1,5 uur enkele reis',
    duration_en: '±1.5 hours one way',
    difficulty_nl: 'Gemiddeld',
    difficulty_en: 'Moderate',
    desc_nl: 'Loop via fietspaden en wandelroutes zuidwaarts naar Leeuwarden centrum. Eindpunt: de Oldehove en het Wilhelminaplein. Terug eventueel met de bus (lijn richting Stiens stopt vlakbij Martenastate).',
    desc_en: 'Walk south via cycle paths and walking routes to Leeuwarden city centre. Endpoint: the Oldehove tower and Wilhelminaplein. Return optionally by bus (line to Stiens stops near Martenastate).',
    coords: [
      MARTENASTATE,
      [53.1980, 5.7770],
      [53.1930, 5.7820],
      [53.1900, 5.7870],
      [53.1980, 5.7910],
      LEEUWARDEN_OLDEHOVE
    ],
    externalUrl: `https://www.google.com/maps/dir/?api=1&origin=${MARTENASTATE[0]},${MARTENASTATE[1]}&destination=${LEEUWARDEN_OLDEHOVE[0]},${LEEUWARDEN_OLDEHOVE[1]}&travelmode=walking`,
    type: 'oneway',
  },
  {
    id: 'jabikspaad',
    name_nl: 'Jabikspaad (pelgrimsroute)',
    name_en: 'Jabikspaad (pilgrimage route)',
    distance: 'Etappe 8–25 km',
    duration_nl: 'Halve tot hele dag',
    duration_en: 'Half to full day',
    difficulty_nl: 'Gemiddeld',
    difficulty_en: 'Moderate',
    desc_nl: 'De pelgrimsroute van St. Jabik (St. Jacobiparochie) via Friesland naar Santiago de Compostella loopt langs Túnmanswente — een officieel stempelpunt. Mooie etappes door het Friese landschap. Vraag je pelgrimspaspoort bij Túnmanswente.',
    desc_en: 'The pilgrimage route from St. Jabik (St. Jacobiparochie) via Friesland to Santiago de Compostella passes Túnmanswente — an official stamp point. Lovely stages through the Frisian landscape. Pick up your pilgrim passport at Túnmanswente.',
    coords: [
      [53.2400, 5.6800],
      [53.2300, 5.7000],
      [53.2200, 5.7400],
      MARTENASTATE,
      [53.1950, 5.7900],
      LEEUWARDEN_OLDEHOVE
    ],
    externalUrl: 'https://www.wandelnet.nl/streekpaden/jabikspaad',
    type: 'longdistance',
  },
  {
    id: 'elfstedenpad',
    name_nl: 'Elfstedenpad (etappe Oentsjerk – Leeuwarden)',
    name_en: 'Elfstedenpad (stage Oentsjerk – Leeuwarden)',
    distance: '~15 km',
    duration_nl: '±4,5 uur',
    duration_en: '±4.5 hours',
    difficulty_nl: 'Gemiddeld',
    difficulty_en: 'Moderate',
    desc_nl: 'Een etappe van het 300 km lange Elfstedenpad langs alle 11 Friese steden. Vanuit Oentsjerk (Oenkerk) richting Leeuwarden, passeert vlak langs Martenastate. Gemarkeerd met geel-rode tekens.',
    desc_en: 'A stage of the 300 km Elfstedenpad through all 11 Frisian cities. From Oentsjerk (Oenkerk) towards Leeuwarden, passing close to Martenastate. Marked with yellow-red signs.',
    coords: [
      [53.2525, 5.8658],
      [53.2400, 5.8500],
      [53.2300, 5.8350],
      [53.2200, 5.8200],
      [53.2100, 5.8050],
      [53.2050, 5.8000],
      LEEUWARDEN_OLDEHOVE
    ],
    externalUrl: 'https://www.wandelnet.nl/streekpaden/elfstedenpad',
    type: 'longdistance',
  }
];

const cyclingRoutes = [
  {
    id: 'leeuwarden-fiets',
    name_nl: 'Naar Leeuwarden centrum',
    name_en: 'To Leeuwarden city centre',
    distance: '~10 km heen & terug',
    duration_nl: '±45 min totaal',
    duration_en: '±45 min total',
    difficulty_nl: 'Gemakkelijk',
    difficulty_en: 'Easy',
    desc_nl: 'Korte fietstocht naar het centrum van Leeuwarden. Veilige fietspaden, vlak terrein. Ideaal voor lunch, museumbezoek of de zaterdagmarkt. Eindpunt: de Oldehove.',
    desc_en: 'Short cycle ride to Leeuwarden city centre. Safe cycle paths, flat terrain. Ideal for lunch, a museum visit or the Saturday market. Endpoint: the Oldehove.',
    coords: [
      MARTENASTATE,
      [53.1960, 5.7800],
      [53.1920, 5.7860],
      [53.1980, 5.7910],
      LEEUWARDEN_OLDEHOVE
    ],
    externalUrl: `https://www.google.com/maps/dir/?api=1&origin=${MARTENASTATE[0]},${MARTENASTATE[1]}&destination=${LEEUWARDEN_OLDEHOVE[0]},${LEEUWARDEN_OLDEHOVE[1]}&travelmode=bicycling`,
    type: 'oneway',
  },
  {
    id: 'middelzee-route',
    name_nl: 'Middelzee-route via knooppunten',
    name_en: 'Middelzee route via cycling nodes',
    distance: '~20 km lus',
    duration_nl: '±1,5 uur',
    duration_en: '±1.5 hours',
    difficulty_nl: 'Gemakkelijk',
    difficulty_en: 'Easy',
    desc_nl: 'Vlakke lus door het oude Middelzee-landschap via het knooppuntennetwerk. Start bij knooppunt 10 (Túnmanswente). Plan zelf je route met de fietsknooppunten — paaltjes onderweg wijzen je verder.',
    desc_en: 'Flat loop through the old Middelzee landscape via the cycling node network. Start at node 10 (Túnmanswente). Plan your own route with the cycling nodes — markers along the way guide you.',
    coords: [
      MARTENASTATE,
      [53.2150, 5.7600],
      [53.2300, 5.7500],
      [53.2400, 5.7600],
      [53.2400, 5.7800],
      [53.2300, 5.7950],
      [53.2150, 5.7900],
      MARTENASTATE
    ],
    externalUrl: 'https://www.fietsknoop.nl/',
    type: 'loop',
  },
  {
    id: 'stiens-fiets',
    name_nl: 'Naar Stiens (boodschappen of bakker)',
    name_en: 'To Stiens (groceries or bakery)',
    distance: '~8 km heen & terug',
    duration_nl: '±30 min totaal',
    duration_en: '±30 min total',
    difficulty_nl: 'Gemakkelijk',
    difficulty_en: 'Easy',
    desc_nl: 'Snelle fietstocht naar Stiens voor de supermarkten (AH, Lidl, Jumbo) of de bakker. Goede fietspaden langs de Martenawei en Brédyk. Ideaal voor de dagelijkse boodschappen.',
    desc_en: 'Quick cycle ride to Stiens for the supermarkets (AH, Lidl, Jumbo) or the bakery. Good cycle paths via Martenawei and Brédyk. Ideal for daily groceries.',
    coords: [
      MARTENASTATE,
      [53.2100, 5.7700],
      [53.2250, 5.7670],
      [53.2400, 5.7640],
      STIENS
    ],
    externalUrl: `https://www.google.com/maps/dir/?api=1&origin=${MARTENASTATE[0]},${MARTENASTATE[1]}&destination=${STIENS[0]},${STIENS[1]}&travelmode=bicycling`,
    type: 'oneway',
  },
  {
    id: 'dokkum-fiets',
    name_nl: 'Naar Dokkum (omwald stadje)',
    name_en: 'To Dokkum (moated town)',
    distance: '~50 km heen & terug',
    duration_nl: '±3,5 uur',
    duration_en: '±3.5 hours',
    difficulty_nl: 'Gemiddeld',
    difficulty_en: 'Moderate',
    desc_nl: 'Klassieke Friese fietstocht naar het omwalde stadje Dokkum. Door weilanden, langs kanaaltjes en kleine dorpjes. Pauze in het centrum aanbevolen — historische pittoreske binnenstad.',
    desc_en: 'Classic Frisian cycling trip to the moated town of Dokkum. Through meadows, along canals and small villages. A break in the centre is recommended — historic picturesque town centre.',
    coords: [
      MARTENASTATE,
      [53.2300, 5.7900],
      [53.2500, 5.8200],
      [53.2700, 5.8600],
      [53.2900, 5.9100],
      [53.3100, 5.9600],
      DOKKUM
    ],
    externalUrl: `https://www.google.com/maps/dir/?api=1&origin=${MARTENASTATE[0]},${MARTENASTATE[1]}&destination=${DOKKUM[0]},${DOKKUM[1]}&travelmode=bicycling`,
    type: 'oneway',
  },
  {
    id: 'elfsteden-fiets',
    name_nl: 'Elfsteden Fietsroute (start)',
    name_en: 'Eleven Cities Cycling Route (start)',
    distance: '~258 km totaal',
    duration_nl: '3–5 dagen',
    duration_en: '3–5 days',
    difficulty_nl: 'Meerdaags',
    difficulty_en: 'Multi-day',
    desc_nl: 'De klassieke route langs alle 11 Friese steden. Officieel startpunt in Leeuwarden (5 km vanaf Martenastate). Volledig gemarkeerd. Ideaal voor meerdaagse fietsers — neem 3-5 dagen de tijd.',
    desc_en: 'The classic route along all 11 Frisian cities. Official starting point in Leeuwarden (5 km from Martenastate). Fully marked. Ideal for multi-day cyclists — allow 3–5 days.',
    coords: [
      LEEUWARDEN_OLDEHOVE,
      [53.1500, 5.8500],
      [53.0500, 5.7500],
      [52.9400, 5.4000],
      [53.1000, 5.4200],
      [53.1743, 5.4214],
      LEEUWARDEN_OLDEHOVE
    ],
    externalUrl: 'https://www.elfstedenfietsroute.nl/',
    type: 'longdistance',
  }
];
