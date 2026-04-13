let currentExpression = '';
let history = JSON.parse(localStorage.getItem('calcHistory')) || [];

// Initialize history display
function initializeHistory() {
    displayHistory();
}

// Append number to display
function appendNumber(num) {
    currentExpression += num;
    updateDisplay();
}

// Append operator
function appendOperator(op) {
    // Prevent multiple operators in a row
    if (currentExpression === '') return;
    if (['+', '-', '*', '/', '%'].includes(currentExpression.slice(-1))) {
        return;
    }
    currentExpression += op;
    updateDisplay();
}

// Update the display
function updateDisplay() {
    const display = document.getElementById('display');
    const expressionDiv = document.getElementById('expression');
    
    // Show current expression in the expression div
    expressionDiv.textContent = currentExpression || '';
    
    // Show the result in display if it's valid
    if (currentExpression) {
        display.value = currentExpression;
    } else {
        display.value = '0';
    }
}

// Delete last character
function deleteLast() {
    currentExpression = currentExpression.slice(0, -1);
    updateDisplay();
}

// Clear display
function clearDisplay() {
    currentExpression = '';
    updateDisplay();
}

// Calculate result
async function calculate() {
    if (currentExpression === '') return;
    
    try {
        const response = await fetch('/calculate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ expression: currentExpression })
        });
        
        const data = await response.json();
        
        if (data.error) {
            alert('Error: ' + data.error);
            clearDisplay();
        } else {
            const result = data.result;
            const historyEntry = `${currentExpression} = ${result}`;
            
            // Add to history
            history.unshift(historyEntry);
            if (history.length > 20) history.pop();
            localStorage.setItem('calcHistory', JSON.stringify(history));
            
            // Update display
            currentExpression = String(result);
            updateDisplay();
            displayHistory();
        }
    } catch (error) {
        alert('Calculation error: ' + error.message);
        clearDisplay();
    }
}

// Display calculation history
function displayHistory() {
    const historyList = document.getElementById('history-list');
    
    if (history.length === 0) {
        historyList.innerHTML = '<p style="color: #999; text-align: center; padding: 10px;">No history yet</p>';
        return;
    }
    
    historyList.innerHTML = history.map((item, index) => `
        <div class="history-item" onclick="useHistoryItem(${index})">${item}</div>
    `).join('');
}

// Use history item
function useHistoryItem(index) {
    const item = history[index];
    const result = item.split(' = ')[1];
    currentExpression = result;
    updateDisplay();
}

// Clear history
function clearHistory() {
    if (confirm('Clear all calculation history?')) {
        history = [];
        localStorage.setItem('calcHistory', JSON.stringify(history));
        displayHistory();
    }
}

// Keyboard support
document.addEventListener('keydown', function(e) {
    const key = e.key;
    
    if (key >= '0' && key <= '9') {
        appendNumber(key);
    } else if (key === '+' || key === '-' || key === '*' || key === '/') {
        e.preventDefault();
        appendOperator(key);
    } else if (key === '.') {
        appendNumber('.');
    } else if (key === 'Enter' || key === '=') {
        e.preventDefault();
        calculate();
    } else if (key === 'Backspace') {
        e.preventDefault();
        deleteLast();
    } else if (key === 'Escape') {
        clearDisplay();
    }
});

// Initialize on load
window.addEventListener('DOMContentLoaded', initializeHistory);
