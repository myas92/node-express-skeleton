const Joi = require("joi");
const ErrorHandler = require("../util/http-error");
const validator = (schema, property) => {
  return (req, res, next) => {
    const { error } = Joi.validate(req[property], schema);

    const valid = error == null;
    if (valid) {
      next();
    } else {
      const { details } = error;
      const message = details.map((i) => i.message).join(",");
      console.log("error", message);

      throw new ErrorHandler(message, 422);
    }
  };
};

exports.validator = validator;
