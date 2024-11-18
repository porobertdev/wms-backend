const fs = require('node:fs');
const path = require('node:path');
const pool = require('./pool');
const { getAll } = require('./seeder/seeder');

const schemaOrder = [
    'Warehouse',
    'Person',
    'Role',
    'Employee',
    'User',
    'Customer',
    'Product',
    'Inventory',
    'Order',
    'Car',
    'Driver',
];

const isSchemaCreated = async () => {
    const rows = await getAll('warehouse');

    return rows.length === 0 ? false : true;
};

const initialize = async () => {
    if (!(await isSchemaCreated())) {
        console.info('[DB] - Creating Schema...');
        try {
            for (const schema of schemaOrder) {
                console.log('🚀 ~ initDb ~ s:', schema);
                const filePath = path.join(
                    './',
                    'database',
                    'models',
                    `${schema}.sql`
                );
                const sql = fs.readFileSync(filePath, 'utf8');
                await pool.query(sql);
            }
        } catch (err) {
            console.error('Error creating db schema', err);
        }

        console.info('[DB] - Done.');
    }
};

// initialize();
module.exports = { initialize };
