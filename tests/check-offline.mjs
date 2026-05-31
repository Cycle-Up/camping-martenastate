// Offline-/404-gereedheid (statisch, geen browser nodig).
// Draai: node tests/check-offline.mjs   (exit 0 = groen)
//
// Controleert dat de service worker correct is opgezet voor offline gebruik:
//   - sw.js definieert CACHE_NAME en CORE_ASSETS.
//   - elk pad in CORE_ASSETS bestaat echt op schijf.
//   - sw.js heeft een offline-fallback naar /index.html.
//   - 404.html bestaat en bevat de 404-pagina-inhoud.

import { readFileSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const errors = [];
const ok = (m) => console.log('  ✓ ' + m);
const fail = (m) => { errors.push(m); console.log('  ✗ ' + m); };

console.log('Offline-/404-gereedheid\n');

const sw = readFileSync(join(ROOT, 'sw.js'), 'utf8');

const cacheName = sw.match(/CACHE_NAME\s*=\s*['"]([^'"]+)['"]/);
if (cacheName) ok(`CACHE_NAME = ${cacheName[1]}`);
else fail('CACHE_NAME niet gevonden in sw.js');

const coreBlock = sw.match(/CORE_ASSETS\s*=\s*\[([\s\S]*?)\]/);
if (!coreBlock) fail('CORE_ASSETS niet gevonden in sw.js');
else {
  const paths = [...coreBlock[1].matchAll(/['"]([^'"]+)['"]/g)].map(m => m[1]);
  let missing = 0;
  for (const p of paths) {
    const rel = p === '/' ? 'index.html' : p.replace(/^\//, '');
    if (!existsSync(join(ROOT, rel))) { fail(`CORE_ASSET ontbreekt op schijf: ${p}`); missing++; }
  }
  if (!missing) ok(`alle ${paths.length} CORE_ASSETS bestaan op schijf`);
}

if (/caches\.match\(['"]\/index\.html['"]\)/.test(sw)) ok('offline-fallback naar /index.html aanwezig');
else fail('geen offline-fallback (caches.match("/index.html")) in sw.js');

if (existsSync(join(ROOT, '404.html'))) {
  const h = readFileSync(join(ROOT, '404.html'), 'utf8');
  if (/404/.test(h) && /href="index\.html"/.test(h)) ok('404.html aanwezig met terug-naar-home link');
  else fail('404.html mist 404-inhoud of home-link');
} else fail('404.html ontbreekt');

console.log('');
if (errors.length) { console.error(`FOUT: ${errors.length} probleem(en).`); process.exit(1); }
console.log('Offline-/404-gereed.');
process.exit(0);
