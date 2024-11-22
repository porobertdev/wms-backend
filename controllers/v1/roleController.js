const { role } = require('../../database/db');

module.exports = {
    // permissions
    addPermission: async (req, res, next) => {
        try {
            const { permission_name } = req.body;
            console.log(
                '🚀 ~ addPermission: ~ permission_name:',
                permission_name
            );
            await role.permission.insert({ name: permission_name });

            res.json({
                success: true,
                payload: req.body,
                message: 'Permission has been created.',
            });
        } catch (err) {
            next(err);
        }
    },
    deletePermission: async (req, res, next) => {
        try {
            const { permission_name } = req.params;

            const result = await role.permission.delete(permission_name);
            let json;

            if (result.rowCount === 1) {
                json = {
                    success: true,
                    message: `Permission has been deleted.`,
                };
            } else {
                json = {
                    success: false,
                    message: "Permission doesn't exist",
                };
            }

            res.json(json);
        } catch (err) {
            next(err);
        }
    },
    getPermissionName: async (req, res, next) => {
        try {
            const { permission_id } = req.params;
            const name = await role.permission.get(permission_id);

            res.json({
                permission_id,
                permission_name: name,
            });

            // res.json(results.rows);
        } catch (err) {
            next(err);
        }
    },
    // roles
    addRole: async (req, res, next) => {
        try {
            const { name } = req.body;
            await role.insert({ name });

            res.json({
                success: true,
                payload: req.body,
                message: 'Role has been created.',
            });
        } catch (err) {
            next(err);
        }
    },
    deleteRole: async (req, res, next) => {
        try {
            const { role_name } = req.params;

            const result = await role.delete(role_name);
            let json;

            if (result.rowCount === 1) {
                json = {
                    success: true,
                    message: `User role has been deleted.`,
                };
            } else {
                json = {
                    success: false,
                    message: "User role doesn't exist",
                };
            }

            res.json(json);
        } catch (err) {
            next(err);
        }
    },
    getRoleName: async (req, res, next) => {
        try {
            const { role_id } = req.params;
            const name = await role.get(role_id);

            res.json({
                role_id,
                role_name: name,
            });

            // res.json(results.rows);
        } catch (err) {
            next(err);
        }
    },
    // RolePermissions
    addRolePermission: async (req, res, next) => {
        try {
            const { role_id, permission_id } = req.body;
            await role.rolePermission.insert(role_id, permission_id);

            res.json({
                success: true,
                payload: req.body,
                message: 'The permission has been assigned to the user.',
            });
        } catch (err) {
            next(err);
        }
    },
    deleteRolePermission: async (req, res, next) => {
        try {
            const { role_id, permission_id } = req.params;

            const result = await role.rolePermission.delete(
                role_id,
                permission_id
            );
            let json;

            if (result.rowCount === 1) {
                json = {
                    success: true,
                    message: `Permission of role has been deleted.`,
                };
            } else {
                json = {
                    success: false,
                    message: "Role or permission doesn't exist",
                };
            }

            res.json(json);
        } catch (err) {
            next(err);
        }
    },
    getRolePermission: async (req, res, next) => {
        try {
            const { role_id } = req.params;

            const results = await role.rolePermission.get(role_id);
            const roleName = await role.get(role_id);

            Promise.all(
                results.rows.map((obj) =>
                    role.permission.get(obj.permission_id)
                )
            ).then((values) => {
                res.json({
                    role_id,
                    role_name: roleName,
                    permissions: results.rows.map((p, i) => {
                        return {
                            id: p.permission_id,
                            name: values[i],
                        };
                    }),
                });
            });

            // res.json(results.rows);
        } catch (err) {
            next(err);
        }
    },
};
