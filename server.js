const inquirer = require('inquirer');

//Prompt user for option
const init = () => {
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
        const{prompt} = response;

        if (choices === 'View all departments.'){
            viewAllDepartments();
        }
        
        if (choices === 'View all roles.'){
            viewAllRoles();
        }

        if (choices === 'View all employees.'){
            viewAllEmployees();
        }

        if(choices === 'Add a department.'){
            addDepartment();
        }

        if(choices === 'Add a role.'){
            addRole();
        }

        if(choices === 'Add an employee.'){
            addEmployee();
        }

        if(choices === 'Update employee role.'){
            updateRole();
        }
    });
}