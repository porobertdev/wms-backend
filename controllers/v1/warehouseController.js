const crudController = require('./crudController');

const warehouseController = crudController('warehouse');
const binLocationController = crudController('bin_location');

module.exports = {
    warehouseController,
    binLocationController,
};
