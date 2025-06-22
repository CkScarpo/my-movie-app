import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import HomePage from "./index";
import { useMovieStore } from "../../store/movieStore";
import SearchBar from "../../components/SearchBar";

class MockIntersectionObserver implements IntersectionObserver {
  readonly root: Element | null = null;
  readonly rootMargin: string = "";
  readonly thresholds: ReadonlyArray<number> = [];

  constructor(
    public callback: IntersectionObserverCallback,
    public options?: IntersectionObserverInit
  ) {}

  observe = jest.fn();
  unobserve = jest.fn();
  disconnect = jest.fn();
  takeRecords = jest.fn(() => []);
}

beforeAll(() => {
  Object.defineProperty(global, "IntersectionObserver", {
    writable: true,
    configurable: true,
    value: MockIntersectionObserver,
  });
});

jest.mock("../../store/movieStore", () => ({
  useMovieStore: jest.fn(),
}));

const theme = createTheme();

describe("HomePage", () => {
  const mockFetchPopularMovies = jest.fn();
  const mockSearchByKeyword = jest.fn();
  const mockResetSearch = jest.fn();

  const storeMock = {
    popularMovies: [
      {
        id: 1,
        title: "Inception",
        poster_path: "/poster1.jpg",
        vote_average: 8.8,
      },
      {
        id: 2,
        title: "Matrix",
        poster_path: "/poster2.jpg",
        vote_average: 8.7,
      },
    ],
    movies: [
      {
        id: 3,
        title: "Batman",
        poster_path: "/poster3.jpg",
        vote_average: 7.9,
      },
    ],
    currentSearch: "",
    page: 1,
    totalPages: 2,
    loading: false,
    fetchPopularMovies: mockFetchPopularMovies,
    searchByKeyword: mockSearchByKeyword,
    resetSearch: mockResetSearch,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  const mockStore = (override = {}) => {
    (useMovieStore as unknown as jest.Mock).mockImplementation((selector) =>
      selector({ ...storeMock, ...override })
    );
  };

  const renderWithProviders = (options?: { route?: string }) => {
    return render(
      <ThemeProvider theme={theme}>
        <MemoryRouter initialEntries={[options?.route ?? "/"]}>
          <HomePage />
        </MemoryRouter>
      </ThemeProvider>
    );
  };

  it("renderiza filmes populares por padrão", async () => {
    mockStore();
    renderWithProviders();

    expect(screen.getByText("Filmes Populares")).toBeInTheDocument();
    await waitFor(() => {
      expect(screen.getByText("Inception")).toBeInTheDocument();
      expect(screen.getByText("Matrix")).toBeInTheDocument();
    });
  });

  it("renderiza resultado de busca quando currentSearch está definido", () => {
    mockStore({ currentSearch: "batman" });
    renderWithProviders();

    expect(screen.getByText(/Resultados para "batman"/i)).toBeInTheDocument();
    expect(screen.getByText("Batman")).toBeInTheDocument();
  });

  it("mostra spinner principal quando loading e page = 1", () => {
    mockStore({ loading: true, page: 1 });
    renderWithProviders();

    expect(screen.getByTestId("main-loading-spinner")).toBeInTheDocument();
  });

  it("mostra spinner extra quando loading e page > 1", () => {
    mockStore({ loading: true, page: 2 });
    renderWithProviders();

    expect(screen.getByRole("progressbar")).toBeInTheDocument();
  });

  it("chama fetchPopularMovies no primeiro carregamento quando não há busca", () => {
    mockStore();
    renderWithProviders();

    expect(mockResetSearch).toHaveBeenCalled();
    expect(mockFetchPopularMovies).toHaveBeenCalled();
    expect(mockSearchByKeyword).not.toHaveBeenCalled();
  });

  it("chama searchByKeyword se houver busca inicial via URL", () => {
    mockStore();
    renderWithProviders({ route: "/?search=marvel" });

    expect(mockResetSearch).toHaveBeenCalled();
    expect(mockSearchByKeyword).toHaveBeenCalledWith("marvel", 1, false);
  });

  it("chama onSearch ao submeter busca", () => {
    const onSearch = jest.fn();
    render(<SearchBar onSearch={onSearch} />);

    fireEvent.change(screen.getByPlaceholderText(/buscar/i), {
      target: { value: "batman" },
    });

    fireEvent.submit(screen.getByRole("form")); // ou botão
    expect(onSearch).toHaveBeenCalledWith("batman");
  });
});
