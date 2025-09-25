import { useState } from "react";
import {
  ThemeProvider,
  CssBaseline,
  Box,
  Typography,
  Container,
} from "@mui/material";
import { Theme } from "./types";
import { getTheme } from "./theme";
import GameBoard from "./components/GameBoard";
import ThemeSelector from "./components/ThemeSelector";

function App() {
  const [currentTheme, setCurrentTheme] = useState<Theme>(() => {
    const savedTheme = localStorage.getItem("connectFourTheme") as Theme;
    return savedTheme || "default";
  });

  return (
    <ThemeProvider theme={getTheme(currentTheme)}>
      <CssBaseline />
      <Container
        maxWidth="lg"
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "100%",
          height: "100vh",
          pt: 4,
        }}
      >
        <Box>
          <Typography
            variant="h2"
            component="h1"
            align="center"
            sx={{
              fontWeight: "bold",
              marginBottom: 1,
              color: "text.primary",
              fontSize: { xs: "2rem", sm: "2.5rem", md: "3rem" },
            }}
          >
            Connect Four!
          </Typography>

          <Typography
            variant="h6"
            align="center"
            sx={{
              marginBottom: 3,
              color: "text.primary",
              fontSize: { xs: "1rem", sm: "1.1rem" },
            }}
          >
            Get four of the same color in a row to win!
          </Typography>
        </Box>

        <Box
          sx={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
          }}
        >
          <Box sx={{ width: "100%" }}>
            <GameBoard />
            <Box sx={{textAlign: "center" }}>
              <ThemeSelector
                currentTheme={currentTheme}
                onThemeChange={setCurrentTheme}
              />
            </Box>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default App;
