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

module.exports = {
    insertDriver,
    insertDeliveryRoute,
    insertRoutePackage,
};
