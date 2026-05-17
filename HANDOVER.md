# Handover voor Claude Code

Hallo Claude! De gebruiker (Jeroen) heeft gevraagd om een overdracht (handover) te schrijven zodat jullie vanaf hier samen verder kunnen werken aan dit project.

## Project Status & Overzicht
Dit is een statische frontend website voor Martenastate in Koarnjum, gebouwd met vanilla HTML, CSS en JavaScript.
Recent is er een activiteitenpagina (`activiteiten.html`) toegevoegd met informatie over wandelingen, fietsroutes, musea en uitjes in de omgeving.

## Belangrijke Projectdetails & Geheugen
* **Architectuur**: Er is geen build-proces, bundler of package manager. Het project draait op pure (vanilla) webtechnologieën. Er mag geen `package.json` aan de repository worden toegevoegd tenzij expliciet gevraagd.
* **i18n (Vertalingen)**: Er wordt gebruik gemaakt van een custom i18n-systeem via `js/translations.js`. De `t()` functie retourneert ruwe (niet-geëscapete) strings. Zorg ervoor dat je altijd `textContent` gebruikt, of de globale `escapeHTML()` functie (in `js/main.js`), voordat je tekst via `innerHTML` in de DOM plaatst om XSS-kwetsbaarheden te voorkomen.
* **Kaarten**: Voor interactieve kaarten wordt Leaflet gebruikt. De bijbehorende logica en data bevinden zich in `js/places.js`, `js/routes.js` en `js/main.js`.
* **Lokale Ontwikkeling**: Om de website te bekijken kun je een simpele statische server starten, bijvoorbeeld: `python3 -m http.server 3000`.
* **Testen**:
  * Unit tests (indien aanwezig in `tests/` of `js/tests/`) draaien via de native test runner van Node.js (`node --test`).
  * Omdat er geen modulebundler is, maken de bestanden gebruik van de globale scope. Om functies testbaar te maken in Node.js, worden ze vaak onderaan het bestand aan `window` gehangen binnen een `if (typeof window !== 'undefined')` blok.
  * Testen vereist vaak het mocken van DOM-elementen en globale objecten (`window`, `document`, `localStorage`), wat gedaan kan worden met de Node.js `vm` module of handmatige mocks.
  * Tijdelijke ad-hoc testscripts (zoals Playwright voor UI tests) mogen niet worden gecommit.

## Laatste Git Status
De laatste wijzigingen, waaronder de activiteitenpagina, zijn reeds gecommit. De repository is momenteel "clean".

## Volgende Stappen
Vraag aan de gebruiker waar hij/zij verder aan wil werken (bijv. nieuwe features, bugs oplossen, of refactoring) en gebruik bovenstaande context om direct productief te zijn!
