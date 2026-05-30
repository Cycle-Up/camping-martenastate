# Roadmap — Martenastate Welkomstgids

Statische, meertalige (NL/EN/DE) welkomstgids voor camping & B&B Martenastate
in Koarnjum, Friesland. Vanilla HTML/CSS/JS, geen build-stap. Deploy via
GitHub → Vercel (`camping-martenastate-bay.vercel.app`).

## Fase 0 — Hygiëne & fundament
Opruimen en veiligstellen vóór we uitbreiden.
- preview.html-ballast wegwerken
- icoon-consistentie (places.js)
- dode kaart-code besluiten
- Supabase RLS verifiëren
- repo-/branchhygiëne

## Fase 1 — Performance & techniek
De site snel en solide maken op mobiel.
- afbeeldingen comprimeren + responsive
- layout-shift wegnemen (width/height)
- apple-touch-icon / PWA afmaken
- Lighthouse-pass (mobiel)

## Fase 2 — Vindbaarheid (SEO + data)
Beter gevonden worden en zien hoe gasten de site gebruiken.
- JSON-LD structured data
- self-canonical + meta-audit
- Vercel Analytics activeren + Clarity-baseline

## Fase 3 — Conversie & boekingen
Van bezoeker naar boeking, wrijvingsloos.
- Lodgify-widget EN/DE
- boeking-CTA's consistent over pagina's
- funnel-review via Clarity-heatmaps

## Fase 4 — Content & meertaligheid afmaken
- mobile actiebar verduidelijken
- i18n-volledigheid (incl. places/routes)
- tekstuele correcties per taal
- seizoensgebonden content / galerij

## Fase 5 — Robuustheid & onderhoud
- geautomatiseerde linkchecker
- HTML/i18n-validatiescript
- SW-versiebeleid documenteren
- projectdocumentatie (CLAUDE.md)
- offline-/404-test

---
*Goedgekeurd 2026-05-19. Werkwijze: BACKLOG.md van boven naar beneden; taak klaar
als criterium gehaald én verificatie slaagt; WORKLOG.md per turn bijwerken.*
