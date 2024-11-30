const { Router } = require('express');
const loginController = require('../../controllers/v1/loginController');

const loginRouter = Router();

loginRouter.post('/login', loginController.post);
loginRouter.get('/login', loginController.get);
loginRouter.get('/logout', loginController.logout);

module.exports = loginRouter;
