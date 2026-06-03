import { Skeleton } from "@/shared/ui/skeleton";

export function MovieDetailsSkeleton() {
  return (
    <div className="min-h-screen bg-bg-base">
      <Skeleton className="w-full h-[60vh] bg-white/5" />

      <div className="px-12 -mt-32 relative z-10">
        <div className="flex gap-8">
          <Skeleton className="shrink-0 w-40 h-60 rounded-md bg-white/10 hidden md:block" />

          <div className="flex-1 space-y-4">
            <Skeleton className="h-10 w-80 bg-white/10" />
            <Skeleton className="h-4 w-56 bg-white/10" />

            <div className="flex gap-3">
              <Skeleton className="h-4 w-20 bg-white/10" />
              <Skeleton className="h-4 w-12 bg-white/10" />
              <Skeleton className="h-4 w-16 bg-white/10" />
              <Skeleton className="h-4 w-16 bg-white/10" />
            </div>

            <div className="flex gap-3 pt-1">
              <Skeleton className="h-10 w-36 rounded bg-white/10" />
              <Skeleton className="h-10 w-28 rounded bg-white/10" />
              <Skeleton className="h-10 w-10 rounded-full bg-white/10" />
            </div>

            <Skeleton className="h-4 w-full max-w-2xl bg-white/10" />
            <Skeleton className="h-4 w-5/6 max-w-2xl bg-white/10" />
            <Skeleton className="h-4 w-4/6 max-w-2xl bg-white/10" />

            <div className="grid grid-cols-2 gap-3 max-w-2xl pt-2">
              {Array.from({ length: 6 }).map((_, i) => (
                <Skeleton key={i} className="h-4 w-48 bg-white/10" />
              ))}
            </div>
          </div>
        </div>

        <div className="mt-10">
          <Skeleton className="h-7 w-24 mb-4 bg-white/10" />
          <div className="grid grid-cols-5 md:grid-cols-10 gap-2">
            {Array.from({ length: 10 }).map((_, i) => (
              <div key={i} className="space-y-1.5">
                <Skeleton className="w-full aspect-2/3 rounded-md bg-white/10" />
                <Skeleton className="h-3 w-full bg-white/10" />
                <Skeleton className="h-2.5 w-3/4 bg-white/10" />
              </div>
            ))}
          </div>
        </div>

        <div className="mt-10">
          <Skeleton className="h-7 w-20 mb-4 bg-white/10" />
          <Skeleton className="w-full aspect-video rounded-xl bg-white/10" />
        </div>

        <div className="mt-10 mb-8">
          <Skeleton className="h-7 w-40 mb-4 bg-white/10" />
          <div className="flex gap-3 px-0">
            {Array.from({ length: 8 }).map((_, i) => (
              <Skeleton key={i} className="shrink-0 w-32 md:w-40 aspect-2/3 rounded-md bg-white/10" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
