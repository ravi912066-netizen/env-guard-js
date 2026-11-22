// src/validateEnv.js
const validateRequired = require('./validators/required');
const { validateByType } = require('./validators/types');
const ValidationError = require('./errors/ValidationError');
const convertValue = require('./utils/convertValue');
/**
 * Validate environment variables according to a schema.
 * @param {Object} schema - Validation schema.
 * @param {Object} [options] - Options object.
 * @param {Object} [options.source=process.env] - Source of env vars.
 * @returns {Object} - Config object with typed values.
 * @throws {ValidationError} When validation fails.
 */
function validateEnv(schema, options = {}) {
  // Basic schema validation
  for (const [key, rules] of Object.entries(schema)) {
    if (!rules.type) {
      throw new ValidationError([{ key, message: 'Missing type definition in schema' }]);
    }
  }

  const source = options.source || process.env;
  const result = {};
  const errors = [];
  // Ensure we don't mutate source.
  for (const [key, rules] of Object.entries(schema)) {
    const raw = source.hasOwnProperty(key) ? source[key] : undefined;
    // Required check first.
    const requiredErr = validateRequired(key, raw, rules);
    if (requiredErr) {
      errors.push(requiredErr);
      continue; // Skip further validation for missing required.
    }
    // Apply default if value undefined.
    if (raw === undefined) {
      if (rules.hasOwnProperty('default')) {
        result[key] = typeof rules.default === 'function' ? rules.default() : rules.default;
      }
      continue;
    }
    // Type validation & conversion.
    const { value, error } = validateByType(key, raw, rules, { convertValue });
    if (error) {
      errors.push(error);
    } else {
      result[key] = value;
    }
  }
  if (errors.length > 0) {
    throw new ValidationError(errors);
  }
  return result;
}

module.exports = { validateEnv };
