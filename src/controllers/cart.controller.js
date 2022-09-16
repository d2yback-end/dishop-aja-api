const httpStatus = require('http-status');
const { cartService } = require('../services');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');

const createCart = catchAsync(async (req, res) => {
  try {
    const carts = await cartService.createCart(req.body);

    res.status(201).send({
      status: 'success',
      data: {
        carts,
      },
    });
  } catch (error) {
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, error);
  }
});

const getCarts = catchAsync(async (req, res) => {
  try {
    const carts = await cartService.getCarts();

    res.status(200).send({
      status: 'success',
      data: {
        carts,
      },
    });
  } catch (error) {
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, error);
  }
});

const getCartById = catchAsync(async (req, res) => {
  try {
    const { id } = req.params;
    const cart = await cartService.getCartById(id);

    res.status(200).send({
      status: 'success',
      data: {
        cart,
      },
    });
  } catch (error) {
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, error);
  }
});

const updateCart = catchAsync(async (req, res) => {
  try {
    const { id } = req.params;
    const cartId = await cartService.updateCart(id, req.body);

    res.status(200).send({
      status: 'success',
      message: 'cart updated successfully!',
      data: {
        cartId,
      },
    });
  } catch (error) {
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, error);
  }
});

const deleteCart = catchAsync(async (req, res) => {
  try {
    const { id } = req.params;
    const cartId = await cartService.deleteCart(id);

    res.status(200).send({
      status: 'success',
      message: 'cart deleted successfully!',
      data: {
        cartId,
      },
    });
  } catch (error) {
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, error);
  }
});

module.exports = {
  createCart,
  getCarts,
  getCartById,
  updateCart,
  deleteCart,
};
