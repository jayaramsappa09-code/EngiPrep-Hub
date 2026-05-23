const CACHE_NAME = 'engiprep-cache-v1';

const CRITICAL_ASSETS = [
    '/',
    '/index.html',
    '/notes.html',
    '/cheat-sheets.html',
    '/exam-survival.html',
    '/src/main.js',
    '/src/style.css',
    '/src/index.css'
];

self.addEventListener('install', (event) => {
    self.skipWaiting();
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            console.log('[Service Worker] Pre-caching critical assets');
            // We use catch to avoid stopping the SW install if some assets are missing
            return Promise.allSettled(
                CRITICAL_ASSETS.map(url => cache.add(url).catch(err => console.warn('Cache add failed for', url, err)))
            );
        })
    );
});

self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (cacheName !== CACHE_NAME) {
                        console.log('[Service Worker] Deleting old cache:', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
    self.clients.claim();
});

// Stale-while-revalidate strategy for caching
self.addEventListener('fetch', (event) => {
    if (event.request.method !== 'GET' || !event.request.url.startsWith(self.location.origin)) {
        return;
    }

    event.respondWith(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.match(event.request).then((cachedResponse) => {
                const fetchPromise = fetch(event.request).then((networkResponse) => {
                    if (networkResponse.ok) {
                        cache.put(event.request, networkResponse.clone());
                    }
                    return networkResponse;
                }).catch(() => {
                    // Fallbacks could be added here
                });

                return cachedResponse || fetchPromise;
            });
        })
    );
});
