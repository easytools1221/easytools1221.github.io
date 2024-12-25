const cache_name = "offline-v1";
const cache_files = [
  "/",
  "/index.html",
  "/favicon.svg",
  "/dev-tools",
];

self.addEventListener("install", (e) => {
    console.log("[Service Worker] Install");

    e.waitUntil(
        (async () => {
          const cache = await caches.open(cache_name);
          console.log("[Service Worker] Caching all: app shell and content");
          await cache.addAll(cache_files);
        })(),
    );
});

self.addEventListener("fetch", (e) => {
    console.log(`[Service Worker] Fetched resource ${e.request.url}`);
    e.respondWith(
        (async () => {
            const r = await caches.match(e.request);
            console.log(`[Service Worker] Fetching resource: ${e.request.url}`);
            if (r) {
                return r;
            }
            const response = await fetch(e.request);
            const cache = await caches.open(cache_name);
            console.log(`[Service Worker] Caching new resource: ${e.request.url}`);
            cache.put(e.request, response.clone());
            return response;
        })(),
    );
});


self.addEventListener("activate", (e) => {
    e.waitUntil(
        caches.keys().then((keyList) => {
            return Promise.all(
                keyList.map((key) => {
                if (key === cache_name) {
                    return;
                }
                return caches.delete(key);
                }),
            );
        }),
    );
});
  