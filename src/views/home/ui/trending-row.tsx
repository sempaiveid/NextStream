import { movieApi, MovieRow } from "@/entities/movie";

export async function TrendingRow() {
  const data = await movieApi.getTrending();
  return <MovieRow   title="Top 10 Today" movies={data.results} />;
}