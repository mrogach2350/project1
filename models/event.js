var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var EventSchema = new Schema({
  name: String,
  host: String,
  where: String,
  when: String,
  what: String
});

var Event = mongoose.model('Event', EventSchema);

module.exports = Event;
