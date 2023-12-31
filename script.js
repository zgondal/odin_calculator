const buttons = document.querySelectorAll('button');
let operand1;
let operand2;
let operators = {
    '+': 'add',
    '−': 'subtract',
    '×': 'multiply',
    '÷': 'divide',
    '%': 'percent',
};
let operator;
let result;
let topDisplay = document.querySelector(".screen").querySelector(".top"); 
let bottomDisplay = document.querySelector(".screen").querySelector(".bottom");


buttons.forEach(button => 
    {button.addEventListener('click', event => {
        if (event.target.classList.contains('operator')) {
            detectOperator(event.target);
        } else if (event.target.classList.contains('operand')) {
            updateDisplay(event.target);
        } else if (event.target.classList.contains('clear')) {
            topDisplay.textContent = "";
            bottomDisplay.textContent = "";
            operand1 = 0;
            operand2 = 0;
            result = 0;
            operator = '';
        } else if (event.target.classList.contains('equals')) {
            equals();
        }
        })});

function updateDisplay(button) {
    let input = button.textContent;
    if (input === '0' && bottomDisplay.textContent === '0') {return;}
    if (result) {
        bottomDisplay.textContent = input;
        topDisplay.textContent = '';
        result = 0;
        operand1 = 0;
        console.log('operand block 1');
    } else if (bottomDisplay.textContent.includes('.') && button.textContent === '.') {
        input = "";
        console.log('operand block2');
    } else {
        console.log('operand block3');
        if (!bottomDisplay.textContent) {
            bottomDisplay.textContent = input;
        } else {
            bottomDisplay.textContent += input;
        }
    }
}

function detectOperator(button) {
    input = button.textContent;
    console.log(`operator clicker: ${input}`);
    if (input === '±' && bottomDisplay.textContent) {
        bottomDisplay.textContent = parseFloat(bottomDisplay.textContent) * -1;
        return;
    }
    if (input === '%' && bottomDisplay.textContent) {
        bottomDisplay.textContent = parseFloat(bottomDisplay.textContent) / 100;
        return;
    }
    if (operators.hasOwnProperty(topDisplay.textContent.charAt(topDisplay.textContent.length-2)) && !bottomDisplay.textContent) {
        operator = operators[input];
        topDisplay.textContent = topDisplay.textContent.substring(0, topDisplay.textContent.length-2) + input + ' ';
    } else if (result) {
        console.log(`operator block1. result: ${result}`);
        topDisplay.textContent = result + ' ' + input + ' ';
        bottomDisplay.textContent = "";
        operand1 = parseFloat(result);
        operator = operators[input];
        result = 0;
        console.log(`operand1: ${operand1}, operator: ${operator}, input: ${input}`);
    } else if (!operand1 && !bottomDisplay.textContent) {
        return;
    } else if (!operand1) {
        operand1 = parseFloat(bottomDisplay.textContent);
        operator = operators[input];
        topDisplay.textContent = operand1 + ' ' + input + ' ';
        bottomDisplay.textContent = "";
        console.log('operator block2');
    } else if (operand1 && !operand2) {
        operand2 = parseFloat(bottomDisplay.textContent);
        topDisplay.textContent += operand2 + ' ' + input + ' ';
        bottomDisplay.textContent = '';
        operator = operators[input];
        operand1 = evaluate(operand1, operand2, operator);
        console.log('operator block3');
        operand2 = 0;
    }
}

function evaluate(operand1, operand2, operator) {
    if (operator === 'add') {return operand1 + operand2;}
    else if (operator === 'subtract') {return operand1 - operand2;}
    else if (operator === 'multiply') {return operand1 * operand2;}
    else if (operator === 'divide') {return operand1 / operand2;}
    else if (operator === 'percent') {return operand1 / 100;}
}

function equals() {
    if (operators.hasOwnProperty(topDisplay.textContent.charAt(topDisplay.textContent.length-2)) && !bottomDisplay.textContent) {
        console.log('equals block1');
        return;
    } else if (!operand1) {
        if (!bottomDisplay.textContent) {return;}
        result = operand1;
        console.log('equals block2');
    } else if (parseInt(topDisplay.textContent.charAt(topDisplay.textContent.length - 2))) {
        operand1 = parseFloat(bottomDisplay.textContent);
        topDisplay.textContent = operand1 + ' ';
        console.log('equals block3')
    } else {
        operand2 = parseFloat(bottomDisplay.textContent);
        topDisplay.textContent += bottomDisplay.textContent + ' ';
        result = evaluate(operand1, operand2, operator);
        bottomDisplay.textContent = result;
        operand2 = 0;
        operand1 = result;
        console.log('equals block4');
    }
}