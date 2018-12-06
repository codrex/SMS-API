const validator = require('../');
const { user } = require('../schema');
const utils = require('../../utils');

const {
  createUserMock,
  SERVER_ERROR,
  SERVER_ERROR_CODE,
} = require('../../../constants');

const ctx = { throw: jest.fn(), request: {}, response: {} };
const next = jest.fn();
describe('validator', () => {
  it('should validate user data and call next when data is valid', async () => {
    ctx.request.body = createUserMock();
    await validator(user, ctx, next);
    expect(next).toBeCalledTimes(1);
  });

  it('should respond with an error object when data is invalid', async () => {
    ctx.request.body = {};
    const spy = jest.spyOn(utils, 'sendFailure').mockImplementation(jest.fn());
    await validator(user, ctx, next);
    expect(spy).toBeCalledTimes(1);
  });

  it('should respond with server error when another occurs', async () => {
    ctx.request.body = {};
    const spy = jest
      .spyOn(utils, 'sendServerError')
      .mockImplementation(jest.fn());
    await validator('schema', {}, ctx);

    expect(spy).toBeCalledTimes(1);
  });
});
