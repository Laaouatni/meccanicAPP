importScripts('https://storage.googleapis.com/workbox-cdn/releases/6.5.2/workbox-sw.js');

workbox.routing.registerRoute(() => true, new workbox.strategies.NetworkFirst());