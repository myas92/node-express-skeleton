const Joi = require("joi");

const Validation = (data) => {
  const schema = Joi.object({
    details: {
      firstname: Joi.string().required(),
      lastname: Joi.string().required(),
    },
  });
  const schema1 = Joi.object({
    details: {
      firstname: Joi.string().required(),
      lastname: Joi.string().required(),
    },
  });
  let error = schema.validate(data)
  let error1= schema1.validate(data)
  return error1;
};

module.exports = {
  Validation,
};