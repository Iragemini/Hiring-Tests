import StackStorage from './storage/stack/storage.js';
import StackService from './stack/stack.service.js';
import StackController from './stack/stack.controller.js';

const stackStorage = new StackStorage();
const stackService = new StackService(stackStorage);
const stackController = new StackController(stackService);

export {
  stackStorage,
  stackService,
  stackController,
};
