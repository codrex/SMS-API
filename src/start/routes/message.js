const Router = require('koa-router');

const message = new Router();
const messageEndpoint = '/:id';

async function mock(ctx) {
  ctx.body = { id: 'ooooo' };
}
message.post(messageEndpoint, mock);
message.delete(messageEndpoint, mock);

module.exports = message;
