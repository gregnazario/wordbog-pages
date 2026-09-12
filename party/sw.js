// App-shell service worker. This file is the TEMPLATE: `vite build` copies
// it into dist-web/ verbatim, then party-web/tools/stamp-sw.mjs (chained in
// package.json's build:web) rewrites two literals on the copy:
//   CACHE    → "wordbog-party-<hash>" (hash of the emitted asset names), so
//              every distinct build gets a fresh cache and activate() below
//              deletes all older ones;
//   PRECACHE → "./", "./index.html" + the hashed ./assets/* URLs referenced
//              by the built index.html, so the shell boots fully offline.
// The literal values below are the unstamped fallback and never ship from a
// stamped build.
const CACHE = "wordbog-party-b0ff332f";
const PRECACHE = ["./", "./index.html", "./assets/index-B2Yk7kpR.js", "./assets/index-BCgEFEog.css"];
self.addEventListener("install", (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(PRECACHE)));
  self.skipWaiting();
});
self.addEventListener("activate", (e) => {
  e.waitUntil(caches.keys().then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)))));
  self.clients.claim();
});
self.addEventListener("fetch", (e) => {
  const url = new URL(e.request.url);
  // Relay traffic is live-only, cross-origin is none of our business.
  if (e.request.method !== "GET" || url.origin !== self.location.origin) return;
  if (url.pathname.startsWith("/rooms") || url.pathname.startsWith("/health")) return;
  // Documents: network-first so a redeploy is picked up on the next visit
  // while online; offline falls back to the cached shell.
  if (e.request.mode === "navigate") {
    e.respondWith(networkFirstDocument(e.request));
    return;
  }
  // Assets: cache-first, and copy any fresh (previously uncached) response
  // into the cache so a missed asset self-heals for the next session.
  e.respondWith(cacheFirstWithHeal(e.request));
});

async function networkFirstDocument(request) {
  try {
    const res = await fetch(request);
    if (res.ok) {
      const cache = await caches.open(CACHE);
      await cache.put(request, res.clone());
    }
    return res;
  } catch {
    return (await caches.match(request)) ?? (await caches.match("./")) ?? (await caches.match("./index.html"));
  }
}

async function cacheFirstWithHeal(request) {
  const hit = await caches.match(request);
  if (hit) return hit;
  const res = await fetch(request);
  if (res.ok) {
    const cache = await caches.open(CACHE);
    await cache.put(request, res.clone());
  }
  return res;
}
