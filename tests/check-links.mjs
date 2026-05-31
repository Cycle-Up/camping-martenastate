// Externe-linkchecker voor de Martenastate-gids.
// Draai: node tests/check-links.mjs   (exit 0 = geen harde fouten)
//
// Haalt alle externe href/src uit de HTML, filtert ruis (eigen site, Maps,
// API's, fonts, WhatsApp), en controleert elke link op een echte 200.
// - 404/410/5xx (geen 503) of netwerkfout  → HARDE FOUT (exit 1)
// - 403/429/503 (bot-block/rate-limit)      → waarschuwing (geen fout)
// - redirect naar de homepage van het domein → waarschuwing (mogelijk dode
//   diepe link, zoals de oude wandelnet-val)

import { readFileSync, readdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const SELF = 'camping-martenastate-bay.vercel.app';
const SKIP_HOSTS = [SELF, 'maps.google.com', 'wa.me', 'fonts.googleapis.com',
  'fonts.gstatic.com', 'schema.org', 'www.w3.org', 'api.open-meteo.com',
  'app.lodgify.com'];
const SKIP_RE = /supabase\.co|\/_vercel\//;

// 1. links verzamelen uit HTML
const links = new Set();
for (const f of readdirSync(ROOT).filter(f => f.endsWith('.html'))) {
  const html = readFileSync(join(ROOT, f), 'utf8');
  for (const m of html.matchAll(/(?:href|src)="(https?:\/\/[^"]+)"/g)) {
    let url = m[1].replace(/[\\)]+$/, '');
    if (url.includes('${')) continue; // JS-template, geen echte URL
    try {
      const u = new URL(url);
      if (SKIP_HOSTS.includes(u.hostname) || SKIP_RE.test(url)) continue;
      links.add(url);
    } catch { /* ongeldige URL, overslaan */ }
  }
}
const list = [...links].sort();
console.log(`Externe-linkcheck: ${list.length} links\n`);

async function check(url) {
  const ctrl = new AbortController();
  const to = setTimeout(() => ctrl.abort(), 12000);
  try {
    let res = await fetch(url, { redirect: 'follow', signal: ctrl.signal,
      headers: { 'User-Agent': 'Mozilla/5.0 (link-check Martenastate)' } });
    if (res.status === 405 || res.status === 501) {
      res = await fetch(url, { method: 'GET', redirect: 'follow', signal: ctrl.signal,
        headers: { 'User-Agent': 'Mozilla/5.0 (link-check Martenastate)' } });
    }
    const finalU = new URL(res.url);
    const src = new URL(url);
    const redirectedToRoot = finalU.pathname === '/' && src.pathname.length > 1;
    return { url, status: res.status, finalUrl: res.url, redirectedToRoot };
  } catch (e) {
    return { url, status: 0, error: e.name === 'AbortError' ? 'timeout' : e.message };
  } finally { clearTimeout(to); }
}

// 2. met beperkte concurrency
const results = [];
const QUEUE = [...list];
async function worker() { while (QUEUE.length) results.push(await check(QUEUE.shift())); }
await Promise.all(Array.from({ length: 6 }, worker));

// 3. classificeren
const hardFail = [], warn = [], good = [];
for (const r of results) {
  if (r.status === 200 && !r.redirectedToRoot) good.push(r);
  else if (r.status === 200 && r.redirectedToRoot) warn.push({ ...r, why: 'redirect → homepage' });
  else if ([403, 429, 503].includes(r.status)) warn.push({ ...r, why: 'bot-block/rate-limit (' + r.status + ')' });
  else hardFail.push(r);
}
good.forEach(r => console.log('  ✓ 200  ' + r.url));
warn.forEach(r => console.log('  ⚠ ' + (r.why) + '  ' + r.url + (r.finalUrl && r.finalUrl !== r.url ? '  → ' + r.finalUrl : '')));
hardFail.forEach(r => console.log('  ✗ ' + (r.status || r.error) + '  ' + r.url));

console.log(`\n${good.length} ok · ${warn.length} waarschuwing · ${hardFail.length} fout`);
if (hardFail.length) { console.error('FOUT: dode externe links.'); process.exit(1); }
console.log('Geen dode links.');
process.exit(0);
