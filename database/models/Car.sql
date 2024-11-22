DROP TABLE IF EXISTS car_issue, car CASCADE;

CREATE TABLE IF NOT EXISTS car_issue(
    id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    name VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS car(
    id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    license_plate VARCHAR(10),
    manufacturer VARCHAR(50) NOT NULL,
    model VARCHAR(50) NOT NULL,
    color VARCHAR(15) NOT NULL,
    capacity INT NOT NULL,
    mileage INT NOT NULL,
    availability BOOLEAN NOT NULL,
    last_maintenance DATE,
    issue INT REFERENCES car_issue(id) ON DELETE SET NULL
);
