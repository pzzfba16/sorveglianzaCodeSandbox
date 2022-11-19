const express = require('express');
const router = express.Router();
const entiController = require('./../controllers/entiController');

router.get('/', entiController.getAllEnti).get('/:id', entiController.getEnte);

router
  .post('/', entiController.createEnte)
  .post('/all', entiController.createAll)
  .patch('/:id', entiController.updateEnte)
  .delete('/:id', entiController.deleteEnte);

module.exports = router;
