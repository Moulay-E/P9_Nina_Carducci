const cacheName = 'my-cache-v1';
const assetsToCache = [
  "./assets/images/instagram.png",
  "./assets/images/slider/ryoji-iwata-wUZjnOv7t0g-unsplashTiny_Pc.avif",
  "./assets/images/slider/nicholas-green-nPz8akkUmDI-unsplashTiny_Pc.avif",
  "./assets/images/slider/edward-cisneros-3_h6-1NPDGw-unsplashTiny_Pc.avif",
  './assets/images/nina.avif',
  // ... ajoutez toutes les autres ressources que vous souhaitez mettre en cache
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(cacheName).then(cache => {
      return cache.addAll(assetsToCache);
    })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    // Essaie d'abord le cache
    caches.match(event.request).then(cachedResponse => {
      if (cachedResponse) {
        return cachedResponse;
      }
      // Ensuite, essaie le réseau
      return fetch(event.request).then(response => {
        // Et met à jour le cache pour les prochaines fois
        return caches.open(cacheName).then(cache => {
          cache.put(event.request, response.clone());
          return response;
        });
      });
    })
  );
});






