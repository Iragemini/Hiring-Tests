import { expect } from 'chai';
import sinon from 'sinon';
import NoItemFoundError from '../../../stack/errors/NoItemFoundError.js';
import StackService from '../../../stack/stack.service.js';
import storageMock from '../../mocks/stack/storage.mock.js';

const stackService = new StackService(storageMock);

const sandbox = sinon.createSandbox();

describe('Stack service tests', () => {
  const stack = ['Hello', 'World'];

  afterEach(() => {
    sandbox.restore();
  });
  describe('[METHOD] addItem', () => {
    it('should add an item to stack and return stack length', async () => {
      sandbox.replace(storageMock, 'addItem', () => 1);
      const addItemSpy = sandbox.spy(storageMock, 'addItem');

      expect(await stackService.addItem(stack[0])).to.be.equal(1);
      expect(addItemSpy.withArgs(stack[0]).calledOnce).to.be.true;
    });
  });

  describe('[METHOD] getItem', () => {
    it('should return top item of the stack', async () => {
      const topItem = stack[stack.length - 1];

      sandbox.replace(storageMock, 'getItem', () => topItem);
      const getItemSpy = sandbox.spy(storageMock, 'getItem');

      expect(await stackService.getItem()).to.be.equal(topItem);
      expect(getItemSpy.calledOnce).to.be.true;
    });

    it('should throw an error when stack is empty', async () => {
      sandbox.replace(storageMock, 'getItem', () => null);

      try {
        await stackService.getItem();
      } catch (e) {
        expect(e instanceof NoItemFoundError).to.be.true;
      }
    });
  });
});
