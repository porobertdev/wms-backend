const { Router } = require('express');

const {
    carController,
    carIssueController,
} = require('../../controllers/v1/carController');

const carRouter = Router();

// customer_order
carRouter.get('/', carController.getAll);
carRouter.post('/', carController.add);
carRouter.get('/:id', carController.get);
carRouter.put('/:id', carController.update);
carRouter.delete('/:id', carController.delete);

// order item

// order_package
carRouter.get('/issues', carIssueController.getAll);
carRouter.post('/issues', carIssueController.add);
carRouter.get('/issues/:id', carIssueController.get);
carRouter.put('/issues/:id', carIssueController.update);
carRouter.delete('/issues/:id', carIssueController.delete);

module.exports = carRouter;
