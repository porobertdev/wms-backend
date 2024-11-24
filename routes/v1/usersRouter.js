const { Router } = require('express');
const usersController = require('../../controllers/v1/usersController');

const usersRouter = Router();

usersRouter.post('/', usersController.add);
usersRouter.get('/:id', usersController.get);
usersRouter.put('/:id', usersController.update);
usersRouter.delete('/:id', usersController.delete);

module.exports = usersRouter;
