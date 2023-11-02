const { createPool } = require("mysql");
require('dotenv/config');

const pool = createPool({
  host: process.env.MYSQL_HOST,
  port: process.env.MYSQL_PORT,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  connectionLimit: 10,
  multipleStatements: true
});

console.log('host: %s\nport: %s\nuser: %s\npassword: %s\ndatabase: %s',
            process.env.MYSQL_HOST,
            process.env.MYSQL_PORT,
            process.env.MYSQL_USER,
            process.env.MYSQL_PASSWORD,
            process.env.MYSQL_DATABASE,);

module.exports = pool;