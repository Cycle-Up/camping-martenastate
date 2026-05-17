const fs = require('fs');
const vm = require('vm');
const assert = require('assert');

// Read the main JS file
const code = fs.readFileSync('js/main.js', 'utf8');

// Create a mock environment context
const context = vm.createContext({
    // Mock window and localStorage
    window: {
        localStorage: {
            getItem: () => null,
            setItem: () => {}
        }
    },
    // Mock document
    document: {
        readyState: 'loading',
        querySelectorAll: () => [],
        querySelector: () => ({ classList: { toggle: () => {} } }),
        documentElement: {},
        addEventListener: () => {},
        getElementById: () => ({
            classList: { add: () => {}, remove: () => {} },
            style: {}
        }),
        createElement: () => ({}),
        body: {
            style: {},
            appendChild: () => {},
            removeChild: () => {}
        }
    },
    // Mock navigator
    navigator: { language: 'nl' },
    // Mock IntersectionObserver
    IntersectionObserver: class {
        observe() {}
        unobserve() {}
        disconnect() {}
    },
    // Mock translations object
    translations: {
        nl: { 'key.nl': 'waarde' },
        en: { 'key.en': 'value' }
    },
    // Mock global functions used in main.js
    console: console,
    setTimeout: setTimeout,
    setInterval: setInterval
});

// Run main.js in the context so functions are available
vm.runInContext(code, context);

function runTest() {
    try {
        console.log("Testing translations in main.js environment...");

        vm.runInContext(`
            // Test 1: Key exists in current language
            currentLang = 'nl';
            if (t('key.nl') !== 'waarde') throw new Error("Test 1 failed: Expected 'waarde', got '" + t('key.nl') + "'");
            console.log("✅ Key exists in current language");

            // Test 2: Key does not exist in current language
            if (t('missing') !== 'missing') throw new Error("Test 2 failed: Expected 'missing', got '" + t('missing') + "'");
            console.log("✅ Key missing, returns key itself");

            // Test 3: Change language and test key exists
            currentLang = 'en';
            if (t('key.en') !== 'value') throw new Error("Test 3 failed: Expected 'value', got '" + t('key.en') + "'");
            console.log("✅ Change language to en, key exists");

            // Test 4: Key missing in new language
            if (t('missing.en') !== 'missing.en') throw new Error("Test 4 failed: Expected 'missing.en', got '" + t('missing.en') + "'");
            console.log("✅ Change language to en, key missing, returns key");

            // Test 5: Missing language object entirely
            currentLang = 'de';
            if (t('key.nl') !== 'key.nl') throw new Error("Test 5 failed: Expected 'key.nl', got '" + t('key.nl') + "'");
            console.log("✅ Language object completely missing, returns key");
        `, context);

        console.log("\nAll translation fallback tests passed successfully!\n");
    } catch (e) {
        console.error("❌ Test failed:");
        console.error(e);
        process.exit(1);
    }
}

runTest();
