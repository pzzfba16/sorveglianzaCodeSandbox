const express = require('express');
const router = express.Router();
const sediController = require('./../controllers/sediController');

router.get('/', sediController.getAllSedi).get('/:id', sediController.getSede);

router
  .post('/', sediController.createSede)
  .post('/all', sediController.createAll)
  .patch('/:id', sediController.updateSede)
  .delete('/:id', sediController.deleteSede);

module.exports = router;
