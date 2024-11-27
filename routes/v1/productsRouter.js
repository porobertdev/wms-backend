const { Router } = require('express');
const {
    productsController,
    categoryController,
    manufacturerController,
} = require('../../controllers/v1/productsController');

const productsRouter = Router();

// products
productsRouter.post('/', productsController.add);
productsRouter.put('/:id', productsController.update);
productsRouter.get('/:id', productsController.get);
productsRouter.delete('/:id', productsController.delete);

// categories
productsRouter.post('/category', categoryController.add);
productsRouter.get('/category/:id', categoryController.get);
productsRouter.delete('/category/:id', categoryController.delete);
productsRouter.put('/category/:id', categoryController.update);

// manufacturers
productsRouter.post('/manufacturers', manufacturerController.add);
productsRouter.get('/manufacturers/:id', manufacturerController.get);
productsRouter.delete('/manufacturers/:id', manufacturerController.delete);
productsRouter.put('/manufacturers/:id', manufacturerController.update);

module.exports = productsRouter;
