import { HeroSkeleton, MovieRowSkeleton } from "@/entities/movie";

export default function Loading() {
  return (
    <>
      <HeroSkeleton />
      <div className="-mt-32 relative z-10 pb-16">
        <MovieRowSkeleton />
        <MovieRowSkeleton />
        <MovieRowSkeleton />
      </div>
    </>
  );
}
