const { Router } = require('express');
const scraperController = require('../../controllers/v1/scraperController');

const scraperRouter = Router();

// scraperRouter.get('/', scraperController.get);
scraperRouter.get('/', scraperController.getProduct);

module.exports = scraperRouter;
