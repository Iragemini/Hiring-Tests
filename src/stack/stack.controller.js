import { StatusCodes } from 'http-status-codes';

export default class StackController {
  constructor(stackService) {
    this.stackService = stackService;
  }

  /**
   * Add item to stack
   *
   * @param {Request} req
   * @param {Response} res
   */
  addItem = async (req, res) => {
    const { item } = req.body;

    const stackSize = await this.stackService.addItem(item);

    res.status(StatusCodes.OK).json({
      stackSize,
    });
  };

  /**
   * Get top item of the stack
   *
   * @param {Request} req
   * @param {Response} res
   */
  getItem = async (req, res) => {
    const item = await this.stackService.getItem();

    res.status(StatusCodes.OK).json({
      item,
    });
  };
}
