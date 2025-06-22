import React, { useState, useCallback, type FormEvent } from "react";
import {
  Box,
  TextField,
  IconButton,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

interface SearchBarProps {
  initialValue?: string;
  onSearch: (term: string) => void;
  fullHeight?: boolean;
}

const SearchBar: React.FC<SearchBarProps> = React.memo(
  ({ initialValue = "", onSearch, fullHeight = false }) => {
    const [term, setTerm] = useState(initialValue);
    const theme = useTheme();
    const isDesktop = useMediaQuery(theme.breakpoints.up("md"));

    const handleSubmit = useCallback(
      (e: FormEvent) => {
        e.preventDefault();
        onSearch(term.trim());
      },
      [onSearch, term]
    );

    const handleKeyDown = useCallback(
      (e: React.KeyboardEvent) => {
        if (e.key === "Enter") {
          e.preventDefault();
          onSearch(term.trim());
        }
      },
      [onSearch, term]
    );

    return (
      <Box
        component="form"
        onSubmit={handleSubmit}
        aria-label="Barra de busca"
        sx={{
          display: "flex",
          alignItems: "center",
          height: fullHeight ? "100%" : "auto",
        }}
      >
        <TextField
          placeholder="Buscar filme"
          variant="outlined"
          size="small"
          value={term}
          onChange={(e) => setTerm(e.target.value)}
          onKeyDown={handleKeyDown}
          sx={{
            ...(isDesktop && {
              mr: 1,
              width: 200,
            }),

            "& .MuiOutlinedInput-root": {
              [theme.breakpoints.up("md")]: {
                color: "#FFFFFF",
                "& fieldset": {
                  borderColor: "#FFFFFF",
                },
                "&:hover fieldset": {
                  borderColor: "#CECECE",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#FFFFFF",
                },
              },
            },
            "& .MuiOutlinedInput-input::placeholder": {
              [theme.breakpoints.up("md")]: {
                color: "rgba(255,255,255,0.7)",
                opacity: 1,
              },
            },
          }}
          aria-label="Campo de busca"
        />
        <IconButton
          type="button"
          onClick={handleSubmit}
          onKeyDown={handleKeyDown}
          color="inherit"
          size="medium"
        >
          <FontAwesomeIcon icon={faSearch} />
        </IconButton>
      </Box>
    );
  }
);

export default SearchBar;
