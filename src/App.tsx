// import './App.css';
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { useMediaQuery } from "@mui/material";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import BaseRouter from "./router/index";
import { useEffect } from "react";
import "./assets/scss/App.scss";
import AppContextProvider from "./components/hooks/context";
import { queryClient } from "./queries/CustomQueryClient";
import { SnackbarProvider } from "notistack";
const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#9c0c13",
    },
    secondary: {
      main: "#ff6333",
    },
  },
});

// const queryClient = new QueryClient();

export default function App() {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const theme = prefersDarkMode ? darkTheme : lightTheme;

  return (
    <div className="App">
      <SnackbarProvider>
        <QueryClientProvider client={queryClient}>
          <AppContextProvider>
            <QueryClientProvider client={queryClient}>
              <ThemeProvider theme={theme}>
                <CssBaseline />
                <BaseRouter />
              </ThemeProvider>
            </QueryClientProvider>
          </AppContextProvider>
        </QueryClientProvider>
      </SnackbarProvider>
    </div>
  );
}
