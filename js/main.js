// Language state
let currentLang = localStorage.getItem('lang') || 'nl';

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
  localStorage.setItem('lang', lang);
  applyTranslations();
  // Refresh dynamic content that depends on language
  if (typeof initTodayWidget === 'function') initTodayWidget();
  if (typeof renderRouteLists === 'function') renderRouteLists();
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
    shop:      { color: '#a890b8', emoji: '🛒' },
    sight:     { color: '#7a9e7e', emoji: '⭐' },
    transport: { color: '#5a7055', emoji: '🅿️' },
  };

  const iconCache = {};
  function getIcon(cat) {
    if (!iconCache[cat]) {
      const cfg = categoryConfig[cat] || { color: '#888', emoji: '📍' };
      iconCache[cat] = makeIcon(cfg.color, cfg.emoji, cfg.pulse);
    }
    return iconCache[cat];
  }

  // Route polylines
  const routeLayers = { walking: [], cycling: [] };

  function buildRoutePopup(route, kind) {
    const name = currentLang === 'en' ? route.name_en : route.name_nl;
    const desc = currentLang === 'en' ? route.desc_en : route.desc_nl;
    const dur = currentLang === 'en' ? route.duration_en : route.duration_nl;
    const diff = currentLang === 'en' ? route.difficulty_en : route.difficulty_nl;
    const catLabel = kind === 'walking' ? t('kaart.filter.wandelen') : t('kaart.filter.fietsen');
    const chip = (txt) => `<span style="background:#e8dff0;color:#7b5d8c;padding:.15rem .5rem;border-radius:999px;font-size:.7rem;font-weight:600;">${txt}</span>`;
    return `
      <span class="popup-category">${catLabel}</span>
      <h4>${name}</h4>
      <div style="display:flex;gap:.4rem;flex-wrap:wrap;margin:.35rem 0;">${chip(route.distance)}${chip(dur)}${chip(diff)}</div>
      <p style="margin:.35rem 0;font-size:.85rem;color:#5a4d5f;line-height:1.5;">${desc}</p>
      <a href="${route.externalUrl}" target="_blank" rel="noopener" style="display:inline-flex;align-items:center;gap:.35rem;margin-top:.4rem;color:#7b5d8c;font-weight:600;font-size:.85rem;text-decoration:none;">Open route →</a>
    `;
  }

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
      routeLayers[kind].push({ line, hitLine, id: route.id });
    });
  }

  if (typeof walkingRoutes !== 'undefined') drawRoutes(walkingRoutes, 'walking', '#8ba888');
  if (typeof cyclingRoutes !== 'undefined') drawRoutes(cyclingRoutes, 'cycling', '#5a7055');
  window._martenaRouteLayers = routeLayers;

  // Place markers from places.js
  const placeMarkers = [];
  if (typeof mapPlaces !== 'undefined') {
    mapPlaces.forEach(place => {
      const name = currentLang === 'en' ? place.name_en : place.name_nl;
      const desc = currentLang === 'en' ? place.desc_en : place.desc_nl;
      const addr = currentLang === 'en' ? (place.addr_en || '') : (place.addr_nl || '');
      const badge = place.badge_nl ? (currentLang === 'en' ? place.badge_en : place.badge_nl) : '';

      const badgeHtml = badge ? `<span style="background:#e8dff0;color:#7b5d8c;padding:.15rem .5rem;border-radius:999px;font-size:.7rem;font-weight:600;margin-bottom:.4rem;display:inline-block;">${badge}</span> ` : '';
      const addrHtml = addr ? `<div style="font-size:.78rem;color:#8a7d8f;margin-top:.3rem;">${addr}</div>` : '';
      const linkHtml = place.externalUrl ? `<a href="${place.externalUrl}" target="_blank" rel="noopener" style="display:inline-flex;align-items:center;gap:.35rem;margin-top:.5rem;color:#7b5d8c;font-weight:600;font-size:.8rem;text-decoration:none;">${currentLang === 'en' ? 'Open in Maps →' : 'Open in Maps →'}</a>` : '';

      const catFilter = currentLang === 'en' ? t(`kaart.filter.${place.category}`) : t(`kaart.filter.${place.category}`);
      const popupHtml = `<span class="popup-category">${catFilter}</span><h4>${name}</h4>${badgeHtml}<p style="margin:.3rem 0;font-size:.85rem;color:#5a4d5f;line-height:1.5;">${desc}</p>${addrHtml}${linkHtml}`;

      const marker = L.marker(place.coord, { icon: getIcon(place.category) })
        .addTo(map)
        .bindPopup(popupHtml, { maxWidth: 300 });
      placeMarkers.push({ marker, category: place.category, id: place.id });
    });
  }

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

// Init everything
document.addEventListener('DOMContentLoaded', () => {
  applyTranslations();
  initNav();
  initTabs();
  initScrollAnimations();
  initNavbarScroll();
  initMap();
  renderRouteLists();
  initBackToTop();
  initCopyable();
  initTodayWidget();

  // Language buttons
  document.querySelectorAll('.lang-toggle button').forEach(btn => {
    btn.addEventListener('click', () => setLang(btn.getAttribute('data-lang')));
  });
});

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

// Today widget — shows current season + opening hours of Túnmanswente + camping
function initTodayWidget() {
  const widget = document.getElementById('todayWidget');
  if (!widget) return;

  const now = new Date();
  const month = now.getMonth() + 1;       // 1–12
  const day = now.getDate();               // 1–31
  const dayOfWeek = now.getDay();          // 0 = sun, 6 = sat

  // Date label, localised per language
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

  // Determine season
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

  // Túnmanswente status — open Fri 13–17, Sat/Sun 11–17, season 27 Mar – 25 Oct
  const tunmanswenteEl = document.getElementById('statusTunmanswente');
  const tunmanHoursEl = document.getElementById('tunmanswenteHours');
  if (tunmanswenteEl && tunmanHoursEl) {
    const inSeason = (month > 3 || (month === 3 && day >= 27)) && (month < 10 || (month === 10 && day <= 25));
    let isOpen = false;
    let detailText = '';
    if (!inSeason) {
      detailText = t('today.tunman.closed.season');
      isOpen = false;
    } else if (dayOfWeek === 5) { // Friday
      detailText = t('today.tunman.open').replace('{hours}', '13:00 – 17:00');
      isOpen = true;
    } else if (dayOfWeek === 6 || dayOfWeek === 0) { // Sat / Sun
      detailText = t('today.tunman.open').replace('{hours}', '11:00 – 17:00');
      isOpen = true;
    } else {
      detailText = t('today.tunman.closed.weekday');
      isOpen = false;
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

  // Daily tip
  const tipEl = document.getElementById('todayTip');
  if (tipEl) {
    const days = ['sunday','monday','tuesday','wednesday','thursday','friday','saturday'];
    const tipKey = `today.tip.${days[dayOfWeek]}`;
    tipEl.setAttribute('data-i18n', tipKey);
    tipEl.textContent = t(tipKey);
  }
}
