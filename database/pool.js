const { Pool } = require('pg');
const loadEnvConfig = require('../utils/loadEnv');

loadEnvConfig();

module.exports = new Pool({
    host: process.env.DATABASE_HOST,
    database: process.env.DATABASE_NAME,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    ssl: process.env.NODE_ENV === 'dev' ? false : true,
});
