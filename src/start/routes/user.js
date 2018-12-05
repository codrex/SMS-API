const Router = require('koa-router');

const user = new Router();
const userEndpoint = '/:id';

async function mock(ctx) {
  ctx.body = 'hello user';
}

user.get(userEndpoint, mock);
user.post(userEndpoint, mock);
user.put(userEndpoint, mock);
user.delete(userEndpoint, mock);

module.exports = user;
