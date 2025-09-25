export type Player = 'red' | 'black' | null;

export type GameState = {
  board: Player[][];
  currentPlayer: 'red' | 'black';
  winner: Player;
  gameOver: boolean;
};

export type Theme = 'default' | 'purple' | 'green';

