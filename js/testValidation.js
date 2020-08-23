//script variables
let element = document.getElementById("form"); //creates DOM object from from element
console.log(element);
let response = document.getElementById("feedback"); //creates a DOM object to be inserted into the page for feedback
let message = "";//the string of feedback

//script constants, the regex patterns for validation
const nameReg = new RegExp(/^[a-z ,.'-]+$/i);
const passwordReg = new RegExp(/(\d+)(-|\/)(\d+)(?:-|\/)(?:(\d+)\s+(\d+):(\d+)(?::(\d+))?(?:\.(\d+))?)?/);
const emailReg = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
const phoneReg = new RegExp(/((\(\d{3}\) ?)|(\d{3}-))?\d{3}-\d{4}/);

//will go through the form element and validate the input when the submit button is entered
if (element.addEventListener) {
    element.addEventListener("submit", main_validator, true);
} else if (response.attachEvent) {
    element.attachEvent("onsubmit", main_validator);
}

/**
 * disables the submit button
 */
function disableSubmit() {
    document.getElementById("submit").disabled = true;
}

/**
 * checks if the checkbox element has been selected
 * @param {the DOM object checkbox} element 
 */
function activateButton(element) {

    if (element.checked) {
        document.getElementById("submit").disabled = false;
    }
    else {
        document.getElementById("submit").disabled = true;
    }
}

/**
 * goes through the form elements and checks the values of the inputs for validation by calling the corresponding functions
 * will create a div with message as the text value as a response if any of the fomats are wrong.
 * @param {The form DOM element} e 
 */
function main_validator(functElement) {
    message = "";
    functElement.preventDefault();
    response.innerHTML = "";
    if (checkName(functElement.target[0].value) && checkName(functElement.target[1].value) && checkEmail(functElement.target[2].value) && checkPhone(functElement.target[4].value)) {
        if (functElement.target[8].value.checked == false) {
            message += "must accept terms";
            let para = document.createElement("p");
            para.classList.add("danger");
            let t = document.createTextNode(message);
            para.appendChild(t);
            response.appendChild(para);
        }
        if (checkPassword(functElement.target[6].value) && checkPassword(functElement.target[7].value) && functElement.target[6].value === functElement.target[7].value) {
            element.submit();
        } else {
            message += "passwords do not match";
            let para = document.createElement("p");
            para.classList.add("danger");
            let t = document.createTextNode(message);
            para.appendChild(t);
            response.appendChild(para);
        }
    }
}

/**
 * takes in a password string and validates the format of the string using regex. Passowrd must be at least 8 in length and contain letter, numbers, and special characters
 * will create a div with message as the text value as a response if the fomat is wrong.
 * @param {the password input} pass 
 */
function checkPassword(pass) {
    message = "";
    if (pass.length < 8) {
        message += "password must be at least 8 characters long ";
        let para = document.createElement("p");
        para.classList.add("danger");
        let t = document.createTextNode(message);
        para.appendChild(t);
        response.appendChild(para);
        return false;
    }
    if (passwordReg.test(pass)) {
        message += "password must contain letters, numbers, and special character";
        return false;
    }
    return true;
}

/**
 * Takes in a name string and validates the format using regex. Names must only contain letters will create a div with message as the text value as a response if the fomat is wrong.
 * @param {The name input} name 
 */
function checkName(name) {
    let someWrong = false;
    message = "";
    if (!nameReg.test(name)) {
        message += "Names can only only contain letters";
        someWrong = true;
    }
    if (someWrong) {
        let para = document.createElement("p");
        para.classList.add("danger");
        let t = document.createTextNode(message);
        para.appendChild(t);
        response.appendChild(para);
        return false;
    }
    return true;
}

/**
 * takes in the email strina nd validates the format using regex. Emails can contain letters, numbers, and characters but must contain the '@' symbol and the '.com' handle
 * will create a div with message as the text value as a response if the fomat is wrong.
 * @param {the Email input} em 
 */
function checkEmail(em) {
    let someWrong = false;
    message = "";
    if (!emailReg.test(em)) {
        message += "Please enter correct email format";
        someWrong = true;
    }
    if (someWrong) {
        let para = document.createElement("p");
        para.classList.add("danger");
        let t = document.createTextNode(message);
        para.appendChild(t);
        response.appendChild(para);
        return false;
    }
    return true;
}

/**
 * takes in a phone number input and validates the format using regex expressions. phone number must be in either '(555) 555-5555' or '555-555-5555' format.
 * will create a div with message as the text value as a response if the fomat is wrong.
 * @param {The phone number input} number 
 */
function checkPhone(number) {
    let someWrong = false;
    message = "";
    if (!phoneReg.test(number)) {
        message += "Please enter phone number correct (555) 555-5555 format";
        someWrong = true;
    }
    if (someWrong) {
        let para = document.createElement("p");
        para.classList.add("danger");
        let t = document.createTextNode(message);
        para.appendChild(t);
        response.appendChild(para);
        return false;
    }
    return true;
}