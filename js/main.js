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
    const panels = document.querySelectorAll('.tab-panel');

    buttons.forEach(btn => {
      btn.addEventListener('click', () => {
        const target = btn.getAttribute('data-tab');

        buttons.forEach(b => b.classList.remove('active'));
        panels.forEach(p => p.classList.remove('active'));

        btn.classList.add('active');
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
    center: [53.2010, 5.7760],
    zoom: 13,
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
    { lat: 53.2010, lng: 5.7760, type: 'martenastate', nl: 'Martenastate', en: 'Martenastate', desc_nl: 'Historisch landgoed — vrij toegankelijk van zonsopgang tot zonsondergang.', desc_en: 'Historic estate — freely accessible from sunrise to sunset.' },
    { lat: 53.2002, lng: 5.7748, type: 'martenastate', nl: 'Túnmanswente', en: 'Túnmanswente', desc_nl: 'Theeschenkerij & B&B. Knooppunt 10. Open vr 13-17u, za/zo 11-17u.', desc_en: 'Tea garden & B&B. Node 10. Open Fri 13-17h, Sat/Sun 11-17h.' },
    { lat: 53.2001, lng: 5.7755, type: 'eten', nl: 'Túnmanswente (koffie & lunch)', en: 'Túnmanswente (coffee & lunch)', desc_nl: 'Koffie, thee en lunch in een historische setting.', desc_en: 'Coffee, tea and lunch in a historic setting.' },
    { lat: 53.2012, lng: 5.7762, type: 'wandelen', nl: 'Start wandeling park', en: 'Park walk start', desc_nl: 'Toegang tot de wandelpaden van Martenastate.', desc_en: 'Access to the walking paths of Martenastate.' },
    { lat: 53.2010, lng: 5.7755, type: 'fietsen', nl: 'Fietsknooppunt 10', en: 'Cycling node 10', desc_nl: 'Startpunt voor het fietsknooppuntennetwerk.', desc_en: 'Starting point for the cycling node network.' },
    { lat: 53.2009, lng: 5.7750, type: 'wandelen', nl: 'Jabikspaad stempelpunt', en: 'Jabikspaad stamp point', desc_nl: 'Pelgrimsroute naar Santiago de Compostella — stempel bij Túnmanswente.', desc_en: 'Pilgrimage route to Santiago de Compostella — stamp at Túnmanswente.' },
    { lat: 53.2015, lng: 5.7914, type: 'bezienswaardigheid', nl: 'Leeuwarden centrum', en: 'Leeuwarden city centre', desc_nl: 'Hoofdstad van Friesland. Fries Museum, Oldehove, Mata Hari.', desc_en: 'Capital of Friesland. Fries Museum, Oldehove, Mata Hari.' },
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
