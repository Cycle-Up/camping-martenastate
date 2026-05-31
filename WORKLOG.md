# Worklog — Martenastate Welkomstgids

Kort logboek, nieuwste bovenaan. Per turn: datum · taak · wat gedaan · resultaat · commit.

---

## 2026-05-19 — Fase 4: favicon recolor + backlog definitief
- Backlog herzien na 2e planstap: actiebar-navigatieknop → "Adres", géén vercel.json, tekstpass mag lichte stijl. 404-label + a11y aria-pressed toegevoegd; places/routes-i18ncheck gevouwen in het validatiescript.
**Favicon + iconen recolor** ✅
- favicon.svg herteekend in huisstijl: Leien blauw (#0F4A4F) schijf, Bostulp goud (#F2C12E/#F8DE7A) bloemblaadjes, Martena Rood (#E36447/#C84A2E) hart, Haarlems groen (#BBD590) blad/steel. apple-touch-icon (180) + icon-192/512 opnieuw gegenereerd met effen Leien blauw vierkant. SW → v20.
- Visueel geverifieerd in preview: teal tegel met goud/rood/groen bloem-mark, on-brand.

---

## 2026-05-19 — Fase 4 start: gastenboek i18n
**Gastenboek-systeemteksten i18n** ✅
- Hardcoded NL uit de inline JS gehaald: lege-staat → `t('guestbook.empty')`, laadfout → `t('guestbook.error.load')`, postfout → `t('guestbook.error.post')` (2 nieuwe keys × 3 talen, 1078 keys elk). Datum via `currentLocale()` (document.documentElement.lang → nl-NL/en-GB/de-DE).
- `window.refreshGuestbook = loadEntries` + aanroep in main.js setLang → bij taalwissel re-render met juiste datums/teksten.
- Verificatie: error-string rendert correct in EN ("Couldn't load messages…"); datum-locale klopt (en-GB "18 May 2026", de-DE "18. Mai 2026"). Supabase-load faalt in preview ("Offline" via SW) = omgeving, niet mijn code (fetch ongewijzigd; live laadde eerder 11 entries).

---

## 2026-05-19 — Fase 3 afgerond (conversie) + backlog herzien
- Backlog herschreven na planstap + 4 keuzes (feedback→mailto jeroen; gastenboek ongewijzigd; geen Clarity; favicon recolor). Geschrapt: spamfilter, RLS-taak, Clarity-funnel. Toegevoegd: feedback-fix, gastenboek-i18n, favicon-recolor, galerij-robuust, testrunner.
**Feedbackformulier-fix** ✅ — `action` van placeholder `jouwadres@example.com` → `mailto:jeroen@cycle-up.nl`; 0× example.com in codebase.
**Boeking-CTA consistent** ✅ — gedeelde `.btn.btn-book` (Martena Rood) + i18n `cta.book` (NL/EN/DE). Op index (primaire hero-knop), verblijf en omgeving (na hero-subtitle). Getest 375px: rgb(227,100,71), href boeken.html, navigeert.
**Vandaag/seizoen → boeken** ✅ — subtiele link `today.book.link` ("Kom je ook? Boek je plek") in de vandaag-widget; rood, klein, breekt de rust niet.
- Debug-noot: preview toonde lang de oude CSS doordat de **service worker (v18) style.css cache-first serveert**; pas na SW-unregister + caches wissen verscheen de nieuwe stijl. Relevant voor toekomstige previews: SW eerst legen. `!important` op .btn-book gehouden als veiligheidsmarge tegen de `.hero .btn-primary`-override.

---

## 2026-05-19 — Fase 3 (Lodgify-widget meertalig)
**Lodgify EN/DE-labels** ✅
- Loader herschreven: NL/EN/DE labelsets in boeken.html. Inline script zet de labels in de opgeslagen taal VÓÓR de (statische, deferred) Lodgify-render → eerste render meteen correct. `window.applyLodgifyLang(lang)` herlaadt bij taalwissel (schone render). main.js setLang() roept dit aan.
- Getest in preview: load-time NL/EN/DE renderen correct (Aankomst/Arrival/Anreise · Vertrek/Departure/Abreise · Zoeken/Search/Suchen); toggle van DE→NL herlaadt en rendert NL. Widget visueel correct: "1 gast"-teller + teal Zoeken-knop.
- Onderzocht: dynamische her-injectie van het Lodgify-script brak het (verborgen) gast-counter-label ("G_People"); daarom de reload-aanpak. "G_People" is een verborgen, ongebruikte label die ook op de live (originele embed) voorkomt en niet zichtbaar is voor bezoekers — buiten scope, genoteerd.

---

## 2026-05-19 — Fase 2 SEO (canonical + meta + JSON-LD)
**Self-canonical** ✅ — `<link rel="canonical">` op 8 indexeerbare pagina's (eigen absolute URL); 404.html bewust uitgesloten.
**Meta-description-audit** ✅ — 8 unieke descriptions herschreven naar 143–159 tekens (binnen 120–160).
**JSON-LD structured data** ✅ — index.html: LodgingBusiness (naam, adres, geo, telefoon, image, priceRange). boeken.html: @graph met BedAndBreakfast (Martenawei 2, 2 kamers, amenities) + Campground (De Wier 7A, seizoen, petsAllowed). Beide blokken parsen als geldig JSON; te dubbelchecken in Google Rich Results Test na deploy.
**Open in Fase 2:** Vercel Analytics activeren (🔒 dashboard).

---

## 2026-05-19 — Deploy v17 + Lighthouse-meting geblokkeerd
- Git-push deployt niet automatisch op dit project (commit-author ≠ Vercel-teamlid) → productie-deploy via `vercel deploy --prod --archive=tgz`. v17 live geverifieerd: apple-touch-icon 200, verwijderde luchtfoto 404 (correct).
- **Lighthouse mobiel-pass (Fase 1) kan nu niet gemeten worden:** PSI-API anonieme dagquota uitgeput, geen API-key, lighthouse-CLI niet geïnstalleerd. Taak blijft expliciet OPEN — niet afgevinkt zonder echte meting. Perf-fundament (beeld 12→2,7 MB, width/height, lazy) staat wel klaar; verwachte scores hoog. Te meten via DevTools-Lighthouse of npx lighthouse in een latere turn.

---

## 2026-05-19 — Fase 1 vervolg (PWA-icoon + hero)
**Taak: apple-touch-icon (180×180 PNG)** ✅
- favicon.svg met sips gerasterd; effen vierkant-achtergrond toegevoegd (#faf7f2) zodat iOS geen zwarte hoeken toont. Gegenereerd: apple-touch-icon.png (180), icon-192.png, icon-512.png. `<link rel="apple-touch-icon">` op alle 9 pagina's; manifest icons-array uitgebreid met 192/512 PNG (purpose "any maskable"). Iconen in SW-cache (v17). Manifest valideert als JSON.
- Observatie genoteerd: favicon gebruikt nog het oude paars/sage-palet (niet de nieuwe huisstijl). Bloem-mark zelf is prima; brand-mark wijzigen is een aparte beslissing voor Jeroen.

**Taak: hero/feature responsive** ✅ (pragmatisch)
- Hero-achtergrond photo-poort.webp is 154 KB — prima voor mobiel, geen srcset nodig. Alle feature-<img> staan na compressie op ≤1280px en <500 KB. photo-fietsen.webp (1900px, 472 KB) niet verder verkleind: sips kan webp niet schrijven en er is geen webp-encoder (cwebp/magick) geïnstalleerd; 472 KB zit onder de 500 KB-grens dus acceptabel. Eventueel later met cwebp naar ~1280px.

**Nog open in Fase 1:** Lighthouse mobiel-pass (meten op live na deploy).

---

## 2026-05-19 — Fase 1 deels (beeld-optimalisatie)
**Taak: photo-luchtfoto-1.png + overige zware beelden** ✅
- Ref-analyse: 6 afbeeldingen 0× gebruikt (incl. luchtfoto 6 MB, kunstbrug 1 MB, kasteeltje-2 928 KB) → verwijderd (~8,5 MB). Geen dynamische image-paden in JS (geverifieerd).
- photo-bloemen.jpg (959 KB) + photo-singel.jpg (922 KB) waren 1600px: verkleind naar 1280px @ q55 → 419 KB / 354 KB. images/ totaal **12 MB → 2,7 MB**, elke afbeelding < 500 KB.

**Taak: width/height + lazy op alle content-<img>** ✅
- 19 img-tags voorzien van intrinsieke width/height (aspect-ratio → geen CLS) + loading="lazy" waar het ontbrak. 1×1 base64-placeholder bewust overgeslagen. Geverifieerd: 0 content-images zonder w/h/lazy.

---

## 2026-05-19 — Fase 0 (code-zijde) afgerond
**Taak: preview.html uit productie halen** ✅
- Geverifieerd: 0 verwijzingen in HTML/JS/CSS, niet in sitemap. `git rm preview.html` (4096 regels legacy prototype; herstelbaar via historie). `Disallow: /preview.html` uit robots.txt.

**Taak: places.js parking-emoji vervangen** ✅
- `icon: '🅿️'` → `icon: 'parking'` (icoon bestaat in icons.js, consistent met alle andere places). 0 emoji's over; places.js parset valid, 15 places.

**Taak: dode kaart-code besluit** ✅
- Bevinding: routes.js, places.js én Leaflet worden door GEEN live pagina geladen; geen `#map` bestaat. Hele kaart-laag is dood maar guarded.
- Besluit: **dormant bewaren** (data is waardevol + volledig NL/EN/DE-vertaald, herbruikbaar voor toekomstige kaart.html). Opgeschoond: `initMap()`/`renderRouteLists()`-aanroepen uit bootMartenastate() + setLang() verwijderd; DORMANT-commentblok boven initMap(); routes.js/places.js uit SW CORE_ASSETS (waren offline-bloat). SW-cache → v16.
- Verificatie: `node --check` op main.js + sw.js OK; preview index.html boot zonder console-fouten, weer/i18n/nav werken.

**Geblokkeerd (wacht op Jeroen):** Supabase RLS verifiëren (Supabase-dashboard) · branch hernoemen naar main (GitHub/Vercel-settings). Beide blokkeren de rest niet.

---

## 2026-05-19 — Setup
- ROADMAP.md, BACKLOG.md, WORKLOG.md vastgelegd na akkoord op roadmap + uitgewerkte backlog.
- Werkwijze: backlog van boven naar beneden; taak klaar als criterium gehaald én verificatie slaagt.
- Startpunt: Fase 0, bovenaan de backlog.
