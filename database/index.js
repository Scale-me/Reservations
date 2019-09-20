const { Pool } = require('pg')
const pool = new Pool()
// the pool will emit an error on behalf of any idle clients
// it contains if a backend error or network partition happens
pool.on('error', (err, client) => {
  console.error('Unexpected error on idle client', err)
  process.exit(-1)
})
// callback - checkout a client
pool.connect((err, client, done) => {
  if (err) throw err
  client.query('SELECT * FROM users WHERE id = $1', [1], (err, res) => {
    done()
    if (err) {
      console.log(err.stack)
    } else {
      console.log(res.rows[0])
    }
  })
})

module.exports = {
  query: (text, params, callback) => {
    return pool.query(text, params, callback)
  },
}