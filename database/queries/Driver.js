const pool = require('../pool');

/**
 * Add a new driver
 * @param {Object} data
 * @param {Number} data.employee_id - Employee ID
 * @param {Number} data.car_id - Car ID
 * @param {Number} data.delivery_route_id - Delivery Route ID
 */
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

/**
 * Add delivery route
 * @param {Object} data
 * @param {String} data.route_code - For example, 'local 15'
 * @param {String} data.route_zone - Route Zone: can be a city or area
 * @param {String} data.delivery_hour - Delivery Hour
 */
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

/**
 * Add a package to a route
 * @param {Object} data
 * @param {Number} data.route_id - Route ID from delivery_route
 * @param {Number} data.package_id - Package ID from order_package
 */
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
