const httpStatus = require('http-status');
const Token = require('../models/token.model');
const User = require('../models/user.model');
const ApiError = require('../utils/ApiError');
const {
  signAccessToken, signRefreshToken, saveToken, verifyRefreshToken,
} = require('./token.service');

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

  // const tokenExists = await Token.findOne({ user: user._id });

  // if(tokenExists) {

  // }

  await saveToken(refreshToken, user._id);

  return { accessToken, refreshToken };
};

const updateAccessToken = async (authBody) => {
  const token = await Token.findOne({ token: authBody.refreshToken });

  if (!token) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Token Not Found!');
  }

  const { id, isAdmin } = await verifyRefreshToken(authBody.refreshToken);
  const accessToken = await signAccessToken(id, isAdmin);

  return accessToken;
};

module.exports = {
  login,
  updateAccessToken,
};
