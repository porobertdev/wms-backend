const { Router } = require('express');
const usersController = require('../../controllers/v1/usersController');

const usersRouter = Router();

usersRouter.post('/', usersController.create);
usersRouter.get('/:user_id', usersController.get);
usersRouter.delete('/:user_id', usersController.delete);
// TODO: use dynamic update for any table fields
usersRouter.put('/:user_id', usersController.updateUserRole);

module.exports = usersRouter;
