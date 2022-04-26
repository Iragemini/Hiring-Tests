/* eslint no-unused-vars: ["error", { "argsIgnorePattern": "res" }] */
import Ajv from 'ajv';
import { StatusCodes } from 'http-status-codes';
import ApiError from '../errors/ApiError.js';

const ajv = new Ajv({ allErrors: true });

/**
 * Ajv validator
 *
 * @param {Object} schema - AJV schema
 * @returns {function} - Express middleware function
 * @throws {ApiError} - Entered data doesn't match the schema
 */
const validate = (schema) => (req, res, next) => {
  const totalErrors = Object.entries(schema).reduce(
    (acc, [dest, destSchema]) => {
      if (!ajv.validate(destSchema, req[dest])) {
        const { errors } = ajv;
        return [...acc, ...errors];
      }
      return acc;
    },
    [],
  );

  if (totalErrors.length) {
    next(new ApiError(StatusCodes.BAD_REQUEST, JSON.stringify(totalErrors)));
  }

  next();
};

export default validate;
