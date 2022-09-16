const httpStatus = require('http-status');
const jwt = require('jsonwebtoken');
const { http } = require('winston');
const Token = require('../models/token.model');
const ApiError = require('../utils/ApiError');

/**
 * Sign access token from JWT
 *
 * @param {String} id
 * @param {Boolean} isAdmin
 * @returns {token}
 */
const signAccessToken = (id, isAdmin) => new Promise((resolve, reject) => {
  jwt.sign(
    {
      id,
      isAdmin,
    },
    process.env.ACCESS_TOKEN_KEY,
    {
      expiresIn: '1d',
    },
    (err, token) => {
      if (err) {
        return reject(new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'Token tidak valid'));
      }
      resolve(token);
    },
  );
});

/**
 * Sign refresh token from JWT
 *
 * @param {String} id
 * @param {Boolean} isAdmin
 * @returns {token}
 */
const signRefreshToken = (id, isAdmin) => new Promise((resolve, reject) => {
  jwt.sign(
    {
      id,
      isAdmin,
    },
    process.env.REFRESH_TOKEN_KEY,
    {
      expiresIn: '1y',
    },
    (err, token) => {
      if (err) {
        return reject(new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'Token tidak valid'));
      }
      resolve(token);
    },
  );
});

/**
 * Save refresh token to db
 *
 * @param {String} token
 * @param {String} userId
 */
const saveToken = async (token, userId) => {
  const tokenDoc = await Token.create({ token, user: userId });

  if (!tokenDoc) {
    throw new ApiError('Refresh token tidak valid');
  }
};

/**
 * Verify refresh token already exists in db
 *
 * @param {String} refreshToken
 */
const verifyToken = async (refreshToken) => {
  const token = await Token.findOne({ token: refreshToken });

  if (!token) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Token Not Found!');
  }
};

/**
 * Verify refresh token in db match with token in local environment
 *
 * @param {String} refreshToken
 */
const verifyRefreshToken = async (refreshToken) => {
  const payload = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_KEY, (err, user) => {
    if (err) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Token is not valid!');
    }

    return user;
  });

  return payload;
};

/**
 * Delete refresh token in db
 *
 * @param {String} userId
 */
const deleteToken = async (userId) => {
  const isDelete = await Token.deleteOne({ user: userId });

  if (!isDelete) {
    throw new ApiError(http.BAD_REQUEST, 'Token failed to delete!');
  }
};

/**
 * Delete refresh token in db
 *
 * @param {String} refreshToken
 */
const deleteRefreshToken = async (refreshToken) => {
  const isDelete = await Token.deleteOne({ token: refreshToken });

  if (!isDelete) {
    throw new ApiError(http.BAD_REQUEST, 'Token failed to delete!');
  }
};

module.exports = {
  signAccessToken,
  signRefreshToken,
  saveToken,
  verifyRefreshToken,
  deleteToken,
  verifyToken,
  deleteRefreshToken,
};
