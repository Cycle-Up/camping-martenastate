const fs = require('fs');
const test = require('node:test');
const assert = require('assert');

// We evaluate the whole main.js but we stub out window and document to avoid errors
const code = fs.readFileSync('./js/main.js', 'utf8');

test('safeGet and safeSet utility functions', async (t) => {

    // We use a setup function to create a fresh context for each test
    function runWithContext(localStorageMock) {
        // Create an isolated context to run the script
        const context = {
            window: {
                localStorage: localStorageMock,
                addEventListener: () => {},
                sessionStorage: {
                    getItem: () => null,
                    setItem: () => {}
                },
                location: { href: '' },
                pageYOffset: 0,
                scrollTo: () => {},
                scrollY: 0
            },
            document: {
                querySelectorAll: () => { return { forEach: () => {} } },
                querySelector: () => null,
                getElementById: () => null,
                createElement: () => ({ appendChild: () => {}, setAttribute: () => {}, classList: { toggle: () => {}, add: () => {}, remove: () => {} } }),
                documentElement: { lang: '' },
                readyState: 'complete',
                addEventListener: () => {},
                body: { style: {}, appendChild: () => {}, removeChild: () => {} },
                title: ''
            },
            translations: {},
            navigator: { share: null, clipboard: { writeText: async () => {} } },
            setTimeout: () => {},
            clearTimeout: () => {},
            Date: class extends Date {}
        };

        // We use Node's vm module to evaluate the script in this isolated context
        const vm = require('vm');
        vm.createContext(context);
        vm.runInContext(code, context);
        return context;
    }

    // 1. Test happy path - localStorage works correctly
    await t.test('safeGet returns value and safeSet saves value when localStorage works', () => {
        let storage = { 'lang': 'fr' };

        // Mock working localStorage
        const localStorageMock = {
            getItem: (k) => storage[k] || null,
            setItem: (k, v) => { storage[k] = v; }
        };

        // Run main.js with our mocked context
        const context = runWithContext(localStorageMock);

        // Test safeGet
        assert.strictEqual(context.safeGet('lang'), 'fr', 'safeGet should return the existing value');
        assert.strictEqual(context.safeGet('nonexistent'), null, 'safeGet should return null for missing keys');

        // Test safeSet
        context.safeSet('theme', 'dark');
        assert.strictEqual(storage['theme'], 'dark', 'safeSet should correctly store the value in localStorage');
        assert.strictEqual(context.safeGet('theme'), 'dark', 'safeGet should return the newly set value');
    });

    // 2. Test unhappy path - localStorage throws exception (e.g. private mode, file:// protocol)
    await t.test('safeGet returns null and safeSet does not throw when localStorage throws exceptions', () => {
        // Mock broken localStorage
        const localStorageMock = {
            getItem: (k) => { throw new DOMException('Access denied'); },
            setItem: (k, v) => { throw new DOMException('Access denied'); }
        };

        // Run main.js with our mocked context
        const context = runWithContext(localStorageMock);

        // Test safeGet - should catch error and return null
        assert.doesNotThrow(() => {
            const result = context.safeGet('lang');
            assert.strictEqual(result, null, 'safeGet should return null when localStorage throws an error');
        }, 'safeGet should not throw an exception');

        // Test safeSet - should catch error and not throw
        assert.doesNotThrow(() => {
            context.safeSet('lang', 'de');
        }, 'safeSet should not throw an exception');
    });
});
