import axios from "axios";
import type { CastMember, MovieDetail, MovieSummary } from "../types/api";

const TMDB_API_KEY = import.meta.env.VITE_IMDB_API_KEY;
const TMDB_BASE_URL = import.meta.env.VITE_TMDB_BASE_URL;
const IMAGE_BASE_URL = import.meta.env.VITE_IMAGE_BASE_URL;

const api = axios.create({
  baseURL: TMDB_BASE_URL,
  params: {
    api_key: TMDB_API_KEY,
    language: "pt-BR",
  },
});

export const searchMovies = async (
  keyword: string,
  page: number = 1
): Promise<{ movies: MovieSummary[]; page: number; total_pages: number }> => {
  try {
    const { data } = await api.get("/search/movie", {
      params: { query: keyword, include_adult: false, page },
    });

    const moviesWithDescription = (data.results as MovieSummary[]).map(
      (movie) => {
        return { ...movie };
      }
    );

    return {
      movies: moviesWithDescription,
      page: data.page,
      total_pages: data.total_pages,
    };
  } catch (error) {
    throw new Error(`Erro ao buscar filmes: ${(error as Error).message}`);
  }
};

export const getMovieById = async (id: string): Promise<MovieDetail> => {
  try {
    const [movieRes, creditsRes] = await Promise.all([
      api.get(`/movie/${id}`),
      api.get(`/movie/${id}/credits`),
    ]);

    return {
      ...movieRes.data,
      cast: creditsRes.data.cast as CastMember[],
    };
  } catch (error) {
    throw new Error(`ID de filme inexistente: ${(error as Error).message}`);
  }
};

export const getPopularMovies = async (page: number = 1) => {
  const { data } = await api.get("/movie/popular", { params: { page } });
  return data.results;
};

export const getPosterUrl = (path: string | null, size: string = "w500") =>
  path ? `${IMAGE_BASE_URL}${size}${path}` : null;

export const getProfileUrl = (path: string | null, size: string = "w200") =>
  path ? `${IMAGE_BASE_URL}${size}${path}` : null;
