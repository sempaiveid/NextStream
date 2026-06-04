"use client";
import { useEffect, useRef } from "react";
import YouTube from "react-youtube";

import type { PlayerSource } from "../model/use-player";
import { usePlayer } from "../model/use-player";
import { PlayerControls } from "./player-controls";

interface VideoPlayerProps {
  source: PlayerSource;
  title?: string;
  autoPlay?: boolean;
  className?: string;
}

export function VideoPlayer({ source, title, autoPlay = false, className = "" }: VideoPlayerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { state, set, videoRef, ytPlayerRef, pollRef, actions } = usePlayer(containerRef);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const onMove = () => actions.onActivity();
    el.addEventListener("mousemove", onMove);
    return () => el.removeEventListener("mousemove", onMove);
  }, [actions]);

  useEffect(() => {
    if (!("mediaSession" in navigator)) return;
    const noop = () => {};
    navigator.mediaSession.metadata = null;
    navigator.mediaSession.setActionHandler("play", noop);
    navigator.mediaSession.setActionHandler("pause", noop);
    navigator.mediaSession.setActionHandler("previoustrack", null);
    navigator.mediaSession.setActionHandler("nexttrack", null);
    navigator.mediaSession.setActionHandler("stop", null);
    return () => {
      navigator.mediaSession.setActionHandler("play", null);
      navigator.mediaSession.setActionHandler("pause", null);
    };
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement) return;
      switch (e.key) {
        case " ": e.preventDefault(); actions.toggle(); break;
        case "ArrowRight": actions.seek(state.currentTime + 10); break;
        case "ArrowLeft": actions.seek(state.currentTime - 10); break;
        case "ArrowUp": actions.setVolume(state.volume + 0.1); break;
        case "ArrowDown": actions.setVolume(state.volume - 0.1); break;
        case "m": case "M": actions.toggleMute(); break;
        case "f": case "F": actions.toggleFullscreen(); break;
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [actions, state.currentTime, state.volume]);

  if (source.type === "html5") {
    return (
      <div
        ref={containerRef}
        className={`relative bg-black overflow-hidden ${className}`}
      >
        <video
          ref={videoRef}
          src={source.url}
          autoPlay={autoPlay}
          className="w-full h-full object-contain"
          onPlay={() => set({ playing: true })}
          onPause={() => set({ playing: false })}
          onLoadedMetadata={(e) => set({ duration: e.currentTarget.duration, ready: true })}
          onTimeUpdate={(e) => set({ currentTime: e.currentTarget.currentTime })}
          onProgress={(e) => {
            const video = e.currentTarget;
            if (video.buffered.length > 0) {
              set({ buffered: video.buffered.end(video.buffered.length - 1) });
            }
          }}
          onVolumeChange={(e) => set({ volume: e.currentTarget.volume, muted: e.currentTarget.muted })}
        />
        <PlayerControls state={state} actions={actions} />
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className={`relative bg-black overflow-hidden ${className}`}
    >
      <YouTube
        videoId={source.key}
        opts={{
          width: "100%",
          height: "100%",
          playerVars: {
            autoplay: autoPlay ? 1 : 0,
            controls: 0,
            modestbranding: 1,
            rel: 0,
            iv_load_policy: 3,
            disablekb: 1,
            playsinline: 1,
          },
        }}
        className="absolute inset-0 w-full h-full"
        iframeClassName="w-full h-full pointer-events-none"
        allow="autoplay; encrypted-media; fullscreen; picture-in-picture"
        onReady={(e) => {
          ytPlayerRef.current = e.target;
          const qualities = e.target.getAvailableQualityLevels?.() ?? [];
          set({
            duration: e.target.getDuration(),
            ready: true,
            availableQualities: qualities.filter((q: string) => q !== "default"),
            quality: "auto",
          });
          if (autoPlay) e.target.playVideo();
        }}
        onPlay={() => {
          set({ playing: true });
          pollRef.current = setInterval(() => {
            const yt = ytPlayerRef.current;
            if (!yt) return;
            set({ currentTime: yt.getCurrentTime() });
          }, 500);
        }}
        onPause={() => {
          set({ playing: false });
          if (pollRef.current) clearInterval(pollRef.current);
        }}
        onEnd={() => {
          set({ playing: false });
          if (pollRef.current) clearInterval(pollRef.current);
        }}
      />
      <div className="absolute bottom-0 left-0 right-0 h-14 bg-black pointer-events-none z-10" />
      <div className="absolute top-0 left-0 right-0 h-10 bg-black pointer-events-none z-10" />
      <PlayerControls state={state} actions={actions} isYoutube />
    </div>
  );
}
