const Joi = require("joi");
const ErrorHandler = require("../util/http-error");
const {Joi_Errors} = require('../const/errors');
const validator = (schema, property) => {
  return (req, res, next) => {
    const { error } = Joi.validate(req[property], schema);

    const valid = error == null;
    if (valid) {
      next();
    } else {
      const { details } = error;
      const message = details.map((i) => i.message).join(",");
      Joi_Errors.message.EN = message
      throw new ErrorHandler(Joi_Errors, req.language);
    }
  };
};

exports.validator = validator;
