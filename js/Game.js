/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * Game.js */

 class Game {

 	constructor() {
 		this.missed = 0;
 		this.phrases = this.createPhrases();
		this.activePhrase = null;
 	}

 	startGame() {
		// Reset game on every start, to ensure user always gets a new screen
		game.resetGame();
		//set up active phrase object
		this.activePhrase = new Phrase(game.getRandomPhrase());
		// toggle off the start overlay
		const introOverlay = document.getElementById('overlay');
		introOverlay.style.display = 'none';
		//Render the game board
		this.activePhrase.addPhraseToDisplay();
	 }
	 

	 resetGame(){
		// First, remove all phrase tiles, to ensure a new board to play on
		const oldPhrase = document.querySelector('#phrase ul');
		oldPhrase.innerHTML = '';

		// Next, grab all the button keys and loop through them, removing...
		const keys = document.querySelectorAll('.key');
	
		keys.forEach(key=>{ 
			// Any WRONG class
			key.classList.remove('wrong');
			// Any CHOSEN class
			key.classList.remove('chosen');
			// ...and re-enabling the buttons
			key.disabled = false;
		});

		// Grab the hearts and reset them since player has another 5 lives
		const hearts = document.querySelectorAll('#scoreboard ol li');
		// Loop through hearts and reset the image src attributes to show libe hearts
		hearts.forEach(heart=>{
			heart.firstElementChild.setAttribute('src', 'images/liveHeart.png');
		})
	 }


	 /*
	 * Selects random phrase from phrases property 
	 * @return {Object} Phrase object chosen to be used 
	 */

 	getRandomPhrase() {
		// generate random # from 1-5
		let randomNum = Math.ceil( Math.random() * 5 ) -1 ;
		// retrieve that index out ofthe array
		return this.phrases[randomNum];
 	}

	 /** 
	  * Creates phrases for use in game 
	  * @return {array} An array of phrases that could be used in the game 
	  * */

	createPhrases(){
		this.phrases = [
			'A Career That Spanned Generations',
			'Academy Awards Host',
			'Josie And The Pussycats In Outer Space',
			'Copies Of My Transcripts',
			'Pasta Maker'
		];
		return this.phrases;
	}

	/**
	 * Get the user's guess based on click event
	 * @param {Object} event 
	 */
	getUserGuess(event){
		game.updateKeyState(event, this.activePhrase.checkLetter(event.target.innerHTML));
		game.checkForWin();
	}

	/**
	 * Upon guess, determines whether the guess was right or wrong, disabled the key and adds appropriate class
	 * 
	 * @param {Object} event 
	 */

	updateKeyState(event, letter){
		// Check the boolean in the checkLetter method, so we can tell if it was a match or an error
		if(letter=== false){
			// If it's an error, add the WRONG class
			event.target.classList.add('wrong');
		} else if (letter === true) {
			// If it's an match, add the CHOSEN class
			event.target.classList.add('chosen');
		}
		//Disable the selected letter’s onscreen keyboard button.
		event.target.disabled = true;
	}

 	handleInteraction() {
		this.getUserGuess(event);
	 }
	 



 	removeLife() {
		// Max number of attempts
		const permittedAttempts = 4;
		
		//Grab the hearts so we can replace the child images
		const hearts = document.querySelectorAll('#scoreboard ol li');
		console.log(this.missed);
		// Use attribute setter so we can show the missing life
		hearts[this.missed].firstElementChild.setAttribute('src', 'images/lostHeart.png');
		this.missed++;
		
		//Check total amount of incorrect guesses against permittedAttempts
		if(this.missed > permittedAttempts){
			//If there are 5 error, game over
			console.log('error');
			this.gameOver(false); 
		}
		//if this isn't a match
		
		//this.missed++;
		// start counter
		// remove heart png and replace it

		//if counter == 5, run the end game
 		/* removeLife(): this method removes a life from the scoreboard, by replacing one of the liveHeart.png images with a lostHeart.png image (found in the images folder) and increments the missed property. If the player has five missed guesses (i.e they're out of lives), then end the game by calling the gameOver() method.*/
		
 	}

 	checkForWin() {
		// console.log('fires');
		const letters = document.querySelectorAll('#phrase ul .letter');
		const totalLetter = letters.length;
		const totalShow = document.querySelectorAll('.show').length;
		if(totalLetter === totalShow ){
			this.gameOver(true);
		}
 	}

 	gameOver(gameWon) {
		const introOverlay = document.getElementById('overlay');
		introOverlay.style.display='flex';
		if(gameWon === false){
			introOverlay.querySelector('h1').innerHTML ='Sorry, you lose';
			introOverlay.classList.remove('start');
			introOverlay.classList.add('lose');
			//console.log('game over');
		}
		if(gameWon===true){
			introOverlay.querySelector('h1').innerHTML ='Hooray, you win';
			introOverlay.classList.remove('start');
			introOverlay.classList.add('win');
			//console.log('won');
		}
 		/* this method displays the original start screen overlay, and depending on the outcome of the game, updates the overlay h1 element with a friendly win or loss message, and replaces the overlay’s start CSS class with either the win or lose CSS class.*/
		
 	}

 }