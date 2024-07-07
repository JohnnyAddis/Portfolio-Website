//Human is player 'X', computer is player 'O'. Human goes first.
document.addEventListener('DOMContentLoaded', () => {
    const cells = document.querySelectorAll('.cell');
    const restartButton = document.getElementById('restart');
    const message = document.getElementById('message');
    message.style.color = 'black';
    let currentPlayer = 'X';
    let gameState = Array(9).fill(null);
    let gameActive = true;

    //all possible ways to win
    const winningConditions = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8], 
        [0, 4, 8], [2, 4, 6]             
    ];

    function handleCellClick(event) {
        const cell = event.target;
        const cellIndex = parseInt(cell.getAttribute('data-index'));
        //if game hasn't started, or cell is already selected, or computer's turn, do nothing.
        if (gameState[cellIndex] !== null || !gameActive || currentPlayer === 'O') return;

        //filling in cell
        gameState[cellIndex] = currentPlayer;
        cell.textContent = currentPlayer;
        cell.style.fontWeight = 'bold';

        //check for win/tie, if not switch move to computer
        if (checkWin()) {
            message.textContent = `Player ${currentPlayer} Wins!`;
            message.style.color = 'green';
            gameActive = false;
        } else if (gameState.every(cell => cell !== null)) {
            message.textContent = "Cat's Game!";
            gameActive = false;
        } else {
            currentPlayer = 'O';
            message.textContent = `Player ${currentPlayer}'s turn`;
            //delay computer's move a little
            setTimeout(computerMove, 500); 
        }
    }

    function computerMove() {
        if (!gameActive) return;

        // Computer just chooses a random cell
        const emptyCells = gameState.map((cell, index) => cell === null ? index : null).filter(index => index !== null);
        const randomIndex = emptyCells[Math.floor(Math.random() * emptyCells.length)];

        gameState[randomIndex] = currentPlayer;
        cells[randomIndex].textContent = currentPlayer;
        cells[randomIndex].style.fontWeight = 'bold';

        //almsot exact same code as handleClick (refactor?)
        if (checkWin()) {
            message.textContent = `Player ${currentPlayer} Wins!`;
            message.style.color = 'red';
            gameActive = false;
        } else if (gameState.every(cell => cell !== null)) {
            message.textContent = "Cat's Game!";
            gameActive = false;
        } else {
            currentPlayer = 'X';
            message.textContent = `Player ${currentPlayer}'s turn`;
        }
    }

    function checkWin() {
        return winningConditions.some(condition => {
            return condition.every(index => gameState[index] === currentPlayer);
        });
    }
   
//Didn't like the alerts
    // function displayAlert(player){
    //     if(player){
    //         window.alert(`Player ${player} Wins!`);
    //     }else{
    //         window.alert("Cat's Game!");
    //     }
    // }

    function restartGame() {
        gameState = Array(9).fill(null);
        gameActive = true;
        currentPlayer = 'X';
        cells.forEach(cell => cell.textContent = '');
        message.textContent = `Player ${currentPlayer}'s turn`;
        message.style.color = 'black';
    }

    cells.forEach(cell => cell.addEventListener('click', handleCellClick));
    restartButton.addEventListener('click', restartGame);

    message.textContent = `Player ${currentPlayer}'s turn`;
});
