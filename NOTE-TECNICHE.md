# Note tecniche (per chi mantiene l'app)

## Dati
- Tutto resta sul telefono (localStorage): `tessere.v1` (carte), `tessere.buoni` (buoni), `tessere.pref` (impostazioni).
- Nessuna richiesta verso altri siti: la Content-Security-Policy permette solo i file dell'app.
- Se i dati salvati risultano illeggibili non vengono sovrascritti: restano in `tessere.v1.rovinato.<data>` e l'app chiede di recuperare una copia.
- Tutto ciò che entra (dati salvati e copie importate) passa da `pulisciCarta` / `pulisciBuono`: solo campi attesi, lunghezze massime, foto solo come immagini `data:image/...`.
- All'avvio si chiede `navigator.storage.persist()` perché il browser non cancelli i dati quando manca spazio.
- Buoni usati: eliminati dopo 30 giorni. Buoni scaduti: eliminati 30 giorni dopo la scadenza. Le loro immagini si cancellano subito.
- Ogni 3 mesi (se ci sono almeno 3 carte) un invito discreto a salvare una copia.

## Aggiornamenti
- `sw.js`: pagina rete-prima; logo e script dalla cache con aggiornamento in sottofondo; `ocr/`, `vendor/`, `fonts/` solo dalla cache.
- **Quando si cambia un file in `ocr/`, `vendor/` o `fonts/` bisogna cambiare `VER` in `sw.js`**, altrimenti i telefoni tengono la versione vecchia.

## Librerie incluse
JsBarcode 3.11.6 (MIT), qrcode-generator 1.4.4 (MIT), zxing-wasm 3.1.6 (MIT / Apache-2.0), tesseract.js 5 + dati `ita` (Apache-2.0), Atkinson Hyperlegible (OFL).

## Loghi
I loghi in `tiles/` sono marchi dei rispettivi proprietari, usati solo per riconoscere il negozio della propria carta. Per una pubblicazione su store servirebbe una verifica legale.
