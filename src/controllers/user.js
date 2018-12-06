const pushid = require('pushid');
const User = require('../lib/repositories/User');

const {
  sendFailure,
  sendSuccess,
  sendServerError,
  buildMsg,
} = require('../lib/utils');
const {
  RESOURCE_CREATED_CODE,
  UNIQUE_CONSTRAINT_ERR,
  OK_CODE,
  NOT_FOUND,
  NOT_FOUND_ERROR,
  RESOURCE_DELETED,
} = require('../constants');

class UserController {
  static async create(ctx) {
    try {
      const { body } = ctx.request;
      body.id = pushid();
      const userRecord = await User.create(ctx.db, body);
      sendSuccess(ctx, userRecord, RESOURCE_CREATED_CODE);
    } catch (error) {
      if (error.name === UNIQUE_CONSTRAINT_ERR) {
        const { path, message } = error.errors[0];
        sendFailure(ctx, { [path]: message });
      } else {
        sendServerError(ctx);
      }
    }
  }

  static async get(ctx) {
    try {
      const {
        params: { id },
      } = ctx;
      const userRecord = await User.get(ctx.db, id);
      if (userRecord) {
        sendSuccess(ctx, userRecord, OK_CODE);
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
      const userRecord = await User.delete(ctx.db, id);
      if (userRecord) {
        sendSuccess(ctx, buildMsg(RESOURCE_DELETED), OK_CODE);
      } else {
        sendFailure(ctx, buildMsg(NOT_FOUND_ERROR), NOT_FOUND);
      }
    } catch (error) {
      sendServerError(ctx);
    }
  }

  static async update(ctx, next) {
    try {
      const {
        params: { id },
      } = ctx;
      const userRecord = await User.get(ctx.db, id);
      if (userRecord) {
        const { phoneNumber, name } = userRecord;
        ctx.state.userRecord = { phoneNumber, name };
        await next();
        const { body } = ctx.request;
        const updatedRecord = await User.update(ctx.db, id, body);
        sendSuccess(ctx, updatedRecord[1][0], OK_CODE);
      } else {
        sendFailure(ctx, buildMsg(NOT_FOUND_ERROR), NOT_FOUND);
      }
    } catch (error) {
      sendServerError(ctx);
    }
  }
}

module.exports = UserController;
