const { Router } = require('express');
const productsController = require('../../controllers/v1/productsController');

const productsRouter = Router();

// categories
productsRouter.post('/category', productsController.createCategory);
productsRouter.get('/category/:category_id', productsController.getCategory);
productsRouter.delete(
    '/category/:category_id',
    productsController.deleteCategory
);
productsRouter.put('/category/:category_id', productsController.updateCategory);

// manufacturers
productsRouter.post('/manufacturers', productsController.createManufacturer);
productsRouter.get(
    '/manufacturers/:manufacturer_id',
    productsController.getManufacturer
);
productsRouter.delete(
    '/manufacturers/:manufacturer_id',
    productsController.deleteManufacturer
);
productsRouter.put(
    '/manufacturers/:manufacturer_id',
    productsController.updateManufacturer
);

// products
productsRouter.post('/', productsController.createProduct);
productsRouter.put('/:product_id', productsController.updateProduct);
productsRouter.get('/:product_id', productsController.getProduct);
productsRouter.delete('/:product_id', productsController.deleteProduct);

module.exports = productsRouter;
