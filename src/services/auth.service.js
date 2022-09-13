const httpStatus = require('http-status');
const User = require('../models/user.model');
const ApiError = require('../utils/ApiError');
const { signAccessToken, signRefreshToken, saveToken } = require('./token.service');

/**
 * Login a user
 * @param {Object} userBody
 * @returns {Promise<User>}
 */
const login = async (userBody) => {
  const user = await User.findOne({ email: userBody.email });
  if (!user) {
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'User not registered!');
  }

  const pwMatches = await user.isValidPassword(userBody.password);
  if (!pwMatches) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Wrong Password!');
  }

  const accessToken = await signAccessToken(user._id, user.isAdmin);
  const refreshToken = await signRefreshToken(user._id, user.isAdmin);

  await saveToken(refreshToken, user._id);

  return { accessToken, refreshToken };
};

module.exports = {
  login,
};
