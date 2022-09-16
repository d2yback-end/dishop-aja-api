const httpStatus = require('http-status');
const { productService } = require('../services');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');

const createProduct = catchAsync(async (req, res) => {
  try {
    const products = await productService.createProduct(req.body);

    res.status(201).send({
      status: 'success',
      data: {
        products,
      },
    });
  } catch (error) {
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, error);
  }
});

const getProducts = catchAsync(async (req, res) => {
  try {
    const queryNew = req.query.new;
    const queryCategory = req.query.category;
    const products = await productService.getProducts(queryNew, queryCategory);

    res.status(200).send({
      status: 'success',
      data: {
        products,
      },
    });
  } catch (error) {
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, error);
  }
});

const getProductById = catchAsync(async (req, res) => {
  try {
    const { id } = req.params;
    const product = await productService.getProductById(id);

    res.status(200).send({
      status: 'success',
      data: {
        product,
      },
    });
  } catch (error) {
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, error);
  }
});

const updateProduct = catchAsync(async (req, res) => {
  try {
    const { id } = req.params;
    const productId = await productService.updateProduct(id, req.body);

    res.status(200).send({
      status: 'success',
      message: 'Product updated successfully!',
      data: {
        productId,
      },
    });
  } catch (error) {
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, error);
  }
});

const deleteProduct = catchAsync(async (req, res) => {
  try {
    const { id } = req.params;
    const productId = await productService.deleteProduct(id);

    res.status(200).send({
      status: 'success',
      message: 'Product deleted successfully!',
      data: {
        productId,
      },
    });
  } catch (error) {
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, error);
  }
});

module.exports = {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};
