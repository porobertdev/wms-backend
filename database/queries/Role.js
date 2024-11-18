const pool = require('../pool');

const insertPermission = async (name) => {
    await pool.query(
        `
        INSERT INTO permission
        (name)
        VALUES ($1)
        `,
        [name]
    );
};

const insertUserRole = async (name) => {
    await pool.query(
        `
        INSERT INTO user_role
        (name)
        VALUES ($1)
        `,
        [name]
    );
};

const insertRolePermission = async (data) => {
    const { role_id, permission_id } = data;

    await pool.query(
        `
        INSERT INTO role_permission
        (role_id, permission_id)
        VALUES ($1, $2)
        `,
        [role_id, permission_id]
    );
};

module.exports = {
    insertPermission,
    insertUserRole,
    insertRolePermission,
};
