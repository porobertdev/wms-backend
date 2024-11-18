const pool = require('../pool');

const insertUser = async (data) => {
    const { employee_id, role_id, username, password } = data;

    await pool.query(
        `
        INSERT INTO users
        (employee_id, role_id, username, password)
        VALUES ($1, $2, $3, $4)
        `,
        [employee_id, role_id, username, password]
    );
};

const deleteUser = async (id) => {
    await pool.query(`
        DELETE FROM users
        WHERE id = ${id}
        `);
};

const getPersonEmployed = async (id) => {
    try {
        const person = await pool.query(`
        SELECT FROM person
        WHERE id = ${id}
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
    insertUser,
    deleteUser,
    getPersonEmployed,
    generateUsername,
};
