const Joi = require("joi");

const userSchema = {
  signup: Joi.object.keys({
    name: Joi.string().required().min(1).max(30),
    email: Joi.string().email().required(),
    password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),
  }),
};

module.exports = userSchema;
