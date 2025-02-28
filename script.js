const gameCells = document.querySelectorAll(".cell");
const player1 = document.querySelector(".player1");
const player2 = document.querySelector(".player2");
const restartBtn = document.querySelector(".restart-btn");
const alertBox = document.querySelector(".alert-box");

//making variables
let currentPlayer = "X";
let nextPlayer = "O";
let playerTurn = currentPlayer;

player1.textContent = `Player 1: ${currentPlayer}`;
player2.textContent = `Player 2: ${nextPlayer}`;

// Function to start your game
const startGame = () => {
    gameCells.forEach(cell => {
        cell.addEventListener("click", handleClick);
    });
}

const handleClick = (e) => {
    if (e.target.textContent === "") {
        e.target.textContent = playerTurn;
        if (checkWin()) {
            showAlert(`${playerTurn} is a Winner!`);
            disableCells();
        } 
        else if (checkTie()) {
            showAlert(`It's a Tie!`);
            disableCells();
        } 
        else {
            showAlert(`Turn for player: ${playerTurn}`);
            changePlayerTurn();
        }
    }
};

// Function to change player's turn
const changePlayerTurn = () => {
    if (playerTurn === currentPlayer) {
        playerTurn = nextPlayer;
    } else {
        playerTurn = currentPlayer;
    }
}

// Function to check win
const checkWin = () => {
    const winningConditions = 
    [
        [0, 1, 2],
        [3, 4, 5], 
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ]

    for (let i = 0; i < winningConditions.length; i++) {
        const [pos1, pos2, pos3] = winningConditions[i];
        if (gameCells[pos1].textContent !== "" &&
            gameCells[pos1].textContent === gameCells[pos2].textContent &&
            gameCells[pos2].textContent === gameCells[pos3].textContent) {
                return true;
        }
    }
    return false;
};

// Function to check tie
const checkTie = () => {
    let emptyCellsCount = 0;
    gameCells.forEach(cell => {
        if (cell.textContent === "") {
            emptyCellsCount++;
        }
    });
    return emptyCellsCount === 0 && !checkWin();
};

//Function to disable game-board cells after a win or tie
const disableCells = () => {
    gameCells.forEach(cell => {
        cell.removeEventListener('click', handleClick);
        cell.classList.add('disabled');
    });
};

//Function to restart Game 
const restartGame = () => {
    gameCells.forEach(cell => {
        cell.textContent = '';
        cell.classList.remove('disabled');
    });
    startGame();
};

// function to show alert
const showAlert = (msg) => {
    alertBox.textContent = msg;
    alertBox.style.display = "block";
    setTimeout(() => {
        alertBox.style.display = "none";
    }, 3000);
}

//Adding Event Listener to restart button
restartBtn.addEventListener('click', restartGame);

//calling Start Game Function
startGame();