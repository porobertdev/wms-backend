const { Router } = require('express');
const signupController = require('../../controllers/v1/signupController');
const verifyAcessToken = require('../../middleware/verifyJWT');

const signupRouter = Router();

signupRouter.post('/', signupController.signup);
signupRouter.get('/verify', verifyAcessToken, signupController.verifyEmail);

module.exports = signupRouter;
