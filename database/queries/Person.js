const pool = require('../pool');

const insertPerson = async (data) => {
    const { fname, lname, birth_date, address, city, phone_number } = data;

    await pool.query(
        `
        INSERT INTO person
        (first_name, last_name, birth_date, city, address, phone_number)
        VALUES ($1, $2, $3, $4, $5, $6)
        `,
        [fname, lname, birth_date, address, city, phone_number]
    );
};

module.exports = {
    insertPerson,
};
