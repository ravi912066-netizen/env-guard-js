// src/errors/ValidationError.js
/**
 * ValidationError represents one or more environment validation failures.
 * The public error message is generic to avoid leaking any values.
 */
class ValidationError extends Error {
  /**
   * @param {Array<{key:string,message:string}>} errors
   */
  constructor(errors) {
    super('Environment validation failed');
    this.name = 'ValidationError';
    /** @type {Array<{key:string,message:string}>} */
    this.errors = errors;
  }
}

module.exports = ValidationError;

