document.addEventListener('DOMContentLoaded', function() {
    const output = document.getElementById('output');
    const buttons = document.querySelectorAll('.btn');
    let currentInput = '';
    let isOperatorLast = false;

    buttons.forEach(button => {
        button.addEventListener('click', function() {
            const value = this.getAttribute('data-value');

            if (this.classList.contains('number')) {
                currentInput += value;
                output.value = currentInput;
                isOperatorLast = false;
            } else if (this.classList.contains('operator')) {
                if (!isOperatorLast && currentInput.length > 0) {
                    currentInput += ` ${value} `;
                    output.value = currentInput;
                    isOperatorLast = true;
                }
            } else if (this.classList.contains('function')) {
                if (value === 'sqrt') {
                    currentInput = `Math.sqrt(${currentInput})`;
                } else if (value === 'log') {
                    currentInput = `Math.log10(${currentInput})`;
                } else if (value === 'ln') {
                    currentInput = `Math.log(${currentInput})`;
                } else if (['sin', 'cos', 'tan'].includes(value)) {
                    currentInput = `Math.${value}(${currentInput})`;
                }
                output.value = currentInput;
                isOperatorLast = false;
            } else if (this.id === 'clear') {
                currentInput = '';
                output.value = '';
                isOperatorLast = false;
            } else if (this.id === 'delete') {
                if (currentInput.slice(-1) === ' ') {
                    currentInput = currentInput.slice(0, -3);
                } else {
                    currentInput = currentInput.slice(0, -1);
                }
                output.value = currentInput;
                isOperatorLast = false;
            } else if (this.id === 'equals') {
                try {
                    currentInput = currentInput.replace('^', '**');
                    output.value = eval(currentInput);
                    currentInput = output.value;
                } catch (e) {
                    output.value = 'Error';
                    currentInput = '';
                }
                isOperatorLast = false;
            }
        });
    });
});
