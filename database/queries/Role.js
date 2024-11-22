const pool = require('../pool');

/**
 * Add a new permission
 * @param {Object} data
 * @param {String} data.name - Name
 */
const insertPermission = async (data) => {
    const { name } = data;

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
 * Get name of permission ID
 * @param {Number} - permission ID
 * @returns {String} - name
 */
const getPermission = async (id) => {
    const result = await pool.query(`
        SELECT name FROM permission
        WHERE id = ${id}
        `);

    return result.rows[0].name;
};

/**
 * Delete a permission
 * @param {string} name - name of the permission
 */
const deletePermission = async (name) => {
    const result = await pool.query(
        `
        DELETE FROM permission
        WHERE name = '${name}'
        `
    );

    return result;
};

/**
 * Add a new user role
 * @param {Object} data
 * @param {String} data.name - Name
 */
const insertUserRole = async (data) => {
    const { name } = data;

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
 * Get name of role ID
 * @param {Number} - role ID
 * @returns {String} - name
 */
const getRole = async (id) => {
    const result = await pool.query(`
        SELECT name FROM user_role
        WHERE id = ${id}
        `);

    return result.rows[0].name;
};

/**
 * Delete a role
 * @param {string} name - name of the role
 */
const deleteRole = async (name) => {
    const result = await pool.query(
        `
        DELETE FROM user_role
        WHERE name = '${name}'
        `
    );

    return result;
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
 * Get all permissions of a user role by ID
 * @param {Number} - role ID
 * @returns {Array} - Array containing all permission names
 */
const getRolePermission = async (id) => {
    const result = await pool.query(`
        SELECT * FROM role_permission
        WHERE role_id = ${id}
        `);

    /* const names = await result.rows.map(
        async (r) => await getPermission(r.permission_id)
    );
    console.log('🚀 ~ getRolePermission ~ names:', names);
 */
    return result;
};

/**
 * Delete a permission of a user role
 * @param {number} roleID - user_role table
 * @param {number} permissionID - permissions table
 */
const deleteRolePermission = async (roleID, permissionID) => {
    const result = await pool.query(
        `
        DELETE FROM role_permission
        WHERE role_id = ${roleID} AND permission_id = ${permissionID}
        `
    );

    return result;
};

module.exports = {
    permission: {
        insert: insertPermission,
        get: getPermission,
        delete: deletePermission,
    },
    rolePermission: {
        insert: insertRolePermission,
        get: getRolePermission,
        delete: deleteRolePermission,
    },
    insert: insertUserRole,
    delete: deleteRole,
    get: getRole,
};
