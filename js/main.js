// Language state — guard against localStorage being unavailable (file://, private mode)
function safeGet(key) {
  try { return window.localStorage.getItem(key); } catch (e) { return null; }
}
function safeSet(key, val) {
  try { window.localStorage.setItem(key, val); } catch (e) { /* ignore */ }
}

let currentLang = safeGet('lang') || 'nl';

function t(key) {
  return (translations[currentLang] && translations[currentLang][key]) || key;
}

function applyTranslations() {
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    el.textContent = t(key);
  });
  document.querySelectorAll('[data-i18n-href]').forEach(el => {
    el.href = t(el.getAttribute('data-i18n-href'));
  });
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    el.placeholder = t(el.getAttribute('data-i18n-placeholder'));
  });
  document.documentElement.lang = currentLang;
  document.querySelectorAll('.lang-toggle button').forEach(btn => {
    btn.classList.toggle('active', btn.getAttribute('data-lang') === currentLang);
  });
}

function setLang(lang) {
  currentLang = lang;
  safeSet('lang', lang);
  applyTranslations();
  // Refresh dynamic content that depends on language
  if (typeof initTodayWidget === 'function') initTodayWidget();
  if (typeof initGuestPersonalization === 'function') initGuestPersonalization();
  if (typeof initWeatherWidget === 'function') initWeatherWidget();
  if (typeof renderRouteLists === 'function') renderRouteLists();
  if (typeof initBloomCalendar === 'function') initBloomCalendar();
  if (typeof window._martenaRefreshMapLang === 'function') window._martenaRefreshMapLang();
}

// Mobile nav toggle
function initNav() {
  const toggle = document.querySelector('.menu-toggle');
  const links = document.querySelector('.nav-links');
  if (!toggle || !links) return;

  toggle.addEventListener('click', () => {
    links.classList.toggle('open');
    toggle.setAttribute('aria-expanded', links.classList.contains('open'));
  });

  // Close on link click
  links.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => links.classList.remove('open'));
  });

  // Close on outside click
  document.addEventListener('click', e => {
    if (!toggle.contains(e.target) && !links.contains(e.target)) {
      links.classList.remove('open');
    }
  });

  // Highlight active nav link
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  links.querySelectorAll('a').forEach(a => {
    const href = a.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      a.classList.add('active');
    }
  });
}

// Tab switching
function initTabs() {
  document.querySelectorAll('.tabs').forEach(tabGroup => {
    const buttons = tabGroup.querySelectorAll('.tab-btn');

    buttons.forEach(btn => {
      btn.addEventListener('click', () => {
        const target = btn.getAttribute('data-tab');

        // Deactivate all buttons in this group
        buttons.forEach(b => {
          b.classList.remove('active');
          b.setAttribute('aria-selected', 'false');
        });

        // Deactivate only panels that belong to this tab group
        buttons.forEach(b => {
          const panel = document.getElementById(b.getAttribute('data-tab'));
          if (panel) panel.classList.remove('active');
        });

        btn.classList.add('active');
        btn.setAttribute('aria-selected', 'true');
        const panel = document.getElementById(target);
        if (panel) panel.classList.add('active');
      });
    });
  });
}

// Fade-in on scroll
function initScrollAnimations() {
  // Fallback for environments without IntersectionObserver (very old browsers
  // or test environments) — show all elements immediately.
  if (typeof IntersectionObserver === 'undefined') {
    document.querySelectorAll('.fade-in').forEach(el => el.classList.add('visible'));
    return;
  }
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));
}

// Navbar scroll shadow
function initNavbarScroll() {
  const navbar = document.querySelector('.navbar');
  if (!navbar) return;
  window.addEventListener('scroll', () => {
    navbar.style.boxShadow = window.scrollY > 20
      ? '0 4px 24px rgba(58,42,64,0.10)'
      : 'none';
  }, { passive: true });
}

// Map initialisation (only on kaart.html)
function initMap() {
  const mapEl = document.getElementById('map');
  if (!mapEl || typeof L === 'undefined') return;

  const map = L.map('map', {
    center: [53.2200, 5.8100],
    zoom: 12,
    zoomControl: true,
  });
  window._martenaMap = map;

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© <a href="https://openstreetmap.org">OpenStreetMap</a> contributors',
    maxZoom: 19,
  }).addTo(map);

  // Icon factory — drop-pin style with emoji centre
  function makeIcon(color, emoji, pulse) {
    const ring = pulse ? `box-shadow:0 0 0 6px ${color}30,0 3px 10px rgba(0,0,0,0.25);` : 'box-shadow:0 3px 10px rgba(0,0,0,0.2);';
    return L.divIcon({
      html: `<div style="background:${color};width:38px;height:38px;border-radius:50% 50% 50% 0;transform:rotate(-45deg);border:3px solid white;${ring}display:flex;align-items:center;justify-content:center;"><span style="transform:rotate(45deg);font-size:16px;line-height:1;">${emoji}</span></div>`,
      className: '',
      iconSize: [38, 38],
      iconAnchor: [19, 38],
      popupAnchor: [0, -42],
    });
  }

  const categoryConfig = {
    home:      { color: '#7b5d8c', emoji: '🏕️', pulse: true },
    eat:       { color: '#d4a843', emoji: '🍽️' },
    shop:      { color: '#c9b8d4', emoji: '🛒' },
    sight:     { color: '#a890b8', emoji: '⭐' },
    transport: { color: '#8ba888', emoji: '🅿️' },
  };

  const iconCache = {};
  function getIcon(cat) {
    if (!iconCache[cat]) {
      const cfg = categoryConfig[cat] || { color: '#888', emoji: '📍' };
      iconCache[cat] = makeIcon(cfg.color, cfg.emoji, cfg.pulse);
    }
    return iconCache[cat];
  }

  // Helpers — popup HTML builders (rebuilt on language change)
  const chip = (txt) => `<span style="background:#e8dff0;color:#7b5d8c;padding:.15rem .5rem;border-radius:999px;font-size:.7rem;font-weight:600;">${txt}</span>`;

  function buildRoutePopup(route, kind) {
    const name = currentLang === 'en' ? route.name_en : route.name_nl;
    const desc = currentLang === 'en' ? route.desc_en : route.desc_nl;
    const dur = currentLang === 'en' ? route.duration_en : route.duration_nl;
    const diff = currentLang === 'en' ? route.difficulty_en : route.difficulty_nl;
    const catLabel = kind === 'walking' ? t('kaart.filter.wandelen') : t('kaart.filter.fietsen');
    const linkLabel = currentLang === 'en' ? 'Open route →' : 'Open route →';
    return `
      <span class="popup-category">${catLabel}</span>
      <h4>${name}</h4>
      <div style="display:flex;gap:.4rem;flex-wrap:wrap;margin:.35rem 0;">${chip(route.distance)}${chip(dur)}${chip(diff)}</div>
      <p style="margin:.35rem 0;font-size:.85rem;color:#5a4d5f;line-height:1.5;">${desc}</p>
      <a href="${route.externalUrl}" target="_blank" rel="noopener" style="display:inline-flex;align-items:center;gap:.35rem;margin-top:.4rem;color:#7b5d8c;font-weight:600;font-size:.85rem;text-decoration:none;">${linkLabel}</a>
    `;
  }

  function buildPlacePopup(place) {
    const name = currentLang === 'en' ? place.name_en : place.name_nl;
    const desc = currentLang === 'en' ? place.desc_en : place.desc_nl;
    const addr = currentLang === 'en' ? (place.addr_en || '') : (place.addr_nl || '');
    const badge = place.badge_nl ? (currentLang === 'en' ? place.badge_en : place.badge_nl) : '';
    const badgeHtml = badge ? `<span style="background:#e8dff0;color:#7b5d8c;padding:.15rem .5rem;border-radius:999px;font-size:.7rem;font-weight:600;margin-bottom:.4rem;display:inline-block;">${badge}</span> ` : '';
    const addrHtml = addr ? `<div style="font-size:.78rem;color:#8a7d8f;margin-top:.3rem;">${addr}</div>` : '';
    const linkLabel = currentLang === 'en' ? 'Open in Maps →' : 'Open in Maps →';
    const linkHtml = place.externalUrl ? `<a href="${place.externalUrl}" target="_blank" rel="noopener" style="display:inline-flex;align-items:center;gap:.35rem;margin-top:.5rem;color:#7b5d8c;font-weight:600;font-size:.8rem;text-decoration:none;">${linkLabel}</a>` : '';
    const catFilter = t(`kaart.filter.${place.category}`);
    return `<span class="popup-category">${catFilter}</span><h4>${name}</h4>${badgeHtml}<p style="margin:.3rem 0;font-size:.85rem;color:#5a4d5f;line-height:1.5;">${desc}</p>${addrHtml}${linkHtml}`;
  }

  // Route polylines
  const routeLayers = { walking: [], cycling: [] };

  function drawRoutes(routes, kind, color) {
    if (typeof routes === 'undefined') return;
    routes.forEach(route => {
      const opts = {
        color, weight: kind === 'walking' ? 5 : 4,
        opacity: 0.75, lineCap: 'round', lineJoin: 'round',
        dashArray: kind === 'walking' ? '2,8' : null,
        className: `route-line route-${kind}`,
      };
      const line = L.polyline(route.coords, opts).addTo(map);
      const hitLine = L.polyline(route.coords, { color: '#000', weight: 22, opacity: 0 }).addTo(map);
      const popup = buildRoutePopup(route, kind);
      line.bindPopup(popup, { maxWidth: 300 });
      hitLine.bindPopup(popup, { maxWidth: 300 });
      hitLine.on('mouseover', () => line.setStyle({ weight: kind === 'walking' ? 7 : 6, opacity: 1 }));
      hitLine.on('mouseout', () => line.setStyle({ weight: kind === 'walking' ? 5 : 4, opacity: 0.75 }));
      routeLayers[kind].push({ line, hitLine, route, kind, id: route.id });
    });
  }

  if (typeof walkingRoutes !== 'undefined') drawRoutes(walkingRoutes, 'walking', '#8ba888');
  if (typeof cyclingRoutes !== 'undefined') drawRoutes(cyclingRoutes, 'cycling', '#5a7055');
  window._martenaRouteLayers = routeLayers;

  // Place markers from places.js
  const placeMarkers = [];
  if (typeof mapPlaces !== 'undefined') {
    mapPlaces.forEach(place => {
      const marker = L.marker(place.coord, { icon: getIcon(place.category) })
        .addTo(map)
        .bindPopup(buildPlacePopup(place), { maxWidth: 300 });
      placeMarkers.push({ marker, category: place.category, place, id: place.id });
    });
  }

  // Expose a refresh function so language toggle can update popups
  window._martenaRefreshMapLang = function () {
    placeMarkers.forEach(({ marker, place }) => {
      marker.setPopupContent(buildPlacePopup(place));
    });
    routeLayers.walking.forEach(({ line, hitLine, route, kind }) => {
      const html = buildRoutePopup(route, kind);
      line.setPopupContent(html);
      hitLine.setPopupContent(html);
    });
    routeLayers.cycling.forEach(({ line, hitLine, route, kind }) => {
      const html = buildRoutePopup(route, kind);
      line.setPopupContent(html);
      hitLine.setPopupContent(html);
    });
  };

  // Unified filter state — all categories active by default
  const activeFilters = new Set(['home', 'eat', 'shop', 'sight', 'transport', 'wandelen', 'fietsen']);

  function applyMapFilter() {
    placeMarkers.forEach(({ marker, category }) => {
      if (activeFilters.has(category)) marker.addTo(map); else map.removeLayer(marker);
    });
    routeLayers.walking.forEach(({ line, hitLine }) => {
      if (activeFilters.has('wandelen')) { line.addTo(map); hitLine.addTo(map); }
      else { map.removeLayer(line); map.removeLayer(hitLine); }
    });
    routeLayers.cycling.forEach(({ line, hitLine }) => {
      if (activeFilters.has('fietsen')) { line.addTo(map); hitLine.addTo(map); }
      else { map.removeLayer(line); map.removeLayer(hitLine); }
    });
  }

  document.querySelectorAll('.map-filter-btn[data-category]').forEach(btn => {
    btn.addEventListener('click', () => {
      const cat = btn.getAttribute('data-category');
      if (activeFilters.has(cat)) { activeFilters.delete(cat); btn.classList.remove('active'); }
      else { activeFilters.add(cat); btn.classList.add('active'); }
      applyMapFilter();
    });
  });

  // "Mijn locatie" button
  const locBtn = document.getElementById('myLocationBtn');
  if (locBtn && navigator.geolocation) {
    let locMarker = null;
    locBtn.addEventListener('click', () => {
      locBtn.textContent = '…';
      navigator.geolocation.getCurrentPosition(
        pos => {
          const { latitude: lat, longitude: lng } = pos.coords;
          if (locMarker) map.removeLayer(locMarker);
          locMarker = L.circleMarker([lat, lng], {
            radius: 10, fillColor: '#7b5d8c', fillOpacity: 0.9,
            color: 'white', weight: 3,
          }).addTo(map).bindPopup(t('kaart.mylocation.you')).openPopup();
          map.setView([lat, lng], 14);
          locBtn.innerHTML = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="3"/><path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83"/></svg> <span data-i18n="kaart.mylocation">${t('kaart.mylocation')}</span>`;
        },
        () => {
          locBtn.innerHTML = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="3"/><path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83"/></svg> <span data-i18n="kaart.mylocation">${t('kaart.mylocation')}</span>`;
          showToast(t('kaart.mylocation.error'));
        }
      );
    });
  } else if (locBtn) {
    locBtn.style.display = 'none';
  }
}

// Guest name personalization via ?gast= URL param
function initGuestPersonalization() {
  try {
    const params = new URLSearchParams(window.location.search);
    const paramName = params.get('gast');
    if (paramName && paramName.trim()) {
      safeSet('guestName', paramName.trim());
    }
  } catch (e) { /* URL parsing unavailable */ }

  const name = safeGet('guestName');
  if (!name) return;

  const heroEl = document.getElementById('guestGreeting');
  if (heroEl) {
    heroEl.textContent = t('guest.welcome').replace('{naam}', name);
    heroEl.removeAttribute('hidden');
  }
}

// Weather widget using Open-Meteo (free, no API key)
const WEATHER_CACHE_KEY = 'martenaWeatherCache';
const WEATHER_CACHE_TTL = 30 * 60 * 1000;

const WMO_MAP = {
  0:  { icon: '☀️',  key: 'clear' },
  1:  { icon: '🌤️', key: 'mainly_clear' },
  2:  { icon: '⛅',  key: 'partly_cloudy' },
  3:  { icon: '☁️',  key: 'overcast' },
  45: { icon: '🌫️', key: 'fog' },
  48: { icon: '🌫️', key: 'fog' },
  51: { icon: '🌦️', key: 'drizzle_light' },
  53: { icon: '🌦️', key: 'drizzle' },
  55: { icon: '🌦️', key: 'drizzle_heavy' },
  61: { icon: '🌧️', key: 'rain_light' },
  63: { icon: '🌧️', key: 'rain' },
  65: { icon: '🌧️', key: 'rain_heavy' },
  71: { icon: '🌨️', key: 'snow_light' },
  73: { icon: '🌨️', key: 'snow' },
  75: { icon: '❄️',  key: 'snow_heavy' },
  80: { icon: '🌦️', key: 'showers_light' },
  81: { icon: '🌧️', key: 'showers' },
  82: { icon: '⛈️',  key: 'showers_heavy' },
  85: { icon: '🌨️', key: 'snow_showers' },
  86: { icon: '🌨️', key: 'snow_showers_heavy' },
  95: { icon: '⛈️',  key: 'thunderstorm' },
  99: { icon: '⛈️',  key: 'thunderstorm_hail' },
};

function _getWMOInfo(code) {
  return WMO_MAP[code] || WMO_MAP[Math.floor(code / 10) * 10] || { icon: '🌡️', key: 'unknown' };
}

function _renderWeatherRow(data) {
  const row = document.getElementById('weatherRow');
  if (!row) return;
  const { temperature_2m, weathercode, windspeed_10m, precipitation } = data.current;
  const info = _getWMOInfo(weathercode);

  row.innerHTML = '';

  const iconEl = document.createElement('span');
  iconEl.className = 'weather-icon';
  iconEl.setAttribute('aria-hidden', 'true');
  iconEl.textContent = info.icon;

  const detailsEl = document.createElement('div');
  detailsEl.className = 'weather-details';

  const tempEl = document.createElement('span');
  tempEl.className = 'weather-temp';
  tempEl.textContent = `${Math.round(temperature_2m)}°C`;

  const descEl = document.createElement('span');
  descEl.className = 'weather-desc';
  descEl.textContent = t(`weather.condition.${info.key}`);

  detailsEl.appendChild(tempEl);
  detailsEl.appendChild(descEl);

  const metaEl = document.createElement('div');
  metaEl.className = 'weather-meta';

  const windEl = document.createElement('span');
  windEl.textContent = `💨 ${Math.round(windspeed_10m)} km/u`;

  const precipEl = document.createElement('span');
  precipEl.textContent = `🌧 ${precipitation} mm`;

  metaEl.appendChild(windEl);
  metaEl.appendChild(precipEl);

  row.appendChild(iconEl);
  row.appendChild(detailsEl);
  row.appendChild(metaEl);
  row.removeAttribute('hidden');
}

function _renderWeatherOffline() {
  const row = document.getElementById('weatherRow');
  if (!row) return;
  row.innerHTML = '';
  const msg = document.createElement('span');
  msg.className = 'weather-offline';
  msg.textContent = t('weather.offline');
  row.appendChild(msg);
  row.removeAttribute('hidden');
}

function initWeatherWidget() {
  const row = document.getElementById('weatherRow');
  if (!row) return;

  // Try sessionStorage cache first
  try {
    const raw = window.sessionStorage.getItem(WEATHER_CACHE_KEY);
    if (raw) {
      const cached = JSON.parse(raw);
      if (Date.now() - cached.ts < WEATHER_CACHE_TTL) {
        _renderWeatherRow(cached.data);
        return;
      }
    }
  } catch (e) { /* sessionStorage unavailable */ }

  if (!navigator.onLine || typeof fetch === 'undefined') {
    _renderWeatherOffline();
    return;
  }

  const API_URL = 'https://api.open-meteo.com/v1/forecast?latitude=53.2013&longitude=5.7745&current=temperature_2m,weathercode,windspeed_10m,precipitation&wind_speed_unit=kmh&timezone=Europe%2FAmsterdam';

  fetch(API_URL)
    .then(r => {
      if (!r.ok) throw new Error('API error');
      return r.json();
    })
    .then(data => {
      try {
        window.sessionStorage.setItem(WEATHER_CACHE_KEY, JSON.stringify({ ts: Date.now(), data }));
      } catch (e) { /* storage full */ }
      _renderWeatherRow(data);
    })
    .catch(() => {
      try {
        const raw = window.sessionStorage.getItem(WEATHER_CACHE_KEY);
        if (raw) { _renderWeatherRow(JSON.parse(raw).data); return; }
      } catch (e) { /* ignore */ }
      _renderWeatherOffline();
    });
}

// Photo gallery with lightbox
function initGallery() {
  const grid = document.getElementById('galleryGrid');
  const lightbox = document.getElementById('galleryLightbox');
  if (!grid || !lightbox) return;

  const items = Array.from(grid.querySelectorAll('.gallery-item'));
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxCaption = document.getElementById('lightboxCaption');
  let currentIndex = 0;

  function openLightbox(index) {
    currentIndex = index;
    const item = items[index];
    const img = item.querySelector('img');
    const captionKey = img ? img.getAttribute('data-caption-key') : '';
    lightboxImg.src = img ? img.src : '';
    lightboxImg.alt = img ? img.alt : '';
    lightboxCaption.textContent = captionKey ? t(captionKey) : '';
    lightbox.removeAttribute('hidden');
    document.body.style.overflow = 'hidden';
    const closeBtn = document.getElementById('lightboxClose');
    if (closeBtn) closeBtn.focus();
  }

  function closeLightbox() {
    lightbox.setAttribute('hidden', '');
    document.body.style.overflow = '';
  }

  function navigate(dir) {
    currentIndex = (currentIndex + dir + items.length) % items.length;
    openLightbox(currentIndex);
  }

  items.forEach((item, i) => {
    item.setAttribute('tabindex', '0');
    item.setAttribute('role', 'button');
    item.addEventListener('click', () => openLightbox(i));
    item.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openLightbox(i); }
    });
  });

  const closeBtn = document.getElementById('lightboxClose');
  const prevBtn = document.getElementById('lightboxPrev');
  const nextBtn = document.getElementById('lightboxNext');

  if (closeBtn) closeBtn.addEventListener('click', closeLightbox);
  if (prevBtn) prevBtn.addEventListener('click', () => navigate(-1));
  if (nextBtn) nextBtn.addEventListener('click', () => navigate(1));

  lightbox.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') navigate(-1);
    if (e.key === 'ArrowRight') navigate(1);
  });

  lightbox.addEventListener('click', e => {
    if (e.target === lightbox) closeLightbox();
  });
}

// Expose key functions on window for debugging and testing
if (typeof window !== 'undefined') {
  window.setLang = setLang;
  window.t = t;
  window.applyTranslations = applyTranslations;
}

// Init everything
function bootMartenastate() {
  applyTranslations();
  initGuestPersonalization();
  initNav();
  initTabs();
  initScrollAnimations();
  initNavbarScroll();
  initMap();
  renderRouteLists();
  initBackToTop();
  initCopyable();
  initTodayWidget();
  initBloomCalendar();
  initWeatherWidget();
  initGallery();
  initShare();
  initSmoothAnchors();

  // Language buttons
  document.querySelectorAll('.lang-toggle button').forEach(btn => {
    btn.addEventListener('click', () => setLang(btn.getAttribute('data-lang')));
  });
}

// If DOMContentLoaded already fired (script loaded late), boot immediately
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', bootMartenastate);
} else {
  bootMartenastate();
}

// Render route lists on the map page
function renderRouteLists() {
  const walkContainer = document.getElementById('walking-route-list');
  const bikeContainer = document.getElementById('cycling-route-list');
  if (!walkContainer && !bikeContainer) return;
  if (typeof walkingRoutes === 'undefined') return;

  function routeCard(route, kind) {
    const lang = currentLang;
    const name = lang === 'en' ? route.name_en : route.name_nl;
    const desc = lang === 'en' ? route.desc_en : route.desc_nl;
    const dur = lang === 'en' ? route.duration_en : route.duration_nl;
    const diff = lang === 'en' ? route.difficulty_en : route.difficulty_nl;
    const btnLabel = lang === 'en' ? 'Open route' : 'Open route';
    const mapLabel = lang === 'en' ? 'Show on map' : 'Toon op kaart';
    const icon = kind === 'walking' ? '🚶' : '🚴';
    const color = kind === 'walking' ? '#8ba888' : '#5a7055';

    return `
      <article class="route-card" data-route-id="${route.id}" data-route-kind="${kind}">
        <div class="route-card-header" style="border-left: 4px solid ${color};">
          <span class="route-icon">${icon}</span>
          <div>
            <h4>${name}</h4>
            <div class="route-meta">
              <span class="meta-chip">${route.distance}</span>
              <span class="meta-chip">${dur}</span>
              <span class="meta-chip">${diff}</span>
            </div>
          </div>
        </div>
        <p class="route-desc">${desc}</p>
        <div class="route-actions">
          <button class="btn-route-focus" data-route-id="${route.id}" data-route-kind="${kind}">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="14" height="14" aria-hidden="true"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="3"/></svg>
            ${mapLabel}
          </button>
          <a href="${route.externalUrl}" target="_blank" rel="noopener" class="btn-route-open">
            ${btnLabel}
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="14" height="14" aria-hidden="true"><path d="M7 17L17 7M7 7h10v10"/></svg>
          </a>
        </div>
      </article>
    `;
  }

  if (walkContainer) {
    walkContainer.innerHTML = walkingRoutes.map(r => routeCard(r, 'walking')).join('');
  }
  if (bikeContainer) {
    bikeContainer.innerHTML = cyclingRoutes.map(r => routeCard(r, 'cycling')).join('');
  }

  // Hook up "show on map" buttons - scroll to map and open popup
  document.querySelectorAll('.btn-route-focus').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-route-id');
      const kind = btn.getAttribute('data-route-kind');
      const map = window._martenaMap;
      const layers = window._martenaRouteLayers;
      if (!map || !layers) return;
      const match = layers[kind].find(l => l.id === id);
      if (match) {
        // Scroll map into view
        document.getElementById('map').scrollIntoView({ behavior: 'smooth', block: 'center' });
        // Fit bounds to route
        const routeData = (kind === 'walking' ? walkingRoutes : cyclingRoutes).find(r => r.id === id);
        if (routeData) {
          setTimeout(() => {
            map.fitBounds(routeData.coords, { padding: [40, 40] });
            match.line.openPopup();
          }, 400);
        }
      }
    });
  });
}

// Back to top button
function initBackToTop() {
  const btn = document.getElementById('backToTop');
  if (!btn) return;
  window.addEventListener('scroll', () => {
    btn.classList.toggle('visible', window.scrollY > 400);
  }, { passive: true });
  btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}

// Toast notification
let toastTimeout = null;
function showToast(message) {
  const toast = document.getElementById('toast');
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => toast.classList.remove('show'), 2000);
}

// Copy-to-clipboard for items with [data-copy]
function initCopyable() {
  document.querySelectorAll('[data-copy]').forEach(el => {
    el.addEventListener('click', async (e) => {
      const value = el.getAttribute('data-copy');
      if (!value) return;
      try {
        await navigator.clipboard.writeText(value);
        el.classList.add('copied');
        showToast(t('toast.copied'));
        setTimeout(() => el.classList.remove('copied'), 2000);
      } catch (err) {
        const ta = document.createElement('textarea');
        ta.value = value;
        ta.style.position = 'fixed';
        ta.style.opacity = '0';
        document.body.appendChild(ta);
        ta.select();
        try { document.execCommand('copy'); showToast(t('toast.copied')); } catch (e2) {}
        document.body.removeChild(ta);
      }
    });
  });
}

// Today widget — shows current season + real-time opening hours + weather-aware tip
function initTodayWidget() {
  const widget = document.getElementById('todayWidget');
  if (!widget) return;

  const now = new Date();
  const month = now.getMonth() + 1;
  const day = now.getDate();
  const dayOfWeek = now.getDay();           // 0 = sun, 6 = sat
  const currentMinutes = now.getHours() * 60 + now.getMinutes();

  // Date label
  const dateEl = document.getElementById('todayDate');
  if (dateEl) {
    try {
      dateEl.textContent = now.toLocaleDateString(currentLang === 'nl' ? 'nl-NL' : 'en-GB', {
        weekday: 'long', day: 'numeric', month: 'long'
      });
    } catch (e) {
      dateEl.textContent = now.toDateString();
    }
  }

  // Season
  let seasonKey;
  if (month === 12 || month <= 2) seasonKey = 'winter';
  else if (month >= 3 && month <= 5) seasonKey = 'spring';
  else if (month >= 6 && month <= 8) seasonKey = 'summer';
  else seasonKey = 'autumn';

  const seasonTitleEl = document.getElementById('todaySeasonTitle');
  const seasonTextEl = document.getElementById('todaySeasonText');
  if (seasonTitleEl) {
    seasonTitleEl.setAttribute('data-i18n', `today.season.${seasonKey}`);
    seasonTitleEl.textContent = t(`today.season.${seasonKey}`);
  }
  if (seasonTextEl) {
    seasonTextEl.setAttribute('data-i18n', `today.season.${seasonKey}.text`);
    seasonTextEl.textContent = t(`today.season.${seasonKey}.text`);
  }

  // Túnmanswente — real-time hour-precise status
  // Schedule: Fri 13–17, Sat/Sun 11–17, season 27 Mar – 25 Oct
  const tunmanswenteEl = document.getElementById('statusTunmanswente');
  const tunmanHoursEl = document.getElementById('tunmanswenteHours');
  if (tunmanswenteEl && tunmanHoursEl) {
    const inSeason = (month > 3 || (month === 3 && day >= 27)) && (month < 10 || (month === 10 && day <= 25));

    function tunmanScheduleForDay(dow) {
      if (dow === 5) return { open: 13 * 60, close: 17 * 60 };
      if (dow === 6 || dow === 0) return { open: 11 * 60, close: 17 * 60 };
      return null;
    }

    function fmtTime(totalMinutes) {
      return `${String(Math.floor(totalMinutes / 60)).padStart(2, '0')}:00`;
    }

    let isOpen = false;
    let detailText = '';

    if (!inSeason) {
      detailText = t('today.tunman.closed.season');
    } else {
      const todaySchedule = tunmanScheduleForDay(dayOfWeek);

      if (todaySchedule && currentMinutes >= todaySchedule.open && currentMinutes < todaySchedule.close) {
        // Currently open
        detailText = t('today.tunman.now.open').replace('{time}', fmtTime(todaySchedule.close));
        isOpen = true;
      } else if (todaySchedule && currentMinutes < todaySchedule.open) {
        const minsUntil = todaySchedule.open - currentMinutes;
        if (minsUntil <= 120) {
          detailText = t('today.tunman.opens.soon').replace('{min}', minsUntil);
        } else {
          detailText = t('today.tunman.opens.at').replace('{time}', fmtTime(todaySchedule.open));
        }
      } else {
        // Find next opening day (within next 7 days)
        let found = null;
        for (let i = 1; i <= 7; i++) {
          const nextDow = (dayOfWeek + i) % 7;
          const sched = tunmanScheduleForDay(nextDow);
          if (sched) {
            const nextDate = new Date(now);
            nextDate.setDate(nextDate.getDate() + i);
            const locale = currentLang === 'nl' ? 'nl-NL' : 'en-GB';
            const dayName = nextDate.toLocaleDateString(locale, { weekday: 'long' });
            found = t('today.tunman.next').replace('{day}', dayName).replace('{time}', fmtTime(sched.open));
            break;
          }
        }
        detailText = found || t('today.tunman.closed.weekday');
      }
    }

    tunmanHoursEl.textContent = detailText;
    tunmanswenteEl.classList.toggle('closed', !isOpen);
  }

  // Camping status — 1 Apr – 1 Oct
  const campingEl = document.getElementById('statusCamping');
  const campingStatusEl = document.getElementById('campingStatus');
  if (campingEl && campingStatusEl) {
    const inSeason = month >= 4 && month <= 9;
    const isOpen = inSeason || (month === 10 && day === 1);
    campingStatusEl.textContent = isOpen ? t('today.camping.open') : t('today.camping.closed');
    campingEl.classList.toggle('closed', !isOpen);
  }

  // Weather-aware daily tip — uses live weather cache when available
  const tipEl = document.getElementById('todayTip');
  if (tipEl) {
    const days = ['sunday','monday','tuesday','wednesday','thursday','friday','saturday'];
    let tipKey = `today.tip.${days[dayOfWeek]}`;

    try {
      const raw = window.sessionStorage.getItem(WEATHER_CACHE_KEY);
      if (raw) {
        const cached = JSON.parse(raw);
        if (Date.now() - cached.ts < WEATHER_CACHE_TTL) {
          const code = cached.data.current.weathercode;
          const temp = Math.round(cached.data.current.temperature_2m);
          if (code >= 51 && code <= 82) {
            tipKey = 'today.tip.rain';
          } else if ((code === 0 || code === 1) && temp >= 18) {
            tipKey = 'today.tip.sunny';
          }
        }
      }
    } catch (e) { /* sessionStorage unavailable or malformed */ }

    tipEl.setAttribute('data-i18n', tipKey);
    tipEl.textContent = t(tipKey);
  }
}

// Stinzenflora bloom calendar — only shown Feb–May, current month highlighted
function initBloomCalendar() {
  const cal = document.getElementById('bloomCalendar');
  const grid = document.getElementById('bloomGrid');
  if (!cal || !grid) return;

  const month = new Date().getMonth() + 1; // 1–12

  if (month < 2 || month > 5) {
    cal.setAttribute('hidden', '');
    return;
  }
  cal.removeAttribute('hidden');

  const MONTHS = [2, 3, 4, 5];
  const MONTH_KEYS = ['bloom.month.feb', 'bloom.month.mar', 'bloom.month.apr', 'bloom.month.may'];

  const blooms = [
    { key: 'bloom.snowdrop',      from: 2, to: 3, color: '#c9b8d4' },
    { key: 'bloom.winteraconite', from: 2, to: 3, color: '#d4a843' },
    { key: 'bloom.crocus',        from: 3, to: 3, color: '#7b5d8c' },
    { key: 'bloom.scilla',        from: 3, to: 4, color: '#5a7aad' },
    { key: 'bloom.vinca',         from: 3, to: 5, color: '#8ba888' },
    { key: 'bloom.daffodil',      from: 4, to: 4, color: '#e6c569' },
    { key: 'bloom.anemone',       from: 4, to: 5, color: '#a890b8' },
  ];

  grid.innerHTML = '';

  // Header row with month labels
  const headerRow = document.createElement('div');
  headerRow.className = 'bloom-header-row';
  headerRow.innerHTML = '<div class="bloom-name-col"></div>' +
    MONTHS.map((m, i) =>
      `<div class="bloom-month-col${m === month ? ' bloom-current-month' : ''}">${t(MONTH_KEYS[i])}</div>`
    ).join('');
  grid.appendChild(headerRow);

  // One row per flower
  blooms.forEach(bloom => {
    const row = document.createElement('div');
    row.className = 'bloom-row';
    const inBloom = month >= bloom.from && month <= bloom.to;
    const badge = inBloom ? ` <span class="bloom-now-badge">${t('bloom.now')}</span>` : '';
    let html = `<div class="bloom-name-col">${t(bloom.key)}${badge}</div>`;
    MONTHS.forEach(m => {
      const active = m >= bloom.from && m <= bloom.to;
      const current = active && m === month;
      html += `<div class="bloom-month-col"><div class="bloom-bar${active ? ' bloom-bar-active' : ''}${current ? ' bloom-bar-current' : ''}" style="${active ? `background:${bloom.color}` : ''}"></div></div>`;
    });
    row.innerHTML = html;
    grid.appendChild(row);
  });
}

// Share button — uses Web Share API on mobile, falls back to clipboard
function initShare() {
  const btns = document.querySelectorAll('[data-share]');
  if (!btns.length) return;
  btns.forEach(btn => {
    btn.addEventListener('click', async (e) => {
      e.preventDefault();
      const url = btn.getAttribute('data-share-url') || window.location.href;
      const title = btn.getAttribute('data-share-title') || document.title;
      const text = btn.getAttribute('data-share-text') || '';
      if (navigator.share) {
        try { await navigator.share({ title, text, url }); } catch (e) { /* user cancelled */ }
      } else {
        try {
          await navigator.clipboard.writeText(url);
          showToast(t('toast.copied'));
        } catch (e) { /* ignore */ }
      }
    });
  });
}

// Smooth-scroll for in-page anchor links (with header offset)
function initSmoothAnchors() {
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    const href = link.getAttribute('href');
    if (href === '#' || href.length < 2) return;
    link.addEventListener('click', (e) => {
      const target = document.querySelector(href);
      if (!target) return;
      e.preventDefault();
      const navHeight = 80;
      const top = target.getBoundingClientRect().top + window.pageYOffset - navHeight;
      window.scrollTo({ top, behavior: 'smooth' });
      // Update URL without scroll
      history.pushState(null, '', href);
    });
  });
}
