const staticCacheName = 's-app-v1';
const assetsUrls = [
    'index.html',
    '/js/app.js',
    '/css/font-awesome.min.css',
    '/css/app.css',
];
self.addEventListener('install', async event => {
  const cache = await caches.open(staticCacheName);
  await cache.addAll(assetsUrls);
});

self.addEventListener('activate', event => {
  console.log('[SW]: activate');
});

self.addEventListener('fetch', event => {
  console.log('Fetch', event.request.url);
});