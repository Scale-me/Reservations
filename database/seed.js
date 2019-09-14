const createCsvWriter = require('csv-writer').createObjectCsvWriter;

// clear CSV file of prior seeding
const fs = require('fs')
fs.truncate('./seed.csv', 0, function(){console.log('done')})

console.log('StartTime', new Date())

const csvWriter = createCsvWriter({
  path: './seed.csv',
  header: [
    {id: 'restaurant_id', title: 'RESTAURANT_ID'},
    {id: 'seating_capacity', title: 'SEATING_CAPACITY'},
    {id: 'date_open', title: 'DATE_OPEN'},
    {id: 'time_slot', title: 'TIME_SLOT'},
    {id: 'reserved_seats', title: 'reserved_seats'}
  ]
})

const records = [
  // {
  //   restaurant_id: '1',
  //   seating_capacity: 24,
  //   date_open: '2017-05-13',
  //   time_slot: '13:00:00',
  //   reserved_seats: 24
  // }
];

for (let i = 0; i < 11; i++) {
  let record = {};
  record['restaurant_id'] = i;
  record['seating_capacity'] = Math.floor(Math.random()*100 + 50);
  // June, July, August
  // for (let j = 6; j <=8; j++){
    for (let k = 0; k <=30; k++) {
      record['date_open'] = `2019-6-${30}`
      // 3pm-9pm
      for (let l = 0; l < 15; l++){
        for (let m = 0; m <= 30; m++){
          record['time_slot'] = `${l}:${m}0:00`
          m+=3
          record['reserved_seats'] = Math.floor(Math.random() * record['seating_capacity'])
          records.push(record)
        }
      }
    }
  // }
}

csvWriter.writeRecords(records)
    .then(() => {
        console.log('EndTime', new Date()),
        console.log('...Done');
    });
