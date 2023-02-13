const mysql = require('mysql2');

const pool = mysql.createPool({
    host: 'localHost',
    user: 'root',
    database: 'node-ecommerce',
    password: 'password'
});

module.exports = pool.promise();