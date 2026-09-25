/* ADHD Field Guide - offline service worker (network-first) */
const CACHE = 'adhd-guide-v45';
const ASSETS = ['./', './index.html', './ar.html', './he.html', './hu.html', './about-hu.html', './contact-hu.html', './privacy-hu.html', './manifest-hu.json', './hu-g1.jpg', './hu-g2.jpg', './hu-g3.jpg', './hu-g4.jpg', './hu-g5.jpg', './hu-g6.jpg', './hu-g7.jpg',  './how-to-study-with-adhd.html', './articles.html', './how-to-get-an-adhd-diagnosis.html', './adhd-in-women.html', './adhd-and-sleep.html', './adhd-at-work.html', './how-to-get-an-adhd-diagnosis-ar.html', './how-to-get-an-adhd-diagnosis-he.html', './how-to-get-an-adhd-diagnosis-hu.html', './adhd-in-women-ar.html', './adhd-in-women-he.html', './adhd-in-women-hu.html', './adhd-and-sleep-ar.html', './adhd-and-sleep-he.html', './adhd-and-sleep-hu.html', './adhd-at-work-ar.html', './adhd-at-work-he.html', './adhd-at-work-hu.html',  './how-to-study-with-adhd-ar.html', './how-to-study-with-adhd-he.html', './manifest.json', './manifest-ar.json', './manifest-he.json', './icon-192.png', './icon-512.png', './config.js', './auth.js', './signup-nudge.js', './bookmarks.js', './brain.js', './reports.js', './save-limit.js', './reveal-fix.js', './lightbox.js', './cadence.js', './a11y.js', './click-track.js', './langmenu.js', './video-tap.js', './polish.css', './ads.js', './analytics.js'];

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(ASSETS)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});
self.addEventListener('fetch', (e) => {
  const req = e.request;
  if (req.method !== 'GET') return;
  // Only handle our own files; let the browser fetch fonts, CDNs, ads directly.
  let url;
  try { url = new URL(req.url); } catch (_) { return; }
  if (url.origin !== self.location.origin) return;

  // Network-first: always try the live page, fall back to cache only when offline.
  e.respondWith((async () => {
    try {
      const res = await fetch(req);
      if (res && res.status === 200 && res.type === 'basic') {
        const copy = res.clone();
        caches.open(CACHE).then((c) => c.put(req, copy)).catch(() => {});
      }
      return res;
    } catch (err) {
      const cached = await caches.match(req);
      if (cached) return cached;
      if (req.mode === 'navigate') {
        const home = await caches.match('./index.html');
        if (home) return home;
      }
      throw err;
    }
  })());
});
