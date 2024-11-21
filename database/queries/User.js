const pool = require('../pool');

const tableName = 'users';

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

const deleteUser = async (id) => {
    await pool.query(`
        DELETE FROM ${tableName}
        WHERE id = ${id}
        `);
};

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

const generateUsername = (fname, lname) => {
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
