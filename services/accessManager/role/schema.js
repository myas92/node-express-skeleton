const Joi = require("joi");

const placeSchema = {
  place: Joi.object().keys({
    title: Joi.string().required(),
    description: Joi.string().required(),
    address: Joi.string().required(),
    coordinates: Joi.object().keys({
      lat: Joi.number().strict().required(),
      lng: Joi.number().strict().required(),
    }),
    creator: Joi.string().required(),
  }),
  userId : Joi.object().keys({
    uid: Joi.string().optional()
  })
};

module.exports = placeSchema;
