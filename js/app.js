/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * app.js */


let game='';

const startBtn = document.getElementById('btn__reset');
const keyboardKeys = document.querySelectorAll('.key');

// On load, put focus on the startBtn, in case user is using the keyboard
startBtn.focus();

// If user clicks startBtn, start game
startBtn.addEventListener('click', function(event){
	game = new Game();
	game.startGame();
});

startBtn.addEventListener('keydown', function(event){
	// if user presses enter, start the game
	if(event.keyCode === 13){
		game = new Game();
		game.startGame();
	} else {
		// Prevents users on their keyboard from falsely making guesses before the board is ready
		alert('You must click the button or press enter to start');
	}
});

// Add click handler to each onscreen keyboard key
keyboardKeys.forEach(key=>{
	key.addEventListener('click', function(event){
		game.handleInteraction(this, event);
	});	
})

// Add keydown handler to each onscreen keyboard key
document.addEventListener('keydown', function(event){
	// On load, put focus on the Q from the screen keyboard so keys will work
	document.querySelector('.keyrow').firstElementChild.focus;
	if(event.keyCode >= 65 && event.keyCode <= 90){
		game.handleInteraction(this, event);
	}
});