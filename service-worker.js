const CACHE_NAME = "abk-cache-v1";
const urlsToCache = [
  "./",
  "./index.html",
  "./products.html",
  "./sales.html",
  "./manifest.json",
  "./service-worker.js",
  // أضف ملفات CSS و JS وأي ملفات صور تستخدمها في موقعك هنا
];

// عند تثبيت الخدمة
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
      .then(() => self.skipWaiting())
  );
});

// عند تفعيل الخدمة
self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.map(key => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// عند طلب ملفات من الموقع
self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
