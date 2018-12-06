const validator = require('../lib/validator');
const { user, message } = require('../lib/validator/schema');

async function validateCreateUserData(ctx, next) {
  await validator(user, ctx, next);
}

async function validateUpdateUserData(ctx) {
  const {
    request: { body },
    state: { userRecord },
  } = ctx;
  ctx.request.body = { ...userRecord, ...body };
  await validator(user, ctx);
}

async function validateCreateMessageData(ctx) {
  const { body } = ctx;
  await validator(body, message, ctx);
}

module.exports = {
  validateCreateMessageData,
  validateCreateUserData,
  validateUpdateUserData,
};
