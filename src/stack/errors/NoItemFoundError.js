import { StatusCodes } from 'http-status-codes';
import BaseError from '../../errors/BaseError.js';

export default class extends BaseError {
  constructor() {
    super('NoItemFoundError', StatusCodes.NOT_FOUND, 'Item not found');
  }
}
