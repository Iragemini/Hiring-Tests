import NoItemFoundError from './errors/NoItemFoundError.js';

export default class StackService {
  constructor(stackStorage) {
    this.stackStorage = stackStorage;
  }

  /**
   * Add item to the stack
   *
   * @param {string} item
   * @returns {Promise<number>} Returns stack size
   */
  addItem = async (item) => {
    const stackSize = await this.stackStorage.addItem(item);

    return stackSize;
  };

  /**
   * Get top item of the stack
   *
   * @returns {Promise<string>} Returns the top item of the stack
   * @throws {NoItemFoundError} Throws an error if stack is empty
   */
  getItem = async () => {
    const item = await this.stackStorage.getItem();

    if (!item) {
      throw new NoItemFoundError();
    }

    return item;
  };
}
