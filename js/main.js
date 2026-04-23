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

    // Eten & drinken Leeuwarden
    { lat: 53.2012, lng: 5.7988, type: 'eten',
      nl: 'Restaurants Leeuwarden', en: 'Restaurants Leeuwarden',
      desc_nl: 'Ruim aanbod van restaurants, cafés en eetcafés in de historische binnenstad.', desc_en: 'Wide range of restaurants, cafés and eateries in the historic city centre.' },

    // Dokkum
    { lat: 53.3248, lng: 6.0015, type: 'bezienswaardigheid',
      nl: 'Dokkum', en: 'Dokkum',
      desc_nl: 'Het enige volledig omwalde stadje van Nederland. Pittoresk centrum op ~30 km.', desc_en: 'The only fully moated town in the Netherlands. Picturesque centre ~30 km away.' },

    // Elfstedenpad etappe
    { lat: 53.2100, lng: 5.8050, type: 'wandelen',
      nl: 'Elfstedenpad (etappe Oenkerk–Leeuwarden)', en: 'Elfstedenpad (stage Oenkerk–Leeuwarden)',
      desc_nl: '15 km etappe van het 300 km lange Elfstedenpad langs alle Friese steden.', desc_en: '15 km stage of the 300 km Elfstedenpad through all Frisian cities.' },
  ];

  poi.forEach(p => {
    const lang = currentLang;
    const name = lang === 'en' ? p.en : p.nl;
    const desc = lang === 'en' ? p.desc_en : p.desc_nl;
    const catLabel = t(`kaart.legend.${p.type}`);

    L.marker([p.lat, p.lng], { icon: icons[p.type] })
      .addTo(map)
      .bindPopup(`<span class="popup-category">${catLabel}</span><h4>${name}</h4><p style="margin:0;font-size:.85rem;color:#5a4d5f;">${desc}</p>`);
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

  // Language buttons
  document.querySelectorAll('.lang-toggle button').forEach(btn => {
    btn.addEventListener('click', () => setLang(btn.getAttribute('data-lang')));
  });
});

// Back to top button
function initBackToTop() {
  const btn = document.getElementById('backToTop');
  if (!btn) return;
  window.addEventListener('scroll', () => {
    btn.classList.toggle('visible', window.scrollY > 400);
  }, { passive: true });
  btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}

document.addEventListener('DOMContentLoaded', () => {
  initBackToTop();
});
