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

Cassandra Schema:

create keyspace reservations
... with replication = {'class':'SimpleStrategy','replication_factor':2};

create table reservations.restaurants (RESTAURANT_ID int, SEATING_CAPACITY int, DATE_OPEN date, TIME_SLOT time, RESERVED_SEATS int,PRIMARY KEY ((RESTAURANT_ID, DATE_OPEN), DATE_OPEN, TIME_SLOT));

Cassandra Sample data:

{
  restaurant_id: L1,
  seating_capacity: Number,
  date_open: date1 {
      time_slot1: reserved_seats
      Time_slot2: reserved_seats },
  date_open: date2 {
      time_slot1: reserved_seats
      time_slot2: reserved_seats }
}

Postgresql schema:

createdb Reservations

CREATE TABLE restaurants(date_open_id INT PRIMARY KEY, restaurant_id INT, seating_capacity SMALLINT, date_open DATE);

CREATE TABLE time_slots(time_slotId INT PRIMARY KEY, time_slot TIME, reserved_seats SMALLINT, date_open_id INT REFERENCES restaurants (date_open_id));

PostGresql Sample Data

# GET all reservations for a specific listing
# @route: '/api/reservations/L1-L100/
app.get('/api/reservations/:id', () => {

})

Sample output:

# GET a specifc reservation for a specific listing
# @route: '/api/reservations/L1-L100/2400/
app.get('/api/reservations/:id/:startTime', () => {

})

Sample output:

# POST a specifc reservation for a specific listing
# @route: '/api/reservations/L1-L100/2400

app.post('/api/reservations/:id/:startTime', () => {

})

# PUT a specific reservation for a specific listing
# @route: '/api/reservations/L1-L100/2400/

app.put('/api/reservations/:id/:startTime', () => {

})

# DELETE a specific reservation for a specific listing
# @route: '/api/L1-L100/2400/reservations

app.delete('/api/reservations/:id/:startTime/', () => {

})







