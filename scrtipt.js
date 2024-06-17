document.addEventListener('DOMContentLoaded', function() {
    const output = document.getElementById('output');
    const buttons = document.querySelectorAll('.btn');
    let currentInput = '';

    buttons.forEach(button => {
        button.addEventListener('click', function() {
            const value = this.getAttribute('data-value');

            if (value !== undefined) {
                currentInput += value;
                output.value = currentInput;
            }
        });
    });

    document.getElementById('clear').addEventListener('click', function() {
        currentInput = '';
        output.value = '';
    });

    document.getElementById('delete').addEventListener('click', function() {
        currentInput = currentInput.slice(0, -1);
        output.value = currentInput;
    });

    document.getElementById('equals').addEventListener('click', function() {
        try {
            currentInput = currentInput.replace('^', '**');
            output.value = eval(currentInput);
            currentInput = output.value.toString(); // Convert result to string for further operations
        } catch (e) {
            output.value = 'Error';
            currentInput = '';
        }
    });
});
