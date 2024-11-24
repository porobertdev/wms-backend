const { Router } = require('express');
const customersController = require('../../controllers/v1/customersController');

const customersRouter = Router();

customersRouter.post('/', customersController.add);
customersRouter.get('/:id', customersController.get);
customersRouter.put('/:id', customersController.update);
customersRouter.delete('/:id', customersController.delete);

module.exports = customersRouter;
