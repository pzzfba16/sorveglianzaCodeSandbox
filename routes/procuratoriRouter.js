const express = require('express');
const router = express.Router();
const procuratoriController = require('./../controllers/procuratoriController');

router
  .get('/', procuratoriController.getAllProcuratori)
  .get('/:id', procuratoriController.getProcuratore);

router
  .post('/', procuratoriController.createProcuratore)
  .post('/all', procuratoriController.createAll)
  .patch('/:id', procuratoriController.updateProcuratore)
  .delete('/:id', procuratoriController.deleteProcuratore);

module.exports = router;
