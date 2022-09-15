const httpStatus = require('http-status');
const { userService } = require('../services');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');

const getUsers = catchAsync(async (req, res) => {
  try {
    const users = await userService.getUsers();
    res.status(200).send({
      status: 'success',
      data: {
        users,
      },
    });
  } catch (error) {
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, error);
  }
});

module.exports = {
  getUsers,
};
