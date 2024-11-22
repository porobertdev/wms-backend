const pool = require('../pool');

/**
 * Add a new person
 * @param {Object} data
 * @param {String} data.fname - First Name
 * @param {String} data.lname - Last Name
 * @param {Date} data.birth_date - Birth Date
 * @param {String} data.address - Street Address
 * @param {String} data.city - City
 * @param {String} data.phone_number - Phone Number
 * @returns {any}
 */
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

/**
 * Get a person by ID
 * @param {Number} - person ID from persons table
 * @returns {Array}
 */
const getPersonByID = async (id) => {
    const result = await pool.query(`
        SELECT * FROM person
        WHERE id = ${id}
        `);

    return result;
};

/**
 * Delete person by ID
 * @param {Number} - person ID from persons table
 * @returns {Array}
 */
const deletePerson = async (id) => {
    const result = await pool.query(`
        DELETE FROM person
        WHERE id = ${id}
        `);

    return result;
};

module.exports = {
    insert: insertPerson,
    delete: deletePerson,
    get: getPersonByID,
};
