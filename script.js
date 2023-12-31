const board = document.getElementById('board');
const status = document.getElementById('status');
const restartBtn = document.getElementById('restartBtn');
let currentPlayer = 'X';
let gameState = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;
const winningConditions = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8],
  [0, 3, 6], [1, 4, 7], [2, 5, 8],
  [0, 4, 8], [2, 4, 6]
];

function handleCellClick(e) {
  const cell = e.target;
  const cellIndex = parseInt(cell.getAttribute('data-cell'));
  if (gameState[cellIndex] !== '' || !gameActive) return;
  gameState[cellIndex] = currentPlayer;
  cell.innerText = currentPlayer;
  cell.classList.add(currentPlayer);
  checkWin();
  checkDraw();
  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  updateStatus();
}

function checkWin() {
  for (let i = 0; i < winningConditions.length; i++) {
    const [a, b, c] = winningConditions[i];
    if (
      gameState[a] !== '' &&
      gameState[a] === gameState[b] &&
      gameState[a] === gameState[c]
    ) {
      gameActive = false;
      status.innerText = `${currentPlayer} wins!`;
      return;
    }
  }
}

function checkDraw() {
  if (!gameState.includes('') && gameActive) {
    gameActive = false;
    status.innerText = 'It\'s a tie!';
  }
}

function restartGame() {
  gameActive = true;
  currentPlayer = 'X';
  gameState = ['', '', '', '', '', '', '', '', ''];
  status.innerText = '';
  document.querySelectorAll('.cell').forEach(cell => {
    cell.innerText = '';
    cell.classList.remove('X', 'O');
  });
  updateStatus();
}

function updateStatus() {
  status.innerText = gameActive ? `Player ${currentPlayer}'s turn` : status.innerText;
}

board.addEventListener('click', handleCellClick);
restartBtn.addEventListener('click', restartGame);
updateStatus();
