import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { useMovieStore } from "../../store/movieStore";
import MovieDetailPage from "./index";

jest.mock("../../assets/no-poster.png", () => "no-poster.png");
jest.mock("../../assets/no-profile.png", () => "no-profile.png");

jest.mock("../../store/movieStore", () => ({
  useMovieStore: jest.fn(),
}));

const theme = createTheme();

describe("MovieDetailPage", () => {
  const mockFetchMovieDetail = jest.fn();

  const storeMock = {
    loading: false,
    currentSearch: "spider",
    fetchMovieDetail: mockFetchMovieDetail,
    movieDetails: {
      "1": {
        title: "Homem-Aranha",
        release_date: "2024-01-15",
        overview: "Um herói com grandes responsabilidades.",
        backdrop_path: "/poster.jpg",
        cast: [
          {
            id: 101,
            name: "Peter Parker",
            character: "Homem-Aranha",
            profile_path: "/peter.jpg",
          },
          {
            id: 102,
            name: "Tia May",
            character: "Tia do Peter",
            profile_path: null,
          },
        ],
      },
    },
  };

  const mockStore = (override = {}) => {
    (useMovieStore as unknown as jest.Mock).mockImplementation((selector) =>
      selector({ ...storeMock, ...override })
    );
  };

  const renderWithProviders = (route = "/movie/1") =>
    render(
      <ThemeProvider theme={theme}>
        <MemoryRouter initialEntries={[route]}>
          <Routes>
            <Route path="/movie/:id" element={<MovieDetailPage />} />
          </Routes>
        </MemoryRouter>
      </ThemeProvider>
    );

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("chama fetchMovieDetail ao montar", () => {
    mockStore();
    renderWithProviders();
    expect(mockFetchMovieDetail).toHaveBeenCalledWith("1");
  });

  it("mostra spinner quando loading é true", () => {
    mockStore({ loading: true });
    renderWithProviders();
    expect(screen.getByText(/carregando/i)).toBeInTheDocument();
  });

  it("não renderiza se movieDetail for indefinido", () => {
    mockStore({ movieDetails: {} });
    const { container } = renderWithProviders();
    expect(container.firstChild).toBeNull();
  });

  it("exibe dados do filme corretamente", () => {
    mockStore();
    renderWithProviders();
    const titles = screen.getAllByText("Homem-Aranha");
    expect(titles.length).toBeGreaterThan(0);
    expect(screen.getByTestId("release-date").textContent).toBe(
      "14 de janeiro de 2024"
    );
    expect(
      screen.getByText(/Um herói com grandes responsabilidades/i)
    ).toBeInTheDocument();
    expect(screen.getByTestId("poster")).toBeInTheDocument();
  });

  it("exibe elenco com e sem foto", () => {
    mockStore();
    renderWithProviders();
    expect(screen.getByText("Peter Parker")).toBeInTheDocument();
    expect(screen.getByText("Tia May")).toBeInTheDocument();
    expect(screen.getByText("Tia do Peter")).toBeInTheDocument();
    expect(screen.getByAltText("Tia May")).toHaveAttribute(
      "src",
      "no-profile.png"
    );
  });

  it("renderiza imagem de fallback se não houver poster", () => {
    mockStore({
      movieDetails: {
        "1": {
          ...storeMock.movieDetails["1"],
          backdrop_path: null,
          cast: [],
        },
      },
    });

    renderWithProviders();

    const poster = screen.getByTestId("poster");
    expect(poster).toBeInTheDocument();
    expect(poster).toHaveAttribute("src", "no-profile.png");
  });

  it("renderiza botão de voltar", () => {
    mockStore();
    renderWithProviders();
    expect(screen.getByLabelText("voltar")).toBeInTheDocument();
  });
});
