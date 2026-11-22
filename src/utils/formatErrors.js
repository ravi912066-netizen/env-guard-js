// src/utils/formatErrors.js
/**
 * Format an array of error objects into a readable string.
 * Each error has shape {key:string, message:string}. Values are never included.
 * @param {Array<{key:string,message:string}>} errors
 * @returns {string}
 */
function formatErrors(errors) {
  return errors.map(e => `[${e.key}] ${e.message}`).join('\n');
}

module.exports = formatErrors;
