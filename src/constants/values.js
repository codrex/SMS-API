const STATUS = {
  READ: 'READ',
  UNREAD: 'UNREAD',
};
const BAD_REQUEST_CODE = 400;
const UNAUTHORIZED_CODE = 403;
const OK_CODE = 200;
const NOT_FOUND = 404;
const SERVER_ERROR_CODE = 500;
const PORT = process.env.PORT || 5500;
const NOT_FOUND_ERROR = 'Resource not found';
const SERVER_ERROR = 'Server error occurred';
const UNIQUE_CONSTRAINT_ERR = 'SequelizeUniqueConstraintError';
const RESOURCE_DELETED = 'Resource deleted';
const INVALID_SENDER = 'Sender is not a valid user';
const INVALID_RECEIVER = 'Receiver is not a valid user';

module.exports = {
  PORT,
  STATUS,
  SERVER_ERROR,
  BAD_REQUEST_CODE,
  SERVER_ERROR_CODE,
  OK_CODE,
  NOT_FOUND,
  UNIQUE_CONSTRAINT_ERR,
  NOT_FOUND_ERROR,
  UNAUTHORIZED_CODE,
  RESOURCE_DELETED,
  INVALID_SENDER,
  INVALID_RECEIVER,
};
