const { Router } = require('express');
const verifyAcessToken = require('../../middleware/verifyJWT');
const { orderController } = require('../../controllers/v1/orderController');
const profileController = require('../../controllers/v1/profileController');
const shoppingCartRouter = require('./shoppingCartRouter');

const profileRouter = Router();

// don't use isAuthenticated for React frontend. I think verifying the token is enough
profileRouter.use('/', verifyAcessToken, (req, res, next) => {
    console.log(`New profile request: ${req.url}`);
    next();
});

profileRouter.use('/cart', shoppingCartRouter);

profileRouter.get('/account/:id', profileController.getAccountInfo);
profileRouter.get('/orders', orderController.get);

// favorites
profileRouter.get('/favorites/:id', profileController.getFavorites);
profileRouter.post('/favorites', profileController.addProductToFavorites);
profileRouter.delete('/favorites', profileController.deleteFavoriteProduct);

profileRouter.get('/vouchers');
profileRouter.get('/address');
profileRouter.get('/cards');

module.exports = profileRouter;
