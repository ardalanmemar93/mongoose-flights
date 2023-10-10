const Flight = require('../models/flight');

module.exports = {
  new: newFlight,
  create,
  index,
  show,
};

function getDefaultDate() {
  let dt = new Flight().departs;
  let departsDate = `${dt.getFullYear()}-${(dt.getMonth() + 1)
    .toString()
    .padStart(2, "0")}`;
  departsDate += `-${dt.getDate().toString().padStart(2, "0")}T${dt
    .toTimeString()
    .slice(0, 5)}`;
  return departsDate;
}

async function show(req, res) {
  try {
    const flight = await Flight.findById(req.params.id);

    res.render("flights/show", {
      flight,
      title: "Details",
      destDate: getDefaultDate(),
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("An error occurred.");
  }
}

async function index(req, res) {
  try {
    const flights = await Flight.find({});
    res.render('flights/index', { "flights": flights });
  } catch (err) {
    console.error(err);
    res.status(500).send("An error occurred.");
  }
}

async function create(req, res) {
  try {
    const flight = new Flight(req.body);
    await flight.validate(); 
    await flight.save(); 
    res.redirect('/flights');
  } catch (err) {
    console.error(err);
    res.status(500).send('An error occurred.');
  }
}

function newFlight(req, res) {
  
  res.render('flights/new');
}
