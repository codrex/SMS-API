const STATUS = {
  READ: 'READ',
  UNREAD: 'UNREAD',
};
const BAD_REQUEST_CODE = 400;
const SERVER_ERROR_CODE = 500;
const PORT = process.env.PORT || 5500;
const SERVER_ERROR = 'Server error occurred';

module.exports = {
  PORT,
  STATUS,
  SERVER_ERROR,
  BAD_REQUEST_CODE,
  SERVER_ERROR_CODE,
};
