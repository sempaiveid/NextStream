"use client";
import { useCallback, useEffect, useRef, useState } from "react";

export type PlayerSource =
  | { type: "youtube"; key: string }
  | { type: "html5"; url: string };

export interface PlayerState {
  playing: boolean;
  muted: boolean;
  volume: number;
  currentTime: number;
  duration: number;
  buffered: number;
  fullscreen: boolean;
  showControls: boolean;
  ready: boolean;
  playbackRate: number;
  quality: string;
  availableQualities: string[];
}

export interface PlayerActions {
  play: () => void;
  pause: () => void;
  toggle: () => void;
  seek: (time: number) => void;
  setVolume: (v: number) => void;
  toggleMute: () => void;
  toggleFullscreen: () => void;
  setPlaybackRate: (rate: number) => void;
  setQuality: (quality: string) => void;
  onActivity: () => void;
}

export function usePlayer(containerRef: React.RefObject<HTMLDivElement | null>) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const ytPlayerRef = useRef<YT.Player | null>(null);
  const hideTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pollRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const [state, setState] = useState<PlayerState>({
    playing: false,
    muted: false,
    volume: 1,
    currentTime: 0,
    duration: 0,
    buffered: 0,
    fullscreen: false,
    showControls: true,
    ready: false,
    playbackRate: 1,
    quality: "auto",
    availableQualities: [],
  });

  const set = useCallback((patch: Partial<PlayerState>) => {
    setState((prev) => ({ ...prev, ...patch }));
  }, []);

  const scheduleHide = useCallback(() => {
    if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
    hideTimerRef.current = setTimeout(() => {
      setState((prev) => prev.playing ? { ...prev, showControls: false } : prev);
    }, 3000);
  }, []);

  const onActivity = useCallback(() => {
    set({ showControls: true });
    scheduleHide();
  }, [set, scheduleHide]);

  const play = useCallback(() => {
    videoRef.current?.play();
    ytPlayerRef.current?.playVideo();
  }, []);

  const pause = useCallback(() => {
    videoRef.current?.pause();
    ytPlayerRef.current?.pauseVideo();
  }, []);

  const toggle = useCallback(() => {
    state.playing ? pause() : play();
  }, [state.playing, play, pause]);

  const seek = useCallback((time: number) => {
    if (videoRef.current) videoRef.current.currentTime = time;
    ytPlayerRef.current?.seekTo(time, true);
    set({ currentTime: time });
  }, [set]);

  const setVolume = useCallback((v: number) => {
    const clamped = Math.max(0, Math.min(1, v));
    if (videoRef.current) {
      videoRef.current.volume = clamped;
      videoRef.current.muted = clamped === 0;
    }
    ytPlayerRef.current?.setVolume(clamped * 100);
    set({ volume: clamped, muted: clamped === 0 });
  }, [set]);

  const toggleMute = useCallback(() => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      set({ muted: videoRef.current.muted });
    } else if (ytPlayerRef.current) {
      if (state.muted) {
        ytPlayerRef.current.unMute();
        set({ muted: false });
      } else {
        ytPlayerRef.current.mute();
        set({ muted: true });
      }
    }
  }, [state.muted, set]);

  const setPlaybackRate = useCallback((rate: number) => {
    if (videoRef.current) videoRef.current.playbackRate = rate;
    ytPlayerRef.current?.setPlaybackRate(rate);
    set({ playbackRate: rate });
  }, [set]);

  const setQuality = useCallback((quality: string) => {
    if (quality === "auto") {
      ytPlayerRef.current?.setPlaybackQuality("default");
    } else {
      ytPlayerRef.current?.setPlaybackQuality(quality as YT.SuggestedVideoQuality);
    }
    set({ quality });
  }, [set]);

  const toggleFullscreen = useCallback(() => {
    const el = containerRef.current;
    if (!el) return;
    if (!document.fullscreenElement) {
      el.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  }, [containerRef]);

  useEffect(() => {
    const onFsChange = () => set({ fullscreen: !!document.fullscreenElement });
    document.addEventListener("fullscreenchange", onFsChange);
    return () => document.removeEventListener("fullscreenchange", onFsChange);
  }, [set]);

  useEffect(() => {
    return () => {
      if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
      if (pollRef.current) clearInterval(pollRef.current);
    };
  }, []);

  return {
    state,
    set,
    videoRef,
    ytPlayerRef,
    pollRef,
    actions: { play, pause, toggle, seek, setVolume, toggleMute, toggleFullscreen, setPlaybackRate, setQuality, onActivity },
  };
}
