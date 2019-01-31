const buttonContainer = document.querySelector('.button-container');
const textDisplay = document.querySelector('.display-text');

Window.onload = createButtons();

let userInput = [];//find a way to move this from the global scope!

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
  const buttonLabels = [['1', 'one'], ['2', 'two'], ['3', 'three'], ['÷', 'divide'], ['4', 'four'], ['5', 'five'], ['6', 'six'], ['x', 'multiply'], ['7', 'seven'], ['8', 'eight'], ['9', 'nine'], ['-', 'subtract'], ['C', 'clear'], ['0', 'zero'], ['.', 'decimal'], ['+', 'add'], ['=', 'equals']];

  for (let i = 0; i < buttonLabels.length; i++) {
    const calcButton = document.createElement('button');

    calcButton.setAttribute('id', 'button-' + buttonLabels[i][1]);
    calcButton.setAttribute('class', 'calc-button');

    calcButton.textContent = buttonLabels[i][0];

    buttonContainer.appendChild(calcButton);
  }
}

buttonContainer.addEventListener('click', (event) => {
  if (event.target === buttonContainer) return;
  captureInput(event.target.textContent);
});

function captureInput(element) {
  if (element === 'C') {
    userInput = [];
  } else {
    userInput.push(element);
  }

  // for (let i = 0; i < userInput.length; i++) {
  //   userInput.push(element);
  // }
  
  populateDisplay(userInput);
}

function populateDisplay(array) {
  let onScreenText = array.join('');

  textDisplay.textContent = onScreenText;
}
