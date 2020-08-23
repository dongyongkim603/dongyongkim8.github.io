/**
 * The Calcualator is defined by the two class variables: currentOperandTextElement and previousOperandTextElement
 * which correlate to the numbers displayed. 
 */
class Calculator {
    constructor(prevDisplay, currentDisplay) {
        this.currentDisplay = currentDisplay;
        this.prevDisplay = prevDisplay;
        this.clear(); // needs to clear the data each time the page is refreshed
    }

    /**
     * clears the class variable data
     */
    clear() {
        this.currentTerm = '';
        this.previousTerm = '';
        this.operator = undefined;
    }

    /**
     * Slices one element from the end of the currentOp string when called
     */
    delete() {
        this.currentTerm = this.currentTerm.toString().slice(0, -1);
    }

    /**
     * appends or concatinates the numbers into a single string will not allow for more than one '.'
     * @param number the int or float of the equation
     */
    appendNumber(number) {
        if (number === '.' && this.currentTerm.includes('.')) {
            return;
        }
        this.currentTerm = this.currentTerm.toString() + number.toString();
    }

    /**
     * checks to make sure the value is not empty and will call the answer function. Then it sets the calculators operator to the 
     * passed in operation, the previousOp to the currentOp and then the currentOp to an empty.
     * @param operation 
     */
    chooseOp(operation) {
        if (this.currentTerm === '') {
            return;
        }
        if (this.previousTerm !== '') {
            this.answer();
        }
        this.operator = operation;
        this.previousTerm = this.currentTerm;
        this.currentTerm = '';
    }

    /**
     * creates local constants from the values of the calculator display and checks to make sure they are numbers
     * it then performs the necessary action on the prev and current constants. It then sets the answers to currentOp clears previousOp
     * and sets the operation to undifined
     */
    answer() {
        let answer;
        const prev = parseFloat(this.previousTerm);
        const current = parseFloat(this.currentTerm);
        if (isNaN(prev) || isNaN(current)) return;

        //createLongCalculation(this.currentTerm, this.previousTerm, this.operator);

        switch (this.operator) {
            case '+':
                answer = prev + current;
                break;
            case '-':
                answer = prev - current;
                break;
            case '*':
                answer = prev * current;
                break;
            case '/':
                answer = prev / current;
                break;
            case '^':
                answer = power(prev, current);
                break;
            default:
                return;
        }
        this.currentTerm = answer;
        this.operator = undefined;
        this.previousTerm = '';

    }

    /**
     * will update the display on the calculator by taking the values of currentOp and placing 
     * it into the calcualtor div. If opperation is not chosen
     * will display current data. if no data is entered display will be updated to blank
     */
    updateDisplay() {
        this.currentDisplay.innerText = this.currentTerm;
        if (this.operator != null) {
            this.prevDisplay.innerText = `${this.previousTerm} ${this.operator}`;
        }
    }
}

//The constant values that represent the numbers, operators, delete, and clr buttons from the calculator display
const numberButtons = document.querySelectorAll('[data-number]');//creates a constant array of all the number buttons
const operationButtons = document.querySelectorAll('[data-operation]');//creates a constant array of all the operator buttons
const equalsButtons = document.querySelector('[data-equals]');//creates a constant array of the equal button
const deleteButton = document.querySelector('[data-delete]');//creates a constant array of the delete button
const allClearButton = document.querySelector('[data-all-clear]');//creates a constant of the clr button
const previousOperandTextElement = document.querySelector('[data-previous-operand]');//creates an empty constant array where prevous numbers will be stored
const currentOperandTextElement = document.querySelector('[data-current-operand]');//creates an empty constant array where the current numbers will be stored

//instansates a calculator object
const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement);

/**
 * adds an event listener that will call the appendNumber function passing in the buttons text and then call the updateDisplay function
 */
numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText);
        calculator.updateDisplay();
    })
})

/**
 * adds an event listener that will call the chooseOp function passing in the buttons text and then call the updateDisplay function
 */
operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOp(button.innerText);
        calculator.updateDisplay();
    })
})

/**
 * adds an event listener that will call the compute function when the '=' is clicked and then call the updateDisplay function
 */
equalsButtons.addEventListener('click', button => {
    calculator.answer();
    calculator.updateDisplay();
    //evaluateLongCalculation();
    eveluate = true;
})

/**
 * adds an event listener that will call the clear function when the 'clr' is clicked and then call the updateDisplay function
 */
allClearButton.addEventListener('click', button => {
    calculator.clear();
    calculator.updateDisplay();
})

/**
 * adds an event listener that will call the delete function when the 'DEL' is clicked and then call the updateDisplay function
 */
deleteButton.addEventListener('click', button => {
    calculator.delete();
    calculator.updateDisplay();
})

//-------------------------------------------------------------------------

let eveluate = false;
let num = [10, 15, 16, -7, 102, 345];
let sum = 0;
let termArray = [];
let element = 0;
let remove = false;
let longTerm = '';

/**
 * sums the elements of an arrays
 */
function sumIntegers(numbers) {

    numbers.array.forEach(element => {
        sum += element;
    });
    return sum;
}

/**
 * Implements a simple power function using a loop
 * @param base the base term of of the power equation
 * @param exponent the exponent of the power equation
 */
function power(base, exponent) {
    let answer = 0;
    for (let x = 0; x < exponent; x++) {
        answer = base * base;
    }
    return answer;
}

/**
 * function not finished does 
 * 
 * puts the elements elements of a two term equation into an array
 * @param current the first term
 * @param prev the second term
 * @param operator the operator
 */
function createLongCalculation(current, prev, operator) {
    longTerm = '';
    longTerm = current + prev;
    let x = 0;
    //console.log(prev);
    //console.log(current);
    //console.log(operator);
    if (longTerm === '.' && this.current.includes('.')) {
        console.log(longTerm);
        return;
    }
    longTerm = current.toString() + operator.toString() + prev.toString();
    while (x < 3) {
        if (x == 0) {
            termArray[element] = current;
        } else if (x == 1) {
            termArray[element] = operator;
        } else if (x == 2) {
            termArray[element] = prev;
        }
        x++;
        element++;
    }
    element = 0;
}

/**
 * not functioning properly
 * 
 * Should take an array of terms and operators and perform proper calcualations.
 * 
 * currently only works for addition and subraction
 */
function evaluateLongCalculation() {
    let leng = termArray.length - 1;
    let count = 0;
    console.log(count);
    let current = 0;
    let prev = 0;
    let answer = 0;
    let first = true;
    let operator = undefined;
    while (leng >= count) {
        console.log(termArray[count]);
        if (first == true) {
            console.log(termArray[count] + " is the current term");
            current = termArray[count];
            console.log(current + " is the current term");
            count++;
            first = false;
        } else if (isNaN(termArray[count])) {
            console.log(termArray[count] + " is the current operator");
            operator = termArray[count];
            console.log(operator + " is the current operator");
            count++;
        }
        else {
            prev = termArray[count];
            console.log(prev + " is the prev term");
            switch (operator) {
                case '+':
                    answer = current + prev;
                    first = true;
                    count++;
                    break;
                case '-':
                    answer = prev - current;
                    first = true;
                    count++;
                    break;
                case '*':
                    answer = current * prev;
                    first = true;
                    count++;
                    break;
                case '/':
                    answer = current / prev;
                    first = true;
                    count++;
                    break;
                case '^':
                    answer = power(current, prev);
                    first = true;
                    count++;
                    break;
                default:
                    console.log("didnt")
                    first = true;
                    count++;
                    return;
            }
        }
        console.log(answer);
    }
    termArray = [];
}