const joi = require('joi');
const { STATUS } = require('../../constants');
const { overrideRegexErrorMsg } = require('../utils');

const user = joi.object({
  phoneNumber: joi
    .string()
    .length(10)
    .regex(/^\d+$/)
    .required()
    .error(overrideRegexErrorMsg('"phoneNumber" can only contain numbers')),

  name: joi
    .string()
    .regex(/^[a-zA-Z\s-]+$/)
    .required()
    .error(overrideRegexErrorMsg('"name" can only contain alphabet and space')),
});

const message = joi.object({
  text: joi
    .string()
    .trim()
    .required(),
  status: joi
    .string()
    .only(Object.values(STATUS))
    .uppercase(),
  senderId: joi.number().required(),
  receiverId: joi.number().required(),
});

module.exports = { message, user };
