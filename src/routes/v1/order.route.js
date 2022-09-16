const express = require('express');
const { orderController } = require('../../controllers');
const validate = require('../../middlewares/validate');
const { verifyAdmin, verifyToken, verifyAuth } = require('../../middlewares/verifyToken');
const { orderValidation } = require('../../validations');

const router = express.Router();

router.get('/', verifyAdmin, orderController.getOrders);

router.get('/income', verifyAdmin, orderController.getMonthlyIncome);

router.post(
  '/',
  verifyToken,
  validate(orderValidation.createOrder),
  orderController.createOrder,
);

router
  .route('/:id')
  .get(
    verifyAuth,
    validate(orderValidation.getOrderById),
    orderController.getOrderById,
  )
  .put(
    verifyAdmin,
    validate(orderValidation.updateOrder),
    orderController.updateOrder,
  )
  .delete(
    verifyAdmin,
    validate(orderValidation.deleteOrder),
    orderController.deleteOrder,
  );

module.exports = router;
