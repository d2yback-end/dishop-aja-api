const express = require('express');
const { paymentController } = require('../../controllers');
const validate = require('../../middlewares/validate');
// const { verifyToken } = require('../../middlewares/verifyToken');
const { paymentValidation } = require('../../validations');

const router = express.Router();

router.post(
  '/payment',
  validate(paymentValidation.paymentStripe),
  paymentController.paymenStripe,
);

module.exports = router;
