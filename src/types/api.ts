export interface MovieSummary {
  id: number;
  title: string;
  overview: string;
  poster_path: string | null;
  release_date: string;
  vote_average: number;
  vote_count: number;
  popularity: number;
}

export interface CastMember {
  id: number;
  name: string;
  character: string;
  profile_path: string | null;
}

export interface MovieDetail extends MovieSummary {
  cast: CastMember[];
  overview: string;
  release_date: string;
  backdrop_path: string;
}
