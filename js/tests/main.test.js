const assert = require('assert');
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const mainJsCode = fs.readFileSync(path.join(__dirname, '../main.js'), 'utf8');

const sandbox = {
  window: {},
  document: {
    documentElement: { lang: 'en', getAttribute: () => 'en', setAttribute: () => {} },
    getElementById: () => null,
    querySelectorAll: () => [],
    querySelector: () => null,
  },
  navigator: {},
  localStorage: { getItem: () => null, setItem: () => {} },
  setTimeout: setTimeout,
  fetch: () => Promise.resolve({ json: () => Promise.resolve({}) }),
  console: console,
};
sandbox.window = sandbox;

vm.createContext(sandbox);
vm.runInContext(mainJsCode, sandbox);

const getWMOInfo = sandbox.window._getWMOInfo;

if (!getWMOInfo) {
  console.error("Function not exposed on window!");
  process.exit(1);
}

try {
  let result = getWMOInfo(0);
  assert.strictEqual(result.icon, '☀️');
  assert.strictEqual(result.key, 'clear');

  result = getWMOInfo(3);
  assert.strictEqual(result.icon, '☁️');
  assert.strictEqual(result.key, 'overcast');

  result = getWMOInfo(89);
  assert.strictEqual(result.icon, '🌦️');
  assert.strictEqual(result.key, 'showers_light');

  result = getWMOInfo(999);
  assert.strictEqual(result.icon, '🌡️');
  assert.strictEqual(result.key, 'unknown');

  console.log("All _getWMOInfo tests passed");
} catch (e) {
  console.error("Test failed", e);
  process.exit(1);
}
