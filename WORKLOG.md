# Worklog — Martenastate Welkomstgids

Kort logboek, nieuwste bovenaan. Per turn: datum · taak · wat gedaan · resultaat · commit.

---

## 2026-09-28 - Tekst landgoedbeheer ✅ live (SW v33)
Op verzoek: "Sinds 2000 beheert It Fryske Gea het landgoed ecologisch" vervangen door "Sinds 2000
wordt het landgoed op professionele wijze ecologisch beheerd" (`home.estate.p2`, NL/EN/DE +
fallback in index.html). Andere vermeldingen van It Fryske Gea (excursies) ongewijzigd.

## 2026-07-13 — Juiste WiFi + interactief wifi-venster ✅ live (SW v31)
- **Verkeerde wifi vervangen** — was "Martenastate-Gast/MartenastateGast2024"; nu **Ziggo 5795367 /
  stk43MhvzhLhtzjs** voor B&B's + Túnmanswente (camping bewust géén wifi). Aangepast op: index-
  aankomstpaneel, pocket, FAQ (verblijf) + i18n (3 talen).
- **Interactief wifi-venster** (`initWifiModal`, patroon van contact-venster): netwerknaam (tik=kopieer),
  wachtwoord "tik om te tonen" → tik=kopieer, **Deel wifi** (Web Share API, fallback kopieer),
  **Toon QR-code** (WiFi-QR, scan = direct verbinden). Trigger `[data-wifi]` op aankomstpaneel + pocket.
- **QR offline & privacy-veilig**: gevendorde `js/qrcode.js` (Kazuhiko Arase, MIT) — QR wordt lokaal
  gegenereerd, wachtwoord gaat nooit naar een externe dienst. In SW-cache. 9 nieuwe `wifi.*`-keys (3 talen).
- End-to-end getest in browser (desktop + mobiel 375px): venster opent, wachtwoord toont, QR rendert,
  past op mobiel zonder overflow. Testsuite groen; gedeployed + prod geverifieerd.
- ⚠️ **Te bevestigen:** SSID staat als "Ziggo 5795367" (mét spatie, zoals aangeleverd). Ziggo-netwerknamen
  zijn vaak zónder spatie — als de QR niet verbindt, moet de exacte SSID (spatie/geen spatie) worden gecheckt.
- Gastenboek: Supabase nog offline t.t.v. deze wijziging (restore door Jeroen liep nog).

## 2026-07-13 — Gastenboek keep-alive (Vercel Cron) ✅ live
Op verzoek: gratis Supabase pauzeert na ~7 dagen inactiviteit → gastenboek valt uit. Opgelost met een
Vercel Cron (`vercel.json`: `0 6 * * *`) die `api/keepalive.js` 1×/dag aanroept; die doet een lichte
leesquery op de gastenboek-tabel zodat het project actief blijft. Endpoint live getest: reageert 200
(nu `ok:false` omdat Supabase nog gepauzeerd is — zodra Jeroen het project herstelt, houdt de cron het
wakker). Anon-key stond al publiek; geen geheimen blootgesteld. Frontend-resilience (time-out + cache)
blijft als vangnet.

---

## 2026-06-02 — Mobiel-optimalisatie (audit 320 + 390px) ✅ live (SW v30)
Brede mobiele audit via preview-eval (overflow, tap-targets, font-sizes, modal, menu) op iPhone-SE (320)
en standaard (390) breedte. Bevindingen + fixes:
- **Pocket-pagina overflowde ~10px op 320px** — lange `<dd>`-waarden (contact/wifi) in `.pocket-grid`
  krompen niet. Fix: `min-width:0` + `overflow-wrap:anywhere` op dd, `minmax(0,130px)`-kolom, en
  smallere kolommen <380px. Nu 0 overflow.
- **Tap-targets:** footer-navigatielinks waren 17px → mobiele regel naar **44px**; taalknoppen op
  kleine schermen (≤480px) van 38px → **44px**.
- **Geverifieerd OK (geen wijziging nodig):** geen horizontale overflow op overige 8 pagina's (320/390);
  form-inputs 16px (geen iOS-zoom); action-bar 56px; hamburgermenu opent correct (links 56px);
  contact-keuzevenster rendert netjes (272px breed, 104px-opties); afbeeldingen al w/h+lazy.
- Volledige testsuite groen; gedeployed + prod geverifieerd.

---

## 2026-06-02 — Wandelroutes opschonen + officiële regio-sites ✅ live (SW v29)
- **Niet-werkende "Open route in Maps"-knoppen verwijderd** bij de wandelroutes (omgeving.html, r1/r2/r3/r5
  — de Google-Maps-route klopte niet). Jabikspaad-knop ("Bekijk officiële site") blijft.
- **Officiële wandelroute-pagina's toegevoegd** in de wandeltab (source-credit): Visit Leeuwarden
  (`/blogs/wandelen-in-leeuwarden`) + Friesland.nl (`/1000-routes/wandelen`). Tracking-params gestript.
- **Algemene regio-callout** net onder de hero: verwijst naar de officiële sites van gemeente
  (visitleeuwarden.com/nl) en provincie (friesland.nl/nl) — "actuele evenementenkalender". Keys
  `omg.region.h/body` + `omg.walk.source` in 3 talen.
- Linkcheck groen (nieuwe URL's 200); volledige suite groen; gedeployed + prod geverifieerd.

---

## 2026-06-02 — Lighthouse perf+a11y (na /goal "voltooi backlog") ✅ live
- **Perf — Google Fonts self-hosted (SW v27):** 24 woff2 (latin+latin-ext) lokaal, font-display swap,
  externe `fonts.googleapis`-link + preconnects weg op alle 9 pagina's; `css/fonts.css` in SW-cache.
  Drie families (Jakarta/Lora/Caveat) renderen identiek geverifieerd in preview.
- **A11y — <main>-landmark** op de 6 pagina's die het misten (geen `body>`-selectors → veilig).
- **A11y — eyebrow-contrast:** `.section-eyebrow`/`.arrival-eyebrow` van Martena Rood (#E36447, 2,95:1)
  naar nieuw token `--eyebrow-ink #B53D20` (~5:1). gb-hero (op foto) + hero-eyebrow (op donker) ongemoeid.
- **A11y — heading-volgorde:** alle `<h4>` → `<h3 class="lbl">`; h4-CSS-selectors → `.lbl`
  (specificiteit behoudt exacte grootte). 0 sprongen meer; visueel pixel-identiek geverifieerd
  (callout 18px, footer 12px, restaurantnaam 18px, routetitel 16px). SW v28.
- Volledige testsuite groen na elke stap; 4× gedeployed + prod geverifieerd.
- **Open (jouw kant):** Lighthouse opnieuw meten; B&B-fotobestand aanleveren; branch→main; Vercel Analytics.

---

## 2026-06-02 — Feedback-ronde (camping/B&B/foto's) ✅ live (SW v26)
- **Natuurkampeerkaart + Stichting De Groene Koepel overal weg** — Kampeerkaart-callout + paklijst-regel
  (`verblijf.html`), camping-feit (`boeken.html`); 7 i18n-keys opgeruimd (3 talen). Náám
  "natuurkampeerterrein" bleef. Prod-check: 0 treffers.
- **Vuurkorf-tekst** — gastvrij callout in camping-sectie: vuurkorf te leen + kistje hout € 7,50;
  faciliteit "Kampvuur" → "in een vuurkorf (eigen of te leen)". Keys `vb.camping.fire.h/body` (3 talen).
- **Onscherpe wandelfoto vervangen** — was 300×200 (blurry in 21/9-kader); nu Jeroens foto 1440×480.
- **Misleidende kasteelfoto bij B&B-kamer weg** — `verblijf.html` toont nu `photo-bnb.jpg` (interim
  tot Jeroens nieuwe B&B-foto als bestand binnen is). Eyebrow `boeken.bb.eyebrow` → "B&B Stinzenflora".
- **Wandelroute-links eerlijk gecheckt** — `check-links.mjs`: alle 44 externe links HTTP 200 (incl. 5
  wandelroutes). Nuance: bereikbaarheid getest, niet of elke Maps-route geografisch optimaal is.
- i18n-pariteit 1085/1085/1085; testsuite groen; gedeployed + prod geverifieerd.
- **Open (jouw actie):** nieuwe B&B-kamerfoto als BESTAND aanleveren → dan swap ik de interim.

---

## 2026-06-01 — Gastenboek volledig hersteld ✅
Na de project-restore door Jeroen leefde de host weer, maar de API gaf `PGRST205`
(tabel `gastenboek` weg na lange pauze). SQL aangeleverd in `supabase/gastenboek.sql`
(tabel + RLS lezen/plaatsen/liken). Jeroen heeft 'm gerund → **REST geeft nu HTTP 200
met alle 11 berichten** (data bleek tóch behouden/teruggezet). End-to-end geverifieerd
in preview: gastenboekpagina rendert 11 kaarten, geen foutmelding, juiste inhoud.
Frontend ongewijzigd nodig (time-out + cache-fallback uit vorige turn blijven als vangnet).
**Alle vier opdrachtdelen nu compleet en live.**

---

## 2026-06-01 — Twee contactpersonen + twee adressen + gastenboek-fix
**Twee contactpersonen logisch overal** ✅ — geen algemeen nummer meer. Camping = Robin Alkema (+31 6 83 60 65 21), B&B = Jeroen Dijkstra (+31 85 080 5048), beide telefonisch én WhatsApp.
- **Keuzevenster** gebouwd: klik op "Bellen"/WhatsApp → modaal "Bel/App je voor de B&B of de camping?" met twee opties (`tel:` resp. `wa.me`). `CONTACTS` + `initContactChooser()` in main.js; CSS `.contact-modal/.contact-sheet/.contact-opt`; i18n-keys in 3 talen. Sluit op backdrop/Esc/knop.
- **Bekabeld**: mobiele action-bar "Bellen" op 8 pagina's → keuzevenster; homepage arrival-contact (tel+WhatsApp) → keuzevenster + sub toont beide personen; boeken-helpblok (WhatsApp+bellen) → keuzevenster.
- **Footer (7 pagina's)**: één nummer → twee gelabelde regels (Camping — Robin / B&B — Jeroen).
- **Bodyteksten (i18n, 3 talen)**: faq.a.help, boeken.help.text/whatsapp, privacy.body.contact, pocket (Contact-rij + noodnummers) → beide contacten. Camping-specifieke plekken (verblijf camping-sectie) blijven Robin.
**Twee adressen** ✅ — footer toonde al beide (Martenawei 2 = B&B/landgoed; De Wier 7A = camping). Camping-Google-Maps-link toegevoegd in verblijf "Hoe bereik je ons / Met de auto" (nieuwe key `maps.open`, 3 talen).
**Grote Wielen-fietsroute verwijderd** ✅ — niet-werkende route uit omgeving.html; routetelling "Acht"→"Zeven" (3 talen).
**Gastenboek** ⚠️ — frontend robuuster: `loadEntries()` met 8s time-out (AbortController) zodat "laden…" niet blijft hangen; vriendelijker, niet-verwijtende foutmelding (3 talen). **Rootcause = gepauzeerd Supabase-project** (host `ubhqqvassnkyfsftrmyh.supabase.co` resolvet niet, curl http_code 000). Dit kan ik NIET autonoom herstellen → jouw actie in het Supabase-dashboard (project hervatten). Zie BACKLOG "Voor Jeroen".
**Verificatie** — `node tests/run.mjs`-onderdelen groen (i18n-pariteit 1089/1089/1089, offline SW v24, perf). Keuzevenster live getest in preview (camping→Robin, B&B→Jeroen; tel én wa.me; Esc sluit). SW → v24. Gedeployed naar productie + geverifieerd (data-contact, dubbele footer, initContactChooser, v24 live).

---

## 2026-05-19 — Fase 5 compleet: testsuite + Lighthouse + docs
**Testsuite** ✅ — tests/check-links.mjs (ving + fixte 2 dode links: natuurmuseum `www.`→geen www; statenstinzen jelsum `dokkummer`→`dokkumer`), check-offline.mjs (CORE_ASSETS/fallback/404 groen), check-perf.mjs (beeldgewicht 2,6 MB, w/h/lazy, meta, canonical, iconen groen), run.mjs (orkestreert alles). `node tests/run.mjs` = volledig groen.
**Lighthouse mobiel (live)** — gemeten: BP 100, SEO 100 ✅; Perf 74→77, A11y 93. Veilige fixes: Google Fonts niet-blokkerend (media=print onload) op 9 pagina's; action-bar aria-labels weg (label-in-name → fixte label-mismatch); --fg-mute #6F6A60→#5E594F (contrast). Restpunten halen ≥90/≥95 niet en vereisen ONTWERPKEUZES (fonts self-hosten; brand-eyebrow-kleur; heading-volgorde; <main>-landmark) → eerlijk niet afgevinkt, verschoven naar 'Voor Jeroen'. SW → v23.
**CLAUDE.md** ✅ — volledige projectdoc (structuur, i18n, deploy via Vercel CLI, SW-versiebeleid, testsuite, jouw-actie-punten).
**Status:** autonome backlog leeg; ROADMAP Fase 0–5 geïmplementeerd; testsuite groen. Resterend = jouw-actie/ontwerpkeuzes.

---

## 2026-05-19 — Fase 5 start: i18n/HTML-validatiescript
**tests/check-i18n.mjs** ✅ — controleert: NL=EN=DE-pariteit, alle HTML data-i18n-keys bestaan, places.js/routes.js _nl→_en/_de compleet, HTML-sanity (1× h1, lang-attr, canonical behalve 404, img-alt). Exit 0 groen / 1 bij fouten.
- **Ving een echte bug**: `vb.price.note` werd in verblijf.html gebruikt (data-i18n-html) maar ontbrak in translations → EN/DE zagen NL-tekst. Key toegevoegd in 3 talen (nu 1079 elk). Script daarna groen.
- SW → v22 (translation-fix live).

---

## 2026-05-19 — Fase 4 compleet: tekstpass + galerij
**Tekst-/stijlpass** ✅ — automatische scan: geen onvertaalde lekkage (NL==EN/DE matches zijn eigennamen/internationale termen), geen dubbele spaties/leestekens. Gerichte EN-stijlfixes: verblijf.subtitle ("Whatever you came to do?" → "What you do here is up to you."); faq.a.kids afgestemd op de speelse NL/DE-toon (gnomes). Pariteit blijft 1078/1078/1078.
**Galerij robuust** ✅ — alle 10 gallery-srcs bestaan; onerror-fallback op alle 8 tegels (gekleurde placeholder bij ontbrekend beeld); CSS-placeholder aanwezig. images/LEES_MIJ.txt herschreven: was verouderd (oude placeholdernamen, "gebruikt placeholders"=onwaar) → nu accuraat pad om (seizoens)foto's te vervangen/toevoegen incl. SW-bump + testsuite-check.
SW → v21.

---

## 2026-05-19 — Fase 4: actiebar + 404-label + a11y
**Mobile actiebar** ✅ — `action.route` "Route" → "Adres"/"Address"/"Adresse"; routes-knop blijft "Routes". Getest 320px: Bellen·Adres·Routes·Vragen, geen overflow. Onderscheid nu duidelijk.
**404-label** ✅ — `error.btn.map` "Open de kaart" → "Naar de omgeving"/"To the area"/"Zur Umgebung"; knop linkt naar omgeving.html; statische fallback in 404.html ook bijgewerkt.
**Taalknoppen a11y** ✅ — `aria-pressed` op lang-toggle in applyTranslations (main.js); getest: nl→de schakelt aria-pressed correct mee.

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
