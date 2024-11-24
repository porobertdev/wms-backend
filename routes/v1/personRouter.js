const { Router } = require('express');
const personController = require('../../controllers/v1/personController');

const personRouter = Router();

personRouter.get('/', personController.getAll);
personRouter.post('/', personController.add);
personRouter.delete('/', personController.delete);
personRouter.get('/:id', personController.get);
personRouter.put('/:id', personController.update);
personRouter.delete('/:id', personController.delete);

module.exports = personRouter;
