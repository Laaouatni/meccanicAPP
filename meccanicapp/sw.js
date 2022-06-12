const assetsArray = [
["./manifest.json"],
    ["./import/import.css","./src/css/form/form.css",
"./src/css/outputs/output.css",
"./src/css/alert/alert.css",
"./src/css/preview_tolleranza/preview_tolleranza.css",
"./src/css/tolleranze_range/tolleranze_range.css",
"./src/css/index/index.css",
"./src/css/footer/footer.css",
"./src/css/spianatura_gcode/preview-spianatura.css",
"./src/css/loading/loading.css",
"./src/css/spianatura_gcode/spianatura_output.css",
"./src/css/btn-calcola/btn-calcola.css",
"./src/css/body/body.css",
"./src/css/spianatura_gcode/altri-parametri.css",
"./src/css/formule/numero-giri/numero-giri.css",
"./src/css/formule/velocita-di-taglio/vt.css",
"./src/css/suggerimento-card/suggerimento-card.css",
"./src/css/formule/avanzamento/avanzamentoG95tornio/G95avanz-tornio.css",
"./src/css/formule/avanzamento/avanzamentoG94fresa/G94avanz-fresa.css",
"./src/css/index/piu-dettagli/piu-dettagli.css"], // css
    [
        "./src/javascript/page-js/formule/avanzamento-fresa/G94-avanz-fresa.js",
        "./src/javascript/page-js/formule/avanzamento-tornio/G95-avanz-tornio.js",
        "./src/javascript/page-js/formule/numero_giri/tornio/script.js",
        "./src/javascript/page-js/formule/velocita_di_taglio/script.js",
    ], // formule
    [
        "./src/javascript/page-js/gioco_interferenza_albero/script.js",
        "./src/javascript/page-js/index/script.js",
        "./src/javascript/page-js/spianatura_gcode/spianatura_gcode.js",
        "./src/javascript/page-js/tolleranze/script.js"
"./sw.js"
    ], //  other js
    [
        "./src/pages/avanzamento_fresa_G94.html",
        "./src/pages/avanzamento_tornio_G95.html",
        "./src/pages/formula_numero_giri_CNC.html",
        "./src/pages/formula_velocita_di_taglio_CNC.html",
        "./src/pages/interferenza_gioco_albero.html",
        "./src/pages/spianatura_gcode.html",
        "./src/pages/tolleranze_albero_h.html"
    ], // pages html
    [
"/"
        "./index.html",
        "./style.css",
        "./404.html"
    ], // index
    [
        "./utilities/images/index-images/G94-avanzamento-fresa/0.jpg",
        "./utilities/images/index-images/G95-avanzamento-tornio/0.jpg",
        "./utilities/images/index-images/interferenza-gioco-albero/0.jpg",
        "./utilities/images/index-images/spianatura-gcode/0.jpg",
        "./utilities/images/index-images/spianatura-gcode/1.jpg",
        "./utilities/images/index-images/tolleranze-h7/0.jpg",
        "./utilities/images/index-images/velocita_di_taglio/0.jpg",
    ], // index images
    [
        "./utilities/images/texture/metal/0cube.webp",
        "./utilities/images/texture/metal/0metal.webp",
        "./utilities/images/texture/metal/pavimento/0floor.jpg",
    ], // texture
    [
        "./utilities/images/pagine/avanzamento/G95-avanzamento-tornio/0.png",
        "./utilities/images/loading/loading.gif",
        "./utilities/images/arrow/0arrow.png",
    ] // other images
]

//the array multidimensional to one array
const assets = assetsArray.reduce((acc, cur) => acc.concat(cur), []);

const cacheName = "v1-files"

self.addEventListener("install", installEvent => {
    installEvent.waitUntil(
        caches.open(cacheName).then(cache => {
            cache.addAll(assets)
        })
    )
});

self.addEventListener('fetch', function(event) {
  console.log('Fetch event for ', event.request.url);
  event.respondWith(
    caches.match(event.request).then(function(response) {
      if (response) {
        console.log('Found ', event.request.url, ' in cache');
        return response;
      }
      console.log('Network request for ', event.request.url);
      return fetch(event.request)

    }).catch(function(error) {

      return caches.match('index.html');

    })
  );
});
