import { memo } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
  Box,
} from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

import noPoster from "../../assets/no-poster.png";
import type { MovieSummary } from "../../types/api";
import {
  cardSx,
  actionAreaSx,
  mediaSx,
  contentSx,
  titleSx,
  releaseDateSx,
  infoRowSx,
  infoItemSx,
} from "./styles";
import { formatDate } from "../../utils/formatDate";

interface IMovie {
  movie: MovieSummary;
}

const MovieCard = memo(({ movie }: IMovie) => {
  const navigate = useNavigate();
  const { search: fromSearch } = useLocation();

  const posterUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : noPoster;

  const handleClick = () => {
    navigate(`/movie/${movie.id}`, { state: { from: fromSearch } });
  };

  return (
    <Card
      onClick={handleClick}
      sx={cardSx}
      aria-labelledby={`movie-title-${movie.id}`}
    >
      <CardActionArea sx={actionAreaSx}>
        <CardMedia
          component="img"
          loading="lazy"
          image={posterUrl}
          alt={`Pôster de ${movie.title}`}
          sx={mediaSx}
        />

        <CardContent sx={contentSx}>
          <Typography id={`movie-title-${movie.id}`} sx={titleSx}>
            {movie.title}
          </Typography>
          <Typography sx={releaseDateSx}>
            {formatDate(movie.release_date)}
          </Typography>
          <Box sx={infoRowSx}>
            <Box sx={infoItemSx}>
              <FontAwesomeIcon icon={faStar} color="#FFD700" />
              <Typography>{movie.vote_average.toFixed(1)}</Typography>
            </Box>
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  );
});

export default MovieCard;
