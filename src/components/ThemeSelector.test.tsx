import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { ThemeProvider } from '@mui/material'
import { createTheme } from '@mui/material/styles'
import ThemeSelector from './ThemeSelector'
import { Theme } from '../types'

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

// Mock window.location.reload
const mockReload = vi.fn()
Object.defineProperty(window, 'location', {
  value: {
    reload: mockReload
  },
  writable: true
})

const renderWithTheme = (component: React.ReactElement) => {
  const theme = createTheme()
  return render(
    <ThemeProvider theme={theme}>
      {component}
    </ThemeProvider>
  )
}

describe('ThemeSelector', () => {
  const mockOnThemeChange = vi.fn()

  beforeEach(() => {
    vi.clearAllMocks()
    mockReload.mockClear()
  })

  it('should render theme selector with all theme options', () => {
    renderWithTheme(
      <ThemeSelector 
        currentTheme="default" 
        onThemeChange={mockOnThemeChange} 
      />
    )
    
    expect(screen.getByText('Choose Theme:')).toBeInTheDocument()
    expect(screen.getByText('Blue')).toBeInTheDocument()
    expect(screen.getByText('Purple')).toBeInTheDocument()
    expect(screen.getByText('Green')).toBeInTheDocument()
  })

  it('should highlight the current theme', () => {
    renderWithTheme(
      <ThemeSelector 
        currentTheme="purple" 
        onThemeChange={mockOnThemeChange} 
      />
    )
    
    const purpleButton = screen.getByText('Purple')
    const blueButton = screen.getByText('Blue')
    const greenButton = screen.getByText('Green')
    
    // Purple should be contained (active), others should be outlined
    expect(purpleButton.closest('button')).toHaveClass('MuiButton-contained')
    expect(blueButton.closest('button')).toHaveClass('MuiButton-outlined')
    expect(greenButton.closest('button')).toHaveClass('MuiButton-outlined')
  })

  it('should call onThemeChange and reload when theme is clicked', () => {
    renderWithTheme(
      <ThemeSelector 
        currentTheme="default" 
        onThemeChange={mockOnThemeChange} 
      />
    )
    
    const greenButton = screen.getByText('Green')
    fireEvent.click(greenButton)
    
    expect(mockOnThemeChange).toHaveBeenCalledWith('green')
    expect(localStorageMock.setItem).toHaveBeenCalledWith('connectFourTheme', 'green')
  })

  it('should save theme to localStorage when changed', () => {
    renderWithTheme(
      <ThemeSelector 
        currentTheme="default" 
        onThemeChange={mockOnThemeChange} 
      />
    )
    
    const purpleButton = screen.getByText('Purple')
    fireEvent.click(purpleButton)
    
    expect(localStorageMock.setItem).toHaveBeenCalledWith('connectFourTheme', 'purple')
  })

  it('should handle all theme changes correctly', () => {
    const themes: Theme[] = ['default', 'purple', 'green']
    
    themes.forEach(theme => {
      const { unmount } = renderWithTheme(
        <ThemeSelector 
          currentTheme={theme} 
          onThemeChange={mockOnThemeChange} 
        />
      )
      
      // Find a different theme to click
      const otherThemes = themes.filter(t => t !== theme)
      const otherTheme = otherThemes[0]
      const otherThemeButton = screen.getByText(
        otherTheme === 'default' ? 'Blue' : 
        otherTheme === 'purple' ? 'Purple' : 'Green'
      )
      
      fireEvent.click(otherThemeButton)
      
      expect(mockOnThemeChange).toHaveBeenCalledWith(otherTheme)
      expect(localStorageMock.setItem).toHaveBeenCalledWith('connectFourTheme', otherTheme)
      
      unmount()
      vi.clearAllMocks()
    })
  })

  it('should display correct button labels', () => {
    renderWithTheme(
      <ThemeSelector 
        currentTheme="default" 
        onThemeChange={mockOnThemeChange} 
      />
    )
    
    expect(screen.getByText('Blue')).toBeInTheDocument()
    expect(screen.getByText('Purple')).toBeInTheDocument()
    expect(screen.getByText('Green')).toBeInTheDocument()
  })

  it('should have proper button styling', () => {
    renderWithTheme(
      <ThemeSelector 
        currentTheme="green" 
        onThemeChange={mockOnThemeChange} 
      />
    )
    
    const buttons = screen.getAllByRole('button')
    expect(buttons).toHaveLength(3)
    
    // All buttons should have uppercase text
    buttons.forEach(button => {
      expect(button).toHaveStyle('text-transform: uppercase')
    })
  })
})
