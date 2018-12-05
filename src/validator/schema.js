const joi = require('joi');
const { STATUS } = require('../constants');

const user = joi.object({
  phoneNumber: joi
    .string()
    .length(10)
    .regex(/^\d+$/)
    .required(),
  name: joi
    .string()
    .regex(/^[a-zA-Z\s-]+$/)
    .required(),
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
