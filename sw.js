/**
 * LocalFind - Service Worker
 * PWA offline support with network-first caching
 * 
 * Strategy:
 * - Network First: Always try to fetch latest data when online
 * - Cache Fallback: Serve cached version when offline
 * - No manual cache clearing needed: Updates happen automatically
 * 
 * @version 4.3.5
 * @updated 2026-04-15
 */

const CACHE_VERSION = 'localfind-v4.3.5';
const BUILD_NUMBER = '20260415a'; // YYYYMMDD format
const STATIC_CACHE = `${CACHE_VERSION}-static`;
const DYNAMIC_CACHE = `${CACHE_VERSION}-dynamic`;
const IMAGE_CACHE = `${CACHE_VERSION}-images`;

// Base path - automatically detect from service worker location
// For GitHub Pages: '/LocalFind'
// For custom domain: ''
const BASE_PATH = self.location.pathname.substring(0, self.location.pathname.lastIndexOf('/'));
const EFFECTIVE_BASE_PATH = BASE_PATH || '';

// Assets to pre-cache on install (offline fallback)
const STATIC_ASSETS = [
  `${EFFECTIVE_BASE_PATH}/`,
  `${EFFECTIVE_BASE_PATH}/index.html`,
  `${EFFECTIVE_BASE_PATH}/directory.html`,
  `${EFFECTIVE_BASE_PATH}/categories.html`,
  `${EFFECTIVE_BASE_PATH}/business-detail.html`,
  `${EFFECTIVE_BASE_PATH}/donation.html`,
  `${EFFECTIVE_BASE_PATH}/about.html`,
  `${EFFECTIVE_BASE_PATH}/map.html`,
  `${EFFECTIVE_BASE_PATH}/offline.html`,
  `${EFFECTIVE_BASE_PATH}/404.html`,
  `${EFFECTIVE_BASE_PATH}/500.html`,
  `${EFFECTIVE_BASE_PATH}/css/style.css`,
  `${EFFECTIVE_BASE_PATH}/css/navbar.css`,
  `${EFFECTIVE_BASE_PATH}/css/hero.css`,
  `${EFFECTIVE_BASE_PATH}/css/cards.css`,
  `${EFFECTIVE_BASE_PATH}/css/categories.css`,
  `${EFFECTIVE_BASE_PATH}/css/filters.css`,

  `${EFFECTIVE_BASE_PATH}/css/footer.css`,
  `${EFFECTIVE_BASE_PATH}/css/business-detail.css`,
  `${EFFECTIVE_BASE_PATH}/css/utilities.css`,
  `${EFFECTIVE_BASE_PATH}/js/config.js`,
  `${EFFECTIVE_BASE_PATH}/js/data.js`,
  `${EFFECTIVE_BASE_PATH}/js/main.js`,
  `${EFFECTIVE_BASE_PATH}/js/directory.js`,
  `${EFFECTIVE_BASE_PATH}/js/counter.js`,
  `${EFFECTIVE_BASE_PATH}/js/business-detail.js`,
  `${EFFECTIVE_BASE_PATH}/js/donation.js`,
  `${EFFECTIVE_BASE_PATH}/js/animations.js`,
  `${EFFECTIVE_BASE_PATH}/js/map-main.js`,
  `${EFFECTIVE_BASE_PATH}/js/pwa.js`,
  `${EFFECTIVE_BASE_PATH}/assets/images/mainlogo.svg`,
  `${EFFECTIVE_BASE_PATH}/assets/images/og-image.svg`,
  `${EFFECTIVE_BASE_PATH}/privacy-policy.html`,
  `${EFFECTIVE_BASE_PATH}/manifest.json`
];

// Install event - pre-cache static assets for offline fallback
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(STATIC_CACHE)
      .then((cache) => {
        return cache.addAll(STATIC_ASSETS);
      })
      .then(() => {
        return self.skipWaiting();
      })
  );
});

// Activate event - clean up only OLD version caches
self.addEventListener('activate', (event) => {
  const currentCaches = [STATIC_CACHE, DYNAMIC_CACHE, IMAGE_CACHE];
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames
            .filter((cacheName) => !currentCaches.includes(cacheName))
            .map((cacheName) => caches.delete(cacheName))
        );
      })
      .then(() => {
        // Take control of all pages immediately
        return self.clients.claim();
      })
  );
});

// Fetch event - NETWORK FIRST for all same-origin requests
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip cross-origin requests (CDN fonts, icons, etc.)
  if (url.origin !== location.origin) {
    return;
  }

  // Skip requests outside our base path
  if (EFFECTIVE_BASE_PATH && !url.pathname.startsWith(EFFECTIVE_BASE_PATH)) {
    return;
  }

  // Images: stale-while-revalidate (fast load + background update)
  if (request.destination === 'image') {
    event.respondWith(handleImageRequest(request));
    return;
  }

  // Everything else: NETWORK FIRST, cache fallback for offline
  if (request.method === 'GET') {
    event.respondWith(handleNetworkFirst(request));
  }
});

/**
 * Network-First strategy for all GET requests (HTML, CSS, JS, etc.)
 * Online → always fetch latest from network, update cache
 * Offline → serve from cache
 */
async function handleNetworkFirst(request) {
  const url = new URL(request.url);

  try {
    const networkResponse = await fetch(request);

    // Cache successful responses (2xx status codes)
    if (networkResponse && networkResponse.ok) {
      const cache = await caches.open(DYNAMIC_CACHE);
      cache.put(request, networkResponse.clone());
    }

    return networkResponse;
  } catch (error) {
    // Offline: try dynamic cache first, then static cache
    const dynamicCached = await caches.match(request);
    if (dynamicCached) {
      return dynamicCached;
    }

    // For HTML navigation requests, show offline page
    if (request.mode === 'navigate' || url.pathname.endsWith('.html')) {
      const offlinePage = await caches.match(`${EFFECTIVE_BASE_PATH}/offline.html`);
      if (offlinePage) {
        return offlinePage;
      }
    }

    return new Response('Network error', {
      status: 408,
      headers: { 'Content-Type': 'text/plain' }
    });
  }
}

/**
 * Stale-While-Revalidate for images
 * Serve cached image immediately, then update cache in background
 */
async function handleImageRequest(request) {
  const cachedImage = await caches.match(request);

  // Fetch in background to update the cache
  const fetchPromise = fetch(request)
    .then((networkResponse) => {
      if (networkResponse && networkResponse.status === 200) {
        caches.open(IMAGE_CACHE).then((c) => {
          c.put(request, networkResponse.clone());
        });
      }
      return networkResponse;
    })
    .catch(() => null);

  // Return cached image immediately if available, otherwise wait for network
  if (cachedImage) {
    return cachedImage;
  }

  const networkResponse = await fetchPromise;
  if (networkResponse) {
    return networkResponse;
  }

  // Fallback to logo only if not requesting the logo itself
  if (!request.url.includes('mainlogo.svg')) {
    const fallback = await caches.match(`${EFFECTIVE_BASE_PATH}/assets/images/mainlogo.svg`);
    if (fallback) {
      return fallback;
    }
  }

  return new Response('Image not available', {
    status: 404,
    headers: { 'Content-Type': 'text/plain' }
  });
}



// Push notification support
self.addEventListener('push', (event) => {
  const options = {
    body: event.data ? event.data.text() : 'New update available',
    icon: `${EFFECTIVE_BASE_PATH}/assets/images/mainlogo.svg`,
    badge: `${EFFECTIVE_BASE_PATH}/assets/images/mainlogo.svg`,
    vibrate: [200, 100, 200],
    tag: 'localfind-notification',
    requireInteraction: false,
    actions: [
      {
        action: 'open',
        title: 'Open App'
      },
      {
        action: 'close',
        title: 'Close'
      }
    ]
  };

  event.waitUntil(
    self.registration.showNotification('LocalFind', options)
  );
});

// Notification click handler
self.addEventListener('notificationclick', (event) => {
  event.notification.close();

  if (event.action === 'open') {
    event.waitUntil(
      clients.openWindow(EFFECTIVE_BASE_PATH + '/')
    );
  }
});

// Message handler for communication with main thread
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    // Skip waiting and activate immediately
    self.skipWaiting();
  }

  if (event.data && event.data.type === 'CACHE_URLS') {
    event.waitUntil(
      caches.open(DYNAMIC_CACHE)
        .then((cache) => {
          return cache.addAll(event.data.urls);
        })
    );
  }

  if (event.data && event.data.type === 'CLEAR_ALL_CACHES') {
    event.waitUntil(
      caches.keys().then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            return caches.delete(cacheName);
          })
        );
      })
    );
  }
});
