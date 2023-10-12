const Ticket = require('../models/ticket');
const Flight = require('../models/flight');

module.exports = {
  new: async function newTicket(req, res) {
    console.log('newticket');
    try {
      const flight = await Flight.findById(req.params.id);
      res.render('tickets/new', { title: 'Add Ticket', flight: flight });
    } catch (err) {
      console.log(err);
    }
  },

  create: async function create(req, res) {
    req.body.flight = req.params.id;
    try {
      await Ticket.create(req.body);
      res.redirect(`/flights/${req.params.id}`);
    } catch (err) {
      console.log(err);
    }
  },

  delete: async function deleteTicket(req, res) {
    try {
      const docs = await Ticket.findByIdAndDelete(req.params.tix);
      console.log('Deleted : ', docs);
      res.redirect(`/flights/${req.params.flight}`);
    } catch (err) {
      console.log(err);
    }
  },
};
