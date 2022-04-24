import { expect } from 'chai';
import sinon from 'sinon';
import KeyValueStorage from '../../../storage/key-value/storage.js';

const keyValueStorage = new KeyValueStorage();

const sandbox = sinon.createSandbox();

describe('Key-value storage tests', () => {
  const item = {
    key: 'name',
    value: 'John',
    ttl: 30,
  };

  beforeEach(() => {
    keyValueStorage.clear();
  });

  afterEach(() => {
    sandbox.restore();
  });
  describe('[METHOD] addValue', () => {
    it('should add key-value pair, set ttl and return storage size', async () => {
      expect(await keyValueStorage.addValue(item)).to.be.equal(1);
    });
  });

  describe('[METHOD] getValue', () => {
    it('should return empty value if the key does not exist', async () => {
      const result = await keyValueStorage.getValue(item.key);

      expect(result).to.has.all.keys('value');
      expect(result.value).to.be.empty;
    });

    describe('storage has items', () => {
      beforeEach(() => {
        keyValueStorage.addValue(item);
      });

      it('should return the value for a given key', async () => {
        const result = await keyValueStorage.getValue(item.key);

        expect(result).to.has.all.keys('value', 'expiry');
        expect(result.value).to.be.equal(item.value);
      });
    });
  });

  describe('[METHOD] removeValue', () => {
    it('should return false if the key does not exist', async () => {
      expect(await keyValueStorage.removeValue(item.key)).to.be.false;
    });

    describe('storage has items', () => {
      beforeEach(() => {
        keyValueStorage.addValue(item);
      });

      it('should remove the given key and its associated value and return true', async () => {
        expect(await keyValueStorage.removeValue(item.key)).to.be.true;
      });
    });
  });
});
