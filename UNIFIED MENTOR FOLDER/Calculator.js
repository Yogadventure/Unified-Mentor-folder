
const display = document.getElementById('display');

function Clear() {
    display.value = "";     //Clear the display by Setting its value to an empty string
}

function Delete() {
    display.value = display.value.slice(0, -1);     //slice method to Exclude the last character from display.
}

function Display(input) {
    display.value += input;     //concatenation of the values from the user to form a input string.
}


function Calculate() {
    let equation = document.getElementById('display').value;   // Get the input equation from the display element


    function validateInput(equation) {
        // This given regex pattern matches the input equation with all possible numbers, operators, and optional spaces patterns.
        const regex = /^\s*-?(\d+(\.\d*)?|\.\d+)(\s*[-+*/]\s*-?(\d+(\.\d*)?|\.\d+))?\s*$/;
        return regex.test(equation); // validate input equation
    }

    //Input validations.
    //if no input is given
    if (!equation) {
        display.value = "Give input!";
        return;
    }

    //give proper input that ends with digits
    const regex = /^[\d\s.+\-*/]*[\d]$/;
    if (!regex.test(equation)) {
        display.value = "Invalid Input 3!";
        return;
    }

    // Check for repeated operators in input
    let invalidChars = /(?<!^)[\+\-\*/\.]{2,}/;
    if (invalidChars.test(equation)) {
        display.value = "Invalid Input 4!";
        return;
    }


    // Split input into numbers and operators
    const numbers = equation.split(/[-+*/]/).map(Number); // Split and convert to numbers
    const operators = equation.split('').filter(char => ['+', '-', '*', '/'].includes(char)); // Extract operators

    if (operators.length === 0 || numbers.length === 0) {
        display.value = "Invalid Input 1!";
        return;
    }

    // console.log(numbers);
    // console.log(operators);

    if (numbers.length !== operators.length + 1) {
        display.value = "Invalid Input 2!";
        return;
    }

    //Explicitly Processing operators with higher precedence first 
    for (let i = 0; i < operators.length; i++) {
        if (operators[i] === '*' || operators[i] === '/') {
            try {
                if (operators[i] === '/' && numbers[i + 1] === 0) {
                    throw new Error("Division by zero");
                }
            } catch (error) {
                document.getElementById('display').value = "Invalid Input 0!";
                return;
            }
            const result = operators[i] === '*'
                ? numbers[i] * numbers[i + 1]
                : numbers[i] / numbers[i + 1];

            // Replace the numbers and operator with result
            numbers.splice(i, 2, result);
            operators.splice(i, 1);
            i--; // Recheck the current position in the array after replacement

        }
    }

    // Process operators with lower precedence now
    let result = numbers[0];
    for (let i = 0; i < operators.length; i++) {
        result = operators[i] === '+' ? result + numbers[i + 1] : result - numbers[i + 1];

    }

    // Display the final result
    document.getElementById('display').value = result;
}