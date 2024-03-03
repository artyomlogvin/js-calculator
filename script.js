// Operations
function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    return Math.round(a / b) / 10;
}

function dividePercentage(a) {
    return a / 100;
}

// Operators reference 
const operators = {
    '+': add,
    '-': subtract,
    '*': multiply,
    '/': divide,
    '%': dividePercentage,
};

// Calling operations
function operate(operator, numFirst, numSecond = null) {
    if (operator in operators) {
        if (operator === '%') {
            return operators['%'](numFirst);
        } else { 
            return operators[operator](numFirst, numSecond) 
        };
    } else {
        return 'No such operator!';
    }
}

let firstNumber = 0;
let operator = '';
let secondNumber = 0;

let currentPrompt = [];

