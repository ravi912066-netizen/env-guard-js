// tests/boolean.test.js
const { test, describe } = require('node:test');
const assert = require('node:assert/strict');
const { validateEnv } = require('../src/validateEnv');

describe('Boolean validation', () => {
  test('valid true string', () => {
    const schema = { DEBUG: { type: 'boolean', required: true } };
    const cfg = validateEnv(schema, { source: { DEBUG: 'true' } });
    assert.equal(cfg.DEBUG, true);
    assert.equal(typeof cfg.DEBUG, 'boolean');
  });

  test('valid false string', () => {
    const schema = { DEBUG: { type: 'boolean', required: true } };
    const cfg = validateEnv(schema, { source: { DEBUG: 'false' } });
    assert.equal(cfg.DEBUG, false);
  });

  test('invalid boolean string throws', () => {
    const schema = { DEBUG: { type: 'boolean', required: true } };
    assert.throws(() => validateEnv(schema, { source: { DEBUG: 'yes' } }), {
      name: 'ValidationError'
    });
  });
});
