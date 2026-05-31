// i18n- + HTML-validatie voor de Martenastate-gids.
// Draai: node tests/check-i18n.mjs   (exit 0 = groen, 1 = fouten)
//
// Controleert:
//   1. translations.js: nl/en/de hebben identieke key-sets (pariteit).
//   2. Elke data-i18n(-html/-alt/-placeholder) key in de HTML bestaat in translations.
//   3. places.js/routes.js: elk _nl-veld heeft ook _en en _de.
//   4. HTML-sanity per pagina: precies één <h1>, <html lang>, canonical
//      (behalve 404.html), en geen <img> zonder alt-attribuut.

import { readFileSync, readdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import vm from 'node:vm';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const errors = [];
const ok = (msg) => console.log('  ✓ ' + msg);
const fail = (msg) => { errors.push(msg); console.log('  ✗ ' + msg); };

function loadGlobals(relPath, names) {
  const code = readFileSync(join(ROOT, relPath), 'utf8');
  const ctx = {};
  vm.createContext(ctx);
  vm.runInContext(code + '\n;__out={' + names.map(n => `${n}:typeof ${n}!=='undefined'?${n}:undefined`).join(',') + '};', ctx);
  return ctx.__out;
}

console.log('i18n + HTML validatie\n');

// 1. translations-pariteit
const { translations } = loadGlobals('js/translations.js', ['translations']);
const langs = ['nl', 'en', 'de'];
for (const l of langs) if (!translations?.[l]) fail(`translations.${l} ontbreekt`);
const keysByLang = Object.fromEntries(langs.map(l => [l, new Set(Object.keys(translations[l] || {}))]));
const nlKeys = keysByLang.nl;
console.log(`translations: ${nlKeys.size} NL-keys`);
for (const l of ['en', 'de']) {
  const missing = [...nlKeys].filter(k => !keysByLang[l].has(k));
  const extra = [...keysByLang[l]].filter(k => !nlKeys.has(k));
  if (missing.length) fail(`${l}: ${missing.length} keys ontbreken t.o.v. NL (bv. ${missing.slice(0, 3).join(', ')})`);
  if (extra.length) fail(`${l}: ${extra.length} keys extra t.o.v. NL (bv. ${extra.slice(0, 3).join(', ')})`);
  if (!missing.length && !extra.length) ok(`${l}: pariteit met NL (${keysByLang[l].size})`);
}

// 2. data-i18n keys in HTML bestaan
const htmlFiles = readdirSync(ROOT).filter(f => f.endsWith('.html'));
const i18nRe = /data-i18n(?:-html|-alt|-placeholder)?="([^"]+)"/g;
let usedKeys = new Set();
for (const f of htmlFiles) {
  const html = readFileSync(join(ROOT, f), 'utf8');
  let m;
  while ((m = i18nRe.exec(html))) usedKeys.add(m[1]);
}
const unknown = [...usedKeys].filter(k => !nlKeys.has(k));
if (unknown.length) fail(`HTML gebruikt ${unknown.length} onbekende i18n-keys: ${unknown.slice(0, 5).join(', ')}`);
else ok(`alle ${usedKeys.size} HTML i18n-keys bestaan in translations`);

// 3. places.js / routes.js _de-velden
function checkDataFile(rel, arrays) {
  const g = loadGlobals(rel, arrays);
  for (const arrName of arrays) {
    const arr = g[arrName];
    if (!Array.isArray(arr)) { fail(`${rel}: ${arrName} niet gevonden`); continue; }
    let bad = 0;
    for (const item of arr) {
      for (const k of Object.keys(item)) {
        if (k.endsWith('_nl')) {
          const base = k.slice(0, -3);
          if (item[base + '_en'] === undefined) bad++;
          if (item[base + '_de'] === undefined) bad++;
        }
      }
    }
    if (bad) fail(`${rel}: ${arrName} mist ${bad} _en/_de tegenhangers`);
    else ok(`${rel}: ${arrName} compleet (_nl/_en/_de)`);
  }
}
checkDataFile('js/places.js', ['mapPlaces']);
checkDataFile('js/routes.js', ['walkingRoutes', 'cyclingRoutes']);

// 4. HTML-sanity
for (const f of htmlFiles) {
  const html = readFileSync(join(ROOT, f), 'utf8');
  const h1 = (html.match(/<h1[\s>]/g) || []).length;
  if (h1 !== 1) fail(`${f}: ${h1} <h1> (verwacht 1)`);
  if (!/<html[^>]*\slang=/.test(html)) fail(`${f}: <html lang> ontbreekt`);
  if (f !== '404.html' && !/rel="canonical"/.test(html)) fail(`${f}: canonical ontbreekt`);
  // <img> zonder alt
  const imgs = html.match(/<img\b[^>]*>/g) || [];
  const noAlt = imgs.filter(t => !/\balt=/.test(t)).length;
  if (noAlt) fail(`${f}: ${noAlt} <img> zonder alt`);
}
if (!errors.some(e => /<h1>|lang>|canonical|alt/.test(e))) ok(`HTML-sanity groen voor ${htmlFiles.length} pagina's`);

console.log('');
if (errors.length) {
  console.error(`FOUT: ${errors.length} probleem(en).`);
  process.exit(1);
}
console.log('Alles groen.');
process.exit(0);
