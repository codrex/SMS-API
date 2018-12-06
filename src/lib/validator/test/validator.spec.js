const validator = require('../');
const { user } = require('../schema');
const utils = require('../../utils');

const { createUserMock } = require('../../../constants');

const ctx = { throw: jest.fn(), request: {}, response: { body: {} } };
const next = jest.fn();
describe('validator', () => {
  it('should validate user data and call next when data is valid', async () => {
    const { id, ...data } = createUserMock();
    await validator(user, data, ctx, next);
    expect(next).toBeCalledTimes(1);
  });

  it('should respond with an error object when data is invalid', async () => {
    const spy = jest.spyOn(utils, 'sendFailure').mockImplementation(jest.fn());
    await validator(user, {}, ctx, next);
    expect(spy).toBeCalledTimes(1);
  });

  it('should respond with server error when another occurs', async () => {
    const spy = jest
      .spyOn(utils, 'sendServerError')
      .mockImplementation(jest.fn());
    await validator('schema', {}, {}, ctx);

    expect(spy).toBeCalledTimes(1);
  });
});
