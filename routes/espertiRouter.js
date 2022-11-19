const express = require('express');
const router = express.Router();
const espertiController = require('./../controllers/espertiController');

router
  .get('/', espertiController.getAllEsperti)
  .get('/:id', espertiController.getEsperto);

router
  .post('/', espertiController.createEsperto)
  .post('/all', espertiController.createAll)
  .patch('/:id', espertiController.updateEsperto)
  .delete('/:id', espertiController.deleteEsperto);

module.exports = router;
