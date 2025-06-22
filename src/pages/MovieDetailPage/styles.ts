import type { SxProps, Theme } from "@mui/material";

export const containerSx: SxProps<Theme> = (theme) => ({
  pt: theme.spacing(14),
  pb: theme.spacing(4),
  px: theme.spacing(8),
  [theme.breakpoints.down("sm")]: { px: theme.spacing(3) },
});

export const gridSx: SxProps<Theme> = (theme) => ({
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: theme.spacing(4),
  mb: theme.spacing(4),
  [theme.breakpoints.down("sm")]: {
    gridTemplateColumns: "1fr",
  },
});

export const imageSx: SxProps<Theme> = {
  width: "100%",
  borderRadius: 2,
  objectFit: "cover",
};

export const titleSx: SxProps<Theme> = {
  fontSize: "1.75rem",
  fontWeight: 600,
  mb: 1,
};

export const yearSx: SxProps<Theme> = {
  fontSize: "1rem",
  color: "text.secondary",
  mb: 3,
};

export const sectionSx: SxProps<Theme> = (theme) => ({
  mb: theme.spacing(3),
});

export const castListSx: SxProps<Theme> = (theme) => ({
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(120px, 1fr))",
  gap: theme.spacing(2),
});

export const castItemSx: SxProps<Theme> = (theme) => ({
  textAlign: "center",
  transition: "transform 0.3s, box-shadow 0.3s",
  mb: 2,
  "&:hover": {
    transform: "scale(1.05)",
    boxShadow: theme.shadows[1],
  },
});

export const castImageSx: SxProps<Theme> = {
  width: "130px",
  height: "180px",
  borderRadius: "50%",
  objectFit: "cover",
  mb: 1,
};

export const castNameSx: SxProps<Theme> = {
  fontWeight: "bold",
  fontSize: "0.9rem",
};

export const castCharacterSx: SxProps<Theme> = {
  fontStyle: "italic",
  fontSize: "0.8rem",
  color: "text.secondary",
};

export const fabSx: SxProps<Theme> = (theme) => ({
  position: "fixed",
  bottom: theme.spacing(3),
  right: theme.spacing(3),
  zIndex: theme.zIndex.tooltip,
});
