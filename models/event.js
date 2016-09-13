var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var EventSchema = new Schema({
  name: {
    type: String,
  required: true},
  host: {
    type: String,
  required: true},
  where: {
    type: String,
  required: true},
  when: {
    type: String,
  required: true},
  what: {
    type: String,
  required: true}
});

var Event = mongoose.model('Event', EventSchema);

module.exports = Event;
