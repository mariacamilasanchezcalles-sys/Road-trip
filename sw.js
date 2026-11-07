/* ROAD TRIP — service worker: guarda la app en el teléfono para usarla sin internet.
   Las actualizaciones (p. ej. data/contenido.js) se descargan solas al abrir la app con internet. */
var VERSION = 'roadtrip-v2';
var ARCHIVOS = [
  './',
  'index.html',
  'styles.css',
  'app.js',
  'data/contenido.js',
  'manifest.webmanifest',
  'icons/icon-192.png',
  'icons/icon-512.png',
  'icons/icon-maskable-512.png',
  'icons/apple-touch-icon.png'
];

self.addEventListener('install', function (e) {
  e.waitUntil(caches.open(VERSION).then(function (c) { return c.addAll(ARCHIVOS); }).then(function () { return self.skipWaiting(); }));
});

self.addEventListener('activate', function (e) {
  e.waitUntil(caches.keys().then(function (ks) {
    return Promise.all(ks.filter(function (k) { return k !== VERSION; }).map(function (k) { return caches.delete(k); }));
  }).then(function () { return self.clients.claim(); }));
});

/* Copia guardada primero (instantáneo aunque no haya señal) y, en segundo plano,
   se descarga la versión nueva si hay internet; se verá la próxima vez que abran la app. */
self.addEventListener('fetch', function (e) {
  if (e.request.method !== 'GET' || new URL(e.request.url).origin !== location.origin) return;
  e.respondWith(
    caches.open(VERSION).then(function (c) {
      return c.match(e.request, { ignoreSearch: true }).then(function (guardada) {
        var red = fetch(e.request).then(function (r) {
          if (r && r.ok) c.put(e.request, r.clone());
          return r;
        }).catch(function () { return guardada || c.match('index.html'); });
        if (guardada) { e.waitUntil(red.catch(function () {})); return guardada; }
        return red;
      });
    })
  );
});
