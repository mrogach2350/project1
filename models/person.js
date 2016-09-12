var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var PersonSchema = new Schema({
  name: String,
  githubLink: String,
  githubUsername: String
});

var Person = mongoose.model('Person', PersonSchema);

module.exports = Person;
