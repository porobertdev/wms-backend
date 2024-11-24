const loadEnvConfig = require('../utils/loadEnv');

loadEnvConfig();

const knex = require('knex')({
    client: 'pg',
    connection: {
        host: process.env.DATABASE_HOST,
        // port: 5432,
        user: process.env.DATABASE_USER,
        password: process.env.DATABASE_PASSWORD,
        database: process.env.DATABASE_NAME,
        ssl:
            process.env.NODE_ENV === 'production'
                ? { rejectUnauthorized: false }
                : false,
    },
});

module.exports = knex;
