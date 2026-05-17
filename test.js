const { execSync } = require('child_process');

console.log("Running test suite...");

try {
  execSync('node tests/test_translations.js', { stdio: 'inherit' });
  console.log("✅ All tests passed successfully!");
} catch (error) {
  console.error("❌ Test suite failed!");
  process.exit(1);
}
