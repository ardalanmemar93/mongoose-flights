const express = require('express')
const router = express.Router()
const destinationCtrl = require('../controllers/destinations')

router.post('/flights/:id/destinations', destinationCtrl.create)
router.delete('/destinations/:flight/:dest', destinationCtrl.delete)

module.exports = router;