const crudController = require('./crudController');

const inventoryController = crudController('product_inventory');
const inventoryTransactionsController = crudController('inventory_transaction');

module.exports = { inventoryController, inventoryTransactionsController };
