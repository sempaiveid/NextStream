"use client";
import { ChevronDown, Play, Plus, ThumbsUp } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

import { TMDB_IMAGE_URL } from "../api/tmdb";
import { movieSlug } from "../lib/movie-slug";
import type { Movie } from "../model/types";

interface MovieCardHoverProps {
  movie: Movie;
  backdropUrl: string;
  year: string | number;
  locale: string;
  visible: boolean;
}

export function MovieCardHover({ movie, backdropUrl, year, locale, visible }: MovieCardHoverProps) {
  const router = useRouter();

  return (
    <div
      className={`absolute top-0 left-0 w-full z-50 rounded-md overflow-hidden shadow-2xl bg-zinc-900 transition-all duration-300 scale-110 ${
        visible
          ? "opacity-100 translate-y-0 pointer-events-auto"
          : "opacity-0 translate-y-2 pointer-events-none"
      }`}
    >
      <div className="relative w-full h-24">
        <Image
          src={backdropUrl}
          alt={movie.title}
          fill
          draggable={false}
          className="object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-t from-zinc-900 to-transparent" />
      </div>

      <div className="p-3">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <button
              onClick={(e) => {
                e.preventDefault();
                router.push(`/${locale}/movie/${movieSlug(movie.id, movie.title)}`);
              }}
              className="w-7 h-7 bg-white rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors cursor-pointer"
            >
              <Play className="w-3 h-3 fill-black text-black ml-0.5 pointer-events-none" />
            </button>
            <button className="w-7 h-7 border border-gray-400 rounded-full flex items-center justify-center text-white hover:border-white transition-colors cursor-pointer">
              <Plus className="w-3 h-3 pointer-events-none" />
            </button>
            <button className="w-7 h-7 border border-gray-400 rounded-full flex items-center justify-center text-white hover:border-white transition-colors cursor-pointer">
              <ThumbsUp className="w-3 h-3 pointer-events-none" />
            </button>
          </div>
          <button className="w-7 h-7 border border-gray-400 rounded-full flex items-center justify-center text-white hover:border-white transition-colors cursor-pointer">
            <ChevronDown className="w-3 h-3 pointer-events-none" />
          </button>
        </div>

        <p className="text-white font-semibold text-xs truncate mb-1">{movie.title}</p>

        <div className="flex items-center gap-2">
          <span className="text-green-400 text-xs font-bold">
            {Math.round(movie.vote_average * 10)}%
          </span>
          <span className="text-gray-400 text-xs">{year}</span>
        </div>

        {movie.overview && (
          <p className="text-gray-300 text-xs mt-2 line-clamp-3 leading-relaxed">
            {movie.overview}
          </p>
        )}
      </div>
    </div>
  );
}
