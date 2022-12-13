const express = require('express');

const userController = require('./../controllers/userController');
const authController = require('./../controllers/authController');

const router = express.Router();

// Authorization router
router.post('/signup', authController.signUp);
router.post('/login', authController.logIn);
router.post('/forgotPassword', authController.forgotPassword);
router.post('/resetPassword', authController.resetPassword);

// User router
router.get('/', userController.getAllUsers).get('/:id', userController.getUser);
router
  .post('/', userController.createUser)
  .patch('/:id', userController.updateUser)
  .delete('/:id', userController.deleteUser);

module.exports = router;
