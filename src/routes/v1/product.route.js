const express = require('express');
const { productController } = require('../../controllers');
const validate = require('../../middlewares/validate');
const { verifyAdmin } = require('../../middlewares/verifyToken');
const { productValidation } = require('../../validations');
// const { authValidation } = require('../../validations');

const router = express.Router();

router.get('/', productController.getProducts);

router.post(
  '/',
  verifyAdmin,
  validate(productValidation.createProduct),
  productController.createProduct,
);

router
  .route('/:id')
  .get(
    validate(productValidation.getProductById),
    productController.getProductById,
  )
  .put(
    verifyAdmin,
    validate(productValidation.updateProduct),
    productController.updateProduct,
  )
  .delete(
    verifyAdmin,
    validate(productValidation.deleteProduct),
    productController.deleteProduct,
  );

module.exports = router;
