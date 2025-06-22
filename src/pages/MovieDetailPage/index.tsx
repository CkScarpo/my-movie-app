import { memo, useEffect } from "react";
import { Box, Fab, Typography } from "@mui/material";
import { useMovieStore } from "../../store/movieStore";
import noPoster from "../../assets/no-poster.png";
import noProfileImg from "../../assets/no-profile.png";
import {
  containerSx,
  gridSx,
  imageSx,
  titleSx,
  yearSx,
  sectionSx,
  castListSx,
  castItemSx,
  castImageSx,
  castNameSx,
  castCharacterSx,
  fabSx,
} from "./styles";
import { formatDate } from "../../utils/formatDate";
import { LoadingSpinner } from "../../components/LoadingSpinner";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRotateBackward } from "@fortawesome/free-solid-svg-icons";
import { useNavigate, useParams } from "react-router-dom";

const MovieDetailPage = memo(() => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const fetchMovieDetail = useMovieStore((s) => s.fetchMovieDetail);
  const movieDetail = useMovieStore((s) =>
    id ? s.movieDetails[id] : undefined
  );
  const loading = useMovieStore((s) => s.loading);
  const currentSearch = useMovieStore((s) => s.currentSearch);

  useEffect(() => {
    if (id) fetchMovieDetail(id);
  }, [fetchMovieDetail, id]);

  if (loading) {
    return (
      <Box sx={containerSx}>
        <LoadingSpinner />
      </Box>
    );
  }

  if (!movieDetail) {
    return null;
  }

  const {
    title,
    release_date,
    overview,
    backdrop_path,
    cast = [],
  } = movieDetail;

  const posterSrc = backdrop_path
    ? `https://image.tmdb.org/t/p/w500${backdrop_path}`
    : noPoster;

  return (
    <Box sx={containerSx}>
      <Box sx={gridSx}>
        <Box
          component="img"
          data-testid="poster"
          loading="lazy"
          src={posterSrc}
          alt={`Pôster de ${title}`}
          sx={imageSx}
        />

        <Box>
          <Typography sx={titleSx}>{title}</Typography>
          <Typography sx={yearSx} data-testid="release-date">
            {formatDate(release_date)}
          </Typography>

          <Box sx={sectionSx}>
            <Typography variant="h6" gutterBottom>
              Descrição
            </Typography>
            <Typography>{overview}</Typography>
          </Box>
        </Box>
      </Box>

      {cast.length > 0 && (
        <Box sx={sectionSx}>
          <Typography variant="h6" gutterBottom>
            Elenco
          </Typography>
          <Box sx={castListSx}>
            {cast.map((member) => (
              <Box key={member.id} sx={castItemSx}>
                <Box
                  component="img"
                  loading="lazy"
                  src={
                    member.profile_path
                      ? `https://image.tmdb.org/t/p/w200${member.profile_path}`
                      : noProfileImg
                  }
                  alt={member.name}
                  sx={castImageSx}
                />
                <Typography sx={castNameSx}>{member.name}</Typography>
                <Typography sx={castCharacterSx}>{member.character}</Typography>
              </Box>
            ))}
          </Box>
        </Box>
      )}

      <Fab
        color="primary"
        aria-label="voltar"
        sx={fabSx}
        onClick={() =>
          navigate({
            pathname: "/",
            search: currentSearch ? `?search=${currentSearch}` : "",
          })
        }
      >
        <FontAwesomeIcon icon={faArrowRotateBackward} />
      </Fab>
    </Box>
  );
});

export default MovieDetailPage;
