import { movieApi, MovieRow } from "@/entities/movie";

export async function TopRatedRow() {
  const data = await movieApi.getTopRated();
  return <MovieRow title="Top Rated" movies={data.results} />;
}