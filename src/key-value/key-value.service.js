import config from '../../config/config.js';
import NoKeyFoundError from './errors/NoKeyFoundError.js';

const {
  storage: {
    keyValue: { ttl: defaultTtl },
  },
} = config;

export default class KeyValueService {
  constructor(keyValueStorage) {
    this.keyValueStorage = keyValueStorage;
  }

  /**
   * Add a key-value pair to storage, set ttl
   *
   * @param {object} data
   * @returns {Promise<number>} Returns storage size
   */
  addValue = async (data) => {
    const { ttl = defaultTtl, ...rest } = data;

    const storageSize = this.keyValueStorage.addValue({ ttl, ...rest });

    return storageSize;
  };

  /**
   * Get value for a given key
   *
   * @param {string} key - The key to associate with value
   * @returns {Promise<string>} Returns value for a given key
   */
  getValue = async (key) => {
    const valueObj = await this.keyValueStorage.getValue(key);

    if(!valueObj) {
      return '';
    }

    const { value, expiry } = valueObj;

    if (expiry && Date.now() > new Date(expiry).getTime()) {
      return '';
    }

    return value;
  };

  /**
   * Removes the given key and its associated value from the store
   *
   * @param {string} key - The key to associate with value
   * @returns {Promise<void>}
   * @throws {NoKeyFoundError} Throws an error if the key doesn't exist
   */
  removeValue = async (key) => {
    const result = await this.keyValueStorage.removeValue(key);

    if (!result) {
      throw new NoKeyFoundError(key);
    }
  };
}
