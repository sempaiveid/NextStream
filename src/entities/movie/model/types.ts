export interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  release_date: string;
  vote_average: number;
  vote_count: number;
  genre_ids: number[];
  adult: boolean;
  popularity: number;
}

export interface Genre {
  id: number;
  name: string;
}

export interface MovieDetails extends Movie {
  genres: Genre[];
  runtime: number;
  tagline: string;
  status: string;
  budget: number;
  revenue: number;
  original_title: string;
  original_language: string;
  spoken_languages: { name: string; english_name: string }[];
  production_companies: { id: number; name: string; logo_path: string | null }[];
  production_countries: { name: string }[];
}

export interface CastMember {
  id: number;
  name: string;
  character: string;
  profile_path: string | null;
  order: number;
}

export interface CrewMember {
  id: number;
  name: string;
  job: string;
  department: string;
  profile_path: string | null;
}

export interface Video {
  id: string;
  key: string;
  name: string;
  site: string;
  type: string;
  official: boolean;
}

export interface Keyword {
  id: number;
  name: string;
}

export interface ReleaseDate {
  certification: string;
  release_date: string;
  type: number;
}

export interface ReleaseDateResult {
  iso_3166_1: string;
  release_dates: ReleaseDate[];
}

export interface TMDBResponse<T> {
  page: number;
  results: T[];
  total_pages: number;
  total_results: number;
}

export interface MovieFullDetails extends MovieDetails {
  videos: { results: Video[] };
  credits: { cast: CastMember[]; crew: CrewMember[] };
  similar: TMDBResponse<Movie>;
  recommendations: TMDBResponse<Movie>;
  keywords: { keywords: Keyword[] };
  release_dates: { results: ReleaseDateResult[] };
}
