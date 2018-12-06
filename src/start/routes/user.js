const Router = require('koa-router');
const UserController = require('../../controllers/user');
const {
  validateCreateUserData,
  validateUpdateUserData,
} = require('../../middleware');

const user = new Router();

user.post('/user', validateCreateUserData, UserController.create);
user.put('/:id', UserController.update, validateUpdateUserData);
user.delete('/:id', UserController.delete);
user.get('/:id', UserController.get);
user.get('/:id/messages/received', UserController.getReceiveMessages);
user.get('/:id/messages/sent', UserController.getSentMessages);
user.get('/:id/messages/all', UserController.getAllMessages);
module.exports = user;
