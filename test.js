document.addEventListener('DOMContentLoaded', function () {
    const display = document.getElementById('display');
    let currentInput = '';
    let previousInput = '';
    let operation = null;

    function updateDisplay() {
        display.textContent = currentInput || '0';
    }

    function handleDigit(digit) {
        if (digit === '.' && currentInput.includes('.')) return;
        currentInput += digit;
        updateDisplay();
    }

    function handleOperation(op) {
        if (currentInput === '') return;
        if (previousInput !== '') {
            calculate();
        }
        operation = op;
        previousInput = currentInput;
        currentInput = '';
    }

    function calculate() {
        let result;
        const prev = parseFloat(previousInput);
        const current = parseFloat(currentInput);
        if (isNaN(prev) || isNaN(current)) return;

        switch (operation) {
            case '+':
                result = prev + current;
                break;
            case '-':
                result = prev - current;
                break;
            case '*':
                result = prev * current;
                break;
            case '/':
                result = prev / current;
                break;
            default:
                return;
        }

        currentInput = result.toString();
        operation = null;
        previousInput = '';
        updateDisplay();
    }

    function clear() {
        currentInput = '';
        previousInput = '';
        operation = null;
        updateDisplay();
    }

    document.querySelectorAll('.btn').forEach(button => {
        button.addEventListener('click', () => {
            const value = button.getAttribute('data-value');
            if (value >= '0' && value <= '9' || value === '.') {
                handleDigit(value);
            } else if (value === '+' || value === '-' || value === '*' || value === '/') {
                handleOperation(value);
            }
        });
    });

    document.getElementById('equals').addEventListener('click', calculate);
    document.getElementById('clear').addEventListener('click', clear);
});

describe('Calculator Tests', () => {
    let display;

    beforeEach(() => {
        display = document.getElementById('display');
        clear();
    });

    test('Addition', () => {
        handleDigit('5');
        handleOperation('+');
        handleDigit('3');
        calculate();
        expect(display.textContent).toBe('8');
    });

    test('Subtraction', () => {
        handleDigit('9');
        handleOperation('-');
        handleDigit('4');
        calculate();
        expect(display.textContent).toBe('5');
    });

    test('Multiplication', () => {
        handleDigit('7');
        handleOperation('*');
        handleDigit('6');
        calculate();
        expect(display.textContent).toBe('42');
    });

    test('Division', () => {
        handleDigit('8');
        handleOperation('/');
        handleDigit('2');
        calculate();
        expect(display.textContent).toBe('4');
    });

    test('Division by zero', () => {
        handleDigit('8');
        handleOperation('/');
        handleDigit('0');
        calculate();
        expect(display.textContent).toBe('Infinity');
    });

    test('Clear', () => {
        handleDigit('8');
        handleOperation('/');
        handleDigit('2');
        clear();
        expect(display.textContent).toBe('0');
    });
});