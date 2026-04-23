// Wandel- en fietsroutes vanaf Martenastate
// Coordinaten zijn indicatief — externe link opent actuele routebeschrijving

const walkingRoutes = [
  {
    id: 'ochtendrondje',
    name_nl: 'Ochtendrondje door het park',
    name_en: 'Morning park loop',
    distance: '2 km',
    duration_nl: '±30 min',
    duration_en: '±30 min',
    difficulty_nl: 'Gemakkelijk',
    difficulty_en: 'Easy',
    desc_nl: 'Rustige lus vanaf Túnmanswente via de beukenlaan naar het kasteel en terug langs de stinzenflora-velden. Vlak terrein, geschikt voor iedereen.',
    desc_en: 'A peaceful loop from Túnmanswente via the beech lane to the castle and back past the stinzenflora fields. Flat terrain, suitable for everyone.',
    coords: [
      [53.2013, 5.7745],
      [53.2023, 5.7770],
      [53.2030, 5.7765],
      [53.2035, 5.7755],
      [53.2032, 5.7738],
      [53.2020, 5.7725],
      [53.2013, 5.7735],
      [53.2013, 5.7745]
    ],
    externalUrl: 'https://www.google.com/maps/dir/?api=1&origin=53.2013,5.7745&destination=53.2013,5.7745&waypoints=53.2023,5.7770%7C53.2035,5.7755%7C53.2020,5.7725&travelmode=walking'
  },
  {
    id: 'middagtocht',
    name_nl: 'Middagtocht via Jelsum',
    name_en: 'Afternoon walk via Jelsum',
    distance: '5 km',
    duration_nl: '±1,5 uur',
    duration_en: '±1.5 hours',
    difficulty_nl: 'Gemakkelijk',
    difficulty_en: 'Easy',
    desc_nl: 'Combineer het park met de omliggende polder. Via Koarnjum door de weilanden naar buurdorp Jelsum, terug langs het Dokkumer Ee. Weidelandschap met veel weidevogels.',
    desc_en: 'Combine the park with the surrounding polder. Via Koarnjum through the meadows to the neighbouring village Jelsum, back along the Dokkumer Ee. Meadow landscape with many meadow birds.',
    coords: [
      [53.2013, 5.7745],
      [53.2050, 5.7780],
      [53.2120, 5.7770],
      [53.2180, 5.7730],
      [53.2214, 5.7694],
      [53.2200, 5.7650],
      [53.2160, 5.7620],
      [53.2100, 5.7660],
      [53.2050, 5.7710],
      [53.2013, 5.7745]
    ],
    externalUrl: 'https://www.google.com/maps/dir/?api=1&origin=53.2013,5.7745&destination=53.2013,5.7745&waypoints=53.2214,5.7694%7C53.2200,5.7650%7C53.2100,5.7660&travelmode=walking'
  },
  {
    id: 'dagtocht-leeuwarden',
    name_nl: 'Dagtocht naar Leeuwarden (Jabikspaad)',
    name_en: 'Day walk to Leeuwarden (Jabikspaad)',
    distance: '12 km',
    duration_nl: '±4 uur',
    duration_en: '±4 hours',
    difficulty_nl: 'Gemiddeld',
    difficulty_en: 'Moderate',
    desc_nl: 'Vanaf Martenastate via het Jabikspaad richting Leeuwarden. Pauze in het centrum bij het Fries Museum, dan terug langs dezelfde of andere route. Laat je pelgrimspaspoort stempelen bij Túnmanswente.',
    desc_en: 'From Martenastate via the Jabikspaad towards Leeuwarden. Break in the centre at the Fries Museum, then back via the same or another route. Get your pilgrim passport stamped at Túnmanswente.',
    coords: [
      [53.2013, 5.7745],
      [53.2015, 5.7810],
      [53.2025, 5.7870],
      [53.2030, 5.7920],
      [53.2014, 5.7995],
      [53.2003, 5.7956]
    ],
    externalUrl: 'https://www.google.com/maps/dir/?api=1&origin=53.2013,5.7745&destination=53.2014,5.7995&travelmode=walking'
  },
  {
    id: 'elfstedenpad',
    name_nl: 'Elfstedenpad etappe Oenkerk–Leeuwarden',
    name_en: 'Elfstedenpad stage Oenkerk–Leeuwarden',
    distance: '15 km',
    duration_nl: '±4,5 uur',
    duration_en: '±4.5 hours',
    difficulty_nl: 'Gemiddeld',
    difficulty_en: 'Moderate',
    desc_nl: 'Een etappe van het 300 km lange Elfstedenpad langs alle 11 Friese steden. Gemarkeerd met geel-rode tekens. Van Oenkerk naar Leeuwarden, passeert vlak langs Martenastate.',
    desc_en: 'A stage of the 300 km Elfstedenpad through all 11 Frisian cities. Marked with yellow-red signs. From Oenkerk to Leeuwarden, passing close to Martenastate.',
    coords: [
      [53.2525, 5.8658],
      [53.2400, 5.8500],
      [53.2300, 5.8350],
      [53.2200, 5.8200],
      [53.2100, 5.8050],
      [53.2050, 5.8000],
      [53.2014, 5.7995]
    ],
    externalUrl: 'https://www.wandelnet.nl/streekpaden/elfstedenpad'
  }
];

const cyclingRoutes = [
  {
    id: 'middelzee-route',
    name_nl: 'Middelzee-route (20 km)',
    name_en: 'Middelzee route (20 km)',
    distance: '20 km',
    duration_nl: '±1,5 uur',
    duration_en: '±1.5 hours',
    difficulty_nl: 'Gemakkelijk',
    difficulty_en: 'Easy',
    desc_nl: 'Korte, vlakke lus door het oude Middelzee-landschap. Langs pittoreske dorpjes en oude zeedijken. Via knooppunten: 10 → 11 → 13 → 14 → 10.',
    desc_en: 'Short, flat loop through the old Middelzee landscape. Past picturesque villages and old sea dikes. Via nodes: 10 → 11 → 13 → 14 → 10.',
    coords: [
      [53.2013, 5.7745],
      [53.2200, 5.7600],
      [53.2350, 5.7500],
      [53.2450, 5.7650],
      [53.2500, 5.7850],
      [53.2400, 5.8000],
      [53.2250, 5.8050],
      [53.2100, 5.7900],
      [53.2013, 5.7745]
    ],
    externalUrl: 'https://www.fietsknoop.nl/route/friesland'
  },
  {
    id: 'leeuwarden-fiets',
    name_nl: 'Leeuwarden heen & terug',
    name_en: 'Leeuwarden and back',
    distance: '15 km',
    duration_nl: '±1 uur',
    duration_en: '±1 hour',
    difficulty_nl: 'Gemakkelijk',
    difficulty_en: 'Easy',
    desc_nl: 'Fiets naar het centrum van Leeuwarden voor een halve dag. Pauze bij de Oldehove, koffie op een terras, terug via een andere route. Ideale halvedagtocht.',
    desc_en: 'Cycle to the centre of Leeuwarden for a half day. Break at the Oldehove, coffee on a terrace, back via another route. Ideal half-day trip.',
    coords: [
      [53.2013, 5.7745],
      [53.2050, 5.7850],
      [53.2020, 5.7950],
      [53.2014, 5.7995],
      [53.2030, 5.7870],
      [53.2080, 5.7780],
      [53.2013, 5.7745]
    ],
    externalUrl: 'https://www.google.com/maps/dir/?api=1&origin=53.2013,5.7745&destination=53.2014,5.7995&travelmode=bicycling'
  },
  {
    id: 'dokkum-fiets',
    name_nl: 'Dokkum heen & terug',
    name_en: 'Dokkum and back',
    distance: '45 km',
    duration_nl: '±3 uur',
    duration_en: '±3 hours',
    difficulty_nl: 'Gemiddeld',
    difficulty_en: 'Moderate',
    desc_nl: 'Fietstocht naar het omwalde stadje Dokkum. Door weilanden, via kleine dorpjes — typisch Fries landschap. Neem de tijd voor een pauze in het centrum van Dokkum.',
    desc_en: 'Cycling trip to the moated town of Dokkum. Through meadows, via small villages — typical Frisian landscape. Take time for a break in the centre of Dokkum.',
    coords: [
      [53.2013, 5.7745],
      [53.2200, 5.7800],
      [53.2400, 5.7900],
      [53.2600, 5.8200],
      [53.2800, 5.8600],
      [53.3000, 5.9000],
      [53.3150, 5.9500],
      [53.3248, 6.0015]
    ],
    externalUrl: 'https://www.google.com/maps/dir/?api=1&origin=53.2013,5.7745&destination=53.3248,6.0015&travelmode=bicycling'
  },
  {
    id: 'elfsteden-fiets',
    name_nl: 'Elfsteden Fietsroute (start)',
    name_en: 'Eleven Cities Cycling Route (start)',
    distance: '258 km',
    duration_nl: '3-5 dagen',
    duration_en: '3-5 days',
    difficulty_nl: 'Meerdaags',
    difficulty_en: 'Multi-day',
    desc_nl: 'De klassieke route langs alle 11 Friese steden. Start in Leeuwarden (5 km van Martenastate). Ideaal voor meerdaagse fietsers. Volledig gemarkeerd.',
    desc_en: 'The classic route through all 11 Frisian cities. Starts in Leeuwarden (5 km from Martenastate). Ideal for multi-day cyclists. Fully marked.',
    coords: [
      [53.2014, 5.7995],
      [53.1500, 5.8500],
      [53.0500, 5.7500],
      [53.0300, 5.6600],
      [52.9400, 5.4000],
      [52.9000, 5.4400],
      [53.1000, 5.4200],
      [53.1743, 5.4214],
      [53.2014, 5.7995]
    ],
    externalUrl: 'https://www.friesland.nl/nl/ondernemers/elfstedentocht'
  }
];
