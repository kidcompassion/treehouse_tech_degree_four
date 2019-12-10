/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * Phrase.js */

 class Phrase {
 	
 	constructor(phrase) {
		 this.phrase = phrase.toLowerCase();
 	}

	
	// Turn the phrase into an array of characters
	convertPhraseToArray(){
		this.characterArray = Array.from(this.phrase);
		return this.characterArray;
	}


	/** 
	 * Display phrase on game board 
	*/

 	addPhraseToDisplay() {
		let characterMarkup = '';
		let phraseHTML = [];
		let phraseContainer = document.getElementById('phrase').firstElementChild;
		this.convertPhraseToArray();

		this.characterArray.forEach(function(character, index){
			// create an LI I can insert values into
			characterMarkup = document.createElement('li');
			if(character === ' '){ 
				characterMarkup.className = 'space';
			} else {
				characterMarkup.className = character + ' letter';
			}
			
			characterMarkup.innerHTML = character;
			phraseHTML[index] = characterMarkup;
		});

		phraseHTML.forEach(function(tag, index){
			phraseContainer.appendChild(tag);
		});
	 }


 	checkLetter(letter) {
		if(game.activePhrase.phrase.includes(letter)=== false){
			// If guess is not there, increment game.missed and run game.removeLife
			game.missed+1;
			game.removeLife();
			return false;
		} else {
			// If guess is there, reveal the correct letters in the phrase
			this.showMatchedLetter(letter);
			return true;
		}
 	}

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