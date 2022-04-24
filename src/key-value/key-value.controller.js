import { StatusCodes } from 'http-status-codes';
import config from '../../config/config.js';

const {
  storage: {
    keyValue: { ttl: defaultTtl },
  },
} = config;

export default class KeyValueController {
  constructor(keyValueService) {
    this.keyValueService = keyValueService;
  }

  /**
   * Add a key-value pair to store
   *
   * @param {Request} req
   * @param {Response} res
   */
  addValue = async (req, res) => {
    const { key, value, ttl = defaultTtl } = req.body;

    const storageSize = await this.keyValueService.addValue({
      key,
      value,
      ttl,
    });

    res.status(StatusCodes.OK).json({
      storageSize,
    });
  };

  /**
   * Get value for a given key
   *
   * @param {Request} req
   * @param {Response} res
   */
  getValue = async (req, res) => {
    const { key } = req.params;

    const value = await this.keyValueService.getValue(key);

    res.status(StatusCodes.OK).json({
      value,
    });
  };

  /**
   * Remove value stored for a given key
   *
   * @param {Request} req
   * @param {Response} res
   */
  removeValue = async (req, res) => {
    const { key } = req.params;

    await this.keyValueService.removeValue(key);

    res.sendStatus(StatusCodes.NO_CONTENT);
  };
}
