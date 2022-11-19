const express = require('express');
const router = express.Router();
const magistratiController = require('./../controllers/magistratiController');

router
  .get('/', magistratiController.getAllMagistrati)
  .get('/:id', magistratiController.getMagistrato);

router
  .post('/', magistratiController.createMagistrato)
  .post('/all', magistratiController.createAll)
  .patch('/:id', magistratiController.updateMagistrato)
  .delete('/:id', magistratiController.deleteMagistrato);

module.exports = router;
