const crudController = require('./crudController');

const productsController = crudController('product');
const categoryController = crudController('category');
const manufacturerController = crudController('manufacturer');

// TODO: break up the foreign tables since it needs different name
module.exports = {
    productsController,
    categoryController,
    manufacturerController,
};
