import type { SxProps, Theme } from "@mui/material";

export const appBarSx: SxProps<Theme> = {
  position: "fixed",
  top: 0,
  width: "100%",
  boxShadow: 3,
  zIndex: 1200,
};

export const toolbarSx: SxProps<Theme> = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  minHeight: 64,
  px: 2,
};

export const leftSectionSx: SxProps<Theme> = {
  display: "flex",
  alignItems: "center",
  gap: 1,
};

export const titleSx: SxProps<Theme> = (theme) => ({
  fontWeight: 600,
  [theme.breakpoints.down("sm")]: { display: "none" },
});

export const rightSectionSx: SxProps<Theme> = (theme) => ({
  display: "flex",
  alignItems: "center",
  gap: theme.spacing(1),
});

export const themeButtonSx: SxProps<Theme> = {
  ml: 1,
};
