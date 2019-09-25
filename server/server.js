const nr = require('newrelic');
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

// Get all dates for a specific listing
app.get('/api/:id/reservations/', (req, res) => {
  const restaurantId = req.params.id;
  const result = res
  let listingData = {};
  db
    .query({text:'SELECT * FROM restaurants WHERE restaurant_id = $1', values: [restaurantId]})
    .then(res => {
      console.log(res.rows)
      listingData['restaurantInfo'] = res.rows
      listingData['timeSlotInfo'] = []
      for(let i = 0; i < listingData['restaurantInfo'].length; i++){
        console.log('line 34', listingData['restaurantInfo'][i]['date_open_id'])
        db
          .query({text: 'SELECT * FROM time_slots WHERE date_open_id = $1', values: [listingData['restaurantInfo'][i]['date_open_id']]})
          .then((res) => {
            // console.log('line 40',res.rows)
            listingData['timeSlotInfo'].push(res.rows)
            // console.log('line 42',listingData['timeSlotInfo'])
          })
          .catch(err => console.log(err))
      }
    })
    .then(() => {
      console.log('line 45',listingData)
      // TODO: send back timeSlotInfo
      result.send(listingData)
    })
    .catch(err => console.log(err))
})

// db.query('SELECT * FROM restaurants WHERE restaurant_id = $1', [restaurantId], (err, res) => {
//   if (err) return err;
//   console.log(res.rows);
//   listingData['restaurantInfo'] = res.rows
//   listingData['timeSlotInfo'] = []
//   for(let i = 0; i < listingData['restaurantInfo'].length; i++){
//     console.log('line 34', listingData['restaurantInfo'][i]['date_open_id'])
//     db.query('SELECT * FROM time_slots WHERE date_open_id = $1', [listingData['restaurantInfo'][i]['date_open_id']], (err, res) => {
//         if (err) return err;
//         // console.log('line 36',res.rows)
//         listingData['timeSlotInfo'].push(res.rows)
//         // result.end()
//         // result.send(listingData)
//       }
//     )
//   }
// })

// GET a specifc reservation for a specific listing
// @route: '/api/1-10000000/reservations'
app.get('/api/:id/reservations/:timeSlot', (req, res) => {
  // const restaurantId = req.body.id;
  // const dateOpen = req.body.date;
  // const seatsNeeded = req.body.seatsNeeded
  const restaurantId = req.params.id;
  const dateOpen = '2019-08-04';
  const seatsNeeded = 2;
  let result = res;
  let response;
  db.query('SELECT * FROM restaurants WHERE restaurant_id = $1 AND date_Open = $2', [restaurantId, dateOpen], (err, res) => {
    let restaurantInfo = res.rows[0]
    if (err) {
      return err
    }
    // TODO: refactor query to not to be nested
    db.query('SELECT * FROM time_slots WHERE date_open_id = $1', [restaurantInfo['date_open_id']], (err, res) => {

      // if seatsNeeded is not available
        // Query +- 2 hours
      // else
      // return results
      // calculations done on front end/ review cassandra
      let timeSlotInfo = res.rows[0]
      let dataForListing = {
        restaurantInfo,
        timeSlotInfo
      }

      console.log('line 53', dataForListing)
      result.send(dataForListing)
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
  // same as app.post
})

// DELETE a specific reservation for a specific listing
// @route: '/api/1-10000000/reservations
app.delete('/api/:id/reservations', () => {
  // same as app.post except subtract from reservedSeats
})

app.listen(port, () => { console.log(`argh matey we be arriving at port ${port}`); });
