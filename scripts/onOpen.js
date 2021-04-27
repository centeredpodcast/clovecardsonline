var cardNames = Object.keys(cards) //Get a list of the names of cards.
var eligibleDeckOne = false; //The active deck for player one is automatically not eligible.
var eligibleDeckTwo = false; //Same thing for the player two deck.
//This function loads when the page first loads in and when you click on something that needs to reload the decks/cards!
if(!localStorage.yourCards) {
    //If yourCards isn't in your local storage, set it!
    localStorage.setItem("yourCards", JSON.stringify(yourCards))
} else {
    //If yourCards IS in your local storage
    //if(!first) localStorage.yourCards = JSON.stringify(yourCards)
    //That only applies when you made a change to a deck/card, so update the local storage accordingly! ^^
    //If yourCards is in your storage, update yourCards to what the storage has!
    yourCards = JSON.parse(localStorage.yourCards)
}
let n = 0;
while(n<yourCards.length) { //for every card you have
    if(!cardNames.includes(yourCards[n])) {
        //If that card is not defined, delete it
        yourCards.splice(n, 1)
    } else {
        n++ //otherwise continue
    }
}
localStorage.yourCards = JSON.stringify(yourCards) //Update localStorage.
    
if(!localStorage.activeDeck) {
    //If your active deck isn't in your local storage.
    localStorage.setItem("activeDeck", JSON.stringify(activeDeck))
} else {
    //only applies when you made a change to a deck/card, so update the local storage accordingly!
    //if(!first) localStorage.activeDeck = JSON.stringify(activeDeck)
    //If activeDeck is in your storage, update it to what the storage has.
    activeDeck = JSON.parse(localStorage.activeDeck)
}
if(!localStorage.decks) {
    //if decks isn't in your local storage, set it!
    localStorage.setItem("decks", JSON.stringify(decks))
} else {
    //only applies when you made a change to a deck/card, so update the local storage accordingly!  
    //if(!first) localStorage.decks = JSON.stringify(decks)
    //If decks is in the storage, update it to what the storage has.
    decks = JSON.parse(localStorage.decks) 
}
for(let o in decks) {
    //For every deck
    let p = 0;
    while(p<decks[o].length) { //for every card in a deck
        if(!cardNames.includes(decks[o][p])) {
            decks[o].splice(p, 1) //If the card isn't defined, delete it from the deck.
        } else {
            p++ //otherwise just continue.
        }
    }
}
localStorage.decks = JSON.stringify(decks) //update the localStorage.
if(!localStorage.activeDeckPlayerTwo) { //Check localstorage for activeDeckPlayerTwo
    //If not in localstorage
    if(activeDeck = 1) { //If the active deck is one, then put the active deck for player two as zero.
        activeDeckPlayerTwo = 0
    }
    //If the active deck isn't one, then the player two will be zero.
    //set the activeDeckPlayerTwo in the localstorage.
    localStorage.setItem("activeDeckPlayerTwo", JSON.stringify(activeDeckPlayerTwo))
} else {
    //if you had changed something previously, update the local storage
    //if(!first) localStorage.activeDeckPlayerTwo = JSON.stringify(activeDeckPlayerTwo)
    activeDeckPlayerTwo = JSON.parse(localStorage.activeDeckPlayerTwo)
    //update the variable
}
if(!yourCards[19]) { //If there are less than 20 cards
    yourCards = getRandom(cardNames, 10).concat(getRandom(cardNames, 10))
    //Get 20 random cards for your cards.
    localStorage.yourCards = JSON.stringify(yourCards) //update the local storage.
    decks = [yourCards.slice(0, 10), yourCards.slice(10, 20)] //Update the decks with two decks.
    activeDeck = 0; //The first is active for player one
    activeDeckPlayerTwo = 1; //and the second active for player two.
    localStorage.decks = JSON.stringify(decks) //update local storage
    localStorage.activeDeck = JSON.stringify(activeDeck) //update local storage
    localStorage.activeDeckPlayerTwo = JSON.stringify(activeDeckPlayerTwo) //update local storage
} 
if(decks.length<2) { //if there are less than 2 decks.
    decks = [yourCards.slice(0, 10), yourCards.slice(10, 20)] //set up the decks with 10 cards each
    activeDeck = 0 //the first is active for player one
    activeDeckPlayerTwo = 1 //and the second for player two
}
if(!decks[activeDeck]||!decks[activeDeck][9]||!decks[activeDeckPlayerTwo]||!decks[activeDeckPlayerTwo][9]) {
    //if there is no active deck or if the active deck doesnt have 10 cards:
    decks = [yourCards.slice(0, 10), yourCards.slice(10, 20)] //set up the decks with 10 cards each
    activeDeck = 0 //the first is active for player one
    activeDeckPlayerTwo = 1 //and the second for player two
}

/**
 * Do before anything dynamic section!
 **/
for(l in decks) {
    //Get rid of all null values in decks!
    decks[l]=decks[l].filter(function(el) { return el; })
}
if(decks[activeDeck].length = 10) {
    eligibleDeckOne = true
    //if the active deck for player one has exactly 10 cards, then its eligible to play.
} 
if(decks[activeDeckPlayerTwo].length > 10) {
    eligibleDeckTwo = true
    //if the active deck for player two has exactly 10 cards, then its eligible to play.
} 