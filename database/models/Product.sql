DROP TABLE IF EXISTS product_category, product_manufacturer, product CASCADE;

CREATE TABLE IF NOT EXISTS product_category(
    id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    name VARCHAR(100) UNIQUE
);

CREATE TABLE IF NOT EXISTS product_manufacturer(
    id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    name VARCHAR(100) UNIQUE
);

CREATE TABLE IF NOT EXISTS product(
    id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    name VARCHAR(255) NOT NULL,
    sku VARCHAR(50),
    description VARCHAR(255),
    counter_type VARCHAR(20),
    width DEC,
    height DEC,
    weight DEC,
    price DEC,
    category_id INT REFERENCES product_category(id) ON DELETE SET NULL,
    manufacturer_id INT REFERENCES product_manufacturer(id) ON DELETE CASCADE NOT NULL
);

CREATE TABLE IF NOT EXISTS product_favorites(
    id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    customer_id INT REFERENCES c_users(id) NOT NULL,
    product_id INT REFERENCES product(id) NOT NULL
);