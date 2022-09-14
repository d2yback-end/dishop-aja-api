const httpStatus = require('http-status');
const jwt = require('jsonwebtoken');
const ApiError = require('../utils/ApiError');

const verifyToken = (req, res, next) => {
  if (!req.headers.token) {
    return res.status(httpStatus.UNAUTHORIZED).send('You are not authenticated!');
  }

  const authHeader = req.headers.token;

  if (authHeader) {
    const bearerToken = authHeader.split(' ');
    const token = bearerToken[1];

    jwt.verify(token, process.env.ACCESS_TOKEN_KEY, (err, user) => {
      if (err) {
        return res.status(httpStatus.UNAUTHORIZED).send('Token is not valid!');
      }

      req.user = user;
      next();
    });
  } else {
    return res.status(httpStatus.UNAUTHORIZED).send('You are not authenticated!');
  }
};

const verifyAuth = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.id === req.params.id || req.user.isAdmin) {
      next();
    } else {
      throw new ApiError(httpStatus.FORBIDDEN, 'Forbidden, access is denied!');
    }
  });
};

const verifyAdmin = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.isAdmin) {
      next();
    } else {
      throw new ApiError(httpStatus.FORBIDDEN, 'Forbidden, access is denied!');
    }
  });
};

module.exports = {
  verifyToken,
  verifyAuth,
  verifyAdmin,
};
