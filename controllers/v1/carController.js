const crudController = require('./crudController');

const carController = crudController('car');
const carIssueController = crudController('car_issue');

// TODO: break up the foreign tables since it needs different names
module.exports = {
    carController,
    carIssueController,
};
