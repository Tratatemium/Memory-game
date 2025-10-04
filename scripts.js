/** ----------------------------------------  
 * 
 * ###             FUNCTIONS             ### 
 * 
 *  ----------------------------------------
 */ 
// #region FUNCTIONS



    /**  Fisher–Yates shuffle algorithm for an array
     *
     * @param {array} array
     * @returns {array} result
     */  
    const shuffle = (array) => {
        // Copy array so original is not modified
        let result = array.slice(); 

        let currentIndex = result.length; // Current element

        // While there remain elements to shuffle
        while (currentIndex != 0) {
            // Pick one of the remaining elements
            let randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;

            // Swap elements
            [result[currentIndex], result[randomIndex]] = [result[randomIndex], result[currentIndex]];
        }

        return result;
    };



    /**  Function that folds array with cards into 2-D array based on the game layout
     *
     * @param {array} array
     * @param {array} folds
     * @returns {array}
     */
    const foldCards = (array, folds) => {
        let result = [];
        let sliceStart = 0;

        for (let i = 0; i < folds[0]; i++) {
            result.push(array.slice(sliceStart, sliceStart + folds[1]));
            sliceStart += folds[1];
        }

        return result;
    };




    /**  Function that assigns or removes "card-flipped" class from a card-inner
     *
     * @param {object} card
     */
    const flipCard = (card) => {
        if (Array.from(card.children[0].classList).includes('card-flipped')) {
            card.children[0].classList.remove('card-flipped');
        } else {
            card.children[0].classList.add('card-flipped');
        }
    };



    let flippedCards = [];   // Array to store cards that are flipped at the moment
    let guessedCounter = 0;  // How many pairs are guessed - used to determine win condition
    let flippedTimeout;      // Timer for two flipped cards

    /**  Main function for the game. It fires on click on the card
     *
     * @param {object} event
     */
    const onCardClick = (event) => {      

        // Get the element (card) that has been clicked
        let card = event.currentTarget;

        switch (flippedCards.length) {

            // If there are no other flipped cards
            case 0:
                flipCard(card);
                flippedCards.push(card);
                break;

            // If there are one other flipped card    
            case 1:
                if (card !== flippedCards[0]) {

                    flipCard(card);
                    flippedCards.push(card);

                    // If two flipped cards have the same image
                    if (flippedCards[0].children[0].children[1].src === flippedCards[1].children[0].children[1].src) {

                        setTimeout(() => {   // Than both cards disappear
                            flippedCards[0].classList.add('card-invisible');
                            flippedCards[1].classList.add('card-invisible');
                            flippedCards = [];

                            guessedCounter += 1;

                            // Function on-win goes here
                            if (guessedCounter === Number(differentCards)) {
                                console.log('You won!');
                            }

                        }, 700);                        

                    } else { // If guessed wrong - they flip back after timeout
                        flippedTimeout = setTimeout(() => {
                            flipCard(flippedCards[0]);
                            flipCard(flippedCards[1]);
                            flippedCards = [];
                        }, 3500);
                    }                    
                }
                break;
            case 2: // If guessed wrong and other card is clicked - delete timeout and flip back imediatly
                if (
                    (card !== flippedCards[0]) && (card !== flippedCards[1]) && 
                    (flippedCards[0].children[0].children[1].src !== flippedCards[1].children[0].children[1].src)
                ) {
                    clearTimeout(flippedTimeout);
                    flipCard(flippedCards[0]);
                    flipCard(flippedCards[1]);
                    flippedCards = [];
                    flipCard(card);
                    flippedCards.push(card);
                }
                break;
            default:
                console.log('Too many cards are flipped!');
        }
    };





    /**  Function that creates html elements for cards
     *
     * @param {Array<string>} array 2-dimentional array containing .src for <img>
     * 
     */
    const createCards = (array) => {

        const cardField = document.getElementById('card-field');
        let row;
        let card;
        let cardInner;
        let cardFront;
        let cardBack;

        // Iterate through all rows in the array
        for (let i = 0; i < array.length; i++){

            // Create new row element in html
            row = document.createElement('div');
            row.classList.add('card-row');
            cardField.appendChild(row);

            // Iterate through all elements in the row
            for (let j = 0; j < array[i].length; j++){
                card = document.createElement('div');   // Create card 
                card.classList.add('card');

                card.addEventListener('click', onCardClick); // Add event listner to card
                
                row.appendChild(card);

                cardInner = document.createElement('div'); // Create card-inner
                cardInner.classList.add('card-inner');
                card.appendChild(cardInner);

                cardBack = document.createElement('img'); // Create card-back
                cardBack.classList.add('card-back');
                cardBack.src = 'Images/Back-01.png';
                cardInner.appendChild(cardBack);

                cardFront = document.createElement('img'); // Create card-front
                cardFront.classList.add('card-front');
                cardFront.src = array[i][j];
                cardInner.appendChild(cardFront);
            }
        }
    };

// #endregion FUNCTIONS



/** ----------------------------------------  
 * 
 * ###               MAIN                ### 
 * 
 *  ----------------------------------------
 */ 


const originalCards = [
    'Images/01-Rose.png',
    'Images/02-Tower.png',
    'Images/03-Revolver.png',
    'Images/04-Door.png',
    'Images/05-Key.png',
    'Images/06-Book.png',
    'Images/07-Crystal.png',
    'Images/08-Wheel.png',
    'Images/09-Train.png',
    'Images/10-Feather.png',
    'Images/11-Crown.png',
    'Images/12-Moon.png',
    'Images/13-Wolf.png',
    'Images/14-Horn.png',
    'Images/15-Clock.png',
    'Images/16-Crossroads.png',
    'Images/17-Eye.png',
    'Images/18-Chain.png',
];

const gameVariants = {
    6: [3, 4], 
    8: [4, 4], 
    10: [4, 5], 
    12: [4, 6], 
    14: [4, 7], 
    15: [5, 6], 
    18: [6, 6]
};

let differentCards = Object.keys(gameVariants)[0];

let cardsSlised = originalCards.slice(0, differentCards).concat(originalCards.slice(0, differentCards));
let cardsShuffled = shuffle(cardsSlised);
let playCards = foldCards(cardsShuffled, gameVariants[differentCards]);

createCards(playCards);