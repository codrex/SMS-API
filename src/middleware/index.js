const validator = require('../lib/validator');
const { user, message, status } = require('../lib/validator/schema');

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

module.exports = {
  validateCreateMessageData,
  validateCreateUserData,
  validateUpdateUserData,
  validateUpdateMessageStatus,
};
