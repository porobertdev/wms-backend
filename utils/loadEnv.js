/**
 * Load Environment Variables based on NODE_ENV
 */
const loadEnvConfig = () =>
    require('dotenv').config({ path: `.env.${process.env.NODE_ENV}` });

module.exports = loadEnvConfig;
