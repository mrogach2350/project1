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



})
