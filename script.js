// Declare variables
var totalScore, roundScore, activePlayer, dice, playGame;

// Initialize the game
newStart();

function newStart() {
  // Reset scores and player states
  totalScore = [0, 0];
  roundScore = 0;
  activePlayer = 0;
  playGame = true;
  
  // Reset displayed scores to 0
  document.getElementById("totalScorePlayer-0").textContent = 0;
  document.getElementById("totalScorePlayer-1").textContent = 0;
  document.getElementById("currentScore-0").textContent = 0;
  document.getElementById("currentScore-1").textContent = 0;

  // Hide the dice image
  document.querySelector(".diceImage").style.display = "none";

  // Set player names
  document.querySelector("#name-0").textContent = "Player 1 score";
  document.querySelector("#name-1").textContent = "Player 2 score";

  // Set the first player as active
  document.querySelector(".totalScore0").classList.add("active");
  document.querySelector(".totalScore1").classList.remove("active");
}

// Roll the dice
document.querySelector(".roolDice").addEventListener("click", function() {
  if (playGame) {
    // Generate a random number between 1 and 6
    var dice = Math.ceil(Math.random() * 6);

    // Display the corresponding dice image
    var diceElement = document.querySelector(".diceImage");
    diceElement.style.display = "block";
    console.log(diceElement.src = "./img/" + dice + ".jpg");

    // Update round score unless a 1 is rolled
    if (dice !== 1) {
      roundScore = roundScore + dice;
      document.getElementById("currentScore-" + activePlayer).textContent = roundScore; 
    } else {
      // Switch to the next player
      nextPlayer();
    }
  }
});

function nextPlayer() {
  // Switch active player
  if (activePlayer === 0) {
    activePlayer = 1;
  } else {
    activePlayer = 0;
  }
  
  // Reset round score
  roundScore = 0;
  
  // Reset current score display
  document.getElementById("currentScore-0").textContent = 0;
  document.getElementById("currentScore-1").textContent = 0;
  
  // Hide the dice image
  document.querySelector(".diceImage").style.display = "none";  
  
  // Toggle active class for player scores
  document.querySelector(".totalScore0").classList.toggle("active");
  document.querySelector(".totalScore1").classList.toggle("active");
}

// Hold the current score
document.querySelector(".holdScore").addEventListener("click", function() {
  if (playGame) {
    // Add the current score to the total score
    totalScore[activePlayer] = totalScore[activePlayer] + roundScore;

    // Update the total score display
    document.getElementById("totalScorePlayer-" + activePlayer).textContent = totalScore[activePlayer];

    // Check if the player has won
    if (totalScore[activePlayer] >= 100) {
      // Display the winner message
      document.querySelector("#name-" + activePlayer).textContent = "Winner Winner";

      // Hide the dice image
      document.querySelector(".diceImage").style.display = "none"; 

      // End the game
      playGame = false;
    } else {
      // Switch to the next player
      nextPlayer();
    }
  }
});

// Start a new game
document.querySelector(".newGame").addEventListener("click", newStart);
