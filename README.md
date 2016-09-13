# project1

##[Trello Link!](https://trello.com/b/xqoziE71/lets-get-together)
###[Heroku Link!](https://enigmatic-shelf-29928.herokuapp.com/)

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
function newEventSuccess(json){
  $('.submit-event input').val('');
  allEvents.push(json);
  $('#eventTarget').empty();
  renderEvent();
  $('#eventModal').closeModal();
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
>>>>>>> 47c9c86eb1d7455b7074db9930c56b4a4028ee45
