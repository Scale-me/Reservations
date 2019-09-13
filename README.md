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

{
  RestaurantId: L1,
  DatesOpen: [
   {
      SeatingCapacity: Number,
      OpenHours: String,
      Date: String,
      Timeslots: [
        // look to index each timeslot for faster lookup
        {
          Time: String,
          Reservations: {
            Open: Number, // dont need me
            ReservedSeats: Number
          }
        }
      ]
    }
  ]
}


create keyspace Reservations
... with replication = {'class':'SimpleStrategy','replication_factor':2};

create table Restaurants (
  RestaurantId int,
  DatesOpen list<frozen map<SeatNumber,Hours,Date, Timeslots list<frozen map<Time, Reservations map<Open,Reserved>>>>>,
  PRIMARY KEY (RestaurantId)
);

Postgresql schema:

CREATE DATABASE Reservations

CREATE TABLE  Restaurants (
    restaurant_id PRIMARY KEY,
    seating_capacity integer,
    dates_open text
);

CREATE TABLE Dates(
    date date PRIMARY KEY,
    //hours_open text, Maybe do not need this?
    date_id,
    FOREIGN KEY restaurant_id integer REFERENCES Restaurants (restaurant_id),
);

CREATE TABLE Timeslots(
  time_slot time,
  reserved_seats integer,
  FOREIGN KEY date_id integer REFERENCES Dates (date_id)
)



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







