const express = require('express');
const viewsController = require('./../controllers/viewsController');

const router = express.Router();

/* GET home page. */
router.get('/', viewsController.home);

module.exports = router;
