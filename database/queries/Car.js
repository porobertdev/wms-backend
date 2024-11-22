const pool = require('../pool');

/**
 * Insert a new warehouse
 * @param {Object} data
 * @param {String} data.license_plate - License plate
 * @param {String} data.manufacturer - Manufacturer
 * @param {String} data.model - Model
 * @param {String} data.color - Creation date
 * @param {Number} data.capacity - Capaciy
 * @param {Number} data.mileage - Mileage
 * @param {Boolean} data.availability - Availability: true/false
 */
const insertCar = async (data) => {
    const {
        license_plate,
        manufacturer,
        model,
        color,
        capacity,
        mileage,
        availability,
    } = data;

    await pool.query(
        `
        INSERT INTO car
        (license_plate,
        manufacturer,
        model,
        color,
        capacity,
        mileage,
        availability)
        VALUES ($1, $2, $3, $4, $5, $6, $7)
        `,
        [
            license_plate,
            manufacturer,
            model,
            color,
            capacity,
            mileage,
            availability,
        ]
    );
};

/**
 * Delete a car based on license_plate
 * @param {string} licensePlate - car's plate
 */
const deleteCar = async (licensePlate) => {
    await pool.query(
        `
        DELETE FROM car
        WHERE license_plate = ${licensePlate}
        `
    );
};

/**
 * Add a new car issue to car_issue table
 * @param {Object} data
 * @param {String} data.name - name
 */
const insertCarIssue = async (data) => {
    const { name } = data;

    await pool.query(
        `
        INSERT INTO car(name)
        VALUES ($1)
        `,
        [name]
    );
};

/**
 * Delete an issue of a car
 * @param {string} licensePlate - car's plate
 * @param {string} issue - name of the issue
 */
const deleteCarIssue = async (licensePlate, issue) => {
    await pool.query(
        `
        DELETE FROM car
        WHERE license_plate = ${licensePlate} AND issue = ${issue}
        `
    );
};

module.exports = {
    insert: insertCar,
    delete: deleteCar,
    issue: {
        insert: insertCarIssue,
        delete: deleteCarIssue,
    },
};
