// require express and other modules
var express = require('express'),
    app = express();

// parse incoming urlencoded form data
// and populate the req.body object
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true}));

// allow cross origin requests (optional)
// https://developer.mozilla.org/en-US/docs/Web/HTTP/Access_control_CORS
app.use(function(req, res, next){
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

/************
 * DATABASE *
 ************/

var db = require('./models');

/**********
 * ROUTES *
 **********/

 // Serve static files from the `/public` directory:
 // i.e. `/images`, `/scripts`, `/styles`
 app.use(express.static('public'));

 /*
 * HTML Endpoints
 */

 app.get('/', function homepage(req, res) {
  //  console.log(__dirname + '/views/index.html');
   res.sendFile(__dirname + '/views/index.html');
 });

 /*
  * JSON API Endpoints
  */

app.get('/api/events', function api_event(req, res){
  db.Event.find({})
    .exec(function(err, events){
      if (err){
        res.status(500).send(err);
        return;
      }
      res.json(events);
    });
});

app.post('/api/events', function (req, res){
  var newEvent = new db.Event({
    name: req.body.name,
    host: req.body.host,
    where: req.body.where,
    when: req.body.when,
    what: req.body.what
  });
  newEvent.save(function(err, e){
    if (err){
      return console.log('create error ' + err);
    }
    console.log('created ', e.name);
    res.json(e);
  });
});

app.get('api/events/:id', function(req, res){
  // db.Event.findById(req.params.eventId, function(err, foundEvent){
  //   if(err) {
  //     console.log('error', err);
  //   }
  //   console.log('responding with ', foundEvent);
  //   res.json(foundEvent);
  // });
  console.log(req.params);
});

app.delete('/api/events/:id', function(req, res){
  var eventId = req.params.id;

  db.Event.findOneAndRemove({_id: eventId}, function(err, deletedEvent){
    res.json(deletedEvent);
  });
});

/**********
 * SERVER *
 **********/

// listen on port 3000
app.listen(process.env.PORT || 3000, function () {
  console.log('Express server is running on http://localhost:3000/');
});
