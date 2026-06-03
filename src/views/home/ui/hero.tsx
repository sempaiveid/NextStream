import { movieApi, HeroSection } from "@/entities/movie";

export async function Hero() {
  const data = await movieApi.getTrending();
  const movie = data.results[0];

  const videos = await movieApi.getVideos(movie.id);

  const trailer = videos.results.find(
    (v) => v.site === "YouTube" && v.type === "Trailer" && v.official
  ) ?? videos.results.find(
    (v) => v.site === "YouTube"
  );

  return <HeroSection movie={movie} trailerKey={trailer?.key} />;
}