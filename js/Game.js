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
	 * Test phrases to make sure they only have spaces and letters
	 */

	testPhrases(){
		// Create regEx verifying phrases have spaces and letters only
		let regEx = /^[a-zA-Z\s]*$/; 
		
		// create list of possible phrases to test
		let possiblePhrases = [
			'A Career That Spanned Generations',
			'Academy Awards Host',
			'Josie And The Pussycats In Outer Space',
			'Copies Of My Transcripts',
			'Pasta Maker'
		];

		//Create array to hold phrases that pass the test
		let approvedPhrases = [];

		//Loop through phrase strings and push everything with letters and spaces only into an array
		possiblePhrases.forEach(function(possiblePhrase, index){
			if(regEx.test(possiblePhrase)=== true){
				approvedPhrases[index] = possiblePhrase;
			};
		});

		return approvedPhrases;
	}

	/** 
	 * Creates phrases for use in game 
	 * @return {array} An array of phrases that could be used in the game 
	 * */

	createPhrases(){
		// List of phrase strings that have been run through a regex
		let testedPhrases = this.testPhrases();
		// Array to hold phrase objects
		let approvedPhrases = [];

		// Loop through each phrase string and pass it into an Object
		testedPhrases.forEach(function(approved){
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

		//const clickLetterCheck = this.activePhrase.checkLetter(button.innerHTML);
		//const keyLetterCheck = this.activePhrase.checkLetter(event.key);

		// Determine whether user is clicking or using the keyboard
		if(event.type === 'click'){
			//console.log(button);
			button.disabled = true;
			if(this.activePhrase.checkLetter(button.innerHTML)=== false){
				// If it's an error, add the WRONG class
				button.classList.add('wrong');
			} else if (this.activePhrase.checkLetter(button.innerHTML) === true) {
				game.checkForWin();
				// If it's an match, add the CHOSEN class
				button.classList.add('chosen');
			}
			button.disabled = true;
		// If user is using the keyboard, use the event.key value instead of button.innerHTML
		} else if (event.type === 'keydown'){
			//console.log(keyLetterCheck);
			button = document.querySelector('[data-value = ' + event.key+']');
			//console.log(button);
			button.disabled = true;
			if(this.activePhrase.checkLetter(event.key)=== false){
				button.classList.add('wrong');//
				
				
			} else if(this.activePhrase.checkLetter(event.key)=== true){
				// Because the event info on keydown is different from onclick, user data attr to get the desired key
				button.classList.add('chosen');//
				game.checkForWin();
				
			}
		}
	}

 	removeLife() {
		// Max number of attempts
		const permittedAttempts = 4;
		
		//console.log(this.missed);
		//Grab the hearts so we can replace the child images
		const hearts = document.querySelectorAll('#scoreboard ol li');
	
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
		
 	}

 }