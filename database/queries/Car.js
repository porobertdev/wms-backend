const pool = require('../pool');

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

module.exports = {
    insertCar,
    insertCarIssue,
};
