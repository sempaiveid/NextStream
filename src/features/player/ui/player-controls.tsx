"use client";
import { Maximize, Minimize, Pause, Play, SkipBack, SkipForward } from "lucide-react";

import type { PlayerActions, PlayerState } from "../model/use-player";
import { ProgressBar } from "./progress-bar";
import { SettingsMenu } from "./settings-menu";
import { VolumeControl } from "./volume-control";

interface PlayerControlsProps {
  state: PlayerState;
  actions: PlayerActions;
  isYoutube?: boolean;
}

export function PlayerControls({ state, actions, isYoutube }: PlayerControlsProps) {
  const { playing, muted, volume, currentTime, duration, buffered, fullscreen, showControls, playbackRate, quality, availableQualities } = state;
  const { toggle, seek, setVolume, toggleMute, toggleFullscreen, setPlaybackRate } = actions;

  return (
    <div
      className={`absolute inset-0 flex flex-col justify-between transition-opacity duration-300 ${
        showControls ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      <div className="bg-linear-to-b from-black/70 to-transparent px-6 pt-5 pb-16" />

      <div
        onClick={toggle}
        className="absolute inset-0 cursor-pointer"
        style={{ zIndex: 0 }}
      />

      <div className="relative z-10 bg-linear-to-t from-black/90 to-transparent px-6 pt-16 pb-4 space-y-3">
        <ProgressBar
          currentTime={currentTime}
          duration={duration}
          buffered={buffered}
          onSeek={seek}
        />

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={toggle}
              className="text-white hover:scale-110 transition-transform cursor-pointer"
            >
              {playing
                ? <Pause className="w-6 h-6 fill-white" />
                : <Play className="w-6 h-6 fill-white" />
              }
            </button>

            <button
              onClick={() => seek(Math.max(0, currentTime - 10))}
              title="-10s"
              className="text-white hover:scale-110 transition-transform cursor-pointer"
            >
              <SkipBack className="w-5 h-5" />
            </button>

            <button
              onClick={() => seek(Math.min(duration, currentTime + 10))}
              title="+10s"
              className="text-white hover:scale-110 transition-transform cursor-pointer"
            >
              <SkipForward className="w-5 h-5" />
            </button>

            <VolumeControl
              volume={volume}
              muted={muted}
              onVolumeChange={setVolume}
              onToggleMute={toggleMute}
            />

            {playbackRate !== 1 && (
              <span className="text-white/60 text-xs tabular-nums">{playbackRate}x</span>
            )}
          </div>

          <div className="flex items-center gap-4">
            <SettingsMenu
              playbackRate={playbackRate}
              onRateChange={setPlaybackRate}
              isYoutube={isYoutube}
              quality={quality}
              availableQualities={availableQualities}
              onQualityChange={actions.setQuality}
            />

            <button
              onClick={toggleFullscreen}
              className="text-white hover:scale-110 transition-transform cursor-pointer"
            >
              {fullscreen
                ? <Minimize className="w-5 h-5" />
                : <Maximize className="w-5 h-5" />
              }
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
