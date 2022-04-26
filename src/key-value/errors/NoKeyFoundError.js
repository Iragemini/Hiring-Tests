import { StatusCodes } from 'http-status-codes';
import BaseError from '../../errors/BaseError.js';

export default class extends BaseError {
  constructor(key) {
    super(
      'NoKeyFoundError',
      StatusCodes.NOT_FOUND,
      `Key '${key}' does not exist`,
    );
  }
}
