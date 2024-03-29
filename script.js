// Operations
function add(a, b) {
    const result = a + b;
    if (!Number.isSafeInteger(result)) {
        return result.toFixed(3);
    } else return result;
}

function subtract(a, b) {
    const result = a - b;
    if (!Number.isSafeInteger(result)) {
        return result.toFixed(3);
    } else return result;
}

function multiply(a, b) {
    const result = a * b;
    if (!Number.isSafeInteger(result)) {
        return result.toFixed(3);
    } else return result;
}

function divide(a, b) {
    const result = a / b;
    if (!Number.isSafeInteger(result)) {
        return result.toFixed(3);
    } else return result;
}

function dividePercentage(a) {
    const result = a / 100;
    if (!Number.isSafeInteger(result)) {
        return result.toFixed(3);
    } else return result;
}

function reverseSign(a) {
    return -a;
}

function addFloatingPoint() {
    if (!currentPrompt.join('').includes('.')) {
        if (currentPrompt.length == 0) {
            display('0');
            display('.');
        } else {
            display('.');
        }
    }
}

// Operators reference 
const operators = {
    '+': add,
    '-': subtract,
    '*': multiply,
    '/': divide,
    '%': dividePercentage,
    '+/-': reverseSign,
    '.': addFloatingPoint,
};

// Calling operations
function operate(operator, numFirst, numSecond = null) {
    if (operator in operators) {
        if (operator === '%' || operator === '+/-') {
            return operators[operator](numFirst);
        } else {
            const result = operators[operator](numFirst, numSecond);
            if (result == Infinity) {
                return 'Can\'t divide by 0!';
            } else return result;
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

function clearPrompt() {
    currentPrompt.splice(0);
}

function clearDisplay() {
    displayDiv.textContent = '';
}

// Numbers display logic
const nmbButtons = document.querySelectorAll('.btn-nmb');

nmbButtons.forEach(item => {
    item.addEventListener('click', () => {
        if (currentPrompt.length < 30) {
            if ((currentPrompt[0] == '0' && currentPrompt[1] == '.') || (currentPrompt[0] != 0)) {
                if (currentPrompt.length === 0) {
                    clearDisplay();
                }
                display(item.textContent);
            } 
        }
    });
});

// Zero button logic
const zeroBtn = document.querySelector('.btn-zero');

zeroBtn.addEventListener('click', () => {
    if (currentPrompt.length < 30) {
        if (currentPrompt[0] != '0' || currentPrompt.includes('.')) {
            if (currentPrompt.length === 0) {
                clearDisplay();
            }
            display('0');
        }
    }
});

// AC button logic
const  acButton = document.querySelector('.btn-clear');

function clearData() {
    clearDisplay();
    clearPrompt();
    firstNumber = null;
    secondNumber = null;
    operator = null;
}

acButton.addEventListener('click', () => {
    clearData();
});

// Operators buttons logic

// Binary

function calculateBinary(operatorName) {
    if (firstNumber === null) {
        firstNumber = Number(currentPrompt.join(''));
        operator = operatorName;
        clearDisplay();
        clearPrompt();
    } else {
        secondNumber = Number(currentPrompt.join(''));
        let result = operate(operator, firstNumber, secondNumber);
        clearDisplay();
        display(result);
        clearPrompt();
        if (result != 'Can\'t divide by 0!') {
            firstNumber = result;
            operator = operatorName;
            secondNumber = null; 
        } else {
            firstNumber = null;
            operator = null;
            secondNumber = null;
        }
    }
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
    if (firstNumber !== null && currentPrompt.length > 0) {
        secondNumber = Number(currentPrompt.join(''));
        let result = operate(operator, firstNumber, secondNumber);
        clearDisplay();
        clearPrompt();
        display(result);
        if (result == 'Can\'t divide by 0!') {
            clearPrompt();
        }
        firstNumber = null;
        operator = null;
        secondNumber = null;
    }
});

// Unary
function calculateUnary(operatorName) {
    if (currentPrompt.length > 0) {
        const prompt = Number(currentPrompt.join(''));
        let result = operate(operatorName, prompt);
        clearDisplay();
        clearPrompt();
        display(result);
    }
}

const unaryOperatorsBtns = document.querySelectorAll('.btn-unary-op');

unaryOperatorsBtns.forEach(item => {
    item.addEventListener('click', () => {
        calculateUnary(item.textContent);
    });
});

// Float button logic

const floatBtn = document.querySelector('.btn-float');

floatBtn.addEventListener('click', () => {
    if (currentPrompt.length < 30) {
        addFloatingPoint(); 
    }
});

// CE button logic

const ceBtn = document.querySelector('.btn-backspace');

ceBtn.addEventListener('click', () => {
    if (currentPrompt.length > 0) {
        currentPrompt = currentPrompt.join('').split('');
        currentPrompt.pop();
        if (currentPrompt.length === 1 && currentPrompt[0] == '-') {
            currentPrompt.pop();
        }
        displayDiv.textContent = currentPrompt.join('');
    }
})

// Keyboard logic
numKeys = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];

document.addEventListener('keydown', (e) => {
    if (e.key == '0') {
        zeroBtn.click();
    } else if (e.key in numKeys || e.key == '9') {
        nmbButtons.forEach(item => {
            if (item.textContent == e.key) {
                item.click();
            }
        });
    } else if (e.key == '+' || e.key == '-' || e.key == '/' ||
     e.key == '*') {
        calculateBinary(e.key);
    } else if (e.key == '%') {
        calculateUnary(e.key);
    } else if (e.key == '.') {
        floatBtn.click();
    } else if (e.key == '=') {
        equalsBtn.click();
    } else if (e.key == 'Backspace') {
        ceBtn.click();
    }
});