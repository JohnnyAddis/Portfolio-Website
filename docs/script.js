document.addEventListener('DOMContentLoaded', () => {
    const cells = document.querySelectorAll('.cell');
    const restartButton = document.getElementById('restart');
    const message = document.getElementById('message');
    let currentPlayer = 'X';
    let gameState = Array(9).fill(null);
    let gameActive = true;

    //possible ways to win
    const winningConditions = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], 
        [0, 3, 6], [1, 4, 7], [2, 5, 8], 
        [0, 4, 8], [2, 4, 6]             
    ];

    function handleCellClick(event) {
        const cell = event.target;
        const cellIndex = parseInt(cell.getAttribute('data-index'));
        //if cell isn't empty, or game hasn't started, or computer's turn, do nothing.
        if (gameState[cellIndex] !== null || !gameActive || currentPlayer === 'O') return;

        gameState[cellIndex] = currentPlayer;
        cell.textContent = currentPlayer;
        cell.style.fontWeight = 'bold';

        //check for a winner/draw
        if (checkWinner() || checkDraw()) return;

        currentPlayer = 'O';
        message.textContent = `Player ${currentPlayer}'s turn`;
        //delay computer move for a better experience
        setTimeout(computerMove, 500);
    }

    function computerMove() {
        if (!gameActive) return;

        const bestMove = getBestMove();
        gameState[bestMove] = currentPlayer;
        cells[bestMove].textContent = currentPlayer;
        cells[bestMove].style.fontWeight = 'bold';

        if (checkWinner() || checkDraw()) return;

        currentPlayer = 'X';
        message.textContent = `Player ${currentPlayer}'s turn`;
    }

    //minimax algo
    function getBestMove() {
        let bestScore = -Infinity;
        let move;
        for (let i = 0; i < gameState.length; i++) {
            if (gameState[i] === null) {
                gameState[i] = 'O';
                let score = minimax(gameState, 0, false);
                gameState[i] = null;
                if (score > bestScore) {
                    bestScore = score;
                    move = i;
                }
            }
        }
        return move;
    }

    function minimax(board, depth, isMaximizing) {
        let result = checkWinnerImmediate(board);
        if (result !== null) {
            return result;
        }

        if (isMaximizing) {
            let bestScore = -Infinity;
            for (let i = 0; i < board.length; i++) {
                if (board[i] === null) {
                    board[i] = 'O';
                    let score = minimax(board, depth + 1, false);
                    board[i] = null;
                    bestScore = Math.max(score, bestScore);
                }
            }
            return bestScore;
        } else {
            let bestScore = Infinity;
            for (let i = 0; i < board.length; i++) {
                if (board[i] === null) {
                    board[i] = 'X';
                    let score = minimax(board, depth + 1, true);
                    board[i] = null;
                    bestScore = Math.min(score, bestScore);
                }
            }
            return bestScore;
        }
    }

    function checkWinnerImmediate(board) {
        for (const condition of winningConditions) {
            const [a, b, c] = condition;
            if (board[a] && board[a] === board[b] && board[a] === board[c]) {
                return board[a] === 'O' ? 1 : -1;
            }
        }
        if (board.every(cell => cell !== null)) {
            return 0; // Draw
        }
        return null; // No winner yet
    }

    function checkWinner() {
        for (const condition of winningConditions) {
            const [a, b, c] = condition;
            if (gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c]) {
                message.textContent = `Player ${gameState[a]} wins!`;
                gameActive = false;
                return true;
            }
        }
        return false;
    }

    function checkDraw() {
        if (gameState.every(cell => cell !== null)) {
            message.textContent = 'Draw!';
            gameActive = false;
            return true;
        }
        return false;
    }

    function restartGame() {
        gameState = Array(9).fill(null);
        gameActive = true;
        currentPlayer = 'X';
        cells.forEach(cell => cell.textContent = '');
        message.textContent = `Player ${currentPlayer}'s turn`;
    }
    //add event listeners for all cells and restart button
    cells.forEach(cell => cell.addEventListener('click', handleCellClick));
    restartButton.addEventListener('click', restartGame);

    message.textContent = `Player ${currentPlayer}'s turn`;
});