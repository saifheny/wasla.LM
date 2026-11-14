/* Wasla PWA Service Worker — Network-First لضمان التحديث الفوري وتوافق SRI ودعم التثبيت كتطبيق */
const CACHE_NAME = 'wasla-pwa-Mt0yF2vtAAed';
const PRECACHE_URLS = [
  './manifest.json',
  './assets/icon-192.png',
  './assets/icon-512.png',
  './assets/apple-touch-icon.png',
  './assets/favicon.svg'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(PRECACHE_URLS).catch(() => {}))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  const req = event.request;
  if (req.method !== 'GET') return;

  let url;
  try {
    url = new URL(req.url);
  } catch {
    return;
  }

  // لا نتدخل أبداً في اتصالات Firebase أو Google Auth أو الخطوط الخارجية
  if (url.origin !== self.location.origin) return;

  // استراتيجية الشبكة أولاً مع تعطيل كاش HTTP لضمان وصول كل تحديث فوراً
  event.respondWith(
    fetch(req, { cache: 'no-store' })
      .then(res => {
        if (res && res.ok && res.type === 'basic') {
          const clone = res.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(req, clone)).catch(() => {});
        }
        return res;
      })
      .catch(() => caches.match(req))
  );
});
