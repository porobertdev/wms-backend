const fs = require('node:fs');
const path = require('node:path');
const pool = require('../pool');
const { tables } = require('../data');

const dataPath = path.join(__dirname, 'data.json');

const saveData = () => {
    const json = JSON.stringify(tables);

    fs.writeFileSync(dataPath, json, (err) => {
        if (err) {
            console.error(err);
        } else {
            console.log('Data saved succesfully');
        }
    });
};

const getData = () => {
    let result;

    try {
        const data = fs.readFileSync(dataPath, 'utf8');
        result = JSON.parse(data);
    } catch (err) {
        console.error(err);
    }

    return result;
};

const insert = async (tableName, columns, values) => {
    const query = `
        INSERT INTO ${tableName}
        (${columns.join(', ')})
        VALUES (${values.map((v, index) => '$' + (index + 1)).join(', ')})
        `;
    // console.log('🚀 ~ insert ~ query:', query);

    await pool.query(query, values);
};

const getAll = async (tableName) => {
    const query = `SELECT * FROM ${tableName}`;
    const results = await pool.query(query);
    const rows = results.rows;

    return rows;
};

const isDBSeeded = async () => {
    const rows = await getAll('warehouse');
    return rows.length === 0 ? false : true;
};

const seed = async () => {
    // seed only if it wasn't done already
    if (!(await isDBSeeded())) {
        console.info('[SEEDER] - Starting...');

        for (const table of tables) {
            const name = table.name;

            for (const item of table.data) {
                const columns = Object.keys(item);
                const values = Object.values(item);

                try {
                    await pool.query('BEGIN');
                    await insert(name, columns, values);
                    await pool.query('COMMIT');
                } catch (err) {
                    console.log(name);
                    console.log(err.detail);
                    await pool.query('ROLLBACK');
                }
            }
        }

        console.info('[SEEDER] - Done.');
    }
};

module.exports = { seed, getAll };
