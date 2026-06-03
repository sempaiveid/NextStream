"use client";
import { useCallback, useRef } from "react";

interface ProgressBarProps {
  currentTime: number;
  duration: number;
  buffered: number;
  onSeek: (time: number) => void;
}

function formatTime(s: number): string {
  const h = Math.floor(s / 3600);
  const m = Math.floor((s % 3600) / 60);
  const sec = Math.floor(s % 60);
  if (h > 0) return `${h}:${String(m).padStart(2, "0")}:${String(sec).padStart(2, "0")}`;
  return `${m}:${String(sec).padStart(2, "0")}`;
}

export function ProgressBar({ currentTime, duration, buffered, onSeek }: ProgressBarProps) {
  const barRef = useRef<HTMLDivElement>(null);

  const getTimeFromEvent = useCallback((e: React.MouseEvent) => {
    const bar = barRef.current;
    if (!bar || !duration) return 0;
    const rect = bar.getBoundingClientRect();
    const ratio = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    return ratio * duration;
  }, [duration]);

  const handleClick = useCallback((e: React.MouseEvent) => {
    onSeek(getTimeFromEvent(e));
  }, [onSeek, getTimeFromEvent]);

  const progress = duration ? (currentTime / duration) * 100 : 0;
  const bufferedPct = duration ? (buffered / duration) * 100 : 0;

  return (
    <div className="flex items-center gap-3 w-full">
      <span className="text-white text-xs tabular-nums shrink-0">{formatTime(currentTime)}</span>

      <div
        ref={barRef}
        onClick={handleClick}
        className="relative flex-1 h-1 bg-white/30 rounded-full cursor-pointer group hover:h-2 transition-all duration-150"
      >
        <div
          className="absolute inset-y-0 left-0 bg-white/40 rounded-full"
          style={{ width: `${bufferedPct}%` }}
        />
        <div
          className="absolute inset-y-0 left-0 bg-brand rounded-full"
          style={{ width: `${progress}%` }}
        />
        <div
          className="absolute top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity -translate-x-1/2"
          style={{ left: `${progress}%` }}
        />
      </div>

      <span className="text-white/60 text-xs tabular-nums shrink-0">{formatTime(duration)}</span>
    </div>
  );
}
