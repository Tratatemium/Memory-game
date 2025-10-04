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



    const flipCard = (card) => {
        switch (arrayCard.state) {
            case 'back':
                card.children[0].classList.add('card-flipped');
                arrayCard.state = 'front';
                break;
            case 'front':
                card.children[0].classList.remove('card-flipped');
                arrayCard.state = 'back';
                break;
            default:
                console.log('Mistake in arrayCard.state!')
        }
    };



    const onCardClick = (event) => {

        // Get the element (card) that has been clicked
        let card = event.currentTarget;

        // From assingned classes ".row#" ".column#" get position of the clicked card
        let row =  Number(card.classList[1].charAt(card.classList[1].length - 1));
        let column = Number(card.classList[2].charAt(card.classList[2].length - 1));

        // This is corresponding object in initial array 
        let arrayCard = playCards[row][column];
        
        // Here goes the code to callback the game
        console.log(arrayCard.src);
        console.log(card.children[0]);

        card.classList.add('card-invisible');
        arrayCard.state = 'invisible'
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
                cardFront.src = array[i][j].src;
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
    { src: 'Images/01-Rose.png', state: 'back' },
    { src: 'Images/02-Tower.png', state: 'back' },
    { src: 'Images/03-Revolver.png', state: 'back' },
    { src: 'Images/04-Door.png', state: 'back' },
    { src: 'Images/05-Key.png', state: 'back' },
    { src: 'Images/06-Book.png', state: 'back' },
    { src: 'Images/07-Crystal.png', state: 'back' },
    { src: 'Images/08-Wheel.png', state: 'back' },
    { src: 'Images/09-Train.png', state: 'back' },
    { src: 'Images/10-Feather.png', state: 'back' },
    { src: 'Images/11-Crown.png', state: 'back' },
    { src: 'Images/12-Moon.png', state: 'back' },
    { src: 'Images/13-Wolf.png', state: 'back' },
    { src: 'Images/14-Horn.png', state: 'back' },
    { src: 'Images/15-Clock.png', state: 'back' },
    { src: 'Images/16-Crossroads.png', state: 'back' },
    { src: 'Images/17-Eye.png', state: 'back' },
    { src: 'Images/18-Chain.png', state: 'back' },
];

//const gameVariants = {6, 8, 10, 12, 14, 15, 18};

let cardsSlised = originalCards.slice(0, 8).concat(originalCards.slice(0, 8));
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