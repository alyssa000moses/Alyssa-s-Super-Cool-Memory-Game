//Function that checks if two cards are open
const checkIfTwoCardsAreOpen = function(){
    const listOfCardsWithOpenClass = document.querySelectorAll(".open");
    return (listOfCardsWithOpenClass.length === 2);
}

//Function that checks if two cards match
const handleMatch = function() {
    const listOfCardsWithOpenClass = document.querySelectorAll(".open");
    const firstCard= listOfCardsWithOpenClass[0];
    const secondCard= listOfCardsWithOpenClass[1];
    //if two cards match, change class name to "match"
    if (firstCard.querySelector('i').className === secondCard.querySelector('i').className) {
        firstCard.classList.remove("open");
        firstCard.classList.add("match");//remove open add class match
        secondCard.classList.remove("open");
        secondCard.classList.add("match");
    
    //if two cards don't match, flip over by removing "open" class
    } else {
        firstCard.classList.remove("open");
        secondCard.classList.remove("open");
    }
    //if all cards are matched, make Modal pop up to end game
    const numberofmatches = document.querySelectorAll(".match");
    if (numberofmatches.length === 16) {
        makeModalPopUp();
        timerStopFunction();
        const numberOfStarsLeft = document.querySelector(".stars");
        const modalStars = document.querySelector(".modalStars");
        modalStars.innerHTML = numberOfStarsLeft.innerHTML;
    }


}

//Variable to prevent clicking on an extra card before the two are matched
let matchInProgress = false;

//Move counter
let moveCounter = 0;
const moves = document.querySelector(".moves");

//Define variable to later decrease stars
const starParent = document.getElementById("stars");

//When you click on a card
const cards = document.getElementsByClassName("card");
for (var i= 0; i< cards.length; i++) {
    const singleCard = cards[i];
    singleCard.addEventListener("click", function() {
        const opened = singleCard.classList.contains("open");
        const matched = singleCard.classList.contains("match");
        if (opened || matched || matchInProgress ){
            return;
        }

        matchInProgress = true;
        singleCard.classList.add("open");

         // handle matches
        setTimeout(function () {
            if (checkIfTwoCardsAreOpen()) {
            handleMatch();
            }
            matchInProgress = false;
        } , 800);
        moveCounter ++;
        moves.innerHTML = moveCounter;
        if (moveCounter === 45) {
            const starToLose = starParent.firstElementChild;
            starToLose.remove();
        }
        if (moveCounter === 80) {
            const starToLose = starParent.firstElementChild;
            starToLose.remove();
        }

        
}
    );
}

// Create a list that holds all of the cards
const listOfCards = document.getElementsByClassName('card');

// Turn node list into array
const cardArray = Array.prototype.slice.call(listOfCards);

// A function that shuffles an array
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

//Function that removes old cards
  //Declare variable for Deck
const parentDeck = document.getElementById('deck');
const removeChildren = function (){
    // Remove all children from parent deck
    while (parentDeck.firstchild) {
    parentDeck.removeChild(parentDeck.firstchild);
    }
}

//Function that adds new shuffled cards to DOM
const addChildren = function () {
    //Each array element becomes a new child of deck
    for (var i= 0; i< cardArray.length; i++) {
        parentDeck.appendChild(cardArray[i]);
    }
}

//Timer
let startTime = Date.now();
const timerFunction = function () {
    let timeElapsed = Date.now()- startTime;
    const timerHTML = document.querySelector("#timer");
    let roundedTimeElapsed = Math.round(timeElapsed/1000);
    timerHTML.innerHTML = roundedTimeElapsed + " sec";
    if (roundedTimeElapsed > 60) {
        let minuteSlot = Math.floor(roundedTimeElapsed/60);
        let secondSlot = roundedTimeElapsed % 60;
        timerHTML.innerHTML = minuteSlot + " min " + secondSlot + " sec";
    }
}
let timer = setInterval(timerFunction, 1000);
const timerStopFunction = function () {
    clearInterval(timer);
    //get from the document the innerhtml of the #timer and store in variable to be used in modal
    const timerNewHTML = document.querySelector("#timer");
    const endTime = document.querySelector(".endTime");
    endTime.innerHTML = "Time: " + timerNewHTML.innerHTML;
}


// Call the entire shuffle function when DOM loads
const entireShuffleFunction = function(){
    shuffle(cardArray);
    removeChildren();
    addChildren ();
    for (var i = 0; i< listOfCards.length; i++){
        listOfCards[i].setAttribute("class", "card");
    }
}

document.addEventListener("DOMContentLoaded", entireShuffleFunction);

//Refresh button shuffles cards and resets moves
const refreshButton = document.getElementById("refreshButton");
const refreshFunction = function() {
    location.reload();
}
refreshButton.addEventListener("click", refreshFunction);


//Make Modal appear
const makeModalPopUp = function(){
    const modal = document.getElementById("modal");
    modal.style.display = "block";
}

//Reload game in Modal
const modalRefreshButton = document.querySelector(".modalReload");
const modalReloadPage = function () {
    location.reload();
}
modalRefreshButton.addEventListener("click", modalReloadPage);

//Modal endtime
const endTimeOnModal = document.querySelector(".endTime");
const timerHTML = document.querySelector("#timer");
const timeOntimer = timerHTML.innerHTML;
endTimeOnModal.innerHTML = timeOntimer;
