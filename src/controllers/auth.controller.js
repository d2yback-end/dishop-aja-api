const httpStatus = require('http-status');
const { authService } = require('../services');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');

const register = catchAsync(async (req, res) => {
  try {
    const user = await authService.createUser(req.body);

    res.status(httpStatus.CREATED).send(user);
  } catch (error) {
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, error);
  }
});

module.exports = {
  register,
};
