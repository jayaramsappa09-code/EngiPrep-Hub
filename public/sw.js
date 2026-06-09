/**
 * EngiPrep Hub PWA Service Worker
 * Providing seamless offline entry to lecture notes, cheat sheets, and practice areas.
 */

const CACHE_NAME = 'engiprephub-v1';
const OFFLINE_URL = '/offline.html';

// Core assets to pre-cache on setup
const PRE_CACHE_ASSETS = [
  '/',
  '/index.html',
  '/offline.html',
  '/notes.html',
  '/cheat-sheets.html',
  '/bookmarks.html',
  '/dashboard.html',
  '/logo.png',
  '/public/logo.png',
  '/manifest.json'
];

// Install Event
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('[Service Worker] Pre-caching core assets');
        return cache.addAll(PRE_CACHE_ASSETS);
      })
      .then(() => self.skipWaiting())
  );
});

// Activate Event
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            console.log('[Service Worker] Removing stale cache:', cache);
            return caches.delete(cache);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Fetch Interceptor
self.addEventListener('fetch', (event) => {
  const request = event.request;
  const url = new URL(request.url);

  // Skip non-GET requests (like POST api chats, evaluations etc)
  if (request.method !== 'GET') {
    return;
  }

  // Skip browser extension scripts, chrome-extension, etc.
  if (!url.protocol.startsWith('http')) {
    return;
  }

  // Skip external scripts / ads unless they are from known domain or static fonts
  const isSelfDomain = url.origin === self.location.origin;
  const isStaticDoc = request.destination === 'document' || url.pathname.endsWith('.html') || !url.pathname.includes('.');

  // Strategy 1: HTML Document Navigations -> Network-First (with Cache Fallback)
  // This ensures notes and cheat sheets are cached on first view, and accessible offline
  if (isStaticDoc && isSelfDomain) {
    event.respondWith(
      fetch(request)
        .then((networkResponse) => {
          // Clone the response and save it to the cache
          if (networkResponse.status === 200) {
            const cacheCopy = networkResponse.clone();
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(request, cacheCopy);
            });
          }
          return networkResponse;
        })
        .catch(() => {
          // Offline fallback
          return caches.match(request)
            .then((cachedResponse) => {
              if (cachedResponse) {
                return cachedResponse;
              }
              // If not in cache, show the dedicated offline help page
              return caches.match(OFFLINE_URL);
            });
        })
    );
    return;
  }

  // Strategy 2: Core static assets (js, css, images, fonts) -> Cache-First / Stale-While-Revalidate
  const isStaticAsset = (
    request.destination === 'style' ||
    request.destination === 'script' ||
    request.destination === 'font' ||
    request.destination === 'image' ||
    url.pathname.endsWith('.js') ||
    url.pathname.endsWith('.css') ||
    url.pathname.endsWith('.woff2') ||
    url.pathname.endsWith('.png') ||
    url.pathname.endsWith('.svg') ||
    url.pathname.endsWith('.jpg')
  );

  if (isStaticAsset && isSelfDomain) {
    event.respondWith(
      caches.match(request).then((cachedResponse) => {
        if (cachedResponse) {
          // Fetch update in background to keep cache fresh (Stale-While-Revalidate)
          fetch(request).then((networkResponse) => {
            if (networkResponse.status === 200) {
              caches.open(CACHE_NAME).then((cache) => {
                cache.put(request, networkResponse);
              });
            }
          }).catch((err) => console.log('[Service Worker] Background sync failed for:', url.pathname));

          return cachedResponse;
        }

        // Fetch from network if not in cache
        return fetch(request).then((networkResponse) => {
          if (networkResponse.status === 200) {
            const cacheCopy = networkResponse.clone();
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(request, cacheCopy);
            });
          }
          return networkResponse;
        });
      })
    );
    return;
  }

  // Default: Network Only or general fallback
  event.respondWith(
    caches.match(request).then((cachedResponse) => {
      return cachedResponse || fetch(request);
    })
  );
});
