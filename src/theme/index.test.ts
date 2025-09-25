import { describe, it, expect } from 'vitest'
import { getTheme } from './index'
import { Theme } from '../types'

describe('theme', () => {
  describe('getTheme', () => {
    it('should return default blue theme', () => {
      const theme = getTheme('default')
      
      expect(theme.palette.primary.main).toBe('#42a5f5')
      expect(theme.palette.primary.light).toBe('#f5fbff')
      expect(theme.palette.primary.dark).toBe('#1976d2')
      expect(theme.palette.primary.contrastText).toBe('#ffffff')
    })

    it('should return purple theme', () => {
      const theme = getTheme('purple')
      
      expect(theme.palette.primary.main).toBe('#ba68c8')
      expect(theme.palette.primary.light).toBe('#faf2fb')
      expect(theme.palette.primary.dark).toBe('#9c27b0')
      expect(theme.palette.primary.contrastText).toBe('#ffffff')
    })

    it('should return green theme', () => {
      const theme = getTheme('green')
      
      expect(theme.palette.primary.main).toBe('#81c784')
      expect(theme.palette.primary.light).toBe('#f3fcf4')
      expect(theme.palette.primary.dark).toBe('#4caf50')
      expect(theme.palette.primary.contrastText).toBe('#ffffff')
    })

    it('should handle all theme types', () => {
      const themes: Theme[] = ['default', 'purple', 'green']
      
      themes.forEach(themeType => {
        const theme = getTheme(themeType)
        expect(theme.palette.primary.main).toBeDefined()
        expect(theme.palette.primary.light).toBeDefined()
        expect(theme.palette.primary.dark).toBeDefined()
        expect(theme.palette.primary.contrastText).toBeDefined()
      })
    })
  })
})
