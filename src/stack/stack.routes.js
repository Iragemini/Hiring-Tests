import { Router } from 'express';
import asyncHandler from 'express-async-handler';
import { stackController } from '../dependencies.js';
import validate from '../middleware/validate.js';
import addItemSchema from './schemas/index.js';

const router = Router();

router
  .route('/')
  .post(validate(addItemSchema), asyncHandler(stackController.addItem))
  .get(asyncHandler(stackController.getItem));

export default router;
