// tests/required.test.js
const { test, describe } = require('node:test');
const assert = require('node:assert/strict');
const { validateEnv } = require('../src/validateEnv');

describe('Required validation', () => {
  test('throws when required var missing', () => {
    const schema = {
      API_KEY: { type: 'string', required: true }
    };
    assert.throws(() => validateEnv(schema, { source: {} }), {
      name: 'ValidationError',
      message: 'Environment validation failed'
    });
  });

  test('passes when required var present', () => {
    const schema = { API_KEY: { type: 'string', required: true } };
    const source = { API_KEY: 'abc' };
    const cfg = validateEnv(schema, { source });
    assert.equal(cfg.API_KEY, 'abc');
  });
});
