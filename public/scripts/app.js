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

  // function renderEvents(events) {
  //   events.forEach(function(e) {
  //     renderEvent(e);
  //   });
  // }
  //
  // function renderEvent(e) {
  //   console.log('rendering event', e);
  //   var eventHtml = $('#event-template').html();
  //   var eventsTemplate = Handlebars.compile(eventHtml);
  //   var html = eventsTemplate({events:e});
  //   $('#eventTarget').prepend(html);
  // }

})
