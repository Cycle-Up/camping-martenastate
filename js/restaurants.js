// Restaurantdata — handmatig samengesteld op basis van Google Maps beoordelingen
// Bijgewerkt: april 2025 — controleer openingstijden periodiek via de Google Maps-link

const RESTAURANTS_DATA_DATE = 'april 2025';

// hours: { dagNr: ['HH:MM open', 'HH:MM sluit'] }  —  0=zo, 1=ma … 6=za
// Dag ontbreekt = die dag gesloten
const RESTAURANTS = [
  {
    id: 'steef',
    name: 'STEEF.',
    cuisine_nl: 'Fine dining',
    cuisine_en: 'Fine dining',
    category: 'finedining',
    city: 'leeuwarden',
    address: 'Tweebaksmarkt 47, Leeuwarden',
    rating: 4.9,
    reviews: 236,
    priceLevel: 3,
    lat: 53.2017, lng: 5.7896,
    googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=STEEF+Tweebaksmarkt+47+Leeuwarden',
    highlight_nl: 'Meesterlijk fine dining in het hart van de stad — 4 t/m 6 gangen.',
    highlight_en: 'Masterful fine dining in the heart of the city — 4 to 6 courses.',
    hours: {
      2: ['18:00','22:00'], 3: ['18:00','22:00'],
      4: ['18:00','22:00'], 5: ['18:00','22:00'], 6: ['18:00','22:00'],
    },
  },
  {
    id: 'pecorino',
    name: 'Pecorino Wijn & Eetbar',
    cuisine_nl: 'Italiaans · Wijnbar',
    cuisine_en: 'Italian · Wine bar',
    category: 'italiaans',
    city: 'leeuwarden',
    address: 'Druifstreek 55, Leeuwarden',
    rating: 4.8,
    reviews: 216,
    priceLevel: 2,
    lat: 53.2006, lng: 5.7887,
    googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=Pecorino+Wijn+Eetbar+Leeuwarden',
    highlight_nl: 'Zonnig terras, uitstekende wijnen en royale tapas. Gezellig en ongedwongen.',
    highlight_en: 'Sunny terrace, excellent wines and generous tapas. Cosy and relaxed.',
    hours: {
      2: ['17:00','22:00'], 3: ['17:00','22:00'],
      4: ['17:00','22:00'], 5: ['17:00','23:00'], 6: ['15:00','23:00'], 0: ['15:00','21:00'],
    },
  },
  {
    id: 'eleve',
    name: 'Élevé',
    cuisine_nl: 'Modern internationaal',
    cuisine_en: 'Modern international',
    category: 'internationaal',
    city: 'leeuwarden',
    address: 'WTC Hotel (daktuin), Leeuwarden',
    rating: 4.5,
    reviews: 626,
    priceLevel: 3,
    lat: 53.1982, lng: 5.7988,
    googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=Eleve+Restaurant+WTC+Hotel+Leeuwarden',
    highlight_nl: 'Panoramisch uitzicht over Leeuwarden. Michelin Bib Gourmand. Verfijnd en toegankelijk.',
    highlight_en: 'Panoramic views over Leeuwarden. Michelin Bib Gourmand. Refined and accessible.',
    hours: {
      0: ['12:00','21:30'], 1: ['12:00','21:30'], 2: ['12:00','21:30'],
      3: ['12:00','21:30'], 4: ['12:00','22:00'], 5: ['12:00','22:00'], 6: ['12:00','22:00'],
    },
  },
  {
    id: 'jamuna',
    name: 'Jamuna',
    cuisine_nl: 'Indiaas',
    cuisine_en: 'Indian',
    category: 'aziatisch',
    city: 'leeuwarden',
    address: 'Weerd 26-28, Leeuwarden',
    rating: 4.5,
    reviews: 250,
    priceLevel: 2,
    lat: 53.2022, lng: 5.7950,
    googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=Jamuna+Indian+Restaurant+Leeuwarden',
    highlight_nl: 'Authentieke Indiase keuken sinds 1994. Vriendelijk personeel, warme sfeer.',
    highlight_en: 'Authentic Indian cuisine since 1994. Friendly staff, warm atmosphere.',
    hours: {
      0: ['17:00','22:00'], 1: ['17:00','22:00'], 2: ['17:00','22:00'],
      3: ['17:00','22:00'], 4: ['17:00','22:00'], 5: ['17:00','22:30'], 6: ['17:00','22:30'],
    },
  },
  {
    id: 'doubleb',
    name: 'Double B Bar & Kitchen',
    cuisine_nl: 'Burgers · Amerikaans',
    cuisine_en: 'Burgers · American',
    category: 'casual',
    city: 'leeuwarden',
    address: 'Weerd 18, Leeuwarden',
    rating: 4.5,
    reviews: 180,
    priceLevel: 2,
    lat: 53.2020, lng: 5.7948,
    googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=Double+B+Bar+Kitchen+Leeuwarden',
    highlight_nl: 'De beste burgers van Leeuwarden met een gevarieerd menu. Altijd een feest.',
    highlight_en: 'The best burgers in Leeuwarden with a varied menu. Always a treat.',
    hours: {
      0: ['12:00','22:00'], 1: ['12:00','22:00'], 2: ['12:00','22:00'],
      3: ['12:00','22:00'], 4: ['12:00','22:30'], 5: ['12:00','22:30'], 6: ['12:00','22:30'],
    },
  },
  {
    id: 'roast',
    name: 'ROAST',
    cuisine_nl: 'Eigentijds internationaal',
    cuisine_en: 'Contemporary international',
    category: 'internationaal',
    city: 'leeuwarden',
    address: 'Nieuwestad 63, Leeuwarden',
    rating: 4.4,
    reviews: 1882,
    priceLevel: 2,
    lat: 53.2032, lng: 5.7962,
    googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=ROAST+Restaurant+Nieuwestad+Leeuwarden',
    highlight_nl: 'Industrieel-chic aan het water. Groot terras, uitstekend eten, trendy sfeer.',
    highlight_en: 'Industrial-chic on the waterfront. Large terrace, excellent food, trendy vibe.',
    hours: {
      0: ['12:00','22:00'], 2: ['12:00','22:00'],
      3: ['12:00','22:00'], 4: ['12:00','23:00'], 5: ['12:00','23:00'], 6: ['12:00','23:00'],
    },
  },
  {
    id: 'sinjah',
    name: 'Sin Jah',
    cuisine_nl: 'Pan-Aziatisch',
    cuisine_en: 'Pan-Asian',
    category: 'aziatisch',
    city: 'leeuwarden',
    address: 'Schrans 92, Leeuwarden',
    rating: 4.4,
    reviews: 885,
    priceLevel: 2,
    lat: 53.1968, lng: 5.8022,
    googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=Sin+Jah+Restaurant+Leeuwarden',
    highlight_nl: 'Meer dan 80 gerechten: Chinees, Koreaans, Thais, Vietnamees en Japans.',
    highlight_en: 'Over 80 dishes: Chinese, Korean, Thai, Vietnamese and Japanese.',
    hours: {
      0: ['17:00','22:00'], 1: ['17:00','22:00'], 2: ['17:00','22:00'],
      3: ['17:00','22:00'], 4: ['17:00','22:30'], 5: ['17:00','22:30'], 6: ['17:00','22:30'],
    },
  },
  {
    id: 'walrus',
    name: 'Grand Café De Walrus',
    cuisine_nl: 'Grand Café · Europees',
    cuisine_en: 'Grand Café · European',
    category: 'casual',
    city: 'leeuwarden',
    address: 'Gouverneursplein 37, Leeuwarden',
    rating: 4.3,
    reviews: 1467,
    priceLevel: 2,
    lat: 53.2013, lng: 5.7976,
    googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=Grand+Cafe+De+Walrus+Leeuwarden',
    highlight_nl: 'Ruime porties, casual sfeer. Populair voor lunch en diner. TripAdvisor top 5.',
    highlight_en: 'Generous portions, casual vibe. Popular for lunch and dinner. TripAdvisor top 5.',
    hours: {
      0: ['10:00','22:00'], 1: ['10:00','22:00'], 2: ['10:00','22:00'],
      3: ['10:00','22:00'], 4: ['10:00','23:00'], 5: ['10:00','23:00'], 6: ['10:00','22:30'],
    },
  },
  {
    id: 'proefverlof',
    name: 'Proefverlof',
    cuisine_nl: 'Seizoens­keuken · Fries',
    cuisine_en: 'Seasonal · Frisian',
    category: 'nederlands',
    city: 'leeuwarden',
    address: 'Blokhuispoort, Leeuwarden',
    rating: 4.3,
    reviews: 1065,
    priceLevel: 2,
    lat: 53.2040, lng: 5.7989,
    googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=Proefverlof+Blokhuispoort+Leeuwarden',
    highlight_nl: 'Unieke locatie in een historische gevangenis. Lokale Friese ingrediënten, kanaalzicht.',
    highlight_en: 'Unique location in a historic prison. Local Frisian ingredients, canal views.',
    hours: {
      2: ['12:00','21:30'], 3: ['12:00','21:30'],
      4: ['12:00','21:30'], 5: ['12:00','22:00'], 6: ['12:00','22:00'], 0: ['12:00','21:00'],
    },
  },
  {
    id: 'fellini',
    name: 'Fellini City Lounge',
    cuisine_nl: 'Italiaans',
    cuisine_en: 'Italian',
    category: 'italiaans',
    city: 'leeuwarden',
    address: 'Wilhelminaplein 20, Leeuwarden',
    rating: 4.2,
    reviews: 150,
    priceLevel: 2,
    lat: 53.2009, lng: 5.7875,
    googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=Fellini+City+Lounge+Leeuwarden',
    highlight_nl: 'Gezellig Italiaans in het centrum. Pizza, pasta en vlees — altijd vol leven.',
    highlight_en: 'Cosy Italian in the city centre. Pizza, pasta and meat — always lively.',
    hours: {
      0: ['17:00','22:30'], 1: ['17:00','22:30'], 2: ['17:00','22:30'],
      3: ['17:00','22:30'], 4: ['17:00','23:00'], 5: ['17:00','23:00'], 6: ['17:00','23:00'],
    },
  },
  {
    id: 'garage',
    name: 'Garage Modern',
    cuisine_nl: 'Modern Italiaans',
    cuisine_en: 'Modern Italian',
    category: 'italiaans',
    city: 'leeuwarden',
    address: 'Zaailand 82, Leeuwarden',
    rating: 4.2,
    reviews: 200,
    priceLevel: 2,
    lat: 53.2025, lng: 5.7935,
    googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=Garage+Modern+Zaailand+Leeuwarden',
    highlight_nl: 'Industrieel interieur, houtoven-pizza en verfijnde Italiaanse gerechten.',
    highlight_en: 'Industrial interior, wood-fired pizza and refined Italian dishes.',
    hours: {
      2: ['12:00','22:00'], 3: ['12:00','22:00'],
      4: ['12:00','22:00'], 5: ['12:00','23:00'], 6: ['12:00','23:00'], 0: ['12:00','21:00'],
    },
  },
  {
    id: 'lekkers',
    name: 'Lekkers Ite & Drinke',
    cuisine_nl: 'Nederlands · Snacks',
    cuisine_en: 'Dutch · Snacks',
    category: 'casual',
    city: 'stiens',
    address: 'Stiens',
    rating: 4.3,
    reviews: 312,
    priceLevel: 1,
    lat: 53.2560, lng: 5.7615,
    googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=Lekkers+Ite+Drinke+Stiens',
    highlight_nl: 'De beste friet van de regio. Gezellig, vriendelijk en goede prijs-kwaliteitverhouding.',
    highlight_en: 'The best fries in the region. Cosy, friendly and great value for money.',
    hours: {
      1: ['11:00','20:00'], 2: ['11:00','20:00'],
      3: ['11:00','20:00'], 4: ['11:00','20:00'], 5: ['11:00','21:00'], 6: ['11:00','21:00'],
    },
  },
];

// ─── helpers ──────────────────────────────────────────────────────────────────

function isOpenNow(hours) {
  const now = new Date();
  const day = now.getDay();
  const slot = hours[day];
  if (!slot) return false;
  const cur = now.getHours() * 60 + now.getMinutes();
  const open = parseInt(slot[0]) * 60 + parseInt(slot[0].split(':')[1]);
  const close = parseInt(slot[1]) * 60 + parseInt(slot[1].split(':')[1]);
  return cur >= open && cur < close;
}

function getTodaySlot(hours) {
  return hours[new Date().getDay()] || null;
}

function renderStars(rating) {
  const full = Math.floor(rating);
  const half = rating - full >= 0.25 && rating - full < 0.75;
  const empty = 5 - full - (half ? 1 : 0);
  const star = '<svg class="star-icon" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true"><path d="M8 1l1.85 3.75L14 5.5l-3 2.92.7 4.12L8 10.5l-3.7 1.94.7-4.12L2 5.5l4.15-.75z"/></svg>';
  const halfStar = '<svg class="star-icon half" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true"><defs><linearGradient id="h"><stop offset="50%" stop-color="currentColor"/><stop offset="50%" stop-color="#e0d8ea" stop-opacity="1"/></linearGradient></defs><path fill="url(#h)" d="M8 1l1.85 3.75L14 5.5l-3 2.92.7 4.12L8 10.5l-3.7 1.94.7-4.12L2 5.5l4.15-.75z"/></svg>';
  const emptyStar = '<svg class="star-icon empty" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true"><path d="M8 1l1.85 3.75L14 5.5l-3 2.92.7 4.12L8 10.5l-3.7 1.94.7-4.12L2 5.5l4.15-.75z"/></svg>';
  return star.repeat(full) + (half ? halfStar : '') + emptyStar.repeat(empty);
}

function priceLabel(level) {
  return '€'.repeat(level) + '<span style="opacity:.3">' + '€'.repeat(3 - level) + '</span>';
}

function makeDivIcon(emoji) {
  return L.divIcon({
    html: `<div class="map-emoji-marker">${emoji}</div>`,
    className: '',
    iconSize: [36, 36],
    iconAnchor: [18, 18],
    popupAnchor: [0, -18],
  });
}

// ─── category metadata ────────────────────────────────────────────────────────

const CATEGORIES = {
  finedining:    { emoji: '🍽️', color: '#7b5d8c', label_nl: 'Fine dining',    label_en: 'Fine dining' },
  italiaans:     { emoji: '🍕', color: '#c97676', label_nl: 'Italiaans',       label_en: 'Italian' },
  aziatisch:     { emoji: '🥢', color: '#d4a843', label_nl: 'Aziatisch',       label_en: 'Asian' },
  internationaal:{ emoji: '🌍', color: '#5a7aad', label_nl: 'Internationaal',  label_en: 'International' },
  casual:        { emoji: '🍔', color: '#8ba888', label_nl: 'Casual dining',   label_en: 'Casual dining' },
  nederlands:    { emoji: '🧀', color: '#a87b3b', label_nl: 'Nederlands',      label_en: 'Dutch' },
};

// ─── main init ────────────────────────────────────────────────────────────────

function initRestaurantPage() {
  const lang = (localStorage.getItem('lang') || 'nl');
  let activeCategoryFilter = 'all';
  let activeCityFilter = 'all';
  let map, markers = [];

  // ── Leaflet map ──
  map = L.map('restaurantMap', { zoomControl: true }).setView([53.220, 5.782], 13);
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    maxZoom: 18,
  }).addTo(map);

  // ── Build markers ──
  function buildMarkers() {
    markers.forEach(m => map.removeLayer(m.layer));
    markers = [];
    RESTAURANTS.forEach(r => {
      const cat = CATEGORIES[r.category];
      const open = isOpenNow(r.hours);
      const todaySlot = getTodaySlot(r.hours);
      const hoursLabel = todaySlot
        ? `${todaySlot[0]}–${todaySlot[1]}`
        : (lang === 'nl' ? 'Vandaag gesloten' : 'Closed today');

      const openLabel = open
        ? (lang === 'nl' ? 'Nu open' : 'Open now')
        : (lang === 'nl' ? 'Nu gesloten' : 'Closed now');

      const popup = `
        <div class="rest-popup">
          <div class="rest-popup-header">
            <span class="rest-popup-emoji">${cat.emoji}</span>
            <strong>${r.name}</strong>
          </div>
          <div style="display:flex;align-items:center;gap:.4rem;margin:.3rem 0;">
            <span class="rest-popup-badge ${open ? 'open' : 'closed'}">${openLabel}</span>
            <span style="font-size:.75rem;color:#666;">${hoursLabel}</span>
          </div>
          <div style="font-size:.8rem;color:#555;margin-bottom:.5rem;">⭐ ${r.rating} · ${r.reviews} ${lang === 'nl' ? 'beoordelingen' : 'reviews'}</div>
          <a href="${r.googleMapsUrl}" target="_blank" rel="noopener" class="rest-popup-link">
            ${lang === 'nl' ? 'Bekijk op Google Maps' : 'View on Google Maps'} →
          </a>
        </div>`;

      const layer = L.marker([r.lat, r.lng], { icon: makeDivIcon(cat.emoji) })
        .bindPopup(popup, { maxWidth: 240 })
        .addTo(map);

      markers.push({ id: r.id, layer, city: r.city, category: r.category });
    });
  }

  // ── Filter markers ──
  function applyMapFilter() {
    markers.forEach(m => {
      const show =
        (activeCategoryFilter === 'all' || m.category === activeCategoryFilter) &&
        (activeCityFilter === 'all' || m.city === activeCityFilter);
      if (show) map.addLayer(m.layer); else map.removeLayer(m.layer);
    });
  }

  // ── Render restaurant cards ──
  function renderCards() {
    const grid = document.getElementById('restaurantGrid');
    if (!grid) return;

    const visible = RESTAURANTS.filter(r =>
      (activeCategoryFilter === 'all' || r.category === activeCategoryFilter) &&
      (activeCityFilter === 'all' || r.city === activeCityFilter)
    );

    if (visible.length === 0) {
      grid.innerHTML = `<p style="color:var(--color-text-muted);padding:1rem 0;">${lang === 'nl' ? 'Geen restaurants gevonden.' : 'No restaurants found.'}</p>`;
      return;
    }

    grid.innerHTML = visible.map(r => {
      const cat = CATEGORIES[r.category];
      const open = isOpenNow(r.hours);
      const todaySlot = getTodaySlot(r.hours);
      const badgeClass = open ? 'rest-open-badge' : 'rest-closed-badge';
      const badgeText = open
        ? (lang === 'nl' ? 'Nu open' : 'Open now')
        : (lang === 'nl' ? 'Nu gesloten' : 'Closed now');
      const todayLabel = todaySlot
        ? `${lang === 'nl' ? 'Vandaag' : 'Today'}: ${todaySlot[0]}–${todaySlot[1]}`
        : (lang === 'nl' ? 'Vandaag gesloten' : 'Closed today');
      const cuisineLabel = lang === 'nl' ? r.cuisine_nl : r.cuisine_en;
      const highlight = lang === 'nl' ? r.highlight_nl : r.highlight_en;
      const cityLabel = r.city === 'stiens' ? 'Stiens' : 'Leeuwarden';
      const mapsLabel = lang === 'nl' ? 'Google Maps' : 'Google Maps';

      return `
        <article class="restaurant-card fade-in" data-id="${r.id}">
          <div class="rest-card-top">
            <div class="rest-card-emoji">${cat.emoji}</div>
            <div class="rest-card-meta">
              <div class="rest-card-title">${r.name}</div>
              <div class="rest-card-tags">
                <span class="rest-tag" style="background:${cat.color}20;color:${cat.color};">${cuisineLabel}</span>
                <span class="rest-tag rest-tag-city">${cityLabel}</span>
                <span class="rest-tag rest-tag-price">${priceLabel(r.priceLevel)}</span>
              </div>
            </div>
          </div>
          <div class="rest-card-rating">
            <div class="rest-stars">${renderStars(r.rating)}</div>
            <span class="rest-rating-num">${r.rating}</span>
            <span class="rest-review-count">(${r.reviews.toLocaleString('nl-NL')})</span>
          </div>
          <p class="rest-card-highlight">${highlight}</p>
          <div class="rest-card-footer">
            <div class="rest-hours">
              <span class="${badgeClass}">${badgeText}</span>
              <span class="rest-today-hours">${todayLabel}</span>
            </div>
            <a href="${r.googleMapsUrl}" target="_blank" rel="noopener" class="rest-maps-link" aria-label="${r.name} op Google Maps">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 0 1-2.827 0l-4.244-4.243a8 8 0 1 1 11.314 0z"/><circle cx="12" cy="11" r="3"/></svg>
              ${mapsLabel}
            </a>
          </div>
        </article>`;
    }).join('');

    // Click on card → open map popup
    grid.querySelectorAll('.restaurant-card').forEach(card => {
      card.addEventListener('click', e => {
        if (e.target.closest('a')) return;
        const id = card.dataset.id;
        const m = markers.find(x => x.id === id);
        if (m) {
          map.setView(m.layer.getLatLng(), 16, { animate: true });
          m.layer.openPopup();
          document.getElementById('restaurantMap').scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      });
    });
  }

  // ── Filter buttons ──
  function initFilters() {
    document.querySelectorAll('[data-cat-filter]').forEach(btn => {
      btn.addEventListener('click', () => {
        activeCategoryFilter = btn.dataset.catFilter;
        document.querySelectorAll('[data-cat-filter]').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        applyMapFilter();
        renderCards();
      });
    });

    document.querySelectorAll('[data-city-filter]').forEach(btn => {
      btn.addEventListener('click', () => {
        activeCityFilter = btn.dataset.cityFilter;
        document.querySelectorAll('[data-city-filter]').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        applyMapFilter();
        renderCards();
      });
    });
  }

  // ── Render data-update label ──
  const dateEl = document.getElementById('dataUpdatedDate');
  if (dateEl) dateEl.textContent = RESTAURANTS_DATA_DATE;

  // ── Bootstrap ──
  buildMarkers();
  renderCards();
  initFilters();

  // Re-render when language changes (called from main.js setLang)
  window._martenaRefreshRestaurantLang = function () {
    buildMarkers();
    renderCards();
  };
}

document.addEventListener('DOMContentLoaded', initRestaurantPage);
