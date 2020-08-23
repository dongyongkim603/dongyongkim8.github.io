
let fileArray;//array of the whole file
let filteredArray = [];//a file array with no special charactes
let userInput = "";// stores the user input from prompt
let matchingSounds = []; //an array of the matching sounding words
let searchAnswer;//the return value of the initial search
let addPhenome = []; //contains the phase IV add phoneme
let replacePhoneme = []; //contains the phase III replace phoneme
let resetBool = true;

//creates an event listener on the upload file button in HTML
//document.getElementById('fileinput').addEventListener('change', readSingleFile, false);
//
// window.onload = function () {
//     console.log("loaded");
//     loadText();
// }
// //-----------------------page load functions-------------------------

// function loadText() {
//     fetch('../cmudict.txt').then(function (response) {
//         console.log("hello!");
//     })

// }

let dom = window.URL.createObjectURL()

/**
 * Takes in and reads a file from the upload button.
 * @param {The file that is uploaded by the user} uploadedFile 
 */
function readSingleFile(uploadedFile) {
    //Retrieve the first (and only!) File from the FileList object
    let file = uploadedFile.target.files[0];

    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            let contents = e.target.result;
            //console.log("Where the content is: ", contents.split("\n"))
            mainEntry(contents);
        }
        console.log(reader.readAsText(file));
    } else {
        alert("Failed to load file");
    }
}

/**
 * parces through a .txt file and stores each new line in the document as an element
 * in an array
 * @param {*} fileContentLoaded 
 */
function mainEntry(fileContentLoaded) {
    console.log("Where the content is: ", fileContentLoaded.split("\n"))
    fileArray = fileContentLoaded.split("\n");//seperates elements in array at the new line
}

/**
 * takes ling strings seperated by spaces, and creates an object out of the 
 * before string and after string
 * @param {The string of text to be split} line 
 */
function splitOnSpace(line) {
    // reset strings
    let wordLineObjects = {
        before: "",
        after: ""
    }
    // accumulate before space
    let i = 0;
    while (i < line.length && line[i] != " ") { wordLineObjects.before += line[i]; i++; }
    // skip the space
    i++;
    // accumulate after space
    while (i < line.length) { wordLineObjects.after += line[i]; i++; }
    return wordLineObjects;
}

/**
 * initiates the search when cumit button is pressed by prompting user for
 * input
 */
function startSearch() {
    if (resetBool) {
        const letters1 = /^[A-Za-z]+$/;
        while (userInput == 0 || !userInput.match(letters1)) {
            userInput = prompt("Please enter a word").toUpperCase();
        }
        filerArray();
        searchAnswer = searchAllLines(userInput);
        if (searchAnswer != undefined) {
            console.log("searchAnswer" + searchAnswer.before);
            searchAllLinesIdentical(searchAnswer);
            searchAllSimlar(searchAnswer.after);
            searchAllReplace(searchAnswer.after);
            printResults();
            resetBool = false;
        } else {
            console.log(`not found`);
            resetBool = false;
        }
    } else {
        reset();
        startSearch();
        console.log("reset");
    }
}

//---------------------------search functions--------------------------

/**
 * goes through the file string array and checks each line. if a line does not contain
 * any characters other than letters, numbers, whitespaces, or /'/'s, the line will be
 * placed in the filtered array
 * @param {takes an array of strings as an argument} array 
 */
function filerArray() {
    let x = 0;//iterating through fileArray
    let i = 0;//iterates over filteredArray
    const filter = /[^a-z0-9A-Z'\s]/;
    do {
        if (filter.test(fileArray[x]) === false) {
            filteredArray[i] = fileArray[x];
            i++;
            x++;
        } else {
            x++;
        }
    } while (x < fileArray.length); //while (x < fileArray.length);
}

/**
 * iterates through a file array and looks to see if there is a match
 * @param {the string to be search for} searchTerm 
 */
function searchAllLines(searchTerm) {
    let upperSearch = searchTerm;
    let x = 0;
    let anwser;//answer from first search of dictionary
    let element
    while (filteredArray.length > x) {
        element = splitOnSpace(filteredArray[x])
        if (element.before === upperSearch) {
            anwser = splitOnSpace(filteredArray[x]);
            //console.log("test found it!! \n >" + anwser.before + "\n Pronunciation:   " + anwser.after);
            //searchAllLinesPhem(answer.after);
            return anwser;
        } else {
            x++;
            continue;
        }
    }
}

/**
 * searches through an array of strings to find matching terms. Will add the matching
 * word objects to a new array. a match is based off of a match in phenetic spellings
 * @param {takes in a string of phenetic spelling} phen 
 */
function searchAllLinesIdentical(phen) {
    let x = 0;
    let i = 0;
    let localAnswer;
    let after;
    const searchLength = splitOnSpace(phen).after.length;
    while (filteredArray.length > x) {
        after = splitOnSpace(filteredArray[x]).after;
        before = splitOnSpace(filteredArray[x]).before;
        if (after === phen.after && phen.before != before) {
            localAnswer = splitOnSpace(filteredArray[x]);
            matchingSounds[i] = localAnswer;
            i++;
            x++;
        } else {
            x++;
            continue;
        }
    }
}

/**
 * takes in a phoneme and seraches throught the file array to find a match of
 * words that have a similar sound if only one phoneme is replaced
 * @param {a String in the form of a phoneme} phen 
 */
function searchAllSimlar(phen) {
    let x = 0;
    let i = 0;
    let localAnswer;
    let other;
    const search = splitOnSpace(phen).after.trim();
    while (filteredArray.length > x) {
        other = splitOnSpace(filteredArray[x]).after.trim();
        if (stringComparitor(search, other)) {
            localAnswer = splitOnSpace(filteredArray[x]);
            replacePhoneme[i] = localAnswer;
            i++;
            x++;
        } else {
            x++;
        }
    }
}

/**
 * takes in a phoneme and seraches throught the file array to find a match of
 * words that have a similar sound if only one phoneme is added
 * @param {a String in the form of a phoneme} phen 
 */
function searchAllReplace(phen) {
    let x = 0;
    let i = 0;
    let localAnswer;
    let other;
    const searchLength = splitOnSpace(phen).after.trim();
    while (filteredArray.length > x) {
        other = splitOnSpace(filteredArray[x]).after.trim();

        //console.log("other  " + other);
        if (subStringComparitor(phen, other)) {
            localAnswer = splitOnSpace(filteredArray[x]);
            addPhenome[i] = localAnswer;
            i++;
            x++;
        } else {
            x++;
        }
    }
}

//-----------------------search helper functions----------------------

/**
 * takes in two string that are in the form of phonemes and compares them.
 * If they are exact matches return true
 * @param {the first phoneme to be compared agaist} first 
 * @param {the second phoneme to compare with} second 
 */
function stringComparitor(first, second) {
    let differences = 0;
    if (first.length != second.length) {
        return false;
    }
    for (let i = 0; i < first.length; i++) {
        if (first[i] !== second[i]) {
            differences += 1;
        }
    }
    if (differences != 1) {
        return false;
    } else {
        return true;
    }
}

/**
 * takes in two substring arrays and compares them. Compares the elements of each array
 * and if there are more than 1 differences will return a false
 * @param {a substring array to be compared against} first 
 * @param {a substring array to be compared with} second 
 */
function subStringComparitor(first, second) {
    firstTrimmed = first.trim().split(/\s+/);
    secondTrimmed = second.trim().split(/\s+/);
    let differences = 0;
    let x = 0;
    let i = 0;
    let flag = true;
    if ((firstTrimmed.length + 1) != secondTrimmed.length) {
        return false;
    }
    while (flag && x < firstTrimmed.length && i < secondTrimmed.length) {
        if (firstTrimmed[x] !== secondTrimmed[i]) {
            differences++;
            i++;
        } else {
            x++; i++;
        }
        if (differences > 1) {
            flag = false;
        }
    }
    if (!flag) {
        return false;
    } else {
        return true;
    }
}

/**
 * prints the results of the search and its matching phenomes
 */
function printResults() {
    let i = 0;
    let j = 0;
    let k = 0;
    let concatinatedString = "";
    let concatinatedString2 = "";
    let concatinatedString3 = "";
    while (i < matchingSounds.length) {
        concatinatedString += `${matchingSounds[i].before} `;
        i++;
    }
    while (j < replacePhoneme.length) {
        concatinatedString2 += `${replacePhoneme[j].before} `;
        j++;
    }
    while (k < addPhenome.length) {
        concatinatedString3 += `${addPhenome[k].before} `;
        k++;
    }
    console.log(`>${searchAnswer.before} \n \nPronunciation:   ${searchAnswer.after} 
    \n \nIdentical:   ${concatinatedString} \n \nReplace Phoneme:  ${concatinatedString2} \n \nAdd phoneme:  ${concatinatedString3}`);
}

/**
 * resets all the values of the global veriables and is used by the logic in the 
 * startSearch feature to allow for the user to perform multiple seaquential seraches
 */
function reset() {
    userInput = "";// stores the user input from prompt
    matchingSounds = []; //an array of the matching sounding words
    searchAnswer;//the return value of the initial search
    addPhenome = [];//contains the phase IV add phoneme
    replacePhoneme = []; //contains the phase III replace phoneme 
    resetBool = true;
}