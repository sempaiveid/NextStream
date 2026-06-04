import { movieApi, MovieRow } from "@/entities/movie";

export async function TopRatedRow() {
  try {
    const data = await movieApi.getTopRated();
    return <MovieRow title="Top Rated" movies={data.results} />;
  } catch {
    return null;
  }
}
