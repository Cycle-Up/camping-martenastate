const test = require('node:test');
const assert = require('node:assert');
const fs = require('fs');
const vm = require('vm');

test('safeSet successfully sets an item in localStorage', () => {
  const code = fs.readFileSync('./js/main.js', 'utf8');
  let localStorageSetItemCalledWith = null;

  const mockStorage = {};
  const sandbox = {
    window: {
      localStorage: {
        getItem: (key) => null,
        setItem: (key, val) => {
          localStorageSetItemCalledWith = { key, val };
          mockStorage[key] = val;
        }
      }
    },
    document: {
      readyState: 'loading',
      addEventListener: () => {},
      querySelectorAll: () => []
    }
  };

  vm.createContext(sandbox);
  vm.runInContext(code, sandbox);

  sandbox.safeSet('testKey', 'testValue');

  assert.deepStrictEqual(localStorageSetItemCalledWith, { key: 'testKey', val: 'testValue' });
  assert.strictEqual(mockStorage['testKey'], 'testValue');
});

test('safeSet fails silently when localStorage.setItem throws an error', () => {
  const code = fs.readFileSync('./js/main.js', 'utf8');
  let localStorageSetItemCalled = false;

  const sandbox = {
    window: {
      localStorage: {
        getItem: (key) => null,
        setItem: (key, val) => {
          localStorageSetItemCalled = true;
          throw new Error("QuotaExceededError");
        }
      }
    },
    document: {
      readyState: 'loading',
      addEventListener: () => {},
      querySelectorAll: () => []
    }
  };

  vm.createContext(sandbox);
  vm.runInContext(code, sandbox);

  // This should not throw an error because safeSet catches it
  assert.doesNotThrow(() => {
    sandbox.safeSet('errorKey', 'errorValue');
  });
  assert.strictEqual(localStorageSetItemCalled, true);
});

// Let's also add safeGet tests just for completeness since they are conceptually tied
test('safeGet returns item if successful', () => {
  const code = fs.readFileSync('./js/main.js', 'utf8');

  const sandbox = {
    window: {
      localStorage: {
        getItem: (key) => 'testValue',
        setItem: () => {}
      }
    },
    document: {
      readyState: 'loading',
      addEventListener: () => {},
      querySelectorAll: () => []
    }
  };

  vm.createContext(sandbox);
  vm.runInContext(code, sandbox);

  const result = sandbox.safeGet('testKey');
  assert.strictEqual(result, 'testValue');
});

test('safeGet returns null if localStorage.getItem throws an error', () => {
  const code = fs.readFileSync('./js/main.js', 'utf8');

  const sandbox = {
    window: {
      localStorage: {
        getItem: (key) => { throw new Error("SecurityError"); },
        setItem: () => {}
      }
    },
    document: {
      readyState: 'loading',
      addEventListener: () => {},
      querySelectorAll: () => []
    }
  };

  vm.createContext(sandbox);
  vm.runInContext(code, sandbox);

  const result = sandbox.safeGet('testKey');
  assert.strictEqual(result, null);
});
