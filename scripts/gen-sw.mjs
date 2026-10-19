// Genera dist/sw.js después de `expo export -p web`: precachea todos los archivos
// del build para que la app funcione sin internet. La versión cambia con el contenido,
// así que cada deploy invalida la caché anterior.
import { createHash } from 'node:crypto';
import { readdirSync, readFileSync, statSync, writeFileSync } from 'node:fs';
import { join, relative } from 'node:path';

const DIST = 'dist';

function walk(dir) {
  return readdirSync(dir).flatMap((f) => {
    const p = join(dir, f);
    return statSync(p).isDirectory() ? walk(p) : [p];
  });
}

const files = walk(DIST)
  .map((p) => relative(DIST, p).split('\\').join('/'))
  .filter((f) => f !== 'sw.js' && f !== 'metadata.json')
  .sort();

const hash = createHash('sha256');
for (const f of files) hash.update(f).update(readFileSync(join(DIST, f)));
const version = hash.digest('hex').slice(0, 12);

// Rutas relativas al sw.js, así funciona en cualquier subpath
const urls = ['./', ...files.filter((f) => f !== 'index.html')];

const sw = `const CACHE = 'cremas-${version}';
const URLS = ${JSON.stringify(urls)};

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
`;

writeFileSync(join(DIST, 'sw.js'), sw);
console.log(`sw.js: ${urls.length} archivos, versión ${version}`);
