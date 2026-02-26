/**
 * LocalFind - Service Worker
 * PWA offline support with caching strategies
 * 
 * @version 1.0.0
 */

const CACHE_VERSION = 'localfind-v1.0.0';
const STATIC_CACHE = `${CACHE_VERSION}-static`;
const DYNAMIC_CACHE = `${CACHE_VERSION}-dynamic`;
const IMAGE_CACHE = `${CACHE_VERSION}-images`;

// Assets to cache immediately on install
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/directory.html',
  '/categories.html',
  '/business-detail.html',
  '/add-business.html',
  '/about.html',
  '/404.html',
  '/500.html',
  '/css/style.css',
  '/css/navbar.css',
  '/css/hero.css',
  '/css/cards.css',
  '/css/categories.css',
  '/css/filters.css',
  '/css/forms.css',
  '/css/footer.css',
  '/css/animations.css',
  '/css/business-detail.css',
  '/js/config.js',
  '/js/data.js',
  '/js/main.js',
  '/js/directory.js',
  '/js/map.js',
  '/js/form.js',
  '/js/utils.js',
  '/js/animations.js',
  '/js/counter.js',
  '/assets/images/mainlogo.svg',
  '/assets/images/og-image.jpg',
  '/manifest.json'
];

// Install event - cache static assets
self.addEventListener('install', (event) => {
  console.log('[SW] Installing service worker...');
  
  event.waitUntil(
    caches.open(STATIC_CACHE)
      .then((cache) => {
        console.log('[SW] Caching static assets');
        return cache.addAll(STATIC_ASSETS);
      })
      .then(() => {
        console.log('[SW] Static assets cached successfully');
        return self.skipWaiting();
      })
      .catch((error) => {
        console.error('[SW] Failed to cache static assets:', error);
      })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  console.log('[SW] Activating service worker...');
  
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames
            .filter((cacheName) => {
              return cacheName.startsWith('localfind-') && 
                     cacheName !== STATIC_CACHE && 
                     cacheName !== DYNAMIC_CACHE &&
                     cacheName !== IMAGE_CACHE;
            })
            .map((cacheName) => {
              console.log('[SW] Deleting old cache:', cacheName);
              return caches.delete(cacheName);
            })
        );
      })
      .then(() => {
        console.log('[SW] Service worker activated');
        return self.clients.claim();
      })
  );
});

// Fetch event - serve from cache with network fallback
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);
  
  // Skip cross-origin requests
  if (url.origin !== location.origin) {
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
 * Handle GET requests with cache-first strategy
 */
async function handleGetRequest(request) {
  try {
    // Try cache first
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
      console.log('[SW] Serving from cache:', request.url);
      return cachedResponse;
    }
    
    // If not in cache, fetch from network
    console.log('[SW] Fetching from network:', request.url);
    const networkResponse = await fetch(request);
    
    // Cache successful responses
    if (networkResponse && networkResponse.status === 200) {
      const cache = await caches.open(DYNAMIC_CACHE);
      cache.put(request, networkResponse.clone());
    }
    
    return networkResponse;
  } catch (error) {
    console.error('[SW] Fetch failed:', error);
    
    // Return offline page for navigation requests
    if (request.mode === 'navigate') {
      const offlinePage = await caches.match('/offline.html');
      if (offlinePage) {
        return offlinePage;
      }
    }
    
    // Return generic error response
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
    console.error('[SW] Image fetch failed:', error);
    
    // Return placeholder image or cached fallback
    const fallback = await caches.match('/assets/images/mainlogo.svg');
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
  console.log('[SW] Background sync triggered:', event.tag);
  
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
    console.log('[SW] Syncing business submissions...');
    
    // Example: fetch pending submissions and POST to API
    // const submissions = await getPendingSubmissions();
    // for (const submission of submissions) {
    //   await fetch('/api/business/submit', {
    //     method: 'POST',
    //     body: JSON.stringify(submission)
    //   });
    // }
    
    console.log('[SW] Sync completed');
  } catch (error) {
    console.error('[SW] Sync failed:', error);
    throw error;
  }
}

// Push notification support
self.addEventListener('push', (event) => {
  console.log('[SW] Push notification received');
  
  const options = {
    body: event.data ? event.data.text() : 'New update available',
    icon: '/assets/images/icon-192x192.png',
    badge: '/assets/images/icon-72x72.png',
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
  console.log('[SW] Notification clicked:', event.action);
  
  event.notification.close();
  
  if (event.action === 'open') {
    event.waitUntil(
      clients.openWindow('/')
    );
  }
});

// Message handler for communication with main thread
self.addEventListener('message', (event) => {
  console.log('[SW] Message received:', event.data);
  
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
  
  if (event.data && event.data.type === 'CACHE_URLS') {
    event.waitUntil(
      caches.open(DYNAMIC_CACHE)
        .then((cache) => cache.addAll(event.data.urls))
    );
  }
});

console.log('[SW] Service worker loaded');
