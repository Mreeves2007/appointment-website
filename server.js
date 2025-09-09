const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();

const app = express();
app.use(cors());
app.use(express.json());

// Connect to SQLite database (creates salon.db if it doesn't exist)
const db = new sqlite3.Database('./salon.db');

db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS bookings (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    fullName TEXT,
    service TEXT,
    date TEXT
  )`);
});

// Route to create a new booking
app.post('/book', (req, res) => {
  const { fullName, service, date } = req.body;

  db.run(
    `INSERT INTO bookings (fullName, service, date) VALUES (?, ?, ?)`,
    [fullName, service, date],
    function(err) {
      if (err) {
        console.error(err);
        res.status(500).send('Error saving booking');
      } else {
        res.send('Booking saved');
      }
    }
  );
});

// Route to get all bookings
app.get('/bookings', (req, res) => {
  db.all(`SELECT * FROM bookings`, [], (err, rows) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error fetching bookings');
    } else {
      res.json(rows);
    }
  });
});

// Listen on Render port or local 3000
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
