const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
const morgan = require('morgan');
const compression = require('compression');

const db = require('../database')

const app = express();
const port = 3002;
const database = require('../database/index.js');

app.use(bodyParser.urlencoded({extended: false}))

app.use(cors());
// app.use(morgan());
app.use(compression());
app.use('/:id/reservations', express.static('public'));

app.use(express.static('public'));

// GET a specifc reservation for a specific listing
// @route: '/api/1-10000000/reservations'
app.get('/api/:id/reservations', (req, res) => {
  const restaurantId = req.body.id;
  const dateOpen = req.body.date;
  const seatsNeeded = req.body.seatsNeeded
  let result = res;
  let response;
  db.query('SELECT * FROM restaurants WHERE restaurant_Id = $1 AND date_Open = $2', [restaurantId, dateOpen], (err, res) => {
    let restaurantInfo = res.rows[0]
    if (err) {
      return err
    }
    db.query('SELECT * FROM time_slots WHERE date_open_id = $1', [restaurantInfo['date_open_id']], (err, res) => {
      console.log('line 31', res.rows[0])
      // if seatsNeeded is not available
        // Query +- 2 hours
      // else
      // return results
      // calculations done on front end/ review cassandra
      let timeSlotInfo = res.rows[0]
      let reservation = {
        restaurantInfo,
        timeSlotInfo
      }
      result.send(reservation)
    })
  })
});

// POST a specifc reservation for a specific listing
// @route: '/api/1-10000000/reservations'
app.post('/api/:id/reservations', (req, res) => {
  let restaurantId =req.body.id;
  let dateOpen = req.body.date;
  let time_slot = req.body.timeSlot;
  let seatsNeeded = req.body.seatsNeeded
  let result = res;
  // select specific reservation
  db.query('SELECT * FROM restaurants WHERE restaurant_Id = $1 AND date_Open = $2', [restaurantId, dateOpen], (err, res) => {
    if (err) {
      return err
    }
    const dateOpenId = res.rows[0]['date_open_id']
    db.query('SELECT * FROM time_slots WHERE date_open_id = $1', [dateOpenId], (err, res) => {
      if (err){
        return err
      }
      const time_slot = res.rows[0]
      time_slot['reserved_seats']+=parseInt(seatsNeeded)
      let revisedReservedSeats = time_slot['reserved_seats']
      // Update reserved seats
      db.query('UPDATE time_slots SET reserved_seats = ($1) WHERE time_slotid = $2', [revisedReservedSeats, time_slot['time_slotid']], (err, res) => {
        if (err){
          return err
        }
        result.end('Reservation made')
      })
    })
  })
})

// PUT a specific reservation for a specific listing
// @route: '/api/1-10000000/reservations'
app.put('/api/:id/reservations', () => {

})

// DELETE a specific reservation for a specific listing
// @route: '/api/1-10000000/reservations
app.delete('/api/:id/reservations', () => {

})

app.listen(port, () => { console.log(`argh matey we be arriving at port ${port}`); });
