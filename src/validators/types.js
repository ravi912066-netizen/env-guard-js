// src/validators/types.js
/**
 * Dispatch validation based on type.
 * @param {string} key
 * @param {any} rawValue - raw string from source (or undefined)
 * @param {Object} rules - schema rules for the key
 * @param {Object} utils - utilities: convertValue, ValidationError, etc.
 * @returns {{value:any, error:null|{key:string,message:string}}}
 */
function validateByType(key, rawValue, rules, utils) {
  const { convertValue } = utils;
  // If value is undefined and default exists, we will handle default outside.
  if (rawValue === undefined) {
    return { value: undefined, error: null };
  }
  try {
    const converted = convertValue(rawValue, rules.type);
    // Run type‑specific constraints
    if (rules.type === 'number') {
      if (typeof rules.min === 'number' && converted < rules.min) {
        return { value: null, error: { key, message: `Number ${key} is below minimum ${rules.min}` } };
      }
      if (typeof rules.max === 'number' && converted > rules.max) {
        return { value: null, error: { key, message: `Number ${key} exceeds maximum ${rules.max}` } };
      }
    }
    if (rules.type === 'string') {
      if (typeof rules.minLength === 'number' && converted.length < rules.minLength) {
        return { value: null, error: { key, message: `String ${key} shorter than minimum length ${rules.minLength}` } };
      }
      if (typeof rules.maxLength === 'number' && converted.length > rules.maxLength) {
        return { value: null, error: { key, message: `String ${key} longer than maximum length ${rules.maxLength}` } };
      }
      if (Array.isArray(rules.enum) && !rules.enum.includes(converted)) {
        return { value: null, error: { key, message: `String ${key} must be one of ${rules.enum.join(', ')}` } };
      }
    }
    // Custom validator
    if (typeof rules.validate === 'function') {
      const customResult = rules.validate(converted);
      if (customResult !== true) {
        let msg = typeof customResult === 'string' ? customResult : 'Custom validation failed';
        // Redact any occurrence of the raw value (if present) to avoid leaking secrets.
        if (typeof msg === 'string' && typeof raw === 'string') {
          const escaped = raw.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
          const regex = new RegExp(escaped, 'g');
          msg = msg.replace(regex, '[redacted]');
        }
        return { value: null, error: { key, message: msg } };
      }
    }

    return { value: converted, error: null };
  } catch (e) {
    // Conversion errors
    const safeMessage = e.message.includes('secret') ? '[redacted]' : e.message;
    return { value: null, error: { key, message: safeMessage } };
  }
}

module.exports = { validateByType };
