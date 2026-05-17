const test = require('node:test');
const assert = require('node:assert');
const fs = require('fs');
const path = require('path');

test('Translations match exactly between Dutch and English', () => {
    const code = fs.readFileSync(path.join(__dirname, '../js/translations.js'), 'utf8');

    // Evaluate the code by appending module.exports
    const wrappedCode = code + '\nmodule.exports = translations;';
    const m = { exports: {} };
    const func = new Function('module', wrappedCode);
    func(m);

    const translations = m.exports;

    assert.ok(translations, 'Translations object should be defined');
    assert.ok(translations.nl, 'Dutch translations should exist');
    assert.ok(translations.en, 'English translations should exist');

    const nlKeys = Object.keys(translations.nl);
    const enKeys = Object.keys(translations.en);

    const missingInEn = nlKeys.filter(k => !enKeys.includes(k));
    const missingInNl = enKeys.filter(k => !nlKeys.includes(k));

    assert.deepStrictEqual(missingInEn, [], `Keys missing in English translation: ${missingInEn.join(', ')}`);
    assert.deepStrictEqual(missingInNl, [], `Keys missing in Dutch translation: ${missingInNl.join(', ')}`);
});
