DROP DATABASE IF EXISTS employees_db;
CREATE DATABASE employees_db;

\c employees_db;

CREATE TABLE departments(
    id INTEGER PRIMARY KEY,
    department VARCHAR(255) NOT NULL,
);

CREATE TABLE roles(
    id INTEGER PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    department VARCHAR(255) NOT NULL,
    salary DECIMAL(10,2) NOT NULL
);

CREATE TABLE employees(
    id INTEGER PRIMARY KEY,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    title VARCHAR(255) NOT NULL,
    departments VARCHAR(255) NOT NULL,
    salary DECIMAL(10,2) NOT NULL,
    manager VARCHAR(255) NOT NULL
)

