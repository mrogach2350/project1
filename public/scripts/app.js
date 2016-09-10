console.log('app.js is loaded');

$(document).ready(function() {


  $.ajax({
    method: 'GET',
    url: '/api/events',
    success: renderEvents
  });

  function renderEvents(json){
    allEvents = json;
    renderEvent();
  }

  function renderEvent(){
    var eventHtml = $('#event-template').html();
    var eventsTemplate = Handlebars.compile(eventHtml);
    var html = eventsTemplate({events:allEvents});
    $('#eventTarget').prepend(html);
  }

$('.add-event').on('click', function(event) {
  event.preventDefault();
  $('#eventModal').openModal();
});

$('#eventTarget').on('click', '.edit-event', function(event){
  event.preventDefault();
  $('#editModal').openModal();
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

  function newEventSuccess(json){
    $('.submit-event input').val('');
    allEvents.push(json);
    $('#eventTarget').empty();
    renderEvent();
  }
  function newEventError(){

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
