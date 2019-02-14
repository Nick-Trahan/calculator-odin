const buttonContainer = document.querySelector('.button-container');
const upperDisplay = document.querySelector('.display-upper');
const lowerDisplay = document.querySelector('.display-lower');

Window.onload = createButtons();

//These are the formulas that will run the calculations=======================//
function add(a, b) {
  return (a + b).toFixed(2);
}

function subtract(a, b) {
  return (a - b).toFixed(2);
}

function multiply(a, b) {
  return (a * b).toFixed(2);
}

function divide(a, b) {
  //If the user attempts to divide by zero, they'll get an error message
  if (b === 0) {
    return 'ಠ_ಠ';

  } else {
    return (a / b).toFixed(2);
  }
}

//This function determines which operation to run based on the given parameters
function operate(array) {
  switch (array[1]) {
    case '+':
      return add(array[0], array[2]);

    case '-':
      return subtract(array[0], array[2]);

    case 'x':
      return multiply(array[0], array[2]);

    case '÷':
      return divide(array[0], array[2]);

    default:
      return 'Sorry, ' + array[1] + ' isn\'t a valid operator';
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
    ['←', 'backspace', 'special'], ['=', 'equals', 'special']
  ];

  for (let i = 0; i < buttonLabels.length; i++) {
    const calcButton = document.createElement('button');

    calcButton.setAttribute('id', 'button-' + buttonLabels[i][1]);
    calcButton.setAttribute('class', 'calc-button ' + buttonLabels[i][2]);

    calcButton.textContent = buttonLabels[i][0];

    buttonContainer.appendChild(calcButton);
  }
}

//These variables will save the users inputs and calculations.
let currentInput = '';
let calculationLog = [];

//Keyboard input support.
window.addEventListener('keydown', (event) => {
  let keyPress = event.key;

  switch (keyPress) {
    case '1':
    case '2':
    case '3':
    case '4':
    case '5':
    case '6':
    case '7':
    case '8':
    case '9':
    case '0':
      parseNumbers(keyPress);
      break;

    case '+':
    case '-':
    case '/':
    case '*':
      if (keyPress === '*') { keyPress = 'x' };
      if (keyPress === '/') { keyPress = '÷' };
      parseOperators(keyPress);
      break;

    case '=':
    case '.':
    case 'Backspace':
    case 'Escape':
    case 'Delete':
    case 'Enter':
      if (keyPress === 'Backspace') { keyPress = '←' };
      if (keyPress === 'Delete') { keyPress = '←' };
      if (keyPress === 'Escape') { keyPress = 'C' };
      if (keyPress === 'Enter') { keyPress = '=' };
      parseSpecial(keyPress);
      break;

    default:
      return;
  }
  populateDisplay(currentInput, calculationLog);
});

buttonContainer.addEventListener('click', (event) => {
  if (event.target === buttonContainer) { return; }
  sortClickTarget(event.target);
});

function sortClickTarget(input) {
  switch (input.classList[1]) {
    case 'numbers':
      parseNumbers(input.textContent);
      break;

    case 'special':
      parseSpecial(input.textContent);
      break;

    case 'operators':
      parseOperators(input.textContent);
      break;
  }
  populateDisplay(currentInput, calculationLog);
}

function parseNumbers(input) {
  if (calculationLog.length === 4) {
    clearDisplay();

    //This is to prevent overflowing the display.
  } else if (currentInput.length > 14) {
    return;
  }
  currentInput += input;
}

function parseSpecial(input) {
  //This allows only one decimal point at a time.
  if (input === '.' && !currentInput.includes('.')) {
    currentInput += input;
  }

  /*
   * This enables the backspace button only while there is input on the screen,
   * and disables it right after a calculation has been performed.
   */
  if (input === '←' && currentInput.length > 0 &&
      calculationLog.length !== 4) {
    currentInput = currentInput.slice(0, -1);
  }

  /*
   * This allows the 'clear' button to function by emptying the
   * currentInput and calculationLog variables.
   */
  if (input === 'C') {
    clearDisplay();
  }
  
  if (input === '=') {
    if (calculationLog.length > 1 && calculationLog.length != 4 &&
        currentInput.length > 0 && currentInput !== '.') {
      calculationLog.splice(2, 0, Number(currentInput), input);
      currentInput = operate(calculationLog);

      //This is to prevent overflowing the display.
      if (currentInput.length > 14) {
        currentInput = 'ERROR :\'(';
      }
    }
  }
}

function parseOperators(input) {
  /**
   * This line prevents the user from operating on a decimal point with no
   * numbers.
   */
  if (currentInput === '.') { return; }

  if (calculationLog.length === 0 && currentInput.length > 0) {
    calculationLog.unshift(Number(currentInput), input);
    currentInput = '';

    /*
     * This block accounts for what happens when a user clicks an
     * operator to begin their next calculation instead of the equals sign.
     */
  } else if (calculationLog.length === 2) {
    if (currentInput.length > 0) {
      calculationLog[2] = Number(currentInput);
      checkForErrors(input);

      /*
       * If the user doesn't input a number beforehand, the program assumes
       * they wanted to change the operator.
       */
    } else {
      calculationLog[1] = input;
    }

    /*
     * This block accounts for when a user clicks an operator after just
     * completing another calculation with the equals sign.
     */
  } else if (calculationLog.length === 4 && currentInput.length > 0) {
    calculationLog.splice(0, 4, Number(currentInput), input);
    currentInput = '';
  }
}

/*
 * This checks the calculation for errors before adding it to the
 * calculationLog array.
 */
function checkForErrors(input) {
  let calc = Number(operate(calculationLog));
  if (isNaN(calc)) {
    currentInput = operate(calculationLog);
  }

  else {
    calculationLog.splice(0, 3, calc, input);
    currentInput = '';
  }
}

function populateDisplay(string, array) {
  let upperDisplayText = array.join(' ');

  upperDisplay.textContent = upperDisplayText;
  lowerDisplay.textContent = string;

  if (isNaN(lowerDisplay.textContent) && lowerDisplay.textContent !== '.') {
    clearDisplay();
  }
  
  keepItTogether();
}

function keepItTogether() {
  if (lowerDisplay.textContent === '80085' ||
      lowerDisplay.textContent === '58008') {
    lowerDisplay.textContent += ' *giggle*';

  } else if (lowerDisplay.textContent === '80085.00' ||
      lowerDisplay.textContent === '58008.00') {
    lowerDisplay.textContent =
      lowerDisplay.textContent.replace('.00', ' *giggle*');
  }
}

function clearDisplay() {
  currentInput = '';
  calculationLog = [];
}
