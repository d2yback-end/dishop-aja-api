const express = require('express');
const { authController } = require('../../controllers');
const validate = require('../../middlewares/validate');
const { verifyAuth } = require('../../middlewares/verifyToken');
const { authValidation } = require('../../validations');

const router = express.Router();

router.post(
  '/register',
  validate(authValidation.register),
  authController.register,
);

router.post(
  '/login',
  validate(authValidation.login),
  authController.login,
);

router.put(
  '/update-token',
  validate(authValidation.updateAccessToken),
  authController.updateAccessToken,
);

router.delete(
  '/logout',
  validate(authValidation.logout),
  authController.logout,
);

router.get('/test', verifyAuth, (req, res) => {
  res.send('helloTest');
});

module.exports = router;
