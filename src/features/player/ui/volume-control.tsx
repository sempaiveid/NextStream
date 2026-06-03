"use client";
import { Volume, Volume1, Volume2, VolumeX } from "lucide-react";
import { useCallback, useRef } from "react";

interface VolumeControlProps {
  volume: number;
  muted: boolean;
  onVolumeChange: (v: number) => void;
  onToggleMute: () => void;
}

export function VolumeControl({ volume, muted, onVolumeChange, onToggleMute }: VolumeControlProps) {
  const barRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  const getRatio = useCallback((clientX: number) => {
    const bar = barRef.current;
    if (!bar) return 0;
    const rect = bar.getBoundingClientRect();
    return Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
  }, []);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    dragging.current = true;
    onVolumeChange(getRatio(e.clientX));

    const onMove = (ev: MouseEvent) => {
      if (!dragging.current) return;
      onVolumeChange(getRatio(ev.clientX));
    };
    const onUp = () => {
      dragging.current = false;
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
    };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
  }, [getRatio, onVolumeChange]);

  const displayVolume = muted ? 0 : volume;

  const Icon = muted || volume === 0
    ? VolumeX
    : volume < 0.33
      ? Volume
      : volume < 0.66
        ? Volume1
        : Volume2;

  return (
    <div className="flex items-center gap-2 group/vol">
      <button
        onClick={onToggleMute}
        className="text-white hover:text-white/80 transition-colors cursor-pointer"
      >
        <Icon className="w-5 h-5" />
      </button>

      <div
        ref={barRef}
        onMouseDown={handleMouseDown}
        className="relative w-0 overflow-hidden group-hover/vol:w-20 transition-all duration-200 h-1.5 bg-white/30 rounded-full cursor-pointer group-hover/vol:overflow-visible"
      >
        <div
          className="absolute inset-y-0 left-0 bg-white rounded-full"
          style={{ width: `${displayVolume * 100}%` }}
        />
        <div
          className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-3 h-3 bg-white rounded-full shadow opacity-0 group-hover/vol:opacity-100 transition-opacity"
          style={{ left: `${displayVolume * 100}%` }}
        />
      </div>
    </div>
  );
}
