import { describe, it, expect, beforeEach } from 'vitest'
import {
  createEmptyBoard,
  createInitialGameState,
  dropPiece,
  isColumnFull,
  checkWinner,
  isBoardFull,
} from './gameLogic'
import { Player } from './types'

describe('gameLogic', () => {
  describe('createEmptyBoard', () => {
    it('should create a 4x4 board with all null values', () => {
      const board = createEmptyBoard()
      
      expect(board).toHaveLength(4)
      expect(board[0]).toHaveLength(4)
      expect(board.every(row => row.every(cell => cell === null))).toBe(true)
    })
  })

  describe('createInitialGameState', () => {
    it('should create initial game state with red player', () => {
      const gameState = createInitialGameState()
      
      expect(gameState.currentPlayer).toBe('red')
      expect(gameState.winner).toBe(null)
      expect(gameState.gameOver).toBe(false)
      expect(gameState.board).toHaveLength(4)
      expect(gameState.board[0]).toHaveLength(4)
    })
  })

  describe('dropPiece', () => {
    let board: Player[][]

    beforeEach(() => {
      board = createEmptyBoard()
    })

    it('should drop piece in the bottom row of an empty column', () => {
      const newBoard = dropPiece(board, 0, 'red')
      
      expect(newBoard[3][0]).toBe('red')
      expect(newBoard[2][0]).toBe(null)
      expect(newBoard[1][0]).toBe(null)
      expect(newBoard[0][0]).toBe(null)
    })

    it('should stack pieces in the same column', () => {
      let newBoard = dropPiece(board, 0, 'red')
      newBoard = dropPiece(newBoard, 0, 'black')
      
      expect(newBoard[3][0]).toBe('red')
      expect(newBoard[2][0]).toBe('black')
      expect(newBoard[1][0]).toBe(null)
      expect(newBoard[0][0]).toBe(null)
    })

    it('should not modify the original board', () => {
      const originalBoard = JSON.parse(JSON.stringify(board))
      dropPiece(board, 0, 'red')
      
      expect(board).toEqual(originalBoard)
    })
  })

  describe('isColumnFull', () => {
    let board: Player[][]

    beforeEach(() => {
      board = createEmptyBoard()
    })

    it('should return false for empty column', () => {
      expect(isColumnFull(board, 0)).toBe(false)
    })

    it('should return true for full column', () => {
      // Fill the column
      for (let i = 0; i < 4; i++) {
        board[i][0] = 'red'
      }
      
      expect(isColumnFull(board, 0)).toBe(true)
    })
  })

  describe('checkWinner', () => {
    let board: Player[][]

    beforeEach(() => {
      board = createEmptyBoard()
    })

    it('should return null for empty board', () => {
      expect(checkWinner(board)).toBe(null)
    })

    it('should detect horizontal win', () => {
      // Create horizontal win in first row
      board[0][0] = 'red'
      board[0][1] = 'red'
      board[0][2] = 'red'
      board[0][3] = 'red'
      
      expect(checkWinner(board)).toBe('red')
    })

    it('should detect vertical win', () => {
      // Create vertical win in first column
      board[0][0] = 'black'
      board[1][0] = 'black'
      board[2][0] = 'black'
      board[3][0] = 'black'
      
      expect(checkWinner(board)).toBe('black')
    })

    it('should detect diagonal win (top-left to bottom-right)', () => {
      // Create diagonal win
      board[0][0] = 'red'
      board[1][1] = 'red'
      board[2][2] = 'red'
      board[3][3] = 'red'
      
      expect(checkWinner(board)).toBe('red')
    })

    it('should detect diagonal win (top-right to bottom-left)', () => {
      // Create diagonal win
      board[0][3] = 'black'
      board[1][2] = 'black'
      board[2][1] = 'black'
      board[3][0] = 'black'
      
      expect(checkWinner(board)).toBe('black')
    })

    it('should return null when no winner', () => {
      // Create a board with some pieces but no win
      board[0][0] = 'red'
      board[0][1] = 'black'
      board[1][0] = 'red'
      board[1][1] = 'black'
      
      expect(checkWinner(board)).toBe(null)
    })
  })

  describe('isBoardFull', () => {
    let board: Player[][]

    beforeEach(() => {
      board = createEmptyBoard()
    })

    it('should return false for empty board', () => {
      expect(isBoardFull(board)).toBe(false)
    })

    it('should return false for partially filled board', () => {
      board[0][0] = 'red'
      board[0][1] = 'black'
      
      expect(isBoardFull(board)).toBe(false)
    })

    it('should return true for full board', () => {
      // Fill the entire board
      for (let row = 0; row < 4; row++) {
        for (let col = 0; col < 4; col++) {
          board[row][col] = row % 2 === 0 ? 'red' : 'black'
        }
      }
      
      expect(isBoardFull(board)).toBe(true)
    })
  })
})
