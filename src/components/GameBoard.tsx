import { useState } from 'react';
import { Box, Button, Typography, Container } from '@mui/material';
import { GameState } from '../types';
import { 
  createInitialGameState, 
  dropPiece, 
  isColumnFull, 
  checkWinner, 
  isBoardFull 
} from '../gameLogic';

const GameBoard: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>(createInitialGameState());

  const handleColumnClick = (column: number) => {
    if (gameState.gameOver || isColumnFull(gameState.board, column)) {
      return;
    }

    const newBoard = dropPiece(gameState.board, column, gameState.currentPlayer);
    const winner = checkWinner(newBoard);
    const boardFull = isBoardFull(newBoard);
    
    setGameState({
      board: newBoard,
      currentPlayer: gameState.currentPlayer === 'red' ? 'black' : 'red',
      winner,
      gameOver: winner !== null || boardFull,
    });
  };

  const handleReset = () => {
    setGameState(createInitialGameState());
  };

  const getPieceIcon = (player: 'red' | 'black' | null): string => {
    switch (player) {
      case 'red':
        return '🔴';
      case 'black':
        return '⚫';
      default:
        return '⬜';
    }
  };

  const getButtonText = (): string => {
    if (gameState.gameOver) {
      return 'New Game';
    }
    return 'RESET BOARD';
  };

  const getStatusMessage = (): string => {
    if (gameState.winner) {
      return `${gameState.winner === 'red' ? '🔴' : '⚫'}  wins!`;
    }
    if (gameState.gameOver) {
      return "It's a tie!";
    }
    return "";
  };

  return (
    <Box width="100%" sx={{ textAlign: 'center' }}>
      {/* Status message */}
      <Typography 
        variant="h6" 
        sx={{ 
          marginBottom: 2, 
          minHeight: '2rem',
          color: gameState.currentPlayer === 'red' ? 'black' : 'red',
          fontWeight: 'bold',
        }}
      >
        {getStatusMessage()}
      </Typography>

      {/* Game board */}
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          margin: '0 auto',
        }}
      >
        {/* Column headers with current player pieces */}
        {Array.from({ length: 4 }, (_, col) => (
          <Box
            key={col}
            sx={{
              height: { xs: 20, sm: 30, md: 40 },
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: gameState.gameOver || isColumnFull(gameState.board, col)
                ? 'not-allowed'
                : 'pointer',
              opacity: gameState.gameOver || isColumnFull(gameState.board, col) ? 0.5 : 1,
                '&:hover': {
                  backgroundColor: gameState.gameOver || isColumnFull(gameState.board, col)
                    ? 'transparent'
                    : 'primary.light',
                },
            }}
            onClick={() => handleColumnClick(col)}
          >
            <Typography
              sx={{
                fontSize: { xs: '0.5rem', sm: '0.8rem', md: '1.0rem' }
              }}
            >
              {getPieceIcon(gameState.currentPlayer)}
            </Typography>
          </Box>
        ))}

        {/* Game board cells */}
        {gameState.board.map((row, rowIndex) =>
          row.map((cell, colIndex) => (
            <Box
              key={`${rowIndex}-${colIndex}`}
              sx={{
                height: { xs: 20, sm: 30, md: 40 },
                border: '1px solid',
                borderColor: 'primary.main',
                borderRadius: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Typography
                sx={{
                  fontSize: { xs: '0.5rem', sm: '0.8rem', md: '1.0rem' }
                }}
              >
                {getPieceIcon(cell)}
              </Typography>
            </Box>
          ))
        )}
      </Box>

      {/* Reset button */}
      <Box sx={{ marginTop: 3 }}>
        <Button
          variant="text"
          color="primary"
          size="large"
          onClick={handleReset}
          sx={{
            fontSize: { xs: '1rem', sm: '1.1rem' },
            fontWeight: 'bold',
            padding: { xs: '10px 20px', sm: '12px 24px' },
            minWidth: { xs: '140px', sm: '160px' },
          }}
        >
          {getButtonText()}
        </Button>
      </Box>
    </Box>
  );
};

export default GameBoard;

