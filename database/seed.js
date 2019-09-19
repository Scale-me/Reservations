const fs = require('fs')
// fs.truncate('./seed.csv', 0, function(){console.log('done')})
const writeUsers = fs.createWriteStream('./seed.csv');
writeUsers.write('RESTAURANT_ID,SEATING_CAPACITY,DATE_OPEN, TIME_SLOT, RESERVED_SEATS\n')
// clear CSV file of prior seeding

const startDate = new Date()
console.log(startDate)

// const startTime = moment("06:10:00", 'hh:mm');
// const endTime = moment("08:00:00", 'hh:mm');

// const csvWriter = createCsvWriter({
//   path: './seed.csv',
//   header: [
//     {id: 'restaurant_id', title: 'RESTAURANT_ID'},
//     {id: 'seating_capacity', title: 'SEATING_CAPACITY'},
//     {id: 'date_open', title: 'DATE_OPEN'},
//     {id: 'time_slot', title: 'TIME_SLOT'},
//     {id: 'reserved_seats', title: 'RESERVED_SEATS'}
//   ]
// })

// const records = [
  // {
  //   restaurant_id: '1',
  //   seating_capacity: 24,
  //   date_open: '2017-05-13',
  //   time_slot: '13:00:00',
  //   reserved_seats: 24
  // }
// ];

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
    for (let day = 1; day <=20; day++) {
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

  // if (records_remaining = 0){
  //   const endDate = new Date()
  //   const seedTime = Math.floor((endDate.getTime() - startDate.getTime())/(1000*60));
  //   console.log('Seed Time', `${seedTime} min`)
  //   console.log('Records Generated',counter)
  //   console.log('...Done');
  // }
}

write();

// csvWriter.writeRecords(records)
//     .then(() => {
//       const endDate = new Date()
//       const seedTime = Math.floor((endDate.getTime() - startDate.getTime())/(1000*60))
//       console.log('Seed Time', `${seedTime} min`)
//       console.log('Records Generated',counter)
//       console.log('...Done');
//     });
