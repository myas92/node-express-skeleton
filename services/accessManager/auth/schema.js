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
    username: Joi.string().regex(phoneEmailPattern).required(),
  }),
  forget_password_confirm: Joi.object().keys({
    username: Joi.string().regex(phoneEmailPattern).required(),
    verify_code: Joi.string().required().min(5).max(5),
  }),
  forget_password_reset: Joi.object().keys({
    password: Joi.string().regex(passwordPattern).required(),
    reset_token: Joi.string().required(),
  }),
  reset_password: Joi.object().keys({
    password: Joi.string().regex(passwordPattern).required(),
    new_password: Joi.string().regex(passwordPattern).required(),
  }),
};

module.exports = authSchema;
