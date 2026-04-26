// js/activities.js — Activiteitenpagina data + initialisatie
// Hergebruikt walkingRoutes en cyclingRoutes uit routes.js (laad routes.js vóór dit bestand)

const DAGTRIPS = [
  {
    id: 'ameland',
    type: 'dagtrip',
    emoji: '⛴️',
    name_nl: 'Ameland',
    name_en: 'Ameland',
    distance_nl: '~55 km + veerboot',
    distance_en: '~55 km + ferry',
    duration_nl: 'Hele dag',
    duration_en: 'Full day',
    desc_nl: 'Neem de veerboot vanuit Holwerd naar het Waddeneiland Ameland. Witte stranden, vuurtoren, zeehonden en brede fietspaden. Vergeet niet op tijd terug te zijn voor de laatste boot.',
    desc_en: "Take the ferry from Holwerd to the Wadden Island of Ameland. White beaches, lighthouse, seals and wide cycle paths. Don't miss the last ferry back.",
    lat: 53.4426, lng: 5.7667,
    externalUrl: 'https://www.waddenveer.nl/veerdienst/holwerd-ameland/',
    season: [5,6,7,8,9],
  },
  {
    id: 'franeker',
    type: 'dagtrip',
    emoji: '🔭',
    name_nl: 'Franeker — Planetarium Eise Eisinga',
    name_en: 'Franeker — Eisinga Planetarium',
    distance_nl: '~25 km',
    distance_en: '~25 km',
    duration_nl: 'Halve dag',
    duration_en: 'Half day',
    desc_nl: 'Het oudste nog werkende planetarium ter wereld (1781), gebouwd in de woonkamer van wolkammer Eise Eisinga. UNESCO-kandidaat. Daarna de pittoreske binnenstad van Franeker verkennen.',
    desc_en: 'The oldest working planetarium in the world (1781), built in the living room of wool comber Eise Eisinga. UNESCO candidate. Explore the picturesque old town of Franeker afterwards.',
    lat: 53.1872, lng: 5.5444,
    externalUrl: 'https://www.planetarium-friesland.nl',
    season: [3,4,5,6,7,8,9,10],
  },
  {
    id: 'harlingen',
    type: 'dagtrip',
    emoji: '⚓',
    name_nl: 'Harlingen',
    name_en: 'Harlingen',
    distance_nl: '~35 km',
    distance_en: '~35 km',
    duration_nl: 'Halve dag',
    duration_en: 'Half day',
    desc_nl: 'Het mooiste vissersdorp van Friesland, direct aan de Waddenzee. Sfeervolle haven, historische pakhuizen, verse vis en een wandeling langs de Waddendijk. Vertrekpunt voor Vlieland en Terschelling.',
    desc_en: 'The most beautiful fishing village in Friesland, right on the Wadden Sea. Atmospheric harbour, historic warehouses, fresh fish and a walk along the Wadden dyke. Departure point for Vlieland and Terschelling.',
    lat: 53.1742, lng: 5.4228,
    externalUrl: 'https://www.harlingen.nl',
    season: [4,5,6,7,8,9,10],
  },
  {
    id: 'sneek',
    type: 'dagtrip',
    emoji: '⛵',
    name_nl: 'Sneek',
    name_en: 'Sneek',
    distance_nl: '~40 km',
    distance_en: '~40 km',
    duration_nl: 'Halve tot hele dag',
    duration_en: 'Half to full day',
    desc_nl: 'De waterstad van Friesland. Karakteristieke waterpoort, meren en kanalen, gezellige terrasjes. Vol watersporters in de zomer. Ideaal voor een dagje boemelen of een rondvaart.',
    desc_en: 'The water town of Friesland. Characteristic watergate, lakes and canals, lovely terraces. Full of water sports in summer. Ideal for a day of strolling or a boat trip.',
    lat: 53.0325, lng: 5.6578,
    externalUrl: 'https://www.sneek.nl',
    season: [5,6,7,8,9],
  },
  {
    id: 'alde-feanen',
    type: 'dagtrip',
    emoji: '🦆',
    name_nl: 'De Alde Feanen (Nationaal Park)',
    name_en: 'De Alde Feanen (National Park)',
    distance_nl: '~15 km',
    distance_en: '~15 km',
    duration_nl: 'Halve tot hele dag',
    duration_en: 'Half to full day',
    desc_nl: 'Het dichtstbijzijnde nationale park: laagveengebied vol rietvelden, meren en kanalen. Kanoën, fietsen of varen door het riet. Volop weidevogels, otters en bijzondere plantengroei.',
    desc_en: 'The nearest national park: peat meadows full of reed beds, lakes and canals. Canoe, cycle or sail through the reeds. Plenty of meadow birds, otters and unusual vegetation.',
    lat: 53.1166, lng: 5.9833,
    externalUrl: 'https://aldefeanen.nl',
    season: [4,5,6,7,8,9,10],
  },
  {
    id: 'hindeloopen',
    type: 'dagtrip',
    emoji: '🎨',
    name_nl: 'Hindeloopen',
    name_en: 'Hindeloopen',
    distance_nl: '~60 km',
    distance_en: '~60 km',
    duration_nl: 'Hele dag',
    duration_en: 'Full day',
    desc_nl: 'Het kleinste van de elf steden: unieke schilderstijl, pittoreske haven en kleurrijke houten huizen. Museum voor Hindelooper kunst. Aan het IJsselmeer — perfect voor een rustige wandeling.',
    desc_en: 'The smallest of the eleven cities: unique painting style, picturesque harbour and colourful wooden houses. Museum for Hindeloopen art. On the IJsselmeer — perfect for a quiet walk.',
    lat: 52.9395, lng: 5.3944,
    externalUrl: 'https://www.hindeloopen.nl',
    season: [4,5,6,7,8,9,10],
  },
];

const ACT_MONTH_NL = ['','Jan','Feb','Mrt','Apr','Mei','Jun','Jul','Aug','Sep','Okt','Nov','Dec'];
const ACT_MONTH_EN = ['','Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

function actSeasonLabel(months, lang) {
  if (!months || months.length >= 10) return lang === 'nl' ? 'Heel het jaar' : 'Year-round';
  const names = lang === 'nl' ? ACT_MONTH_NL : ACT_MONTH_EN;
  const s = [...months].sort((a, b) => a - b);
  return names[s[0]] + '–' + names[s[s.length - 1]];
}

function actDiffClass(diffNl) {
  if (!diffNl) return '';
  if (diffNl === 'Gemakkelijk') return 'diff-easy';
  if (diffNl === 'Meerdaags') return 'diff-multiday';
  return 'diff-moderate';
}

function makeActIcon(emoji, bg) {
  const html = '<div style="background:' + bg + ';border-radius:50% 50% 50% 0;transform:rotate(-45deg);width:32px;height:32px;display:flex;align-items:center;justify-content:center;box-shadow:0 2px 8px rgba(0,0,0,.22);border:2px solid rgba(255,255,255,.85)"><span style="transform:rotate(45deg);font-size:13px;line-height:1">' + emoji + '</span></div>';
  return L.divIcon({ html: html, className: 'map-emoji-marker', iconSize: [32, 32], iconAnchor: [16, 32], popupAnchor: [0, -34] });
}

function buildActRoutePopup(r, type) {
  const lang = document.documentElement.lang || 'nl';
  const name = r['name_' + lang] || r.name_nl;
  const diff = r['difficulty_' + lang] || r.difficulty_nl;
  const dur = r['duration_' + lang] || r.duration_nl;
  const icon = type === 'wandelen' ? '🥾' : '🚲';
  const linkText = lang === 'nl' ? 'Route →' : 'Route →';
  return '<div class="rest-popup"><strong>' + icon + ' ' + name + '</strong><br><small>' + diff + ' · ' + r.distance + ' · ' + dur + '</small>' + (r.externalUrl ? '<br><a href="' + r.externalUrl + '" target="_blank" rel="noopener" style="font-size:.8rem">' + linkText + '</a>' : '') + '</div>';
}

function buildActDagtripPopup(d) {
  const lang = document.documentElement.lang || 'nl';
  const name = d['name_' + lang] || d.name_nl;
  const dist = d['distance_' + lang] || d.distance_nl;
  const dur = d['duration_' + lang] || d.duration_nl;
  const linkText = lang === 'nl' ? 'Info →' : 'Info →';
  return '<div class="rest-popup"><strong>' + d.emoji + ' ' + name + '</strong><br><small>' + dist + ' · ' + dur + '</small>' + (d.externalUrl ? '<br><a href="' + d.externalUrl + '" target="_blank" rel="noopener" style="font-size:.8rem">' + linkText + '</a>' : '') + '</div>';
}

function makeRouteCard(r, type, lang) {
  const name = r['name_' + lang] || r.name_nl;
  const diff = r['difficulty_' + lang] || r.difficulty_nl;
  const dur = r['duration_' + lang] || r.duration_nl;
  const desc = r['desc_' + lang] || r.desc_nl;
  const typeLabel = lang === 'nl'
    ? (type === 'wandelen' ? 'Wandelen' : 'Fietsen')
    : (type === 'wandelen' ? 'Walking' : 'Cycling');
  const emoji = type === 'wandelen' ? '🥾' : '🚲';
  const typeClass = type === 'wandelen' ? 'act-badge-walk' : 'act-badge-cycle';
  const linkText = lang === 'nl' ? 'Route openen' : 'Open route';

  const card = document.createElement('div');
  card.className = 'act-card fade-in';
  card.dataset.type = type;
  card.innerHTML =
    '<div class="act-card-header">' +
      '<span class="act-type-badge ' + typeClass + '">' + emoji + ' ' + typeLabel + '</span>' +
      '<span class="act-diff-badge ' + actDiffClass(r.difficulty_nl) + '">' + diff + '</span>' +
    '</div>' +
    '<h3 class="act-card-title">' + name + '</h3>' +
    '<div class="act-card-meta">' +
      '<span class="meta-chip">📏 ' + r.distance + '</span>' +
      '<span class="meta-chip">⏱ ' + dur + '</span>' +
    '</div>' +
    '<p class="act-card-desc">' + desc + '</p>' +
    (r.externalUrl ? '<a href="' + r.externalUrl + '" target="_blank" rel="noopener" class="act-card-link">' + linkText + ' →</a>' : '');
  return card;
}

function makeDagtripCard(d, lang) {
  const name = d['name_' + lang] || d.name_nl;
  const dist = d['distance_' + lang] || d.distance_nl;
  const dur = d['duration_' + lang] || d.duration_nl;
  const desc = d['desc_' + lang] || d.desc_nl;
  const typeLabel = lang === 'nl' ? 'Dagtrip' : 'Day trip';
  const linkText = lang === 'nl' ? 'Meer info' : 'More info';
  const season = actSeasonLabel(d.season, lang);

  const card = document.createElement('div');
  card.className = 'act-card fade-in';
  card.dataset.type = 'dagtrip';
  card.innerHTML =
    '<div class="act-card-header">' +
      '<span class="act-type-badge act-badge-trip">' + d.emoji + ' ' + typeLabel + '</span>' +
      '<span class="act-diff-badge diff-season">' + season + '</span>' +
    '</div>' +
    '<h3 class="act-card-title">' + name + '</h3>' +
    '<div class="act-card-meta">' +
      '<span class="meta-chip">🚗 ' + dist + '</span>' +
      '<span class="meta-chip">⏱ ' + dur + '</span>' +
    '</div>' +
    '<p class="act-card-desc">' + desc + '</p>' +
    (d.externalUrl ? '<a href="' + d.externalUrl + '" target="_blank" rel="noopener" class="act-card-link">' + linkText + ' →</a>' : '');
  return card;
}

function renderActivityCards() {
  const grid = document.getElementById('activitiesGrid');
  if (!grid) return;

  const lang = document.documentElement.lang || 'nl';
  const activeBtn = document.querySelector('.act-filter-btn.active');
  const filter = activeBtn ? activeBtn.dataset.actFilter : 'all';

  grid.innerHTML = '';

  if (filter === 'all' || filter === 'wandelen') {
    walkingRoutes.forEach(function(r) { grid.appendChild(makeRouteCard(r, 'wandelen', lang)); });
  }
  if (filter === 'all' || filter === 'fietsen') {
    cyclingRoutes.forEach(function(r) { grid.appendChild(makeRouteCard(r, 'fietsen', lang)); });
  }
  if (filter === 'all' || filter === 'dagtrip') {
    DAGTRIPS.forEach(function(d) { grid.appendChild(makeDagtripCard(d, lang)); });
  }
}

function initActivitiesPage() {
  var map = null;
  var layers = {};

  var mapEl = document.getElementById('activitiesMap');
  if (mapEl) {
    map = L.map('activitiesMap', { center: [53.17, 5.73], zoom: 9 });
    window._activitiesMap = map;

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors',
      maxZoom: 19,
    }).addTo(map);

    layers.wandelen = L.layerGroup().addTo(map);
    layers.fietsen = L.layerGroup().addTo(map);
    layers.dagtrip = L.layerGroup().addTo(map);

    walkingRoutes.forEach(function(r) {
      var line = L.polyline(r.coords, { color: '#8ba888', weight: 4, dashArray: '7 4', opacity: 0.9 }).addTo(layers.wandelen);
      var hit = L.polyline(r.coords, { color: '#000', weight: 20, opacity: 0 }).addTo(layers.wandelen);
      line.bindPopup(buildActRoutePopup(r, 'wandelen'));
      hit.on('click', function() { line.openPopup(); });
    });

    cyclingRoutes.forEach(function(r) {
      var line = L.polyline(r.coords, { color: '#5a7055', weight: 4, opacity: 0.9 }).addTo(layers.fietsen);
      var hit = L.polyline(r.coords, { color: '#000', weight: 20, opacity: 0 }).addTo(layers.fietsen);
      line.bindPopup(buildActRoutePopup(r, 'fietsen'));
      hit.on('click', function() { line.openPopup(); });
    });

    DAGTRIPS.forEach(function(d) {
      var icon = makeActIcon(d.emoji, '#e6c569');
      L.marker([d.lat, d.lng], { icon: icon })
        .bindPopup(buildActDagtripPopup(d))
        .addTo(layers.dagtrip);
    });
  }

  renderActivityCards();

  document.querySelectorAll('.act-filter-btn').forEach(function(btn) {
    btn.addEventListener('click', function() {
      document.querySelectorAll('.act-filter-btn').forEach(function(b) { b.classList.remove('active'); });
      btn.classList.add('active');

      var f = btn.dataset.actFilter;

      if (map) {
        ['wandelen', 'fietsen', 'dagtrip'].forEach(function(t) {
          if (f === 'all' || f === t) map.addLayer(layers[t]);
          else map.removeLayer(layers[t]);
        });
      }

      renderActivityCards();
    });
  });

  window._martenaRefreshActivitiesLang = renderActivityCards;
}

document.addEventListener('DOMContentLoaded', initActivitiesPage);
