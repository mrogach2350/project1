console.log('app.js is loaded');

function renderEvents(json){
  allEvents = json;
  renderEvent();
}

function renderEvent(){
  var eventHtml = $('#event-template').html();
  var eventsTemplate = Handlebars.compile(eventHtml);
  var html = eventsTemplate({events:allEvents});
  $('#eventTarget').prepend(html);
  $('.dropdown-button').dropdown({
     inDuration: 300,
     outDuration: 225,
     constrain_width: false, // Does not change width of dropdown to that of the activator
     hover: true, // Activate on hover
     gutter: 0, // Spacing from edge
     belowOrigin: false, // Displays dropdown below the button
     alignment: 'left' // Displays dropdown with edge aligned to the left of button
   }
  );
}

function submitEditEvent(e) {
  e.preventDefault();
  var editInfo = {
    id: $('#editEventModalSubmit').attr('eventId'),
    name: $('#edit-name').val(),
    host: $('#edit-host').val(),
    where: $('#edit-where').val(),
    when: $('#edit-when').val(),
    what: $('#edit-what').val()
  };
  $.ajax({
    method: 'PUT',
    url: '/api/events/' + editInfo.id,
    data: editInfo,
    success: editEventSuccess
  });
}

function newEventSuccess(json){
  $('.submit-event input').val('');
  allEvents.push(json);
  $('#eventTarget').empty();
  renderEvent();
}

function newEventError(){

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

function deleteEventSuccess(json){
  var e = json;
  var eId = e._id;
  for (var i = 0; i < allEvents.length; i ++){
    console.log(allEvents);
    if(allEvents[i]._id === eId) {
      console.log(allEvents[i]);
      allEvents.splice(i, 1);
      console.log(allEvents);
      break;
    }
  }
  $('#eventTarget').empty();
  renderEvent();
}

function deleteEventError(json){

}

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



$(document).ready(function() {

  $.ajax({
    method: 'GET',
    url: '/api/events',
    success: renderEvents
  });

$('.add-event').on('click', function(event) {
  event.preventDefault();
  $('#eventModal').openModal();
});

$('#eventTarget').on('click', '.edit-event', function(event){
  event.preventDefault();
  $('#editModal').openModal();
  var eventId = $(this).attr('data-id');
  handleEditEventClick(eventId);
});

$('#eventTarget').on('click','.delete-event', function(event){
  event.preventDefault();
  $.ajax({
    method: 'DELETE',
    url: '/api/events/' + $(this).attr('data-id'),
    success: deleteEventSuccess,
    error: deleteEventError
  });
});

$('.submit-event').on('submit', function(e){
  e.preventDefault();
  var eventInfo = {
    name: $('#name').val(),
    host: $('#host').val(),
    where: $('#where').val(),
    when: $('#when').val(),
    what: $('#what').val()
  }
  $.ajax({
    method: 'POST',
    url: '/api/events',
    data: eventInfo,
    success: newEventSuccess,
    error: newEventError
  });
});

})
