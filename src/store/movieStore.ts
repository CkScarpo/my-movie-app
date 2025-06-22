import { create } from "zustand";
import { getMovieById, getPopularMovies, searchMovies } from "../api/tmdb";
import type { MovieSummary, MovieDetail } from "../types/api";
import { handleApiError } from "../utils/handleApiError";

export type MovieStore = {
  popularMovies: MovieSummary[];
  movies: MovieSummary[];
  movieDetails: Record<string, MovieDetail>;
  currentSearch: string;
  page: number;
  totalPages: number;
  loading: boolean;
  error: string | null;
  fetchPopularMovies: () => Promise<void>;
  searchByKeyword: (
    keyword: string,
    page?: number,
    append?: boolean
  ) => Promise<void>;
  fetchMovieDetail: (id: string) => Promise<void>;
  resetSearch: () => void;
};

export const useMovieStore = create<MovieStore>((set, get) => ({
  popularMovies: [],
  movies: [],
  movieDetails: {},
  currentSearch: "",
  page: 1,
  totalPages: 1,
  loading: false,
  error: null,

  fetchPopularMovies: async () => {
    set({ loading: true, error: null });
    try {
      const results = await getPopularMovies();
      set({ popularMovies: results, loading: false });
    } catch (err) {
      const msg = handleApiError(err);
      set({ loading: false, error: msg });
    }
  },

  searchByKeyword: async (keyword, page = 1, append = false) => {
    set({ loading: true, error: null });
    try {
      const { movies, total_pages } = await searchMovies(keyword, page);
      set((state) => ({
        currentSearch: keyword,
        page,
        totalPages: total_pages,
        movies: append ? [...state.movies, ...movies] : movies,
        loading: false,
      }));
    } catch (err) {
      const msg = handleApiError(err);
      set({ loading: false, error: msg });
    }
  },

  fetchMovieDetail: async (id) => {
    set({ loading: true, error: null });
    const cached = get().movieDetails[id];
    if (cached) {
      set({ loading: false });
      return;
    }
    try {
      const detail = await getMovieById(id);
      set((state) => ({
        movieDetails: { ...state.movieDetails, [id]: detail },
        loading: false,
      }));
    } catch (err) {
      const msg = handleApiError(err);
      set({ loading: false, error: msg });
    }
  },

  resetSearch: () => {
    set({
      currentSearch: "",
      movies: [],
      page: 1,
      totalPages: 1,
      error: null,
    });
  },
}));
