const display = document.getElementById('display');

// Converts from degrees to radians
function toRadians(degrees) {
    return degrees * (Math.PI / 180);
}

function appendValue(value) {
    display.value += value;
}

function clearDisplay() {
    display.value = '';
}

function deleteLast() {
    display.value = display.value.slice(0, -1);
}

function calculateResult() {
    try {
        let expression = display.value;

        // Convert sin(x), cos(x), tan(x) from degrees to radians
        expression = expression.replace(/sin\(([^)]+)\)/g, (_, angle) => `Math.sin(${toRadians(eval(angle))})`);
        expression = expression.replace(/cos\(([^)]+)\)/g, (_, angle) => `Math.cos(${toRadians(eval(angle))})`);
        expression = expression.replace(/tan\(([^)]+)\)/g, (_, angle) => `Math.tan(${toRadians(eval(angle))})`);

        // Replace log(x) with Math.log10(x)
        expression = expression.replace(/log\(([^)]+)\)/g, (_, val) => `Math.log10(${eval(val)})`);

        // Replace √ with Math.sqrt
        expression = expression.replace(/√\(([^)]+)\)/g, (_, val) => `Math.sqrt(${eval(val)})`);

        // Replace % with /100
        expression = expression.replace(/(\d+)%/g, (_, num) => `(${num}/100)`);

        // Evaluate the final expression
        display.value = Function('"use strict"; return (' + expression + ')')().toString();
    } catch (error) {
        display.value = 'Error';
    }
}

function toggleScientific() {
    const sciDiv = document.getElementById('scientific');
    if (sciDiv.innerHTML === '') {
        sciDiv.innerHTML = `
            <button onclick="appendValue('sin(')">sin</button>
            <button onclick="appendValue('cos(')">cos</button>
            <button onclick="appendValue('tan(')">tan</button>
            <button onclick="appendValue('log(')">log</button>
            <button onclick="appendValue('√(')">√</button>
            <button onclick="appendValue('%')">%</button>
            <button onclick="appendValue('(')">(</button>
            <button onclick="appendValue(')')">)</button>
        `;
    } else {
        sciDiv.innerHTML = '';
    }
}
