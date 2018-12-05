const Router = require('koa-router');
const user = require('./user');
const message = require('./message');

const routes = new Router();

routes.use('/user', user.routes(), user.allowedMethods());
routes.use('/message', message.routes(), message.allowedMethods());

module.exports = routes;
