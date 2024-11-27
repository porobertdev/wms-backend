const fs = require('node:fs');
const path = require('node:path');
const knex = require('./pool');
const crud = require('./queries/crud');

// we need to create them in order to avoid Primary-Foreign keys conflicts
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

/**
 * Check if DB Schema is created
 * @returns {Boolean}
 */
const isSchemaCreated = async () => {
    let rows;

    try {
        rows = await crud.getAll('warehouse');
    } catch (err) {
        console.error(err);
    }

    return !rows || rows.length === 0 ? false : true;
};

/**
 * Initialize the DB Schema
 * @returns {any}
 */
const initialize = async () => {
    const boolean = await isSchemaCreated();

    if (!boolean) {
        console.info('[DB-INIT] - Creating Schema...');
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
                await knex.raw(sql);
            }
        } catch (err) {
            console.error('Error creating db schema', err);
        }

        console.info('[DB-INIT] - Done.');

        return {
            success: true,
            boolean,
        };
    }

    console.info('[DB-INIT] - Schema exists.');
};

// initialize();
module.exports = initialize;
