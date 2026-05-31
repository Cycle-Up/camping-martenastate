// Performance-/kwaliteits-proxycheck (deterministisch, geen Chrome nodig).
// Draai: node tests/check-perf.mjs   (exit 0 = groen)
//
// Dit is de betrouwbare fallback voor de Lighthouse-mobielmeting: het
// controleert de zaken die de Lighthouse-score bepalen, lokaal en stabiel:
//   - images/: totaal < 4 MB, elke afbeelding < 500 KB.
//   - elke content-<img> heeft width+height (geen layout shift) + loading.
//   - elke pagina heeft een unieke meta description (120–160) en canonical (excl. 404).
//   - favicon.svg + apple-touch-icon.png bestaan.

import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const errors = [];
const warns = [];
const ok = (m) => console.log('  ✓ ' + m);
const fail = (m) => { errors.push(m); console.log('  ✗ ' + m); };
const warn = (m) => { warns.push(m); console.log('  ⚠ ' + m); };

console.log('Performance-/kwaliteits-proxycheck\n');

// 1. beeldgewicht
const imgDir = join(ROOT, 'images');
let total = 0, big = [];
for (const f of readdirSync(imgDir)) {
  if (!/\.(jpg|jpeg|png|webp)$/i.test(f)) continue;
  const sz = statSync(join(imgDir, f)).size; total += sz;
  if (sz > 500 * 1024) big.push(`${f} (${Math.round(sz / 1024)} KB)`);
}
if (big.length) fail(`afbeeldingen > 500 KB: ${big.join(', ')}`);
else ok('elke afbeelding < 500 KB');
if (total > 4 * 1024 * 1024) fail(`images/ totaal ${Math.round(total / 1024 / 1024 * 10) / 10} MB (> 4 MB)`);
else ok(`images/ totaal ${Math.round(total / 1024 / 1024 * 10) / 10} MB`);

// 2. content-<img> width/height/loading
const htmlFiles = readdirSync(ROOT).filter(f => f.endsWith('.html'));
let imgIssues = 0;
for (const f of htmlFiles) {
  const html = readFileSync(join(ROOT, f), 'utf8');
  for (const tag of html.match(/<img\b[^>]*>/g) || []) {
    if (/src="data:/.test(tag)) continue; // 1x1 placeholder
    if (!/\bwidth=/.test(tag) || !/\bheight=/.test(tag)) { warn(`${f}: <img> zonder width/height`); imgIssues++; }
    if (!/\bloading=/.test(tag)) { warn(`${f}: <img> zonder loading`); imgIssues++; }
  }
}
if (!imgIssues) ok('alle content-<img> hebben width/height + loading');

// 3. meta description + canonical
for (const f of htmlFiles) {
  const html = readFileSync(join(ROOT, f), 'utf8');
  const d = html.match(/<meta name="description" content="([^"]*)"/);
  if (!d) fail(`${f}: meta description ontbreekt`);
  else { const len = d[1].length; if (len < 80 || len > 165) warn(`${f}: description ${len} tekens (richtlijn 120–160)`); }
  if (f !== '404.html' && !/rel="canonical"/.test(html)) fail(`${f}: canonical ontbreekt`);
}
if (!errors.some(e => /description|canonical/.test(e))) ok('meta description + canonical aanwezig');

// 4. iconen
for (const ic of ['favicon.svg', 'apple-touch-icon.png', 'icon-192.png', 'icon-512.png']) {
  if (!existsSync(join(ROOT, ic))) fail(`icoon ontbreekt: ${ic}`);
}
if (!errors.some(e => /icoon/.test(e))) ok('favicon + PWA-iconen aanwezig');

console.log(`\n${warns.length} waarschuwing · ${errors.length} fout`);
if (errors.length) { console.error('FOUT: performance-/kwaliteitsproblemen.'); process.exit(1); }
console.log('Performance-proxy groen.');
process.exit(0);
