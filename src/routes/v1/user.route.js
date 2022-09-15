const express = require('express');
const { userController } = require('../../controllers');
const validate = require('../../middlewares/validate');
const { verifyAdmin, verifyAuth } = require('../../middlewares/verifyToken');
const { userValidation } = require('../../validations');
// const { authValidation } = require('../../validations');

const router = express.Router();

router.get('/', verifyAdmin, userController.getUsers);
router.get('/stats', verifyAdmin, userController.statsUser);

router
  .route('/:id')
  .get(
    verifyAuth,
    validate(userValidation.getUserById),
    userController.getUserById,
  )
  .put(
    verifyAuth,
    validate(userValidation.updateUser),
    userController.updateUser,
  )
  .delete(
    verifyAdmin,
    validate(userValidation.deleteUser),
    userController.deleteUser,
  );

module.exports = router;
