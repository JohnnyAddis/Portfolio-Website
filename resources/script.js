document.addEventListener('DOMContentLoaded', () => {
    const cells = document.querySelectorAll('.cell');
    const restartButton = document.getElementById('restart');
    const message = document.getElementById('message');
    let currentPlayer = 'X';
    let gameState = Array(9).fill(null);
    let gameActive = true;
})


const winningConditions = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], 
    [0, 3, 6], [1, 4, 7], [2, 5, 8], 
    [0, 4, 8], [2, 4, 6]             
]




function handleCellClick(event){
    const cell = event.target;
    const cellNum = parseInt(cell.getAttribute('data-index'))
    //Do nothing if spot is already filled or game hasn't started.
    if( gameState[cellNum] !== null || !gameActive) return; 

    gameState[cellNum] = currentPlayer;
    cell.textContent = currentPlayer;
    
    if(checkWin()){
        message.textContent =  `Player ${currentPlayer} wins!`;
        gameActive = false;
    }else if(gameState.every(cell => cell!==null)){
        message.textContent = 'Cats Game!';
        gameActive = false;
    }else{
        currentPlayer = currentPlayer ==='X' ? 'O' : 'X';
        message.textContent = `Player ${currentPlayer}'s turn`;
    }
}

function checkWin(){
    return winningConditions.some(cond => {
        return cond.every(index => gameState[index] === currentPlayer);
    })
}


function restartGame(){
    let gameState = Array(9).fill(null);
    gameActive = true;
    currentPlayer = 'X';
    cells.forEach(cell => cell.textContent ='');
    message.textContent = `Player ${currentPlayer}'s turn`;
}


cells.forEach(cell => cell.addEventListener('click', handleCellClick));
restartButton.addEventListener('click', restartGame);
message.textContent = `Player ${currentPlayer}'s turn`;
