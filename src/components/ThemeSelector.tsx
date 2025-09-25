import { FC } from 'react';
import { Box, Button, Typography } from '@mui/material';
import { Theme } from '../types';
import { themeColors } from '../theme/colors';

interface ThemeSelectorProps {
  currentTheme: Theme;
  onThemeChange: (theme: Theme) => void;
}

const ThemeSelector: FC<ThemeSelectorProps> = ({ currentTheme, onThemeChange }) => {
  const themes: { value: Theme; label: string; color: string }[] = [
    { value: 'default', label: 'Blue', color: themeColors.blue.main },
    { value: 'purple', label: 'Purple', color: themeColors.purple.main },
    { value: 'green', label: 'Green', color: themeColors.green.main },
  ];

  const handleThemeChange = (theme: Theme) => {
    // Save theme to localStorage and update theme without reloading
    localStorage.setItem('connectFourTheme', theme);
    onThemeChange(theme);
  };

  return (
    <Box>
      <Typography 
        variant="h6" 
        sx={{ 
          marginBottom: 2,
          fontSize: { xs: '1rem', sm: '1.1rem' },
          fontWeight: 'bold',
        }}
      >
        Choose Theme:
      </Typography>
      <Box 
        sx={{ 
          display: 'flex', 
          gap: { xs: 0.5, sm: 1 }, 
          justifyContent: 'center',
          flexWrap: 'wrap',
        }}
      >
        {themes.map((theme) => (
          <Button
            key={theme.value}
            variant={currentTheme === theme.value ? 'contained' : 'outlined'}
            onClick={() => handleThemeChange(theme.value)}
            sx={{
              backgroundColor: currentTheme === theme.value ? theme.color : 'transparent',
              borderColor: theme.color,
              color: currentTheme === theme.value ? 'white' : theme.color,
              fontSize: { xs: '0.8rem', sm: '0.9rem' },
              padding: { xs: '6px 12px', sm: '8px 16px' },
              minWidth: { xs: '60px', sm: '80px' },
              textTransform: 'uppercase',
              fontWeight: 'bold',
              '&:hover': {
                backgroundColor: currentTheme === theme.value ? theme.color : `${theme.color}20`,
                borderColor: theme.color,
              },
            }}
          >
            {theme.label}
          </Button>
        ))}
      </Box>
    </Box>
  );
};

export default ThemeSelector;

