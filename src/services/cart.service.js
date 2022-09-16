/* eslint-disable no-underscore-dangle */
const httpStatus = require('http-status');
const Cart = require('../models/cart.model');
const ApiError = require('../utils/ApiError');

/**
 * Create a Cart
 * @param {Object} cartBody
 * @returns {Promise<Cart>}
 */
const createCart = async (cartBody) => {
  const carts = new Cart(cartBody);
  const cart = await carts.save();

  return cart;
};

/**
 * Get all Cart
 * @returns {Promise<Cart>}
 */
const getCarts = async () => {
  const carts = await Cart.find();

  return carts;
};

/**
 * Get Cart by Id
 * @param {Number} id
 * @returns {Promise<Cart>}
 */
const getCartById = async (id) => {
  const cart = await Cart.findById(id);

  return cart;
};

/**
 * Update Cart by Id
 * @param {Number} id
 * @param {Object} cartBody
 * @returns {Promise<Cart>}
 */
const updateCart = async (id, cartBody) => {
  const cartExists = await getCartById(id);

  if (!cartExists) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Cart not found');
  }

  const cart = await Cart.findByIdAndUpdate(
    id,
    {
      $set: cartBody,
    },
    {
      new: true,
    },
  );

  return cart.id;
};

/**
 * Delete Cart by Id
 * @param {Number} id
 * @returns {Promise<Cart>}
 */
const deleteCart = async (id) => {
  const cartExists = await getCartById(id);

  if (!cartExists) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Cart not found');
  }

  const cart = await Cart.findByIdAndDelete(id);

  return cart.id;
};

module.exports = {
  createCart,
  getCarts,
  getCartById,
  updateCart,
  deleteCart,
};
