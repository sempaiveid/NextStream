import type { MovieFullDetails } from "../model/types";

interface MovieInfoProps {
  movie: MovieFullDetails;
  director?: string;
  writers: string[];
  budget: string | null;
  revenue: string | null;
  hours: number;
  minutes: number;
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <p className="text-gray-400">
      <span className="text-gray-500">{label}: </span>{value}
    </p>
  );
}

export function MovieInfo({ movie, director, writers, budget, revenue, hours, minutes }: MovieInfoProps) {
  return (
    <>
      <p className="text-gray-200 leading-relaxed text-sm max-w-2xl mb-4">{movie.overview}</p>

      <div className="grid grid-cols-2 gap-x-8 gap-y-1.5 text-sm max-w-2xl">
        {director && <InfoRow label="Director" value={director} />}
        {writers.length > 0 && <InfoRow label="Writers" value={writers.join(", ")} />}
        {movie.status && <InfoRow label="Status" value={movie.status} />}
        {movie.original_language && <InfoRow label="Language" value={movie.original_language.toUpperCase()} />}
        {budget && <InfoRow label="Budget" value={budget} />}
        {revenue && <InfoRow label="Revenue" value={revenue} />}
        {movie.vote_count > 0 && (
          <InfoRow
            label="Rating"
            value={`${movie.vote_average.toFixed(1)} / 10 (${movie.vote_count.toLocaleString()} votes)`}
          />
        )}
        {movie.runtime > 0 && <InfoRow label="Runtime" value={`${hours}h ${minutes}m`} />}
        {movie.production_companies?.length > 0 && (
          <InfoRow label="Studio" value={movie.production_companies.slice(0, 2).map((c) => c.name).join(", ")} />
        )}
      </div>
    </>
  );
}
