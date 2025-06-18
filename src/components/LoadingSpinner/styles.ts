import { styled, keyframes } from "@mui/system";
import { Box } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const drive = keyframes`
  0% {
    transform: translateX(-50px);
  }
  50% {
    transform: translateX(50px);
  }
  100% {
    transform: translateX(-50px);
  }
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

export const AnimatedCarIcon = styled(FontAwesomeIcon)({
  animation: `${drive} 2s ease-in-out infinite`,
  fontSize: "2.5rem",
});
