const pushid = require('pushid');

const { sendFailure, sendSuccess, buildMsg } = require('../lib/utils');
const {
  RESOURCE_CREATED_CODE,
  OK_CODE,
  NOT_FOUND,
  NOT_FOUND_ERROR,
  RESOURCE_DELETED,
} = require('../constants');

class BaseController {
  static async create(ctx, model) {
    const { body } = ctx.request;
    body.id = pushid();
    const record = await model.create(ctx.db, body);
    sendSuccess(ctx, record, RESOURCE_CREATED_CODE);
  }

  static async get(ctx, model) {
    const {
      params: { id },
    } = ctx;
    const record = await model.get(ctx.db, id);
    if (record) {
      sendSuccess(ctx, record, OK_CODE);
    } else {
      sendFailure(ctx, buildMsg(NOT_FOUND_ERROR), NOT_FOUND);
    }
  }

  static async delete(ctx, model) {
    const {
      params: { id },
    } = ctx;
    const deleteCount = await model.delete(ctx.db, id);
    if (deleteCount) {
      sendSuccess(ctx, buildMsg(RESOURCE_DELETED), OK_CODE);
    } else {
      sendFailure(ctx, buildMsg(NOT_FOUND_ERROR), NOT_FOUND);
    }
  }
}

module.exports = BaseController;
