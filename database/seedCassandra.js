const cassandra = require('cassandra-driver');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;

const client = new cassandra.Client({ contactPoints: ['h1', 'h2'], localDataCenter: 'datacenter1', keyspace: 'reservations' });

// create table restaurants (
//   restaurant_id int,
//   seating_capacity int,
//   date_open date,
//   time_slot time,
//   reserved_seats int,
//   PRIMARY KEY ((RestaurantId), date_open, time_slot, reserved_seats)
// );

// {
//   restaurant_id: L1,
//   seating_capacity: Number,
//   date_open: date1 {
//       time_slot1: timeslot1 {
//         reserved_seats : number
//       },
//       time_slot2: timeslot2 {
//         reserved_seats : number
//       }
//   }
//   date_open: date2 {
//     time_slot1: timeslot1 {
//       reserved_seats : number
//     },
//     time_slot2: timeslot2 {
//       reserved_seats : number
//     }
//   }
// }