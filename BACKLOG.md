# Backlog — Martenastate Welkomstgids
Werk van boven naar beneden. Elke taak is zelfstandig afrondbaar en controleerbaar.
Legenda: 🔒 = vereist actie van Jeroen (kan ik niet alleen) · 📈 = leunt op analytics-data

## ── Fase 0 · Hygiëne & fundament ──────────────────────────────

### ⏸ Geblokkeerd — wacht op Jeroen (rest gaat door)
- [ ] 🔒 Supabase RLS verifiëren — klaar wanneer: bevestigd dat de anon-key alleen SELECT + INSERT op de gastenboek-tabel toestaat (geen UPDATE/DELETE), bevinding in WORKLOG.md
- [ ] 🔒 Productie-branch hernoemen naar main — klaar wanneer: branch heet main, Vercel volgt de nieuwe branch, oude auto-naam opgeruimd

## ── Fase 1 · Performance & techniek ───────────────────────────

- [ ] Hero-afbeeldingen responsive maken — klaar wanneer: de grote hero/feature-beelden gebruiken srcset of een kleinere mobiele variant, getest op 375px
- [ ] apple-touch-icon (180×180 PNG) — klaar wanneer: PNG aanwezig, gelinkt in <head> van alle pagina's én in manifest, iOS toont een net icoon bij "op beginscherm"
- [ ] 📈 Lighthouse mobiel-pass — klaar wanneer: Lighthouse mobiel ≥90 Performance en ≥95 Accessibility/Best-Practices/SEO; afwijkingen in WORKLOG.md

## ── Fase 2 · Vindbaarheid (SEO + data) ────────────────────────

- [ ] JSON-LD structured data — klaar wanneer: index.html heeft LodgingBusiness, boeken.html heeft BedAndBreakfast + Campground, valideert foutloos in Google Rich Results Test
- [ ] Self-canonical per pagina — klaar wanneer: elke pagina heeft <link rel="canonical"> naar zijn eigen absolute URL
- [ ] Meta-description-audit — klaar wanneer: elke pagina heeft een unieke description van 120–160 tekens
- [ ] 🔒📈 Vercel Analytics activeren + Clarity-baseline — klaar wanneer: Analytics toont data, Clarity-sessies binnen, eerste observaties in WORKLOG.md

## ── Fase 3 · Conversie & boekingen ────────────────────────────

- [ ] Lodgify-widget EN/DE-labels — klaar wanneer: bij taalkeuze EN/DE tonen de widget-labels de juiste taal via JS, getest in preview
- [ ] Boeking-CTA consistent over pagina's — klaar wanneer: homepage-hero, verblijf en omgeving leiden met een herkenbare, identieke "Boek/Beschikbaarheid"-CTA naar boeken.html
- [ ] 📈 Funnel-/heatmap-review via Clarity — klaar wanneer: minstens 3 concrete observaties uit Clarity vertaald naar verbetertaken onderaan deze backlog
- [ ] "Vandaag/seizoen"-widget koppelen aan boeken — klaar wanneer: het seizoens-/vandaag-blok op de homepage heeft een subtiele doorverwijzing naar boeken zonder de rust te breken

## ── Fase 4 · Content & meertaligheid afmaken ──────────────────

- [ ] Mobile actiebar ROUTE/ROUTES verduidelijken — klaar wanneer: het onderscheid tussen "rij naar hier" en "wandel-/fietsroutes" is helder (hernoemd/geherstructureerd), getest op 320–481px
- [ ] i18n-volledigheidscheck (script) — klaar wanneer: een lokaal script bevestigt NL=EN=DE keypariteit én signaleert losse data-i18n-keys zonder vertaling; 0 fouten
- [ ] places.js/routes.js i18n-consistentie — klaar wanneer: alle name/desc/badge-velden hebben _nl/_en/_de en de render-laag valt nergens onbedoeld terug op NL
- [ ] Tekstuele puntjes op de i — klaar wanneer: spelling/typos-pass per taal op de zichtbare teksten (NL/EN/DE), correcties doorgevoerd
- [ ] 🔒 Seizoensgebonden galerij/content — klaar wanneer: galerij toont actuele seizoensbeelden óf een plan + plek waar foto's later aangeleverd worden is voorbereid

## ── Fase 5 · Robuustheid & onderhoud ──────────────────────────

- [ ] Externe-linkchecker-script — klaar wanneer: een script controleert álle externe links op een echte 200 (incl. redirect-/content-check), draait lokaal en rapporteert kapotte links
- [ ] i18n-/HTML-validatiescript — klaar wanneer: één commando valideert HTML-structuur + i18n-pariteit, bruikbaar als pre-deploy-check
- [ ] SW-versiebeleid documenteren — klaar wanneer: in CLAUDE.md staat wanneer/hoe CACHE_NAME bumpt
- [ ] CLAUDE.md / projectdocumentatie — klaar wanneer: doc beschrijft structuur, i18n-systeem, deploy-flow, SW-beleid en de "vereist jouw actie"-punten
- [ ] Offline-/404-test — klaar wanneer: met service worker actief is de gids offline leesbaar en 404.html verschijnt bij onbekende paden; getest

---
## ✅ Afgerond
(verplaatst vanuit de lijst hierboven zodra klaar — zie WORKLOG.md voor details)

- [x] preview.html uit productie halen — 2026-05-19 (verwijderd, robots opgeschoond)
- [x] places.js parking-emoji vervangen — 2026-05-19 ('🅿️' → 'parking')
- [x] Dode kaart-code besluit — 2026-05-19 (dormant bewaard, runtime-aanroepen + SW-cache opgeschoond)
- [x] photo-luchtfoto-1.png + 5 ongebruikte beelden — 2026-05-19 (ongebruikt → verwijderd, 8,5 MB weg)
- [x] Overige zware afbeeldingen comprimeren — 2026-05-19 (images/ 12 MB → 2,7 MB, alles < 500 KB)
- [x] width/height + lazy op alle content-<img> — 2026-05-19 (19 tags, geen CLS)
