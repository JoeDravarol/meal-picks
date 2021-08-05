import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { createTheme, ThemeProvider } from '@material-ui/core/styles';

const theme = createTheme({
  mixins: {
    toolbar: {
      minHeight: 82,
    },
  },
  palette: {
    common: {
      black: '#333',
    },
    primary: {
      main: '#f6412f',
    },
    secondary: {
      main: '#faeec8',
      dark: '#dec9b1',
    },
  },
  typography: {
    fontFamily: '"Bitter", "Times New Roman", "Times", serif',
    fontFamilyHeader: '"Dosis", "Helvetica", "Arial", sans-serif',
    h1: {
      fontFamily: '"Dosis", "Helvetica", "Arial", sans-serif',
      fontWeight: 700,
    },
    h2: {
      fontFamily: '"Dosis", "Helvetica", "Arial", sans-serif',
      fontWeight: 700,
    },
    h3: {
      fontFamily: '"Dosis", "Helvetica", "Arial", sans-serif',
      fontWeight: 600,
    },
    h4: {
      fontFamily: '"Dosis", "Helvetica", "Arial", sans-serif',
      fontWeight: 600,
    },
    h5: {
      fontFamily: '"Dosis", "Helvetica", "Arial", sans-serif',
      fontWeight: 600,
    },
    h6: {
      fontFamily: '"Dosis", "Helvetica", "Arial", sans-serif',
      fontWeight: 500,
    },
  },
});

theme.overrides = {
  MuiButton: {
    root: {
      borderRadius: 0, // square corners
      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    },
  },
};

const MuiTheme = ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};

export default MuiTheme;
