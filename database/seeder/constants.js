const { generateBinLocations } = require('../utils');

const BIN_LOCATION_CODES = generateBinLocations({
    base: 'T01',
    nested_num_start: 1,
    nested_num_end: 15,
    nested_letter_start: 'A',
    nested_letter_end: 'F',
});

const PERMISSIONS = [
    'transfer_product',
    'update_quantity',
    'scan_package',
    'get_product_location',
    'create_ctr',
    'print_label',
    'print_bill',
];

const USER_ROLES = [
    'boss',
    'worker',
    'manager',
    'billing',
    'driver',
    'returning',
];

// NUMs
const NUM_WAREHOUSES = 1;
const NUM_BIN_LOCATIONS = BIN_LOCATION_CODES.length;
const NUM_PRODUCTS = 10000; // 50000;
const NUM_PERSONS = 800; //50000;
const NUM_EMPLOYEES = 300;
const NUM_PERMISSIONS = PERMISSIONS.length;
const NUM_ROLES = USER_ROLES.length;
const NUM_MANUFACTURERS = 30;
const NUM_CATEGORIES = 15;
const NUM_CUSTOMERS = NUM_PERSONS - NUM_EMPLOYEES;
// Inventory
const PRODUCT_COUNTER_TYPES = ['piece'];
const NUM_INVENTORY_TRANSACTIONS = 5000;
const TRANSACTION_TYPES = ['transfer'];
// Orders
const NUM_ORDERS = 20000;
const NUM_ACCOUNT_LEVELS = [
    // level: orders
    {
        level: 1,
        orders: 100,
    },
    {
        level: 2,
        orders: 200,
    },
    {
        level: 3,
        orders: 300,
    },
    {
        level: 4,
        orders: 400,
    },
    {
        level: 5,
        orders: 500,
    },
];
// Drivers
const NUM_CARS = 50;
const NUM_DRIVERS = 20;
const NUM_DELIVERY_ROUTES = 15;

module.exports = {
    NUM_WAREHOUSES,
    NUM_BIN_LOCATIONS,
    NUM_PRODUCTS,
    NUM_PERSONS,
    NUM_EMPLOYEES,
    NUM_ROLES,
    NUM_PERMISSIONS,
    NUM_MANUFACTURERS,
    NUM_CATEGORIES,
    NUM_CUSTOMERS,
    NUM_INVENTORY_TRANSACTIONS,
    NUM_ORDERS,
    NUM_DRIVERS,
    NUM_CARS,
    NUM_DELIVERY_ROUTES,
    BIN_LOCATION_CODES,
    PERMISSIONS,
    USER_ROLES,
    PRODUCT_COUNTER_TYPES,
    TRANSACTION_TYPES,
    NUM_ACCOUNT_LEVELS,
};
