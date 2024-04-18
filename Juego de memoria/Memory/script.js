const totalCards = 12;
const availableCards = ['imgs/Banano.png', 'imgs/Fresa.png', 'imgs/Mango.png', 'imgs/Manzana.png', 'imgs/Papaya.png', 'imgs/pina.png'];
let cards = [];
let selectedCard = null;
let currentAttempts = 0;
let matchedPairs = 0;
document.getElementById('restartButton').addEventListener('click', function() {
    initializeGame();
    currentAttempts = 0;
    matchedPairs = 0;
    document.getElementById('stats').innerText = '0 intentos';
});

function activate(e) {
    const clickedCard = e.currentTarget;

    
    if (clickedCard === selectedCard || clickedCard.classList.contains('active')) {
        return;
    }

    clickedCard.classList.add('active');

    
    if (selectedCard) {
        const clickedCardValue = clickedCard.getAttribute('data-value');
        const selectedCardValue = selectedCard.getAttribute('data-value');

        if (clickedCardValue === selectedCardValue) {
            
            matchedPairs++;
            selectedCard = null;

            
            if (matchedPairs === totalCards / 2) {
                
                alert('¡Felicitaciones! Has completado el juego.');
            }
        } else {
            
            setTimeout(() => {
                clickedCard.classList.remove('active');
                selectedCard.classList.remove('active');
                selectedCard = null;
            }, 1000);
        }

        
        currentAttempts++;
        document.getElementById('stats').innerText = `${currentAttempts} intentos`;
    } else {
        
        selectedCard = clickedCard;
    }
}

function createCard(value) {
    const card = document.createElement('div');
    card.classList.add('card');
    card.innerHTML = `
        <div class="back"></div>
        <div class="face" style="background-image: url(${value})"></div>
    `;
    card.setAttribute('data-value', value);
    card.addEventListener('click', activate);
    return card;
}

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function initializeGame() {
    const doubledCards = availableCards.concat(availableCards);
    const shuffledCards = shuffle(doubledCards);

    const gameContainer = document.getElementById('game-container');
    gameContainer.innerHTML = '';

    shuffledCards.forEach(value => {
        const card = createCard(value);
        gameContainer.appendChild(card);
    });
}

initializeGame();
