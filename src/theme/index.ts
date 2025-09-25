import { createTheme, Theme } from '@mui/material/styles';
import { Theme as AppTheme } from '../types';
import { themeColors } from './colors';

export const getTheme = (theme: AppTheme): Theme => {
  const colors = themeColors[theme === 'default' ? 'blue' : theme];
  
  return createTheme({
    palette: {
      primary: {
        main: colors.main,
        light: colors.light,
        dark: colors.dark,
        contrastText: colors.contrastText,
      },
    },
  });
};
