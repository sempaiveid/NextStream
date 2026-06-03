"use client";
import { Play, Info, VolumeX, Volume2 } from "lucide-react";
import Image from "next/image";
import { useState, useEffect } from "react";
import YouTube, { YouTubePlayer, YouTubeProps } from "react-youtube";

import { TMDB_IMAGE_URL } from "../api/tmdb";
import type { Movie } from "../model/types";

interface HeroSectionProps {
  movie: Movie;
  trailerKey?: string;
}

export function HeroSection({ movie, trailerKey }: HeroSectionProps) {
  const [showVideo, setShowVideo] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [player, setPlayer] = useState<YouTubePlayer | null>(null);

  const backdropUrl = movie.backdrop_path
    ? `${TMDB_IMAGE_URL}/original${movie.backdrop_path}`
    : null;

  const year = new Date(movie.release_date).getFullYear();

  const onReady: YouTubeProps["onReady"] = (event) => {
    setPlayer(event.target);
    event.target.mute();
  };

  const onPlay: YouTubeProps["onPlay"] = () => {
    setShowVideo(true);
  };

  const toggleMute = () => {
    if (!player) return;
    if (isMuted) {
      player.unMute();
    } else {
      player.mute();
    }
    setIsMuted(!isMuted);
  };

  const opts: YouTubeProps["opts"] = {
    width: "100%",
    height: "100%",
    playerVars: {
      autoplay: 1,
      mute: 1,
      controls: 0,
      loop: 1,
      playlist: trailerKey,
      modestbranding: 1,
      showinfo: 0,
      rel: 0,
      iv_load_policy: 3,
      disablekb: 1,
    },
  };

  return (
    <div className="relative h-[100dvh] w-full overflow-hidden">
      {backdropUrl && (
        <Image
          src={backdropUrl}
          alt={movie.title}
          fill
          className={`object-cover transition-opacity duration-1000 ${
            showVideo ? "opacity-0" : "opacity-100"
          }`}
          priority
        />
      )}

      {trailerKey && (
        <div
          className={`absolute inset-0 transition-opacity duration-1000 ${
            showVideo ? "opacity-100" : "opacity-0"
          }`}
        >
          <YouTube
            videoId={trailerKey}
            opts={opts}
            onReady={onReady}
            onPlay={onPlay}
            className="w-full h-full"
            iframeClassName="w-full h-full scale-125 pointer-events-none"
          />
          <div className="absolute inset-0" />
        </div>
      )}

      <div className="absolute inset-0 bg-linear-to-t from-black via-black/20 to-transparent" />
      <div className="absolute inset-0 bg-linear-to-r from-black/80 via-transparent to-transparent" />

      <div className="absolute bottom-44 left-8 max-w-xl z-10">
        <h1 className="text-5xl font-bold text-white mb-4">{movie.title}</h1>

        <div className="flex items-center gap-3 mb-4">
          <span className="text-green-400 font-bold">
            {Math.round(movie.vote_average * 10)}% Match
          </span>
          <span className="text-gray-300">{year}</span>
          <span className="border border-gray-400 text-gray-300 text-xs px-1 py-0.5">PG-13</span>
          <span className="border border-gray-400 text-gray-300 text-xs px-1 py-0.5">HD</span>
          <span className="border border-gray-400 text-gray-300 text-xs px-1 py-0.5">5.1</span>
        </div>

        <p className="text-gray-200 text-sm leading-relaxed line-clamp-5 mb-6">
          {movie.overview}
        </p>

        <div className="flex items-center gap-4 mt-6">
          <button className="flex items-center gap-2 bg-brand hover:bg-brand-hover text-white px-8 py-3 rounded font-semibold transition-colors cursor-pointer">
            <Play className="w-5 h-5 fill-white" />
            Play
          </button>
          <button className="flex items-center gap-2 bg-white/20 hover:bg-white/30 text-white px-8 py-3 rounded font-semibold transition-colors backdrop-blur-sm cursor-pointer">
            <Info className="w-5 h-5" />
            More Info
          </button>
        </div>
      </div>

      {showVideo && (
        <button
          onClick={toggleMute}
          className="absolute bottom-44 right-8 z-10 w-10 h-10 rounded-full border border-white/50 flex items-center justify-center text-white hover:bg-white/20 transition-colors cursor-pointer"
        >
          {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
        </button>
      )}
    </div>
  );
}
