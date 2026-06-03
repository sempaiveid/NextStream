"use client";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRef, useState } from "react";

import type { Movie } from "../model/types";

import { MovieCard } from "./movie-card";


interface MovieRowProps {
  title: string;
  movies: Movie[];
}

export function MovieRow({ title, movies }: MovieRowProps) {
  const rowRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const updateScrollState = () => {
    const el = rowRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 0);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 1);
  };

  const scroll = (direction: "left" | "right") => {
    if (!rowRef.current) return;
    const scrollAmount = rowRef.current.clientWidth * 0.75;
    rowRef.current.scrollBy({
      left: direction === "right" ? scrollAmount : -scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <div className="mb-8 group/row">
      <h2 className="text-white text-xl font-bold mb-4 px-8">{title}</h2>

      <div className="relative overflow-hidden">

        {canScrollLeft && (
          <button
            onClick={() => scroll("left")}
            className="absolute left-0 top-0 bottom-0 z-10 w-12 bg-black/50 flex items-center justify-center opacity-0 group-hover/row:opacity-100 transition-all duration-300 hover:bg-black/80 cursor-pointer"
          >
            <ChevronLeft className="w-8 h-8 text-white" />
          </button>
        )}

        <div
          ref={rowRef}
          onScroll={updateScrollState}
          className="flex gap-3 overflow-x-auto scrollbar-hide px-8 pb-4"
        >
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>

        {canScrollRight && (
          <button
            onClick={() => scroll("right")}
            className="absolute right-0 top-0 bottom-0 z-10 w-12 bg-black/50 flex items-center justify-center opacity-0 group-hover/row:opacity-100 transition-all duration-300 hover:bg-black/80 cursor-pointer"
          >
            <ChevronRight className="w-8 h-8 text-white" />
          </button>
        )}

      </div>
    </div>
  );
}