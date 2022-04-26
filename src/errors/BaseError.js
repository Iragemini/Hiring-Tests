export default class BaseError extends Error {
  /**
   * @param {string} name - error name
   * @param {number} code - error code
   * @param {string} message - error message
   */
  constructor(name, code, message) {
    super(message);
    this.name = name;
    this.statusCode = code;
    this.message = message;
  }
}
