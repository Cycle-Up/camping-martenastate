# Worklog — Martenastate Welkomstgids

Kort logboek, nieuwste bovenaan. Per turn: datum · taak · wat gedaan · resultaat · commit.

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
