const Calculator = require('./test.js').Calculator;
const readline = require('readline');
const main = require('./test.js').main;
const main = require('./test.js').main;
const main = require('./test.js').main;

// test.test.js

describe('Calculator', () => {
    let calculator;

    beforeEach(() => {
        calculator = new Calculator();
    });

    test('add() should return the sum of two numbers', () => {
        expect(calculator.add(2, 3)).toBe(5);
        expect(calculator.add(-1, 1)).toBe(0);
        expect(calculator.add(0, 0)).toBe(0);
    });

    test('subtract() should return the difference of two numbers', () => {
        expect(calculator.subtract(5, 3)).toBe(2);
        expect(calculator.subtract(0, 5)).toBe(-5);
        expect(calculator.subtract(3, 3)).toBe(0);
    });

    test('multiply() should return the product of two numbers', () => {
        expect(calculator.multiply(2, 3)).toBe(6);
        expect(calculator.multiply(-1, 5)).toBe(-5);
        expect(calculator.multiply(0, 10)).toBe(0);
    });

    test('divide() should return the quotient of two numbers', () => {
        expect(calculator.divide(6, 3)).toBe(2);
        expect(calculator.divide(5, 2)).toBeCloseTo(2.5);
    });

    test('divide() should return an error message when dividing by zero', () => {
        expect(calculator.divide(5, 0)).toBe("Error! Division by zero.");
    });
});

// Mocking readline for main function testing
jest.mock('readline', () => {
    const mockInterface = {
        question: jest.fn(),
        close: jest.fn(),
    };
    return {
        createInterface: jest.fn(() => mockInterface),
    };
});


describe('Main function', () => {
    let mockCalculator;

    beforeEach(() => {
        mockCalculator = new Calculator();
        jest.spyOn(console, 'log').mockImplementation(() => {});
        jest.spyOn(mockCalculator, 'add').mockImplementation(() => 5);
        jest.spyOn(mockCalculator, 'subtract').mockImplementation(() => 1);
        jest.spyOn(mockCalculator, 'multiply').mockImplementation(() => 6);
        jest.spyOn(mockCalculator, 'divide').mockImplementation(() => 2);
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    test('should display the correct menu options', () => {
        readline.createInterface().question.mockImplementationOnce((_, callback) => {
            callback('5'); // Simulate exit choice
        });

        main();

        expect(console.log).toHaveBeenCalledWith("Welcome to the Calculator!");
        expect(console.log).toHaveBeenCalledWith("Options:");
        expect(console.log).toHaveBeenCalledWith("1. Add");
        expect(console.log).toHaveBeenCalledWith("2. Subtract");
        expect(console.log).toHaveBeenCalledWith("3. Multiply");
        expect(console.log).toHaveBeenCalledWith("4. Divide");
        expect(console.log).toHaveBeenCalledWith("5. Exit");
    });

    test('should handle addition correctly', () => {
        readline.createInterface().question
            .mockImplementationOnce((_, callback) => callback('1')) // Choose addition
            .mockImplementationOnce((_, callback) => callback('2')) // First number
            .mockImplementationOnce((_, callback) => callback('3')); // Second number

        main();

        expect(mockCalculator.add).toHaveBeenCalledWith(2, 3);
        expect(console.log).toHaveBeenCalledWith("Result: 5");
    });

    test('should exit when choice is 5', () => {
        readline.createInterface().question.mockImplementationOnce((_, callback) => {
            callback('5'); // Simulate exit choice
        });

        main();

        expect(console.log).toHaveBeenCalledWith("Thanks for using the calculator. Goodbye!");
        expect(readline.createInterface().close).toHaveBeenCalled();
    });
});