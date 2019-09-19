const fs = require('fs')
// clear CSV file of prior seeding
// fs.truncate('./seed.csv', 0, function(){console.log('done')})
const writeRestaurantsStream = fs.createWriteStream('./seed1.csv');
const writeTimeslotsStream = fs.createWriteStream('./seed2.csv');
writeRestaurantsStream.write('RESTAURANT_ID,SEATING_CAPACITY,DATE_OPEN, DATE_OPEN_ID\n')
writeTimeslotsStream.write('DATE_OPEN_ID, TIME_SLOT, RESERVED_SEATS\n')

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
    // August
    // for (let j = 6; j <=8; j++){
      for (let day = 1; day <=20; day++) {
        if ( day < 10){
          day = `0${day}`
        }
        const date_open = `2019-08-${day}`
        date_openId += 1;
        const restaurant = `${restaurant_id},${seating_capacity},${date_open},${date_openId},\n`
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
  let number_of_records = 60000000;
  let records_remaining = number_of_records;
  let date_openId = 0;
  function write(){
    let ok = true;
    do {
      records_remaining -= 1;
      date_openId += 1;
    // 5pm-8pm
    for (let hr = 17; hr < 20; hr++){
      for (let m = 1; m < 3; m++){
        if (m === 1){
          min = 0
        } else {
          min = 3
        }
        const time_slot = `${hr}:${min}0:00`
        const reserved_seats = Math.floor(Math.random() * 50)
        const time = `${date_openId},${time_slot},${reserved_seats}\n`
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
  writeRestaurantsStream.end();
});

writeTimeslots(writeTimeslotsStream, 'utf-8', () => {
  writeTimeslotsStream.end();
});