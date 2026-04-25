// Service Worker — Martenastate Welkomstgids
// Caches core pages for offline access. Gasten kunnen de gids lezen
// ook zonder internetverbinding (in het park of met slecht signaal).

const CACHE_NAME = 'martenastate-v2';

const CORE_ASSETS = [
  '/',
  '/index.html',
  '/verblijf.html',
  '/omgeving.html',
  '/kaart.html',
  '/pocket.html',
  '/404.html',
  '/css/style.css',
  '/js/main.js',
  '/js/translations.js',
  '/js/routes.js',
  '/js/places.js',
  '/favicon.svg',
];

// Cache fonts from Google Fonts (cross-origin, cache separately)
const FONT_CACHE = 'martenastate-fonts-v1';

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(CORE_ASSETS))
  );
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.filter(key => key !== CACHE_NAME && key !== FONT_CACHE)
            .map(key => caches.delete(key))
      )
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', event => {
  const { request } = event;
  const url = new URL(request.url);

  // Only handle GET requests
  if (request.method !== 'GET') return;

  // Leaflet CDN and map tiles — network first, no offline fallback (map needs internet)
  if (url.hostname === 'unpkg.com' || url.hostname.includes('tile.openstreetmap')) {
    event.respondWith(fetch(request).catch(() => new Response('', { status: 503 })));
    return;
  }

  // Google Fonts — stale-while-revalidate
  if (url.hostname === 'fonts.googleapis.com' || url.hostname === 'fonts.gstatic.com') {
    event.respondWith(
      caches.open(FONT_CACHE).then(cache =>
        cache.match(request).then(cached => {
          const fetchPromise = fetch(request).then(response => {
            cache.put(request, response.clone());
            return response;
          });
          return cached || fetchPromise;
        })
      )
    );
    return;
  }

  // Core assets — cache first, then network
  event.respondWith(
    caches.match(request).then(cached => {
      if (cached) return cached;
      return fetch(request).then(response => {
        // Cache successful same-origin responses
        if (response.ok && url.origin === location.origin) {
          caches.open(CACHE_NAME).then(cache => cache.put(request, response.clone()));
        }
        return response;
      }).catch(() => {
        // Offline fallback for HTML pages
        if (request.headers.get('Accept')?.includes('text/html')) {
          return caches.match('/index.html');
        }
        return new Response('Offline', { status: 503 });
      });
    })
  );
});
