// tests/custom.test.js
const { test, describe } = require('node:test');
const assert = require('node:assert/strict');
const { validateEnv } = require('../src/validateEnv');

describe('Custom validation and security', () => {
  test('custom validator returns true passes', () => {
    const schema = {
      AGE: { type: 'number', validate: v => v >= 18 || 'Must be adult' }
    };
    const cfg = validateEnv(schema, { source: { AGE: '21' } });
    assert.equal(cfg.AGE, 21);
  });

  test('custom validator error message redacted', () => {
    const schema = {
      SECRET: { type: 'string', validate: v => `Value ${v} is not allowed` }
    };
    try {
      validateEnv(schema, { source: { SECRET: 'mySecret' } });
      assert.fail('should have thrown');
    } catch (e) {
      assert.equal(e.name, 'ValidationError');
      // Ensure the original secret does not appear in the message
      assert(!e.message.includes('mySecret'));
    }
  });
});
