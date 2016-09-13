var db = require("./models");

var eventList = [
  {
    name: "Graduation",
    host: "General Assembly",
    where: "General Assembly",
    when: "November 4th, 2016",
    what: "We made it. :)"
  },
  {
    name: "Halloween",
    host: "General Assembly",
    where: "San Francisco",
    when: "October 31st, 2016",
    what: "Costumes and stuff"
  },
  {
    name: "Study Session",
    host: "General Assembly",
    where: "Classroom 4",
    when: "September 12th, 2016, 6:00pm",
    what: "Review project 1"
  }
];

db.Event.remove({}, function(err, events) {

  db.Event.create(eventList, function(err, events) {
    if(err) {
        return console.log('ERROR ', err);
    }
    console.log('all events: ', events);
    console.log('created', events.length, 'events');
    process.exit();
  });
});
