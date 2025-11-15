/* Simple service worker for basic PWA offline support.
   - Pre-caches a small set of static assets
   - Serves cached responses first (cache-first)
   - Falls back to /offline.html for navigation when offline
   This file lives in `public/` so it's served at `/sw.js`.
*/

const CACHE_NAME = "nextjs-pwa-v1";
const PRECACHE_URLS = [
  "/",
  "/offline.html",
  "/icon/192x192.png",
  "/icon/180x180.png",
  "/icon/512x512.png",
  "/site.webmanifest",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(async (cache) => {
      // Use Promise.allSettled so a single missing/404 asset doesn't fail the whole install.
      const results = await Promise.allSettled(
        PRECACHE_URLS.map((url) => cache.add(url))
      );
      const rejected = results.filter((r) => r.status === "rejected");
      if (rejected.length > 0) {
        // log which precache entries failed (helps debugging missing files)
        try {
          const failedUrls = rejected.map((r, i) => {
            // attempt to map to the URL using the same index in PRECACHE_URLS
            return PRECACHE_URLS[i];
          });
          console.warn("Some precache entries failed:", failedUrls);
        } catch {
          // ignore logging errors in the worker
        }
      }
    })
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k))
        )
      )
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  // Only handle same-origin GET requests
  if (event.request.method !== "GET") return;

  const requestURL = new URL(event.request.url);

  // Navigation requests: try cache -> network -> offline.html
  if (event.request.mode === "navigate") {
    event.respondWith(
      fetch(event.request)
        .then((resp) => {
          // Update cache in the background
          const copy = resp.clone();
          caches
            .open(CACHE_NAME)
            .then((cache) => cache.put(event.request, copy));
          return resp;
        })
        .catch(() => caches.match("/offline.html"))
    );
    return;
  }

  // For other same-origin requests, try cache-first then network
  if (requestURL.origin === location.origin) {
    event.respondWith(
      caches.match(event.request).then((cached) => {
        if (cached) return cached;
        return fetch(event.request)
          .then((resp) => {
            // Cache a clone for future requests (but don't cache opaque responses)
            if (resp && resp.status === 200 && resp.type !== "opaque") {
              const copy = resp.clone();
              caches
                .open(CACHE_NAME)
                .then((cache) => cache.put(event.request, copy));
            }
            return resp;
          })
          .catch(() => {
            // If request is for an image, optionally return a tiny placeholder (not provided here)
            return caches.match("/offline.html");
          });
      })
    );
  }
});
