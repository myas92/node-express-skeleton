const Joi = require("joi");
const {
  passwordPattern,
  phoneEmailPattern,
  phonePattern,
} = require("../../../const/regex-pattern");

const authSchema = {
  signup: Joi.object().keys({
    display_name: Joi.string().min(3).max(35).required(),
    username: Joi.string().regex(phoneEmailPattern).required(),
    password: Joi.string().regex(passwordPattern).required(),
  }),
  signup_email: Joi.object().keys({
    display_name: Joi.string().min(3).max(35).required(),
    email: Joi.string().email().required(),
    password: Joi.string().regex(passwordPattern).required(),
  }),
  signup_confirm: Joi.object().keys({
    username: Joi.string().regex(phoneEmailPattern).required(),
    verify_code: Joi.string().required().min(5).max(5),
  }),
  login: Joi.object().keys({
    username: Joi.string().regex(phoneEmailPattern).required(),
    password: Joi.string().regex(passwordPattern).required(),
  }),
  forget_password: Joi.object().keys({
    username: Joi.string().regex(phoneEmailPattern).required()
  }),
  signup_phone_number: Joi.object().keys({
    calling_code: Joi.string().min(2).max(4),
    phone_number: Joi.string().length(10).regex(phonePattern).required(),
    password: Joi.string().regex(passwordPattern).required(),
  }),
  signup_national_code: Joi.object().keys({
    national_code: Joi.string().required().min(2).max(10),
    password: Joi.string().regex(passwordPattern).required(),
  }),
  login_phone_number: Joi.object().keys({
    calling_code: Joi.string().min(2).max(4).required(),
    phone_number: Joi.string().length(10).regex(phonePattern).required(),
    password: Joi.string().regex(passwordPattern).required(),
  }),
  login_national_code: Joi.object().keys({
    national_code: Joi.string().min(2).max(4),
    password: Joi.string().regex(passwordPattern).required(),
  }),
};

module.exports = authSchema;
