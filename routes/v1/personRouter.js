const { Router } = require('express');
const personController = require('../../controllers/v1/personController');

const personRouter = Router();

personRouter.post('/', personController.createPerson);
personRouter.get('/:user_id', personController.getPerson);
personRouter.delete('/:user_id', personController.deletePerson);

module.exports = personRouter;
