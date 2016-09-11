console.log('app.js is loaded');



$(document).ready(function() {

  $.ajax({
    method: 'GET',
    url: '/api/events',
    success: renderEvents
  });

  $('.add-event').on('click', function(event) {
    event.preventDefault();
    $('#modal1').openModal();
  })

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

$('.add-event').on('click', function(event) {
  event.preventDefault();
  $('#eventModal').openModal();
});

$('#eventTarget').on('click', '.edit-event', function(event){
  event.preventDefault();
  $('#editModal').openModal();
  handleEditEventClick();
});


function handleEditEventClick(e){
  var eventId = $('.edit-event').attr('data-id');
  console.log('edit event clicked for ', eventId);
  $.ajax({
    method: 'GET',
    url: '/api/events/' + eventId,
    success: editEventSuccess
  });
}
// $('.edit-event').on('submit', function(e){
//   e.preventDefault();
//   var eventInfo = {
//
//     name: $('#name').val(),
//     host: $('#host').val(),
//     where: $('#where').val(),
//     when: $('#when').val(),
//     what: $('#what').val()
//   }
//   $.ajax({
//     method: 'PUT',
//     url: '/api/events' +
//     data: eventInfo,
//     success: editEventSuccess,
//     error: editEventError
//   });
// });

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

  function newEventSuccess(json){
    $('.submit-event input').val('');
    allEvents.push(json);
    $('#eventTarget').empty();
    renderEvent();
  }
  function newEventError(){

  }
  function editEventSuccess(json) {
    console.log('found '+ json);
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
})
