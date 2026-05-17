const { test, describe, beforeEach } = require('node:test');
const assert = require('node:assert');
const fs = require('fs');
const vm = require('vm');
const path = require('path');

describe('main.js tests', () => {
  let sandbox;

  beforeEach(() => {
    // Mock the browser environment needed by main.js
    sandbox = {
      window: {
        localStorage: {
          data: {},
          getItem(key) { return this.data[key] || null; },
          setItem(key, val) { this.data[key] = String(val); },
          clear() { this.data = {}; }
        },
        location: { pathname: '/', search: '' },
        addEventListener: () => {},
        scrollY: 0,
        sessionStorage: { getItem: () => null, setItem: () => {} }
      },
      document: {
        readyState: 'complete',
        documentElement: { lang: '' },
        querySelectorAll: () => [],
        querySelector: () => null,
        getElementById: () => null,
        addEventListener: () => {},
        body: { style: {} }
      },
      navigator: {},
      translations: {
        nl: { 'hello': 'hallo', 'world': 'wereld' },
        en: { 'hello': 'hello', 'world': 'world' }
      },
      console: console,
      setTimeout: setTimeout,
      clearTimeout: clearTimeout
    };

    // Create a context and run the main.js script in it
    vm.createContext(sandbox);

    const codePath = path.join(__dirname, 'main.js');
    const code = fs.readFileSync(codePath, 'utf8');
    vm.runInContext(code, sandbox);
  });

  test('safeGet and safeSet work with localStorage', () => {
    sandbox.safeSet('testKey', 'testValue');
    assert.strictEqual(sandbox.safeGet('testKey'), 'testValue');
  });

  test('t() returns translated string based on default lang (nl)', () => {
    assert.strictEqual(sandbox.t('hello'), 'hallo');
    assert.strictEqual(sandbox.t('missing_key'), 'missing_key');
  });

  test('setLang() updates language and translations', () => {
    sandbox.setLang('en');
    assert.strictEqual(sandbox.t('hello'), 'hello');
    assert.strictEqual(sandbox.safeGet('lang'), 'en');
  });

  test('safeGet handles localStorage errors gracefully', () => {
    // Override getItem to throw an error
    sandbox.window.localStorage.getItem = () => { throw new Error('Access Denied'); };
    assert.strictEqual(sandbox.safeGet('someKey'), null);
  });

  test('safeSet handles localStorage errors gracefully', () => {
    // Override setItem to throw an error
    sandbox.window.localStorage.setItem = () => { throw new Error('Quota Exceeded'); };
    // Should not throw an exception
    assert.doesNotThrow(() => sandbox.safeSet('someKey', 'val'));
  });
});
