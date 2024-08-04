document.addEventListener('DOMContentLoaded', () => {
    const display = document.getElementById('display');
    let currentInput = '';
    let operator = '';
    let previousInput = '';

    const buttons = document.querySelectorAll('.button');
    buttons.forEach(button => {
        button.addEventListener('click', () => {
            if (button.id === 'clear') {
                currentInput = '';
                operator = '';
                previousInput = '';
                display.innerText = '0';
            } else if (button.id === 'backspace') {
                currentInput = currentInput.slice(0, -1);
                display.innerText = currentInput || '0';
            } else if (button.classList.contains('operator')) {
                if (currentInput) {
                    if (operator && previousInput) {
                        previousInput = calculate(previousInput, currentInput, operator);
                        display.innerText = previousInput;
                    } else {
                        previousInput = currentInput;
                    }
                    operator = button.innerText;
                    currentInput = '';
                }
            } else if (button.id === 'equals') {
                if (currentInput && operator && previousInput) {
                    currentInput = calculate(previousInput, currentInput, operator);
                    display.innerText = currentInput;
                    previousInput = '';
                    operator = '';
                }
            } else {
                currentInput += button.innerText;
                display.innerText = currentInput;
            }
        });
    });

    function calculate(a, b, operator) {
        a = parseFloat(a);
        b = parseFloat(b);
        switch (operator) {
            case '+':
                return (a + b).toString();
            case '-':
                return (a - b).toString();
            case '*':
                return (a * b).toString();
            case '/':
                return (a / b).toString();
            default:
                return b.toString();
        }
    }
});
