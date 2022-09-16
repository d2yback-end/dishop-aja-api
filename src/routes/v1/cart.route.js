const express = require('express');
const { cartController } = require('../../controllers');
const validate = require('../../middlewares/validate');
const { verifyAdmin, verifyToken, verifyAuth } = require('../../middlewares/verifyToken');
const { cartValidation } = require('../../validations');

const router = express.Router();

router.get('/', verifyAdmin, cartController.getCarts);

router.post(
  '/',
  verifyToken,
  validate(cartValidation.createCart),
  cartController.createCart,
);

router
  .route('/:id')
  .get(
    verifyAuth,
    validate(cartValidation.getCartById),
    cartController.getCartById,
  )
  .put(
    verifyAuth,
    validate(cartValidation.updateCart),
    cartController.updateCart,
  )
  .delete(
    verifyAuth,
    validate(cartValidation.deleteCart),
    cartController.deleteCart,
  );

module.exports = router;
