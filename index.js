const inquirer = require('inquirer')
const fs = require('fs')
const { Circle, Square, Triangle } = require('./lib/shapes')

// inquirer questions
const questions = [
    {
        type: 'input',
        name: 'text',
        message: 'Enter three characters you want to include in your logo, you can think of these as a three letter abbreviation: '
    },
    {
        type: 'input',
        name: 'textColor',
        message: 'Select the color would you like your text to be :'
    },
    {
        type: 'list',
        name: 'shapeChoice',
        message: 'Select the shape you want your logo to be: ',
        choices: ['circle', 'triangle', 'square']
    },
    {
        type: 'input',
        name: 'shapeColor',
        message: 'Select a color you want your shape to be: '
    },
]

// this function allows to write a file which is the svg file to print us the svg logo
function init() {
    inquirer.prompt(questions)
        .then(answers => {
            let shape;
            if (answers.shapeChoice === 'circle') {
                shape = new Circle();
            } else if (answers.shapeChoice === 'triangle') {
                shape = new Triangle();
            } else {
                shape = new Square();
            }
            shape.setColor(answers.shapeColor);
            return `<svg version="1.1" width="300" height="200" xmlns="http://www.w3.org/2000/svg">

            ${shape.render()}

            <text x="150" y="125" font-size="60" text-anchor="middle" fill="${answers.textColor}">${answers.text}</text>
          
          </svg>`
        }).then(response => {
            console.log(response)
            fs.writeFileSync('examples/logo.svg', response)
            console.log('Success! Your file is located in the examples directory!'); 
        })
}

init()