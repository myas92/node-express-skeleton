const Joi = require("joi");

const testSchema = {
  testOne: Joi.object().keys({
    title: Joi.string().required(),
    description: Joi.string().required(),
    address: Joi.string().required(),
    coordinates: Joi.object().keys({
      lat: Joi.number().strict().required(),
      lng: Joi.number().strict().required(),
    }),
    creator: Joi.string().required(),
  }),
  testTwo : Joi.object().keys({
    uid: Joi.string().optional()
  })
};

module.exports = testSchema;
