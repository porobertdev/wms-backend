// barrel module
const init = require('./initialize');
const seeder = require('./seeder/seeder');
const warehouse = require('./queries/Warehouse');
const person = require('./queries/Person');
const employee = require('./queries/Employee');
const role = require('./queries/Role');
const user = require('./queries/User');
const customer = require('./queries/Customer');
const product = require('./queries/Product');
const inventory = require('./queries/Inventory');
const order = require('./queries/Order');
const car = require('./queries/Car');
const driver = require('./queries/Driver');
const dynamic = require('./queries/Dynamic');

module.exports = {
    init,
    seeder,
    warehouse,
    person,
    employee,
    role,
    user,
    customer,
    product,
    inventory,
    order,
    car,
    driver,
    // dynamic queries
    dynamic,
};
