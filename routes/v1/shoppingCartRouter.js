const { Router } = require('express');
const shoppingCartController = require('../../controllers/v1/shoppingCartController');

const shoppingCartRouter = Router();

// use query param instead of :id to use the same crudController
// format: api/v1/profile/cart/?c_user_id=1
shoppingCartRouter.get('/', shoppingCartController.get);
shoppingCartRouter.post('/', shoppingCartController.add);
shoppingCartRouter.put('/', shoppingCartController.update);
// id == c_user_id
shoppingCartRouter.delete('/', shoppingCartController.delete);

module.exports = shoppingCartRouter;
