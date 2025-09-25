import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import App from './App'

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

describe('App', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    localStorageMock.getItem.mockReturnValue(null)
  })

  it('should render the main app components', () => {
    render(<App />)
    
    expect(screen.getByText('Connect Four!')).toBeInTheDocument()
    expect(screen.getByText('Get four of the same color in a row to win!')).toBeInTheDocument()
    expect(screen.getByText('Choose Theme:')).toBeInTheDocument()
  })

  it('should initialize with default theme when no saved theme', () => {
    localStorageMock.getItem.mockReturnValue(null)
    render(<App />)
    
    // Should show blue theme as default
    const blueButton = screen.getByText('Blue')
    expect(blueButton.closest('button')).toHaveClass('MuiButton-contained')
  })

  it('should initialize with saved theme from localStorage', () => {
    localStorageMock.getItem.mockReturnValue('purple')
    render(<App />)
    
    // Should show purple theme as active
    const purpleButton = screen.getByText('Purple')
    expect(purpleButton.closest('button')).toHaveClass('MuiButton-contained')
  })

  it('should render game board and theme selector', () => {
    render(<App />)
    
    // Game board elements - status is empty by default
    const statusElements = screen.getAllByRole('heading', { level: 6 })
    const gameStatusElement = statusElements.find(el => el.textContent === '')
    expect(gameStatusElement).toBeDefined()
    expect(screen.getByText('RESET BOARD')).toBeInTheDocument()
    
    // Theme selector elements
    expect(screen.getByText('Blue')).toBeInTheDocument()
    expect(screen.getByText('Purple')).toBeInTheDocument()
    expect(screen.getByText('Green')).toBeInTheDocument()
  })

  it('should have proper layout structure', () => {
    render(<App />)
    
    // Check that main elements are present
    expect(screen.getByText('Connect Four!')).toBeInTheDocument()
    expect(screen.getByText('Get four of the same color in a row to win!')).toBeInTheDocument()
    
    // Check that game board is rendered
    expect(screen.getAllByText('🔴')).toHaveLength(4) // Drop pieces
    expect(screen.getAllByText('⬜')).toHaveLength(16) // Empty cells
  })
})
