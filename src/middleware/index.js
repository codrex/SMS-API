const validator = require('../lib/validator');
const { user, message, status } = require('../lib/validator/schema');
const User = require('../lib/repositories/User');
const { sendFailure, buildMsg } = require('../lib/utils');
const {
  BAD_REQUEST_CODE,
  INVALID_RECEIVER,
  INVALID_SENDER,
} = require('../constants');

async function validateCreateUserData(ctx, next) {
  const data = ctx.request.body;
  await validator(user, data, ctx, next);
}

async function validateUpdateUserData(ctx) {
  const {
    request: { body },
    state: { userRecord },
  } = ctx;
  const data = { ...userRecord, ...body };
  await validator(user, data, ctx);
}

async function validateCreateMessageData(ctx, next) {
  const data = ctx.request.body;
  await validator(message, data, ctx, next);
}

async function validateUpdateMessageStatus(ctx, next) {
  const data = ctx.query;
  await validator(status, data, ctx, next);
}

async function checkIfIdsExist(ctx, next) {
  const { senderId, receiverId } = ctx.request.body;
  const sender = await User.get(ctx.db, senderId);
  if (!sender) {
    return sendFailure(ctx, buildMsg(INVALID_SENDER), BAD_REQUEST_CODE);
  }
  const receiver = await User.get(ctx.db, receiverId);
  if (!receiver) {
    return sendFailure(ctx, buildMsg(INVALID_RECEIVER), BAD_REQUEST_CODE);
  }
  await next();
}

module.exports = {
  validateCreateMessageData,
  validateCreateUserData,
  validateUpdateUserData,
  validateUpdateMessageStatus,
  checkIfIdsExist,
};
