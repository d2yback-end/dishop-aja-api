const httpStatus = require('http-status');
const jwt = require('jsonwebtoken');
const Token = require('../models/token.model');
const ApiError = require('../utils/ApiError');

/**
     * Sign access token from JWT
     *
     * @param {user} Object
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
        console.log(err.message);
        return reject(new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'Token tidak valid'));
      }
      resolve(token);
    },
  );
});

/**
     * Sign refresh token from JWT
     *
     * @param {user} Object
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
        console.log(err.message);
        return reject(new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'Token tidak valid'));
      }
      resolve(token);
    },
  );
});

const saveToken = async (token, userId) => {
  const tokenDoc = await Token.create({ token, user: userId });

  if (!tokenDoc) {
    throw new ApiError('Refresh token tidak valid');
  }
};

module.exports = {
  signAccessToken,
  signRefreshToken,
  saveToken,
};
