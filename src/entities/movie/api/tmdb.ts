import { Movie, MovieDetails, MovieFullDetails, TMDBResponse, Video } from "../model/types";

const TMDB_BASE_URL = "https://api.themoviedb.org/3";
export const TMDB_IMAGE_URL = "https://image.tmdb.org/t/p";

async function tmdbFetch<T>(
  endpoint: string,
  params?: Record<string, string>,
): Promise<T> {
  const url = new URL(`${TMDB_BASE_URL}${endpoint}`);

  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      url.searchParams.append(key, value);
    });
  }

  const response = await fetch(url.toString(), {
    headers: {
      Authorization: `Bearer ${process.env.TMDB_API_TOKEN}`,
      "Content-Type": "application/json",
    },
    next: { revalidate: 3600 },
  });

  if (!response.ok) {
    throw new Error(`TMDB error: ${response.status}`);
  }

  return response.json();
}

export const movieApi = {
  getPopular: () => tmdbFetch<TMDBResponse<Movie>>("/movie/popular"),

  getTrending: () => tmdbFetch<TMDBResponse<Movie>>("/trending/movie/week"),

  getTopRated: () => tmdbFetch<TMDBResponse<Movie>>("/movie/top_rated"),

  getById: (id: number) => tmdbFetch<MovieDetails>(`/movie/${id}`),

  getFullDetails: (id: number) =>
    tmdbFetch<MovieFullDetails>(`/movie/${id}`, {
      append_to_response: "videos,credits,similar,recommendations,keywords,release_dates",
    }),

  getByGenre: (genreId: number) =>
    tmdbFetch<TMDBResponse<Movie>>("/discover/movie", {
      with_genres: String(genreId),
    }),

  getVideos: (id: number) =>
    tmdbFetch<{ results: Video[] }>(`/movie/${id}/videos`),

  getSimilar: (id: number) =>
    tmdbFetch<TMDBResponse<Movie>>(`/movie/${id}/similar`),
};
