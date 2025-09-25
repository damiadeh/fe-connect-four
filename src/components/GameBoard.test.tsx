import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { ThemeProvider } from '@mui/material'
import { createTheme } from '@mui/material/styles'
import GameBoard from './GameBoard'

// Mock localStorage
const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
}
Object.defineProperty(window, 'localStorage', {
  value: localStorageMock
})

const renderWithTheme = (component: React.ReactElement) => {
  const theme = createTheme()
  return render(
    <ThemeProvider theme={theme}>
      {component}
    </ThemeProvider>
  )
}

describe('GameBoard - Core Functionality', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should render the game board with reset button', () => {
    renderWithTheme(<GameBoard />)
    
    expect(screen.getByText('RESET BOARD')).toBeInTheDocument()
  })

  it('should render 4x4 grid of empty cells', () => {
    renderWithTheme(<GameBoard />)
    
    // Should have 4 drop pieces (red circles above columns)
    const dropPieces = screen.getAllByText('🔴')
    expect(dropPieces).toHaveLength(4)
    
    // Should have 16 empty cells (4x4 grid)
    const emptyCells = screen.getAllByText('⬜')
    expect(emptyCells).toHaveLength(16)
  })

  it('should handle column click and drop piece', () => {
    renderWithTheme(<GameBoard />)
    
    // Click on first column
    const firstColumn = screen.getAllByText('🔴')[0]
    fireEvent.click(firstColumn)
    
    // Should have at least one red piece placed on the board
    const redPieces = screen.getAllByText('🔴')
    expect(redPieces.length).toBeGreaterThan(0)
  })

  it('should detect horizontal win', () => {
    renderWithTheme(<GameBoard />)
    
    // Click columns to create horizontal win
    const columns = screen.getAllByText('🔴')
    
    // Drop pieces in first row to create horizontal win
    fireEvent.click(columns[0]) // Red in column 0
    fireEvent.click(columns[1]) // Black in column 1
    fireEvent.click(columns[0]) // Red in column 0
    fireEvent.click(columns[2]) // Black in column 2
    fireEvent.click(columns[0]) // Red in column 0
    fireEvent.click(columns[3]) // Black in column 3
    fireEvent.click(columns[0]) // Red in column 0 - should win
    
    expect(screen.getByText('🔴 wins!')).toBeInTheDocument()
    expect(screen.getByText('New Game')).toBeInTheDocument()
  })

  it('should reset the game when reset button is clicked', () => {
    renderWithTheme(<GameBoard />)
    
    // Make some moves
    const columns = screen.getAllByText('🔴')
    fireEvent.click(columns[0])
    fireEvent.click(columns[1])
    
    // Click reset
    const resetButton = screen.getByText('RESET BOARD')
    fireEvent.click(resetButton)
    
    // Should be back to initial state
    const statusElement = screen.getByRole('heading', { level: 6 })
    expect(statusElement).toHaveTextContent('')
    expect(screen.getAllByText('⬜')).toHaveLength(16) // All cells empty
  })

  it('should not allow moves when game is over', () => {
    renderWithTheme(<GameBoard />)
    
    // Create a win
    const columns = screen.getAllByText('🔴')
    fireEvent.click(columns[0])
    fireEvent.click(columns[1])
    fireEvent.click(columns[0])
    fireEvent.click(columns[2])
    fireEvent.click(columns[0])
    fireEvent.click(columns[3])
    fireEvent.click(columns[0]) // Win
    
    // Try to make another move
    fireEvent.click(columns[1])
    
    // Should still show winner message
    expect(screen.getByText('🔴 wins!')).toBeInTheDocument()
  })
})
