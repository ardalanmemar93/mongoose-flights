const express = require('express');
const router = express.Router();
const flightsCtrl = require('../controllers/flights');

/* GET users listing. */
router.get('/', flightsCtrl.index);
// GET /flights/new
router.get('/new', flightsCtrl.new);
// POST / flights
router.post('/', flightsCtrl.create);

router.get('/:id', flightsCtrl.show);

module.exports = router;