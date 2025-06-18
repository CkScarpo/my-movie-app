import { useCallback } from "react";
import { AppBar, Toolbar, Typography, Button, IconButton } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilm, faMoon, faSun } from "@fortawesome/free-solid-svg-icons";
import { useThemeStore } from "../../store/themeStore";

export const Header = () => {
  const { mode, toggleTheme, increaseFont, decreaseFont, resetFont } =
    useThemeStore();

  const handleToggleTheme = useCallback(() => {
    toggleTheme();
  }, [toggleTheme]);

  const handleIncreaseFont = useCallback(() => {
    increaseFont();
  }, [increaseFont]);

  const handleDecreaseFont = useCallback(() => {
    decreaseFont();
  }, [decreaseFont]);

  const handleResetFont = useCallback(() => {
    resetFont();
  }, [resetFont]);

  return (
    <AppBar position="static">
      <Toolbar>
        <FontAwesomeIcon icon={faFilm} />
        <Typography variant="h6" sx={{ flexGrow: 1, ml: 1 }}>
          Movie TMDB
        </Typography>
        <Button color="inherit" onClick={handleDecreaseFont}>
          A-
        </Button>
        <Button color="inherit" onClick={handleResetFont}>
          A
        </Button>
        <Button color="inherit" onClick={handleIncreaseFont}>
          A+
        </Button>
        <IconButton color="inherit" sx={{ ml: 1 }} onClick={handleToggleTheme}>
          {mode === "light" ? (
            <FontAwesomeIcon icon={faMoon} size="lg" />
          ) : (
            <FontAwesomeIcon icon={faSun} size="lg" />
          )}
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};
