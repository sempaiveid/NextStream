"use client";
import { Settings } from "lucide-react";
import { useRef, useState } from "react";

import { useClickOutside } from "../model/use-click-outside";

const SPEEDS = [0.25, 0.5, 0.75, 1, 1.25, 1.5, 1.75, 2];

const QUALITY_LABELS: Record<string, string> = {
  auto: "Auto",
  hd2160: "4K (2160p)",
  hd1440: "1440p",
  hd1080: "1080p",
  hd720: "720p",
  large: "480p",
  medium: "360p",
  small: "240p",
  tiny: "144p",
};

interface SettingsMenuProps {
  playbackRate: number;
  onRateChange: (rate: number) => void;
  isYoutube?: boolean;
  quality?: string;
  availableQualities?: string[];
  onQualityChange?: (q: string) => void;
}

export function SettingsMenu({
  playbackRate,
  onRateChange,
  isYoutube,
  quality,
  availableQualities = [],
  onQualityChange,
}: SettingsMenuProps) {
  const [open, setOpen] = useState(false);
  const [tab, setTab] = useState<"speed" | "quality">("speed");
  const ref = useRef<HTMLDivElement>(null);

  useClickOutside(ref, () => setOpen(false));

  const qualities = isYoutube ? ["auto", ...availableQualities] : [];

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        className={`text-white hover:scale-110 transition-transform cursor-pointer ${open ? "text-brand" : ""}`}
      >
        <Settings className="w-5 h-5" />
      </button>

      {open && (
        <div className="absolute bottom-9 right-0 bg-black/95 border border-white/10 rounded-lg overflow-hidden w-52 shadow-2xl">
          {isYoutube && qualities.length > 0 && (
            <div className="flex border-b border-white/10">
              {(["speed", "quality"] as const).map((t) => (
                <button
                  key={t}
                  onClick={() => setTab(t)}
                  className={`flex-1 py-2 text-xs font-medium transition-colors cursor-pointer capitalize ${
                    tab === t ? "text-white border-b-2 border-brand" : "text-gray-400 hover:text-white"
                  }`}
                >
                  {t === "speed" ? "Speed" : "Quality"}
                </button>
              ))}
            </div>
          )}

          {tab === "speed" && (
            <>
              {!isYoutube && (
                <p className="text-gray-400 text-xs px-4 py-2 border-b border-white/10">Playback Speed</p>
              )}
              {SPEEDS.map((rate) => (
                <button
                  key={rate}
                  onClick={() => { onRateChange(rate); setOpen(false); }}
                  className={`w-full text-left px-4 py-2 text-sm transition-colors cursor-pointer flex items-center justify-between ${
                    playbackRate === rate ? "text-brand bg-white/5" : "text-white hover:bg-white/10"
                  }`}
                >
                  <span>{rate === 1 ? "Normal" : `${rate}x`}</span>
                  {playbackRate === rate && <span className="w-1.5 h-1.5 rounded-full bg-brand" />}
                </button>
              ))}
            </>
          )}

          {tab === "quality" && isYoutube && (
            <>
              {qualities.map((q) => (
                <button
                  key={q}
                  onClick={() => { onQualityChange?.(q); setOpen(false); }}
                  className={`w-full text-left px-4 py-2 text-sm transition-colors cursor-pointer flex items-center justify-between ${
                    quality === q ? "text-brand bg-white/5" : "text-white hover:bg-white/10"
                  }`}
                >
                  <span>{QUALITY_LABELS[q] ?? q}</span>
                  {quality === q && <span className="w-1.5 h-1.5 rounded-full bg-brand" />}
                </button>
              ))}
            </>
          )}
        </div>
      )}
    </div>
  );
}
