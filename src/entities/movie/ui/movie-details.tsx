import { Play, Plus, ThumbsUp } from "lucide-react";
import Image from "next/image";
import { Suspense } from "react";

import { BLUR_PLACEHOLDER } from "@/shared/lib/blur-placeholder";

import { movieApi, TMDB_IMAGE_URL } from "../api/tmdb";


import { MovieCast } from "./movie-cast";
import { MovieInfo } from "./movie-info";
import { MovieRow } from "./movie-row";
import { MovieRowSkeleton } from "./movie-row-skeleton";

import { VideoPlayer } from "@/features/player";

interface MovieDetailsPageProps {
  id: number;
}

export async function MovieDetailsPage({ id }: MovieDetailsPageProps) {
  const movie = await movieApi.getFullDetails(id);

  const backdropUrl = movie.backdrop_path
    ? `${TMDB_IMAGE_URL}/original${movie.backdrop_path}`
    : null;

  const posterUrl = movie.poster_path
    ? `${TMDB_IMAGE_URL}/w500${movie.poster_path}`
    : null;

  const trailer = movie.videos.results.find(
    (v) => v.site === "YouTube" && v.type === "Trailer" && v.official
  ) ?? movie.videos.results.find((v) => v.site === "YouTube");

  const hours = Math.floor((movie.runtime ?? 0) / 60);
  const minutes = (movie.runtime ?? 0) % 60;
  const year = new Date(movie.release_date).getFullYear();
  const matchScore = Math.round(movie.vote_average * 10);

  const cast = movie.credits.cast.slice(0, 10);
  const director = movie.credits.crew.find((c) => c.job === "Director");
  const writers = movie.credits.crew.filter((c) => c.job === "Screenplay" || c.job === "Writer").slice(0, 2);

  const certification = movie.release_dates.results
    .find((r) => r.iso_3166_1 === "US")
    ?.release_dates.find((d) => d.certification)
    ?.certification;

  const budget = movie.budget ? `$${(movie.budget / 1_000_000).toFixed(1)}M` : null;
  const revenue = movie.revenue ? `$${(movie.revenue / 1_000_000).toFixed(1)}M` : null;

  return (
    <div className="min-h-screen bg-bg-base text-white">
      <div className="relative w-full h-[60vh]">
        {backdropUrl && (
          <Image src={backdropUrl} alt={movie.title} fill placeholder="blur" blurDataURL={BLUR_PLACEHOLDER} className="object-cover object-top" priority />
        )}
        <div className="absolute inset-0 bg-linear-to-t from-bg-base via-bg-base/30 to-transparent" />
        <div className="absolute inset-0 bg-linear-to-r from-bg-base/80 via-transparent to-transparent" />
      </div>

      <div className="px-12 -mt-32 relative z-10">
        <div className="flex gap-8">
          {posterUrl && (
            <div className="shrink-0 w-40 rounded-md overflow-hidden shadow-2xl hidden md:block">
              <Image src={posterUrl} alt={movie.title} width={160} height={240} placeholder="blur" blurDataURL={BLUR_PLACEHOLDER} className="object-cover w-full" />
            </div>
          )}

          <div className="flex-1 min-w-0">
            <h1 className="text-4xl font-bold mb-1">{movie.title}</h1>
            {movie.original_title !== movie.title && (
              <p className="text-gray-500 text-sm mb-2">{movie.original_title}</p>
            )}
            {movie.tagline && (
              <p className="text-gray-400 italic mb-3">&quot;{movie.tagline}&quot;</p>
            )}

            <div className="flex items-center gap-3 mb-4 flex-wrap text-sm">
              <span className="text-green-400 font-bold text-base">{matchScore}% Match</span>
              <span className="text-gray-300">{year}</span>
              {movie.runtime > 0 && <span className="text-gray-300">{hours}h {minutes}m</span>}
              {certification && (
                <span className="border border-gray-500 text-gray-400 text-xs px-1.5 py-0.5 rounded">{certification}</span>
              )}
              {movie.genres?.map((g) => (
                <span key={g.id} className="border border-gray-600 text-gray-400 text-xs px-2 py-0.5 rounded">
                  {g.name}
                </span>
              ))}
            </div>

            <div className="flex items-center gap-3 mb-5">
              {trailer ? (
                <a
                  href={`https://youtube.com/watch?v=${trailer.key}`}
                  target="_blank"
                  className="flex items-center gap-2 bg-white hover:bg-white/80 text-black px-7 py-2.5 rounded font-bold text-sm transition-colors cursor-pointer"
                >
                  <Play className="w-5 h-5 fill-black" />
                  Play Trailer
                </a>
              ) : (
                <button className="flex items-center gap-2 bg-white hover:bg-white/80 text-black px-7 py-2.5 rounded font-bold text-sm transition-colors cursor-pointer">
                  <Play className="w-5 h-5 fill-black" />
                  Play
                </button>
              )}
              <button className="flex items-center gap-2 bg-white/20 hover:bg-white/30 text-white px-7 py-2.5 rounded font-bold text-sm transition-colors cursor-pointer">
                <Plus className="w-5 h-5" />
                My List
              </button>
              <button className="w-10 h-10 border-2 border-gray-500 hover:border-white rounded-full flex items-center justify-center transition-colors cursor-pointer">
                <ThumbsUp className="w-4 h-4" />
              </button>
            </div>

            <MovieInfo
              movie={movie}
              director={director?.name}
              writers={writers.map((w) => w.name)}
              budget={budget}
              revenue={revenue}
              hours={hours}
              minutes={minutes}
            />

            {movie.keywords?.keywords?.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-4 max-w-2xl">
                {movie.keywords.keywords.slice(0, 10).map((k) => (
                  <span key={k.id} className="bg-white/10 text-gray-300 text-xs px-2.5 py-1 rounded-full">
                    {k.name}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>

        <MovieCast cast={cast} />

        {trailer && (
          <div className="mt-10">
            <h2 className="text-xl font-semibold mb-4">Trailer</h2>
            <div className="rounded-xl overflow-hidden aspect-video">
              <VideoPlayer
                source={{ type: "youtube", key: trailer.key }}
                title={movie.title}
                className="w-full h-full"
              />
            </div>
          </div>
        )}

        {movie.recommendations.results.length > 0 && (
          <div className="mt-10 border-t border-gray-700/50 pt-8">
            <MovieRow title="Recommended" movies={movie.recommendations.results} />
          </div>
        )}

        <div className="mt-6 border-t border-gray-700/50 pt-8 pb-16">
          <Suspense fallback={<MovieRowSkeleton />}>
            <MovieRow title="More Like This" movies={movie.similar.results} />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
