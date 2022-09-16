const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createCart = {
  body: Joi.object().keys({
    userId: Joi.string().required().custom(objectId),
    products: Joi.array().required(),
  }),
};

const getCartById = {
  params: Joi.object().keys({
    id: Joi.string().custom(objectId),
  }),
};

const updateCart = {
  params: Joi.object().keys({
    id: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      userId: Joi.string().required().custom(objectId),
      products: Joi.array(),
    })
    .min(1),
};

const deleteCart = {
  params: Joi.object().keys({
    id: Joi.string().custom(objectId),
  }),
};

module.exports = {
  createCart,
  getCartById,
  updateCart,
  deleteCart,
};
