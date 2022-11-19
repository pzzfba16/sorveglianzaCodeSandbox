const express = require('express');
const router = express.Router();
const organiController = require('./../controllers/organiController');

router
  .get('/', organiController.getAllOrgani)
  .get('/:id', organiController.getOrgano);

router
  .post('/', organiController.createOrgano)
  .post('/all', organiController.createAll)
  .patch('/:id', organiController.updateOrgano)
  .delete('/:id', organiController.deleteOrgano);

module.exports = router;
