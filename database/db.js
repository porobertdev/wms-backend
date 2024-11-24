// barrel module
const loadEnvConfig = require('../utils/loadEnv');
const initialize = require('./initialize');
const crud = require('./queries/crud');
const { seed } = require('./seeder/seeder');

loadEnvConfig();

const init = async () => {
    await initialize();

    if (process.env.NODE_ENV === 'dev') {
        seed();
    }
};

module.exports = {
    init,
    crud,
};
