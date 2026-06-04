import { movieApi, MovieRow } from "@/entities/movie";

export async function TrendingRow() {
  try {
    const data = await movieApi.getTrending();
    return <MovieRow title="Top 10 Today" movies={data.results} />;
  } catch {
    return null;
  }
}
