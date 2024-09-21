const inquirer = require('inquirer');

//Prompt user for option
const init = () => {
    inquirer.createPromptModule([
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
                'Add an employee.'
            ]
        }



    ])
}