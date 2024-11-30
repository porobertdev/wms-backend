const { Router } = require('express');
const rootController = require('../../controllers/v1/rootController');
const warehouseRouter = require('./warehouseRouter');
const personRouter = require('./personRouter');
const rolesRouter = require('./rolesRouter');
const employeesRouter = require('./employeesRouter');
const usersRouter = require('./usersRouter');
const customersRouter = require('./customersRouter');
const productsRouter = require('./productsRouter');
const inventoryRouter = require('./inventoryRouter');
const orderRouter = require('./orderRouter');
const carRouter = require('./carRouter');
const driverRouter = require('./driverRouter');
const signupRouter = require('./signupRouter');
const loginRouter = require('./loginRouter');
const isAuthenticated = require('../../middleware/isAuthenticated');
const verifyAcessToken = require('../../middleware/verifyJWT');

const rootRouter = Router();

rootRouter.get('/', rootController.get);
rootRouter.use('/warehouses', warehouseRouter);
rootRouter.use('/persons', personRouter);
rootRouter.use('/roles', rolesRouter);
rootRouter.use('/employees', employeesRouter);
rootRouter.use('/users', usersRouter);
rootRouter.use('/customers', customersRouter);
rootRouter.use('/products', productsRouter);
rootRouter.use('/inventory', inventoryRouter);
rootRouter.use('/orders', orderRouter);
rootRouter.use('/cars', carRouter);
rootRouter.use('/drivers', driverRouter);
// auth
rootRouter.use('/signup', signupRouter);
rootRouter.use('/', loginRouter);
// persistent login state test
rootRouter.use('/shop', isAuthenticated, verifyAcessToken, (req, res) => {
    res.json({ message: 'You are allowed to access the shop' });
});

module.exports = { rootRouter };
