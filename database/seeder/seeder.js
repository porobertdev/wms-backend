const { tables } = require('../data');
const crud = require('../queries/crud');

/**
 * Check if DB is seeded
 * @returns {Boolean}
 */
const isDBSeeded = async () => {
    let rows;

    try {
        rows = await crud.getAll('warehouse');
    } catch (err) {
        console.error(err);
    }

    return !rows || rows.length === 0 ? false : true;
};

/**
 * Seed the database with fake data
 */
const seed = async () => {
    // seed only if it wasn't done already
    if (!(await isDBSeeded())) {
        console.info('[DB-SEEDER] - Starting...');

        for (const table of tables) {
            /*
            even though crud.insert supports an array
            of objects to insert with one query, not all
            of that data will be inserted since there are
            conflicts caused by fakerjs which generates
            duplicated data, or I'm missing something.

            TODO: find a solution someday
            */
            for (const item of table.data) {
                try {
                    await crud.insert(table.name, [item]);
                } catch (err) {
                    console.log(err.detail);
                }
            }
        }

        console.info('[DB-SEEDER] - Done.');
    }
};

module.exports = { seed };
