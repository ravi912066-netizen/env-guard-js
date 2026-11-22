// src/validators/required.js
/**
 * Validate required environment variable presence.
 * @param {string} key - Variable name.
 * @param {any} value - Value from source (may be undefined).
 * @param {Object} rules - Schema rules for this key.
 * @returns {null|{key:string,message:string}} - Null if ok, error object otherwise.
 */
function validateRequired(key, value, rules) {
  if (rules.required && (value === undefined || value === null)) {
    return { key, message: 'Variable is required but not set' };
  }
  return null;
}
module.exports = validateRequired;
