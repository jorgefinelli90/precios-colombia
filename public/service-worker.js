self.addEventListener('install', (event) => {
  console.log('Service Worker installing.');
  // Add a call to skipWaiting here if you want to force the waiting service worker to become active
});

self.addEventListener('activate', (event) => {
  console.log('Service Worker activating.');
});

self.addEventListener('fetch', (event) => {
  console.log('Fetching:', event.request.url);
  // You can add custom fetch event logic here
});
