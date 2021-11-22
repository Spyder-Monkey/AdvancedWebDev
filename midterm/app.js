// Rules:
// Scissors cuts Paper
// Scissors decapitates Lizard
// Paper covers Rock
// Paper disproves Spock
// Rock crushes Scissors
// Rock crushes Lizard
// Lizard eats Paper
// Lizard poisons Spock
// Spock smashes Scissors
// Spock vaporizes Rock

// DOM Settings
var userScore = 0;
var computerScore = 0;
var userScore_span = document.getElementById("user-score");
var computerScore_span = document.getElementById("computer-score");
var result_output = document.querySelector(".result p");
var rock = document.getElementById("rock");
var paper = document.getElementById("paper");
var scissors = document.getElementById("scissors");
var lizard = document.getElementById("lizard");
var spock = document.getElementById("spock");
var endGame = document.getElementById("game-over");

//var moves = ["r", "p", "s", "l", "v"];

// Function to get the computer's move
// r = rock, p = paper, s = scissors, l = lizard, v = spock
function getComputerMove() {
	var moves = ["r", "p", "s", "l", "v"];
	var choice = Math.floor(Math.random()*5);
	return moves[choice];
}

function game(userMove) {
	var computer = getComputerMove();

	switch(userMove + computer) {
		// User wins
		case "sp":
		case "sl":
		case "pr":
		case "pv":
		case "rs":
		case "rl":
		case "lp":
		case "lv":
		case "vs":
		case "vr":
			win(userMove, computer);
			break;
		// User loses
		case "ps":
		case "ls":
		case "rp":
		case "vp":
		case "sr":
		case "lr":
		case "pl":
		case "vl":
		case "sv":
		case "rv":
			lose(userMove, computer);
			break;
		// User and Computer tie
		case "rr":
		case "pp":
		case "ss":
		case "ll":
		case "vv":
			tie();
			break;
	}
}

// Function for when user wins
function win(userMove, computerMove) {
	userScore++; // Increment userScore by 1
	userScore_span.innerText = userScore; // Update user score span
	// End game if user's score equals 10
	if(userScore>9) gameOver();

	let winner = "You win!";
	let output = "";

	// Output correct game result
	if(userMove=='r') output = `Rock crushes ${computerMove=='s' ? 'Scissors' : 'Lizard'}! ${winner}`;
	else if(userMove=='p') output = `Paper ${computerMove=='r' ? 'covers Rock' : 'disproves Spock'}! ${winner}`;
	else if(userMove=='s') output = `Scissors ${computerMove=='p' ? 'cuts Paper' : 'decapitates Lizard'}! ${winner}`;
	else if(userMove=='l') output = `Lizard ${computerMove=='p' ? 'eats Paper' : 'poisons Spock'}! ${winner}`;
	else if(userMove=='v') output = `Spock ${computerMove=='s' ? 'smashes Scissors' : 'vaporizes Rock'}! ${winner}`;
	// Update result output 
	result_output.innerText = output;
}
// Function used for when user loses to computer
function lose(userMove, computerMove) {
	computerScore++; // Increment computerScore by 1
	computerScore_span.innerText = computerScore; // Update computer score span
	// End game is computer score equals 10
	if(computerScore>9) gameOver();

	let loser = "You lose!"; // Used for String template literal
	let output = ""; // Holds output text for result

	// Output correct game result
	if(computerMove=='r') output = `Rock crushes ${userMove=='s' ? 'Scissors' : 'Lizard'}! ${loser}`;
	else if(computerMove=='p') output = `Paper ${userMove=='r' ? 'covers Rock' : 'disproves Spock'}! ${loser}`;
	else if(computerMove=='s') output = `Scissors ${userMove=='p' ? 'cuts Paper' : 'decapitates Lizard'}! ${loser}`;
	else if(computerMove=='l') output = `Lizard ${userMove=='p' ? 'eats Paper' : 'poisons Spock'}! ${loser}`;
	else if(computerMove=='v') output = `Spock ${userMove=='s' ? 'smashes Scissors' : 'vaporizes Rock'}! ${loser}`;
	// Update result output 
	result_output.innerText = output;
}
// Function used for when user and computer choose same move.
function tie() {
	result_output.innerText = "Tie! Play again!";
}

var rockEvent = function(){game("r");};
var paperEvent = function(){game("p");};
var scissorsEvent = function(){game("s");};
var lizardEvent = function(){game("l");};
var spockEvent = function(){game("v");};

// Add event listener to rock
rock.addEventListener("click", rockEvent);
// Add event listener to paper
paper.addEventListener("click", paperEvent);
// Add event listener to scissors
scissors.addEventListener("click", scissorsEvent);
// Add event listener to lizard
lizard.addEventListener("click", lizardEvent);
// Add event listener to spock
spock.addEventListener("click", spockEvent);

// Function to remove event listeners when user or computer reach a score of 10
function gameOver() {
	rock.removeEventListener("click", rockEvent);
	paper.removeEventListener("click", paperEvent);
	scissors.removeEventListener("click", scissorsEvent);
	lizard.removeEventListener("click", lizardEvent);
	spock.removeEventListener("click", spockEvent);
	newGame();
}

// Function used for creating a new game
function newGame() {
	// Set win/lose label according to score
	if(userScore > computerScore) document.getElementById("win-lose").innerText = 'Winner!';
	else document.getElementById("win-lose").innerText = 'Loser!';
	// Make Play again button and win/lose label visible
	endGame.style.visibility = 'visible';
}
