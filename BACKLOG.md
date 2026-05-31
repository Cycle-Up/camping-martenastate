# Backlog — Martenastate Welkomstgids
Werk van boven naar beneden. Elke taak is zelfstandig afrondbaar en controleerbaar.
Keuzes verwerkt (2026-05-19): feedback → mailto jeroen@cycle-up.nl · gastenboek-beveiliging
ongewijzigd · Clarity niet installeren · favicon recolor naar huisstijl.

## ── Fase 4 · Content & meertaligheid ──────────────────────────

## ── Fase 5 · Robuustheid & testsuite ──────────────────────────

- [ ] Linkchecker-script — klaar wanneer: `node tests/check-links.mjs` controleert álle externe links op echte 200 (incl. redirect-/content-check), exit 0 bij groen
- [ ] Offline-/404-test — klaar wanneer: check bevestigt dat de gids offline laadt met SW actief en 404.html bij onbekende paden verschijnt
- [ ] Lighthouse mobiel-meting — klaar wanneer: `npx lighthouse` mobiel ≥90 Perf / ≥95 A11y-BP-SEO; lukt headless Chrome niet, dan proxy-verificatie groen + vlag voor 1 handmatige DevTools-check
- [ ] Testrunner — klaar wanneer: `node tests/run.mjs` draait alle checks achter elkaar met één groen/rood-resultaat (= "de testsuite slaagt")
- [ ] CLAUDE.md / projectdoc (incl. SW-versiebeleid) — klaar wanneer: doc beschrijft structuur, i18n-systeem, deploy-flow (Vercel CLI), wanneer/hoe CACHE_NAME bumpt, de testsuite en de "jouw actie"-punten

---
## 🙋 Voor Jeroen — jouw actie nodig (NIET autonoom; los op te pakken)
- [ ] Productie-branch hernoemen naar `main` (GitHub + Vercel settings)
- [ ] Vercel Analytics aanzetten in dashboard (snippet staat al op de site)
- [ ] Optioneel: 1 Lighthouse-meting in Chrome DevTools als mijn npx-run geen headless Chrome vindt
- [ ] Info/risico: gastenboek blijft ongewijzigd — anon-key kan INSERT + UPDATE; bij spam/misbruik later RLS hardenen

---
## ✅ Afgerond
(zie WORKLOG.md voor details)

- [x] preview.html uit productie halen — 2026-05-19
- [x] places.js parking-emoji vervangen — 2026-05-19
- [x] Dode kaart-code besluit (dormant) — 2026-05-19
- [x] photo-luchtfoto-1.png + 5 ongebruikte beelden verwijderd — 2026-05-19
- [x] Overige zware afbeeldingen comprimeren (12 MB → 2,7 MB) — 2026-05-19
- [x] width/height + lazy op alle content-<img> — 2026-05-19
- [x] Hero/feature responsive — 2026-05-19
- [x] apple-touch-icon (180/192/512) — 2026-05-19
- [x] JSON-LD structured data — 2026-05-19
- [x] Self-canonical per pagina — 2026-05-19
- [x] Meta-description-audit — 2026-05-19
- [x] Lodgify-widget EN/DE-labels — 2026-05-19
- [x] Feedbackformulier-bestemming fixen — 2026-05-19 (mailto jeroen@cycle-up.nl)
- [x] Boeking-CTA consistent over pagina's — 2026-05-19 (rode "Boek je plek" op index/verblijf/omgeving)
- [x] "Vandaag/seizoen"-blok → boeken — 2026-05-19 (subtiele link in vandaag-widget)
- [x] Gastenboek-systeemteksten i18n — 2026-05-19 (lege-staat/errors/datum volgen taal; +refreshGuestbook bij toggle)
- [x] Favicon + iconen recolor — 2026-05-19 (huisstijl-mark, live v20)
- [x] Mobile actiebar verduidelijken — 2026-05-19 (action.route → Adres/Address/Adresse; geen overflow 320px)
- [x] 404-label fixen — 2026-05-19 (Open de kaart → Naar de omgeving, 3 talen)
- [x] Taalknoppen a11y — 2026-05-19 (aria-pressed schakelt mee met actieve taal)
- [x] Tekst-/stijlpass per taal — 2026-05-19 (scan schoon; 2 EN-stijlfixes; pariteit 1078)
- [x] Galerij robuust + uitbreidbaar — 2026-05-19 (onerror-fallback aanwezig; LEES_MIJ.txt geactualiseerd)
- [x] i18n-/HTML-validatiescript — 2026-05-19 (tests/check-i18n.mjs; ving + fixte ontbrekende key vb.price.note; exit 0)
