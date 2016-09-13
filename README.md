# project1

##[Trello Link!](https://trello.com/b/xqoziE71/lets-get-together), [Heroku Link!](https://enigmatic-shelf-29928.herokuapp.com/)

## Project Summary!
This is an event posting board designed for use by a class/team. Users can upload, view, edit, and delete events.

### Techs Used-
1. Materialize CSS
2. Mongoose
3. MongoDB
4. Express
5. Heroku Hosting

###Future Dev-
1. Adding an Attendees function.
2. Limiting users by having a pre-set list of legitimate users, eventually creating login functionality.
3. Date/Calender Integration
4. Notification System
5. Multiple Class/Team boards.

##Interesting Code Samples:

```html
<script id ='event-edit-template' type='text/x-handlebars-template'>
  <form class="edit-event-form" action="/api/events" method="put" onsubmit="submitEditEvent(event)">
    <div class="row">
      <div class="form-group input-field col s12">
        <input id="edit-name" type="text" class="validate" value = "{{name}}" required="true">
        <label class="active" for="name">Event Name</label>
      </div>
```

```javascript
// identifies which event card was clicked and saves that _id to insert the open fields into the modal.
function handleEditEventClick(eventId){
  console.log('edit event clicked for ', eventId);
  $.get('/api/events/' + eventId, function(eventDetails){
    console.log('got back event details ', eventDetails);
    populateEditEventModal(eventDetails, eventId);
    $('#editModal').openModal();
  });
}

//inserts event details into the form template used inside the edit-event modal.
function populateEditEventModal(eventDetails, eventId){
  var eventsTemplate = $('#event-edit-template').html();
  var template = Handlebars.compile(eventsTemplate);
  eventForms = template({
    name: eventDetails.name,
    host: eventDetails.host,
    where: eventDetails.where,
    when: eventDetails.when,
    what: eventDetails.what,
    _id: eventId
  });
  $('#editEventModalBody').html(eventForms);
}

function editEventSuccess(editInfo) {
  console.log(editInfo);
  var eId = editInfo._id;
  for (var i = 0; i < allEvents.length; i ++){
    console.log(allEvents);
    if(allEvents[i]._id === eId) {
      allEvents[i] = editInfo;
      break;
    }
  }
  $('#eventTarget').empty();
  renderEvent();
  $('#editModal').closeModal();
}
```



## Wire Frames!
![wireframe1](http://i.imgur.com/Lmr1xpj.jpg "Optional title")
![wireframe2](http://i.imgur.com/HsGy20O.jpg "Optional title")
![wireframe3](http://i.imgur.com/8bLNYtA.jpg "Optional title")
