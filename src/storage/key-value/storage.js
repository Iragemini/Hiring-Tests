import getExpiration from '../../utils/getExpiration.js';

export default class KeyValueStorage {
  constructor() {
    this.storage = new Map();
  }

  /**
   * Add a new key-value pair, set TTL
   *
   * @async
   * @param {object} data
   * @param {string} data.key
   * @param {string} data.value
   * @param {number} data.ttl
   * @returns {Promise<number>} Returns storage size
   */
  addValue = async ({ key, value = '', ttl }) => {
    const expiry = ttl > 0 ? new Date(getExpiration(ttl)) : null;

    const valueObj = { value, expiry };

    this.storage.set(key, valueObj);

    return this.storage.size;
  };

  /**
   * Get value for the key
   *
   * @async
   * @param {string} key
   * @returns {Promise<object>} Returns value object
   */
  getValue = async (key) => {
    const valueObj = this.storage.get(key);

    if (!valueObj) {
      return { value: '' };
    }

    return valueObj;
  };

  /**
   * Remove the given key and its associated value from the store
   *
   * @async
   * @param {string} key
   * @returns {Promise<boolean>} Returns true if the key exists, otherwise returns false
   */
  removeValue = async (key) => this.storage.delete(key);

  /**
   * Clear storage
   *
   * @async
   * @returns {Promise<void>}
   */
  clear = async () => {
    this.storage.clear();
  };
}
