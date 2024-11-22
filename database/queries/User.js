const pool = require('../pool');

const tableName = 'users';

/**
 * Add a new user
 * @param {Object} data
 * @param {Number} data.employee_id - Employee ID
 * @param {Number} data.role_id - Role ID
 * @param {String} data.username - Username
 * @param {String} data.password - Password
 */
const insertUser = async (data) => {
    const { employee_id, role_id, username, password } = data;

    await pool.query(
        `
        INSERT INTO ${tableName}
        (employee_id, role_id, username, password)
        VALUES ($1, $2, $3, $4)
        `,
        [employee_id, role_id, username, password]
    );
};

/**
 * Delete a user
 * @param {Number} id - User ID
 */
const deleteUser = async (id) => {
    await pool.query(`
        DELETE FROM ${tableName}
        WHERE id = ${id}
        `);
};

/**
 * Update the role for a user
 * @param {Number} id - User ID
 */
const updateRole = async (username, roleID) => {
    await pool.query(
        `
        UPDATE ${tableName}
        SET role_id = ${roleID}
        WHERE username = ${username}
        `
    );
};

/**
 * Get person id of the employee for 'persons' table
 * @param {number} employeeID - ID of the employee
 */
const getEmployee = async (employeeID) => {
    try {
        const person = await pool.query(`
        SELECT FROM person
        WHERE id = ${employeeID}
        `);

        return person.rows[0];
    } catch (err) {
        console.error(err);
    }
};

/**
 * Generate a username based on first and last names
 * @param {Object} data
 * @param {String} data.fname - First name
 * @param {String} data.lname - Last name
 */
const generateUsername = (data) => {
    const { fname, lname } = data;
    // TODO: handle duplicated username conflicts for persons with the same fname & lname
    const part1 = fname.slice(0, 2);
    const part2 = lname.slice(0, 3);

    return (part1 + part2).toLowerCase();
    // return (
    // (part1 + part2).toLowerCase() +
    // `${faker.number.int({ min: 10, max: 99 })}`
    // );
};

module.exports = {
    insert: insertUser,
    delete: deleteUser,
    getEmployee,
    generateUsername,
    updateRole,
};
