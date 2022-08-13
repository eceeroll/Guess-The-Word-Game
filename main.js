// selecting required dom elements
const inputs = document.querySelector(".inputs");
const resetBtn = document.querySelector(".reset-btn");
const hint_element = document.getElementById("hint");
const typeInput = document.getElementById("type-input");
const guessLeft = document.getElementById("guesses")
const wrongLetters = document.getElementById("wrong-letters");
const alertarea = document.querySelector(".alertarea");

let word; // global variable so we can access from everywhere

// we will keep correct and incorrect letters in a array so user cant enter the same letter again
let corrects = []; // 
let incorrects = [];
let maxGuess; // remaining guesses global variable

const randomWord = () => {
    // getting random object from wordList for creating a random word and hint 
    const randomObject = wordList[Math.floor(Math.random()* wordList.length)];

    word = randomObject.word;
    let hint = randomObject.hint;

    maxGuess = 8;

    corrects = []; 
    incorrects = [];
    guessLeft.innerText = maxGuess;
    wrongLetters.innerText = incorrects;

    let inputHtml = '';

    // creates inputs as many as the word length
    for (let index = 0; index < word.length; index++) {
        inputHtml += `<input type="text" disabled>`     
    }
    inputs.innerHTML = inputHtml;
    hint_element.textContent = hint;

    // console.log("word:", word, "hint:", hint);
}

randomWord();

function inGame(e) {

    let letter = e.target.value;

    // check for is input a letter not a num or symbol
    if(letter.match(/^[A-Za-z]+$/) && !incorrects.includes(` ${letter}`) && !corrects.includes(letter) ) {
        // console.log("letter: ", letter);
        if(word.includes(letter)) {
            // showing matched letter on the input boxes
            for (let i = 0; i < word.length; i++) {              
                if(word[i] === letter) {
                inputs.querySelectorAll("input")[i].value = letter;
                corrects.push(letter);
                }
         }
            
        }
        else {
            maxGuess--; // decrement guesses by 1
            // showAlert('Incorrect', "Wrong Guess")
            incorrects.push(` ${letter}`); // space between them 
            // console.log(maxGuess);
        }
        wrongLetters.innerText = incorrects;    
        guessLeft.innerText = maxGuess;
    }

    typeInput.value = '' // clears the input after user enters a letter

    setTimeout(() => {
        // when user found the all letters 
        if(corrects.length === word.length) {
            alert(`Congrats! You found the word: ${word.toUpperCase()}`)
            randomWord(); // reset game
        }
        // when user doesnt found the word before remaining guesses finished 
        else if ( maxGuess < 1) {
            alert(`Game Over! You don't have any remaining guesses.`)
            for (let i = 0; i < word.length; i++) {              
                inputs.querySelectorAll("input")[i].value = word[i];
         }

        }
    },100);
    
}

// all events : 

// if user clicks the reset button we will create new random game
resetBtn.addEventListener("click", randomWord);

// // creates a random game when page reload or starts
// window.addEventListener("load", randomWord);

// automatically focusing input when user pressed any key on the page 
document.addEventListener("keydown", () => {
    typeInput.focus();
})

typeInput.addEventListener("input", inGame);


setTimeout(function showAlert(type,message)  {
    let alert = `<div class="alert"> ${message} </div>`
    if(type == "Correct") {
        alertarea.style.backgroundColor = "green";
    }
    else if (type == "Incorrect") {
        alertarea.style.backgroundColor = "red";
    }
    alertarea.innerHTML = alert;
}, 2000);







