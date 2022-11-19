const express = require('express');
const router = express.Router();
const browserPostaControlelr = require('./../controllers/browserPostaController');

router
  .get('/', browserPostaControlelr.getAllBrowser)
  .get('/:id', browserPostaControlelr.getBrowser);

router
  .post('/', browserPostaControlelr.createBrowser)
  .post('/all', browserPostaControlelr.createAll)
  .patch('/:id', browserPostaControlelr.updateBrowser)
  .delete('/:id', browserPostaControlelr.deleteBrowser);

module.exports = router;
