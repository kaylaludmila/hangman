///global variables///

var wordBank = ['ocean','mermaid','lobster','reef','coral','shark','whale','waves','shipwreck'];
var targetWord = "";
var targetWordArray = [];
var blanksAndLetters = [];
var lossCounter = 0;
var winCounter = 0;
var guessesRemain = 10;
var wrongLetters = [];


///functions//

function startGame()
{
	targetWord = wordBank[Math.floor(Math.random()* wordBank.length)];
	targetWordArray = targetWord.split("");
	
	for(var j = 0; j < targetWordArray.length; j++)
	{
		blanksAndLetters.push("_");
	}
	document.getElementById("wordToGuess").innerHTML = blanksAndLetters.join(" ");
	document.getElementById('guessesRemain').innerHTML = guessesRemain;
	document.getElementById('lossCounter').innerHTML = lossCounter;
	document.getElementById('winCounter').innerHTML = winCounter;
	document.getElementById('wrongLetters').innerHTML = wrongLetters; 
}

function checkLetter (letter)
{
	var isInWord = false;

	for(var i = 0; i < targetWordArray.length; i++)
	{
		if(letter == targetWordArray[i] ) {
			isInWord	= true;
			blanksAndLetters[i] = targetWordArray[i];
			document.getElementById('wordToGuess').innerHTML = blanksAndLetters.join(" ");
		}
	}

	if (isInWord == false)
	{
		if (wrongLetters.includes(letter) == false) {
			guessesRemain--;
			wrongLetters.push(letter);
		}
		document.getElementById('guessesRemain').innerHTML = guessesRemain; 
		document.getElementById('wrongLetters').innerHTML = wrongLetters.join(" ");
	}
	if (guessesRemain <= 0)
	{
		alert("Game Over, You Lose!");
		lossCounter++;
		document.getElementById('lossCounter').innerHTML = lossCounter;
		guessesRemain = 10;
		blanksAndLetters = [];
		wrongLetters = [];
		startGame();
	}
	
	var dashCheck = false;

	for (var i = 0; i < blanksAndLetters.length; i++)
		{ 
			if (blanksAndLetters[i] == "_") { 
					dashCheck = true;
			}
		}
		if (dashCheck == false) {
				alert("You win!");
				winCounter++;
				document.getElementById('winCounter').innerHTML = winCounter;
				guessesRemain = 10;
				blanksAndLetters = [];
				wrongLetters = [];
				startGame();
			}
} 

/////Main program///
startGame(); 

document.onkeyup = function(event) {
	var userGuess = String.fromCharCode(event.keyCode).toLowerCase();
	console.log(userGuess);
	checkLetter(userGuess);
}
