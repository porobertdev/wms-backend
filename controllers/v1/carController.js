const crudController = require('./crudController');

const carController = crudController('car');
const carIssueController = crudController('order_item');

// TODO: break up the foreign tables since it needs different name
module.exports = {
    carController,
    carIssueController,
};
