# Project Name

Scale.me's Restaurant Reservation System

## Related Projects

  - https://github.com/Scale.me/Banner-Gallery
  - https://github.com/Scale.me/Menu
  - https://github.com/Scale.me/Reservations
  - https://github.com/Scale.me/Reviews

## Table of Contents

1. [Usage](#Usage)
1. [Requirements](#requirements)
1. [Development](#development)

## Usage



## Requirements

An `nvmrc` file is included if using [nvm](https://github.com/creationix/nvm).

- Node 6.13.0
- etc

## Development

### Installing Dependencies

From within the root directory:

npm install

## API Spec

Schema:
{
  Listing: L1,
  Dates: [
   {
      SeatNumber: Number,
      Hours: String,
      Date: String,
      Seats: [
        {
          Time: String,
          Reservations: {
            Open: Number,
            Reserved: Number
          },
          time:
          startTime:
        }
      ]
    }
  ]
}

# GET all reservations for a specific listing
# @route: '/api/L1-L100/reservations
app.get('/api/:id/reservations', () => {

})

Sample output:
{
  Listing: L1,
  Dates: [
   {
     "SeatNumber": 57,
       "Hours": "2019-08-27T10:00:00-07:00--2019-08-27T18:00:00-07:00",
       "Date": "2019-08-27T23:29:09-07:00”,
       "Seats": [
           {
               "reservations": {
                   "open": 15,
                   "reserved": 42
               },
               "_id": "5d661f35934c9688d4e47353",
               "time": "2019-08-27T10:00:00-07:00",
               "startTime": 1000
           },
           {
               "reservations": {
                   "open": 13,
                   "reserved": 44
               },
               "_id": "5d661f35934c9688d4e47352",
               "time": "2019-08-27T10:30:00-07:00",
               "startTime": 1030
           },
           {
               "reservations": {
                   "open": 24,
                   "reserved": 33
               },
               "_id": "5d661f35934c9688d4e47351",
               "time": "2019-08-27T11:00:00-07:00",
               "startTime": 1100
           }
         ]

    }
  ]
}

# GET a specifc reservation for a specific listing
# @route: '/api/L1-L100/1000/reservations

app.get('/api/:id/:startTime/reservations', () => {

})

Sample output:
{
  Listing: L1,
  Dates: [
   {
     "SeatNumber": 57,
       "Hours": "2019-08-27T10:00:00-07:00--2019-08-27T18:00:00-07:00",
       "Date": "2019-08-27T23:29:09-07:00”,
       "Seats": [
           {
               "reservations": {
                   "open": 15,
                   "reserved": 42
               },
               "_id": "5d661f35934c9688d4e47353",
               "time": "2019-08-27T10:00:00-07:00",
               "startTime": 1000
           }
         ]
    }
  ]
}

# POST a specifc reservation for a specific listing
# @route: '/api/L1-L100/1000/reservations

app.post('/api/:id/:startTime/reservations', () => {

})

# PUT a specific reservation for a specific listing
# @route: '/api/L1-L100/1000/reservations

app.put('/api/:id/:startTime/reservations', () => {

})

# DELETE a specific reservation for a specific listing
# @route: '/api/L1-L100/1000/reservations

app.delete('/api/:id/:startTime/reservations', () => {

})







