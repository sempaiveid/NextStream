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
      <div className="bg-linear-to-b from-black/70 to-transparent px-4 pt-4 pb-16" />

      <div
        onClick={toggle}
        className="absolute inset-0 cursor-pointer"
        style={{ zIndex: 0 }}
      />

      <div className="relative z-10 bg-linear-to-t from-black/90 to-transparent px-4 pt-16 pb-3 space-y-2">
        <ProgressBar
          currentTime={currentTime}
          duration={duration}
          buffered={buffered}
          onSeek={seek}
        />

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 md:gap-4">
            <button
              onClick={toggle}
              className="text-white active:scale-95 transition-transform cursor-pointer p-1"
            >
              {playing
                ? <Pause className="w-7 h-7 md:w-6 md:h-6 fill-white" />
                : <Play className="w-7 h-7 md:w-6 md:h-6 fill-white" />
              }
            </button>

            <button
              onClick={() => seek(Math.max(0, currentTime - 10))}
              className="text-white active:scale-95 transition-transform cursor-pointer p-1"
            >
              <SkipBack className="w-6 h-6 md:w-5 md:h-5" />
            </button>

            <button
              onClick={() => seek(Math.min(duration, currentTime + 10))}
              className="text-white active:scale-95 transition-transform cursor-pointer p-1"
            >
              <SkipForward className="w-6 h-6 md:w-5 md:h-5" />
            </button>

            <div className="hidden sm:block">
              <VolumeControl
                volume={volume}
                muted={muted}
                onVolumeChange={setVolume}
                onToggleMute={toggleMute}
              />
            </div>

            {playbackRate !== 1 && (
              <span className="text-white/60 text-xs tabular-nums hidden sm:block">{playbackRate}x</span>
            )}
          </div>

          <div className="flex items-center gap-3 md:gap-4">
            <div className="hidden sm:block">
              <SettingsMenu
                playbackRate={playbackRate}
                onRateChange={setPlaybackRate}
                isYoutube={isYoutube}
                quality={quality}
                availableQualities={availableQualities}
                onQualityChange={actions.setQuality}
              />
            </div>

            <button
              onClick={toggleFullscreen}
              className="text-white active:scale-95 transition-transform cursor-pointer p-1"
            >
              {fullscreen
                ? <Minimize className="w-6 h-6 md:w-5 md:h-5" />
                : <Maximize className="w-6 h-6 md:w-5 md:h-5" />
              }
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
