/* eslint-disable no-underscore-dangle */
const httpStatus = require('http-status');
const Product = require('../models/product.model');
const ApiError = require('../utils/ApiError');

/**
 * Create a Product
 * @param {Object} productBody
 * @returns {Promise<Product>}
 */
const createProduct = async (productBody) => {
  const products = new Product(productBody);
  const product = await products.save();

  return product;
};

/**
 * Get all Product
 * @returns {Promise<Product>}
 */
const getProducts = async (queryNew, queryCategory) => {
  let products;

  if (queryNew) {
    products = await Product.find().sort({ createdAt: -1 }).limit(1);
  } else if (queryCategory) {
    products = await Product.find({
      categories: {
        $in: [queryCategory],
      },
    });
  } else {
    products = await Product.find();
  }

  return products;
};

/**
 * Get Product by Id
 * @param {Number} id
 * @returns {Promise<Product>}
 */
const getProductById = async (id) => {
  const product = await Product.findById(id);

  return product;
};

/**
 * Update Product by Id
 * @param {Number} id
 * @param {Object} productBody
 * @returns {Promise<Product>}
 */
const updateProduct = async (id, productBody) => {
  const productExists = await getProductById(id);

  if (!productExists) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Product not found');
  }

  const product = await Product.findByIdAndUpdate(
    id,
    {
      $set: productBody,
    },
    {
      new: true,
    },
  );

  return product.id;
};

/**
 * Delete Product by Id
 * @param {Number} id
 * @returns {Promise<Product>}
 */
const deleteProduct = async (id) => {
  const productExists = await getProductById(id);

  if (!productExists) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Product not found');
  }

  const product = await Product.findByIdAndDelete(id);

  return product.id;
};

module.exports = {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};
