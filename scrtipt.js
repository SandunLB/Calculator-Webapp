document.addEventListener('DOMContentLoaded', function() {
    const output = document.getElementById('output');
    const buttons = document.querySelectorAll('.btn');
    let currentInput = '';

    buttons.forEach(button => {
        button.addEventListener('click', function() {
            const value = this.getAttribute('data-value');

            if (this.classList.contains('number')) {
                currentInput += value;
                output.value = currentInput;
            } else if (this.classList.contains('operator')) {
                currentInput += ` ${value} `;
                output.value = currentInput;
            } else if (this.classList.contains('function')) {
                if (value === 'sqrt') {
                    currentInput = `sqrt(${currentInput})`;
                } else if (value === 'log') {
                    currentInput = `log10(${currentInput})`;
                } else if (value === 'ln') {
                    currentInput = `ln(${currentInput})`;
                } else if (['sin', 'cos', 'tan'].includes(value)) {
                    currentInput = `${value}(${currentInput})`;
                }
                output.value = currentInput;
            } else if (this.id === 'clear') {
                currentInput = '';
                output.value = '';
            } else if (this.id === 'delete') {
                currentInput = currentInput.slice(0, -1);
                output.value = currentInput;
            } else if (this.id === 'equals') {
                try {
                    currentInput = currentInput.replace('^', '**')
                        .replace('sqrt', 'Math.sqrt')
                        .replace('log10', 'Math.log10')
                        .replace('ln', 'Math.log')
                        .replace('sin', 'Math.sin')
                        .replace('cos', 'Math.cos')
                        .replace('tan', 'Math.tan');
                    output.value = eval(currentInput);
                    currentInput = output.value;
                } catch (e) {
                    output.value = 'Error';
                    currentInput = '';
                }
            }
        });
    });
});
