import type { SxProps, Theme } from "@mui/material";

export const containerSx: SxProps<Theme> = (theme) => ({
  pt: theme.spacing(14),
  pb: theme.spacing(4),
  px: theme.spacing(8),
  [theme.breakpoints.down("sm")]: { px: theme.spacing(3) },
});
export const titleSx: SxProps<Theme> = { mb: 3 };
export const gridSx: SxProps<Theme> = (theme) => ({
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
  gap: theme.spacing(2),
});
export const loaderMoreSx: SxProps<Theme> = { textAlign: "center", my: 2 };
