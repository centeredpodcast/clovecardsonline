var cardNames = Object.keys(cards) //Get a list of the names of cards.
function getStartingDeck(arr, n) {
    let resultingDeck = [];
    let takenCards = [];
    let h = 0;
    let rareCard = false;
    while(h < n) {
        let randomNumber = Math.floor(Math.random() * arr.length)
        if(!resultingDeck.includes(arr[randomNumber])) { //if this card you want to add isn't already added
            if(cards[arr[randomNumber]]["Rarity"] === "Mythical") {
                //continue
            } else if(cards[arr[randomNumber]]["Rarity"] === "Rare") {
                if(rareCard === false) {
                    rareCard = true;
                    resultingDeck.push(arr[randomNumber])
                    h++
                }
            } else {
                resultingDeck.push(arr[randomNumber])
                h++
            }
        }
    }
    return resultingDeck
}
function showDecks(first) {
    if(!first) console.log(decks[activeDeck].length)
    decks=decks.filter(function(el) { return el; })
    var eligibleDeckOne = false; //The active deck for player one is automatically not eligible.
    var eligibleDeckTwo = false; //Same thing for the player two deck.
    //This function loads when the page first loads in and when you click on something that needs to reload the decks/cards!
    if(!localStorage.yourCards) {
        //If yourCards isn't in your local storage, set it!
        localStorage.setItem("yourCards", JSON.stringify(yourCards))
    } else {
        //If yourCards IS in your local storage
        if(!first) localStorage.yourCards = JSON.stringify(yourCards)
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
        if(!first) localStorage.activeDeck = JSON.stringify(activeDeck)
        //If activeDeck is in your storage, update it to what the storage has.
        activeDeck = JSON.parse(localStorage.activeDeck)
    }
    if(!localStorage.decks) {
        //if decks isn't in your local storage, set it!
        localStorage.setItem("decks", JSON.stringify(decks))
    } else {
        //only applies when you made a change to a deck/card, so update the local storage accordingly!  
        if(!first) localStorage.decks = JSON.stringify(decks)
        //If decks is in the storage, update it to what the storage has.
        decks = JSON.parse(localStorage.decks) 
    }
    decks=decks.filter(function(el) { return el; })
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
        if(!first) localStorage.activeDeckPlayerTwo = JSON.stringify(activeDeckPlayerTwo)
        activeDeckPlayerTwo = JSON.parse(localStorage.activeDeckPlayerTwo)
        //update the variable
    }
    if(!yourCards[19]) { //If there are less than 20 cards
        yourCards = getStartingDeck(cardNames, 10).concat(getStartingDeck(cardNames, 10))
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
    localStorage.decks = JSON.stringify(decks) //update local storage
    localStorage.activeDeck = JSON.stringify(activeDeck) //update local storage
    localStorage.activeDeckPlayerTwo = JSON.stringify(activeDeckPlayerTwo) //update local storage
    localStorage.yourCards = JSON.stringify(yourCards); //update local storage
    for(l in decks) {
        //Get rid of all null values in decks!
        decks[l]=decks[l].filter(function(el) { return el; })
    }
    console.log(decks[activeDeck].length)
    if(decks[activeDeck].length === 10) {
        eligibleDeckOne = true
        //if the active deck for player one has exactly 10 cards, then its eligible to play.
    } 
    console.log(decks[activeDeck].length)
    if(decks[activeDeckPlayerTwo].length === 10) {
        eligibleDeckTwo = true
        //if the active deck for player two has exactly 10 cards, then its eligible to play.
    } 
    $("#clear").html('<h2 id="cardsHeader">Cards:</h2><h2 id="decksHeader">Decks:</h2><button id="newDeckButton" style="display: inline;">New Deck!</button><button id="switchActiveDecksButton" style="display: inline;">Switch your active decks!</button><button id="createTenCardDeck">Create a 10 card deck!</button><br /><span id="afterDecks" style="display: none;"></span>') 
    //clear the board and reset it.
    console.log(decks[activeDeck].length)
    /**
     * Show the cards you have!
     **/
    var precount = 1; //this is a precount. It goes up every time you run the for loop.
    let count2 = {};
    //define count2, which counts how many of one card you have.
    yourCards.forEach(e => count2[e] ? count2[e]++ : count2[e] = 1 );
    //count how many of each card you have
    let arrayOfCards = [];
    //define the array that will contain the html displayed in the your cards section.
    for(let i in count2) { //for every unique card,
        if(count2[i]===1) { //If there's one of the card
            //Just push the name of the card and an empty element after.
            arrayOfCards.push("<span class='card'>" + i + "</span><span id='" + precount + "' style='display: none;'></span>")
        }
        if(count2[i]>1) { //If there's more than one of the card
            arrayOfCards.push("<span class='card'>" + i + "</span> x"+count2[i]+"<span id='" + precount + "' style='display: none;'></span>")
            //Push the name of the card, x<however many of the card there are>, and an empty element after.
        }
        precount++ //increment precount.
    }
    //Then, show the cards and split them with a |.
    $("#cardsHeader").after(arrayOfCards.join(" | "))
    console.log(decks[activeDeck].length)
    /**
     * Show each deck you have!
     * Active Deck Functionality!
     * Make a new Deck!
     * Remove a deck!
     **/
    var counter = 1; //this is like another precount just different.
    var otherCount = 1; //lol ^
    
    for(j in decks) { //for every deck
        let countDeck = {};
        //define count2, which counts how many of one card you have.
        decks[j].forEach(e => countDeck[e] ? countDeck[e]++ : countDeck[e] = 1 );
    
        let allDeckCards = []; //an array of every card in the deck
        if(activeDeck == j || activeDeckPlayerTwo == j) {
            $("#afterDecks").before("<h3 id='deck" + j + "' style='display: inline;'>Deck "+counter+"</h3><span class='removeDeckButtonReplacement' style='display: inline;'>You can't delete active decks!</span><span class='youSure' style='display: none;'>Are you sure? <span class='theyChoseYes'>Yes</span> | <span class='theyChoseNo'>No</span></span><div id='deck" + j + "div'></div>") //this sets the titles for each deck.
        } else {
            $("#afterDecks").before("<h3 id='deck" + j + "' style='display: inline;'>Deck "+counter+"</h3><button class='removeDeckButton' style='display: inline;'>Delete Deck</button><span class='youSure' style='display: none;'>Are you sure? <span class='theyChoseYes'>Yes</span> | <span class='theyChoseNo'>No</span></span><div id='deck" + j + "div'></div>") //this sets the titles for each deck.
        }

        for(let q in countDeck) { //for every unique card
            if(countDeck[q]===1) { //if there's one of the card
                //push just an element with the card name
                allDeckCards.push("<span class='cardRemove "+decks[j].lastIndexOf(q)+"'>" + q + "</span><span class='deckCard' style='display: none;'>Remove from deck? <span class='yesChoice'>Yes</span> | <span class='noChoice'>No</span></span>")
            } else if(countDeck[q]>1) {
                //push an element and an x<number of cards>
                allDeckCards.push("<span class='cardRemove "+decks[j].lastIndexOf(q)+"'>" + q + "</span><span class='deckCard' style='display: none;'>Remove from deck? <span class='yesChoice'>Yes</span> | <span class='noChoice'>No</span></span> x"+countDeck[q])
            }
            otherCount++
        }
        $("#deck"+j+"div").append(allDeckCards.join(" | ")) //add the list of cards with |s in between
        counter++ //increment counter.
        
    }
    //Show the decks that are active as active!
    $("#deck"+activeDeck).after($("<span class='activeDeck'> - <i>Active Deck: Player 1</i></span><span class='afterActiveDeck1' style='display: none;'></span>"))
    $("#deck"+activeDeckPlayerTwo).after($("<span class='activeDeckPlayerTwo'> - <i>Active Deck: Player 2</i></span><span class='afterActiveDeck2' style='display: none;'></span>"))
    console.log(decks[activeDeck].length)
    if(decks[activeDeck].length > 10) { //if the active deck for player one has more than 10 cards
        console.log("this should show up")
        $(".afterActiveDeck1")
            .html("<b>This deck has more than 10 cards! You won't be able to play with this deck.</b>")
            .css("display", "inline")
        //Show a message saying it won't be eligible
    } 
    if(decks[activeDeckPlayerTwo].length > 10) { //if the active deck for player two has more than 10 cards
        $(".afterActiveDeck2")
            .html("<b>This deck has more than 10 cards! You won't be able to play with this deck.</b>")
            .css("display", "inline")
        //show a message saying it won't be eligible.
    } 
    for(let m in decks) { //for every deck
        if(m != activeDeck && m != activeDeckPlayerTwo) { //for every deck that isn't active, add a button to make it active.
            if(decks[m].length >= 10) { //if the deck has 10 or more cards, add a button.
                $("#deck"+m).after($("<button class='activeDeckButton' style='display: inline;'>Set as Active Deck for Player One</button><button class='activeDeckButtonPlayerTwo' style='display: inline;'>Set as Active Deck for Player Two</button>"))
            } else { //It has less than 10 cards and is therefore not eligible to be active.
                $("#deck"+m).after($("<span>You can't make a deck that has less than 10 cards active!</span><span style='display: none;'>Hi! This is an easter egg. Uhhh idk what to think of you going through our code like this soooo uh yeah thanks for playing Cove Cards! Wooo! -Sapphire7x 4/26/21</span>"))
            }
        }
    }
    $(".activeDeckButton").click(function(){ //If you click that button to make it active...
        if(decks[$(this).prev().attr("id").replace("deck", "")].length < 10) { //if you clicked on a deck with lss than 10 cards
            $(this).html("You can't make a deck that has less than 10 cards active!")
            //no.
        } else { //otherwise: 
            activeDeck = $(this).prev().attr("id").replace("deck", "") //log it as active!
            showDecks(); //and reshow it so that it will appear as active.
        }
    })
    $(".activeDeckButtonPlayerTwo").click(function(){ //If you click that button to make it active...
        if(decks[$(this).prev().prev().attr("id").replace("deck", "")].length < 10) { //if you clicked on a deck with less than 10 cards
            $(this).html("You can't make a deck that has less than 10 cards active!")
            //nope
        } else {
            activeDeckPlayerTwo = $(this).prev().prev().attr("id").replace("deck", "") //log it as active!
            showDecks(); //and reshow it so that it will appear as active.
        }
    })
    $(".cardRemove").click(function(){ //If you click on a card in a deck
        $(this).next()
            .css("display", "block")
        
        if(decks[$(this).parent().attr('id').replace("deck", "").replace("div", "")].length <= 10 && (activeDeckPlayerTwo == $(this).parent().attr('id').replace("deck", "").replace("div", "") || activeDeckPlayerTwo == $(this).parent().attr('id').replace("deck", "").replace("div", ""))) {
            $(this).next().html("You can't have an active deck with less than 10 cards! | <span class='closeNotice'>Close</span>")
            $(".closeNotice").click(function(){
                showDecks();
            })
        }
        //show the next element, which contains the choice to remove it or not.
        $(".noChoice").click(function(){ //If you clicked no, don't remove it
            showDecks(); //just reshow everything
        }) 
        $(".yesChoice").click(function(){ //If you clicked yes, please remove it
            if($(this).parent().parent().attr('id').replace("deck", "").replace("div", "") == activeDeck || $(this).parent().parent().attr('id').replace("deck", "").replace("div", "") == activeDeckPlayerTwo) {
                //If it's an active deck!
                if(decks[$(this).parent().parent().attr('id').replace("deck", "").replace("div", "")].length <= 10) {
                    //if its less than or actually 10 cards
                    $(this).parent().html("You can't have an active deck with less than 10 cards!")
                    //you cant remove cards from that deck.
                } else {
                    decks[$(this).parent().parent().attr('id').replace("deck", "").replace("div", "")].splice($(this).parent().prev().attr("class").replace("cardRemove", "").replace(" ", ""), 1)
                    //Remove it from the array.
                    showDecks() //Reshow everything so it's removed.
                }
            } else {
                decks[$(this).parent().parent().attr('id').replace("deck", "").replace("div", "")].splice($(this).parent().prev().attr("class").replace("cardRemove", "").replace(" ", ""), 1)
                //Remove it from the array.
                showDecks() //Reshow everything so it's removed.
            }
            
        })
    })
    $("#newDeckButton").click(function(){ //When you clicked the button to make a new mdeck
        decks.push([]) //Add a blank array to decks to signify a blank deck!
        showDecks() //reshow the decks to display this new deck.
    })
    $("#switchActiveDecksButton").click(function(){ //when you click the button to switch the active decks around
        let prevDeck = activeDeck //log what the previous activeDeck is
        activeDeck = activeDeckPlayerTwo //change it to the player two deck
        activeDeckPlayerTwo = prevDeck //change player two deck to what player one deck was
        showDecks() //resohw the decks to display it
    })
    $("#createTenCardDeck").click(function(){
        decks.push(getStartingDeck(yourCards, 10)) //create a new deck with 10 random cards.
        showDecks() //reshow the decks to display it
    })
    $(".removeDeckButton").click(function(){ //When you clicked the button to remove a deck.
        $(this).next().css("display", "block") //show the next element that contains a yes/no confirmation message
        $(".theyChoseYes").click(function(){ //Yes, delete this deck.
            if(decks.length==2) { //If you only have one deck
                $(this).parent().html("You can't delete active decks!")
                //You can't delete your only deck.
            } else { //you have more than one deck so you can delete a deck.
                //Remove that deck from the decks
                console.log($(this).parent().prev().prev().prev().prev().attr("id").replace("deck", ""))
                
                if($(this).parent().prev().prev().prev().attr("class")=="activeDeck") {
                    //if the deck is active, you can't delete it.
                    $(this).parent().html("You can't delete active decks!")
                } else if($(this).parent().prev().prev().prev().attr("class")=="activeDeckPlayerTwo") {
                    //if the deck is active, you can't delete it.
                    $(this).parent().html("You can't delete active decks!")
                } else {
                    //get rid of the deck.
                    decks.splice($(this).parent().prev().prev().prev().prev().attr("id").replace("deck", ""), 1)
                }
                //If you remove a deck below the active deck, update the active deck so it stays with that deck!
                if(($(this).parent().prev().prev().prev().prev().attr("id").replace("deck", "")) < activeDeck) activeDeck--
                if(($(this).parent().prev().prev().prev().prev().attr("id").replace("deck", "")) < activeDeckPlayerTwo) activeDeckPlayerTwo--
                
                showDecks() //reshow it to display.
            }
        })
        $(".theyChoseNo").click(function(){ //No, don't delete it
            showDecks() //reshow it to cancel.
        })
    })

    /**
     * Prepare a string for each deck you have, then display it when you click on a card!
     * Add the card to the deck if they say yes and if you can!
     **/
    var strings = []; //define strings as an array that will contain html.
    //this is for the popup panel that shows when you click on a card to add it to a deck.
    for(k = 0; k < (counter-1); k++) {
        strings.push('<span class = "deckings">Deck ' + (Number(k) + 1) + "</span>")
        //Push a string "Deck x" for each deck.
    }
    $(".card").click(function(){ //When you click on a card...
        $(this).next()
            .css("display", "block")
            .html("Decks: " + strings.join(" | ") + " | <span class='close'>Close</span>")
        //Get the next element and display it. Then have it display all the decks.
        $(".close").click(function(){
            showDecks(); //Close it and do nothing. Just reshow everything.
        })
        $(".deckings").click(function(){ //when you click on a deck to add the card to
            let count1 = {};
            //define count1, which counts how many of one card are in the deck you wish to add it to.
            if($(this).html().startsWith("Deck")) {
                //Count how many of each card are in the deck you asked for
                decks[$(this).html().replace("Deck ", "")-1].forEach(e => count1[e] ? count1[e]++ : count1[e] = 1 );
                //yourCards.forEach(e => count2[e] ? count2[e]++ : count2[e] = 1 );
                
                if(count1[$(this).parent().prev().html()]>=count2[$(this).parent().prev().html()]) {
                    //You don't have enough to add that card to that deck!
                    $(this).html("You don't have enough of this card to add it to that deck!")
                } else{
                    //You can add that card to the deck, so add that card to the deck!
                    decks[$(this).html().replace("Deck ", "")-1].push($(this).parent().prev().html())
                    //Reshow everything!
                    console.log("hello")
                    showDecks()
                }
            } 
        }) 
    })
}
showDecks(true);
//This triggers when the page first loads. This is true so you don't update the localstorage with the preset variables.

$(".testbutton").click(function(){
    addCards(["secondone", "lol", "lol", "what", "name", "Tundra Fox", "lol"])
    showDecks(true);
})