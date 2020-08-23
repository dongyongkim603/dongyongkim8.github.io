let element = document.getElementById("form");
console.log(element);
let ele = document.getElementById("feedback");

if (element.addEventListener) {
    element.addEventListener("submit", main_validator, true);
} else if (ele.attachEvent) {
    element.attachEvent("onsubmit", main_validator);
}

function main_validator(e) {
    console.log(e);
    e.preventDefault();
    ele.innerHTML = "";
    if (check_username(e.target[0].value) && check_dob(e.target[1].value)) {
        element.submit();
    }
}

function check_username(username) {
    let re = new RegExp(/^[a-zA-Z0-9]+([._]?[a-zA-Z0-9]+)*$/);
    let message = "";
    let someWrong = false;
    let success;
    console.log(re.test(username));

    if (!re.test(username)) {
        message += "Username can only be [a-z], [A-Z], or (-,_)";
        someWrong = true;
    }
    if (username.length > 20) {
        message += "\nUsername must be less than 20 characters";
        someWrong = true;
    }
    if (someWrong) {
        let para = document.createElement("p");
        para.classList.add("danger");
        let t = document.createTextNode(message);
        para.appendChild(t);
        ele.appendChild(para);
        return false;
    }
    success = document.createElement("p");
    message += "success";
    let y = document.createTextNode(message);
    success.appendChild(y);
    ele.appendChild(success);
    success.classList.add("danger");
    return true;
}

function check_dob(dob) {
    //this is one line
    let re = new RegExp(/(\d+)(-|\/)(\d+)(?:-|\/)(?:(\d+)\s+(\d+):(\d+)(?::(\d+))?(?:\.(\d+))?)?/);
    let message = "";
    let someWrong = false;
    if (!re.test(dob)) {
        message += "Your date of birth is not in the right format";
        someWrong = true;
    }
    if (someWrong) {
        // Create a <p> element
        let para = document.createElement("P");
        para.classList.add("danger");
        // Create a text node
        let t = document.createTextNode(message);
        para.appendChild(t);
        ele.appendChild(para);
        return false;
    }
}
