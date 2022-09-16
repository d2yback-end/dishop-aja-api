const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createProduct = {
  body: Joi.object().keys({
    title: Joi.string().required(),
    desc: Joi.string().required(),
    image: Joi.string().required(),
    categories: Joi.array().required(),
    size: Joi.array().required(),
    color: Joi.array().required(),
    price: Joi.number().required(),
  }),
};

const getProducts = {
  query: Joi.object().keys({
    new: Joi.boolean(),
    category: Joi.string(),
  }),
};

const getProductById = {
  params: Joi.object().keys({
    id: Joi.string().custom(objectId),
  }),
};

const updateProduct = {
  params: Joi.object().keys({
    id: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      title: Joi.string(),
      desc: Joi.string(),
      image: Joi.string(),
      categories: Joi.array(),
      size: Joi.array(),
      color: Joi.array(),
      price: Joi.number(),
    })
    .min(1),
};

const deleteProduct = {
  params: Joi.object().keys({
    id: Joi.string().custom(objectId),
  }),
};

module.exports = {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};
