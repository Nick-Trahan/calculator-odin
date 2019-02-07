const buttonContainer = document.querySelector('.button-container');
const upperDisplay = document.querySelector('.display-upper');
const lowerDisplay = document.querySelector('.display-lower');
const btnNumbers = document.getElementsByClassName('numbers');
const btnOperators = document.getElementsByClassName('operators');

Window.onload = createButtons();

//find a way to move these from the global scope
let userInput = '';
let output;
let inputHist = [];

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
    ['.', 'decimal', 'extra-credit'], ['+', 'add', 'operators'],
    ['=', 'equals', 'special']
    /*
    Handling of the decimal point is an extra credit assignment for this
    project. I'll program its logic once the main project is complete. It's
    there as a placeholder for now.
    */
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
  switch (input.classList[1]) {
    case 'numbers':
      if (inputHist.length === 4) {
        clearDisplay();
      }
      userInput += input.textContent;
      break;

    case 'special':
      //This allows the 'clear' button to function by simply emptying the userInput and inputHist variables.
      if (input.textContent === 'C') {
        clearDisplay();

      } else if (input.textContent === '=') {
        if (inputHist.length > 1 && userInput.length > 0) {
          inputHist[2] = Number(userInput);
          inputHist[3] = input.textContent;
          userInput = '';
          userInput = operate(inputHist);
          populateDisplay(userInput, inputHist);
          inputHist[0] = Number(userInput); 

          /* 
          The above line sets the result of the calculation as the first 
          operand. This is to enable the user to quickly perform the next 
          calculation by pressing the desired operator(as opposed to having to 
          start from 0 zero each time.). The user can begin a new calculation
          by inputting a new number.
          */
          console.log(userInput);
        }
        return;
      }
      break;

    case 'operators':
      if (inputHist.length === 0 && userInput.length > 0) {
        inputHist[0] = Number(userInput);
        inputHist[1] = input.textContent;
        userInput = '';
        console.log(inputHist);

      } else if (inputHist.length === 4) {
        inputHist[0] = userInput;
        inputHist[1] = input.textContent;
        inputHist.splice(2, 2);
        userInput = '';
        //   return;

      } else if (input.textContent === '-') {
        break;
      }

    case 'extra-credit':
      break;
  }

  console.log(userInput);

  // don't forget to account for negative values

  populateDisplay(userInput, inputHist);
}

function populateDisplay(string, array) {
  let upperDisplayText = array.join(' ');

  upperDisplay.textContent = upperDisplayText;
  lowerDisplay.textContent = string;
}

function clearDisplay() {
  userInput = '';
  inputHist = [];
}
