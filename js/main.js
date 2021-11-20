/*----- constants -----*/


/*----- app's state (variables) -----*/


/*----- cached element references -----*/


/*----- event listeners -----*/


/*----- functions -----*/

// Constants
const suits = ['s', 'c', 'd', 'h'];
const ranks = ['02', '03', '04', '05', '06', '07', '08', '09', '10', 'J', 'Q', 'K', 'A'];
const cardLookup = {
  "J": 11,
  "Q": 12,
  "K": 13,
  "A": 14
}
const masterDeck = buildMasterDeck();

/*----- app's state (variables) -----*/
let shuffledDeck; // gives back 

function init() {
  shuffledDeck = getNewShuffledDeck(); // giving us array of cards, each card is obj (array of obj)
}

function buildMasterDeck() {
  const deck = [];
  // Use nested forEach to generate card objects
  suits.forEach(function(suit) {
    ranks.forEach(function(rank) {
      deck.push({
        // The 'face' property maps to the library's CSS classes for cards
        face: `${suit}${rank}`,
        // Setting the 'value' property for war
        value: Number(rank) || cardLookup[rank]
      });
    });
  });
  return deck;
}


function getNewShuffledDeck() {
  // Create a copy of the masterDeck (leave masterDeck untouched!)
  const tempDeck = [...masterDeck];
  const newShuffledDeck = [];
  while (tempDeck.length) {
    // Get a random index for a card still in the tempDeck
    const rndIdx = Math.floor(Math.random() * tempDeck.length);
    // Note the [0] after splice - this is because splice always returns an array and we just want the card object in that array
    newShuffledDeck.push(tempDeck.splice(rndIdx, 1)[0]);
  }
  return newShuffledDeck;
}