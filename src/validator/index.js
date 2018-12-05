const joi = require('joi');
const {
  SERVER_ERROR,
  SERVER_ERROR_CODE,
  BAD_REQUEST_CODE,
} = require('../constants');

const ERROR = 'error';
const VALIDATE_ALL = true;

function validateSchema(schema) {
  if (!schema.isJoi) {
    throw new Error(SERVER_ERROR);
  }
}
async function validator(data, schema, ctx = {}) {
  try {
    validateSchema(schema);
    await joi.validate(data, schema, { abortEarly: VALIDATE_ALL });
    if (ctx.next) {
      ctx.next();
    }
  } catch (error) {
    const { details } = error;
    if (details) {
      const errors = details.map(({ path, message }) => ({ [path]: message }));
      ctx.throw(BAD_REQUEST_CODE, ERROR, errors);
    } else {
      ctx.throw(SERVER_ERROR_CODE, SERVER_ERROR);
    }
  }
}

module.exports = validator;
