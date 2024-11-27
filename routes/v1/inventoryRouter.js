const { Router } = require('express');
const {
    inventoryController,
    inventoryTransactionsController,
} = require('../../controllers/v1/inventoryController');

const inventoryRouter = Router();

// product
inventoryRouter.get('/product', inventoryController.getAll);
inventoryRouter.post('/product', inventoryController.add);
inventoryRouter.get('/product/:id', inventoryController.get);
inventoryRouter.put('/product/:id', inventoryController.update);
inventoryRouter.delete('/product/:id', inventoryController.delete);

// transaction
inventoryRouter.get('/transactions', inventoryTransactionsController.getAll);
inventoryRouter.post('/transactions', inventoryTransactionsController.add);
inventoryRouter.get('/transactions/:id', inventoryTransactionsController.get);
inventoryRouter.put(
    '/transactions/:id',
    inventoryTransactionsController.update
);
inventoryRouter.delete(
    '/transactions/:id',
    inventoryTransactionsController.delete
);

module.exports = inventoryRouter;
