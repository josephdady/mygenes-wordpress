import { createTheme, responsiveFontSizes } from '@mui/material/styles';
import { red } from '@mui/material/colors';

// Create a theme instance.
let theme = createTheme({
  direction: 'ltr',
  palette: {
    primary: {
      main: '#9a00ff',
      dark: '#27015D',
      light: '#B547FF',
    },
    secondary: {
      main: '#ff2e87',
      light: '#FEEDF6',
    },
    text: {
      primary: '#212124',
      secondary: '#707070',
      disabled: '#9A9A9A',
    },
    error: {
      main: red.A400,
    },
    info: {
      main: '#FFC828',
    },
    success: {
      main: '#fff',
    },
    background: {
      default: '#fff',
    },
  },
  typography: {
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Aileron"',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    h1: {
      fontSize: '5.5rem', // 88px
      fontWeight: 'bold',
      lineHeight: 1.05,
    },
    h2: {
      fontSize: '3.5rem', // 56px
      fontWeight: 'bold',
    },
    h3: {
      fontSize: '2.5rem', // 40px
      fontWeight: 700,
    },
    h4: {
      fontSize: '1.5rem', // 24px
      fontWeight: 700,
      lineHeight: 1.45,
    },
    subtitle1: {
      fontSize: '1.25rem', // 20px
      lineHeight: 1.5,
    },
    subtitle2: {
      fontSize: '2rem', // 32px
      lineHeight: 1.5,
      fontWeight: 400,
    },
    /* body1: {
      fontSize: '0.875rem', // 12px
    }, */
    body2: {
      fontSize: '0.75rem', // 12px
    },
  },
  /* components: {
    MuiAppBar: {
      styleOverrides: {
        colorPrimary: {
          backgroundColor: '#fff',
        },
      },
    },
  }, */
});
/* theme = createTheme(theme, {
  typography: {
    subtitle1: {
      color: theme.palette.text.secondary,
    },
  },
}); */
theme = responsiveFontSizes(theme);

export default theme;
