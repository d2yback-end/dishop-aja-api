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

module.exports = {
  createUser,
};
