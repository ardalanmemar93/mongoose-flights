const Flight = require('../models/flight');

module.exports = {
  create,
  delete: deleteDest,
};

async function create(req, res) {
  try {
    const flight = await Flight.findById(req.params.id);
    flight.destination.push(req.body);
    await flight.save();
    res.redirect(`/flights/${flight._id}`);
  } catch (err) {
    console.log(err);
  }
}

async function deleteDest(req, res) {
  try {
    const flight = await Flight.findById(req.params.flight);
    const idx = flight.destination.findIndex(dest => dest._id == req.params.dest);
    flight.destination.splice(idx, 1);
    await flight.save();
    res.redirect(`/flights/${req.params.flight}`);
  } catch (err) {
    console.log(err);
  }
}
