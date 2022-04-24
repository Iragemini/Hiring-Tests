import BaseError from './BaseError.js';

export default class extends BaseError {
  /**
   *
   * @param {number} code
   * @param {string} message
   */
  constructor(code, message) {
    super('ApiError', code, message);
  }
}
