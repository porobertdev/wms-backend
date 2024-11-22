const pool = require('../pool');

/**
 * Insert a new warehouse
 * @param {Object} data
 * @param {String} data.codename - Warehouse Codename. e.g. RBUS for 'Refiliala Bucuresti-Sud'
 * @param {String} data.city - City name
 * @param {String} data.address - Address
 * @param {String} data.created_at - Creation date
 */
const insertWarehouse = async (data) => {
    const { codename, city, address, created_at } = data;

    await pool.query(
        `
        INSERT INTO warehouse
        (codename, city, address, created_at)
        VALUES ($1, $2, $3, $4)
        `,
        [codename, city, address, created_at]
    );
};

/**
 * Insert a new bin location in a warehouse
 * @param {Object} data
 * @param {Number} data.location_code - Location Code. E.g.: T01-D-02-B
 * @param {Number} data.warehouse_id - Warehouse ID
 */
const insertBinLocation = async (data) => {
    const { location_code, warehouse_id } = data;

    const results = await pool.query(
        `
        INSERT INTO bin_location
        (location_code, warehouse_id)
        VALUES ($1, $2)
        `,
        [location_code, warehouse_id]
    );

    return results;
};

module.exports = {
    insertWarehouse,
    insertBinLocation,
};
