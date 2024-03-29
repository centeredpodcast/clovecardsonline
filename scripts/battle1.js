
//TODO:
// the #ability<ability number> detection system does not work. How to fix it? Add cardIDabilityAbilityNumber
// ^ change each ability+something into cardid+ability+abilityid for every ability 
//or i can go to the parent element, cardid<card number>abilities and edit the button through there
//no, i think option one is better. <-- done

//a played card disappeared for a moment after using northern tribesman's whirlwind

//create an array for every card
var listOfCards = decks[activeDeck].concat(decks[activeDeckPlayerTwo])
//active player is player one at the beginning
var activePlayer = 1;
// set the turn count variable
var turnCount = 1;
//create a variable that will update when it's time to update the turn.
var updateTurn = false;
// create a variable that will update if you've played a card.
var playedCardYet = false;
// create a board variable with just the decks so far.
var board = {
    player1Deck: decks[activeDeck],
    player1Hand: [],
    player1Played: [],
    player1Discard: [],
    player2Deck: decks[activeDeckPlayerTwo],
    player2Hand: [],
    player2Played: [],
    player2Discard: []
}
//create a shuffle function
function shuffle(array) {
    let currentIndex = array.length; //there are this many cards in the array
    let temporaryValue; //temporary value
    let randomIndex; //random value
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1; //Lower the currentIndex

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }  
    // return the array
    return array;
}
function returnArray(array) { //function to return an array
    return array;
}
function sortCards(array, required) { //sort an array
    array = array.sort() //sort it
    returnArray(array) //return it
    if(required) displayBoard() //if required, then also show the board. <-- change this to show played cards?
}
function shuffleDeck(deckNumber) {
    //Set the deck to the deck but shuffled
    board["player" + deckNumber + "Deck"] = shuffle(board["player" + deckNumber + "Deck"])
}
function changeTurns() { //function to change turns
    $(".active .sortCards").css("display", "none")
    $(".playerNumber.nonactive").html(activePlayer)
    activePlayer = (activePlayer)%2+1 //change the active player to 1/2, the other one.
    $(".playerNumber.active").html(activePlayer);
    //$("#activePlayer").html("It is player " + activePlayer + "'s turn!")
    turnCount++ //update turncount
    if(activePlayer === 2) {
        $("tr.active").css("background", "skyblue")
        $("tr.nonactive").css("background", "#964B00")
    } else {
        $("tr.active").css("background", "#964B00")
        $("tr.nonactive").css("background", "skyblue")
    }
    updateTurn = true; //set update turn to true so effective changes can take place.
    displayBoard(); //display the board again.
}
function drawFromDeck() {
    //nothing -- placeholder.
}
if(!eligibleDeckOne) { //if deck one isn't eligible then display that.
    $("main").html("Deck One isn't eligible to play the game!")
} else if(!eligibleDeckTwo) { //if deck two isn't eligible then display that.
    $("main").html("Deck Two isn't eligible to play the game!")
} else { //if both decks are eligible.
    //change each card in board to ["name", id] 
    for(h in board.player1Deck) {
        board.player1Deck[h] = [board.player1Deck[h], h]
    }
    for(g in board.player2Deck) { //same thing but for player2.
        board.player2Deck[g] = [board.player2Deck[g], Number(g)+10]
    }
    
    var copyOfBoard = JSON.parse(JSON.stringify(board)) //create a copy of the board that doesnt change with it.
    var cardData = {
        card0: [cards[board.player1Deck[0][0]].Health, false],
        card1: [cards[board.player1Deck[1][0]].Health, false],
        card2: [cards[board.player1Deck[2][0]].Health, false],
        card3: [cards[board.player1Deck[3][0]].Health, false],
        card4: [cards[board.player1Deck[4][0]].Health, false],
        card5: [cards[board.player1Deck[5][0]].Health, false],
        card6: [cards[board.player1Deck[6][0]].Health, false],
        card7: [cards[board.player1Deck[7][0]].Health, false],
        card8: [cards[board.player1Deck[8][0]].Health, false],
        card9: [cards[board.player1Deck[9][0]].Health, false],
        card10: [cards[board.player2Deck[0][0]].Health, false],
        card11: [cards[board.player2Deck[1][0]].Health, false],
        card12: [cards[board.player2Deck[2][0]].Health, false],
        card13: [cards[board.player2Deck[3][0]].Health, false],
        card14: [cards[board.player2Deck[4][0]].Health, false],
        card15: [cards[board.player2Deck[5][0]].Health, false],
        card16: [cards[board.player2Deck[6][0]].Health, false],
        card17: [cards[board.player2Deck[7][0]].Health, false],
        card18: [cards[board.player2Deck[8][0]].Health, false],
        card19: [cards[board.player2Deck[9][0]].Health, false]
    } //set card data; each card: health, and whether or not the card was used this turn.

    for(i in cardData) {
        //for every card
        if(Number(i.replace("card", ""))<10) { //if the card id is less than 10
            let newObject = {}; //create a new object
            for(j in cards[board.player1Deck[i.replace("card", "")][0]]["Abilities"]) {
                //for each of the cards abilities
                newObject[Object.values(cards[board.player1Deck[i.replace("card", "")][0]]["Abilities"][j])[0]] = 0;
                //add to new object theabilityid: 0
                //the zero represents how many times the ability was used
            }
            cardData[i].push(newObject) //push it to cardData
            
        } else {
            //same thing but if the card is 10-20
            let newObject = {};
            for(j in cards[board.player2Deck[Number(i.replace("card", ""))-10][0]]["Abilities"]) {
                newObject[Object.values(cards[board.player2Deck[Number(i.replace("card", ""))-10][0]]["Abilities"][j])[0]] = 0;
            }
            cardData[i].push(newObject)
        }
        cardData[i].push(false)
    }
    shuffleDeck(1) //shuffle each of the deccks
    shuffleDeck(2)
    decks = JSON.parse(JSON.stringify(decks)) //decks = decks.
    var playerDecks = { //set a new variable for each deck.
        playerDeck1: decks[activeDeck],
        playerDeck2: decks[activeDeckPlayerTwo]
    }

    //create a variable that will update if you use the kidnap ability
    var restrictCheck = {}
    var protectCheck = {}
    //var reduceCheck = {}
    var randomCheck = {}
    var discardCheck = {}
    
    //split the shuffled deck into a hand and deck, hand with 4 cards each.
    board.player1Hand = board.player1Deck.splice(0, 4)
    board.player2Hand = board.player2Deck.splice(0, 4)
    function debugPanel() {
        /*if($("#boardDebug")) $("#boardDebug").remove()
        $("#board").after($("<div id='boardDebug'></div>"))
        for(i in board) {
            console.log("hi")
            for(j in board[i]) {
                $("#boardDebug").prepend($("<div class='card'><p>" + board[i][j][0] + " ("+board[i][j][1]+"): " + i + "</p></div>"))
            }
        }*/ 
        // no debug panel for now.
    }
    function displayBoard(previousBoard) { //display the board function
        //display none the other sort cards button.
        //console.log(previousBoard)
        //console.log(board)
        var thePreviousBoard = JSON.parse(JSON.stringify(board));
        if(updateTurn) { //if you have to update turn
            for(let d in cardData) {
                cardData[d][3]=false;
                cardData[d][1]=false; //reset every played card thing to false.
            }
            playedCardYet = false; //you have not played a card yet this new turn
            updateTurn = false; //you no longer need to update your turn.
        }
        
        let endTurnChecks = {
            //all the checks to see if an end turn forcibly happens, and then set up if statements to run the change turn function if everything here is true. todo!
        }
        function abilities(cardName, abilityID, cardID) { //function for each ability.
            console.log(cardName)
            console.log(abilityID)
            console.log(cardID)
            function abilityWasUsed() { //if an ability was used
                cardData["card"+cardID][1] = true; //set the marker to true; you did use that ability.
                cardData["card"+cardID][2][abilityID]++ //up the amount of times you've used each card's ability
                //debugPanel()
            }
            function errorMessage(errorMessage, abilityName, abilityButton, override) {
                $(".abilityPopout br, .abilityPopout .abilitiesTitle, .cardID"+cardID+"Abilities .abilityPopout [id^='abilityNumber']:not(#abilityNumber"+abilityID+")").remove()
                $(".cardID"+cardID+"Abilities .abilityPopout .cardHealthTotal").after("<br>")
                if(!override) $(abilityButton).replaceWith($("<span class='errorMessage'>Couldn't use ability " + abilityName + "; " + errorMessage + "</span> <button class='useAnotherAbility'>Exit</button>"))
                if(override) {
                    $(abilityButton).replaceWith($("<span class='errorMessage'>"+override+" " + abilityName + "; " + errorMessage + "</span> <button class='useAnotherAbility'>Exit</button>"))
                    
                }
                $(".useAnotherAbility").click(function() {
                    displayBoard(); // note to myself when redesigning have the cardName be in the cardID table. This way, you can simply have the IDs in the board table (not [name, id]) and you won't have to use arrays of card names to get the name of the card.
                })
            }
            
            function glow(element, static, ineligible) {
                //console.log($(element))
                if(static) {
                    $(element).css({
                        'border': '1px solid transparent',
                        'margin': '0px 9px 0px 9px',
                        'padding': '10px'
                    })
                    $(element).addClass("active")
                    if(ineligible == "restricted") {
                        $(element).addClass("notChosen")
                    }
                } else {
                    $(element).css({
                        //'background-color': '#ccc',
                        'border': '1px solid transparent',
                        '-webkit-transition': 'box-shadow 0.5s linear',
                        '-moz-transition': 'box-shadow 0.5s linear',
                        'transition': 'box-shadow 0.5s linear',
                        'margin': '0px 9px 0px 9px',
                        'padding': '10px'
                    })
                    $(element).hover(function() {
                        //$(this).unbind('hover')
                        //console.log("hello??")
                        $(element).css("cursor", "pointer")
                    }, function() {
                        $(element).css("cursor", "auto")
                    })
                    $(function() {  
                        var glower = $(element);
                        window.setInterval(function() {  
                            //console.log("hello")
                            //console.log(glower)
                            //glower.toggleClass('inactive')
                            glower.toggleClass('active')
                        }, 500);
                    });
                }
                //hotkeys();
            }
            function dealDamage(theCardID, damageInput, heal) {
                let damageOutput = damageInput;
                if(!heal) {
                    if(protectCheck[theCardID] && myIndexOf(Object.keys(protectCheck[theCardID]), String(turnCount)) >= 0) {
                        damageOutput -= protectCheck[theCardID][turnCount][1]
                        damageOutput = damageOutput < 0 ? 0 : damageOutput
                    }
                    damageOutput = cardData["card" + theCardID][0] - damageOutput;
                    damageOutput = damageOutput < 0 ? 0 : damageOutput
                    cardData["card" + theCardID][0] = damageOutput
                } else {
                    
                    cardData["card" + theCardID][0] += damageInput
                    if(cardData["card"+theCardID][0] > cards[listOfCards[theCardID]]["Health"]) {
                        //if it overhealed that card, reset it to max health
                        cardData["card"+theCardID][0] = cards[listOfCards[theCardID]]["Health"]
                    }
                }
            }
            //If ability 0 (Desert Caravan's Barter) was used
            if(Number(abilityID) === 0) { //idk what happened but it put in outlaw instead of the place of 5
                //is it registering twice? should I unbind it and rebind it <- i dont think so
                //its like backwards updating so that when I update it in the future it changes the past????
                //maybe that's just google doing its auto update, but what should that change in the code?
                if(board["player" + nonActivePlayer + "Hand"].length > 0) { //if the other person has cards in their hand
                    //get a random card from their hand
                    let randomCardOfOtherPerson = board["player" + nonActivePlayer + "Hand"][Math.floor(Math.random()*board["player" + nonActivePlayer + "Hand"].length)]
                    console.log(randomCardOfOtherPerson);
                    //get rid of Desert Caravan from your hands
                    let activeBoardCopy = JSON.parse(JSON.stringify(board["player" + activePlayer + "Played"]))
                    let cardIndex = myIndexOf(activeBoardCopy, [cardName, cardID])
                    console.log(cardIndex)
                    // replace the card with the card from the other person
                    board["player" + activePlayer + "Played"][cardIndex] = randomCardOfOtherPerson
                    //get rid of the random card from the other person's hand
                    let inactiveBoardCopy = JSON.parse(JSON.stringify(board["player" + nonActivePlayer + "Hand"]))
                    //console.log(inactiveBoardCopy)
                    let otherPersonCardIndex = myIndexOf(inactiveBoardCopy, randomCardOfOtherPerson)
                    //console.log(otherPersonCardIndex)
                    board["player" + nonActivePlayer + "Hand"].splice(otherPersonCardIndex, 1)
                    //add desert caravan to your discard pile
                    board["player" + activePlayer + "Discard"].push([cardName, cardID])
                    //you used an ability
                    abilityWasUsed()
                    displayBoard() //redisplay the board.
                } else {
                    //you dont have a card to take from the other person!
                    errorMessage("there is not a card to take from the your opponent!", "Barter", "#abilityNumber"+abilityID)
                }
            } else if(Number(abilityID) === 1) { //if ability 1 (Desert Caravan's Roadkill) was used
                //if the other person has played a card
                if(board["player" + nonActivePlayer + "Played"].length > 0) {
                    if($(".inactivePlayerPlayedCards:not(.protected)").length > 0) {
                        let message = "<br><span class='pickMessage'>Pick an opposing card to deal damage to!";
                        message += " <button class='useAnotherAbility'>Exit</button></span>"

                        //let oldAbilityElement = $("#"+cardID+"ability"+abilityID).clone()

                        //#abilityNumber"+abilityID+" .abilityInformation
                        $(".cardID"+cardID+"Abilities .abilityPopout [id^='abilityNumber'], .cardID"+cardID+"Abilities .abilityPopout br, .cardID"+cardID+"Abilities .abilityPopout .abilitiesTitle").remove()
                        $(".errorMessage").remove();
                        $(".cardID"+cardID+"Abilities .abilityPopout").append(message)
                        $("#"+cardID+"ability"+abilityID).remove() //get rid of the button to play this ability
                        $("[id^='abilityNumber']").each(function(index) { // for every use card button
                            $(this).replaceWith($("<b id='"+$(this).attr("id")+"'>"+$(this).html()+":</b>")) // turn it into bold text
                        })
                        
                        //$(".activePlayerPlayedCards [class$='Abilities'] .abilityPopout [id^='abilityNumber'] .useCardButton").
                        //$(".inactivePlayerPlayedCards").css("border", "orange outset 2px") //set an outline for the cards to pick
                        
                        glow(".inactivePlayerPlayedCards:not(.protected)")
                        glow(".inactivePlayerPlayedCards.protected", true)

                        $(".inactivePlayerPlayedCards:not(.protected)").click(function() { //if you click on an opposing card
                            let theCardID = $($(this).children()[0]).attr("class").replace("cardID", "") //get that card's card id
                            let damageToDeal = 2; //you are deailng 2 damage to it
                            dealDamage(theCardID, damageToDeal) //deal the damage
                            abilityWasUsed(); //you used an ability
                            displayBoard(thePreviousBoard); //redisplay the board
                        })

                        $(".inactivePlayerPlayedCards.protected").click(function() {
                            let theCardID = $($(this).children()[0]).attr("class").replace("cardID", "") //get that card's card id
                            let theCardName = $($(this).children()[0]).html()
                            $(".protectMessage").remove();
                            let protectMessage = " <span class='protectMessage'>" + protectCheck[theCardID][turnCount][0] + " protects " + theCardName + ".</span>"
                            $(".cardID"+cardID+"Abilities .abilityPopout").append(protectMessage)
                        })

                        $(".useAnotherAbility").click(function() {
                            displayBoard(); //exit out of the menu/redisplay the board.
                        })
                    } else {
                        errorMessage("your opponent's cards are all protected!", "Roadkill", "#abilityNumber"+abilityID)
                    }
                } else {
                    //there isnt a card to deal damage to!
                    $(".abilityPopout br, .abilityPopout .abilitiesTitle, .cardID"+cardID+"Abilities .abilityPopout [id^='abilityNumber']:not(#abilityNumber"+abilityID+")").remove()
                    $(".cardID"+cardID+"Abilities .abilityPopout .cardHealthTotal").after("<br>")
                    errorMessage("your opponent has not played a card to deal damage to!", "Roadkill", "#abilityNumber"+abilityID)
                }
            } else if(Number(abilityID) === 2) { //if ability 2 (Novice Explorer's Expedition) was used
                //change playedcardyet to false, so you can play one more card!
                if(playedCardYet) {
                    let isTherePlayable = false;
                    for(i in board["player" + activePlayer + "Hand"]) {
                        let theCardID = board["player" + activePlayer + "Hand"][i][1]
                        if(cardData["card" + theCardID][3] === false) {
                            isTherePlayable = true;
                        }
                    }
                    if(isTherePlayable) {
                        playedCardYet = false; //if you use novice explorer multiple times, then should you be allowed to play multiple cards? Or should it be a feature that you have to use the card and then play new cards one at a time?
                        console.log(cardData["card"+cardID][2])
                        if(cardData["card"+cardID][2][abilityID]>0) { //if this card has been used more than once
                            //let a = 0; //define a
                            let indexOfCard = myIndexOf(board["player" + activePlayer + "Played"], [cardName, cardID]);
                            console.log([cardName, cardID])
                            console.log(board["player" + activePlayer + "Played"])
                            console.log(indexOfCard)
                            if(indexOfCard < 0) {
                                console.log("SDF:LKD")
                                indexOfCard = myIndexOf(board["player" + activePlayer + "Played"], [cardName, Number(cardID)]);
                            }
                            board["player" + activePlayer + "Played"].splice(indexOfCard, 1)
                            board["player" + activePlayer + "Discard"].push([cardName, cardID]) //add this card to the discard pile.
                        }
                    
                    
                        abilityWasUsed() //an ability was used
                        displayBoard(thePreviousBoard) //redisplay the board
                    } else {
                        errorMessage("you must have a card to play first!", "Expedition", "#abilityNumber"+abilityID)
                    }
                } else {
                    errorMessage("you must play a card first!", "Expedition", "#abilityNumber"+abilityID)
                }
                //should this not be able to run if there is not another card in your hand?
            } else if(Number(abilityID) === 3) {//if ability 3 (Mooshlett's Spread the Spore) was used
                //if the other person has played a card
                //console.log("hi")
                if(board["player" + nonActivePlayer + "Played"].length > 0) {
                    if($(".inactivePlayerPlayedCards:not(.protected)").length > 0) {
                        let message = "<br><span class='pickMessage'>Pick an opposing card to deal damage to!";
                        message += " <button class='useAnotherAbility'>Exit</button></span>"

                        $(".cardID"+cardID+"Abilities .abilityPopout [id^='abilityNumber'], .cardID"+cardID+"Abilities .abilityPopout br, .cardID"+cardID+"Abilities .abilityPopout .abilitiesTitle").remove()
                        $(".errorMessage").remove();
                        $(".cardID"+cardID+"Abilities .abilityPopout").append(message)
                        $("#"+cardID+"ability"+abilityID).remove() //get rid of the button to play this ability
                        $(".useCardButton").each(function(index) { // for every use card button
                            $(this).replaceWith($("<b>"+$(this).html()+":</b>")) // turn it into bold text
                        })
                        glow(".inactivePlayerPlayedCards:not(.protected)");
                        glow(".inactivePlayerPlayedCards.protected", true)
                        $(".inactivePlayerPlayedCards:not(.protected)").click(function() { //if you click on an opposing card
                            let theCardID = $($(this).children()[0]).attr("class").replace("cardID", "") //get that card's card id
                            let damageToDeal = 2; //you are deailng 2 damage to it
                            dealDamage(theCardID, damageToDeal) //deal the damage
                            //create a copy of mooshlett
                            board["player" + activePlayer + "Hand"].push(["Mooshlett", String(Object.keys(cardData).length)])
                            //create a data entry for it
                            var objectToAdd = {}
                            objectToAdd[abilityID] = 0;
                            cardData["card"+Object.keys(cardData).length] = [cards["Mooshlett"].Health, false, objectToAdd, true]
                            listOfCards.push(cardName)
                            abilityWasUsed(); //you used an ability
                            displayBoard(thePreviousBoard); //redisplay the board
                        })

                        $(".inactivePlayerPlayedCards.protected").click(function() {
                            let theCardID = $($(this).children()[0]).attr("class").replace("cardID", "") //get that card's card id
                            let theCardName = $($(this).children()[0]).html()
                            $(".protectMessage").remove();
                            let protectMessage = " <span class='protectMessage'>" + protectCheck[theCardID][turnCount][0] + " protects " + theCardName + ".</span>"
                            $(".cardID"+cardID+"Abilities .abilityPopout").append(protectMessage)
                        })

                        $(".useAnotherAbility").click(function() {
                            displayBoard(); //exit out of the menu/redisplay the board.
                        })
                    } else {
                        errorMessage("your opponent's cards are all protected!", "Spread the Spore", "#abilityNumber"+abilityID)
                    }
                } else {
                    //there isnt a card to deal damage to!
                    errorMessage("your opponent has not played a card to deal damage to!", "Spread the Spore", "#abilityNumber"+abilityID)
                }
            } else if(Number(abilityID) === 4) { //if ability 4 (Northern Tribesman's Arctic Slash) was used
                //if the other person has played a card
                if(board["player" + nonActivePlayer + "Played"].length > 0) {
                    if($(".inactivePlayerPlayedCards:not(.protected)").length > 0) {
                        let message = "<br><span class='pickMessage'>Pick an opposing card to deal damage to!";
                        message += " <button class='useAnotherAbility'>Exit</button></span>"

                        $(".cardID"+cardID+"Abilities .abilityPopout [id^='abilityNumber'], .cardID"+cardID+"Abilities .abilityPopout br, .cardID"+cardID+"Abilities .abilityPopout .abilitiesTitle").remove()
                        $(".errorMessage").remove();
                        $(".cardID"+cardID+"Abilities .abilityPopout").append(message)
                        $("#"+cardID+"ability"+abilityID).remove() //get rid of the button to play this ability
                        $(".useCardButton").each(function(index) { // for every use card button
                            $(this).replaceWith($("<b>"+$(this).html()+":</b>")) // turn it into bold text
                        })
                        
                        glow(".inactivePlayerPlayedCards:not(.protected)") // Glow the cards to pick of the other person.
                        glow(".inactivePlayerPlayedCards.protected", true)
                        $(".inactivePlayerPlayedCards:not(.protected)").click(function() { //if you click on an opposing card
                            let theCardID = $($(this).children()[0]).attr("class").replace("cardID", "") //get that card's card id
                            let damageToDeal = 3; //you are deailng 3 damage to it
                                //deal the damage
                            dealDamage(theCardID, damageToDeal)
                            abilityWasUsed(); //you used an ability
                            displayBoard(thePreviousBoard); //redisplay the board
                        })

                        $(".inactivePlayerPlayedCards.protected").click(function() {
                            let theCardID = $($(this).children()[0]).attr("class").replace("cardID", "") //get that card's card id
                            let theCardName = $($(this).children()[0]).html()
                            $(".protectMessage").remove();
                            let protectMessage = " <span class='protectMessage'>" + protectCheck[theCardID][turnCount][0] + " protects " + theCardName + ".</span>"
                            $(".cardID"+cardID+"Abilities .abilityPopout").append(protectMessage)
                        })

                        $(".useAnotherAbility").click(function() {
                            displayBoard(); //exit out of the menu/redisplay the board.
                        })
                    } else {
                        errorMessage("your opponent's cards are all protected!", "Arctic Slash", "#abilityNumber"+abilityID)
                    }
                } else {
                    //there isnt a card to deal damage to!
                    errorMessage("your opponent has not played a card to deal damage to!", "Arctic Slash", "#abilityNumber"+abilityID)
                }
            } else if(Number(abilityID) === 5) { //if ability 5 (Northern Tribesman's Whirlwind) was used
                //if the other person has played a card <-- should this be two+ cards in play?
                if(board["player" + nonActivePlayer + "Played"].length >= 2) {
                    if($(".inactivePlayerPlayedCards:not(.protected)").length >= 2) {
                        let message = "<br><span class='pickMessage'>Pick two opposing cards to deal damage to!";
                        message += " <button class='submitWhirlwind' style='display: none;'>Submit</button> <span class='whirlwindNumSelected'></span> <button class='useAnotherAbility'>Exit</button></span>"

                        $(".cardID"+cardID+"Abilities .abilityPopout [id^='abilityNumber'], .cardID"+cardID+"Abilities .abilityPopout br, .cardID"+cardID+"Abilities .abilityPopout .abilitiesTitle").remove()
                        $(".errorMessage").remove();
                        $(".cardID"+cardID+"Abilities .abilityPopout").append(message)
                        $("#"+cardID+"ability"+abilityID).remove() //get rid of the button to play this ability
                        $(".useCardButton").each(function(index) { // for every use card button
                            $(this).replaceWith($("<b>"+$(this).html()+":</b>")) // turn it into bold text
                        })
                        
                        glow(".inactivePlayerPlayedCards:not(.protected)") // Glow the cards to pick of the other person.
                        glow(".inactivePlayerPlayedCards.protected", true)
                        var selectedCards = [];
                        let damageToDeal = 2;
                        $(".inactivePlayerPlayedCards:not(.protected)").click(function() { //if you click on an opposing card
                            let theCardID = $($(this).children()[0]).attr("class").replace("cardID", "") //get that card's card id
                            
                            
                            if($(this).hasClass("selected")) { //if it was selected previously
                                console.log("selected")
                                $(this).removeClass("selected") //unselect it
                                //$(this).html(theCardID) //reset its html
                                //console.log($(".damageCounter"))
                                selectedCards.splice(selectedCards.indexOf(theCardID), 1); //delete it from the list
                                //console.log($(".damageCounter"))
                                console.log(".damageCounter.cardID" + theCardID)
                                $(".damageCounter.cardID" + theCardID).remove();
                                //will this work? because you're indexing splices recursive all that
                            } else {
                                $(this).addClass("selected"); //add selected class
                                selectedCards.push(theCardID); // select it
                                
                                $(this).append("<span class='damageCounter cardID" + theCardID + "'>-"+damageToDeal+"</span>")
                            }

                            if(selectedCards.length === 2) { //if there are two selected cards
                                $(".submitWhirlwind").css("display", "inline") //show the submit button
                                $(".whirlwindNumSelected").html("");
                            } else {
                                $(".submitWhirlwind").css("display", "none") //hide it otherwise
                                if(selectedCards.length > 2) {
                                    $(".whirlwindNumSelected").html("You've selected " + (selectedCards.length - 2) + " card(s) too many!");
                                } else {
                                    $(".whirlwindNumSelected").html("You've selected " + selectedCards.length + " card(s) so far.");
                                }
                            }


                        })

                        $(".inactivePlayerPlayedCards.protected").click(function() {
                            let theCardID = $($(this).children()[0]).attr("class").replace("cardID", "") //get that card's card id
                            let theCardName = $($(this).children()[0]).html()
                            $(".protectMessage").remove();
                            let protectMessage = " <span class='protectMessage'>" + protectCheck[theCardID][turnCount][0] + " protects " + theCardName + ".</span>"
                            $(".cardID"+cardID+"Abilities .abilityPopout").append(protectMessage)
                        })

                        $(".submitWhirlwind").click(function(){
                            for(v of selectedCards) { // for each selected card
                                cardData["card"+v][0] -= damageToDeal; // get rid of 2 damage
                            }
                            
                            cardData["card"+cardID][0] -= 2 //get rid of 2 of your own health.
                            abilityWasUsed()
                            displayBoard(thePreviousBoard)
                            //you have used your ability, and now redisplay everything.
                        })

                        $(".useAnotherAbility").click(function() {
                            displayBoard(); //exit out of the menu/redisplay the board.
                        })
                    } else {
                        errorMessage("your opponent does not have two+ unprotected cards to deal damage to!", "Whirlwind", "#abilityNumber"+abilityID)
                    }
                } else {
                    //there isnt a card to deal damage to!
                    errorMessage("your opponent has not played two+ cards to deal damage to!", "Whirlwind", "#abilityNumber"+abilityID)
                }
            } else if(Number(abilityID) === 6) { //if ability 6 (Mechanic's Tune Up) was used
                //Mechanic (at least at the time of coding this comment in) is the coolest and best card. ;) - Sapphire7x 9/5/21
            
                //if you have played another card
                if(board["player" + activePlayer + "Played"].length > 1) {
                    
                    //tune up is not working. fix
                    let listOfCardsToHeal = []; //start off what you're going to show with a prompt
                    for(let f in board["player" + activePlayer + "Played"]) { //for each of their played cards
                        //console.log(f)
                        if(board["player" + activePlayer + "Played"][f][1] != cardID) { //for every card that isn't this mechanic card
                            //console.log(cardData["card"+board["player" + activePlayer + "Played"][f][1]][0])
                            //console.log(cards[listOfCards[board["player" + activePlayer + "Played"][f][1]]])
                            if(cardData["card"+board["player" + activePlayer + "Played"][f][1]][0]<cards[listOfCards[board["player" + activePlayer + "Played"][f][1]]]["Health"]) {
                                //console.log(false)
                                listOfCardsToHeal.push(board["player" + activePlayer + "Played"][f][1])
                            }
                            //listOfPlayedCards += "<button class='tuneUp tuneUp"+board["player" + activePlayer + "Played"][f][1]+"'>"+ board["player" + activePlayer + "Played"][f][0] + "</button>"
                            //add a button that when clicked you'll heal that card.
                        }
                    }

                    if(JSON.stringify(listOfCardsToHeal)=="[]") { //all your cards are full health
                        //error message
                        //console.log("hello??")
                        errorMessage("the rest of your cards in play are fully healed!", "Tune Up", "#abilityNumber"+abilityID, "Could not use ability")
                    } else {
                        //console.log("dlkf")
                        //console.log(listOfCardsToHeal)
                        for(let e of listOfCardsToHeal) {
                            cardData["card" + e][0]+=1 //heal 1 damage to each card to heal
                            
                        }
                        abilityWasUsed()
                        displayBoard(thePreviousBoard)
                    }

                    //add this list to the page
                } else {
                    //there isnt a card to heal damage to!
                    errorMessage("you have not played another card to heal!", "Tune Up", "#abilityNumber"+abilityID)
                }
            } else if(Number(abilityID) === 7) { //if ability 7 (Mechanic's Passion Project) was used
                //if you have played another card
                if(board["player" + activePlayer + "Played"].length > 1) {
                    let message = "<br><span class='pickMessage'>Pick an ally card to heal!";
                    message += " <button class='useAnotherAbility'>Exit</button></span>"

                    $(".cardID"+cardID+"Abilities .abilityPopout [id^='abilityNumber'], .cardID"+cardID+"Abilities .abilityPopout br, .cardID"+cardID+"Abilities .abilityPopout .abilitiesTitle").remove()
                    $(".errorMessage").remove();
                    $(".cardID"+cardID+"Abilities .abilityPopout").append(message)
                    $("#"+cardID+"ability"+abilityID).remove() //get rid of the button to play this ability
                    $(".useCardButton").each(function(index) { // for every use card button
                        $(this).replaceWith($("<b>"+$(this).html()+":</b>")) // turn it into bold text
                    })
                    //console.log(".activePlayerPlayedCards:not(:has(span.cardID"+cardID+"))")
                    glow(".activePlayerPlayedCards:not(:has(span.cardID"+cardID+"))") // Glow the cards to pick of your person.

                    $(".activePlayerPlayedCards:not(:has(span.cardID"+cardID+"))").click(function() { //if you click on an opposing card
                        console.log($(this))
                        let theCardID = $($(this).children()[0]).attr("class").replace("cardID", "") //get that card's card id
                        let damageToHeal = 3; //you are healing 3 damage to it
                        
                        if(cardData["card"+theCardID][0] < cards[listOfCards[theCardID]]["Health"]) {
                            //if the card is not max health
                            cardData["card" + theCardID][0] += damageToHeal; //heal the damage
                            if(cardData["card"+theCardID][0] > cards[listOfCards[theCardID]]["Health"]) {
                                //if it overhealed that card, reset it to max health
                                cardData["card"+theCardID][0] = cards[listOfCards[theCardID]]["Health"]
                            }
                            abilityWasUsed(); //you used an ability
                            displayBoard(thePreviousBoard); //redisplay the board
                        } else { //the card is at full health
                            //console.log($("#passionProject"+theCardID).length)
                            if($("#passionProject"+theCardID).length == 0) { //if there is no error message for this card already
                                //problem: multiple cards with the same name will display the same error message. Should the error message be in the card itself? Below it? Above it? In it? where.
                                $(".errorMessage").remove();
                                $(".useAnotherAbility").after(" <span class='errorMessage' id='passionProject"+theCardID+"'>Could not heal " + listOfCards[theCardID] + ", it is at full health!</span>")
                            }
                        }
                        
                    })

                    $(".useAnotherAbility").click(function() {
                        displayBoard(); //exit out of the menu/redisplay the board.
                    })
                } else {
                    //there isnt a card to heal damage to!
                    errorMessage("you have not played another card to heal!", "Passion Project", "#abilityNumber"+abilityID)
                }
            } else if(Number(abilityID) === 8) { //if ability 8 (Outlaw's Kidnap) was used
                //if the other person has played a card
                if(board["player" + nonActivePlayer + "Played"].length > 0) {
                    // if no unrestricted cards
                    if($(".inactivePlayerPlayedCards:not(.protected)").length > 0) {
                        if($(".inactivePlayerPlayedCards:not(.restricted)").length > 0) {
                            let message = "<br><span class='pickMessage'>Pick an opposing card to deal damage to and restrict from using abilities!";
                            message += " <button class='useAnotherAbility'>Exit</button></span>"

                            $(".cardID"+cardID+"Abilities .abilityPopout [id^='abilityNumber'], .cardID"+cardID+"Abilities .abilityPopout br, .cardID"+cardID+"Abilities .abilityPopout .abilitiesTitle").remove()
                            $(".errorMessage").remove();
                            $(".cardID"+cardID+"Abilities .abilityPopout").append(message)
                            $("#"+cardID+"ability"+abilityID).remove() //get rid of the button to play this ability
                            $(".useCardButton").each(function(index) { // for every use card button
                                $(this).replaceWith($("<b>"+$(this).html()+":</b>")) // turn it into bold text
                            })

                            glow(".inactivePlayerPlayedCards:not(.protected, .restricted)") // Glow the cards to pick of the other person.
                            glow(".inactivePlayerPlayedCards.protected", true)
                            glow(".inactivePlayerPlayedCards.restricted", true, "restricted")
                            $(".inactivePlayerPlayedCards:not(.protected, .restricted)").click(function() { //if you click on an opposing card
                                let theCardID = $($(this).children()[0]).attr("class").replace("cardID", "") //get that card's card id
                                let damageToDeal = 2; //you are dealing 2 damage to it
                                dealDamage(theCardID, damageToDeal) //deal the damage
                                //restrict the card from using abilities next turn
                                if(!restrictCheck[theCardID]) {
                                    restrictCheck[theCardID] = {};
                                }
                                restrictCheck[theCardID][turnCount + 1] = "Outlaw's Kidnap"
                            
                                console.log(cardData["card"+theCardID][0])
                                abilityWasUsed(); //you used an ability
                                displayBoard(); //redisplay the board
                            })

                            $(".inactivePlayerPlayedCards.protected").click(function() {
                                let theCardID = $($(this).children()[0]).attr("class").replace("cardID", "") //get that card's card id
                                let theCardName = $($(this).children()[0]).html()
                                $(".protectMessage").remove();
                                let protectMessage = " <span class='protectMessage'>" + protectCheck[theCardID][turnCount][0] + " protects " + theCardName + ".</span>"
                                $(".cardID"+cardID+"Abilities .abilityPopout").append(protectMessage)
                            })

                            $(".inactivePlayerPlayedCards.restricted").click(function() {
                                let theCardID = $($(this).children()[0]).attr("class").replace("cardID", "") //get that card's card id
                                let theCardName = $($(this).children()[0]).html()
                                $(".restrictMessage").remove();
                                let restrictMessage = " <span class='restrictMessage'>" + theCardName + " has already been restricted by " + restrictCheck[theCardID][turnCount + 1] + ".</span>"
                                $(".cardID"+cardID+"Abilities .abilityPopout").append(restrictMessage)
                            })

                            $(".useAnotherAbility").click(function() {
                                displayBoard(); //exit out of the menu/redisplay the board.
                            })
                        } else {
                            errorMessage("your opponent does not have an unrestricted card to restrict!", "Kidnap", "#abilityNumber"+abilityID)
                        }
                    } else {
                        errorMessage("your opponent's cards are all protected!", "Kidnap", "#abilityNumber"+abilityID)
                    }
                } else {
                    //there isnt a card to deal damage to!
                    errorMessage("your opponent has not played a card to deal damage to!", "Kidnap", "#abilityNumber"+abilityID)
                }
            } else if(Number(abilityID) === 9) { //if ability 9 (Outlaw's Never Surrender) was used
                //create a new variable containing all the selected cards to deal damage to
                var neverSurrenderSelected = [,,,];   
                //if the other person has played a card
                if(board["player" + nonActivePlayer + "Played"].length > 0) {
                    if($(".inactivePlayerPlayedCards:not(.protected)").length > 0) {
                        let activeDamagePoint = 1;
                        let message = "<br><span class='pickMessage'>Select an Opposing Card to Deal Damage Point <span class='damagePoint'>1</span>:<br>";
                        message += "<span class='damageContext1' style='font-weight: bold;'>Damage Point 1: <span class='damagePoint1'>None</span></span><br> ";
                        message += "<span class='damageContext2'>Damage Point 2: <span class='damagePoint2'>None</span></span><br> ";
                        message += "<span class='damageContext3'>Damage Point 3: <span class='damagePoint3'>None</span></span><br> ";
                        message += "<span class='damageContext4'>Damage Point 4: <span class='damagePoint4'>None</span></span><br> ";
                        message += "Click on another Damage Point to change the card being dealt damage to."
                        message += " <button class='useAnotherAbility'>Exit</button> <button class='submitNeverSurrender' style='display: none;'>Submit</button></span>"

                        $(".cardID"+cardID+"Abilities .abilityPopout [id^='abilityNumber'], .cardID"+cardID+"Abilities .abilityPopout br, .cardID"+cardID+"Abilities .abilityPopout .abilitiesTitle").remove()
                        $(".errorMessage").remove();
                        $(".cardID"+cardID+"Abilities .abilityPopout").append(message)
                        $("#"+cardID+"ability"+abilityID).remove() //get rid of the button to play this ability
                        $(".useCardButton").each(function(index) { // for every use card button
                            $(this).replaceWith($("<b>"+$(this).html()+":</b>")) // turn it into bold text
                        })
                        
                        glow(".inactivePlayerPlayedCards:not(.protected)") // Glow the cards to pick of the other person.
                        glow(".inactivePlayerPlayedCards.protected", true)
                        let damageToDeal = 1;
                        function updateDamagePoint() {
                            
                            $(".damagePoint").html(activeDamagePoint);
                            $("[class^='damageContext']").css("font-weight", "normal");
                            $(".damageContext" + activeDamagePoint).css("font-weight", "bold");
                        }
                        $("[class^='damagePoint']:not(.damagePoint)").click(function() {
                            activeDamagePoint = $(this).attr("class").replace("damagePoint", "");
                            updateDamagePoint();
                        })
                        let occurrences;
                        $(".inactivePlayerPlayedCards:not(.protected)").click(function() { //if you click on an opposing card
                            let theCardID = $($(this).children()[0]).attr("class").replace("cardID", "") //get that card's card id
                            let theCardName = listOfCards[theCardID]
                            neverSurrenderSelected[activeDamagePoint - 1] = theCardID;
                            $(".damageCounter").remove();

                            let nSCopy = neverSurrenderSelected.filter(String)
                            occurrences = nSCopy.reduce(function (acc, curr) {
                                return acc[curr] ? ++acc[curr] : acc[curr] = 1, acc
                            }, {});


                            for(i in occurrences) {
                                if(i != null) {
                                    let thisCardID = i

                                    $("[id^='playedCardNonActive'].cardID" + thisCardID).parent().append("<span class='damageCounter cardID" + thisCardID + "'>-"+occurrences[i]+"</span>")
                                }
                            }

                            $(".damagePoint" + activeDamagePoint).html(theCardName);
                            if(activeDamagePoint != 4 && !neverSurrenderSelected[activeDamagePoint]) {
                                activeDamagePoint++;
                                updateDamagePoint();
                            }
                            if(nSCopy.length === 4) { //if there are two selected cards
                                $(".submitNeverSurrender").css("display", "inline") //show the submit button
                            } else {
                                $(".submitNeverSurrender").css("display", "none") //hide it otherwise
                            }


                        })

                        $(".inactivePlayerPlayedCards.protected").click(function() {
                            let theCardID = $($(this).children()[0]).attr("class").replace("cardID", "") //get that card's card id
                            let theCardName = $($(this).children()[0]).html()
                            $(".protectMessage").remove();
                            let protectMessage = " <span class='protectMessage'>" + protectCheck[theCardID][turnCount][0] + " protects " + theCardName + ".</span>"
                            $(".cardID"+cardID+"Abilities .abilityPopout").append(protectMessage)
                        })

                        $(".submitNeverSurrender").click(function(){
                            /*for(v of neverSurrenderSelected) { // for each selected card
                                cardData["card"+v][0] -= damageToDeal; // get rid of 2 damage
                            }*/
                            for(i in occurrences) {
                                if(i != null) {
                                    let thisCardID = i
                                    dealDamage(thisCardID, occurrences[i])
                                    //$("[id^='playedCardNonActive'].cardID" + thisCardID).parent().append("<span class='damageCounter cardID" + thisCardID + "'>-"+occurrences[i]+"</span>")
                                }
                            }

                            let a = 0;
                            while(a < board["player" + activePlayer + "Played"].length) { //while a in your played cards
                                if(board["player" + activePlayer + "Played"][a][1]===cardID) { //if that is the played card id
                                    board["player" + activePlayer + "Played"].splice(a, 1) //get rid of that card from your played
                                    break; 
                                    //stop the while loop.
                                } else {
                                    a++ //continue...
                                }
                            }
                            board["player" + activePlayer + "Discard"].push([cardName, cardID]); //add it to the discard pile.
                            //cardData["card"+cardID][0] -= 2 //get rid of 2 of your own health.
                            abilityWasUsed()
                            displayBoard(thePreviousBoard)
                            //you have used your ability, and now redisplay everything.
                        })

                        $(".useAnotherAbility").click(function() {
                            displayBoard(); //exit out of the menu/redisplay the board.
                        })
                    } else {
                        errorMessage("your opponent's cards are all protected!", "Never Surrender", "#abilityNumber"+abilityID)
                    }
                } else {
                    //there isnt a card to deal damage to!
                    errorMessage("your opponent has not played a card to deal damage to!", "Never Surrender", "#abilityNumber"+abilityID)
                }
            } else if(Number(abilityID) === 10) { //If ability 10 (Snow Spirit's Snowy Embrace) was used
                if(board["player" + activePlayer + "Played"].length > 1) {
                    if($(".activePlayerPlayedCards:not(:has(span.cardID"+cardID+"), .protected)").length > 0) {
                        let message = "<br><span class='pickMessage'>Pick an ally card to protect!";
                        message += " <button class='useAnotherAbility'>Exit</button></span>"

                        $(".cardID"+cardID+"Abilities .abilityPopout [id^='abilityNumber'], .cardID"+cardID+"Abilities .abilityPopout br, .cardID"+cardID+"Abilities .abilityPopout .abilitiesTitle").remove()
                        $(".errorMessage").remove();
                        $(".cardID"+cardID+"Abilities .abilityPopout").append(message)
                        $("#"+cardID+"ability"+abilityID).remove() //get rid of the button to play this ability
                        $(".useCardButton").each(function(index) { // for every use card button
                            $(this).replaceWith($("<b>"+$(this).html()+":</b>")) // turn it into bold text
                        })
                        //console.log(".activePlayerPlayedCards:not(:has(span.cardID"+cardID+"))")
                        glow(".activePlayerPlayedCards:not(:has(span.cardID"+cardID+"), .protected)") // Glow the cards to pick of the other person.
                        glow(".activePlayerPlayedCards.protected", true)
                        $(".activePlayerPlayedCards:not(:has(span.cardID"+cardID+"), .protected)").click(function() { //if you click on an opposing card
                            let theCardName = $($(this).children()[0]).html()
                            let theCardID = $($(this).children()[0]).attr("class").replace("cardID", "") //get that card's card id
                            //let damageToHeal = 3; //you are healing 3 damage to it
                            if(!protectCheck[theCardID]) {
                                protectCheck[theCardID] = {};
                            }
                            if(protectCheck[theCardID][turnCount + 1] && protectCheck[theCardID][turnCount + 1][1]) {
                                $(".warningMessage").remove();
                                let warningMessage = " <span class='warningMessage'>" + protectCheck[theCardID][turnCount + 1][0] + " already reduces " + theCardName + "'s damage intake by " + protectCheck[theCardID][turnCount + 1][1] 
                                warningMessage+= ". Are you sure you want to protect it from all damage next turn? <button class='submitSnowyEmbrace'>Yes</button></span>"
                                
                                $(".cardID"+cardID+"Abilities .abilityPopout").append(warningMessage)
                                
                                $(".submitSnowyEmbrace").click(function(){
                                    protectCheck[theCardID][turnCount + 1] = ["Snow Spirit's Snowy Embrace", false]
                                    abilityWasUsed();
                                    displayBoard();
                                })
                            } else {
                                protectCheck[theCardID][turnCount + 1] = ["Snow Spirit's Snowy Embrace", false]
                                abilityWasUsed();
                                displayBoard();
                            }
                        })

                        $(".inactivePlayerPlayedCards.protected").click(function() {
                            let theCardID = $($(this).children()[0]).attr("class").replace("cardID", "") //get that card's card id
                            let theCardName = $($(this).children()[0]).html()
                            $(".protectMessage").remove();
                            let protectMessage = " <span class='protectMessage'>" + protectCheck[theCardID][turnCount][0] + " protects " + theCardName + ".</span>"
                            $(".cardID"+cardID+"Abilities .abilityPopout").append(protectMessage)
                        })

                        $(".useAnotherAbility").click(function() {
                            displayBoard(); //exit out of the menu/redisplay the board.
                        })
                    } else {
                        errorMessage("your other cards are all protected!", "Snowy Embrace", "#abilityNumber"+abilityID)
                    }
                    
                } else {
                    //there isnt a card to heal damage to!
                    errorMessage("you have not played another card to protect!", "Snowy Embrace", "#abilityNumber"+abilityID)
                }
            } else if(Number(abilityID) === 11) { //if ability 11 (Snow Spirit's Arctic Fury) was used
                //if the other person has played a card
                if(board["player" + nonActivePlayer + "Played"].length > 0) {
                    if($(".inactivePlayerPlayedCards:not(.protected)").length > 0) {
                        let message = "<br><span class='pickMessage'>Pick an opposing card to deal damage to!";
                        message += " <button class='useAnotherAbility'>Exit</button></span>"

                        $(".cardID"+cardID+"Abilities .abilityPopout [id^='abilityNumber'], .cardID"+cardID+"Abilities .abilityPopout br, .cardID"+cardID+"Abilities .abilityPopout .abilitiesTitle").remove()
                        $(".errorMessage").remove();
                        $(".cardID"+cardID+"Abilities .abilityPopout").append(message)
                        $("#"+cardID+"ability"+abilityID).remove() //get rid of the button to play this ability
                        $(".useCardButton").each(function(index) { // for every use card button
                            $(this).replaceWith($("<b>"+$(this).html()+":</b>")) // turn it into bold text
                        })
                        
                        glow(".inactivePlayerPlayedCards:not(.protected)") // Glow the cards to pick of the other person.
                        glow(".inactivePlayerPlayedCards.protected", true)
                        $(".inactivePlayerPlayedCards:not(.protected)").click(function() { //if you click on an opposing card
                            let theCardID = $($(this).children()[0]).attr("class").replace("cardID", "") //get that card's card id
                            let damageToDeal = 2; //you are deailng 2 damage to it
                            dealDamage(theCardID, damageToDeal) //deal the damage
                            abilityWasUsed(); //you used an ability
                            displayBoard(thePreviousBoard); //redisplay the board
                        })

                        $(".inactivePlayerPlayedCards.protected").click(function() {
                            let theCardID = $($(this).children()[0]).attr("class").replace("cardID", "") //get that card's card id
                            let theCardName = $($(this).children()[0]).html()
                            $(".protectMessage").remove();
                            let protectMessage = " <span class='protectMessage'>" + protectCheck[theCardID][turnCount][0] + " protects " + theCardName + ".</span>"
                            $(".cardID"+cardID+"Abilities .abilityPopout").append(protectMessage)
                        })

                        $(".useAnotherAbility").click(function() {
                            displayBoard(); //exit out of the menu/redisplay the board.
                        })
                    } else {
                        errorMessage("your opponent's cards are all protected!", "Arctic Fury", "#abilityNumber"+abilityID)
                    }
                } else {
                    //there isnt a card to deal damage to!
                    errorMessage("your opponent has not played a card to deal damage to!", "Arctic Fury", "#abilityNumber"+abilityID)
                }
            } else if(Number(abilityID) === 12) { //if ability 12 (Tundra Fox's Leap of Faith) was used
                //if the other person has played a card
                if(board["player" + nonActivePlayer + "Played"].length > 0) {
                    if($(".inactivePlayerPlayedCards:not(.protected)").length > 0) {
                        let message = "<br><span class='pickMessage'>Pick an opposing card for a 50/50 chance to deal damage to!";
                        message += " <button class='useAnotherAbility'>Exit</button></span>"

                        $(".cardID"+cardID+"Abilities .abilityPopout [id^='abilityNumber'], .cardID"+cardID+"Abilities .abilityPopout br, .cardID"+cardID+"Abilities .abilityPopout .abilitiesTitle").remove()
                        $(".errorMessage").remove();
                        $(".cardID"+cardID+"Abilities .abilityPopout").append(message)
                        $("#"+cardID+"ability"+abilityID).remove() //get rid of the button to play this ability
                        $(".useCardButton").each(function(index) { // for every use card button
                            $(this).replaceWith($("<b>"+$(this).html()+":</b>")) // turn it into bold text
                        })
                        
                        glow(".inactivePlayerPlayedCards:not(.protected)") // Glow the cards to pick of the other person.
                        glow(".inactivePlayerPlayedCards.protected", true)
                        $(".inactivePlayerPlayedCards:not(.protected)").click(function() { //if you click on an opposing card
                            let theCardID = $($(this).children()[0]).attr("class").replace("cardID", "") //get that card's card id
                            let theCardName = $($(this).children()[0]).html()
                            let damageToDeal = 2; //you are deailng 2 damage to it
                            if(!randomCheck[cardID]) {
                                randomCheck[cardID] = {};
                            }
                            
                            if(Math.floor(Math.random() * 2) === 1) {
                                dealDamage(theCardID, damageToDeal) //deal the damage
                                randomCheck[cardID][turnCount] = ["Tundra Fox's Leap of Faith", true, damageToDeal, theCardName, "green"]
                            } else {
                                randomCheck[cardID][turnCount] = ["Tundra Fox's Leap of Faith", false, damageToDeal, theCardName, "orange"]
                            }
                            
                            abilityWasUsed(); //you used an ability
                            displayBoard(); //redisplay the board
                        })

                        $(".inactivePlayerPlayedCards.protected").click(function() {
                            let theCardID = $($(this).children()[0]).attr("class").replace("cardID", "") //get that card's card id
                            let theCardName = $($(this).children()[0]).html()
                            $(".protectMessage").remove();
                            let protectMessage = " <span class='protectMessage'>" + protectCheck[theCardID][turnCount][0] + " protects " + theCardName + ".</span>"
                            $(".cardID"+cardID+"Abilities .abilityPopout").append(protectMessage)
                        })

                        $(".useAnotherAbility").click(function() {
                            displayBoard(); //exit out of the menu/redisplay the board.
                        })
                    } else {
                        errorMessage("your opponent's cards are all protected!", "Leap of Faith", "#abilityNumber"+abilityID)
                    }
                } else {
                    //there isnt a card to deal damage to!
                    errorMessage("your opponent has not played a card to deal damage to!", "Leap of Faith", "#abilityNumber"+abilityID)
                }
            } else if(Number(abilityID) === 13) { //If ability 13 (Tundra Fox's Burrow) was used
                if(protectCheck[cardID] && protectCheck[cardID][turnCount + 1] && !protectCheck[cardID][turnCount + 1][1]) {
                    //you're already protected next turn
                    errorMessage(cardName + " is already protected!", "Burrow", "#abilityNumber"+abilityID)
                } else {
                    $(".cardID"+cardID+"Abilities .abilityPopout [id^='abilityNumber'], .cardID"+cardID+"Abilities .abilityPopout br, .cardID"+cardID+"Abilities .abilityPopout .abilitiesTitle").remove()
                    
                    //$(".cardID"+cardID+"Abilities .abilityPopout").append(message)
                    $("#"+cardID+"ability"+abilityID).remove() //get rid of the button to play this ability
                    $(".useCardButton").each(function(index) { // for every use card button
                        $(this).replaceWith($("<b>"+$(this).html()+":</b>")) // turn it into bold text
                    })
                    if(!protectCheck[cardID]) {
                        protectCheck[cardID] = {};
                    }
                    if(protectCheck[cardID][turnCount + 1] && protectCheck[cardID][turnCount + 1][1]) {
                        $(".warningMessage").remove();
                        let warningMessage = " <span class='warningMessage'>" + protectCheck[cardID][turnCount + 1][0] + " already reduces " + cardName + "'s damage intake by " + protectCheck[cardID][turnCount + 1][1] 
                        warningMessage+= ". Are you sure you want to protect it from all damage next turn? <button class='submitSnowyEmbrace'>Yes</button></span>"
                        
                        $(".cardID"+cardID+"Abilities .abilityPopout").append(warningMessage)
                        
                        $(".submitSnowyEmbrace").click(function(){
                            protectCheck[cardID][turnCount + 1] = [cardName + "'s Burrow", false]
                            abilityWasUsed();
                            displayBoard();
                        })
                    } else {
                        protectCheck[cardID][turnCount + 1] = [cardName + "'s Burrow", false]
                        abilityWasUsed();
                        displayBoard();
                    }
                    //protectCheck[cardID][turnCount + 1] = [cardName + "'s Burrow", false]
                    //abilityWasUsed();
                    //displayBoard();  
                }
            } else if(Number(abilityID) === 14) { //if ability 14 (Peace Keeper's Devil's Advocate) was used
                //if the other person has played a card
                if(board["player" + nonActivePlayer + "Played"].length > 0) {
                    if($(".inactivePlayerPlayedCards:not(.protected)").length > 0) {
                        let message = "<br><span class='pickMessage'>Pick an opposing card to deal damage to!";
                        message += " <button class='useAnotherAbility'>Exit</button></span>"

                        $(".cardID"+cardID+"Abilities .abilityPopout [id^='abilityNumber'], .cardID"+cardID+"Abilities .abilityPopout br, .cardID"+cardID+"Abilities .abilityPopout .abilitiesTitle").remove()
                        $(".errorMessage").remove();
                        $(".cardID"+cardID+"Abilities .abilityPopout").append(message)
                        $("#"+cardID+"ability"+abilityID).remove() //get rid of the button to play this ability
                        $(".useCardButton").each(function(index) { // for every use card button
                            $(this).replaceWith($("<b>"+$(this).html()+":</b>")) // turn it into bold text
                        })
                        
                        glow(".inactivePlayerPlayedCards:not(.protected)") // Glow the cards to pick of the other person.
                        glow(".inactivePlayerPlayedCards.protected", true)
                        $(".inactivePlayerPlayedCards:not(.protected)").click(function() { //if you click on an opposing card
                            let theCardID = $($(this).children()[0]).attr("class").replace("cardID", "") //get that card's card id
                            let damageToDeal = 3; //you are deailng 3 damage to it
                            dealDamage(theCardID, damageToDeal) //deal the damage
                            abilityWasUsed(); //you used an ability
                            displayBoard(thePreviousBoard); //redisplay the board
                        })

                        $(".inactivePlayerPlayedCards.protected").click(function() {
                            let theCardID = $($(this).children()[0]).attr("class").replace("cardID", "") //get that card's card id
                            let theCardName = $($(this).children()[0]).html()
                            $(".protectMessage").remove();
                            let protectMessage = " <span class='protectMessage'>" + protectCheck[theCardID][turnCount][0] + " protects " + theCardName + ".</span>"
                            $(".cardID"+cardID+"Abilities .abilityPopout").append(protectMessage)
                        })

                        $(".useAnotherAbility").click(function() {
                            displayBoard(); //exit out of the menu/redisplay the board.
                        })
                    } else {
                        errorMessage("your opponent's cards are all protected!", "Devil's Advocate", "#abilityNumber"+abilityID)
                    }
                } else {
                    //there isnt a card to deal damage to!
                    errorMessage("your opponent has not played a card to deal damage to!", "Devil's Advocate", "#abilityNumber"+abilityID)
                }
            } else if(Number(abilityID) === 15) { //If ability 15 (Peace Keeper's Negotiations) was used
                if(board["player" + activePlayer + "Played"].length > 1) {
                    if($(".activePlayerPlayedCards:not(:has(span.cardID"+cardID+"), .reduced, .protected)").length > 0) {
                        let message = "<br><span class='pickMessage'>Pick an ally card to reduce damage to!";
                        message += " <button class='useAnotherAbility'>Exit</button></span>"

                        $(".cardID"+cardID+"Abilities .abilityPopout [id^='abilityNumber'], .cardID"+cardID+"Abilities .abilityPopout br, .cardID"+cardID+"Abilities .abilityPopout .abilitiesTitle").remove()
                        $(".errorMessage").remove();
                        $(".cardID"+cardID+"Abilities .abilityPopout").append(message)
                        $("#"+cardID+"ability"+abilityID).remove() //get rid of the button to play this ability
                        $(".useCardButton").each(function(index) { // for every use card button
                            $(this).replaceWith($("<b>"+$(this).html()+":</b>")) // turn it into bold text
                        })
                        //console.log(".activePlayerPlayedCards:not(:has(span.cardID"+cardID+"))")
                        glow(".activePlayerPlayedCards:not(:has(span.cardID"+cardID+"), .protected)") // Glow the cards to pick of the other person.
                        glow(".inactivePlayerPlayedCards.protected", true)
                        $(".activePlayerPlayedCards:not(:has(span.cardID"+cardID+"), .protected, .reduced)").off('click').on('click', function() { //if you click on an opposing card
                            console.log($(this))
                            let theCardID = $($(this).children()[0]).attr("class").replace("cardID", "") //get that card's card id
                            //let damageToHeal = 3; //you are healing 3 damage to it
                            if(!protectCheck[theCardID]) {
                                protectCheck[theCardID] = {};
                            }
                            let damageToReduce = 2;
                            protectCheck[theCardID][turnCount + 1] = [cardName + "'s Negotiations", damageToReduce]

                            abilityWasUsed();
                            displayBoard();
                            
                        })

                        $(".activePlayerPlayedCards.protected").click(function() {
                            let theCardID = $($(this).children()[0]).attr("class").replace("cardID", "") //get that card's card id
                            let theCardName = $($(this).children()[0]).html()
                            $(".protectMessage").remove();
                            let protectMessage = " <span class='protectMessage'>" + protectCheck[theCardID][turnCount + 1][0] + " already protects " + theCardName + ".</span>"
                            $(".cardID"+cardID+"Abilities .abilityPopout").append(protectMessage)
                        })
                        $(".activePlayerPlayedCards.reduced").click(function() {
                            let theCardID = $($(this).children()[0]).attr("class").replace("cardID", "") //get that card's card id
                            let theCardName = $($(this).children()[0]).html()
                            $(".reductMessage").remove();
                            let reductMessage = " <span class='reductMessage'>" + protectCheck[theCardID][turnCount + 1][0] + " already reduces " + theCardName + "'s damage by " + protectCheck[theCardID][turnCount + 1][1] + ".</span>"
                            $(".cardID"+cardID+"Abilities .abilityPopout").append(reductMessage)
                        })

                        $(".useAnotherAbility").click(function() {
                            displayBoard(); //exit out of the menu/redisplay the board.
                        })
                    } else {
                        errorMessage("your other cards are all protected!", "Negotiations", "#abilityNumber"+abilityID)
                    }
                    
                } else {
                    //there isnt a card to heal damage to!
                    errorMessage("you have not played another card to protect!", "Negotiations", "#abilityNumber"+abilityID)
                }
            } else if(Number(abilityID) === 16) { //If ability 16 (Street Thief's One with the Shadows) was used
                if(protectCheck[cardID] && protectCheck[cardID][turnCount + 1] && !protectCheck[cardID][turnCount + 1][1]) {
                    //you're already protected next turn
                    errorMessage(cardName + " is already protected!", "One with the Shadows", "#abilityNumber"+abilityID)
                } else {
                    $(".cardID"+cardID+"Abilities .abilityPopout [id^='abilityNumber'], .cardID"+cardID+"Abilities .abilityPopout br, .cardID"+cardID+"Abilities .abilityPopout .abilitiesTitle").remove()
                    
                    //$(".cardID"+cardID+"Abilities .abilityPopout").append(message)
                    $("#"+cardID+"ability"+abilityID).remove() //get rid of the button to play this ability
                    $(".useCardButton").each(function(index) { // for every use card button
                        $(this).replaceWith($("<b>"+$(this).html()+":</b>")) // turn it into bold text
                    })
                    if(!protectCheck[cardID]) {
                        protectCheck[cardID] = {};
                    }
                    let damageToHeal = 1;
                    if(protectCheck[cardID][turnCount + 1] && protectCheck[cardID][turnCount + 1][1]) {
                        $(".warningMessage").remove();
                        let warningMessage = " <span class='warningMessage'>" + protectCheck[cardID][turnCount + 1][0] + " already reduces " + cardName + "'s damage intake by " + protectCheck[cardID][turnCount + 1][1] 
                        warningMessage+= ". Are you sure you want to protect it from all damage next turn? <button class='submitShadows'>Yes</button></span>"
                        
                        $(".cardID"+cardID+"Abilities .abilityPopout").append(warningMessage)
                        //let damageToHeal = 1;
                        $(".submitShadows").click(function(){
                            protectCheck[cardID][turnCount + 1] = [cardName + "'s One with the Shadows", false]
                            dealDamage(cardID, damageToHeal, true)
                            abilityWasUsed();
                            displayBoard();
                        })
                    } else {
                        protectCheck[cardID][turnCount + 1] = [cardName + "'s One with the Shadows", false]
                        dealDamage(cardID, damageToHeal, true)
                        abilityWasUsed();
                        displayBoard();
                    }
                    //protectCheck[cardID][turnCount + 1] = [cardName + "'s Burrow", false]
                    //abilityWasUsed();
                    //displayBoard();  
                }
            } else if(Number(abilityID) === 17) { //if ability 17 (Street Thief's Hijack) was used
                //if the other person has played a card
                if(board["player" + nonActivePlayer + "Played"].length > 0) {
                    if($(".inactivePlayerPlayedCards:not(.protected)").length > 0) {
                        let message = "<br><span class='pickMessage'>Pick an opposing card to hijack!";
                        message += " <button class='useAnotherAbility'>Exit</button></span>"

                        //let oldAbilityElement = $("#"+cardID+"ability"+abilityID).clone()

                        //#abilityNumber"+abilityID+" .abilityInformation
                        $(".cardID"+cardID+"Abilities .abilityPopout [id^='abilityNumber'], .cardID"+cardID+"Abilities .abilityPopout br, .cardID"+cardID+"Abilities .abilityPopout .abilitiesTitle").remove()
                        $(".errorMessage").remove();
                        $(".cardID"+cardID+"Abilities .abilityPopout").append(message)
                        $("#"+cardID+"ability"+abilityID).remove() //get rid of the button to play this ability
                        $("[id^='abilityNumber']").each(function(index) { // for every use card button
                            $(this).replaceWith($("<b id='"+$(this).attr("id")+"'>"+$(this).html()+":</b>")) // turn it into bold text
                        })
                        
                        //$(".activePlayerPlayedCards [class$='Abilities'] .abilityPopout [id^='abilityNumber'] .useCardButton").
                        //$(".inactivePlayerPlayedCards").css("border", "orange outset 2px") //set an outline for the cards to pick
                        
                        glow(".inactivePlayerPlayedCards:not(.protected)")
                        glow(".inactivePlayerPlayedCards.protected", true)

                        $(document).off().on('click', ".useCardButton[id^='hijacked']", function() {
                            console.log("what?")
                            let theAbilityID = $(this).attr("id").replace("hijacked", "");
                            let theCardName = $(this).attr("cardName"); //fill this in 
                            let theCardID = $(this).attr("cardID");
                            $(".inactivePlayerPlayedCards:not(.protected)").unbind('click')
                            abilityWasUsed();
                            // get rid of abilityWasUsed, this should be earlier.
                            abilities(theCardName, theAbilityID, theCardID);
                            
                            
                        })

                        $(".inactivePlayerPlayedCards:not(.protected)").off().on('click', function() { //if you click on an opposing card
                            $(this).unbind('click')
                            //$(this).stopPropagation();
                            //stopGlow(".inactivePlayerPlayedCards:not(.protected)")
                            //stopGlow(".inactivePlayerPlayedCards.protected")
                            let theCardID = $($(this).children()[0]).attr("class").replace("cardID", "") //get that card's card id
                            let theCardName = $($(this).children()[0]).html()
                            $(".hijackMessage").remove();
                            let hijackMessage = " <span class='hijackMessage'>" + theCardName + "'s Abilities:<br>"
                            
                            for(j in cards[theCardName]["Abilities"]) {
                                let theAbilityIDs = Object.values(cards[theCardName]["Abilities"][j])[0]
                                
                                hijackMessage+= " <span id='abilityNumber"+theAbilityIDs+"'>"

                                hijackMessage+= "<button class='useCardButton' cardID='"+theCardID+"' cardName='"+ theCardName +"' id='hijacked"+theAbilityIDs+"'>"+Object.keys(cards[theCardName]["Abilities"][j])[1]+"</button>"
                            
                            
                                hijackMessage+= " <span class='abilityInformation'>" + Object.values(cards[theCardName]["Abilities"][j])[1] + "</span><span class='abilityUsage'> - Used "
                                if(cardData["card" + theCardID][2][theAbilityIDs] == 1) {
                                    hijackMessage+= "1 time";
                                } else {
                                    hijackMessage+= cardData["card" + theCardID][2][theAbilityIDs] + " times"
                                }
                                hijackMessage+="</span></span><br>"
                            }
                            hijackMessage+= "</span>"
                            // you should unhide the abilityPopout of the selected card, replace content with hijackMessage
                            // No exit option because discarded and ability used.
                            // then (before it or not) abilityWasUsed() and discard Street Thief.
                            $(".cardID"+cardID+"Abilities .abilityPopout").append(hijackMessage)
                            
                            
                        })
                        

                        $(".inactivePlayerPlayedCards.protected").click(function() {
                            let theCardID = $($(this).children()[0]).attr("class").replace("cardID", "") //get that card's card id
                            let theCardName = $($(this).children()[0]).html()
                            $(".protectMessage").remove();
                            let protectMessage = " <span class='protectMessage'>" + protectCheck[theCardID][turnCount][0] + " protects " + theCardName + ".</span>"
                            $(".cardID"+cardID+"Abilities .abilityPopout").append(protectMessage)
                        })

                        $(".useAnotherAbility").click(function() {
                            displayBoard(); //exit out of the menu/redisplay the board.
                        })
                    } else {
                        errorMessage("your opponent's cards are all protected!", "Roadkill", "#abilityNumber"+abilityID)
                    }
                } else {
                    //there isnt a card to deal damage to!
                    $(".abilityPopout br, .abilityPopout .abilitiesTitle, .cardID"+cardID+"Abilities .abilityPopout [id^='abilityNumber']:not(#abilityNumber"+abilityID+")").remove()
                    $(".cardID"+cardID+"Abilities .abilityPopout .cardHealthTotal").after("<br>")
                    errorMessage("your opponent has not played a card to deal damage to!", "Roadkill", "#abilityNumber"+abilityID)
                }
            } else if(Number(abilityID) === 18) { //if ability 18 (Scholar's Self Defense) was used
                //if the other person has played a card
                if(board["player" + nonActivePlayer + "Played"].length > 0) {
                    if($(".inactivePlayerPlayedCards:not(.protected)").length > 0) {
                        let message = "<br><span class='pickMessage'>Pick an opposing card to deal damage to!";
                        message += " <button class='useAnotherAbility'>Exit</button></span>"

                        $(".cardID"+cardID+"Abilities .abilityPopout [id^='abilityNumber'], .cardID"+cardID+"Abilities .abilityPopout br, .cardID"+cardID+"Abilities .abilityPopout .abilitiesTitle").remove()
                        $(".errorMessage").remove();
                        $(".cardID"+cardID+"Abilities .abilityPopout").append(message)
                        $("#"+cardID+"ability"+abilityID).remove() //get rid of the button to play this ability
                        $(".useCardButton").each(function(index) { // for every use card button
                            $(this).replaceWith($("<b>"+$(this).html()+":</b>")) // turn it into bold text
                        })
                        
                        glow(".inactivePlayerPlayedCards:not(.protected)") // Glow the cards to pick of the other person.
                        glow(".inactivePlayerPlayedCards.protected", true)
                        $(".inactivePlayerPlayedCards:not(.protected)").click(function() { //if you click on an opposing card
                            let theCardID = $($(this).children()[0]).attr("class").replace("cardID", "") //get that card's card id
                            let damageToDeal = 1; //you are deailng 1 damage to it
                            dealDamage(theCardID, damageToDeal) //deal the damage
                            abilityWasUsed(); //you used an ability
                            displayBoard(thePreviousBoard); //redisplay the board
                        })

                        $(".inactivePlayerPlayedCards.protected").click(function() {
                            let theCardID = $($(this).children()[0]).attr("class").replace("cardID", "") //get that card's card id
                            let theCardName = $($(this).children()[0]).html()
                            $(".protectMessage").remove();
                            let protectMessage = " <span class='protectMessage'>" + protectCheck[theCardID][turnCount][0] + " protects " + theCardName + ".</span>"
                            $(".cardID"+cardID+"Abilities .abilityPopout").append(protectMessage)
                        })

                        $(".useAnotherAbility").click(function() {
                            displayBoard(); //exit out of the menu/redisplay the board.
                        })
                    } else {
                        errorMessage("your opponent's cards are all protected!", "Self Defense", "#abilityNumber"+abilityID)
                    }
                } else {
                    //there isnt a card to deal damage to!
                    errorMessage("your opponent has not played a card to deal damage to!", "Self Defense", "#abilityNumber"+abilityID)
                }
            } else if(Number(abilityID) === 19) { //idk what happened but it put in outlaw instead of the place of 5
                if(board["player" + nonActivePlayer + "Played"].length > 0) {
                    if($(".inactivePlayerPlayedCards:not(.protected)").length > 0) {
                        let message = "<br><span class='pickMessage'>Pick an opposing card to deal damage to!";
                        message += " <button class='useAnotherAbility'>Exit</button></span>"

                        $(".cardID"+cardID+"Abilities .abilityPopout [id^='abilityNumber'], .cardID"+cardID+"Abilities .abilityPopout br, .cardID"+cardID+"Abilities .abilityPopout .abilitiesTitle").remove()
                        $(".errorMessage").remove();
                        $(".cardID"+cardID+"Abilities .abilityPopout").append(message)
                        $("#"+cardID+"ability"+abilityID).remove() //get rid of the button to play this ability
                        $(".useCardButton").each(function(index) { // for every use card button
                            $(this).replaceWith($("<b>"+$(this).html()+":</b>")) // turn it into bold text
                        })
                        
                        glow(".inactivePlayerPlayedCards:not(.protected)") // Glow the cards to pick of the other person.
                        glow(".inactivePlayerPlayedCards.protected", true)
                        $(".inactivePlayerPlayedCards:not(.protected)").click(function() { //if you click on an opposing card
                            let theCardID = $($(this).children()[0]).attr("class").replace("cardID", "") //get that card's card id
                            let theCardName = $($(this).children()[0]).html()
                            //let damageToDeal = 1; //you are deailng 1 damage to it

                            let activeBoardCopy = JSON.parse(JSON.stringify(board["player" + activePlayer + "Played"]))
                            let cardIndex = myIndexOf(activeBoardCopy, [cardName, cardID])
                            board["player" + activePlayer + "Played"][cardIndex] = [theCardName, theCardID]
                            //get rid of the random card from the other person's hand
                            let inactiveBoardCopy = JSON.parse(JSON.stringify(board["player" + nonActivePlayer + "Hand"]))
                            //console.log(inactiveBoardCopy)
                            let otherPersonCardIndex = myIndexOf(inactiveBoardCopy, [theCardName, theCardID])
                            //console.log(otherPersonCardIndex)
                            board["player" + nonActivePlayer + "Played"].splice(otherPersonCardIndex, 1)
                            //add desert caravan to your discard pile
                            board["player" + activePlayer + "Discard"].push([cardName, cardID])
                            cardData["card"+theCardID][1] = true;
                            
                            if(!discardCheck[theCardID]) {
                                discardCheck[theCardID] = {};
                            }
                            discardCheck[theCardID][turnCount + 5] = cardName + "'s Self Defense"
                            
                            //dealDamage(theCardID, damageToDeal) //deal the damage
                            abilityWasUsed(); //you used an ability
                            displayBoard(thePreviousBoard); //redisplay the board
                        })

                        $(".inactivePlayerPlayedCards.protected").click(function() {
                            let theCardID = $($(this).children()[0]).attr("class").replace("cardID", "") //get that card's card id
                            let theCardName = $($(this).children()[0]).html()
                            $(".protectMessage").remove();
                            let protectMessage = " <span class='protectMessage'>" + protectCheck[theCardID][turnCount][0] + " protects " + theCardName + ".</span>"
                            $(".cardID"+cardID+"Abilities .abilityPopout").append(protectMessage)
                        })

                        $(".useAnotherAbility").click(function() {
                            displayBoard(); //exit out of the menu/redisplay the board.
                        })
                    } else {
                        errorMessage("your opponent's cards are all protected!", "Self Defense", "#abilityNumber"+abilityID)
                    }
                } else {
                    //there isnt a card to deal damage to!
                    errorMessage("your opponent has not played a card to deal damage to!", "Self Defense", "#abilityNumber"+abilityID)
                }
                

            } else if(Number(abilityID) === 20) { //if ability 20 (Woodsman's Woodland Defense) was used
                //if the other person has played a card
                if(board["player" + nonActivePlayer + "Played"].length > 0) {
                    if($(".inactivePlayerPlayedCards:not(.protected)").length > 0) {
                        let message = "<br><span class='pickMessage'>Pick an opposing card to deal damage to!";
                        message += " <button class='useAnotherAbility'>Exit</button></span>"

                        $(".cardID"+cardID+"Abilities .abilityPopout [id^='abilityNumber'], .cardID"+cardID+"Abilities .abilityPopout br, .cardID"+cardID+"Abilities .abilityPopout .abilitiesTitle").remove()
                        $(".errorMessage").remove();
                        $(".cardID"+cardID+"Abilities .abilityPopout").append(message)
                        $("#"+cardID+"ability"+abilityID).remove() //get rid of the button to play this ability
                        $(".useCardButton").each(function(index) { // for every use card button
                            $(this).replaceWith($("<b>"+$(this).html()+":</b>")) // turn it into bold text
                        })
                        
                        glow(".inactivePlayerPlayedCards:not(.protected)") // Glow the cards to pick of the other person.
                        glow(".inactivePlayerPlayedCards.protected", true)
                        $(".inactivePlayerPlayedCards:not(.protected)").click(function() { //if you click on an opposing card
                            let theCardID = $($(this).children()[0]).attr("class").replace("cardID", "") //get that card's card id
                            let damageToDeal = 3; //you are deailng 3 damage to it
                                //deal the damage
                            dealDamage(theCardID, damageToDeal)
                            abilityWasUsed(); //you used an ability
                            displayBoard(thePreviousBoard); //redisplay the board
                        })

                        $(".inactivePlayerPlayedCards.protected").click(function() {
                            let theCardID = $($(this).children()[0]).attr("class").replace("cardID", "") //get that card's card id
                            let theCardName = $($(this).children()[0]).html()
                            $(".protectMessage").remove();
                            let protectMessage = " <span class='protectMessage'>" + protectCheck[theCardID][turnCount][0] + " protects " + theCardName + ".</span>"
                            $(".cardID"+cardID+"Abilities .abilityPopout").append(protectMessage)
                        })

                        $(".useAnotherAbility").click(function() {
                            displayBoard(); //exit out of the menu/redisplay the board.
                        })
                    } else {
                        errorMessage("your opponent's cards are all protected!", "Woodland Defense", "#abilityNumber"+abilityID)
                    }
                } else {
                    //there isnt a card to deal damage to!
                    errorMessage("your opponent has not played a card to deal damage to!", "Woodland Defense", "#abilityNumber"+abilityID)
                }
            } else if(Number(abilityID) === 21) { //if ability 20 (Woodsman's Woodland Defense) was used
                //if the other person has played a card
                if(cardData["card"+cardID][2][abilityID]>0) { //if this card has been used more than once
                    errorMessage("you cannot use this ability more than once!", "Natural Instinct", "#abilityNumber"+abilityID)
                } else if(board["player" + nonActivePlayer + "Hand"].length > 0) {
                    $(".cardID"+cardID+"Abilities .abilityPopout [id^='abilityNumber'], .cardID"+cardID+"Abilities .abilityPopout br, .cardID"+cardID+"Abilities .abilityPopout .abilitiesTitle").remove()
                    $(".errorMessage").remove();
                    //$(".cardID"+cardID+"Abilities .abilityPopout").append(message)
                    $("#"+cardID+"ability"+abilityID).remove() //get rid of the button to play this ability
                    $(".useCardButton").each(function(index) { // for every use card button
                        $(this).replaceWith($("<b>"+$(this).html()+":</b>")) // turn it into bold text
                    })
                    
                    let randomCardOfOtherPerson = board["player" + nonActivePlayer + "Hand"][Math.floor(Math.random()*board["player" + nonActivePlayer + "Hand"].length)]
                    
                    let theCardID = randomCardOfOtherPerson[1];
                    let theCardName = randomCardOfOtherPerson[0];

                    //push it to the array
                    let otherCard = "<span class='cardFaceUp cardPopup'><span class = 'cardID"+theCardID+"'>" + theCardName + "</span>"
                    
                    otherCard+="<div class='abilityPopout' style='display: none;'>"+" <span class='cardName'>"+theCardName+"</span><br>"
                    otherCard+= "<span class='cardHealthTotal'>Health: " + cardData["card" + theCardID][0] + "/" + cards[theCardName]["Health"]+"</span><br />Abilities:<br />";

                    for(j in cards[theCardName]["Abilities"]) { //for each of this card's abilities add a button; did I accidentally set this to theCardName and not theCardID?
                        let theAbilityBadge = Object.values(cards[theCardName]["Abilities"][j])[2]
                        let theAbilityName = Object.keys(cards[theCardName]["Abilities"][j])[1]
                        if(theAbilityBadge) {
                            otherCard+= "<img class='badge' src='./images/abilities/" + theAbilityBadge + "' alt='" + theAbilityName + "BadgeHere'>"
                        }
                        otherCard+= " <b>"+Object.keys(cards[theCardName]["Abilities"][j])[1]+"</b>:"
                        otherCard+= " <span class='abilityInformation'>" + Object.values(cards[theCardName]["Abilities"][j])[1] + "</span><br>"
                    }
                    otherCard+= "</div>"
                    otherCard+= "<span class='cardHealth cardID" + theCardID + "'>"+cardData["card" + theCardID][0]+"</span></span>"
                    $(".cardID"+cardID+"Abilities .abilityPopout").append(otherCard)

                    abilityWasUsed();
                    showCardImages();
                    setTimeout(function(){ displayBoard(); }, 5000);

                    
                } else {
                    //there isnt a card to deal damage to!
                    errorMessage("your opponent does not have a card in their hand to view!", "Natural Instinct", "#abilityNumber"+abilityID)
                }
            } else {
                let theCardName = $("#abilityNumber" + abilityID + " .useCardButton").html()
                $(".abilityPopout br, .abilityPopout .abilitiesTitle, .cardID"+cardID+"Abilities .abilityPopout [id^='abilityNumber']:not(#abilityNumber"+abilityID+")").remove()
                $(".cardID"+cardID+"Abilities .abilityPopout .cardHealthTotal").after("<br>") //copy paste this everywhere!!!
                errorMessage("this ability has not been coded in yet!", theCardName, "#abilityNumber" + abilityID)
            }
        } 
        
        var nonActivePlayer = (activePlayer)%2+1 //let nonactiveplayer be the other one.
        
        function showCardImages() {
            $(".cardFaceUp:not(:empty)").each(function() {
                if(cards[$($(this).children()[0]).html()]["Art"] !== "") {
                    $(this).css('background-image', 'url("' + ".//images/cards/" + cards[$($(this).children()[0]).html()]["Art"] + '")');
                    $(this).css('background-size', "100%");
                }
            })
        }
        
        function showActivePlayerCards() { //display your active cards
            let arrayOfCards = []; //set your cards
            for(i in board["player" + activePlayer + "Hand"]) { //for every card in your hand
                //push it to the array
                let theCardID = board["player" + activePlayer + "Hand"][i][1];
                let theCardName = board["player" + activePlayer + "Hand"][i][0];
                arrayOfCards.push("<span id = 'activeCard"+i+"' class = 'active cardInHand cardID"+theCardID+"'>" + theCardName + "</span>")
                if(!playedCardYet) { //if you haven't played a card yet, add a button to play it.
                    if(cardData["card"+theCardID][3]===false) {
                        arrayOfCards[arrayOfCards.length - 1] +=" <button id='playCard"+i+"' class='playCardButton cardID"+theCardID+"'>Play Card</button>"
                    }
                } else {
                    //otherwise don't display the button saying to play the card.
                }
                arrayOfCards[arrayOfCards.length - 1] += "<div class='abilityPopout' style='display: none;'>"+" <span class='cardName'>"+theCardName+"</span><br>"
                arrayOfCards[arrayOfCards.length - 1] += "<span class='cardHealthTotal'>Health: " + cardData["card" + theCardID][0] + "/" + cards[theCardName]["Health"]+"</span><br />Abilities:<br />";

                for(j in cards[theCardName]["Abilities"]) { //for each of this card's abilities add a button; did I accidentally set this to theCardName and not theCardID?
                    let theAbilityBadge = Object.values(cards[theCardName]["Abilities"][j])[2]
                    let theAbilityName = Object.keys(cards[theCardName]["Abilities"][j])[1]
                    if(theAbilityBadge) {
                        arrayOfCards[arrayOfCards.length - 1]+= "<img class='badge' src='./images/abilities/" + theAbilityBadge + "' alt='" + theAbilityName + "BadgeHere'>"
                    }
                    arrayOfCards[arrayOfCards.length - 1]+= " <b>"+Object.keys(cards[theCardName]["Abilities"][j])[1]+"</b>:"
                    arrayOfCards[arrayOfCards.length - 1]+= " <span class='abilityInformation'>" + Object.values(cards[theCardName]["Abilities"][j])[1] + "</span><br>"
                }
                arrayOfCards[arrayOfCards.length - 1]+= "</div>"
                arrayOfCards[arrayOfCards.length - 1]+= "<span class='cardHealth cardID" + theCardID + "'>"+cardData["card" + theCardID][0]+"</span>"
            } 
            
            //arrayOfCards.push("<button id = 'sortCards' onclick = 'sortCards(board[\"player\" + " + activePlayer + " + \"Hand\"], true)'>Sort Cards</button>")
            $(".active.handContent").html("<span class='cardFaceUp cardThatIsActive'>"+ arrayOfCards.join("</span><span class='cardFaceUp cardThatIsActive'>")+"</span>") //set it to the page, divided by span elements.
            //push a sort cards button at the end
            //$("."+activePlayer+".hand .left").html($("."+activePlayer+".hand .left").html() + "<button id = 'sortCards' onclick = 'sortCards(board[\"player\" + " + activePlayer + " + \"Hand\"], true)'>Sort Cards</button>")
            showCardImages()
        }
        
        function showActivePlayedCards() { //display your played cards
            $("."+activePlayer+".hand .left .sortCards").css('display', "inline-block")
            let arrayOfActivePlayedCards = []; //set an array
            let i = 0;
            while(i<board["player"+activePlayer+"Played"].length) { //for every played card
                if(cardData["card"+board["player" + activePlayer + "Played"][i][1]][0]<=0) { //if this card's health is less than or equal to 0, discard it.
                    board["player" + activePlayer + "Discard"].push(board["player" + activePlayer + "Played"].splice(i, 1)[0])
                } else { //otherwise
                    let theCardID = board["player" + activePlayer + "Played"][i][1];
                    let theCardName = board["player" + activePlayer + "Played"][i][0];
                    //set up a string for each card
                    let stringOfUseCards = "";
                    let stringOfAbilityUsage = "";

                    stringOfUseCards+= "<span class='cardFaceUp activePlayerPlayedCards"
                    if(protectCheck[theCardID] && myIndexOf(Object.keys(protectCheck[theCardID]), String(turnCount + 1)) >= 0) {
                        
                        if(!protectCheck[theCardID][turnCount + 1][1]) {
                            stringOfUseCards+= " protected"
                        } else {
                            stringOfUseCards+= " reduced"
                        }
                    } 
                    if(restrictCheck[theCardID] && myIndexOf(Object.keys(restrictCheck[theCardID]), String(turnCount)) >= 0) {
                        stringOfUseCards+= " restricted"
                    } 
                    stringOfUseCards+= "'>"
                    stringOfUseCards+= "<span id = 'playedCardActive"+i+"' class='cardID"+theCardID+"'>" + theCardName + "</span>"
                    
                    //Add the name of the card
                    //add its health
                    // this should eventually be positioned at the bottom right of the card.
                    stringOfUseCards+= " <span class='cardID"+theCardID+"Abilities'>"
                    stringOfUseCards+= "<div class='abilityPopout' style='display: none;'> <span class='cardName'>"+theCardName+"</span><br>"
                    stringOfUseCards += " <span class='cardHealthTotal'>Health: " + cardData["card" + theCardID][0] + "/" + cards[theCardName]["Health"]+"</span> <br />";
                    stringOfUseCards+="<span class='abilitiesTitle'>Abilities:</span><br />";
                    if(cardData["card"+board["player" + activePlayer + "Played"][i][1]][1]) { //if you have used this card already, then you can't use it again
                        stringOfUseCards+="You've already used this card once this turn!<br>" //move these two into the ability popout!
                    }
                    if(restrictCheck[theCardID] && myIndexOf(Object.keys(restrictCheck[theCardID]), String(turnCount)) >= 0) {
                        //If there is a card that is kidnapped this turn and it is this card, then display a message saying you cannot use this card
                        stringOfUseCards += "<span class='restricted red'>This card cannot use abilities this turn under " + restrictCheck[theCardID][turnCount] + ".</span><br>";
                    }
                    if(protectCheck[theCardID] && myIndexOf(Object.keys(protectCheck[theCardID]), String(turnCount + 1)) >= 0) {
                        // it says undefined
                        if(!protectCheck[theCardID][turnCount + 1][1]) {
                            stringOfUseCards+="<span class ='protected cyan'>" + protectCheck[theCardID][turnCount + 1][0] + " protects this card from your opponent's attacks next turn!</span><br>"
                        } else {
                            stringOfUseCards+="<span class ='reduced cyan'>" + protectCheck[theCardID][turnCount + 1][0] + " reduces 2 damage from your opponent's attacks on this card next turn!</span><br>"
                        }
                        
                    }
                    if(randomCheck[theCardID] && myIndexOf(Object.keys(randomCheck[theCardID]), String(turnCount)) >= 0) {
                        stringOfUseCards+="<span class ='randomed " + randomCheck[theCardID][turnCount][4] + "'>" + randomCheck[theCardID][turnCount][0]
                        if(randomCheck[theCardID][turnCount][1]) {
                            stringOfUseCards+= " successfully dealt "
                        } else {
                            stringOfUseCards+= " did not deal "
                        }
                        stringOfUseCards+= randomCheck[theCardID][turnCount][2] + " damage to " + randomCheck[theCardID][turnCount][3] + ".</span><br>"
                    }
                    for(j in cards[theCardName]["Abilities"]) { //for each of this card's abilities add a button; did I accidentally set this to theCardName and not theCardID?
                        let theAbilityIDs = Object.values(cards[theCardName]["Abilities"][j])[0]
                        
                        let theAbilityName = Object.keys(cards[theCardName]["Abilities"][j])[1]
                        stringOfUseCards+= " <span id='abilityNumber"+theAbilityIDs+"'>"
                        let theAbilityBadge = Object.values(cards[theCardName]["Abilities"][j])[2]
                        if(theAbilityBadge) {
                            stringOfUseCards+= "<img class='badge' src='./images/abilities/" + theAbilityBadge + "' alt='" + theAbilityName + "BadgeHere'>"
                        }
                        if((restrictCheck[theCardID] && myIndexOf(Object.keys(restrictCheck[theCardID]), String(turnCount)) >= 0) || (cardData["card"+board["player" + activePlayer + "Played"][i][1]][1])) {
                            //If you cannot use an ability this turn, because of restriction or if you've already used it
                            stringOfUseCards+= "<b>"+theAbilityName+"</b>:"
                        } else {
                            stringOfUseCards+= "<button class='useCard"+i+" useCardButton' id='"+theCardID+"ability"+Object.values(cards[theCardName]["Abilities"][j])[0]+"'>"+Object.keys(cards[theCardName]["Abilities"][j])[1]+"</button>"
                        }
                        
                        stringOfUseCards+= " <span class='abilityInformation'>" + Object.values(cards[theCardName]["Abilities"][j])[1] + "</span><span class='abilityUsage'> - Used "
                        if(cardData["card" + theCardID][2][theAbilityIDs] == 1) {
                            stringOfUseCards+= "1 time";
                        } else {
                            stringOfUseCards+= cardData["card" + theCardID][2][theAbilityIDs] + " times"
                        }
                        stringOfUseCards+="</span></span><br />"
                    }
                    stringOfUseCards+= "</div>"
                    stringOfUseCards+= "</span>" //close the span element
                    stringOfUseCards+= "<span class='cardHealth cardID" + theCardID + "'>"+cardData["card" + theCardID][0]+"</span>"
                    //stringOfUseCards+= "<span id = 'playedCardActive"+i+"' class='cardID"+theCardID+"'>" + theCardName + "</span>"
                    stringOfUseCards+= "</span>"
                    arrayOfActivePlayedCards.push(stringOfUseCards) //push it to the array
                    i++
                }      
            }
            //add it to the board, separated by <span>s
            $(".active.playedContent").html(arrayOfActivePlayedCards.join(""))
            showCardImages()
        }

        function showInactivePlayedCards() { //show inactive played cards
            let arrayOfInActivePlayedCards = []; //set an array
            let i = 0;
            while(i<board["player"+nonActivePlayer+"Played"].length) { //for every played card
                let theCardID = board["player" + nonActivePlayer + "Played"][i][1];
                let theCardName = board["player" + nonActivePlayer + "Played"][i][0];
                if(cardData["card"+theCardID][0]<=0 || (discardCheck[theCardID] && myIndexOf(Object.keys(discardCheck[theCardID]), String(turnCount)) >= 0)) { //if this card's health is less than or equal to 0, discard it.
                    board["player" + nonActivePlayer + "Discard"].push(board["player" + nonActivePlayer + "Played"].splice(i, 1)[0])
                } else { //otherwise
                    
                    //set up a string for each card
                    let stringOfUseCards = "";
                    let stringOfAbilityUsage = "";
                    stringOfUseCards+= "<span class='cardFaceUp inactivePlayerPlayedCards"
                    if(protectCheck[theCardID] && myIndexOf(Object.keys(protectCheck[theCardID]), String(turnCount)) >= 0) {
                        //console.log(protectCheck[theCardID][turnCount + 1][1])
                        console.log(protectCheck[theCardID][turnCount])
                        if(!protectCheck[theCardID][turnCount][1]) {
                            stringOfUseCards+= " protected"
                        } else {
                            stringOfUseCards+=" reduced"
                        }
                    } 
                    if(restrictCheck[theCardID] && myIndexOf(Object.keys(restrictCheck[theCardID]), String(turnCount + 1)) >= 0) {
                        stringOfUseCards+= " restricted"
                    } 
                    stringOfUseCards+= "'>"
                    stringOfUseCards+= "<span id = 'playedCardNonActive"+i+"' class='cardID"+theCardID+"'>" + theCardName + "</span>"
                    //Add the name of the card
                    //add its health
                    // this should eventually be positioned at the bottom right of the card.
                    //stringOfUseCards+= " Health: " + cardData["card" + theCardID][0] + "/" + cards[theCardName]["Health"] + " <span class='cardID"+theCardID+"Abilities'>"
                    stringOfUseCards+= "<div class='abilityPopout' style='display: none;'><span class='cardName'>"+theCardName+"</span><br>"
                    stringOfUseCards+= " <span class='cardHealthTotal'>Health: " + cardData["card" + theCardID][0] + "/" + cards[theCardName]["Health"]+"</span><br />Abilities:<br />";

                    if(restrictCheck[theCardID] && myIndexOf(Object.keys(restrictCheck[theCardID]), String(turnCount + 1)) >= 0) {
                        stringOfUseCards += " <span class='restricted red'>This card will not be able to use its abilities next turn under " + restrictCheck[theCardID][turnCount + 1] + ".</span><br>"
                    }
                    if(protectCheck[theCardID] && myIndexOf(Object.keys(protectCheck[theCardID]), String(turnCount)) >= 0) {
                        if(!protectCheck[theCardID][turnCount][1]) {
                            stringOfUseCards+=" <span class ='protected cyan'>" + protectCheck[theCardID][turnCount][0] + " protects this card from your attacks this turn.</span><br>"
                        } else {
                            stringOfUseCards+=" <span class ='reduced cyan'>" + protectCheck[theCardID][turnCount][0] + " reduces 2 damage from your attacks on this card this turn!</span><br>"
                        }
                    }
                    //display: none this eventually.
                            
                    
                    for(j in cards[theCardName]["Abilities"]) { //for each of this card's abilities add a button; did I accidentally set this to theCardName and not theCardID?
                        let theAbilityBadge = Object.values(cards[theCardName]["Abilities"][j])[2]
                        let theAbilityName = Object.keys(cards[theCardName]["Abilities"][j])[1]
                        if(theAbilityBadge) {
                            stringOfUseCards+= "<img class='badge' src='./images/abilities/" + theAbilityBadge + "' alt='" + theAbilityName + "BadgeHere'>"
                        }
                        stringOfUseCards+= " <b>"+Object.keys(cards[theCardName]["Abilities"][j])[1]+"</b>:"
                        stringOfUseCards+= " <span class='abilityInformation'>" + Object.values(cards[theCardName]["Abilities"][j])[1] + "</span><span class='abilityUsage'> - Used "
                        let theAbilityIDs = Object.values(cards[theCardName]["Abilities"][j])[0]
                        
                        if(cardData["card" + theCardID][2][theAbilityIDs] == 1) {
                            stringOfUseCards+= "1 time";
                        } else {
                            stringOfUseCards+= cardData["card" + theCardID][2][theAbilityIDs] + " times"
                        }
                        stringOfUseCards+="</span></span><br />"
                    }
                    stringOfUseCards+= "</div>"
                        
                    stringOfUseCards+= "<span class='cardHealth cardID" + theCardID + "'>"+cardData["card" + theCardID][0]+"</span>"
                    stringOfUseCards+= "</span>" //close the span element
                    stringOfUseCards+= "</span>"
                    arrayOfInActivePlayedCards.push(stringOfUseCards) //push it to the array
                    i++
                }      
            }
            //add it to the board, separated by |s
            
            //display the inactive played cards
            $(".nonactive.playedContent").html(arrayOfInActivePlayedCards.join(""))
            showCardImages();
        }
        function showInactivePlayerCards() { //display inactive cards
            $("."+nonActivePlayer+".hand .left .sortCards").css('display', "none")
            let arrayOfInactiveCards = []; //set the array
            //console.log(nonActivePlayer)
            //console.log("fa;skdfja;kslfj;l")
            for(i in board["player" + nonActivePlayer + "Hand"]) { //for each one you get to see the back of the card
                arrayOfInactiveCards.push("<span class='inactive' id = 'inactiveCard"+i+"'>" + "The back of the card lol" + "</span>")
            } //set it to the board
            //$("."+nonActivePlayer+".hand .right").html(arrayOfInactiveCards.join(""))
            //currently, the hand of the inactive player is not being shown.
            $(".inactive").each(function(i, obj) {
                //console.log(obj)
                //console.log(i)
                //$(this).css("left", i*100+150)
            })
        }
        function showDiscardPiles(showThisDeck) { //show the discard piles
            if(showThisDeck) {
                if(showThisDeck == activePlayer) {
                    if(board["player" + showThisDeck + "Discard"].length === 0) { //if your discard pile is empty then just show a label.
                        $(".active.discardTitle").html("Player " + showThisDeck + "'s Discard Pile: ")
                        $(".active.discardContent").html("");
                    } else { //show the label and the top card's name otherwise.
                        //let activePlayerDiscardString = "";
                        $(".active.discardTitle").html("Player " + showThisDeck + "'s Discard Pile: ");
                        let activePlayerDiscardString = "<span class='inactive inactiveDiscard'>" + "The back of the card lol<br>Click me to see the full discard pile!" + "</span>"
                        $(".active.discardContent").html(activePlayerDiscardString);

                        
                    }
                } else {
                    if(board["player" + showThisDeck + "Discard"].length === 0) { //if your discard pile is empty then just show a label.
                        //$(".nonactive.discardTitle").html("Player " + showThisDeck + "'s Discard Pile: ")
                        $(".nonactive.discardContent").html("");
                    } else { //show the label and the top card's name otherwise.
                        //let activePlayerDiscardString = "";
                        //$(".nonactive.discardTitle").html("Player " + showThisDeck + "'s Discard Pile: ");
                        let activePlayerDiscardString = "<span class='inactive inactiveDiscard'>" + "The back of the card lol<br>Click me to see the full discard pile!" + "</span>"
                        $(".nonactive.discardContent").html(activePlayerDiscardString);

                        
                    }
                }
                
            } else {
                console.log(activePlayer)
                function showTheDiscardPiles() {
                    if(board["player" + activePlayer + "Discard"].length === 0) { //if your discard pile is empty then just show a label.
                        //$(".active.discardTitle").html("Player " + activePlayer + "'s Discard Pile: ")
                        $(".active.discardContent").html("");
                    } else { //show the label and the top card's name otherwise.
                        //let activePlayerDiscardString = "";
                        //$(".active.discardTitle").html("Player " + activePlayer + "'s Discard Pile: ");
                        let activePlayerDiscardString = "<span class='inactive inactiveDiscard'>" + "The back of the card lol<br>Click me to see the full discard pile!" + "</span>"
                        $(".active.discardContent").html(activePlayerDiscardString);

                        
                    }
                    //same thing for non active cards.
                    if(board["player" + nonActivePlayer + "Discard"].length === 0) {
                        //$(".nonactive.discardTitle").html("Player " + nonActivePlayer + "'s Discard Pile: ")
                        $(".nonactive.discardContent").html("");
                    } else {
                        //let nonActivePlayerDiscardString = "";
                        //$(".nonactive.discardTitle").html("Player " + nonActivePlayer + "'s Discard Pile: ");
                        let nonActivePlayerDiscardString = "<span class='inactive inactiveDiscard'>" + "The back of the card lol<br>Click me to see the full discard pile!" + "</span>"
                        $(".nonactive.discardContent").html(nonActivePlayerDiscardString);


                        //$("."+nonActivePlayer+".discard").html("<td>Player " + nonActivePlayer + "'s Discard Pile: </td><td class='cardFaceUp discardPile'><span class='cardID" + board["player" + nonActivePlayer + "Discard"][board["player" + nonActivePlayer + "Discard"].length - 1][1] + "'>" + board["player" + nonActivePlayer + "Discard"][board["player" + nonActivePlayer + "Discard"].length - 1][0] + "</span></td>")
                    }
                }
                showTheDiscardPiles();
            }
            

            
            //If you click a not empty discard pile
            
            
            /*function() {
                showTheDiscardPiles();
            })*/
        }
        
        showInactivePlayerCards() //show the back of the other players hand
        showActivePlayedCards() //show your played cards
        showInactivePlayedCards() //show their played cards
        showActivePlayerCards() //show your hand <-- this has to be last since otherwise it will count the nonactive cards as active first.
        showDiscardPiles() //show the discard piles

        $("."+activePlayer+".functions").removeAttr("style") //show the end turn button for you
        $("."+nonActivePlayer+".functions").css("display", "none")
        $("."+activePlayer+".functions.right").css("height", "15px")
        //$(".functions")
        //$("."+nonActivePlayer+".endTurn").css("display", "none") //hide it for the other person
        //$("." + activePlayer + ".draw").css("display", "block") //show your draw button <- how will drawing work in game?
        //$("." + nonActivePlayer + ".draw").css("display", "none") //hide it for them
        $("#turnCount").html("Turn Count: " + turnCount) //show the turn count

        function hotkeys() { //hotkeys function for clicks/hovers
            $(".draw")
                .unbind('click')
                .click(function(){
                    if(board["player" + activePlayer + "Hand"].length >= 5) {
                        
                    } else if(board["player" + activePlayer + "Deck"].length > 0) { //if there are cards to draw
                        //move a card from your deck to your hand.
                        board["player" + activePlayer + "Hand"].push(board["player" + activePlayer + "Deck"].splice(0, 1)[0]) //why did i have to [0] here? oh, because otherwise it would return it as [["hello", "yes"]]
                        showActivePlayerCards() //reshow your hand
                        hotkeys() //recall hotkeys so they will still work.
                    } else { //no cards left to draw
                        $(this).replaceWith("<b>There are no more cards left to draw!</b>")
                    }
                })
            //when you click draw
            
            $(".playCardButton")
                .unbind('click')
                .click(function(){ //if you click on the play card button
                    //$(".playCardButton").unbind('click');
                    playedCardYet = true; //set it to true, you have played a card now!
                    board["player"+activePlayer+"Hand"].splice($(this).attr("id").replace("playCard", ""), 1) //get rid of the card from your hand
                    //add it to your played section
                    board["player"+activePlayer+"Played"].push([listOfCards[$(this).attr("class").replace("playCardButton", "").replace("cardID", "").replace(" ", "")], $(this).attr("class").replace("playCardButton", "").replace("cardID", "").replace(" ", "")])
                    displayBoard(thePreviousBoard);
                    //hotkeys() //recall hotkeys so they will still work.
                })
            let abilityOverride = {};
            $(".useCardButton")
                .unbind('click')
                .click(function(){ //if you click on a use abillity button
                //run the abilities function (cardName, abilityID, cardID)
                //console.log(board)
                //console.log($(this).attr("class").replace("useCardButton", "").replace("useCard", "").replace(" ", ""))
                //console.log(board["player"+activePlayer+"Played"][$(this).attr("class").replace("useCardButton", "").replace("useCard", "").replace(" ", "")])
                let theCardName = String(board["player"+activePlayer+"Played"][$(this).attr("class").replace("useCardButton", "").replace("useCard", "").replace(" ", "")][0]);
                let theCardID = String(board["player"+activePlayer+"Played"][$(this).attr("class").replace("useCardButton", "").replace("useCard", "").replace(" ", "")][1]);
                let theAbilityID = String($(this).attr("id").replace(theCardID, "").replace("ability", ""));
                //$(this).parent().css("display", "block")
                abilityOverride[theCardID] = true;
                //console.log(abilityOverride)
                abilities(theCardName, theAbilityID, theCardID)
                
            })
            $(".cardFaceUp").hover(function() {
                if($(this).find(".abilityPopout").length > 0) {
                    let theCardID = $($(this).children()[0]).attr("class").replace("cardID", "")
                    $(this).find(".abilityPopout").css("display", "block")
                    //console.log(abilityOverride)
                    if(JSON.stringify(abilityOverride) == "{}") {
                        // now we need to position the health of the card in the bottom right corner
                    } else if(abilityOverride[theCardID] && abilityOverride[theCardID] == true) { 
                        // do nothing
                    } else {
                        //console.log($(this).find("abilityPopout"))
                        $(this).find(".abilityPopout").css("display", "none")
                    }


                    var element = $(this)[0];
                    var position = element.getBoundingClientRect();
                    //console.log(position.right)
                    let rightBoundary = position.right + 250;
                    let leftBoundary = position.left - 220;
                    //console.log(rightBoundary)
                    //console.log(document.body.clientWidth)
                    if(rightBoundary > document.body.clientWidth) {
                        //console.log("it would go off screen")
                        // If it would go off the screen
                        let offScreenRight = rightBoundary-document.body.clientWidth;
                        //console.log(offScreenRight)
                        let offScreenLeft = Math.abs(leftBoundary)
                        //console.log(offScreenLeft)
                        if(leftBoundary < 0) {
                            if(offScreenLeft < offScreenRight) {
                                //if the left boundary is less than the right
                                //option a
                                //console.log(offScreenLeft)
                                $(this).find(".abilityPopout:not(.discardPile .abilityPopout)").css("left", "100%")
                            } else {
                                // opt b: normal.
                                //console.log(offScreenLeft)
                                $(this).find(".abilityPopout:not(.discardPile .abilityPopout)").css("right", "100%")
                            }
                            //If the left boundary would also go off the page...
                        } else { //if the left boundary would not go off the page
                            //Show it on the left; option a
                            //console.log(offScreenLeft)
                            $(this).find(".abilityPopout:not(.discardPile .abilityPopout)").css("right", "100%")
                            //console.log("IT SHOULD GO RIGHT!")
                        }
                    } else {
                        //the right boundary is not off the screen
                        // opt b: normal
                        $(this).find(".abilityPopout:not(.discardPile .abilityPopout)").css("left", "100%")
                    }
                    
                }
                //let us make one hover function for every cardFaceUp
                //for activePlayerPlayedCards, it'll also show the buttons.
                //then, rework the error messages and displays of abilities.
            }, function() {
                //console.log(abilityOverride)
                let theCardID = $($(this).children()[0]).attr("class").replace("cardID", "")
                if(abilityOverride[theCardID] == true) { 
                    // nothing?
                } else {
                    $(this).find(".abilityPopout").css("display", "none")
                }
                
            })
            
            $(".discardContent").unbind('click').click(function() {
                if($(this).find(".inactive")[0]){
                    playerNumber = $(this).attr("id").replace("discard", "");
                    if(board["player" + playerNumber + "Discard"][0]) {
                        let discardString = "<div class='discardFull'>"
                        // for every discarded card
                        for(i in board["player" + playerNumber + "Discard"]) {
                            let theCardID = board["player" + playerNumber + "Discard"][i][1];
                            let theCardName = board["player" + playerNumber + "Discard"][i][0];
                            // Add a card with its name
                            discardString+= "<div class='cardFaceUp discardPile' style='display: block;'><span class='active cardID" + theCardID + "'>" + theCardName + "</span>";
                            // add a span and a div (that are currently hidden) for its abilities
                            discardString+= " <span class='cardID"+theCardID+"Abilities'>"
                            // add its current health/max health
                            //no popout for now
                            discardString+= "<span class='cardHealth cardID" + theCardID + "'>0</span></span></div>";
                        }
                        // close discardFull
                        discardString+="</div>"

                        $(this).html(discardString);
                        showCardImages();
                    }
                } else {
                    showDiscardPiles($(this).attr("id").replace("discard", ""));
                }
            })
        }
        
        hotkeys() //call the hotkeys originally so they work off the ba
        
        //debugPanel()
    }
    //show the board when you load the page.
    displayBoard()
}