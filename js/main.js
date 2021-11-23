/*----- constants -----*/
//WAR RULES 
//1. deck divided evenly, 26 each player cards are placed face down  
//2. Players turn up cards at the same time, player with higher card takes both cards, places them faxce down at bottom of his deck
//3.if cards same rank, war! each player turns up 1 card face down, one face up, player w higher card takes all 6
//3 continued-- if in war, and both cards are same rank, both players place another card face down and another face up, player with higher card takes all 10 and so forth  
//4. game ends when 1 player takes all cards  


/*----- app's state (variables) -----*/


/*----- cached element references -----*/


/*----- event listeners -----*/


/*----- functions -----*/

// Constants
const suits = ['s', 'c', 'd', 'h'];//spades clubs diamonds hearts
const ranks = ['02', '03', '04', '05', '06', '07', '08', '09', '10', 'J', 'Q', 'K', 'A'];
const cardLookup = {
  "J": 11, // these were assigned a value because all other cards containt heir own value 
  "Q": 12,
  "K": 13,
  "A": 14
}
const masterDeck = buildMasterDeck();
function fillArray() {
  let deck = [];
  for (let i = 0; i < 52; i++)
  deck[i] = i;
  shuffle(deck);
  splitCards
}


/*----- app's state (variables) -----*/
let shuffledDeck; // gives back 

function init() {//starts the whole thing 
  shuffledDeck = getNewShuffledDeck(); // giving us array of cards, each card is obj (array of obj)
}

function buildMasterDeck() { // starts array on l 34
  const deck = [];
  // Use nested forEach to generate card objects
  suits.forEach(function(suit) { // iterates through each s c d h
    ranks.forEach(function(rank) { // iterates through ranks j q k a line 36 37 will combne all cards i.e ranks + suits
      deck.push({ // still within ranks pushing each combo into deck array on line 34 
        // The 'face' property maps to the library's CSS classes for cards
        face: `${suit}${rank}`,
        // Setting the 'value' property for war
        value: Number(rank) || cardLookup[rank]
      });
    });
  });
  return deck;
}




function getNewShuffledDeck() { // 
  // Create a copy of the masterDeck (leave masterDeck untouched!)
  const tempDeck = [...masterDeck]; // creates copy of master deck without fucking up master deck 
  const newShuffledDeck = []; // shuffles into an array 
  while (tempDeck.length) { // as long as theirs still cards on tempdeck (line 52) will do code inside of while loop til line 59
    // Get a random index for a card still in the tempDeck
    const rndIdx = Math.floor(Math.random() * tempDeck.length);
    // Note the [0] after splice - this is because splice always returns an array and we just want the card object in that array
    newShuffledDeck.push(tempDeck.splice(rndIdx, 1)[0]); // splice takes idx out of array completely. once removes oushes new card into shuffled deck on line 53
  }
  return newShuffledDeck;
}

//let player deck = array / let computer deck = array 
// from 0 idx - 25 idx give to computer and 26 idx to 52 give to player

//below code will come in handy (w its faults) on getting cards flipped upside/downside during game
//for ( i = 0; i <= hand.length; i++) {
//   if (i === 0 || i === 4) {
//     container[i].className = `card ${hand[1].face} card-container`;
//   }if (i > 1 && i < 4)
// }else {
  // container[i].className = `card back card-container`;
}

//create id's in html for cards that we can access through JS 