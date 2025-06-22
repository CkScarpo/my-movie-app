import { styled, keyframes } from "@mui/system";
import { Box, Typography } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const pulse = keyframes`
  0% { transform: scale(1); opacity: 0.8; }
  50% { transform: scale(1.2); opacity: 1; }
  100% { transform: scale(1); opacity: 0.8; }
`;

const fade = keyframes`
  0% { opacity: 0.3; }
  50% { opacity: 1; }
  100% { opacity: 0.3; }
`;

export const Container = styled(Box)(({ theme }) => ({
  height: "100vh",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: theme.palette.background.default,
  color: theme.palette.text.primary,
}));

export const AnimatedFilmIcon = styled(FontAwesomeIcon)(({ theme }) => ({
  animation: `${pulse} 1.8s ease-in-out infinite`,
  fontSize: "4rem",
  color: theme.palette.primary.main,
}));

export const FadeText = styled(Typography)({
  animation: `${fade} 2s ease-in-out infinite`,
});
