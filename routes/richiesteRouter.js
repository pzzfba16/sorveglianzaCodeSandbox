const express = require('express');
const router = express.Router();
const richiesteController = require('./../controllers/richiesteController');

router
  .get('/', richiesteController.getAllRichieste)
  .get('/:id', richiesteController.getRichiesta);

router
  .post('/', richiesteController.createRichiesta)
  .post('/all', richiesteController.createAll)
  .patch('/:id', richiesteController.updateRichiesta)
  .delete('/:id', richiesteController.deleteRichiesta);

module.exports = router;
