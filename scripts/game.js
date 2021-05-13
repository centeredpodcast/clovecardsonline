//$("h1").html("Hello!") //This is just filler stuff.

const cards = {
    "Desert Caravan": {
        "Rarity": "Common",
        "Abilities": [
            {
                "ID": 0,
                "Barter": "Choose one random card in your opponents hand and use it as your own until it is discarded. Upon playing this move, discard Desert Caravan"
            },
            {
                "ID": 1,
                "Roadkill": "deal 2 damage to an opposing card"
            }
        ],
        "Health": 3,
        "Rating": 5,
        "Art Ready?": "In progress",
        "Music": "",
        "Sound Effects": ""
    },
    "Novice Explorer": {
        "Rarity": "Common",
        "Abilities": [
            {
                "ID": 2,
                "Expedition": "Allows you to play an extra card in your turn. Once this ability has been used twice, Novice Explorer is discarded"
            }
        ],
        "Health": 3,
        "Rating": 5,
        "Art Ready?": "",
        "Music": "",
        "Sound Effects": ""
    },
    "Mooshlett": {
        "Rarity": "Common",
        "Abilities": [
            { 
                "ID": 3,    
                "Spread the spore": "deals 2 damage to an opposing card, and generates a copy of this card, which cannot be used until your next turn."
            }
        ],
        "Health": 2,
        "Rating": 5,
        "Art Ready?": "In progress",
        "Music": "",
        "Sound Effects": ""
    },
    "Northern Tribesman": {
        "Rarity": "Common",
        "Abilities": [
            { 
                "ID": 4,
                "Arctic Slash": "deals 3 damage to an opposing card" 
            },
            { 
                "ID": 5,
                "Whirlwind": "deals 2 damage to two opposing cards in play, but takes 2 health from Northern Tribesman"
            }
        ],
        "Health": 4,
        "Rating": 5,
        "Art Ready?": "",
        "Music": "",
        "Sound Effects": ""
    },
    "Mechanic": {
        "Rarity": "Common",
        "Abilities": [
            {
                "ID": 6,
                "Tune up": "gives every other card you have in play 1 additional health point"
            },
            {
                "ID": 7,
                "Passion Project": "gives one other card you have in play 3 additional health points."
            }
        ],
        "Health": 3,
        "Rating": 5,
        "Art Ready?": "",
        "Music": "",
        "Sound Effects": ""
    },
    "Outlaw": {
        "Rarity": "Common",
        "Abilities": [
            { 
                "ID": 8,
                "Kidnap": "deals 2 damage and prevents one opposing card from using any abilities in the next turn"
            },
            {
                "ID": 9,
                "Never surrender": "allows you to allocate 4 damage in any way across all the cards your opponent has in play, but discards the Outlaw."
            }
        ],
        "Health": 4,
        "Rating": 5,
        "Art Ready?": "",
        "Music": "",
        "Sound Effects": ""
    },
    "Snow Spirit": {
        "Rarity": "Common",
        "Abilities": [
            {
                "ID": 10,
                "Snowy embrace": "choose one other card you have in play; your opponent cannot attack this card during the next turn"
            },
            {
                "ID": 11,
                "Arctic Fury": "deals 2 damage to an opposing card"
            }
        ],
        "Health": 5,
        "Rating": 5,
        "Art Ready?": "In progress",
        "Music": "",
        "Sound Effects": ""
    },
    "Tundra Fox": {
        "Rarity": "Common",
        "Abilities": [
            {
                "ID": 12,
                "Leap of faith": "has a 50/50 chance of dealing 2 damage to an opposing card"
            },
            {
                "ID": 13,
                "Burrow": "prevents your opponent from attacking Tundra Fox during the next turn"
            }
        ],
        "Health": 2,
        "Rating": 5,
        "Art Ready?": "",
        "Music": "",
        "Sound Effects": ""
    },
    "Peace Keeper": {
        "Rarity": "Common",
        "Abilities": [
            {
                "ID": 14,
                "Devils Advocate": "deals 3 damage to an opposing card"
            },
            {
                "ID": 15,
                "Negotiations": "choose one card you have in play; if your opponent attacks this card during their next turn, the card will receive two less damage."
            }
        ],
        "Health": 5,
        "Rating": 5,
        "Art Ready?": "In progress",
        "Music": "",
        "Sound Effects": ""
    },
    "Street Theif": {
        "Rarity": "Common",
        "Abilities": [
            {
                "ID": 16,
                "One with the shadows": "prevents your opponent from attacking the street thief during the next turn, and gives it one additional health point"
            },
            {
                "ID": 17,
                "Hijack": "allows the street thief to perform any ability that the opposing cards in play have; but discards street thief "
            }
        ],
        "Health": 2,
        "Rating": 5,
        "Art Ready?": "",
        "Music": "",
        "Sound Effects": ""
    },
    "Scholar": {
        "Rarity": "Common",
        "Abilities": [
            {
                "ID": 18,
                "Self defense": "deals 1 damage to an opposing card"
            },
            {
                "ID": 19,
                "Persuade": "allows you to use an opposing card as your own for two turns, but discards the scholar"
            }
        ],
        "Health": 2,
        "Rating": 5,
        "Art Ready?": "",
        "Music": "",
        "Sound Effects": ""
    },
    "Woodsman": {
        "Rarity": "Common",
        "Abilities": [
            {
                "ID": 20,
                "Woodland defense": "deals 3 damage to an opposing card"
            },
            {
                "ID": 21,
                "Natural Instinct": "allows you to view one random card from your opponents hand (can only be used once)"
            }
        ],
        "Health": 3,
        "Rating": 5,
        "Art Ready?": "In progress",
        "Music": "",
        "Sound Effects": ""
    }
}; //This will eventually get all of the cards possible and their data!!
let yourCards = []; //This will eventually be a list of all the cards you have.
let activeDeck = 0; //Ths will eventually be the ID (if you will) of the deck that you are currently using.
let decks = []; //This will eventually be decks that you have.
let activeDeckPlayerTwo = 1;