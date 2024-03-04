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
    let result = a / b;
    if (!Number.isSafeInteger(result)) {
        return result.toFixed(1);
    } else return result;
}

function dividePercentage(a) {
    return a / 100;
}

function reverseSign(a) {
    return -a;
}

// Operators reference 
const operators = {
    '+': add,
    '-': subtract,
    '*': multiply,
    '/': divide,
    '%': dividePercentage,
    '+/-': reverseSign,
};

// Calling operations
function operate(operator, numFirst, numSecond = null) {
    if (operator in operators) {
        if (operator === '%' || operator === '+/-') {
            return operators[operator](numFirst);
        } else { 
            return operators[operator](numFirst, numSecond) 
        };
    } else {
        return 'No such operator!';
    }
}

let firstNumber = null;
let operator = null;
let secondNumber = null;

let currentPrompt = [];

const displayDiv = document.querySelector('.display-row');

function display(str) {
    displayDiv.textContent += str;
    currentPrompt.push(str);
}

// Numbers display logic
const nmbButtons = document.querySelectorAll('.btn-nmb');

nmbButtons.forEach(item => {
    item.addEventListener('click', () => {
        display(item.textContent);
    });
});

// Zero button logic
const zeroBtn = document.querySelector('.btn-zero');

zeroBtn.addEventListener('click', () => {
    if (currentPrompt.length > 0) display('0');
});

// AC button logic
const  acButton = document.querySelector('.btn-clear');

function clearDisplay() {
    displayDiv.textContent = '';
    currentPrompt.splice(0);
}

acButton.addEventListener('click', () => {
    clearDisplay();
    firstNumber = null;
    secondNumber = null;
    operator = null;
});

// Operators buttons logic

// Binary

function calculateBinary(operatorName) {
    if (firstNumber === null) {
        firstNumber = Number(currentPrompt.join(''));
        operator = operatorName;
        clearDisplay();
    } else {
        secondNumber = Number(currentPrompt.join(''));
        let result = operate(operator, firstNumber, secondNumber);
        clearDisplay();
        firstNumber = result;
        operator = operatorName;
        secondNumber = null;
    }
    // console.log(firstNumber);
    // console.log(operator);
    // console.log(secondNumber);
    // console.log(currentPrompt);
}

const binaryOperatorsBtns = document.querySelectorAll('.btn-binary-op');

binaryOperatorsBtns.forEach(item => {
    item.addEventListener('click', () => {
        calculateBinary(item.textContent);
    });
});

// Equality

const equalsBtn = document.querySelector('.btn-equals');

equalsBtn.addEventListener('click', () => {
    if (firstNumber === null && secondNumber === null) {
        return null;
    }
    secondNumber = Number(currentPrompt.join(''));
    let result = operate(operator, firstNumber, secondNumber);
    clearDisplay();
    display(result);
    firstNumber = null;
    operator = null;
    secondNumber = null;
});

