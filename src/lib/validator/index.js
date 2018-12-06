const joi = require('joi');
const { SERVER_ERROR } = require('../../constants');
const utils = require('../../lib/utils');

const ABORT_EARLY = false;

function validateSchema(schema) {
  if (!schema.isJoi) {
    throw new Error(SERVER_ERROR);
  }
}
async function validator(schema, ctx, next) {
  try {
    validateSchema(schema);
    const { body } = ctx.request;
    await joi.validate(body, schema, { abortEarly: ABORT_EARLY });
    if (next) {
      await next();
    }
  } catch (error) {
    const { details } = error;
    if (details) {
      const errors = details.map(({ path, message }) => ({
        [path]: message,
      }));
      utils.sendFailure(ctx, errors);
    } else {
      utils.sendServerError(ctx);
    }
  }
}

module.exports = validator;
