# Calculator Software Website

A modern, interactive calculator web application built with Python Flask. Features a responsive design, calculation history, and keyboard support.

## Features

- **Modern UI**: Beautiful gradient-based design with smooth animations
- **Full Calculator Functionality**: Basic arithmetic operations (+, -, *, /, %)
- **Expression Evaluation**: Display the full expression being entered
- **Calculation History**: Automatically saves last 20 calculations (stored in browser)
- **Keyboard Support**: Use keyboard numbers, operators, and Enter to calculate
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices
- **Safe Evaluation**: Prevents malicious input with regex validation
- **Error Handling**: Graceful error messages for invalid expressions

## Installation

### Prerequisites
- Python 3.8 or higher
- pip (Python package manager)

### Setup Steps

1. **Clone or navigate to the project**
   ```bash
   cd /workspaces/ATM-management-system
   ```

2. **Install dependencies**
   ```bash
   pip install -r requirements.txt
   ```

3. **Run the application**
   ```bash
   python app.py
   ```

4. **Access the calculator**
   - Open your browser and go to: `http://localhost:5000`
   - The calculator will be ready to use!

## Usage

### Using the Calculator

1. **Click buttons** to enter numbers and operations
2. **Press "="** or **Enter key** to calculate
3. **Press "AC"** to clear the display
4. **Press "DEL"** to delete the last character
5. **Click history items** to reuse them

### Keyboard Shortcuts

| Key | Action |
|-----|--------|
| Numbers (0-9) | Enter numbers |
| + - * / | Operators |
| . | Decimal point |
| Enter or = | Calculate |
| Backspace | Delete last character |
| Escape | Clear display |

## Project Structure

```
ATM-management-system/
├── app.py                 # Flask application and backend logic
├── requirements.txt       # Python dependencies
├── README.md             # This file
└── static/
    ├── style.css         # Calculator styling
    └── script.js         # Calculator functionality
└── templates/
    └── calculator.html   # Calculator HTML structure
```

## Features Explained

### Backend (app.py)
- **Flask Server**: Handles HTTP requests and serves the web interface
- **Safe Evaluation**: Uses regex to validate mathematical expressions
- **Error Handling**: Catches and reports calculation errors
- **Division by Zero Protection**: Prevents invalid operations

### Frontend
- **HTML (calculator.html)**: Semantic markup with accessible button layout
- **CSS (style.css)**: Modern gradient design with animations and responsive breakpoints
- **JavaScript (script.js)**: Event handling, API communication, and local history storage

### History Storage
- Calculations are saved in browser's localStorage
- Last 20 items are retained
- Click any history item to use that calculation
- Clear history with the "Clear History" button

## Technologies Used

- **Backend**: Python 3, Flask 3.0
- **Frontend**: HTML5, CSS3, Vanilla JavaScript
- **Storage**: Browser LocalStorage API
- **Styling**: Modern CSS with gradients and animations

## Security Features

- Input validation using regex patterns
- Only allows: numbers, operators (+, -, *, /, %), and parentheses
- Prevents division by zero
- Error messages for invalid expressions
- Safe Python eval() with restricted input

## Browser Compatibility

- Chrome/Chromium 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Troubleshooting

### Port Already in Use
If port 5000 is already in use, modify the port in app.py:
```python
app.run(debug=True, host='0.0.0.0', port=5001)  # Change to any free port
```

### Dependencies Not Installing
```bash
pip install --upgrade pip
pip install -r requirements.txt --force-reinstall
```

### History Not Saving
Check if browser's localStorage is enabled in settings.

## Future Enhancements

- Advanced mathematical functions (sin, cos, log, etc.)
- Temperature and unit converter
- Dark mode toggle
- Export calculation history as CSV
- Scientific calculator mode

## License

Open-source project. Feel free to modify and distribute.

## Author

Created as a demonstration of Python web development with Flask.
