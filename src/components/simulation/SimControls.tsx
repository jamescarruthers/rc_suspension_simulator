import React from 'react';

type SimControlsProps = {
  isPlaying: boolean;
  onPlayPause: () => void;
  onReset: () => void;
};

export function SimControls({ isPlaying, onPlayPause, onReset }: SimControlsProps) {
  return (
    <div className="sim-controls">
      <button type="button" onClick={onPlayPause}>
        {isPlaying ? 'Pause' : 'Play'}
      </button>
      <button type="button" onClick={onReset}>
        Reset
      </button>
    </div>
  );
}
