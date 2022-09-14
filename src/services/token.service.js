const httpStatus = require('http-status');
const jwt = require('jsonwebtoken');
const { http } = require('winston');
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

const verifyToken = async (refreshToken) => {
  const token = await Token.findOne({ token: refreshToken });

  if (!token) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Token Not Found!');
  }
};

const verifyRefreshToken = async (refreshToken) => {
  const payload = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_KEY, (err, user) => {
    if (err) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Token is not valid!');
    }

    return user;
  });

  return payload;
};

const deleteToken = async (userId) => {
  const isDelete = await Token.deleteOne({ user: userId });

  if (!isDelete) {
    throw new ApiError(http.BAD_REQUEST, 'Token failed to delete!');
  }
};

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
