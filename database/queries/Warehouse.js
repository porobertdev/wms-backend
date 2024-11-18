const pool = require('../pool');

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

const insertBinLocation = async (data) => {
    const { location_code, warehouse_id } = data;

    await pool.query(
        `
        INSERT INTO bin_location
        (location_code, warehouse_id)
        VALUES ($1, $2)
        `,
        [location_code, warehouse_id]
    );
};

module.exports = {
    insertWarehouse,
    insertBinLocation,
};
