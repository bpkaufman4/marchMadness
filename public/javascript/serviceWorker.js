const cacheName = 'node-cache';
const toCache = [
    '/'
]

self.addEventListener('install', function (e) {
    e.waitUntil(
        caches.open(cacheName)
        .then(cache => {
            return cache.addAll(toCache)
        })
        .then(self.skipWaiting());
    )
})