const { Client } = require('pg')
const client = new Client({
  user: 'group_8',
  host: '10.17.50.87',
  database: 'group_8',
  password: 'GUZvMF4FsUJcor',
  port: 5432,
})
client.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});

client.query('SELECT * from users limit 1', (err, res) => {
    var {rows} = res
    console.log(rows[0])
  })