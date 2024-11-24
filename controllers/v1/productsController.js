const crudController = require('./crudController');

const tableName = 'product';
const categoryTable = 'category';
const manufacturerTable = 'manufacturer';

// TODO: break up the foreign tables since it needs different name
module.exports = {
    add: crudController.create(tableName),
    get: crudController.get(tableName),
    getAll: crudController.getAll(tableName),
    update: crudController.update(tableName),
    delete: crudController.delete(tableName),
    category: {
        add: crudController.create(categoryTable),
        get: crudController.get(categoryTable),
        getAll: crudController.getAll(categoryTable),
        update: crudController.update(categoryTable),
        delete: crudController.delete(categoryTable),
    },
    manufacturer: {
        add: crudController.create(manufacturerTable),
        get: crudController.get(manufacturerTable),
        getAll: crudController.getAll(manufacturerTable),
        update: crudController.update(manufacturerTable),
        delete: crudController.delete(manufacturerTable),
    },
};
