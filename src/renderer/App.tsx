import './App.css';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { useMediaQuery } from '@mui/material';
import BaseRouter from './router/index';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#9c0c13',
    },
    secondary: {
      main: '#ff6333',
    },
  },
});

export default function App() {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const theme = prefersDarkMode ? darkTheme : lightTheme;

  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <BaseRouter />
      </ThemeProvider>
    </div>
  );
}
