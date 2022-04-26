import { expect } from 'chai';
import sinon from 'sinon';
import StackStorage from '../../../storage/stack/storage.js';

const stackStorage = new StackStorage();

const sandbox = sinon.createSandbox();

describe('Stack storage tests', () => {
  const items = ['Hello', 'World', 'Again'];

  afterEach(() => {
    sandbox.restore();
  });

  beforeEach(() => {
    stackStorage.clear();
  });
  describe('[METHOD] addItem', () => {
    it('should add an item to stack and return stack length', async () => {
      expect(await stackStorage.addItem(items[0])).to.be.equal(1);
    });
  });

  describe('[METHOD] getItem', () => {
    it('should return null if the stack is empty', async () => {
      expect(await stackStorage.getItem()).to.be.null;
    });

    describe('stack has items', () => {
      beforeEach(() => {
        Promise.all(items.map((item) => stackStorage.addItem(item)));
      });

      it('should return top item of the stack', async () => {
        const topItem = items[items.length - 1];

        expect(await stackStorage.getItem()).to.be.equal(topItem);
      });
    });
  });
});
