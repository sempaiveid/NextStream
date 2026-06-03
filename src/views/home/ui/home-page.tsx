import { Suspense } from "react";

import { Hero } from "./hero";
import { PopularRow } from "./popular-row";
import { TopRatedRow } from "./top-rated-row";
import { TrendingRow } from "./trending-row";

import { HeroSkeleton, MovieRowSkeleton } from "@/entities/movie";


export function HomePage() {
  return (
    <main>
      <Suspense fallback={<HeroSkeleton />}>
        <Hero />
      </Suspense>

      <div className="relative z-10 -mt-32 pb-16">
        <Suspense fallback={<MovieRowSkeleton />}>
          <TrendingRow />
        </Suspense>

        <Suspense fallback={<MovieRowSkeleton />}>
          <PopularRow />
        </Suspense>

        <Suspense fallback={<MovieRowSkeleton />}>
          <TopRatedRow />
        </Suspense>
      </div>
    </main>
  );
}