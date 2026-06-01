# Backlog — Martenastate Welkomstgids
Werk van boven naar beneden. Elke taak is zelfstandig afrondbaar en controleerbaar.
Keuzes verwerkt (2026-05-19): feedback → mailto jeroen@cycle-up.nl · gastenboek-beveiliging
ongewijzigd · Clarity niet installeren · favicon recolor naar huisstijl.

Alle autonome taken zijn afgerond. De volledige testsuite is groen
(`node tests/run.mjs`). Resterende punten vereisen jouw actie of een
ontwerpbeslissing — zie hieronder.

---
## 🙋 Voor Jeroen — jouw actie nodig (NIET autonoom; los op te pakken)
- [ ] Productie-branch hernoemen naar `main` (GitHub + Vercel settings)
- [ ] Vercel Analytics aanzetten in dashboard (snippet staat al op de site)
- [ ] Info/risico: gastenboek blijft ongewijzigd — anon-key kan INSERT + UPDATE; bij spam/misbruik later RLS hardenen
- [ ] Lighthouse mobiel ≥90 perf / ≥95 a11y (gemeten: Perf 77 · A11y 93 · BP 100 · SEO 100).
      Veilige fixes zijn gedaan (fonts niet-blokkerend, aria label-in-name, muted-contrast).
      De rest vereist KEUZES: perf → Google Fonts self-hosten + critical CSS;
      a11y → brand-eyebrow-kleur haalt 4.5:1 niet, heading-volgorde, <main>-landmark.
      Zeg het als je wil dat ik deze ontwerpkeuzes uitvoer.

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
- [x] Linkchecker-script — 2026-05-19 (tests/check-links.mjs; ving + fixte 2 dode links; exit 0)
- [x] Offline-/404-test — 2026-05-19 (tests/check-offline.mjs; CORE_ASSETS + fallback + 404 groen)
- [x] Performance-proxy + Lighthouse-meting — 2026-05-19 (tests/check-perf.mjs groen; live Lighthouse BP 100/SEO 100, perf 77/a11y 93 — restpunten = ontwerpkeuzes, naar 'Voor Jeroen')
- [x] Testrunner — 2026-05-19 (tests/run.mjs; hele suite groen)
- [x] CLAUDE.md / projectdoc — 2026-05-19 (structuur, i18n, deploy, SW-beleid, testsuite, jouw-actie)
