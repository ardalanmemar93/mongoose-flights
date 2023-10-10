const Flight = require('../models/flight');

module.exports = {
  create
};

function create(req, res) {
    Flight.findById(req.params.id, function(err, flightInfo) {
      flightInfo.destinations.push(req.body);
      flightInfo.save(function(err) {
        res.redirect(`/flights/${flightInfo._id}`);
      });
    });
  }