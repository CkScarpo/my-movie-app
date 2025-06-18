import { createTheme } from "@mui/material/styles";

const defaultFontSizes = {
  small: 14,
  medium: 16,
  large: 18,
};

export const lightThemeDefaults = {
  palette: {
    primary: "#009739",
    secondary: "#007A63",
    background: "#ffffff",
    text: "#000000",
  },
};

export const darkThemeDefaults = {
  palette: {
    primary: "#00c084",
    secondary: "#005F4C",
    background: "#121212",
    text: "#ffffff",
  },
};

export const getTheme = (mode: "light" | "dark", fontScale: number) => {
  const defaults = mode === "light" ? lightThemeDefaults : darkThemeDefaults;
  return createTheme({
    palette: {
      mode,
      primary: {
        main: defaults.palette.primary,
      },
      secondary: {
        main: defaults.palette.secondary,
      },
      background: {
        default: defaults.palette.background,
      },
      text: {
        primary: defaults.palette.text,
      },
    },
    typography: {
      fontSize: defaultFontSizes.medium * fontScale,
      h1: { fontSize: `${2.5 * fontScale}rem` },
      h2: { fontSize: `${2 * fontScale}rem` },
      body1: { fontSize: `${defaultFontSizes.medium * fontScale}px` },
      body2: { fontSize: `${defaultFontSizes.small * fontScale}px` },
    },
  });
};
