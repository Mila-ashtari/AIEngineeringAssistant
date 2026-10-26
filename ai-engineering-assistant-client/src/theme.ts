
import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    primary: {
      main: '#6366F1',
      dark: '#4F46E5',
    },
    background: {
      default: '#F5F7FB',
      paper: '#FFFFFF',
    },
    text: {
      primary: '#17243B',
      secondary: '#64748B',
    },
  },
  shape: {
    borderRadius: 12,
  },
  typography: {
    fontFamily: '"Inter", "Roboto", sans-serif',
    h4: {
      fontWeight: 700,
      letterSpacing: '-0.5px',
    },
    h6: {
      fontWeight: 600,
    },
    button: {
      textTransform: 'none',
      fontWeight: 600,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 9,
          paddingInline: 18,
          boxShadow: 'none',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          boxShadow: '0 4px 20px rgba(15,23,42,0.04)',
        },
      },
    },
    MuiTextField: {
      defaultProps: {
        variant: 'outlined',
        size: 'small',
      },
    },
  },
});
