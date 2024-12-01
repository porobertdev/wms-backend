DROP TABLE IF EXISTS customer_order, order_item, order_package, shipment CASCADE;

CREATE TABLE IF NOT EXISTS customer_order(
    id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    customer_id INT REFERENCES customer(id) ON DELETE CASCADE NOT NULL,
    created_at DATE DEFAULT CURRENT_DATE,
    shipping_fee INT DEFAULT 10,
    shipping_date DATE,
    order_status VARCHAR(20) DEFAULT 'Pending',
    priority VARCHAR(20) DEFAULT 'Normal'
);

CREATE TABLE IF NOT EXISTS order_item(
    id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    order_id INT REFERENCES customer_order(id) ON DELETE CASCADE NOT NULL,
    product_id INT REFERENCES product(id) ON DELETE CASCADE NOT NULL,
    quantity INT NOT NULL,
    price DEC NOT NULL
);

CREATE TABLE IF NOT EXISTS order_package(
    id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    order_id INT REFERENCES customer_order(id) ON DELETE SET NULL NOT NULL,
    product_id INT REFERENCES order_item(product_id) ON DELETE CASCADE NOT NULL,
    scan_status VARCHAR(20) DEFAULT 'Created',
    user_id INT REFERENCES users(id) ON DELETE SET NULL NOT NULL
);

/* CREATE TABLE IF NOT EXISTS s'hipment (
    id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    order_id INT REFERENCES customer_order(id),
    driver_id INT REFERENCES driver(id),
    tracking_number VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    shipment_status VARCHAR(50) DEFAULT 'In Transit'
); */