document.addEventListener('DOMContentLoaded', function() {
    const output = document.getElementById('output');
    const history = document.getElementById('history');
    const buttons = document.querySelectorAll('.btn');
    let currentInput = '';
    let previousInput = '';

    buttons.forEach(button => {
        button.addEventListener('click', function() {
            const value = this.getAttribute('data-value');

            if (value !== undefined) {
                if (this.classList.contains('function')) {
                    handleFunction(value);
                } else {
                    currentInput += value;
                    output.value = currentInput;
                }
            }
        });
    });

    document.getElementById('clear').addEventListener('click', function() {
        currentInput = '';
        previousInput = '';
        output.value = '';
        history.innerText = '';
    });

    document.getElementById('delete').addEventListener('click', function() {
        currentInput = currentInput.slice(0, -1);
        output.value = currentInput;
    });

    document.getElementById('equals').addEventListener('click', function() {
        try {
            previousInput = currentInput;
            currentInput = currentInput.replace('^', '**');
            const result = eval(currentInput);
            history.innerText = previousInput + ' = ' + result;
            output.value = result;
            currentInput = result.toString();
        } catch (e) {
            output.value = 'Error';
            currentInput = '';
        }
    });

    function handleFunction(func) {
        try {
            let value = '';
            switch (func) {
                case 'sqrt':
                    value = Math.sqrt(eval(currentInput));
                    break;
                case 'log':
                    value = Math.log10(eval(currentInput));
                    break;
                case 'ln':
                    value = Math.log(eval(currentInput));
                    break;
                case 'sin':
                    value = Math.sin(eval(currentInput));
                    break;
                case 'cos':
                    value = Math.cos(eval(currentInput));
                    break;
                case 'tan':
                    value = Math.tan(eval(currentInput));
                    break;
            }
            history.innerText = func + '(' + currentInput + ') = ' + value;
            output.value = value;
            currentInput = value.toString(); 
        } catch (e) {
            output.value = 'Error';
            currentInput = '';
        }
    }
});
