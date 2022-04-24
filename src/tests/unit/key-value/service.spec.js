import { expect } from 'chai';
import sinon from 'sinon';
import NoKeyFoundError from '../../../key-value/errors/NoKeyFoundError.js';
import KeyValueService from '../../../key-value/key-value.service.js';
import storageMock from '../../mocks/key-value/storage.mock.js';
import config from '../../../../config/config.js';

const {
  storage: {
    keyValue: { ttl: defaultTtl },
  },
} = config;

const keyValueService = new KeyValueService(storageMock);

const sandbox = sinon.createSandbox();

describe('Key-value service tests', () => {
  const key = 'name';
  const value = 'John';
  const ttl = 30;

  afterEach(() => {
    sandbox.restore();
  });

  describe('[METHOD] addValue', () => {
    it('should add key-value pair, set TTL and return storage size', async () => {
      storageMock.addValue.resolves(1);

      expect(await keyValueService.addValue({ key, value, ttl }))
        .to.be.equal(1);
      expect(storageMock.addValue.withArgs({ key, value, ttl }).calledOnce)
        .to.be.true;
    });

    it('should add key-value pair, set default TTL and return storage size', async () => {
      sandbox.replace(storageMock, 'addValue', () => 1);
      const addValueSpy = sandbox.spy(storageMock, 'addValue');

      expect(await keyValueService.addValue({ key, value })).to.be.equal(1);
      expect(addValueSpy.withArgs({ key, value, ttl: defaultTtl }).calledOnce)
        .to.be.true;
    });
  });

  describe('[METHOD] getValue', () => {
    let date = null;
    let stubDateNow = null;

    beforeEach(() => {
      date = Date.now();
      stubDateNow = sinon.stub(Date, 'now');
    });

    afterEach(() => {
      sinon.resetHistory();
      stubDateNow.restore();
    });

    it('should return value for a given key', async () => {
      storageMock.getValue.resolves({
        value,
        expiry: null,
      });

      expect(await keyValueService.getValue(key)).to.be.equal(value);
      expect(storageMock.getValue.withArgs(key).calledOnce).to.be.true;
    });

    it('should throw an error if the key does not exist', async () => {
      storageMock.getValue.resolves(null);

      try {
        await keyValueService.getValue(key);
      } catch (e) {
        expect(e instanceof NoKeyFoundError).to.be.true;
      } finally {
        expect(storageMock.getValue.calledOnce).to.be.true;
        expect(storageMock.getValue.calledWith(key)).to.be.true;
      }
    });

    it('should return an empty value if the key has expired', async () => {
      storageMock.getValue.resolves({
        value,
        expiry: new Date(date),
      });
      stubDateNow.returns(date + 5000);

      expect(await keyValueService.getValue(key)).to.be.empty;
      expect(storageMock.getValue.calledOnce).to.be.true;
    });
  });

  describe('[METHOD] removeValue', () => {
    afterEach(() => {
      sinon.resetHistory();
    });
    it('should remove the given key and its associated value', async () => {
      storageMock.removeValue.resolves(true);

      expect(await keyValueService.removeValue(key)).to.be.undefined;
      expect(storageMock.removeValue.withArgs(key).calledOnce).to.be.true;
    });

    it('should throw an error if the key does not exist', async () => {
      storageMock.removeValue.resolves(false);

      try {
        await keyValueService.removeValue(key);
      } catch (e) {
        expect(e instanceof NoKeyFoundError).to.be.true;
      } finally {
        expect(storageMock.removeValue.withArgs(key).calledOnce).to.be.true;
      }
    });
  });
});
