const pool = require('../pool');

const insert = async (data) => {
    const { person_id, warehouse_id, role_id, salary } = data;

    await pool.query(
        `
        INSERT INTO employee
        (person_id, warehouse_id, role_id, salary)
        VALUES ($1, $2, $3, $4)
        `,
        [person_id, warehouse_id, role_id, salary]
    );
};

module.exports = {
    insert,
};
