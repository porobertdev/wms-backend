const { Router } = require('express');
const rootController = require('../../controllers/v1/rootController');

const rootRouter = Router();

rootRouter.get('/', rootController.get);

module.exports = { rootRouter };
