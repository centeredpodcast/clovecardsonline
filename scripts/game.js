//$("h1").html("Hello!") //This is just filler stuff.

const cards = {
    "Desert Caravan": {
        "ID": 0,
        "Rarity": "Common",
        "Abilities": [
            {
                "ID": 0,
                "Name": "Barter",
                "Description": "choose one random card in your opponents hand and use it as your own until it is discarded. Upon playing this move, discard Desert Caravan",
                "Badge": "Barter.png",
                "Type": "takeCard"
            },
            {
                "ID": 1,
                "Name": "Roadkill",
                "Description": "deal 2 damage to an opposing card",
                "Badge": "Roadkill.png",
                "Type": "basic"
            }
        ],
        "Health": 3,
        "Rating": 5,
        "Art Ready?": "Yes",
        "Music": "",
        "Sound Effects": "",
        "Art": "Desert_Caravan.png"
    },
    "Novice Explorer": {
        "ID": 1,
        "Rarity": "Common",
        "Abilities": [
            {
                "ID": 2,
                "Name": "Expedition",
                "Description": "allows you to play an extra card in your turn. Once this ability has been used twice, Novice Explorer is discarded",
                "Badge": "Expedition.png",
                "Type": "playCard"
            }
        ],
        "Health": 3,
        "Rating": 5,
        "Art Ready?": "Yes",
        "Music": "",
        "Sound Effects": "",
        "Art": "Novice_Explorer.png"
    },
    "Mooshlett": {
        "ID": 2,
        "Rarity": "Common",
        "Abilities": [
            { 
                "ID": 3,
                "Name": "Spread the Spore",
                "Description": "deals 2 damage to an opposing card, and generates a copy of this card, which cannot be used until your next turn.",
                "Badge": false,
                "Type": "basic"
            }
        ],
        "Health": 2,
        "Rating": 5,
        "Art Ready?": "Yes",
        "Music": "",
        "Sound Effects": "",
        "Art": "Mooshlett.png"
    },
    "Northern Tribesman": {
        "ID": 3,
        "Rarity": "Common",
        "Abilities": [
            { 
                "ID": 4,
                "Name": "Arctic Slash",
                "Description": "deals 3 damage to an opposing card",
                "Badge": false,
                "Type": "basic"
            },
            { 
                "ID": 5,
                "Name": "Whirlwind",
                "Description": "deals 2 damage to two opposing cards in play, but takes 2 health from Northern Tribesman",
                "Badge": false,
                "Type": "multipleBasic"
            }
        ],
        "Health": 4,
        "Rating": 5,
        "Art Ready?": "Yes",
        "Music": "",
        "Sound Effects": "",
        "Art": "Northern_Tribesman.png"
    },
    "Mechanic": {
        "ID": 4,
        "Rarity": "Common",
        "Abilities": [
            {
                "ID": 6,
                "Name": "Tune Up",
                "Description": "gives every other card you have in play 1 additional health point",
                "Badge": false,
                "Type": "multipleHeal"
            },
            {
                "ID": 7,
                "Name": "Passion Project",
                "Description": "gives one other card you have in play 3 additional health points.",
                "Badge": false,
                "Type": "heal"
            }
        ],
        "Health": 3,
        "Rating": 5,
        "Art Ready?": "",
        "Music": "",
        "Sound Effects": "",
        "Art": ""
    },
    "Outlaw": {
        "ID": 5,
        "Rarity": "Common",
        "Abilities": [
            { 
                "ID": 8,
                "Name": "Kidnap",
                "Description": "deals 2 damage and prevents one opposing card from using any abilities in the next turn",
                "Badge": false,
                "Type": "basic"
            },
            {
                "ID": 9,
                "Name": "Never Surrender",
                "Description": "allows you to allocate 4 damage in any way across all the cards your opponent has in play, but discards the Outlaw.",
                "Badge": false,
                "Type": "multipleBasic"
            }
        ],
        "Health": 4,
        "Rating": 5,
        "Art Ready?": "",
        "Music": "",
        "Sound Effects": "",
        "Art": "Outlaw.png"
    },
    "Snow Spirit": {
        "ID": 6,
        "Rarity": "Common",
        "Abilities": [
            {
                "ID": 10,
                "Name": "Snowy Embrace",
                "Description": "choose one other card you have in play; your opponent cannot attack this card during the next turn",
                "Badge": false,
                "Type": "protect"
            },
            {
                "ID": 11,
                "Name": "Arctic Fury",
                "Description": "deals 2 damage to an opposing card",
                "Badge": false,
                "Type": "basic"
            }
        ],
        "Health": 5,
        "Rating": 5,
        "Art Ready?": "Yes",
        "Music": "",
        "Sound Effects": "",
        "Art": "Snow_Spirit.png"
    },
    "Tundra Fox": {
        "ID": 7,
        "Rarity": "Common",
        "Abilities": [
            {
                "ID": 12,
                "Name": "Leap of Faith",
                "Description": "has a 50/50 chance of dealing 2 damage to an opposing card",
                "Badge": false,
                "Type": "basic"
            },
            {
                "ID": 13,
                "Name": "Burrow",
                "Description": "prevents your opponent from attacking Tundra Fox during the next turn",
                "Badge": false,
                "Type": "protect"
            }
        ],
        "Health": 2,
        "Rating": 5,
        "Art Ready?": "",
        "Music": "",
        "Sound Effects": "",
        "Art": ""
    },
    "Peace Keeper": {
        "ID": 8,
        "Rarity": "Common",
        "Abilities": [
            {
                "ID": 14,
                "Name": "Devil's Advocate",
                "Description": "deals 3 damage to an opposing card",
                "Badge": false,
                "Type": "basic"
            },
            {
                "ID": 15,
                "Name": "Negotiations",
                "Description": "choose one card you have in play; if your opponent attacks this card during their next turn, the card will receive two less damage.",
                "Badge": false,
                "Type": "reduce"
            }
        ],
        "Health": 5,
        "Rating": 5,
        "Art Ready?": "In progress",
        "Music": "",
        "Sound Effects": "",
        "Art": "Peacekeeper.png"
    },
    "Street Theif": {
        "ID": 9,
        "Rarity": "Common",
        "Abilities": [
            {
                "ID": 16,
                "Name": "One With the Shadows",
                "Description": "prevents your opponent from attacking the street thief during the next turn, and gives it one additional health point",
                "Badge": false,
                "Type": "protect"
            },
            {
                "ID": 17,
                "Name": "Hijack",
                "Description": "allows the street thief to perform any ability that the opposing cards in play have; but discards street thief ",
                "Badge": false,
                "Type": "possess"
            }
        ],
        "Health": 2,
        "Rating": 5,
        "Art Ready?": "",
        "Music": "",
        "Sound Effects": "",
        "Art": "Street_Thief.png"
    },
    "Scholar": {
        "ID": 10,
        "Rarity": "Common",
        "Abilities": [
            {
                "ID": 18,
                "Name": "Self Defense",
                "Description": "deals 1 damage to an opposing card",
                "Badge": false,
                "Type": "basic"
            },
            {
                "ID": 19,
                "Name": "Persuade",
                "Description": "allows you to use an opposing card as your own for two turns, but discards the scholar",
                "Badge": false,
                "Type": "takeCard"
            }
        ],
        "Health": 2,
        "Rating": 5,
        "Art Ready?": "",
        "Music": "",
        "Sound Effects": "",
        "Art": "Scholar.png"
    },
    "Woodsman": {
        "ID": 11,
        "Rarity": "Common",
        "Abilities": [
            {
                "ID": 20,
                "Name": "Woodland Defense",
                "Description": "deals 3 damage to an opposing card",
                "Badge": false,
                "Type": "basic"
            },
            {
                "ID": 21,
                "Name": "Natural Instinct",
                "Description": "allows you to view one random card from your opponents hand (can only be used once)",
                "Badge": "Natural_Instinct.png",
                "Type": "see"
            }
        ],
        "Health": 3,
        "Rating": 5,
        "Art Ready?": "In progress",
        "Music": "",
        "Sound Effects": "",
        "Art": "Woodsman.png"
    }
}; //This will eventually get all of the cards possible and their data!!
let yourCards = []; //This will eventually be a list of all the cards you have.
let activeDeck = 0; //Ths will eventually be the ID (if you will) of the deck that you are currently using.
let decks = []; //This will eventually be decks that you have.
let activeDeckPlayerTwo = 1;