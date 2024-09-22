INSERT INTO departments(id, department) VALUES
(101, 'playable char')

INSERT INTO roles (id, title, department, salary) VALUES
(201, 'main character', 'playable char', '50000')
(202, 'Marios brother', 'playable char', '20000'),
(203, 'Princess', 'playable char', '20000'),
(204, 'subject', 'playable char', '10000');

INSERT INTO employees (id, first_name, last_name, title, departments, salary, manager) VALUES
(301, 'Mario', 'Mario', 'main char', 'playable char', '50000', 'Nintendo'),
(302, 'Luigi', 'Mario', 'Marios brother', 'playable char', '20000', 'Nintendo'),
(303, 'Peach', 'Toadstool', 'Princess', 'Mushroom Kingdom', '20000', 'Nintendo'),
(304, 'Toad', 'Toadstool', 'minion', 'subject', '10000', 'Nintendo')