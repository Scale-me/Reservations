const fs = require('fs')
// fs.truncate('./seed.csv', 0, function(){console.log('done')})
const writeUsers = fs.createWriteStream('./seed.csv');
writeUsers.write('RESTAURANT_ID,SEATING_CAPACITY,DATE_OPEN, TIME_SLOT, RESERVED_SEATS\n')
// clear CSV file of prior seeding

const startDate = new Date()

let counter = 0;
let number_of_records = 10000000;
let records_remaining = number_of_records
let restaurant_id = 0;
function write(){
  let ok = true;
  do {
    records_remaining -= 1;
    restaurant_id += 1;
    const seating_capacity = Math.floor(Math.random()*100 + 50);
  // August
  // for (let j = 6; j <=8; j++){
    for (let day = 1; day <=5; day++) {
      if ( day < 10){
        day = `0${day}`
      }
      const date_open = `2019-08-${day}`
      // 5pm-8pm
      for (let hr = 17; hr < 20; hr++){
        for (let m = 1; m < 3; m++){
          if (m === 1){
            min = 0
          } else {
            min = 3
          }
          const time_slot = `${hr}:${min}0:00`
          const reserved_seats = Math.floor(Math.random() * seating_capacity)
          // records.push(record)
          const record = `${restaurant_id},${seating_capacity},${date_open},${time_slot},${reserved_seats}\n`
          if ( counter % 1000000 === 0){
            console.log('counter:', counter, 'record', record)
          }
          ok = writeUsers.write(record, 'utf-8')
          counter++
        }
      }
    }
  } while (records_remaining > 0 && ok);

  if (records_remaining > 0) {
    // console.log('draining', counter)
    writeUsers.once('drain', write)
  }
}

write();