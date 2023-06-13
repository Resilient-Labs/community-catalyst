const { json } = require("express");
const Cal = require("../models/Cal")

module.exports = {
  get: async (req, res) => {
    try {
      const events = await Cal.find({ user: req.user.id });
      console.log(events)
      res.render("cal.ejs", { events: events, user: req.user });
    } catch (err) {
      console.log(err);
    }
  },
  post: async (req, res) => {
    try {
      //newEvent is data in fetch 
      const newEvent = await Cal.create({
        user: req.user.id,
        eventName: req.body.eventName,
        date: req.body.date
      });
      console.log("Event has been added!", newEvent);
      res.send(200, newEvent);
    } catch (err) {
      console.log(err);
    }
  },
  delete: async (req, res) => {
    try {
      // Delete post from db
      await Cal.remove({ _id: req.params.id });
      console.log("Event Deleted");
      res.redirect("/cal");
    } catch (err) {
      res.redirect("/cal");
    }
  }
}