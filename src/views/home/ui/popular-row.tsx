import { movieApi, MovieRow } from "@/entities/movie";

export async function PopularRow() {
  try {
    const data = await movieApi.getPopular();
    return <MovieRow title="Popular on NextStream" movies={data.results} />;
  } catch {
    return null;
  }
}
