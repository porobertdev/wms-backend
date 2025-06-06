DROP TABLE IF EXISTS users CASCADE;

-- users for employees
CREATE TABLE IF NOT EXISTS users(
    id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    employee_id INT REFERENCES employee(id) ON DELETE CASCADE UNIQUE NOT NULL,
    role_id INT REFERENCES user_role(id) ON DELETE SET NULL NOT NULL,
    username VARCHAR(5) UNIQUE NOT NULL,
    password VARCHAR(4) NOT NULL,
    created_at DATE DEFAULT CURRENT_DATE,
    islogged BOOLEAN DEFAULT FALSE
);

-- users for customers on the e-commerce platform
CREATE TABLE IF NOT EXISTS c_users(
    id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(60) NOT NULL,
    role_id INT REFERENCES user_role(id) ON DELETE SET NULL,
    account_level INT DEFAULT 1,
    isverified BOOLEAN DEFAULT FALSE,
    created_at DATE DEFAULT CURRENT_DATE
);