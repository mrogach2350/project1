var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var EventSchema = new Schema({
  name: {String,
  required: true},
  host: {String,
  required: true},
  where: {String,
  required: true},
  when: {String,
  required: true},
  what: {String,
  required: true}
});

var Event = mongoose.model('Event', EventSchema);

module.exports = Event;
