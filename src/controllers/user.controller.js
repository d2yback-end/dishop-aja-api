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

const getUserById = catchAsync(async (req, res) => {
  try {
    const { id } = req.params;
    const user = await userService.getUserById(id);

    res.status(200).send({
      status: 'success',
      data: {
        user,
      },
    });
  } catch (error) {
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, error);
  }
});

const updateUser = catchAsync(async (req, res) => {
  try {
    const { id } = req.params;
    const userId = await userService.updateUser(id, req.body);

    res.status(200).send({
      status: 'success',
      message: 'User updated successfully!',
      data: {
        userId,
      },
    });
  } catch (error) {
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, error);
  }
});

const deleteUser = catchAsync(async (req, res) => {
  try {
    const { id } = req.params;
    const userId = await userService.deleteUser(id);

    res.status(200).send({
      status: 'success',
      message: 'User deleted successfully!',
      data: {
        userId,
      },
    });
  } catch (error) {
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, error);
  }
});

const statsUser = catchAsync(async (req, res) => {
  try {
    const stats = await userService.statsUser();

    res.status(200).send({
      status: 'success',
      data: {
        stats,
      },
    });
  } catch (error) {
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, error);
  }
});

module.exports = {
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
  statsUser,
};
