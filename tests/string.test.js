// tests/string.test.js
const { test, describe } = require('node:test');
const assert = require('node:assert/strict');
const { validateEnv } = require('../src/validateEnv');

describe('String validation', () => {
  test('minLength and maxLength', () => {
    const schema = { USERNAME: { type: 'string', required: true, minLength: 3, maxLength: 5 } };
    // Too short
    assert.throws(() => validateEnv(schema, { source: { USERNAME: 'ab' } }), { name: 'ValidationError' });
    // Too long
    assert.throws(() => validateEnv(schema, { source: { USERNAME: 'abcdef' } }), { name: 'ValidationError' });
    // Valid
    const cfg = validateEnv(schema, { source: { USERNAME: 'abcd' } });
    assert.equal(cfg.USERNAME, 'abcd');
  });

  test('enum validation', () => {
    const schema = { NODE_ENV: { type: 'string', enum: ['development', 'production', 'test'] } };
    // Invalid
    assert.throws(() => validateEnv(schema, { source: { NODE_ENV: 'staging' } }), { name: 'ValidationError' });
    // Valid
    const cfg = validateEnv(schema, { source: { NODE_ENV: 'production' } });
    assert.equal(cfg.NODE_ENV, 'production');
  });
});
