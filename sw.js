/**
 * LocalFind - Service Worker
 * PWA offline support with caching strategies
 * 
 * @version 4.0.0
 * @updated 2026-02-28
 */

const CACHE_VERSION = 'localfind-v4.0.0';
const APP_VERSION = '4.0.0';
const BUILD_NUMBER = '20260228'; // YYYYMMDD format
const STATIC_CACHE = `${CACHE_VERSION}-static`;
const DYNAMIC_CACHE = `${CACHE_VERSION}-dynamic`;
const IMAGE_CACHE = `${CACHE_VERSION}-images`;

// Base path for GitHub Pages deployment
const BASE_PATH = '/LocalFind';

// Assets to cache immediately on install
const STATIC_ASSETS = [
  `${BASE_PATH}/`,
  `${BASE_PATH}/index.html`,
  `${BASE_PATH}/directory.html`,
  `${BASE_PATH}/categories.html`,
  `${BASE_PATH}/business-detail.html`,
  `${BASE_PATH}/add-business.html`,
  `${BASE_PATH}/about.html`,
  `${BASE_PATH}/contact.html`,
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
  `${BASE_PATH}/css/animations.css`,
  `${BASE_PATH}/css/business-detail.css`,
  `${BASE_PATH}/css/utilities.css`,
  `${BASE_PATH}/js/config.js`,
  `${BASE_PATH}/js/data.js`,
  `${BASE_PATH}/js/main.js`,
  `${BASE_PATH}/js/directory.js`,
  `${BASE_PATH}/js/map.js`,
  `${BASE_PATH}/js/form.js`,
  `${BASE_PATH}/js/animations.js`,
  `${BASE_PATH}/js/counter.js`,
  `${BASE_PATH}/js/business-detail.js`,
  `${BASE_PATH}/js/utils.js`,
  `${BASE_PATH}/js/pwa.js`,
  `${BASE_PATH}/assets/images/mainlogo.svg`,
  `${BASE_PATH}/assets/images/og-image.svg`,
  `${BASE_PATH}/manifest.json`
];

// Install event - cache static assets
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

// Activate event - clean up ALL old caches completely
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        // Delete ALL caches, not just old versions
        return Promise.all(
          cacheNames.map((cacheName) => {
            return caches.delete(cacheName);
          })
        );
      })
      .then(() => {
        // Take control of all pages immediately
        return self.clients.claim();
      })
  );
});

// Fetch event - serve from cache with network fallback
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);
  
  // Skip cross-origin requests or requests outside our base path
  if (url.origin !== location.origin || !url.pathname.startsWith(BASE_PATH)) {
    return;
  }
  
  // Handle different types of requests
  if (request.destination === 'image') {
    event.respondWith(handleImageRequest(request));
  } else if (request.method === 'GET') {
    event.respondWith(handleGetRequest(request));
  }
});

/**
 * Handle GET requests with network-first strategy for HTML, cache-first for others
 */
async function handleGetRequest(request) {
  const url = new URL(request.url);
  
  // Network-first strategy for HTML files to ensure fresh content
  if (request.mode === 'navigate' || url.pathname.endsWith('.html')) {
    try {
      const networkResponse = await fetch(request);
      
      // Cache the fresh response
      if (networkResponse && networkResponse.status === 200) {
        const cache = await caches.open(DYNAMIC_CACHE);
        cache.put(request, networkResponse.clone());
      }
      
      return networkResponse;
    } catch (error) {
      // Fallback to cache
      const cachedResponse = await caches.match(request);
      if (cachedResponse) {
        return cachedResponse;
      }
      
      // Return offline page
      const offlinePage = await caches.match(`${BASE_PATH}/offline.html`);
      if (offlinePage) {
        return offlinePage;
      }
      
      return new Response('Network error', {
        status: 408,
        headers: { 'Content-Type': 'text/plain' }
      });
    }
  }
  
  // Cache-first strategy for other resources
  try {
    // Try cache first
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
      return cachedResponse;
    }
    
    // If not in cache, fetch from network
    const networkResponse = await fetch(request);
    
    // Cache successful responses
    if (networkResponse && networkResponse.status === 200) {
      const cache = await caches.open(DYNAMIC_CACHE);
      cache.put(request, networkResponse.clone());
    }
    
    return networkResponse;
  } catch (error) {
    return new Response('Network error', {
      status: 408,
      headers: { 'Content-Type': 'text/plain' }
    });
  }
}

/**
 * Handle image requests with cache-first strategy
 */
async function handleImageRequest(request) {
  try {
    // Try cache first
    const cachedImage = await caches.match(request);
    if (cachedImage) {
      return cachedImage;
    }
    
    // Fetch from network
    const networkResponse = await fetch(request);
    
    // Cache the image
    if (networkResponse && networkResponse.status === 200) {
      const cache = await caches.open(IMAGE_CACHE);
      cache.put(request, networkResponse.clone());
    }
    
    return networkResponse;
  } catch (error) {
    // Return placeholder image or cached fallback
    const fallback = await caches.match(`${BASE_PATH}/assets/images/mainlogo.svg`);
    if (fallback) {
      return fallback;
    }
    
    return new Response('Image not available', {
      status: 404,
      headers: { 'Content-Type': 'text/plain' }
    });
  }
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
        .then((cache) => cache.addAll(event.data.urls))
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
