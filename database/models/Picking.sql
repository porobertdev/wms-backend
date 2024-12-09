DROP TABLE IF EXISTS picking_list;

CREATE TABLE IF NOT EXISTS picking_list(
    id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    warehouse_sector VARCHAR(5) NOT NULL,
    worker_id INT REFERENCES users(id),
    order_id INT REFERENCES customer_order(id) NOT NULL,
    products JSON NOT NULL,
    picking_status VARCHAR(20) DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS picked_items(
    id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    pick_id INT REFERENCES picking_list(id) NOT NULL,
    product_id INT REFERENCES Product(id) NOT NULL,
    -- product_sku INT REFERENCES Product(sku),
    -- product_name INT REFERENCES Product(name),
    picking_status VARCHAR(20) DEFAULT 'pending'
);