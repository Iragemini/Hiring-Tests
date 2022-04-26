import { Router } from 'express';
import asyncHandler from 'express-async-handler';
import { keyValueController } from '../dependencies.js';
import validate from '../middleware/validate.js';
import {
  addValueSchema,
  getValueSchema,
  removeValueSchema,
} from './schemas/index.js';

const router = Router();

router
  .route('/')
  .post(validate(addValueSchema), asyncHandler(keyValueController.addValue));

router
  .route('/:key')
  .get(validate(getValueSchema), asyncHandler(keyValueController.getValue))
  .delete(
    validate(removeValueSchema),
    asyncHandler(keyValueController.removeValue),
  );

export default router;
