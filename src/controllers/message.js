const Message = require('../lib/repositories/Message');
const {
  sendFailure,
  sendSuccess,
  sendServerError,
  buildMsg,
} = require('../lib/utils');
const { OK_CODE, NOT_FOUND, NOT_FOUND_ERROR } = require('../constants');
const BaseController = require('./base');

class MessageController extends BaseController {
  static async create(ctx) {
    try {
      await super.create(ctx, Message);
    } catch (error) {
      sendServerError(ctx);
    }
  }

  static async get(ctx) {
    try {
      await super.get(ctx, Message);
    } catch (error) {
      sendServerError(ctx);
    }
  }

  static async delete(ctx) {
    try {
      await super.delete(ctx, Message);
    } catch (error) {
      sendServerError(ctx);
    }
  }

  static async update(ctx) {
    try {
      const {
        params: { id },
        query,
      } = ctx;
      const [count, rows] = await Message.update(ctx.db, id, query);
      if (count) {
        sendSuccess(ctx, rows[0], OK_CODE);
      } else {
        sendFailure(ctx, buildMsg(NOT_FOUND_ERROR), NOT_FOUND);
      }
    } catch (error) {
      sendServerError(ctx);
    }
  }
}

module.exports = MessageController;
