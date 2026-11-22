// tests/default.test.js
const { test, describe } = require('node:test');
const assert = require('node:assert/strict');
const { validateEnv } = require('../src/validateEnv');

describe('Default values', () => {
  test('applies default when variable missing', () => {
    const schema = { PORT: { type: 'number', default: 8080 } };
    const cfg = validateEnv(schema, { source: {} });
    assert.equal(cfg.PORT, 8080);
  });

  test('does not apply default when variable present', () => {
    const schema = { PORT: { type: 'number', default: 8080 } };
    const cfg = validateEnv(schema, { source: { PORT: '3000' } });
    assert.equal(cfg.PORT, 3000);
  });
});
