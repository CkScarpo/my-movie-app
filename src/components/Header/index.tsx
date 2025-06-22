import React, { useCallback } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Box,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilm, faMoon, faSun } from "@fortawesome/free-solid-svg-icons";
import SearchBar from "../SearchBar";
import { useThemeStore } from "../../store/themeStore";
import { useMovieStore } from "../../store/movieStore";
import {
  appBarSx,
  toolbarSx,
  leftSectionSx,
  titleSx as headerTitleSx,
  rightSectionSx,
  themeButtonSx,
} from "./styles";

const Header: React.FC = React.memo(() => {
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("md"));

  const mode = useThemeStore((s) => s.mode);
  const toggleTheme = useThemeStore((s) => s.toggleTheme);
  const increaseFont = useThemeStore((s) => s.increaseFont);
  const decreaseFont = useThemeStore((s) => s.decreaseFont);
  const resetFont = useThemeStore((s) => s.resetFont);

  const searchByKeyword = useMovieStore((s) => s.searchByKeyword);
  const resetSearch = useMovieStore((s) => s.resetSearch);

  const handleSearch = useCallback(
    (term: string) => {
      resetSearch();
      if (term.trim()) {
        searchByKeyword(term.trim(), 1, false);
      } else {
        useMovieStore.getState().fetchPopularMovies();
      }
      if (location.pathname !== "/") {
        navigate("/");
      }
    },
    [navigate, location.pathname, resetSearch, searchByKeyword]
  );

  return (
    <AppBar sx={appBarSx}>
      <Toolbar sx={toolbarSx}>
        <Box sx={leftSectionSx}>
          <FontAwesomeIcon icon={faFilm} size="lg" />
          <Typography variant="h6" sx={headerTitleSx}>
            Movie TMDB
          </Typography>
        </Box>

        <Box sx={rightSectionSx}>
          {isDesktop && (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                height: "100%",
                mr: 2,
                border:
                  theme.palette.mode === "light"
                    ? `1px solid ${theme.palette.divider}`
                    : undefined,
                borderRadius: 1,
                px: 1,
              }}
            >
              <SearchBar onSearch={handleSearch} fullHeight />
            </Box>
          )}

          <IconButton color="inherit" onClick={decreaseFont}>
            A-
          </IconButton>
          <IconButton color="inherit" onClick={resetFont}>
            A
          </IconButton>
          <IconButton color="inherit" onClick={increaseFont}>
            A+
          </IconButton>
          <IconButton color="inherit" sx={themeButtonSx} onClick={toggleTheme}>
            {mode === "light" ? (
              <FontAwesomeIcon icon={faMoon} />
            ) : (
              <FontAwesomeIcon icon={faSun} />
            )}
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
});

export default Header;
