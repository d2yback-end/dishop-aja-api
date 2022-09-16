const httpStatus = require('http-status');
const { orderService } = require('../services');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');

const createOrder = catchAsync(async (req, res) => {
  try {
    const orders = await orderService.createOrder(req.body);

    res.status(201).send({
      status: 'success',
      data: {
        orders,
      },
    });
  } catch (error) {
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, error);
  }
});

const getOrders = catchAsync(async (req, res) => {
  try {
    const orders = await orderService.getOrders();

    res.status(200).send({
      status: 'success',
      data: {
        orders,
      },
    });
  } catch (error) {
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, error);
  }
});

const getOrderById = catchAsync(async (req, res) => {
  try {
    const { id } = req.params;
    const order = await orderService.getOrderById(id);

    res.status(200).send({
      status: 'success',
      data: {
        order,
      },
    });
  } catch (error) {
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, error);
  }
});

const updateOrder = catchAsync(async (req, res) => {
  try {
    const { id } = req.params;
    const orderId = await orderService.updateOrder(id, req.body);

    res.status(200).send({
      status: 'success',
      message: 'Order updated successfully!',
      data: {
        orderId,
      },
    });
  } catch (error) {
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, error);
  }
});

const deleteOrder = catchAsync(async (req, res) => {
  try {
    const { id } = req.params;
    const orderId = await orderService.deleteOrder(id);

    res.status(200).send({
      status: 'success',
      message: 'Order deleted successfully!',
      data: {
        orderId,
      },
    });
  } catch (error) {
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, error);
  }
});

const getMonthlyIncome = catchAsync(async (req, res) => {
  try {
    const { id } = req.query;
    const income = await orderService.getMonthlyIncome(id);

    res.status(200).send({
      status: 'success',
      data: {
        income,
      },
    });
  } catch (error) {
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, error);
  }
});

module.exports = {
  createOrder,
  getOrders,
  getOrderById,
  updateOrder,
  deleteOrder,
  getMonthlyIncome,
};
