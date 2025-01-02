const { Router } = require('express');
const verifyAcessToken = require('../../middleware/verifyJWT');
const { orderController } = require('../../controllers/v1/orderController');

const profileRouter = Router();

// don't use isAuthenticated for React frontend. I think verifying the token is enough
profileRouter.use('/', verifyAcessToken, (req, res, next) => {
    console.log(`New profile request: ${req.url}`);
    next();
});
profileRouter.get('/account');
profileRouter.get('/orders');
profileRouter.get('/orders/:id', orderController.get);
profileRouter.get('/favorites');
profileRouter.get('/vouchers');
profileRouter.get('/address');
profileRouter.get('/cards');

module.exports = profileRouter;
