const crudController = require('./crudController');

const roleController = crudController('user_role');
const permissionController = crudController('permission');
const rolePermissionController = crudController('role_permission');

// TODO: break up the foreign tables since it needs different name
module.exports = {
    roleController,
    permissionController,
    rolePermissionController,
};
