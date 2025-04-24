// function to covert Fahrenheit
// to Celsius
function fahrenheitToCelsius(fahrenheit) {
    return (fahrenheit - 32) * 5 / 9;
}

// Driver code
let fahrenheit = 100;
let celsius = fahrenheitToCelsius(fahrenheit);
console.log(fahrenheit + " Fahrenheit is " + celsius + " Celsius");
