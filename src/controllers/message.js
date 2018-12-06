const pushid = require('pushid');
const Message = require('../lib/repositories/Message');
const {
  sendFailure,
  sendSuccess,
  sendServerError,
  buildMsg,
} = require('../lib/utils');
const {
  RESOURCE_CREATED_CODE,
  OK_CODE,
  NOT_FOUND,
  NOT_FOUND_ERROR,
  RESOURCE_DELETED,
} = require('../constants');

class MessageController {
  static async create(ctx) {
    try {
      const { body } = ctx.request;
      body.id = pushid();
      const messageRecord = await Message.create(ctx.db, body);
      sendSuccess(ctx, messageRecord, RESOURCE_CREATED_CODE);
    } catch (error) {
      sendServerError(ctx);
    }
  }

  static async get(ctx) {
    try {
      const {
        params: { id },
      } = ctx;
      const record = await Message.get(ctx.db, id);
      if (record) {
        sendSuccess(ctx, record, OK_CODE);
      } else {
        sendFailure(ctx, buildMsg(NOT_FOUND_ERROR), NOT_FOUND);
      }
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

  static async delete(ctx) {
    try {
      const {
        params: { id },
      } = ctx;
      const record = await Message.delete(ctx.db, id);
      if (record) {
        sendSuccess(ctx, buildMsg(RESOURCE_DELETED), OK_CODE);
      } else {
        sendFailure(ctx, buildMsg(NOT_FOUND_ERROR), NOT_FOUND);
      }
    } catch (error) {
      sendServerError(ctx);
    }
  }
}

module.exports = MessageController;
