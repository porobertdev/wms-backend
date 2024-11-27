DROP TABLE IF EXISTS delivery_route, route_package, route_hour, driver CASCADE;

CREATE TABLE IF NOT EXISTS delivery_route(
    id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    route_code VARCHAR(10) NOT NULL UNIQUE,
    route_zone VARCHAR(100) NOT NULL,
    delivery_hour TIME NOT NULL
);

CREATE TABLE IF NOT EXISTS route_package(
    id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    route_id INT REFERENCES delivery_route(id) ON DELETE CASCADE NOT NULL,
    package_id ON DELETE CASCADE INT REFERENCES order_package(id) NOT NULL
);

-- CREATE TABLE IF NOT EXISTS route_hour(
--     id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
--     delivery_route_id INT REFERENCES delivery_route(id) NOT NULL,
--     delivery_hour TIME
-- );

CREATE TABLE IF NOT EXISTS driver(
    id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    employee_id INT REFERENCES employee(id) NOT NULL,
    car_id INT REFERENCES car(id) NOT NULL UNIQUE,
    delivery_route_id INT REFERENCES delivery_route(id) ON DELETE SET NULL NOT NULL
);