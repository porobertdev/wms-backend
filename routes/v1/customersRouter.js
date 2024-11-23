const { Router } = require('express');
const customersController = require('../../controllers/v1/customersController');

const customersRouter = Router();

customersRouter.post('/', customersController.create);
customersRouter.get('/:customer_id', customersController.get);
customersRouter.delete('/:customer_id', customersController.delete);

module.exports = customersRouter;
