/*----- constants -----*/
const suits = ['s', 'c', 'd', 'h'];//spades clubs diamonds hearts
const ranks = ['02', '03', '04', '05', '06', '07', '08', '09', '10', 'J', 'Q', 'K', 'A'];
const cardLookup = {
  "J": 11, // these were assigned a value because all other cards contain their own value 
  "Q": 12,
  "K": 13,
  "A": 14
}

const masterDeck = buildMasterDeck();
//war rules
//1. deck divided evenly, 26 each player cards are placed face down  
//2. Players turn up cards at the same time, player with higher card takes both cards, places them faxce down at bottom of his deck
//3.if cards same rank, war! each player turns up 1 card face down, one face up, player w higher card takes all 6
//3 continued-- if in war, and both cards are same rank, both players place another card face down and another face up, player with higher card takes all 10 and so forth  
//4. game ends when 1 player takes all cards  

/*----- app's state (variables) -----*/
let shuffledDeck, pDeck, cDeck, pHand, cHand, cPoints, pPoints;




/*----- cached element references -----*/
let message = document.getElementById("message")
let playerScoreEl = document.getElementById("playerScore")
let computerScoreEL = document.getElementById("computerScore")
let button = document.getElementById("draw-card")
let winner = document.getElementById('winner')

/*----- event listeners -----*/
// document.getElementById("draw-card").addEventListener("click", drawCard);
button.addEventListener("click", drawCard)

/*----- functions -----*/
init()



function init() {//starts the whole thing .. these are function definitions they are only executed when you invoke it  
  shuffledDeck = getNewShuffledDeck();
  pDeck = shuffledDeck.splice(0, 26) //taking 26 card sout of deck
  cDeck = shuffledDeck // only 26 cards left that are assigned to computer
  pHand = []
  cHand = []
  pPoints = 0
  cPoints = 0

}

function drawCard() {
  let drawnComputer = cDeck.pop();
  cHand.push(drawnComputer);
  let drawnPlayer = pDeck.pop();
  pHand.push(drawnPlayer);
  document.getElementById("computer").className = `card ${drawnComputer.face}`; //grabs html id element of 'computer' & assigns html class to it = to 'card comp face etc
  document.getElementById("player").className = `card ${drawnPlayer.face}`;
  compareCards(drawnComputer.value, drawnPlayer.value);
  takeAll(drawnPlayer, drawnComputer);
checkWinner();
}


function takeAll(playerCard, computerCard){
  if (playerCard.value > computerCard.value) {
    pHand.push(computerScoreEL)
  } else if (computerCard.value > playerCard.value) {
    cHand.push(playerCard);
  } else {
    pHand.push(playerCard);
    cHand.push(computerCard);

  }
  
}

function compareCards(compCardValue, playerCardValue) {
  if (compCardValue === playerCardValue) {
  message.innerHTML = "Tie!";
  } else if (compCardValue > playerCardValue) {
    cPoints++;
    computerScoreEL.innerHTML = cPoints;
    message.innerHTML = "Computer wins!";

  } else {
    pPoints++;
    playerScoreEl.innerHTML = pPoints;
   message.innerHTML = "Player wins!";

  }
}


function checkWinner() {
  if (pPoints === 10) {
    winner.innerHTML = "Computer Lost, the Player Wins!";
    console.log("Computer Lost, the Player Wins!")
    document.getElementById('draw-card').disabled = true;
  }
  else if (cPoints === 10) {
    winner.innerHTML = "Player Lost, the Computer Wins!";
    console.log("Player Lost, the Computer Wins!")
    document.getElementById('draw-card').disabled = true;
  }
}


  //   if (pPoints === 10 && cPoints <= 10){
    
//     console.log("Player wins!");
//  } else if (cPoints === 10 || pPoints <= 10){
  
//   console.log("Computer wins!")

//   }else{
//     console.log("tie!")
//   }
// }













function buildMasterDeck() { // starts array on l 34
  const deck = [];
  // Use nested forEach to generate card objects
  suits.forEach(function (suit) { // iterates through each s c d h
    ranks.forEach(function (rank) { // iterates through ranks j q k a line 36 37 will combne all cards i.e ranks + suits
      deck.push({ // still within ranks pushing each combo into deck array on line 34 
        // The 'face' property maps to the library's CSS classes for cards
        face: `${suit}${rank}`,
        // Setting the 'value' property for war
        value: Number(rank) || cardLookup[rank] //this grabs string oh rank and adds a number to it bc js cannot interpret it as a # but does so as a str. this fixes that
        
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


//create id's in html for cards that we can access through JS 