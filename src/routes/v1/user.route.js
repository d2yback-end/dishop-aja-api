const express = require('express');
const { userController } = require('../../controllers');
// const validate = require('../../middlewares/validate');
const { verifyAdmin } = require('../../middlewares/verifyToken');
// const { authValidation } = require('../../validations');

const router = express.Router();

router.get('/', verifyAdmin, userController.getUsers);

module.exports = router;
