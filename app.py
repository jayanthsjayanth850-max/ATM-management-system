from flask import Flask, render_template, request, jsonify
import re

app = Flask(__name__)

def safe_eval(expression):
    """Safely evaluate mathematical expressions"""
    try:
        # Remove spaces
        expression = expression.strip()
        
        # Allow only numbers, operators, and parentheses
        if not re.match(r'^[\d+\-*/.()%\s]+$', expression):
            return {'error': 'Invalid input'}
        
        # Prevent division by zero
        if '/0' in expression:
            return {'error': 'Division by zero'}
        
        # Evaluate the expression
        result = eval(expression)
        return {'result': result}
    except ZeroDivisionError:
        return {'error': 'Division by zero'}
    except SyntaxError:
        return {'error': 'Invalid expression'}
    except Exception as e:
        return {'error': f'Error: {str(e)}'}

@app.route('/')
def index():
    """Render the calculator page"""
    return render_template('calculator.html')

@app.route('/calculate', methods=['POST'])
def calculate():
    """Handle calculation requests"""
    data = request.get_json()
    expression = data.get('expression', '')
    result = safe_eval(expression)
    return jsonify(result)

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
