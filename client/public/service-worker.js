console.log("service worker is  running");
const cacheName = "app-v2";
const fileCache = ["/", "/index.html", "/manifest.json"];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(cacheName).then((cache) => cache.addAll(fileCache))
  );
});

self.addEventListener("fetch", (event) => {
  if (!(event.request.url.indexOf('http') === 0)) return;
  event.respondWith(
    (async () => {
      const resource = await caches.match(event.request);
      if (resource) {
        return resource;
      }
      const response = await fetch(event.request);
      const cache = await caches.open(cacheName);
      cache.put(event.request, response.clone());
      return response;
    })()
  );
});
// self.addEventListener("fetch", (evt) => {
//   // check if request is made by chrome extensions or web page
//   // if request is made for web page url must contains http.
//   if (!(evt.request.url.indexOf("http") === 0)) return; // skip the request. if request is not made with http protocol

//   evt.respondWith(
//     caches
//       .match(evt.request)
//       .then(
//         (cacheRes) =>
//           cacheRes ||
//           fetch(evt.request).then((fetchRes) =>
//             caches.open(dynamicNames).then((cache) => {
//               cache.put(evt.request.url, fetchRes.clone());
//               // check cached items size
//               limitCacheSize(dynamicNames, 75);
//               return fetchRes;
//             })
//           )
//       )
//       .catch(() => caches.match("/fallback"))
//   );
// });

self.addEventListener("activate", async (event) => {
  const keys = await caches.keys();
  await Promise.all(
    keys.map((key) => {
      if (keys !== cacheName) {
        return caches.delete(key);
      }
    })
  );
  clients.claim();
});
