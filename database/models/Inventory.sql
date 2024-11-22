DROP TABLE IF EXISTS inventory_transaction, user_transaction, product_inventory;

CREATE TABLE IF NOT EXISTS inventory_transaction(
    id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    product_id INT REFERENCES product(id) NOT NULL,
    location_id INT REFERENCES bin_location(id) NOT NULL,
    quantity_change INT,
    transaction_type VARCHAR(50) NOT NULL,
    transaction_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    user_id INT REFERENCES users(id) NOT NULL
);

CREATE TABLE IF NOT EXISTS user_transaction(
    id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    user_id INT REFERENCES users(id),
    transaction_id INT REFERENCES inventory_transaction(id) NOT NULL
);

CREATE TABLE IF NOT EXISTS product_inventory(
    id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    product_id INT REFERENCES product(id) ON DELETE CASCADE NOT NULL,
    warehouse_id INT REFERENCES warehouse(id) ON DELETE CASCADE NOT NULL,
    location_id INT REFERENCES bin_location(id) ON DELETE SET NULL,
    quantity INT
);