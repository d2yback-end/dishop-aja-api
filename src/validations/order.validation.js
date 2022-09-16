const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createOrder = {
  body: Joi.object().keys({
    userId: Joi.string().required().custom(objectId),
    products: Joi.array().required(),
    amount: Joi.number().required(),
    address: Joi.string().required(),
  }),
};

const getOrderById = {
  params: Joi.object().keys({
    id: Joi.string().custom(objectId),
  }),
};

const updateOrder = {
  params: Joi.object().keys({
    id: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      userId: Joi.string().required().custom(objectId),
      products: Joi.array().required(),
      amount: Joi.number().required(),
      address: Joi.string().required(),
    })
    .min(1),
};

const deleteOrder = {
  params: Joi.object().keys({
    id: Joi.string().custom(objectId),
  }),
};

const getMonthlyIncome = {
  query: Joi.object().keys({
    id: Joi.string().custom(objectId),
  }),
};

module.exports = {
  createOrder,
  getOrderById,
  updateOrder,
  deleteOrder,
  getMonthlyIncome,
};
