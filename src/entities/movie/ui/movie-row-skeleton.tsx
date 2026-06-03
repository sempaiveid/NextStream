import { Skeleton } from "@/shared/ui/skeleton";

export function MovieRowSkeleton() {
  return (
    <div className="mb-8">
      <Skeleton className="h-7 w-48 mb-4 mx-8 bg-white/10" />

      <div className="flex gap-3 px-8">
        {Array.from({ length: 12 }).map((_, i) => (
          <Skeleton
            key={i}
            className="shrink-0 w-32 md:w-40 aspect-2/3 rounded-md bg-white/10"
          />
        ))}
      </div>
    </div>
  );
}