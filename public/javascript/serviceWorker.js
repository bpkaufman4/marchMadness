const cacheName = 'node-cache';
const toCache = [
    '/'
];

self.addEventListener('install', function (e) {
    e.waitUntil(
        caches.open(cacheName)
        .then(cache => {
            return cache.addAll(toCache)
        })
        .then(self.skipWaiting())
    )
});

self.addEventListener('activate', e => {
    e.waitUntil(
        caches.keys()
        .then(keyList => {
            return Promise.all(keyList.map(key => {
                if(key !== cacheName) {
                    console.log('[ServiceWorker] Removing old cache', key)
                    return caches.delete(key)
                }
            }))
        })
        .then(() => self.clients.claim())
    )
})