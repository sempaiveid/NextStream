import { Skeleton } from "@/shared/ui/skeleton";

export function HeroSkeleton() {
  return (
    <div className="relative h-screen w-full bg-zinc-900">
      <div className="absolute bottom-48 left-8 max-w-xl space-y-4">
        <Skeleton className="h-14 w-96 bg-white/10" />
        <Skeleton className="h-5 w-48 bg-white/10" />
        <Skeleton className="h-4 w-full bg-white/10" />
        <Skeleton className="h-4 w-3/4 bg-white/10" />
        <div className="flex gap-4 pt-2">
          <Skeleton className="h-12 w-32 rounded bg-white/10" />
          <Skeleton className="h-12 w-36 rounded bg-white/10" />
        </div>
      </div>
    </div>
  );
}