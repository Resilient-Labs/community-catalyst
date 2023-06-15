document.querySelector('#addEventBtn').addEventListener('click', () => { 
  fetch('/cal', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({ eventName: document.getElementById('addEventID').value, date: $("#evoCalendar").evoCalendar('getActiveDate') })
})
  .then(response => response.json())
  .then(data => {
    addCalendarEvent(document.getElementById('addEventID').value = '',
    $("#evoCalendar").evoCalendar('getActiveDate'), data._id)
    console.log('Response:', data);
  })
  .catch(error => {
    console.error('Error:', error);
  });
  console.log('save', document.getElementById('addEventID').value, $("#evoCalendar").evoCalendar('getActiveDate') )
})



//first arg is the function we call, second is the arg for the function
function addCalendarEvent(name, date, id) {
  const newEvent = {
    id: id,
    name: name,
    date: date,
    type: "event",
    everyYear: false
  }
  $("#evoCalendar").evoCalendar('addCalendarEvent', [newEvent]);
  console.log(document.getElementById('addEventID').value)
  return newEvent
}

// module.exports('')