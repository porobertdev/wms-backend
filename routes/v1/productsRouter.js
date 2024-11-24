const { Router } = require('express');
const productsController = require('../../controllers/v1/productsController');

const productsRouter = Router();

// products
productsRouter.post('/', productsController.add);
productsRouter.put('/:id', productsController.update);
productsRouter.get('/:id', productsController.get);
productsRouter.delete('/:id', productsController.delete);

// categories
productsRouter.post('/category', productsController.category.add);
productsRouter.get('/category/:id', productsController.category.get);
productsRouter.delete('/category/:id', productsController.category.delete);
productsRouter.put('/category/:id', productsController.category.update);

// manufacturers
productsRouter.post('/manufacturers', productsController.manufacturer.add);
productsRouter.get('/manufacturers/:id', productsController.manufacturer.get);
productsRouter.delete(
    '/manufacturers/:id',
    productsController.manufacturer.delete
);
productsRouter.put('/manufacturers/:id', productsController.update);

module.exports = productsRouter;
