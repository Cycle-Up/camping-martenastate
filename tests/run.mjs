// Testrunner — draait de hele testsuite achter elkaar.
// Draai: node tests/run.mjs   (exit 0 = alles groen)
//
// Volgorde: deterministische checks eerst (i18n, offline, perf), dan de
// netwerk-afhankelijke linkcheck. De suite slaagt alleen als alle checks 0 zijn.

import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const HERE = dirname(fileURLToPath(import.meta.url));
const checks = [
  ['i18n + HTML', 'check-i18n.mjs'],
  ['offline + 404', 'check-offline.mjs'],
  ['performance-proxy', 'check-perf.mjs'],
  ['externe links (netwerk)', 'check-links.mjs'],
];

const results = [];
for (const [label, file] of checks) {
  console.log(`\n══════════ ${label} ══════════`);
  const r = spawnSync(process.execPath, [join(HERE, file)], { stdio: 'inherit' });
  results.push({ label, code: r.status });
}

console.log('\n══════════ Samenvatting ══════════');
let failed = 0;
for (const r of results) {
  console.log(`  ${r.code === 0 ? '✓' : '✗'} ${r.label}${r.code === 0 ? '' : ' (exit ' + r.code + ')'}`);
  if (r.code !== 0) failed++;
}
if (failed) { console.error(`\n${failed} check(s) gefaald.`); process.exit(1); }
console.log('\nHele testsuite groen. ✅');
process.exit(0);
