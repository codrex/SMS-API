const User = require('../lib/repositories/User');

const {
  sendFailure,
  sendSuccess,
  sendServerError,
  buildMsg,
} = require('../lib/utils');
const {
  UNIQUE_CONSTRAINT_ERR,
  OK_CODE,
  NOT_FOUND,
  NOT_FOUND_ERROR,
} = require('../constants');
const BaseController = require('./base');

const EXCLUDES = ['phoneNumber', 'name', 'createdAt', 'updatedAt'];
class UserController extends BaseController {
  static async create(ctx) {
    try {
      await super.create(ctx, User);
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
      await super.get(ctx, User);
    } catch (error) {
      sendServerError(ctx);
    }
  }

  static async _getUserMessages(ctx, options) {
    const model = {
      get: async (db, userId) => User.get(db, userId, options),
    };
    try {
      await super.get(ctx, model);
    } catch (error) {
      sendServerError(ctx);
    }
  }

  static async getSentMessages(ctx) {
    await UserController._getUserMessages(ctx, {
      sentMsg: true,
      exclude: EXCLUDES,
    });
  }

  static async getReceiveMessages(ctx) {
    await UserController._getUserMessages(ctx, {
      receivedMsg: true,
      exclude: EXCLUDES,
    });
  }

  static async getAllMessages(ctx) {
    await UserController._getUserMessages(ctx, {
      receivedMsg: true,
      sentMsg: true,
      exclude: EXCLUDES,
    });
  }

  static async delete(ctx) {
    try {
      await super.delete(ctx, User);
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
