const display = document.getElementById('display') as HTMLInputElement;

// Conversion from degrees to radians
function toRadians(degrees: number): number {
    return degrees * (Math.PI / 180);
}

function appendValue(value: string): void {
    display.value += value;
}

function clearDisplay(): void {
    display.value = '';
}

function deleteLast(): void {
    display.value = display.value.slice(0, -1);
}

function calculateResult(): void {
    try {
        let expression: string = display.value;

        // Conversion of sin(x), cos(x), tan(x) from degrees to radians
        expression = expression.replace(/sin\(([^)]+)\)/g, (_, angle: string) => `Math.sin(${toRadians(eval(angle))})`);
        expression = expression.replace(/cos\(([^)]+)\)/g, (_, angle: string) => `Math.cos(${toRadians(eval(angle))})`);
        expression = expression.replace(/tan\(([^)]+)\)/g, (_, angle: string) => `Math.tan(${toRadians(eval(angle))})`);

        // Replaces log(x) with Math.log10(x)
        expression = expression.replace(/log\(([^)]+)\)/g, (_, val: string) => `Math.log10(${eval(val)})`);

        // Replaces √ with Math.sqrt
        expression = expression.replace(/√\(([^)]+)\)/g, (_, val: string) => `Math.sqrt(${eval(val)})`);

        // Replaces % by /100
        expression = expression.replace(/(\d+)%/g, (_, num: string) => `(${num}/100)`);

        // Evaluates final expressions
        display.value = Function('"use strict"; return (' + expression + ')')().toString();
    } catch (error) {
        display.value = 'Error';
    }
}

function toggleScientific(): void {
    const sciDiv = document.getElementById('scientific') as HTMLDivElement;
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
