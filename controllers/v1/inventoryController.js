const crudController = require('./crudController');
const tableName = 'inventory';

module.exports = {
    add: crudController.create(tableName),
    get: crudController.get(tableName),
    getAll: crudController.getAll(tableName),
    update: crudController.update(tableName),
    delete: crudController.delete(tableName),
};
