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
  const email = await User.findOne({ email: userBody.email });

  if (email) {
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'Email is already taken!');
  }

  const user = new User(userBody);
  const data = await user.save();

  const { password, ...others } = data._doc;

  return others;
};

module.exports = {
  createUser,
};
