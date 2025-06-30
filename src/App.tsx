import { CssBaseline, ThemeProvider } from "@mui/material";
import { AppRouter } from "./routes/AppRouter";
import { theme } from "./styles/theme";
import { ProgressProvider } from "./context/ProgressContext";

const App = () => {
  return (
    <ProgressProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AppRouter />
      </ThemeProvider>
    </ProgressProvider>
  );
}

export default App;