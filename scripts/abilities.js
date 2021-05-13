function abilities(cardName, abilityID) {
    //var nonActivePlayer = (activePlayer)%2+1
    console.log(abilityID)
    if(abilityID === 0) {
        let randomCardOfOtherPerson = board["player" + nonActivePlayer + "Hand"][Math.floor(Math.random()*board["player" + nonActivePlayer + "Hand"].length)]
        console.log("hello")
        $("<div></div>").html(randomCardOfOtherPerson)
        console.log("hello")
    }
    
}