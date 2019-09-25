const fs = require('fs')
const moment = require('moment');
// clear CSV file of prior seeding
// fs.truncate('./seed.csv', 0, function(){console.log('done')})
const startDate = new Date()
const writeRestaurantsStream = fs.createWriteStream('./seed1.csv');
const writeTimeslotsStream = fs.createWriteStream('./seed2.csv');
writeRestaurantsStream.write('restaurant_id,seating_capacity,date_open, date_open_id\n')
writeTimeslotsStream.write('date_open_id, time_slot, reserved_seats\n')

const writeRestaurants = function (writer, callback){
  let counter = 0;
  let number_of_records = 10000000;
  let records_remaining = number_of_records
  let restaurant_id = 0;
  let date_openId = 0;
  function write(){
    let ok = true;
    do {
      records_remaining -= 1;
      restaurant_id += 1;
      const seating_capacity = Math.floor(Math.random()*100 + 50);
    // Next Five days
    // for (let j = 6; j <=8; j++){
      for (let i = 0; i <=4; i++) {
        const date_open = moment().add(i, 'day').format().slice(0,10);
        date_openId += 1;
        const restaurant = `${date_openId},${restaurant_id},${seating_capacity},${date_open}\n`
        if ( counter % 1000000 === 0){
          console.log('counter:', counter, 'record', restaurant)
        }
        ok = writer.write(restaurant, 'utf-8')
        counter++
      }
    } while (records_remaining > 0 && ok);

    if (records_remaining > 0) {
      // console.log('draining', counter)
      writer.once('drain', write)
    }
  }
write();
}

const writeTimeslots = function (writer, callback){
  let counterTimeslots = 0;
  let number_of_records = 50000000;
  let records_remaining = number_of_records;
  let date_openId = 0;
  let time_slotId = 0;
  function write(){
    let ok = true;
    do {
      records_remaining -= 1;
      date_openId += 1;
    // 5pm-8pm non including 8pm
    for (let hr = 17; hr < 20; hr++){
      for (let m = 1; m < 3; m++){
        if (m === 1){
          min = 0
        } else {
          min = 3
        }
        const time_slot = `${hr}:${min}0:00`
        const reserved_seats = Math.floor(Math.random() * 50)
        time_slotId+=1;
        const time = `${time_slotId},${time_slot},${reserved_seats},${date_openId}\n`
        if ( counterTimeslots % 1000000 === 0){
          console.log('counterTimeslots:', counterTimeslots, 'time', time)
        }
        ok = writer.write(time, 'utf-8')
        counterTimeslots++
      }
    }
    } while (records_remaining > 0 && ok);

    if (records_remaining > 0) {
      // console.log('draining', counter)
      writer.once('drain', write)
    }
  }
write();
}

writeRestaurants(writeRestaurantsStream, 'utf-8', () => {
  const stopDate = new Date()
  console.log('writeRestaurants Time', stopDate.getTime() - startDate.getTime()/1000 + 'sec')
  writeRestaurantsStream.end();
});

writeTimeslots(writeTimeslotsStream, 'utf-8', () => {
  console.log('writeTimeslots Time', stopDate.getTime() - startDate.getTime()/1000 + 'sec')
  writeTimeslotsStream.end();
});