/* eslint no-unused-vars: ["error", { "argsIgnorePattern": "req|next" }] */

import { StatusCodes } from 'http-status-codes';

/**
 * Handling errors
 *
 * @param {Error} err
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
const errorHandler = (err, req, res, next) => {
  const {
    statusCode: code = StatusCodes.INTERNAL_SERVER_ERROR,
    message = 'Something went wrong...',
  } = err;

  res.status(code).json({ code, message });
};

export default errorHandler;
