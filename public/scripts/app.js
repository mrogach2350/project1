console.log('app.js is loaded');

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


})
