const pool = require('../pool');

const insertCustomer = async (data) => {
    const { type, person_id } = data;

    await pool.query(
        `
        INSERT INTO customer
        (type, person_id)
        VALUES ($1, $2)
        `,
        [type, person_id]
    );
};

module.exports = {
    insertCustomer,
};
