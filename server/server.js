const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
const morgan = require('morgan');
const compression = require('compression');

const db = require('../database/db')

const app = express();
const port = 3002;
const database = require('../database/index.js');

app.use(cors());
app.use(morgan());
app.use(compression());
app.use('/:id/reservations', express.static('public'));

app.use(express.static('public'));

app.get('/api/:id/reservations', (req, res) => {
  const restaurantId = req.params.id;
  const dateOpen = req.params.date;
  db.query('SELECT * FROM restaurants WHERE restaurant_Id = $1 AND dateOpen = $2', [restaurantId, dateOpen], (err, res) => {
    if (err) {
      return next(err)
    }
    db.query('SELECT * FROM time_slots WHERE date_open_id = $3')
  })
});

app.listen(port, () => { console.log(`argh matey we be arriving at port ${port}`); });
