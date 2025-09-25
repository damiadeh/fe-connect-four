import { Player, GameState } from './types';

const BOARD_ROWS = 4;
const BOARD_COLS = 4;

export const createEmptyBoard = (): Player[][] => {
  return Array(BOARD_ROWS).fill(null).map(() => Array(BOARD_COLS).fill(null));
};

export const createInitialGameState = (): GameState => ({
  board: createEmptyBoard(),
  currentPlayer: 'red',
  winner: null,
  gameOver: false,
});

export const dropPiece = (board: Player[][], column: number, player: 'red' | 'black'): Player[][] => {
  const newBoard = board.map(row => [...row]);
  
  // Find the lowest empty row in the column
  for (let row = BOARD_ROWS - 1; row >= 0; row--) {
    if (newBoard[row][column] === null) {
      newBoard[row][column] = player;
      break;
    }
  }
  
  return newBoard;
};

export const isColumnFull = (board: Player[][], column: number): boolean => {
  return board[0][column] !== null;
};

export const checkWinner = (board: Player[][]): Player => {
  // For 4x4 board, we need to check for 4 in a row
  // Check horizontal
  for (let row = 0; row < BOARD_ROWS; row++) {
    for (let col = 0; col < BOARD_COLS - 3; col++) {
      const player = board[row][col];
      if (player && 
          board[row][col + 1] === player && 
          board[row][col + 2] === player && 
          board[row][col + 3] === player) {
        return player;
      }
    }
  }

  // Check vertical
  for (let row = 0; row < BOARD_ROWS - 3; row++) {
    for (let col = 0; col < BOARD_COLS; col++) {
      const player = board[row][col];
      if (player && 
          board[row + 1][col] === player && 
          board[row + 2][col] === player && 
          board[row + 3][col] === player) {
        return player;
      }
    }
  }

  // Check diagonal (top-left to bottom-right)
  for (let row = 0; row < BOARD_ROWS - 3; row++) {
    for (let col = 0; col < BOARD_COLS - 3; col++) {
      const player = board[row][col];
      if (player && 
          board[row + 1][col + 1] === player && 
          board[row + 2][col + 2] === player && 
          board[row + 3][col + 3] === player) {
        return player;
      }
    }
  }

  // Check diagonal (top-right to bottom-left)
  for (let row = 0; row < BOARD_ROWS - 3; row++) {
    for (let col = 3; col < BOARD_COLS; col++) {
      const player = board[row][col];
      if (player && 
          board[row + 1][col - 1] === player && 
          board[row + 2][col - 2] === player && 
          board[row + 3][col - 3] === player) {
        return player;
      }
    }
  }

  return null;
};

export const isBoardFull = (board: Player[][]): boolean => {
  return board[0].every(cell => cell !== null);
};

