/**
 * LocalFind - Service Worker
 * PWA offline support with network-first caching
 * 
 * Strategy:
 * - Network First: Always try to fetch latest data when online
 * - Cache Fallback: Serve cached version when offline
 * - No manual cache clearing needed: Updates happen automatically
 * 
 * @version 4.3.0
 * @updated 2026-03-25
 */

const CACHE_VERSION = 'localfind-v4.3.0';
const BUILD_NUMBER = '20260325a'; // YYYYMMDD format
const STATIC_CACHE = `${CACHE_VERSION}-static`;
const DYNAMIC_CACHE = `${CACHE_VERSION}-dynamic`;
const IMAGE_CACHE = `${CACHE_VERSION}-images`;

// Base path for GitHub Pages deployment
const BASE_PATH = '/LocalFind';

// Assets to pre-cache on install (offline fallback)
const STATIC_ASSETS = [
  `${BASE_PATH}/`,
  `${BASE_PATH}/index.html`,
  `${BASE_PATH}/directory.html`,
  `${BASE_PATH}/categories.html`,
  `${BASE_PATH}/business-detail.html`,
  `${BASE_PATH}/donation.html`,
  `${BASE_PATH}/about.html`,
  `${BASE_PATH}/map.html`,
  `${BASE_PATH}/offline.html`,
  `${BASE_PATH}/404.html`,
  `${BASE_PATH}/500.html`,
  `${BASE_PATH}/css/style.css`,
  `${BASE_PATH}/css/navbar.css`,
  `${BASE_PATH}/css/hero.css`,
  `${BASE_PATH}/css/cards.css`,
  `${BASE_PATH}/css/categories.css`,
  `${BASE_PATH}/css/filters.css`,
  `${BASE_PATH}/css/forms.css`,
  `${BASE_PATH}/css/footer.css`,
  `${BASE_PATH}/css/business-detail.css`,
  `${BASE_PATH}/css/utilities.css`,
  `${BASE_PATH}/js/config.js`,
  `${BASE_PATH}/js/data.js`,
  `${BASE_PATH}/js/main.js`,
  `${BASE_PATH}/js/directory.js`,
  `${BASE_PATH}/js/form.js`,
  `${BASE_PATH}/js/counter.js`,
  `${BASE_PATH}/js/business-detail.js`,
  `${BASE_PATH}/js/donation.js`,
  `${BASE_PATH}/js/utils.js`,
  `${BASE_PATH}/js/pwa.js`,
  `${BASE_PATH}/assets/images/mainlogo.svg`,
  `${BASE_PATH}/assets/images/og-image.svg`,
  `${BASE_PATH}/manifest.json`
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
  if (!url.pathname.startsWith(BASE_PATH)) {
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

    // Cache the fresh response for offline use
    if (networkResponse && networkResponse.status === 200) {
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
      const offlinePage = await caches.match(`${BASE_PATH}/offline.html`);
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
        const cache = caches.open(IMAGE_CACHE).then((c) => {
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

  // Fallback to logo
  const fallback = await caches.match(`${BASE_PATH}/assets/images/mainlogo.svg`);
  if (fallback) {
    return fallback;
  }

  return new Response('Image not available', {
    status: 404,
    headers: { 'Content-Type': 'text/plain' }
  });
}

// Background sync for offline form submissions
self.addEventListener('sync', (event) => {
  if (event.tag === 'sync-business-submissions') {
    event.waitUntil(syncBusinessSubmissions());
  }
});

/**
 * Sync business submissions when back online
 */
async function syncBusinessSubmissions() {
  try {
    // Get pending submissions from IndexedDB
    // This would be implemented with your backend API

    // Example: fetch pending submissions and POST to API
    // const submissions = await getPendingSubmissions();
    // for (const submission of submissions) {
    //   await fetch('/api/business/submit', {
    //     method: 'POST',
    //     body: JSON.stringify(submission)
    //   });
    // }
  } catch (error) {
    throw error;
  }
}

// Push notification support
self.addEventListener('push', (event) => {
  const options = {
    body: event.data ? event.data.text() : 'New update available',
    icon: `${BASE_PATH}/assets/images/mainlogo.svg`,
    badge: `${BASE_PATH}/assets/images/mainlogo.svg`,
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
      clients.openWindow(BASE_PATH + '/')
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
