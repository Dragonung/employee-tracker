DROP DATABASE IF EXISTS employees_db;
CREATE DATABASE employees_db;

\c employees_db;

CREATE TABLE department(
    id INTEGER PRIMARY KEY,
    department_name VARCHAR(30) NOT NULL,
);

CREATE TABLE role(
    id INTEGER PRIMARY KEY,
    title VARCHAR(30)UNIQUE NOT NULL,
    salary DECIMAL(10,2) NOT NULL,
    department INTEGER NOT NULL
);

CREATE TABLE employees(
    id INTEGER PRIMARY KEY,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INTEGER NOT NULL,
    manager_id INTEGER
)

