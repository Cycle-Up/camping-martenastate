# Martenastate Welkomstgids — projectdocumentatie

Statische, meertalige welkomstgids voor camping & B&B Martenastate (Koarnjum,
Friesland). Vanilla HTML/CSS/JS, **geen build-stap**. Live op Vercel.

## Structuur
```
*.html              9 pagina's: index, verblijf, activiteiten, omgeving,
                    gastenboek, boeken, pocket, privacy, 404
css/tokens.css      design tokens (kleuren, type, spacing) — :root variabelen
css/style.css       alle componenten + layout
js/translations.js  i18n: { nl:{...}, en:{...}, de:{...} } — 1:1 dezelfde keys
js/main.js          i18n-toepassing, nav, tabs, weer, gastenboek-helpers,
                    dormante kaart-code (zie onder)
js/icons.js         eigen SVG-icoonset (data-ms-icon="naam")
js/routes.js        wandel-/fietsroute-data — DORMANT (nergens geladen)
js/places.js        kaartmarker-data — DORMANT (nergens geladen)
images/             foto's (zie images/LEES_MIJ.txt voor toevoegen/vervangen)
sw.js               service worker (offline-cache)
manifest.webmanifest PWA-manifest
favicon.svg + apple-touch-icon/icon-192/icon-512.png  iconen (huisstijl)
robots.txt, sitemap.xml
tests/              testsuite (zie onder)
ROADMAP.md, BACKLOG.md, WORKLOG.md  planning + logboek
```

## i18n-systeem
- Elke zichtbare tekst heeft `data-i18n="key"` (of `-html` voor HTML-inhoud,
  `-alt` voor alt-tekst, `-placeholder` voor placeholders).
- `js/translations.js` bevat `nl`, `en`, `de` met **identieke key-sets**.
- `main.js` past vertalingen toe op load + bij taalwissel (`.lang-toggle`).
- Een nieuwe tekst toevoegen: zet `data-i18n="x"` in de HTML én de key `x` in
  ALLE DRIE de talen. `node tests/check-i18n.mjs` bewaakt de pariteit.
- Datums/locale: gebruik `currentLang` (nl-NL / en-GB / de-DE).

## Deploy-flow
- Repo: github.com/Cycle-Up/camping-martenastate (public).
- **Git-push deployt NIET automatisch** (commit-author ≠ Vercel-teamlid).
  Deploy handmatig via de Vercel CLI:
  ```
  vercel deploy --prod --yes --archive=tgz
  ```
- Productie-URL: https://camping-martenastate-bay.vercel.app
- Commit-author voor consistentie: jeroen@cycle-up.nl

## Service worker / cache-beleid
- `sw.js` cachet de CORE_ASSETS (pagina's, css, js, iconen) voor offline gebruik.
- **Belangrijk:** bij ELKE wijziging aan een gecachet bestand (HTML/CSS/JS/icoon)
  MOET je `CACHE_NAME` ophogen (bv. `martenastate-v23` → `v24`), anders zien
  terugkerende bezoekers de oude versie uit hun cache.
- Externe API's (Supabase, Open-Meteo) en de Lodgify-widget worden NIET gecachet.
- routes.js/places.js staan bewust NIET in de cache (dormant).

## Testsuite
Lokaal draaien (geen framework, puur Node):
```
node tests/run.mjs          # alle checks, exit 0 = groen
node tests/check-i18n.mjs   # NL=EN=DE-pariteit, HTML-keys, _de-velden, HTML-sanity
node tests/check-links.mjs  # externe links → echte 200 (netwerk nodig)
node tests/check-offline.mjs# SW core-assets bestaan + offline-fallback + 404
node tests/check-perf.mjs   # beeldgewicht, width/height/lazy, meta, canonical, iconen
```
Draai `node tests/run.mjs` vóór een deploy.

## Dormante kaart-laag
`initMap()` e.d. in main.js + routes.js/places.js horen bij een interactieve
Leaflet-kaart die niet meer live staat (kaart.html is verwijderd). De code is
guarded en wordt niet aangeroepen. Wil je de kaart terug: maak kaart.html met
een `#map`-element, laad Leaflet + routes.js + places.js, en roep `initMap()` +
`renderRouteLists()` weer aan.

## Vereist jouw actie (niet autonoom uit te voeren)
- **Productie-branch hernoemen** van `claude/analyze-martena-website-vKije` naar
  `main` (GitHub + Vercel settings).
- **Vercel Analytics aanzetten** in het dashboard (snippet staat al op de site).
- **Gastenboek-beveiliging** (bewust open gelaten): de Supabase anon-key kan
  INSERT + UPDATE. Bij spam/misbruik: RLS hardenen (UPDATE alleen op de
  likes-kolom) of een honeypot toevoegen.
- **Lighthouse mobiel ≥90 perf / ≥95 a11y** (gemeten: Perf 77, A11y 93,
  Best-Practices 100, SEO 100). De rest vereist keuzes:
  - Perf → Google Fonts self-hosten + critical CSS inline (fonts zijn nu de
    grootste render-rem); hero-LCP optimaliseren.
  - A11y → brand-eyebrow-kleur (Martena Rood op cream) haalt 4.5:1 niet;
    heading-volgorde (h1→h4-sprongen); ontbrekende `<main>`-landmark.
    Dit zijn ontwerpbeslissingen (kleur/structuur), daarom niet autonoom gedaan.
