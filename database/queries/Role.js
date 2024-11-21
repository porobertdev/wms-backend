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

/**
 * Delete a permission
 * @param {string} name - name of the permission
 */
const deletePermission = async (name) => {
    await pool.query(
        `
        DELETE FROM permission
        WHERE name = ${name}
        `
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

/**
 * Delete a role
 * @param {string} name - name of the role
 */
const deleteRole = async (name) => {
    await pool.query(
        `
        DELETE FROM user_role
        WHERE name = ${name}
        `
    );
};

/**
 * Add a permission to a role
 * @param {number} roleID - user_role table
 * @param {number} permissionID - permissions table
 */
const insertRolePermission = async (roleID, permissionID) => {
    await pool.query(
        `
        INSERT INTO role_permission
        (role_id, permission_id)
        VALUES ($1, $2)
        `,
        [roleID, permissionID]
    );
};

/**
 * Delete a permission of a user role
 * @param {number} roleID - user_role table
 * @param {number} permissionID - permissions table
 */
const deleteRolePermission = async (roleID, permissionID) => {
    await pool.query(
        `
        DELETE FROM role_permission
        WHERE role_id = ${roleID} AND permission_id = ${permissionID}
        `
    );
};

module.exports = {
    permission: {
        insert: insertPermission,
        delete: deletePermission,
    },
    rolePermission: {
        insert: insertRolePermission,
        delete: deleteRolePermission,
    },
    insert: insertUserRole,
    delete: deleteRole,
};
