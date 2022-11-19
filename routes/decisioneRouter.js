const express = require('express');
const router = express.Router();
const decisioneController = require('./../controllers/decisioneController');

router
  .get('/', decisioneController.getAllDecisioni)
  .get('/:id', decisioneController.getDecisione);

router
  .post('/', decisioneController.createDecisione)
  .post('/all', decisioneController.createAll)
  .patch('/:id', decisioneController.updateDecisione)
  .delete('/:id', decisioneController.deleteDecisione);

module.exports = router;
