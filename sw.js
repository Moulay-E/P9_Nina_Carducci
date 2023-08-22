const cacheName = 'my-cache-v1';
const assetsToCache = [
  "./assets/images/instagram.png",
  "./assets/images/slider/ryoji-iwata-wUZjnOv7t0g-unsplashMobile.avif",
  "./assets/images/slider/ryoji-iwata-wUZjnOv7t0g-unsplash500.avif",
  "./assets/images/slider/ryoji-iwata-wUZjnOv7t0g-unsplashTiny_Pc.avif",
  "./assets/images/slider/ryoji-iwata-wUZjnOv7t0g-unsplash.webp",
  "./assets/images/slider/nicholas-green-nPz8akkUmDI-unsplashMobile.avif",
  "./assets/images/slider/nicholas-green-nPz8akkUmDI-unsplash500.avif",
  "./assets/images/slider/nicholas-green-nPz8akkUmDI-unsplashTiny_Pc.avif",
  "./assets/images/slider/nicholas-green-nPz8akkUmDI-unsplash.webp",
  "./assets/images/slider/edward-cisneros-3_h6-1NPDGw-unsplashMobile.avif",
  "./assets/images/slider/edward-cisneros-3_h6-1NPDGw-unsplash500.avif",
  "./assets/images/slider/edward-cisneros-3_h6-1NPDGw-unsplashTiny_Pc.avif",
  "./assets/images/slider/edward-cisneros-3_h6-1NPDGw-unsplash.webp",
  './assets/images/nina.avif',
  './assets/images/nina.webp',
  "./assets/images/gallery/concerts/aaron-paul-wnX-fXzB6Cw-unsplash.webp",
  "./assets/images/gallery/entreprise/ali-morshedlou-WMD64tMfc4k-unsplash.webp",
  "./assets/images/gallery/entreprise/jason-goodman-tHO1_OuKbg0-unsplash.webp",
  "./assets/images/gallery/mariage/hannah-busing-RvF2R_qMpRk-unsplash.webp",
  "./assets/images/gallery/portraits/ade-tunji-rVkhWWZFAtQ-unsplash.webp",
  "./assets/images/gallery/mariage/jakob-owens-SiniLJkXhMc-unsplash.webp",
  "./assets/images/gallery/portraits/nino-van-prattenburg--443cl1uR_8-unsplash.webp",
  "./assets/images/gallery/concerts/austin-neill-hgO1wFPXl3I-unsplash.webp",
  "./assets/images/gallery/entreprise/mateus-campos-felipe-Fsgzm8N0hIY-unsplash.webp",
  "./assets/images/camera.webp",
  "./assets/style.min.css",
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
  // Vérifie que la requête est de type HTTP ou HTTPS
  if (event.request.url.startsWith('http')) {
    event.respondWith(
      // Essaie d'abord le cache
      caches.match(event.request).then(cachedResponse => {
        if (cachedResponse) {
          return cachedResponse;
        }
        // Ensuite, essaie le réseau
        return fetch(event.request).then(response => {
          // Assurez-vous que la réponse n'est pas de type 'chrome-extension' avant de la mettre en cache
          if (!response.url.startsWith('chrome-extension')) {
            // Et met à jour le cache pour les prochaines fois
            return caches.open(cacheName).then(cache => {
              cache.put(event.request, response.clone());
              return response;
            });
          } else {
            return response; // Retourne simplement la réponse sans la mettre en cache si c'est une extension Chrome
          }
        });
      })
    );
  }
});








