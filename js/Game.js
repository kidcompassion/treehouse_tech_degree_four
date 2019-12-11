/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * Game.js */

 class Game {

 	constructor() {
		this.missed = 0;
 		this.phrases = this.createPhrases();
		this.activePhrase = null;
 	}

	/**
	* Begins game by selecting a random phrase and displaying it to user
	*/

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
	

	
	/*
	* Selects random phrase from phrases property 
	* @return {Object} Phrase object chosen to be used 
	*/

	getRandomPhrase() {
		// generate random # from 1-5
		let randomNum = Math.ceil( Math.random() * 5 ) -1 ;
		// retrieve and return that index out ofthe array
		return this.phrases[randomNum].phrase;
 	}


	/**
	 * Test phrases to make sure they only contain spaces and letters
	 * @param (phrases) An array of phrases to be validated for letters and spaces
	 * @return [Array] array of phrases that have been tested to make sure they contain correct characters
	 */

	testPhrases(possiblePhrases){
		// Create regEx verifying phrases have spaces and letters only
		let regEx = /^[a-zA-Z\s]*$/; 
		
		//Create array to hold phrases that pass the test
		let approvedPhrases = [];

		//Filter phrase strings based on regex pass/fail
		approvedPhrases = possiblePhrases.filter(possiblePhrase => regEx.test(possiblePhrase)=== true);
									
		return approvedPhrases;
	}

	/** 
	 * Creates phrases for use in game 
	 * @return {array} An array of phrases that could be used in the game 
	 * */

	createPhrases(){

		// Create list of possible phrases to validate
		let allPhrases = [
			'A Career That Spanned Generations',
			'Academy Awards Host',
			'Josie And The Pussycats In Outer Space',
			'Copies Of My Transcripts',
			'Pasta Maker'
		];
		
		// Validate the phrases to make sure they only have spaces and letters
		let testedPhrases = this.testPhrases(allPhrases);
		
		// Array to hold validated phrase objects
		let approvedPhrases = [];

		// Loop through each phrase string and pass it into an Object
		testedPhrases.map(approved=>{
			//..then pass object into an array
			approvedPhrases.push(new Phrase(approved));
		});
		
		//Set value of this.phrases to the array of tested phrase objects
		this.phrases = approvedPhrases;

		return this.phrases;
	}


	/**
	 * Clears the old game tiles and all keyboard classes for selected letters.
	 * Re-enables all keys
	 */

	resetGame(){
		// Remove all phrase tiles, to ensure a new board to play on
		const oldPhrase = document.querySelector('#phrase ul');
		oldPhrase.innerHTML = '';

		// Grab all the button keys and loop through them, removing...
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
		});
	}


	addDataAttrToKeys(){
		const allKeys = document.querySelectorAll('.key');
		allKeys.forEach(key=>{
			key.setAttribute('data-value', key.innerHTML);
		});
	}

	
	/**
	* Handles onscreen keyboard button clicks
	* @param (HTMLButtonElement) button - The  button element
	* @param (Object) event - whether the user clicked the button or used the keydown
	*/
	
	 handleInteraction(button, event) {
		// Add a data attribute to all keys for easier access via keyboard
		this.addDataAttrToKeys();

		// Determine whether user is clicking or using the keyboard
		if(event.type === 'click'){
			
			// Disable selected button
			button.disabled = true;

			if(this.activePhrase.checkLetter(button.innerHTML)=== false){
			
				// If guess is an error, add the WRONG class
				button.classList.add('wrong');
			
			} else if (this.activePhrase.checkLetter(button.innerHTML) === true) {
				
				// If checkForWin method is true, run game over method
				if (game.checkForWin() === true){
					this.gameOver(true);
				};
			
				// If it's an match, add the CHOSEN class
				button.classList.add('chosen');
			}
			button.disabled = true;
		
		// If user is using the keyboard, use the event.key value instead of button.innerHTML
		} else if (event.type === 'keydown'){
			
			//Get the data value from the key
			button = document.querySelector('[data-value = ' + event.key+']');
			
			//Disable selected button
			button.disabled = true;
			
			if(this.activePhrase.checkLetter(event.key)=== false){
				button.classList.add('wrong');	

			} else if(this.activePhrase.checkLetter(event.key)=== true){
				// Because the event info on keydown is different from onclick, user data attr to get the desired key
				button.classList.add('chosen');
				
				// If checkForWin method is true, run game over method
				if (game.checkForWin() === true){
					this.gameOver(true);
				};
			}
		}
	}

 	removeLife() {
		// Max number of attempts
		const permittedAttempts = 4;

		//Grab the hearts so we can replace the child images
		const hearts = document.querySelectorAll('#scoreboard ol li');
		// Use attribute setter so we can show the missing life
		hearts[this.missed].firstElementChild.setAttribute('src', 'images/lostHeart.png');
		this.missed++;
		
		//Check total amount of incorrect guesses against permittedAttempts
		if(this.missed > permittedAttempts){
			//If there are 5 errors, game over
			this.gameOver(false); 
			//this.missed = 0;
		}
 	}

 	checkForWin() {
		 // Get and count all the letters in the active phrase
		const letters = document.querySelectorAll('#phrase ul .letter');
		const totalLetter = letters.length;

		//Get and count all of the letters with a class of show, indicating correct guesses
		const totalShow = document.querySelectorAll('.show').length;
		
		//If there are as many '.show's as there are total letters, then user has won
		if(totalLetter === totalShow ){
			return true;
		}
 	}

 	gameOver(gameWon) {
		// Toggle the overlay back on to indicate game has finished
		const introOverlay = document.getElementById('overlay');
		introOverlay.style.display='flex';

		// Put focus on reset button in case user is on a keyboard
		const startBtn = document.getElementById('btn__reset');
		startBtn.focus();

		// If user has lost, show correct messaging and color scheme
		if(gameWon === false){
			introOverlay.querySelector('h1').innerHTML ='Sorry, you lost this round!';
			introOverlay.classList.remove('start');
			introOverlay.classList.add('lose');
		}
		// If user has won, show correct messaging and color scheme
		if(gameWon===true){
			introOverlay.querySelector('h1').innerHTML ='Hooray, you won this round!';
			introOverlay.classList.remove('start');
			introOverlay.classList.remove('lose');
			introOverlay.classList.add('win');
			
		}
 	}
 }