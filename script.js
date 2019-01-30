const buttonContainer = document.querySelector('.button-container');

Window.onload = createButtons();

//These are the formulas that will run the calculations=======================//
function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  //If the user attempts to divide by zero, they'll get an error message
  if (b === 0) {
    return 'Can\'t divide by zero!!';

  } else {
    return a / b;
  }
}
//============================================================================//

//This function determines which operation to run based on the given parameters
function operate(num1, operator, num2) {
  switch (operator) {
    case '+':
      return add(num1, num2);

    case '-':
      return subtract(num1, num2);

    case '*':
      return multiply(num1, num2);

    case '/':
      return divide(num1, num2);

    default:
      return 'Sorry, ' + operator + ' isn\'t a valid operator';
  }
}

//Generates the calculator buttons============================================//
function createButtons() {
  const buttonLabels = [['1', 'one', 'row1'], ['2', 'two', 'row1'], ['3', 'three', 'row1'], ['4', 'four', 'row1'], ['5', 'five', 'row2'], ['6', 'six', 'row2'], ['7', 'seven', 'row2'], ['8', 'eight', 'row2'], ['9', 'nine', 'row3'], ['C', 'clear', 'row3'], ['0', 'zero', 'row3'], ['.', 'decimal', 'row3'], ['+', 'add', 'row4'], ['-', 'subtract', 'row4'], ['x', 'multiply', 'row4'], ['÷', 'divide', 'row4'], ['=', 'equals', 'row5']];

  for(let i = 0; i < buttonLabels.length; i++) {
    const calcButton = document.createElement('button');

    calcButton.setAttribute('id', 'button-' + buttonLabels[i][1]);
    calcButton.setAttribute('class', 'calc-button ' + buttonLabels[i][2]);
    
    calcButton.textContent = buttonLabels[i][0];

    buttonContainer.appendChild(calcButton);
  }
}
