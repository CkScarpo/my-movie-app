import { faFilm } from "@fortawesome/free-solid-svg-icons";
import { AnimatedFilmIcon, Container, FadeText } from "./styles";

export const LoadingSpinner = () => {
  return (
    <Container>
      <AnimatedFilmIcon icon={faFilm} />
      <FadeText variant="h6" mt={2}>
        Carregando...
      </FadeText>
    </Container>
  );
};
