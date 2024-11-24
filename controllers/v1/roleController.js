const crudController = require('./crudController');

const tableName = 'user_role';
const permissionTable = 'category';
const rolePermissionTable = 'manufacturer';

// TODO: break up the foreign tables since it needs different name
module.exports = {
    add: crudController.create(tableName),
    get: crudController.get(tableName),
    getAll: crudController.getAll(tableName),
    update: crudController.update(tableName),
    delete: crudController.delete(tableName),
    permission: {
        add: crudController.create(permissionTable),
        get: crudController.get(permissionTable),
        getAll: crudController.getAll(permissionTable),
        update: crudController.update(permissionTable),
        delete: crudController.delete(permissionTable),
    },
    rolePermission: {
        add: crudController.create(rolePermissionTable),
        get: crudController.get(rolePermissionTable),
        getAll: crudController.getAll(rolePermissionTable),
        update: crudController.update(rolePermissionTable),
        delete: crudController.delete(rolePermissionTable),
    },
};
