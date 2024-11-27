const { Router } = require('express');
const inventoryController = require('../../controllers/v1/inventoryController');

const inventoryRouter = Router();

// product
inventoryRouter.get('/product', inventoryController.getAll);
inventoryRouter.post('/product', inventoryController.add);
inventoryRouter.get('/product/:id', inventoryController.get);
inventoryRouter.put('/product/:id', inventoryController.update);
inventoryRouter.delete('/product/:id', inventoryController.delete);

// transaction
inventoryRouter.get('/transactions', inventoryController.getAll);
inventoryRouter.post('/transactions', inventoryController.add);
inventoryRouter.get('/transactions/:id', inventoryController.get);
inventoryRouter.put('/transactions/:id', inventoryController.update);
inventoryRouter.delete('/transactions/:id', inventoryController.delete);

module.exports = inventoryRouter;
