var express = require('express');
var router = express.Router();
const flightsCtrl = require('../controllers/flights.js');

/* GET home page. */
router.get('/', flightsCtrl.index)

module.exports = router;