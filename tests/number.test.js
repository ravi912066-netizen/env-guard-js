// tests/number.test.js
const { test, describe } = require('node:test');
const assert = require('node:assert/strict');
const { validateEnv } = require('../src/validateEnv');

describe('Number validation', () => {
  test('valid number conversion', () => {
    const schema = { PORT: { type: 'number', required: true } };
    const cfg = validateEnv(schema, { source: { PORT: '3000' } });
    assert.equal(cfg.PORT, 3000);
    assert.equal(typeof cfg.PORT, 'number');
  });

  test('invalid number string throws error', () => {
    const schema = { PORT: { type: 'number', required: true } };
    assert.throws(() => validateEnv(schema, { source: { PORT: '12abc' } }), {
      name: 'ValidationError'
    });
  });

  test('min and max constraints', () => {
    const schema = { PORT: { type: 'number', required: true, min: 1000, max: 65535 } };
    // Below min
    assert.throws(() => validateEnv(schema, { source: { PORT: '999' } }), {
      name: 'ValidationError'
    });
    // Above max
    assert.throws(() => validateEnv(schema, { source: { PORT: '70000' } }), {
      name: 'ValidationError'
    });
    // Within range
    const cfg = validateEnv(schema, { source: { PORT: '3000' } });
    assert.equal(cfg.PORT, 3000);
  });
});
