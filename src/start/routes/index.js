const Router = require('koa-router');
const user = require('./user');
const message = require('./message');

const routes = new Router();
routes.use('/api/v1/users', user.routes(), user.allowedMethods());
routes.use('/api/v1/message', message.routes(), message.allowedMethods());

module.exports = routes;
