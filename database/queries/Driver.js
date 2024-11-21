const pool = require('../pool');

const insertDriver = async (data) => {
    const { employee_id, car_id, delivery_route_id } = data;

    await pool.query(
        `
        INSERT INTO driver
        (employee_id, car_id, delivery_route_id)
        VALUES ($1, $2, $3)
        `,
        [employee_id, car_id, delivery_route_id]
    );
};

/**
 * Delete a driver
 * @param {number} employeeID - ID corresponding to driver
 */
const deleteDriver = async (employeeID) => {
    await pool.query(
        `
        DELETE FROM driver
        WHERE employee_id = ${employeeID}
        `
    );
};

const insertDeliveryRoute = async (data) => {
    const { route_code, route_zone, delivery_hour } = data;

    await pool.query(
        `
        INSERT INTO delivery_route
        (route_code, route_zone, delivery_hour)
        VALUES ($1, $2, $3)
        `,
        [route_code, route_zone, delivery_hour]
    );
};

const insertRoutePackage = async (data) => {
    const { route_id, package_id } = data;

    await pool.query(
        `
        INSERT INTO delivery_route
        (route_id, package_id)
        VALUES ($1, $2)
        `,
        [route_id, package_id]
    );
};

/**
 * Return all packages of a delivery route
 * @param {number} routeID - route ID from delivery_route
 */
const getRoutePackage = async (routeID) => {
    const results = await pool.query(
        `
        SELECT * FROM route_package
        WHERE route_id = ${routeID}
        `
    );

    return results.rows;
};

module.exports = {
    insert: insertDriver,
    delete: deleteDriver,
    deliveryRoute: {
        insert: insertDeliveryRoute,
    },
    routePackage: {
        insert: insertRoutePackage,
        getAll: getRoutePackage,
    },
};
