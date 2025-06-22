import type { SxProps, Theme } from "@mui/material";

export const cardSx: SxProps<Theme> = {
  display: "flex",
  flexDirection: "column",
  borderRadius: 2,
  overflow: "hidden",
  boxShadow: 3,
  transition: "transform 0.2s, box-shadow 0.2s",
  "&:hover": {
    transform: "translateY(-4px)",
    boxShadow: 6,
  },
};

export const actionAreaSx: SxProps<Theme> = {
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
};

export const mediaSx: SxProps<Theme> = {
  width: "100%",
  height: "auto",
  objectFit: "contain",
  backgroundColor: "#f0f0f0",
};

export const contentSx: SxProps<Theme> = {
  p: 2,
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  textAlign: "left",
};

export const titleSx: SxProps<Theme> = (theme) => ({
  ...theme.typography.subtitle1,
  fontWeight: 600,
  mb: 0.5,
  width: "100%",
  whiteSpace: "normal",
  wordBreak: "break-word",
});

export const releaseDateSx: SxProps<Theme> = (theme) => ({
  ...theme.typography.caption,
  color: theme.palette.text.secondary,
  mb: 1,
  width: "100%",
  whiteSpace: "normal",
  wordBreak: "break-word",
});

export const infoRowSx: SxProps<Theme> = (theme) => ({
  display: "flex",
  alignItems: "center",
  gap: theme.spacing(1),
  mt: 1,
});

export const infoItemSx: SxProps<Theme> = (theme) => ({
  display: "flex",
  alignItems: "center",
  gap: theme.spacing(0.5),
  ...theme.typography.caption,
  color: theme.palette.text.secondary,
  whiteSpace: "nowrap",
});
