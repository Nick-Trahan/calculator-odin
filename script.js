const buttonContainer = document.querySelector('.button-container');
const textDisplay = document.querySelector('.display-text');
const btnNumbers = document.getElementsByClassName('numbers');
const btnOperators = document.getElementsByClassName('operators');

Window.onload = createButtons();

let userInput = [];//find a way to move this from the global scope!
let output;

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
  const buttonLabels = [
    ['1', 'one', 'numbers'], ['2', 'two', 'numbers'], 
    ['3', 'three', 'numbers'], ['÷', 'divide', 'operators'], 
    ['4', 'four', 'numbers'], ['5', 'five', 'numbers'], 
    ['6', 'six', 'numbers'], ['x', 'multiply', 'operators'], 
    ['7', 'seven', 'numbers'], ['8', 'eight', 'numbers'], 
    ['9', 'nine', 'numbers'], ['-', 'subtract', 'operators'], 
    ['C', 'clear', 'special'], ['0', 'zero', 'numbers'], 
    ['.', 'decimal', 'special'], ['+', 'add', 'operators'], 
    ['=', 'equals', 'operators']
  ];

  for (let i = 0; i < buttonLabels.length; i++) {
    const calcButton = document.createElement('button');

    calcButton.setAttribute('id', 'button-' + buttonLabels[i][1]);
    calcButton.setAttribute('class', 'calc-button ' + buttonLabels[i][2]);

    calcButton.textContent = buttonLabels[i][0];

    buttonContainer.appendChild(calcButton);
  }
}

buttonContainer.addEventListener('click', (event) => {
  if (event.target === buttonContainer) return;
  captureInput(event.target);
});

function captureInput(input) {
  //This allows the 'clear' button to function by simply emptying the userInput array.
  if (input.textContent === 'C') {
    userInput = [];

    //If the first input is an operator (besides 'minus', that will indicate a negative value), disregard the input.
  } else if (
      (userInput.length === 0) && 
      (input.classList[1] === 'operators') && 
      (input.textContent !== '-')
    ) {
    return;

    //This will cause the program to ignore an operator click if the last click was also an operator.
  } else if (
      (userInput.length > 0) && 
      (userInput[userInput.length - 1].classList[1] === 'operators') && 
      (input.classList[1] === 'operators') && 
      (input.textContent !== '-')
    ) {
    return;

  // } else if (
  //     (userInput.length > 1) && 
  //     ((userInput[userInput.length - 1].textContent === '-') &&
  //     (userInput[userInput.length - 2].textContent === '-')) && 
  //     (input.textContent === '-')
  //   ) {
  //   return;

  // } else if (
  //     (userInput.length === 1) && 
  //     (userInput[userInput.length - 1].textContent === '-') && 
  //     (input.textContent === '-')
  // ) {
  // return;

  // } else if (input.textContent === '-') {
  //   if (
  //      (userInput.length === 1) && 
  //      (userInput[userInput.length - 1].textContent === '-')
  //   ) {
  //   return;
  //   } else if (
  //       (userInput.length > 1) && 
  //       (userInput[userInput.length - 1].textContent === '-')
         
  //   ) {

  //   }

  } else {
    userInput.push(input);
  }
  console.log(userInput);

  // don't forget to account for negative values

  validateInput(userInput);
}

function validateInput(array) {
  output = array.map((element) => element.textContent);



  populateDisplay(output);
}

function populateDisplay(array) {
  let onScreenText = array.join('');
  
  textDisplay.textContent = onScreenText;
}
