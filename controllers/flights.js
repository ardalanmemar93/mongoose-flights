const Flight = require('../models/flight');

module.exports = {
    index,
    new: newFlight,
    create,
    delete: deleteFlight,
    show
};

async function index(req, res) {
    try {
        const flights = await Flight.find({});
        flights.sort((a, b) => a.departs - b.departs);
        res.render('flights/index', { flights, title: "All" });
    } catch (err) {
        console.error(err);
    }
}

async function create(req, res) {
    const flight = new Flight(req.body);
    try {
        await flight.save();
        res.redirect('/flights');
    } catch (err) {
        console.error(err);
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
        console.log("Deleted: ", docs);
        res.redirect('/flights');
    } catch (err) {
        console.error(err);
    }
}

async function show(req, res) {
    try {
        const flights = await Flight.findById(req.params.id);
        flights.destination.sort((a, b) => a.arrival - b.arrival);
        res.render('flights/show', { flight: flights, title: 'Flight Detail' });
    } catch (err) {
        console.error(err);
    }
}
