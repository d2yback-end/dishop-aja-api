const httpStatus = require('http-status');
const { authService, userService } = require('../services');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');

const register = catchAsync(async (req, res) => {
  try {
    const user = await userService.createUser(req.body);

    res.status(httpStatus.CREATED).send({
      status: 'success',
      message: 'User Created Successfully',
      data: {
        userId: user._id,
      },
    });
  } catch (error) {
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, error);
  }
});

const login = catchAsync(async (req, res) => {
  try {
    const user = await authService.login(req.body);

    res.status(httpStatus.OK).send({
      status: 'success',
      data: {
        accessToken: user.accessToken,
        refreshToken: user.refreshToken,
      },
    });
  } catch (error) {
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, error);
  }
});

const updateAccessToken = catchAsync(async (req, res) => {
  try {
    const accessToken = await authService.updateAccessToken(req.body);

    res.status(httpStatus.OK).send({
      status: 'success',
      data: {
        accessToken,
      },
    });
  } catch (error) {
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, error);
  }
});

module.exports = {
  register,
  login,
  updateAccessToken,
};
