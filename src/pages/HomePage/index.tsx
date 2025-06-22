import { useEffect, useMemo, useCallback, useRef, memo } from "react";
import { useSearchParams } from "react-router-dom";
import { Box, Typography, CircularProgress } from "@mui/material";
import { useMovieStore } from "../../store/movieStore";
import { useInfiniteScroll } from "../../hooks/useInfiniteScroll";
import MovieCard from "../../components/MovieCard";
import SearchBar from "../../components/SearchBar";
import { containerSx, titleSx, gridSx, loaderMoreSx } from "./styles";
import { LoadingSpinner } from "../../components/LoadingSpinner";

const HomePage = () => {
  const mountedRef = useRef(false);
  const [searchParams] = useSearchParams();
  const initialSearch = useMemo(
    () => searchParams.get("search")?.trim() || "",
    [searchParams]
  );

  const popularMovies = useMovieStore((s) => s.popularMovies);
  const movies = useMovieStore((s) => s.movies);
  const currentSearch = useMovieStore((s) => s.currentSearch);
  const page = useMovieStore((s) => s.page);
  const totalPages = useMovieStore((s) => s.totalPages);
  const loading = useMovieStore((s) => s.loading);

  const fetchPopularMovies = useMovieStore((s) => s.fetchPopularMovies);
  const searchByKeyword = useMovieStore((s) => s.searchByKeyword);
  const resetSearch = useMovieStore((s) => s.resetSearch);

  useEffect(() => {
    if (mountedRef.current) return;
    mountedRef.current = true;
    resetSearch();
    if (initialSearch) {
      searchByKeyword(initialSearch, 1, false);
      return;
    }
    fetchPopularMovies();
  }, [initialSearch, fetchPopularMovies, resetSearch, searchByKeyword]);

  const handleSearch = useCallback(
    (term: string) => {
      resetSearch();
      if (term) {
        searchByKeyword(term, 1, false);
        return;
      }
      fetchPopularMovies();
    },
    [fetchPopularMovies, resetSearch, searchByKeyword]
  );

  const hasMore = useMemo(
    () => Boolean(currentSearch && page < totalPages),
    [currentSearch, page, totalPages]
  );
  const loadMore = useCallback(() => {
    if (currentSearch) searchByKeyword(currentSearch, page + 1, true);
  }, [currentSearch, page, searchByKeyword]);
  const sentinelRef = useInfiniteScroll({
    loading,
    hasMore,
    onLoadMore: loadMore,
    rootMargin: "120px",
  });

  const list = useMemo(
    () => (currentSearch ? movies : popularMovies),
    [currentSearch, movies, popularMovies]
  );

  return (
    <Box sx={containerSx}>
      {loading && page === 1 && (
        <Box data-testid="main-loading-spinner">
          <LoadingSpinner />
        </Box>
      )}
      <Typography variant="h4" sx={titleSx}>
        {currentSearch
          ? `Resultados para "${currentSearch}"`
          : "Filmes Populares"}
      </Typography>

      <Box sx={{ mb: 3, display: { xs: "block", md: "none" } }}>
        <SearchBar initialValue={initialSearch} onSearch={handleSearch} />
      </Box>

      <Box sx={gridSx}>
        {list.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </Box>

      <Box ref={sentinelRef} />

      {loading && page > 1 && (
        <Box sx={loaderMoreSx}>
          <CircularProgress data-testid="main-loading-spinner" size={24} />
        </Box>
      )}
    </Box>
  );
};

export default memo(HomePage);
