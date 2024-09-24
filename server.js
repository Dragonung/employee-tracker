const inquirer = require('inquirer');
const { Pool } = require('pg');

//Connect to database
const pool = new Pool(
    {
        user: 'postgres',
        //not leaking my pw
        password: '',
        host: 'localhost',
        database: 'employees_db'

    },
    console.log(`Connected to the employees_db database.`)
)

pool.connect();

//Prompt user for option
function init() {
    inquirer
        .prompt([
            {
                name: 'prompt',
                type: 'list',
                message: 'Select a choice.',
                choices: [
                    'View all departments.',
                    'View all roles.',
                    'View all employees.',
                    'Add a department.',
                    'Add a role.',
                    'Add an employee.',
                    'Update employee role.'
                ]
            }
        ])
        .then((response) => {
            const { prompt } = response;

            if (choices === 'View all departments.') {
                viewAllDepartments();
            }

            if (choices === 'View all roles.') {
                viewAllRoles();
            }

            if (choices === 'View all employees.') {
                viewAllEmployees();
            }

            if (choices === 'Add a department.') {
                addDepartment();
            }

            if (choices === 'Add a role.') {
                addRole();
            }

            if (choices === 'Add an employee.') {
                addEmployee();
            }

            if (choices === 'Update employee role.') {
                updateRole();
            }
        });
};

//View functions
function viewAllDepartments() {
    //refer to db/view/viewdepartments.sql or lead to it
    app.get('/api/departments', (req, res) => {
        const sql = `SELECT department.id AS id,
                     department.department_name AS department
                     FROM department`;

        pool.query(sql, (err, { rows }) => {
            if (err) {
                res.status(500).json({ error: err.message });
                return;
            }
            res.json({
                message: 'Here is a list of all departments.',
                data: rows
            });
        });
    });
}

function viewAllRoles() {
    //refer to db/view/viewroles.sql or lead to it
    app.get('/api/roles', (req, res) => {
        const sql = `SELECT role.id, role.title, role.salary, role.department AS department
                     FROM role
                     INNER JOIN department ON role.department = department.department_name`;

        pool.query(sql, (err, { rows }) => {
            if (err) {
                res.status(500).json({ error: err.message });
                return;
            }
            res.json({
                message: 'Here is a list of all roles.',
                data: rows
            });
        });
    });
}

function viewAllEmployees() {
    //refer to db/view/viewemployees.sql or lead to it
    app.get('/api/employees', (req, res) => {
        const sql = `SELECT employees.id, employees.first_name, employees.last_name AS employee,
                     role_id AS role FROM role,
                     manager_id AS manager
                     LEFT JOIN role on employees.role_id = role.id`;

        pool.query(sql, (err, { rows }) => {
            if (err) {
                res.status(500).json({ error: err.message });
                return;
            }
            res.json({
                message: 'Here is a list of all employees.',
                data: rows
            });
        });
    });
}

//Add functions
function addDepartment() {
    inquirer
        .prompt([
            {
                type: 'input',
                name: 'newDepartment',
                message: "Enter name of new department."
            }
        ])
        .then((response) => {
            app.post('/api/new-department', ({ body }, res) => {
                const sql = `INSERT INTO department (department_name) 
                             VALUES ($2, ${response.newDepartment})`;
                const params = [body.newDepartment]

                pool.query(sql, params, (err, result) => {
                    if (err) {
                        res.status(400).json({ error: err.message });
                        return;
                    }
                    res.json({
                        message: 'A new department has been added.',
                        data: body
                    });
                });
            });
        });
}

function addRole() {
    inquirer
        .prompt([
            {
                type: 'input',
                name: 'roleName',
                message: "What is the name of role?"
            },
            {
                type: 'input',
                name: 'roleSalary',
                message: "Enter salary of role."
            },
            {
                type: 'input',
                name: 'roleDepartment',
                message: "Which department is this role for?"
            }
        ])
        .then((response) => {
            app.post('/api/new-role', ({ body }, res) => {
                const sql = `INSERT INTO role (id, title, salary, department) 
                             VALUES ($5, ${response.roleName}, ${response.roleSalary}, ${response.roleDepartment})`;
                const params = [body.newRole]

                pool.query(sql, params, (err, result) => {
                    if (err) {
                        res.status(400).json({ error: err.message });
                        return;
                    }
                    res.json({
                        message: 'A new role has been added.',
                        data: body
                    });
                });
            });
        }
        )
}
function addEmployee() {
    inquirer
        .prompt([
            {
                type: 'input',
                name: 'firstName',
                message: "What is employee's first name?"
            },
            {
                type: 'input',
                name: 'lastName',
                message: "What is employee's last name?"
            },
            {
                type: 'input',
                name: 'role',
                message: "What is the employee's role?"
            },
            {
                type: 'input',
                name: 'manager',
                message: "Which manager does this employee work under?"
            },
        ])
        .then((response) => {
            app.post('/api/new-employee', ({ body }, res) => {
                const sql = `INSERT INTO employees (id, first_name, last_name, role_id, manager_id) 
                             VALUES ($5, ${response.firstName}, ${response.lastName}, ${response.role}, ${response.manager})`;
                const params = [body.newEmployee]

                pool.query(sql, params, (err, result) => {
                    if (err) {
                        res.status(400).json({ error: err.message });
                        return;
                    }
                    res.json({
                        message: 'A new role has been added.',
                        data: body
                    });
                });
            });
        })
}

//Update employee function
function updateRole() {
    inquirer
        .prompt([
            {
                type: 'input',
                name: 'firstName',
                message: "What is employee's first name?"
            },
            {
                type: 'input',
                name: 'lastName',
                message: "What is employee's last name?"
            },
        ])
    .then((response) => {
    app.put('/api/employee/:id', (req, res) => {
        const sql = `UPDATE employees SET employee = $3 WHERE id =$5`;
        const params = [req.body.role, req.params.id];

        pool.query(sql, params, (err, result) => {
            if (err){
                res.status(400).json({ error: err.message});
            } else if (!result.rowCount){
                res.json({
                    message: 'No employee found'
                });
            } else {
                res.json({
                    message: `${response.firstName} + ' ' ${response.lastName} + ''s role has been updated.`,
                    data: req.body,
                    changes: result.rowCount
                });
            }
            });
        });
    })
}
//start server.js
init();