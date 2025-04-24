// Calculator class to handle operations
class Calculator {
    add(a, b) {
        return a + b;
    }

    subtract(a, b) {
        return a - b;
    }

    multiply(a, b) {
        return a * b;
    }

    divide(a, b) {
        if (b === 0) {
            return "Error! Division by zero.";
        }
        return a / b;
    }
}

// Main function to interact with the calculator
function main() {
    const calculator = new Calculator();

    console.log("Welcome to the Calculator!");
    console.log("Options:");
    console.log("1. Add");
    console.log("2. Subtract");
    console.log("3. Multiply");
    console.log("4. Divide");
    console.log("5. Exit");

    const readline = require('readline').createInterface({
        input: process.stdin,
        output: process.stdout
    });

    function promptUser() {
        readline.question("Enter your choice (1-5): ", (choice) => {
            if (choice === '5') {
                console.log("Thanks for using the calculator. Goodbye!");
                readline.close();
                return;
            }

            readline.question("Enter the first number: ", (num1) => {
                readline.question("Enter the second number: ", (num2) => {
                    const a = parseFloat(num1);
                    const b = parseFloat(num2);

                    let result;
                    switch (choice) {
                        case '1':
                            result = calculator.add(a, b);
                            console.log(`Result: ${result}`);
                            break;
                        case '2':
                            result = calculator.subtract(a, b);
                            console.log(`Result: ${result}`);
                            break;
                        case '3':
                            result = calculator.multiply(a, b);
                            console.log(`Result: ${result}`);
                            break;
                        case '4':
                            result = calculator.divide(a, b);
                            console.log(`Result: ${result}`);
                            break;
                        default:
                            console.log("Invalid choice. Please try again.");
                            break;
                    }

                    promptUser(); // Prompt the user again
                });
            });
        });
    }

    promptUser(); // Start the interaction
}

// Run the main function
main();