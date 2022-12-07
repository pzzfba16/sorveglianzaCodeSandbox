const express = require('express');
const router = express.Router();
const userController = require('./../controllers/userController');

// Authorization router

// User router
router.get('/', userController.getAllUsers).get('/:id', userController.getUser);
router
  .post('/', userController.createUser)
  .post('/all', userController.createAll)
  .patch('/:id', userController.updateUser)
  .delete('/:id', userController.deleteUser);

module.exports = router;
