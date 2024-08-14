const display = document.getElementById("display");
let operation = '';
let isRadians = true;
let memory = 0;
let currentInput = '';
let cursorPosition = 0;



// Append number or decimal to the display
function appendNumber(number) {
    display.value = display.value === '0' ? number : display.value + number;
}

// Update the current operation
function updateOperation(op) {
    operation = op;
    display.value += ' ' + op + ' ';
}

// Calculate the result based on the operation
function calculate() {
    try {
        let result = eval(display.value.replace('x', '*').replace('÷', '/'));
        display.value = result;
    } catch (error) {
        display.value = "Error";
    }
}

function moveCursorLeft() {
    const display = document.getElementById('display');
    cursorPosition = Math.max(0, cursorPosition - 1);
    updateDisplayCursor(display);
}

function moveCursorRight() {
    const display = document.getElementById('display');
    cursorPosition = Math.min(display.value.length, cursorPosition + 1);
    updateDisplayCursor(display);
}

function updateDisplayCursor(display) {
    display.setSelectionRange(cursorPosition, cursorPosition);
    display.focus(); // Keep focus on the display after moving the cursor
}

function appendNumber(number) {
    const display = document.getElementById('display');
    const beforeCursor = display.value.slice(0, cursorPosition);
    const afterCursor = display.value.slice(cursorPosition);
    
    display.value = beforeCursor + number + afterCursor;
    cursorPosition++;
    updateDisplayCursor(display);
}

// Update cursor position after operations or clearing display
function updateOperation(operator) {
    const display = document.getElementById('display');
    display.value += operator;
    cursorPosition = display.value.length;
}

function clearDisplay() {
    document.getElementById('display').value = '';
    cursorPosition = 0;
}

// Change the sign of the current number
function changeSign() {
    display.value = display.value.charAt(0) === '-' ? display.value.slice(1) : '-' + display.value;
}

// Toggle between radians and degrees
function toggleRadiansDegrees() {
    isRadians = !isRadians;
    document.getElementById("radians-degrees-toggle").innerText = isRadians ? "Radians" : "Degrees";
}

// Compute the selected function
function computeFunction(func) {
    let value = parseFloat(display.value);
    let result;

    switch (func) {
        case 'sin':
            result = isRadians ? Math.sin(value) : Math.sin(degToRad(value));
            break;
        case 'cos':
            result = isRadians ? Math.cos(value) : Math.cos(degToRad(value));
            break;
        case 'tan':
            result = isRadians ? Math.tan(value) : Math.tan(degToRad(value));
            break;
        case 'log':
            result = Math.log10(value);
            break;
        case 'sqrt':
            result = Math.sqrt(value);
            break;
        case 'exp':
            result = Math.exp(value);
            break;
        case 'pow':
            let [base, exponent] = display.value.split('^').map(Number);
            result = Math.pow(base, exponent);
            break;
        case 'factorial':
            result = factorial(value);
            break;
        case 'pow10':
            result = Math.pow(10, value);
            break;
        case 'ln':
            result = Math.log(value);
            break;
        case 'inverse':
            result = 1 / value;
            break;
        case 'sinh':
            result = Math.sinh(value);
            break;
        case 'cosh':
            result = Math.cosh(value);
            break;
        case 'tanh':
            result = Math.tanh(value);
            break;
        case 'square':
            result = Math.pow(value, 2);
            break;
        case 'cube':
            result = Math.pow(value, 3);
            break;
        case 'cubeRoot':
            result = Math.cbrt(value);
            break;
        case 'nthRoot':
            let [radicand, root] = display.value.split('Root').map(Number);
            result = Math.pow(radicand, 1 / root);
            break;
        case 'perm':
            let [n, r] = display.value.split('P').map(Number);
            result = permutation(n, r);
            break;
        case 'comb':
            let [nComb, rComb] = display.value.split('C').map(Number);
            result = combination(nComb, rComb);
            break;
        case 'mean':
            let numbers = display.value.split(',');
            result = mean(numbers);
            break;
        case 'stdDev':
            let stdNumbers = display.value.split(',');
            result = standardDeviation(stdNumbers);
            break;
        case 'variance':
            let varNumbers = display.value.split(',');
            result = variance(varNumbers);
            break;
        case 'sec':
            result = 1 / (isRadians ? Math.cos(value) : Math.cos(degToRad(value)));
            break;
        case 'csc':
            result = 1 / (isRadians ? Math.sin(value) : Math.sin(degToRad(value)));
            break;
        case 'cot':
            result = 1 / (isRadians ? Math.tan(value) : Math.tan(degToRad(value)));
            break;
        case 'pv':
                result = presentValue();
            break;
        case 'fv':
                result = futureValue();
            break;
        case 'npv':
                result = netPresentValue();
            break;
        case 'irr':
                result = internalRateOfReturn();
            break;
        case 'loanAmortization':
                result = loanAmortization();
            break;
        case 'unitConversion':
                result = unitConversion();
            break;
        case 'baseConversion':
                result = baseConversion();
            break;
        case 'binaryToDecimal':
            result = parseInt(value, 2);
            break;
        case 'decimalToBinary':
            result = (value >>> 0).toString(2);
            break;
        case 'physicalConstants':
            // Implement physical constants lookup logic
            break;
        default:
            result = "Error";
            break;
    }

    display.value = result;
}

// Helper functions
function degToRad(degrees) {
    return degrees * (Math.PI / 180);
}

function factorial(n) {
    if (n === 0 || n === 1) return 1;
    return n * factorial(n - 1);
}

function permutation(n, r) {
    return factorial(n) / factorial(n - r);
}

function combination(n, r) {
    return factorial(n) / (factorial(r) * factorial(n - r));
}

function mean(numbers) {
    let sum = numbers.reduce((acc, num) => acc + parseFloat(num), 0);
    return sum / numbers.length;
}

function variance(numbers) {
    let avg = mean(numbers);
    let variance = numbers.reduce((acc, num) => acc + Math.pow(num - avg, 2), 0) / numbers.length;
    return variance;
}

function standardDeviation(numbers) {
    return Math.sqrt(variance(numbers));
}
// Present Value (PV) calculation
function presentValue() {
    // Prompt user for necessary inputs
    const futureValue = parseFloat(prompt("Enter the future value (FV):"));
    const rate = parseFloat(prompt("Enter the interest rate (as a decimal):"));
    const periods = parseInt(prompt("Enter the number of periods (n):"));

    return futureValue / Math.pow(1 + rate, periods);
}

// Future Value (FV) calculation
function futureValue() {
    // Prompt user for necessary inputs
    const presentValue = parseFloat(prompt("Enter the present value (PV):"));
    const rate = parseFloat(prompt("Enter the interest rate (as a decimal):"));
    const periods = parseInt(prompt("Enter the number of periods (n):"));

    return presentValue * Math.pow(1 + rate, periods);
}

// Net Present Value (NPV) calculation
function netPresentValue() {
    const rate = parseFloat(prompt("Enter the discount rate (as a decimal):"));
    const cashFlows = prompt("Enter the cash flows (comma-separated):").split(',').map(Number);

    let npv = 0;
    for (let i = 0; i < cashFlows.length; i++) {
        npv += cashFlows[i] / Math.pow(1 + rate, i + 1);
    }
    return npv;
}

// Internal Rate of Return (IRR) calculation
function internalRateOfReturn() {
    const cashFlows = prompt("Enter the cash flows (comma-separated):").split(',').map(Number);
    let irr = 0.1; // Initial guess
    let npv;

    const accuracy = 0.00001; // Desired accuracy level
    const maxIterations = 1000;
    let iteration = 0;

    do {
        npv = 0;
        for (let i = 0; i < cashFlows.length; i++) {
            npv += cashFlows[i] / Math.pow(1 + irr, i + 1);
        }
        irr = irr - npv / derivativeNPV(cashFlows, irr);
        iteration++;
    } while (Math.abs(npv) > accuracy && iteration < maxIterations);

    return irr * 100; // Convert to percentage
}

function derivativeNPV(cashFlows, irr) {
    let derivative = 0;
    for (let i = 0; i < cashFlows.length; i++) {
        derivative -= (i + 1) * cashFlows[i] / Math.pow(1 + irr, i + 2);
    }
    return derivative;
}

// Loan Amortization calculation
function loanAmortization() {
    const principal = parseFloat(prompt("Enter the loan amount (Principal):"));
    const annualRate = parseFloat(prompt("Enter the annual interest rate (as a decimal):"));
    const years = parseInt(prompt("Enter the number of years:"));

    const monthlyRate = annualRate / 12;
    const numberOfPayments = years * 12;

    const monthlyPayment = principal * monthlyRate / (1 - Math.pow(1 + monthlyRate, -numberOfPayments));
    return monthlyPayment.toFixed(2);
}

// Unit Conversion (Example: meters to feet)
function unitConversion() {
    const units = prompt("Enter the value and units to convert from and to (e.g., '100 meters to feet'):");

    let [value, fromUnit, , toUnit] = units.split(' ');
    value = parseFloat(value);

    const conversionFactors = {
        "meters": 1,
        "feet": 3.28084,
        "inches": 39.3701,
        "cm": 100,
        "mm": 1000,
        "yards": 1.09361,
    };

    if (conversionFactors[fromUnit] && conversionFactors[toUnit]) {
        return (value * conversionFactors[toUnit] / conversionFactors[fromUnit]).toFixed(2) + ' ' + toUnit;
    } else {
        return "Conversion not supported.";
    }
}

function baseConversion() {
    const conversion = prompt("Enter the value and base conversion (e.g., '1011 binary to decimal'):").toLowerCase();

    let [value, fromBase, , toBase] = conversion.split(' ');

    // Normalize input bases
    const baseMapping = {
        "binary": 2,
        "decimal": 10,
        "hexadecimal": 16,
        "octal": 8
    };

    fromBase = baseMapping[fromBase];
    toBase = baseMapping[toBase];

    if (fromBase && toBase) {
        // Convert the input value from the original base to the target base
        return parseInt(value, fromBase).toString(toBase);
    } else {
        return "Conversion not supported.";
    }
}
function clearEntry() {
    currentInput = '';
    document.getElementById('display').value = currentInput;
}

function clearMemory() {
    memory = 0;
}

function recallMemory() {
    document.getElementById('display').value = memory;
}

function addToMemory() {
    memory += parseFloat(document.getElementById('display').value);
}

function subtractFromMemory() {
    memory -= parseFloat(document.getElementById('display').value);
}