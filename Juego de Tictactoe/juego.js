const statusDisplay = document.querySelector('.game--status');

let gameActive = true;
let currentPlayer = "X";
let gameState = ["", "", "", "", "", "", "", "", ""];

const winningMessage = () => `¡Jugador ${currentPlayer} gana!`;
const drawMessage = () => `¡Empate!`;
const currentPlayerTurn = () => `Turno del jugador ${currentPlayer}`;

statusDisplay.innerHTML = currentPlayerTurn();

document.querySelectorAll('.cell').forEach(cell => cell.addEventListener('click', handleCellClick));
document.querySelector('.game--restart').addEventListener('click', handleRestartGame);

function handleCellClick(clickedCellEvent) {
    const clickedCell = clickedCellEvent.target;
    const clickedCellIndex = parseInt(clickedCell.getAttribute('data-cell-index'));

    if (gameState[clickedCellIndex] === "" && gameActive) {
        handleCellPlayed(clickedCell, clickedCellIndex);
        handleResultValidation();
        currentPlayer = currentPlayer === "X" ? "O" : "X"; 
        statusDisplay.innerHTML = currentPlayerTurn();
    }
}

function handleCellPlayed(clickedCell, clickedCellIndex) {
    gameState[clickedCellIndex] = currentPlayer;
    clickedCell.textContent = currentPlayer;
}

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

function handleResultValidation() {
    for (let i = 0; i < winningConditions.length; i++) {
        const [a, b, c] = winningConditions[i];
        const cellA = gameState[a];
        const cellB = gameState[b];
        const cellC = gameState[c];
        if (cellA && cellA === cellB && cellA === cellC) {
            const winningPlayer = cellA;
            statusDisplay.innerHTML = winningMessage();
            gameActive = false;
            alert(`¡Jugador ${winningPlayer} gana!`);
            return;
        }
    }

    
    let isBoardFull = gameState.every(cell => cell !== "");
    if (isBoardFull) {
        statusDisplay.innerHTML = drawMessage();
        gameActive = false;
        alert("¡Empate!");
        return;
    }
}



function handleRestartGame() {
    gameActive = true;
    currentPlayer = "X";
    gameState = ["", "", "", "", "", "", "", "", ""];
    statusDisplay.innerHTML = currentPlayerTurn();
    document.querySelectorAll('.cell').forEach(cell => cell.textContent = "");
}
