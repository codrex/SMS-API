const Router = require('koa-router');
const UserController = require('../../controllers/user');
const {
  validateCreateUserData,
  validateUpdateUserData,
} = require('../../middleware');

const user = new Router();

user.post('/user', validateCreateUserData, UserController.create);
user.get('/:id', UserController.get);
user.put('/:id', UserController.update, validateUpdateUserData);
user.delete('/:id', UserController.delete);

module.exports = user;
