var mongoose = require("mongoose");
mongoose.connect( process.env.MONGODB_URI || "mongodb://localhost/events");

module.exports.Event = require('./event.js');
moduel.exports.Person = require('./person.js');
