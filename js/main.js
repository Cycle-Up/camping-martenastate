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

  function makeIcon(color, emoji) {
    return L.divIcon({
      html: `<div style="background:${color};width:36px;height:36px;border-radius:50% 50% 50% 0;transform:rotate(-45deg);border:3px solid white;box-shadow:0 3px 10px rgba(0,0,0,0.25);display:flex;align-items:center;justify-content:center;"><span style="transform:rotate(45deg);font-size:15px;line-height:1;">${emoji}</span></div>`,
      className: '',
      iconSize: [36, 36],
      iconAnchor: [18, 36],
      popupAnchor: [0, -40],
    });
  }

  const icons = {
    martenastate: makeIcon('#7b5d8c', '🏰'),
    wandelen:     makeIcon('#8ba888', '🚶'),
    fietsen:      makeIcon('#5a7055', '🚴'),
    eten:         makeIcon('#e6c569', '☕'),
    bezienswaardigheid: makeIcon('#a890b8', '⭐'),
  };

  const poi = [
    // Martenastate & direct omgeving
    { lat: 53.2018, lng: 5.7762, type: 'martenastate',
      nl: 'Martenastate', en: 'Martenastate',
      desc_nl: 'Historisch landgoed — vrij toegankelijk van zonsopgang tot zonsondergang. Stinzenflora-toplocatie.', desc_en: 'Historic estate — freely accessible sunrise to sunset. Top stinzenflora location.' },
    { lat: 53.2013, lng: 5.7745, type: 'martenastate',
      nl: 'Túnmanswente & B&B Stinzenflora', en: 'Túnmanswente & B&B Stinzenflora',
      desc_nl: 'Theeschenkerij, B&B, knooppunt 10 & Jabikspaad-stempel. Open vr 13-17u, za/zo 11-17u.', desc_en: 'Tea garden, B&B, node 10 & Jabikspaad stamp. Open Fri 13-17h, Sat/Sun 11-17h.' },
    { lat: 53.2023, lng: 5.7770, type: 'wandelen',
      nl: 'Start wandelpaden park', en: 'Park walking paths',
      desc_nl: 'Ingang wandelpaden Martenastate. Vrij toegankelijk.', desc_en: 'Entrance walking paths Martenastate. Freely accessible.' },
    { lat: 53.2013, lng: 5.7745, type: 'fietsen',
      nl: 'Fietsknooppunt 10', en: 'Cycling node 10',
      desc_nl: 'Startpunt knooppuntennetwerk. Stel zelf je fietsroute samen.', desc_en: 'Start of cycling node network. Plan your own route.' },

    // Leeuwarden
    { lat: 53.2014, lng: 5.7995, type: 'bezienswaardigheid',
      nl: 'Leeuwarden centrum', en: 'Leeuwarden city centre',
      desc_nl: 'Hoofdstad van Friesland, op ~5 km. Oldehove, historische grachten en levendige binnenstad.', desc_en: 'Capital of Friesland, ~5 km away. Oldehove, historic canals and vibrant city centre.' },
    { lat: 53.2003, lng: 5.7956, type: 'bezienswaardigheid',
      nl: 'Fries Museum', en: 'Fries Museum',
      desc_nl: 'Het belangrijkste museum van Friesland — kunst, geschiedenis en Mata Hari.', desc_en: 'Friesland\'s leading museum — art, history and Mata Hari.' },
    { lat: 53.2030, lng: 5.7870, type: 'bezienswaardigheid',
      nl: 'Oldehove toren', en: 'Oldehove tower',
      desc_nl: 'Scheefste toren van Nederland — schever dan de toren van Pisa.', desc_en: 'The most leaning tower in the Netherlands — more tilted than the Leaning Tower of Pisa.' },

    // Eten & drinken
    { lat: 53.2012, lng: 5.7988, type: 'eten',
      nl: 'Restaurants Leeuwarden centrum', en: 'Restaurants Leeuwarden centre',
      desc_nl: 'Ruim aanbod van restaurants, cafés en eetcafés in de historische binnenstad.', desc_en: 'Wide range of restaurants, cafés and eateries in the historic city centre.' },
    { lat: 53.2013, lng: 5.7745, type: 'eten',
      nl: 'Túnmanswente theeschenkerij', en: 'Túnmanswente tea garden',
      desc_nl: 'Koffie, thee en lunch in historische setting. Open vr 13-17u, za/zo 11-17u.', desc_en: 'Coffee, tea and lunch in historic setting. Open Fri 13-17h, Sat/Sun 11-17h.' },

    // Dokkum
    { lat: 53.3248, lng: 6.0015, type: 'bezienswaardigheid',
      nl: 'Dokkum', en: 'Dokkum',
      desc_nl: 'Het enige volledig omwalde stadje van Nederland. Pittoresk centrum op ~30 km.', desc_en: 'The only fully moated town in the Netherlands. Picturesque centre ~30 km away.' },

    // Franeker Planetarium
    { lat: 53.1867, lng: 5.5436, type: 'bezienswaardigheid',
      nl: 'Planetarium Franeker', en: 'Planetarium Franeker',
      desc_nl: 'Het oudste nog werkende planetarium ter wereld (1781). UNESCO Werelderfgoed.', desc_en: 'The world\'s oldest still-operating planetarium (1781). UNESCO World Heritage.' },

    // Harlingen / Waddenzee
    { lat: 53.1743, lng: 5.4214, type: 'bezienswaardigheid',
      nl: 'Harlingen & Waddenzee', en: 'Harlingen & Wadden Sea',
      desc_nl: 'Historische havenstad aan de UNESCO Waddenzee. Vertrek voor wadlopen of boot naar eilanden.', desc_en: 'Historic harbour city on UNESCO Wadden Sea. Start for mudflat walking or ferry to islands.' },

    // Sneek
    { lat: 53.0325, lng: 5.6583, type: 'bezienswaardigheid',
      nl: 'Sneek & Friese Meren', en: 'Sneek & Frisian Lakes',
      desc_nl: 'Waterstad in hart van de Friese Merenstreek. Zeilen, varen en terrassen aan het water.', desc_en: 'Water city at heart of Frisian Lakes region. Sailing, boating and waterside terraces.' },

    // Hindeloopen
    { lat: 52.9408, lng: 5.4050, type: 'bezienswaardigheid',
      nl: 'Hindeloopen', en: 'Hindeloopen',
      desc_nl: 'Elfstedenstadje met houten huisjes, traditionele schilderkunst en klederdracht.', desc_en: 'Elfstedenstadje with wooden houses, traditional painting and traditional costume.' },

    // Alde Feanen
    { lat: 53.1030, lng: 5.9583, type: 'wandelen',
      nl: 'Nationaal Park De Alde Feanen', en: 'National Park De Alde Feanen',
      desc_nl: 'Moerassig natuurgebied vol waterlopen, rietvelden en vogels. Uniek laagveenlandschap.', desc_en: 'Marshy nature reserve with waterways, reed fields and birds. Unique peatland landscape.' },

    // Elfstedenpad etappe
    { lat: 53.2100, lng: 5.8050, type: 'wandelen',
      nl: 'Elfstedenpad (etappe Oenkerk–Leeuwarden)', en: 'Elfstedenpad (stage Oenkerk–Leeuwarden)',
      desc_nl: '15 km etappe van het 300 km lange Elfstedenpad langs alle Friese steden.', desc_en: '15 km stage of the 300 km Elfstedenpad through all Frisian cities.' },

    // Elfsteden fietsroute start
    { lat: 53.2000, lng: 5.7900, type: 'fietsen',
      nl: 'Elfsteden Fietsroute (start)', en: 'Eleven Cities Cycling Route (start)',
      desc_nl: '258 km langs alle 11 Friese steden. Start in Leeuwarden centrum.', desc_en: '258 km through all 11 Frisian cities. Starts in Leeuwarden centre.' },

    // Ferry to Ameland
    { lat: 53.3897, lng: 5.8836, type: 'bezienswaardigheid',
      nl: 'Veerpont naar Ameland (Holwerd)', en: 'Ferry to Ameland (Holwerd)',
      desc_nl: 'Veerpont vanuit Holwerd naar het waddeneiland Ameland. ~45 min vaartijd.', desc_en: 'Ferry from Holwerd to the Wadden Island Ameland. ~45 min sailing time.' },
  ];

  // Draw walking + cycling routes as polylines
  const routeLayers = { walking: [], cycling: [] };

  function buildRoutePopup(route, kind) {
    const lang = currentLang;
    const name = lang === 'en' ? route.name_en : route.name_nl;
    const desc = lang === 'en' ? route.desc_en : route.desc_nl;
    const dur = lang === 'en' ? route.duration_en : route.duration_nl;
    const diff = lang === 'en' ? route.difficulty_en : route.difficulty_nl;
    const linkLabel = lang === 'en' ? 'Open route →' : 'Open route →';
    const catLabel = kind === 'walking' ? t('kaart.legend.wandelen') : t('kaart.legend.fietsen');

    return `
      <span class="popup-category">${catLabel}</span>
      <h4>${name}</h4>
      <div style="display:flex;gap:.5rem;flex-wrap:wrap;margin:.35rem 0;">
        <span style="background:#e8dff0;color:#7b5d8c;padding:.15rem .5rem;border-radius:999px;font-size:.7rem;font-weight:600;">${route.distance}</span>
        <span style="background:#e8dff0;color:#7b5d8c;padding:.15rem .5rem;border-radius:999px;font-size:.7rem;font-weight:600;">${dur}</span>
        <span style="background:#e8dff0;color:#7b5d8c;padding:.15rem .5rem;border-radius:999px;font-size:.7rem;font-weight:600;">${diff}</span>
      </div>
      <p style="margin:.35rem 0;font-size:.85rem;color:#5a4d5f;line-height:1.5;">${desc}</p>
      <a href="${route.externalUrl}" target="_blank" rel="noopener" style="display:inline-flex;align-items:center;gap:.35rem;margin-top:.4rem;color:#7b5d8c;font-weight:600;font-size:.85rem;text-decoration:none;">${linkLabel}</a>
    `;
  }

  function drawRoutes(routes, kind, color) {
    if (typeof walkingRoutes === 'undefined') return;
    routes.forEach(route => {
      const line = L.polyline(route.coords, {
        color: color,
        weight: kind === 'walking' ? 5 : 4,
        opacity: 0.75,
        dashArray: kind === 'walking' ? '1,8' : null,
        lineCap: 'round',
        lineJoin: 'round',
        className: `route-line route-${kind}`
      }).addTo(map);

      // Bigger invisible hit area for easier clicking
      const hitLine = L.polyline(route.coords, {
        color: '#000',
        weight: 20,
        opacity: 0
      }).addTo(map);

      const popupHtml = buildRoutePopup(route, kind);
      line.bindPopup(popupHtml, { maxWidth: 300 });
      hitLine.bindPopup(popupHtml, { maxWidth: 300 });

      // Hover effect
      hitLine.on('mouseover', () => {
        line.setStyle({ weight: kind === 'walking' ? 7 : 6, opacity: 1 });
      });
      hitLine.on('mouseout', () => {
        line.setStyle({ weight: kind === 'walking' ? 5 : 4, opacity: 0.75 });
      });

      routeLayers[kind].push({ line, hitLine, id: route.id });
    });
  }

  if (typeof walkingRoutes !== 'undefined') {
    drawRoutes(walkingRoutes, 'walking', '#8ba888');
  }
  if (typeof cyclingRoutes !== 'undefined') {
    drawRoutes(cyclingRoutes, 'cycling', '#5a7055');
  }
  window._martenaRouteLayers = routeLayers;

  // Create markers with tracking for filtering
  const markers = [];
  poi.forEach(p => {
    const lang = currentLang;
    const name = lang === 'en' ? p.en : p.nl;
    const desc = lang === 'en' ? p.desc_en : p.desc_nl;
    const catLabel = t(`kaart.legend.${p.type}`);

    const marker = L.marker([p.lat, p.lng], { icon: icons[p.type] })
      .addTo(map)
      .bindPopup(`<span class="popup-category">${catLabel}</span><h4>${name}</h4><p style="margin:0;font-size:.85rem;color:#5a4d5f;">${desc}</p>`);
    markers.push({ marker, type: p.type });
  });

  // Category filter
  const activeFilters = new Set(['martenastate', 'wandelen', 'fietsen', 'eten', 'bezienswaardigheid']);

  function applyMapFilter() {
    markers.forEach(({ marker, type }) => {
      if (activeFilters.has(type)) {
        marker.addTo(map);
      } else {
        map.removeLayer(marker);
      }
    });
    // Also toggle walking/cycling polylines
    routeLayers.walking.forEach(({ line, hitLine }) => {
      if (activeFilters.has('wandelen')) {
        line.addTo(map); hitLine.addTo(map);
      } else {
        map.removeLayer(line); map.removeLayer(hitLine);
      }
    });
    routeLayers.cycling.forEach(({ line, hitLine }) => {
      if (activeFilters.has('fietsen')) {
        line.addTo(map); hitLine.addTo(map);
      } else {
        map.removeLayer(line); map.removeLayer(hitLine);
      }
    });
  }

  document.querySelectorAll('.map-filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const cat = btn.getAttribute('data-category');
      if (activeFilters.has(cat)) {
        activeFilters.delete(cat);
        btn.classList.remove('active');
      } else {
        activeFilters.add(cat);
        btn.classList.add('active');
      }
      applyMapFilter();
    });
  });
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
