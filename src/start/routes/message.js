const Router = require('koa-router');
const MessageController = require('../../controllers/message');
const {
  validateCreateMessageData,
  validateUpdateMessageStatus,
} = require('../../middleware');

const message = new Router();

message.post('/message', validateCreateMessageData, MessageController.create);
message.get('/:id', MessageController.get);
message.patch('/:id', validateUpdateMessageStatus, MessageController.update);
message.delete('/:id', MessageController.delete);

module.exports = message;
