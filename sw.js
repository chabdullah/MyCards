// Le mie carte: funziona anche senza internet.
const VER = "v7-1";
const SHELL = "carte-" + VER;
const FILES = [
"./",
"./index.html",
"./manifest.webmanifest",
"./icon-192.png",
"./icon-512.png",
"./icon.svg",
"./stores.js",
"./vendor/JsBarcode.all.min.js",
"./vendor/qrcode.js",
"./vendor/zxing-reader.js",
"./vendor/zxing_reader.wasm",
"./fonts/atkinson-400.woff2",
"./fonts/atkinson-700.woff2",
"./tiles/acquaesapone.png",
"./tiles/aldi.png",
"./tiles/arcaplanet.png",
"./tiles/autogrill.png",
"./tiles/basko.png",
"./tiles/bennet.png",
"./tiles/blukids.png",
"./tiles/bricocenter.png",
"./tiles/bricook.png",
"./tiles/burgerking.png",
"./tiles/calliope.png",
"./tiles/calzedonia.png",
"./tiles/carrefour.png",
"./tiles/cinelandia.png",
"./tiles/coin.png",
"./tiles/conad.png",
"./tiles/coop.png",
"./tiles/crai.png",
"./tiles/decathlon.png",
"./tiles/despar.png",
"./tiles/douglas.png",
"./tiles/enilive.png",
"./tiles/equi.png",
"./tiles/esselunga.png",
"./tiles/esso.png",
"./tiles/euronics.png",
"./tiles/eurospin.png",
"./tiles/expert.png",
"./tiles/famila.png",
"./tiles/feltrinelli.png",
"./tiles/gamestop.png",
"./tiles/gigante.png",
"./tiles/giunti.png",
"./tiles/hm.png",
"./tiles/ikea.png",
"./tiles/iper.png",
"./tiles/iperal.png",
"./tiles/isoladeitesori.png",
"./tiles/italo.png",
"./tiles/kasanova.png",
"./tiles/kiabi.png",
"./tiles/leroymerlin.png",
"./tiles/lidl.png",
"./tiles/maisonsdumonde.png",
"./tiles/mcdonalds.png",
"./tiles/md.png",
"./tiles/mediaworld.png",
"./tiles/mondadori.png",
"./tiles/obi.png",
"./tiles/ovs.png",
"./tiles/pam.png",
"./tiles/penny.png",
"./tiles/pinalli.png",
"./tiles/pittarello.png",
"./tiles/pittarosso.png",
"./tiles/prenatal.png",
"./tiles/primark.png",
"./tiles/q8.png",
"./tiles/scarpescarpe.png",
"./tiles/sephora.png",
"./tiles/sigma.png",
"./tiles/tamoil.png",
"./tiles/terranova.png",
"./tiles/tezenis.png",
"./tiles/tigota.png",
"./tiles/tigros.png",
"./tiles/toyscenter.png",
"./tiles/trenitalia.png",
"./tiles/unes.png",
"./tiles/unieuro.png",
"./tiles/unigross.png",
"./tiles/yvesrocher.png",
"./tiles/zara.png"
];
self.addEventListener("install", e => { e.waitUntil(caches.open(SHELL).then(c => c.addAll(FILES))); self.skipWaiting(); });
self.addEventListener("activate", e => { e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== SHELL).map(k => caches.delete(k))))); self.clients.claim(); });
self.addEventListener("fetch", e => {
  const req = e.request; if (req.method !== "GET") return;
  const url = new URL(req.url); if (url.origin !== location.origin) return;
  const salva = (k, r) => { if (r && r.ok && r.type === "basic") { const cp = r.clone(); caches.open(SHELL).then(c => c.put(k, cp)); } return r; };
  // pagina: rete prima (così gli aggiornamenti arrivano), cache se offline
  if (req.mode === "navigate") {
    e.respondWith(fetch(req).then(r => salva("./index.html", r)).catch(() => caches.match("./index.html")));
    return;
  }
  // il resto: subito dalla cache, e intanto si aggiorna in sottofondo (mai salvare errori)
  const fisso = /\/(ocr|vendor|fonts)\//.test(url.pathname); // file pesanti che cambiano solo con una nuova versione
  e.respondWith(caches.match(req, { ignoreSearch: true }).then(hit => {
    if (hit && fisso) return hit;
    const rete = fetch(req).then(r => salva(req, r)).catch(() => hit);
    return hit || rete;
  }));
});
