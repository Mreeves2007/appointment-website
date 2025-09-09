const form = document.getElementById('bookingForm');

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const booking = {
    name: document.getElementById('name').value,
    date: document.getElementById('date').value,
    time: document.getElementById('time').value
  };

  const res = await fetch('/book', {...});
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(booking)
  });

  if (res.ok) {
    alert('Appointment booked!');
    form.reset();
  } else {
    alert('Error booking appointment.');
  }
});
