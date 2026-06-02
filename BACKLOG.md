# Backlog — Martenastate Welkomstgids
Werk van boven naar beneden. Elke taak is zelfstandig afrondbaar en controleerbaar.
Keuzes verwerkt (2026-05-19): feedback → mailto jeroen@cycle-up.nl · gastenboek-beveiliging
ongewijzigd · Clarity niet installeren · favicon recolor naar huisstijl.

Status: contact-/adres-/gastenboek-ronde afgerond en live. Nieuwe feedback-ronde
(2026-06-02) staat hieronder bovenaan — uit te voeren.

---
## 📋 Feedback-ronde 2026-06-02 — uit te voeren

### Uitgevoerd 2026-06-02 ✅ (live, SW v26)
- [x] **Natuurkampeerkaart + "Stichting De Groene Koepel" overal verwijderd** — Kampeerkaart-callout
      en paklijst-regel uit `verblijf.html`, camping-feit uit `boeken.html`; 7 i18n-keys opgeruimd
      (3 talen). De camping-náám "natuurkampeerterrein" bleef staan. Geverifieerd: 0 treffers op prod.
- [x] **Vuurkorf-tekst toegevoegd** — gastvrij callout in de camping-sectie (`verblijf.html`):
      vuurkorf te leen + kistje hout € 7,50. Faciliteit "Kampvuur" bijgewerkt naar "in een vuurkorf
      (eigen of te leen)". Nieuwe keys `vb.camping.fire.h/body` (3 talen).
- [x] **Onscherpe wandelfoto vervangen** — was 300×200 (opgerekt → blurry); nu Jeroens foto
      1440×480 (`photo-wandelen-1.jpg`), past in het 21/9-kader. Alt-tekst bijgewerkt (3 talen).
- [x] **Misleidende kasteelfoto bij B&B-kamer weg** — `verblijf.html` toont nu `photo-bnb.jpg`
      i.p.v. `photo-kasteeltje.jpg`. ⏳ INTERIM tot Jeroens nieuwe B&B-foto als bestand binnen is.
- [x] **Eyebrow herformuleerd** — `boeken.bb.eyebrow`: "In het kasteeltje · B&B" → **"B&B Stinzenflora"** (3 talen).

### Eerlijk gecheckt (2026-06-02)
- [x] **Wandelroute-links gecontroleerd** — `node tests/check-links.mjs`: alle 44 externe links geven
      HTTP 200, inclusief de 5 wandelroutes (Maps-links r1/r2/r3/r5, jabikspaad.nl r4, itfryskegea.nl).
      **Nuance:** getest = link *bereikbaar*/pagina laadt. NIET getest = of elke Google-Maps-route
      geografisch de mooiste/correcte wandelroute teruggeeft (vergt handmatige inspectie ter plekke).

---
## 🙋 Voor Jeroen — jouw actie nodig (NIET autonoom; los op te pakken)
- [ ] **Aanleveren: nieuwe B&B-kamerfoto als BESTAND** — je foto staat nu in de chat, maar ik heb het
      bestand nodig. Zet 'm in je Downloads-map (zoals je de wandelfoto deed) en geef een seintje;
      dan swap ik de interim `photo-bnb.jpg` op `verblijf.html` voor jouw echte foto.
      (De wandelfoto is al verwerkt ✅.)
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
