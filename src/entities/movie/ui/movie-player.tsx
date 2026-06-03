"use client";
import { VolumeX, Volume2, Play } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import YouTube, { YouTubePlayer, YouTubeProps } from "react-youtube";

interface MoviePlayerProps {
  backdropUrl: string | null;
  trailerKey?: string;
  title: string;
}

export function MoviePlayer({ backdropUrl, trailerKey, title }: MoviePlayerProps) {
  const [showVideo, setShowVideo] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [player, setPlayer] = useState<YouTubePlayer | null>(null);

  const onReady: YouTubeProps["onReady"] = (e) => {
    setPlayer(e.target);
    e.target.mute();
  };

  const onPlay: YouTubeProps["onPlay"] = () => setShowVideo(true);

  const toggleMute = () => {
    if (!player) return;
    isMuted ? player.unMute() : player.mute();
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
    <div className="relative w-full h-[56vw] max-h-[80vh] min-h-[400px] overflow-hidden bg-black">
      {backdropUrl && (
        <Image
          src={backdropUrl}
          alt={title}
          fill
          className={`object-cover transition-opacity duration-1000 ${showVideo ? "opacity-0" : "opacity-100"}`}
          priority
        />
      )}

      {trailerKey && (
        <div className={`absolute inset-0 transition-opacity duration-1000 ${showVideo ? "opacity-100" : "opacity-0"}`}>
          <YouTube
            videoId={trailerKey}
            opts={opts}
            onReady={onReady}
            onPlay={onPlay}
            className="w-full h-full"
            iframeClassName="w-full h-full scale-125 pointer-events-none"
          />
        </div>
      )}

      <div className="absolute inset-0 bg-linear-to-t from-bg-base via-transparent to-transparent" />
      <div className="absolute inset-0 bg-linear-to-r from-bg-base/60 via-transparent to-transparent" />

      {showVideo && (
        <button
          onClick={toggleMute}
          className="absolute bottom-6 right-8 z-10 w-10 h-10 rounded-full border border-white/50 flex items-center justify-center text-white hover:bg-white/20 transition-colors cursor-pointer"
        >
          {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
        </button>
      )}
    </div>
  );
}
