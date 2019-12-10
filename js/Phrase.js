/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * Phrase.js */

 class Phrase {
 	
 	constructor(phrase) {
		 //console.log(phrase.phrase);
		 this.phrase = phrase.toLowerCase();
 	}

	/**
	 * Converts the phrase string into an array for easier manipulation
	 */
	convertPhraseToArray(){
		this.characterArray = Array.from(this.phrase);
		return this.characterArray;
	}

	/** 
	* Displays phrase tiles on game board 
	*/

 	addPhraseToDisplay() {
		// Set up var for each individual li
		let characterMarkup = '';
		//Set up array to hold all lis for phrase
		let phraseHTML = [];
		// Grab the ul so I can insert the characters into it
		let phraseContainer = document.getElementById('phrase').firstElementChild;
		
		//Turn the phrase into an array of characters so I can loop through it
		this.convertPhraseToArray();

		this.characterArray.forEach(function(character, index){

			// create an LI I can insert values/add classes to
			characterMarkup = document.createElement('li');
			// If character has no text value, it's a space, so add space class
			if(character === ' '){ 
				characterMarkup.className = 'space';
			} else {
				// Else it's a letter, add letter class and class of its value
				characterMarkup.className = character + ' letter';
			}
			
			//Insert the letter into the LI
			characterMarkup.innerHTML = character;
			//Push the LI with all classes into an arry
			phraseHTML[index] = characterMarkup;
		});

		// Loop through array of LIs with appropriate classes and print them to the board
		phraseHTML.forEach(function(tag, index){
			phraseContainer.appendChild(tag);
		});
	 }

	/**
	* Checks if passed letter is in phrase
	* @param (string) letter - Letter to check
	*/

 	checkLetter(letter) {
		if(game.activePhrase.phrase.includes(letter)=== false){
			
			// If guess is not there, increment game.missed, run game.removeLife, and tell system it's a false guess
			game.missed+1;
			game.removeLife();
			return false;
		} else {
			// If guess is there, reveal the correct letters in the phrase and tell system it's a true guess
			this.showMatchedLetter(letter);
			return true;
		}
	 }
	 
	/**
	* Displays passed letter on screen after a match is found
	* @param (string) letter - Letter to display
	*/

 	showMatchedLetter(letter) {
		// Grab all the letter lis so we can manipulate them 
		const currentPhraseHTML = document.querySelectorAll('.letter');
		// For each li, if they have a class matching the user selection
		currentPhraseHTML.forEach(tag => {
			if(tag.classList.contains(letter)){
				tag.classList.remove('hide');
				tag.classList.add('show');	
			}
		});
 	}
 }