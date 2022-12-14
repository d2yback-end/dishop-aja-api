/* eslint-disable no-underscore-dangle */
const httpStatus = require('http-status');
const User = require('../models/user.model');
const ApiError = require('../utils/ApiError');

/**
 * Create a user
 * @param {Object} userBody
 * @returns {Promise<User>}
 */
const createUser = async (userBody) => {
  const emailExist = await User.findOne({ email: userBody.email });

  if (emailExist) {
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, `${emailExist.email} is already taken!`);
  }

  const user = new User(userBody);
  const data = await user.save();

  const { password, ...others } = data._doc;

  return others;
};

/**
 * Get all user
 * @returns {Promise<User>}
 */
const getUsers = async () => {
  const user = await User.find();

  return user;
};

/**
 * Get user by id
 * @param {String} id
 * @returns {Promise<User>}
 */
const getUserById = async (id) => {
  const user = await User.findById(id);
  const { password, ...others } = user._doc;

  return others;
};

/**
 * Update a user by id
 * @param {String} id
 * @param {Object} userBody
 * @returns {Promise<User>}
 */
const updateUser = async (id, userBody) => {
  const user = await getUserById(id);

  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }

  const updatedUser = await User.findByIdAndUpdate(
    id,
    {
      $set: userBody,
    },
    {
      new: true,
    },
  );

  return updatedUser.id;
};

/**
 * Delete a user by id
 * @param {String} id
 * @returns {Promise<User>}
 */
const deleteUser = async (id) => {
  const user = await User.findByIdAndDelete(id);

  return user.id;
};

/**
 * Show statistics from a user
 * @returns {Object} data
 */
const statsUser = async () => {
  const date = new Date();
  const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));

  const data = await User.aggregate([
    { $match: { createdAt: { $gte: lastYear } } },
    {
      $project: {
        month: { $month: '$createdAt' },
      },
    },
    {
      $group: {
        _id: '$month',
        total: { $sum: 1 },
      },
    },
  ]);
  return data;
};

module.exports = {
  createUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
  statsUser,
};
