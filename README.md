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

# GET all reservations for a specific listing
# @route: '/api/L1-L100/reservations
app.get('/api/reservations/:id', () => {

})

Sample output:

# GET a specifc reservation for a specific listing
# @route: '/api/L1-L100/2400/reservations
app.get('/api/reservations/:id/:startTime', () => {

})

Sample output:

# POST a specifc reservation for a specific listing
# @route: '/api/L1-L100/2400/reservations

app.post('/api/reservations/:id/:startTime', () => {

})

# PUT a specific reservation for a specific listing
# @route: '/api/L1-L100/2400/reservations

app.put('/api/reservations/:id/:startTime', () => {

})

# DELETE a specific reservation for a specific listing
# @route: '/api/L1-L100/2400/reservations

app.delete('/api/reservations/:id/:startTime/', () => {

})







