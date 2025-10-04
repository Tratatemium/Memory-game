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

    let flippedCards = [];
    let guessedCounter = 0;

    const onCardClick = (event) => {

        // Get the element (card) that has been clicked
        let card = event.currentTarget;

        switch (flippedCards.length) {
            case 0:
                card.children[0].classList.add('card-flipped');
                flippedCards.push(card);
                break;
            case 1:
                if (card !== flippedCards[0]) {

                    card.children[0].classList.add('card-flipped');
                    flippedCards.push(card);

                    if (flippedCards[0].children[0].children[1].src === flippedCards[1].children[0].children[1].src) {

                        setTimeout(() => {
                            flippedCards[0].classList.add('card-invisible');
                            flippedCards[1].classList.add('card-invisible');
                            flippedCards = [];

                            guessedCounter += 1;

                            if (guessedCounter === differentCards) {
                                console.log('You won!');
                            }

                        }, 1000);                        

                    } else {
                        setTimeout(() => {
                            flippedCards[0].children[0].classList.remove('card-flipped');
                            flippedCards[1].children[0].classList.remove('card-flipped');
                            flippedCards = [];
                        }, 2000);
                    }                    
                }
                break;
            case 2:
                if ((card !== flippedCards[0]) && (card !== flippedCards[1])) {

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
    function createCards(array) {

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
                card = document.createElement('div');
                card.classList.add('card', 'row' + i, 'column' + j);

                card.addEventListener('click', onCardClick);
                
                row.appendChild(card);

                cardInner = document.createElement('div');
                cardInner.classList.add('card-inner');
                card.appendChild(cardInner);

                cardBack = document.createElement('img');
                cardBack.classList.add('card-back');
                cardBack.src = 'Images/Back-01.png';
                cardInner.appendChild(cardBack);

                cardFront = document.createElement('img');
                cardFront.classList.add('card-front');
                cardFront.src = array[i][j];
                cardInner.appendChild(cardFront);
            }

        }
    }

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

//const gameVariants = [6, 8, 10, 12, 14, 15, 18];

let differentCards = 8;

let cardsSlised = originalCards.slice(0, differentCards).concat(originalCards.slice(0, differentCards));
let cardsShuffled = shuffle(cardsSlised);
console.log(cardsShuffled);

let playCards = [
    cardsShuffled.slice(0, 4),
    cardsShuffled.slice(4, 8),
    cardsShuffled.slice(8, 12),
    cardsShuffled.slice(12, 16)
]

console.log(playCards);

createCards(playCards);