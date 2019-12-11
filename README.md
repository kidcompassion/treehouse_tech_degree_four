# treehouse_tech_degree_four
OOP Game Show App

This is project 4 for the Treehouse JS techdegree, an object oriented word game.
I'm aiming for exceeds expectations, but will be happy with meets expectations. :)

## Requirements ##

*app.js* contains the event listeners for the start button and the on screen keyboard, and it handles both click and keydown elements.

*Phrase.js* is where the game's phrases are rendered to the screen, as well as shown/hidden; it's also where we check if the guessed letter appears in the active Phrase.

I added one extra method to the Phrase class on line 14: convertPhraseToArray - this just grabs the activePhrase and pushes it into an array for easier looping.


*Game.js* is where the actual interactivity is set up. I have added a few extra elements,including: 
- a testPhrase method to check whether the phrases in the array have only letters and spaces
- an addDataAttrToKeys method, which adds the innerText value of each key to the button as a data attribute (this is what makes the keyboard interaction possible
)

## Styles ##
I have updated the look of the game with different fonts and a darker background; I was going for like a "dark theme option" kind of thing.