const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();

const app = express();
app.use(cors());
app.use(express.json());

const db = new sqlite3.Database('./salon.db');

db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS bookings (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    date TEXT,
    time TEXT
  )`);
});

app.post('/book', (req, res) => {
  const { name, date, time } = req.body;
  db.run(`INSERT INTO bookings (name, date, time) VALUES (?, ?, ?)`, [name, date, time], function(err) {
    if (err) {
      res.status(500).send('Error saving booking');
    } else {
      res.send('Booking saved');
    }
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
app.get('/bookings', (req, res) => {
  db.all(`SELECT * FROM bookings`, [], (err, rows) => {
    if (err) {
      res.status(500).send('Error fetching bookings');
    } else {
      res.json(rows);
    }
  });
});
app.get('/bookings', (req, res) => {
  db.all(`SELECT * FROM bookings`, [], (err, rows) => {
    if (err) {
      res.status(500).send('Error fetching bookings');
    } else {
      res.json(rows);
    }
  });
});
