const crudController = require('./crudController');

const orderController = crudController('customer_order');
const orderItemController = crudController('order_item');
const orderPackageController = crudController('order_package');

// TODO: break up the foreign tables since it needs different name
module.exports = {
    orderController,
    orderItemController,
    orderPackageController,
};
