## 2024-05-17 - Caching DOM Query Results for i18n

**What:** Optimized `applyTranslations` in `js/main.js` by caching the results of `document.querySelectorAll` into module-level variables during its first invocation.
**Expected Impact:** Reduces CPU usage and improves overall rendering performance by eliminating repetitive, redundant DOM searches. Measurements via a JSDOM benchmark showed a roughly 3x execution speed improvement (~35.4s -> ~12.2s for 10,000 iterations).
**Rationale:** The `.querySelectorAll` operations were unnecessarily repeated every time `applyTranslations` was called. Since the document structure and the elements needing translation do not change dynamically after the page loads, caching the elements significantly improves performance.
