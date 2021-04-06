const Joi = require("joi");
Joi.objectId = require('joi-objectid')(Joi)

const testSchema = {
  country: Joi.object().keys({
    name: Joi.string().required(),
  }),
  country_id: Joi.object().keys({
    id: Joi.objectId().required(),
  }),
};

module.exports = testSchema;
