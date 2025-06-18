import { Typography } from "@mui/material";
import { faCarSide } from "@fortawesome/free-solid-svg-icons";
import { AnimatedCarIcon, Container } from "./styles";

export const LoadingSpinner = () => {
  return (
    <Container>
      <AnimatedCarIcon icon={faCarSide} />
      <Typography variant="h6" mt={2}>
        Carregando...
      </Typography>
    </Container>
  );
};
