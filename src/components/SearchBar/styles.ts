import type { SxProps, Theme } from "@mui/material";

export const formSx: SxProps<Theme> = {
  display: "flex",
  gap: 2,
  mb: 0,
  height: 40,
};

export const textFieldSx: SxProps<Theme> = (theme) => ({
  flex: 1,
  "& .MuiInputBase-input": {
    ...theme.typography.body1,
    color: theme.palette.text.primary,
  },
});

export const buttonSx: SxProps<Theme> = (theme) => ({
  px: 2,
  bgcolor: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
  "&:hover": { bgcolor: theme.palette.primary.dark },
});
