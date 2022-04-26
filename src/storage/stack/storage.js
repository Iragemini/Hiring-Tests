export default class StackStorage {
  constructor() {
    this.storage = [];
  }

  /**
   * Add item to stack
   *
   * @param {string} item
   * @returns {Promise<number>} Returns array length
   */
  addItem = async (item) => {
    const items = this.storage.push(item);

    return items;
  };

  /**
   * Get top item of the stack
   *
   * @returns {Promise<string|null>} Returns the top item of the stack
   */
  getItem = async () => {
    if (!this.storage.length) {
      return null;
    }

    return this.storage.pop();
  };

  /**
   * Clear storage
   *
   * @returns {Promise<void>}
   */
  clear = async () => {
    this.storage.length = 0;
  };
}
