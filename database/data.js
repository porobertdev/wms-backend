const { faker } = require('@faker-js/faker');
const { unique } = require('@dpaskhin/unique');
const { generateUsername } = require('./queries/User');
const {
    NUM_WAREHOUSES,
    NUM_BIN_LOCATIONS,
    NUM_PERSONS,
    NUM_EMPLOYEES,
    NUM_ROLES,
    NUM_PERMISSIONS,
    PERMISSIONS,
    USER_ROLES,
    NUM_CATEGORIES,
    NUM_MANUFACTURERS,
    NUM_PRODUCTS,
    PRODUCT_COUNTER_TYPES,
    NUM_INVENTORY_TRANSACTIONS,
    NUM_ORDERS,
    NUM_CUSTOMERS,
    NUM_DRIVERS,
    NUM_CARS,
    NUM_DELIVERY_ROUTES,
    BIN_LOCATION_CODES,
} = require('./seeder/constants');
const pool = require('./pool');

const getAllRows = async (tableName) => {
    try {
        const users = await pool.query(`SELECT * FROM ${tableName}`);

        return users.rows;
    } catch (err) {
        console.error(err);
    }
};

const table = (name, columns, howMany) => {
    return {
        name,
        columns,
        howMany,
    };
};

const warehouse = {
    name: 'warehouse',
    data: Array.from({ length: NUM_WAREHOUSES }, () => {
        return {
            codename: ['RBUS', 'RBSE', 'RBUV', 'RBUN'][
                faker.number.int({ min: 0, max: 3 })
            ],
            city: 'Bucuresti',
            address: 'Str. Actiunii nr. 34',
            created_at: '2017-12-01',
        };
    }),
};

const bin_location = {
    name: 'bin_location',
    data: Array.from({ length: BIN_LOCATION_CODES.length }, (v, i) => {
        return {
            location_code: BIN_LOCATION_CODES[i],
            warehouse_id: faker.number.int({ min: 1, max: NUM_WAREHOUSES }),
        };
    }),
};

const person = {
    name: 'person',
    data: Array.from({ length: NUM_PERSONS }, () => {
        return {
            first_name: unique(faker.person.firstName, [], { maxRetries: 500 }),
            last_name: unique(faker.person.lastName, [], { maxRetries: 500 }),
            birth_date: faker.date.birthdate(),
            city: faker.location.city(),
            address: faker.location.street(),
            phone_number: faker.phone.number(),
        };
    }),
};

const employee = {
    name: 'employee',
    data: Array.from({ length: NUM_EMPLOYEES }, () => {
        return {
            person_id: faker.number.int({ min: 1, max: person.data.length }),
            warehouse_id: 1,
            role_id: faker.number.int({ min: 1, max: NUM_ROLES }),
            salary: faker.number.int({ max: 5000 }),
        };
    }),
};

const permission = {
    name: 'permission',
    data: Array.from({ length: NUM_PERMISSIONS }, () => {
        return {
            name: faker.helpers.arrayElement(PERMISSIONS),
        };
    }),
};

const user_role = {
    name: 'user_role',
    data: Array.from({ length: NUM_ROLES }, () => {
        return {
            name: faker.helpers.arrayElement(USER_ROLES),
        };
    }),
};

const role_permission = {
    name: 'role_permission',
    data: Array.from({ length: NUM_ROLES }, () => {
        return {
            role_id: faker.number.int({ min: 1, max: NUM_ROLES }),
            permission_id: faker.number.int({
                min: 1,
                max: NUM_PERMISSIONS,
            }),
        };
    }),
};

const users = {
    name: 'users',
    data: Array.from({ length: employee.data.length }, (v, i) => {
        return {
            employee_id: i + 1,
            role_id: faker.number.int({ min: 1, max: NUM_ROLES }),
            /* username: generateUsername(
                person.data[employee.data[i + 1].person_id].first_name,
                person.data[employee.data[i + 1].person_id].last_name
            ), */
            username: generateUsername({
                fname: faker.person.firstName(),
                lname: faker.person.lastName(),
            }),
            password: faker.number.int({ min: 1000, max: 9999 }),
        };
    }),
};

const customer = {
    name: 'customer',
    data: Array.from({ length: NUM_CUSTOMERS }, () => {
        return {
            type: 'business',
            person_id: faker.number.int({
                min: 1,
                max: NUM_CUSTOMERS,
            }),
        };
    }),
};

const product_category = {
    name: 'product_category',
    data: Array.from({ length: NUM_CATEGORIES }, () => {
        return {
            name: unique(faker.commerce.department),
        };
    }),
};

const product_manufacturer = {
    name: 'product_manufacturer',
    data: Array.from({ length: NUM_MANUFACTURERS }, () => {
        return {
            name: unique(faker.company.name),
        };
    }),
};

const product = {
    name: 'product',
    data: Array.from({ length: NUM_PRODUCTS }, () => {
        return {
            name: faker.commerce.productName(),
            sku: faker.commerce.isbn(),
            description: faker.commerce.productDescription(),
            counter_type: faker.helpers.arrayElement(PRODUCT_COUNTER_TYPES),
            width: faker.number.float(),
            height: faker.number.float(),
            price: faker.commerce.price(),
            category_id: faker.number.int({ min: 1, max: NUM_CATEGORIES }),
            manufacturer_id: faker.number.int({
                min: 1,
                max: NUM_MANUFACTURERS,
            }),
        };
    }),
};

const inventory_transaction = {
    name: 'inventory_transaction',
    data: Array.from({ length: NUM_INVENTORY_TRANSACTIONS }, () => {
        return {
            product_id: faker.number.int({ min: 1, max: product.data.length }),
            location_id: faker.number.int({
                min: 1,
                max: NUM_BIN_LOCATIONS,
            }),
            quantity_change: 1,
            transaction_type: 'update', //faker.helpers.arrayElement(PERMISSIONS),
            user_id: faker.number.int({ min: 1, max: users.data.length }),
        };
    }),
};

const user_transaction = {
    name: 'user_transaction',
    data: Array.from({ length: NUM_INVENTORY_TRANSACTIONS }, () => {
        return {
            user_id: faker.number.int({ min: 1, max: users.data.length }),
            transaction_id: faker.number.int({
                min: 1,
                max: NUM_INVENTORY_TRANSACTIONS,
            }),
        };
    }),
};

const product_inventory = {
    name: 'product_inventory',
    data: Array.from({ length: NUM_PRODUCTS }, () => {
        return {
            product_id: faker.number.int({ min: 1, max: product.data.length }),
            warehouse_id: faker.number.int({ min: 1, max: NUM_WAREHOUSES }),
            location_id: faker.number.int({
                min: 1,
                max: NUM_BIN_LOCATIONS,
            }),
            quantity: faker.number.int({ max: 1000 }),
        };
    }),
};

const customer_order = {
    name: 'customer_order',
    data: Array.from({ length: NUM_ORDERS }, () => {
        return {
            customer_id: faker.number.int({
                min: 1,
                max: customer.data.length,
            }),
            shipping_date: '2025-01-01', //faker.date.future(),
        };
    }),
};

const order_item = {
    name: 'order_item',
    data: Array.from({ length: 20 }, () => {
        return {
            order_id: faker.number.int({
                min: 1,
                max: customer_order.data.length,
            }),
            product_id: faker.number.int({ min: 1, max: product.data.length }),
            quantity: faker.number.int({ max: 100 }),
            price: faker.number.float({ max: 1000 }),
        };
    }),
};

const order_package = {
    name: 'order_package',
    data: Array.from({ length: 20 }, () => {
        return {
            order_id: faker.number.int({
                min: 1,
                max: customer_order.data.length,
            }),
            product_id:
                customer_order.data[
                    faker.number.int({
                        min: 1,
                        max: customer_order.data.length,
                    })
                ].product_id,
            user_id: faker.number.int({ min: 1, max: users.data.length }),
        };
    }),
};

const car = {
    name: 'car',
    data: Array.from({ length: NUM_CARS }, () => {
        return {
            license_plate: faker.vehicle.vrm(),
            manufacturer: faker.vehicle.manufacturer(),
            model: faker.vehicle.model(),
            color: faker.vehicle.color(),
            capacity: 1500,
            mileage: faker.number.int({ min: 150000, max: 300000 }),
            availability: faker.datatype.boolean(),
            // last_maintenance: '2024-05-22',
            // issue: 'car_issue_id',
        };
    }),
};

const delivery_route = {
    name: 'delivery_route',
    data: Array.from({ length: NUM_DELIVERY_ROUTES }, (v, i) => {
        return {
            route_code: `local-${i + 1}`,
            route_zone: 'Bucharest',
            delivery_hour: '13:00',
        };
    }),
};

const route_package = {
    name: 'route_package',
    data: Array.from({ length: 10 }, () => {
        return {
            route_id: faker.number.int({
                min: 1,
                max: delivery_route.data.length,
            }),
            package_id: faker.number.int({
                min: 1,
                max: order_package.data.length,
            }),
        };
    }),
};

const driver = {
    name: 'driver',
    data: Array.from({ length: NUM_DRIVERS }, () => {
        return {
            employee_id: faker.number.int({
                min: 1,
                max: employee.data.length,
            }),
            car_id: faker.number.int({ min: 1, max: car.data.length }),
            delivery_route_id: faker.number.int({
                min: 1,
                max: delivery_route.data.length,
            }),
        };
    }),
};

const tables = [
    // WH
    warehouse,
    bin_location,
    // Employees
    person,
    // User management
    permission,
    user_role,
    role_permission,
    employee,
    users,
    customer,
    // Products
    product_category,
    product_manufacturer,
    product,
    // Transactions
    inventory_transaction,
    user_transaction,
    product_inventory,
    // Orders
    customer_order,
    order_item,
    order_package,

    // TODO: fix this bcoz it's created before drivers table
    /*     shipment: {
        columns: {
            order_id: faker.number.int({ min: 1, max: NUM_ORDERS }),
            driver_id: faker.number.int({ min: 1, max: NUM_DRIVERS }),
            tracking_number: faker.commerce.isbn(),
        },
        howMany: NUM_PERMISSIONS,
    }, */
    //
    car,
    delivery_route,
    // Drivers
    route_package,
    driver,
];

module.exports = { tables };
