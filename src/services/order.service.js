/* eslint-disable no-underscore-dangle */
const httpStatus = require('http-status');
const Order = require('../models/order.model');
const ApiError = require('../utils/ApiError');

/**
 * Create a Order
 * @param {Object} orderBody
 * @returns {Promise<Order>}
 */
const createOrder = async (orderBody) => {
  const orders = new Order(orderBody);
  const order = await orders.save();

  return order;
};

/**
 * Get all Order
 * @returns {Promise<Order>}
 */
const getOrders = async () => {
  const orders = await Order.find();

  return orders;
};

/**
 * Get Order by Id
 * @param {Number} id
 * @returns {Promise<Order>}
 */
const getOrderById = async (id) => {
  const order = await Order.findById(id);

  return order;
};

/**
 * Update Order by Id
 * @param {Number} id
 * @param {Object} orderBody
 * @returns {Promise<Order>}
 */
const updateOrder = async (id, orderBody) => {
  const orderExists = await getOrderById(id);

  if (!orderExists) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Order not found');
  }

  const order = await Order.findByIdAndUpdate(
    id,
    {
      $set: orderBody,
    },
    {
      new: true,
    },
  );

  return order.id;
};

/**
 * Delete Order by Id
 * @param {Number} id
 * @returns {Promise<Order>}
 */
const deleteOrder = async (id) => {
  const orderExists = await getOrderById(id);

  if (!orderExists) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Order not found');
  }

  const order = await Order.findByIdAndDelete(id);

  return order.id;
};

/**
 * Get Monthly Income Product
 * @param {Number} id
 * @returns {Promise<Order>}
 */
const getMonthlyIncome = async (id) => {
  const date = new Date();
  const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
  const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1));

  const income = await Order.aggregate([
    {
      $match: {
        createdAt: { $gte: previousMonth },
        ...(id && {
          products: { $elemMatch: { id } },
        }),
      },
    },
    {
      $project: {
        month: { $month: '$createdAt' },
        sales: '$amount',
      },
    },
    {
      $group: {
        _id: '$month',
        total: { $sum: '$sales' },
      },
    },
  ]);

  return income;
};

module.exports = {
  createOrder,
  getOrders,
  getOrderById,
  updateOrder,
  deleteOrder,
  getMonthlyIncome,
};
