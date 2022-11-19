const express = require('express');
const router = express.Router();
const istanzeController = require('./../controllers/istanzeController');

router
  .get('/', istanzeController.getAllIstanze)
  .get('/:id', istanzeController.getIstanza);

router
  .post('/', istanzeController.createIstanza)
  .post('/all', istanzeController.createAll)
  .patch('/:id', istanzeController.updateIstanza)
  .delete('/:id', istanzeController.deleteIstanza);

module.exports = router;
