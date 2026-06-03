"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRef, useState } from "react";

import { TMDB_IMAGE_URL } from "../api/tmdb";
import { movieSlug } from "../lib/movie-slug";
import type { Movie } from "../model/types";

import { MovieCardHover } from "./movie-card-hover";

interface MovieCardProps {
  movie: Movie;
}

export function MovieCard({ movie }: MovieCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pathname = usePathname();
  const locale = pathname.split("/")[1] || "uk";

  const posterUrl = movie.poster_path
    ? `${TMDB_IMAGE_URL}/w300${movie.poster_path}`
    : "/placeholder.jpg";

  const backdropUrl = movie.backdrop_path
    ? `${TMDB_IMAGE_URL}/w500${movie.backdrop_path}`
    : posterUrl;

  const year = movie.release_date ? new Date(movie.release_date).getFullYear() : "";

  return (
    <Link
      href={`/${locale}/movie/${movieSlug(movie.id, movie.title)}`}
      className="relative flex-shrink-0 w-32 md:w-40 cursor-pointer select-none"
      onMouseEnter={() => {
        timeoutRef.current = setTimeout(() => setIsHovered(true), 300);
      }}
      onMouseLeave={() => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        setIsHovered(false);
      }}
    >
      <div
        className={`relative aspect-[2/3] rounded-md overflow-hidden transition-all duration-300 ${
          isHovered ? "scale-0 opacity-0" : "scale-100 opacity-100"
        }`}
      >
        <Image
          src={posterUrl}
          alt={movie.title}
          fill
          draggable={false}
          className="object-cover"
          sizes="(max-width: 768px) 128px, 160px"
        />
      </div>

      <MovieCardHover
        movie={movie}
        backdropUrl={backdropUrl}
        year={year}
        locale={locale}
        visible={isHovered}
      />
    </Link>
  );
}
