const { Client } = require('pg');
require('dotenv').config()

const db = new Client({
    user: process.env.user,
    host: process.env.host,
    database: process.env.database,
    password: process.env.password,
    port: process.env.new_port,
});

module.exports = db;