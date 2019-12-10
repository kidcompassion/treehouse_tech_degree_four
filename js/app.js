/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * app.js */


let game='';

const startBtn = document.getElementById('btn__reset');
const keyboardKeys = document.querySelectorAll('.key');

startBtn.focus();

startBtn.addEventListener('click', function(event){
	game = new Game();
	game.startGame();
});

startBtn.addEventListener('keydown', function(event){
	if(event.keyCode === 13){
		game = new Game();
		game.startGame();
	}
});



keyboardKeys.forEach(key=>{
	key.addEventListener('click', function(event){
		game.handleInteraction(this, event);
	});	
})

document.addEventListener('keydown', function(event){
	document.querySelector('.keyrow').firstElementChild.focus;
	if(event.keyCode >= 65 && event.keyCode <= 90){
		game.handleInteraction(this, event);
	}
});