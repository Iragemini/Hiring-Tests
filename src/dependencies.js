import StackStorage from './storage/stack/storage.js';
import StackService from './stack/stack.service.js';
import StackController from './stack/stack.controller.js';
import KeyValueStorage from './storage/key-value/storage.js';
import KeyValueService from './key-value/key-value.service.js';
import KeyValueController from './key-value/key-value.controller.js';

const stackStorage = new StackStorage();
const stackService = new StackService(stackStorage);
const stackController = new StackController(stackService);

const keyValueStorage = new KeyValueStorage();
const keyValueService = new KeyValueService(keyValueStorage);
const keyValueController = new KeyValueController(keyValueService);

export {
  stackStorage,
  stackService,
  stackController,
  keyValueStorage,
  keyValueService,
  keyValueController,
};
