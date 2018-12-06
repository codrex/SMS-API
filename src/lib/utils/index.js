const {
  SERVER_ERROR,
  SERVER_ERROR_CODE,
  OK_CODE,
  BAD_REQUEST_CODE,
} = require('../../constants');

function sendSuccess(ctx, data, statusCode = OK_CODE) {
  ctx.status = statusCode;
  ctx.body = {
    success: true,
    data,
  };
}

function sendFailure(ctx, error, statusCode = BAD_REQUEST_CODE) {
  ctx.status = statusCode;
  ctx.response.body = {
    success: false,
    error,
  };
}

function sendServerError(ctx, statusCode = SERVER_ERROR_CODE) {
  sendFailure(ctx, SERVER_ERROR, statusCode);
}

function overrideRegexErrorMsg(message) {
  return errors => errors.map((error) => {
    if (error.type === 'string.regex.base') {
      return { message };
    }
    return error;
  });
}
function buildMsg(data) {
  return { message: data };
}

module.exports = {
  sendServerError,
  sendFailure,
  sendSuccess,
  overrideRegexErrorMsg,
  buildMsg,
};
