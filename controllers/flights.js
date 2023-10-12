const Flight = require('../models/flight');
const moment = require('moment');
const Ticket = require('../models/ticket');

module.exports = {
  index,
  new: newFlight,
  create,
  delete: deleteFlight,
  show,
};

async function index(req, res) {
  try {
    const flights = await Flight.find({});
    flights.sort((a, b) => a.departs - b.departs);
    res.render('flights/index', { flights, title: "All", moment });
  } catch (err) {
    console.log(err);
  }
}

async function create(req, res) {
  const flight = new Flight(req.body);
  try {
    await flight.save();
    res.redirect('/flights');
  } catch (err) {
    console.log(err);
  }
}

async function newFlight(req, res) {
  const defaultFlight = new Flight();
  const dt = defaultFlight.departs;
  const departsDate = dt.toISOString().slice(0, 16);
  res.render('flights/new', { departsDate, title: "Add New Flight" });
}

async function deleteFlight(req, res) {
  try {
    const docs = await Flight.findByIdAndDelete(req.params.id);
    console.log("Deleted : ", docs);
    res.redirect('/flights');
  } catch (err) {
    console.log(err);
  }
}

async function show(req, res) {
  try {
    const flights = await Flight.findById(req.params.id);
    flights.destination.sort((a, b) => a.arrival - b.arrival);
    const tickets = await Ticket.find({ flight: flights._id });
    res.render('flights/show', { ticket: tickets, flight: flights, title: 'Flight Detail' });
  } catch (err) {
    console.log(err);
  }
}
