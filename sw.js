const CACHE = 'cremas-ad5681a0aecb';
const URLS = ["./","_expo/static/js/web/index-4c8315adbfc83e20a24f643cb640bb16.js","apple-touch-icon.png","favicon.ico","icon-192.png","icon-512-maskable.png","icon-512.png","manifest.json"];

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(URLS)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim()),
  );
});

self.addEventListener('fetch', (e) => {
  if (e.request.method !== 'GET') return;
  // Navegación: red primero (para recibir actualizaciones), caché si no hay internet
  if (e.request.mode === 'navigate') {
    e.respondWith(fetch(e.request).catch(() => caches.match('./')));
    return;
  }
  e.respondWith(caches.match(e.request).then((r) => r || fetch(e.request)));
});
