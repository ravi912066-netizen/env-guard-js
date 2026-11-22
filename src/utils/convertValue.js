/**
 * Convert raw string value to the specified type.
 * @param {string} raw - The raw environment variable value.
 * @param {'string'|'number'|'boolean'} type - Desired type.
 * @returns {*} - Converted value or throws on invalid conversion.
 */
function convertValue(raw, type) {
  // Disallow empty string for non-string types
  if (raw === '' && type !== 'string') {
    throw new Error('Empty string not allowed');
  }
  if (type === 'string') {
    return raw;
  }
  if (type === 'number') {
    const num = Number(raw);
    if (Number.isNaN(num)) {
      throw new Error('Invalid number');
    }
    return num;
  }
  if (type === 'boolean') {
    if (raw === 'true') return true;
    if (raw === 'false') return false;
    throw new Error('Invalid boolean');
  }
  throw new Error('Unsupported type');
}

module.exports = convertValue;
