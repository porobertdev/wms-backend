const crudController = require('./crudController');
const tableName = 'warehouse';
const binLocationTable = 'bin_location';

module.exports = {
    add: crudController.create(tableName),
    get: crudController.get(tableName),
    getAll: crudController.getAll(tableName),
    update: crudController.update(tableName),
    delete: crudController.delete(tableName),
    binLocation: {
        add: crudController.create(binLocationTable),
        get: crudController.get(binLocationTable),
        getAll: crudController.getAll(binLocationTable),
        update: crudController.update(binLocationTable),
        delete: crudController.delete(binLocationTable),
    },
};
