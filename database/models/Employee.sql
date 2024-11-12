DROP TABLE IF EXISTS employee CASCADE;

CREATE TABLE IF NOT EXISTS employee(
    id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    person_id INT REFERENCES person(id) NOT NULL,
    warehouse_id INT REFERENCES warehouse(id) NOT NULL,
    employment_start DATE DEFAULT CURRENT_DATE,
    employment_end DATE,
    role_id INT REFERENCES user_role(id),
    salary DEC
);