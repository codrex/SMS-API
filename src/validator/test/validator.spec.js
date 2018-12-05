const validator = require('../');
const { user } = require('../schema');

const {
  createUserMock,
  SERVER_ERROR,
  SERVER_ERROR_CODE,
} = require('../../constants');

const ctx = { next: jest.fn(), throw: jest.fn() };
describe('validator', () => {
  it('should validate user data and call next when data is valid', async () => {
    const userData = createUserMock();
    await validator(userData, user, ctx);
    expect(ctx.next).toBeCalledTimes(1);
  });

  it('should respond with an error object when data is invalid', async () => {
    await validator({}, user, ctx);
    expect(ctx.throw).toBeCalledTimes(1);
  });

  it('should respond with server error when another occurs', async () => {
    await validator({}, 'schema', ctx);
    expect(ctx.throw).toBeCalledWith(SERVER_ERROR_CODE, SERVER_ERROR);
  });
});
