console.log('app.js is loaded');

$(document).ready(function() {

  $.ajax({
    method: 'GET',
    url: '/api/events',
    success: renderEvents
  });

  function renderEvents(events) {
    events.forEach(function(e) {
      renderEvent(e);
    });
  }

  function renderEvent(e) {
    console.log('rendering event', e);
    var eventHtml = $('#event-template').html();
    var eventsTemplate = Handlebars.compile(eventHtml);
    var html = eventsTemplate(e);
    $('#eventTarget').prepend(html);
  }

})
