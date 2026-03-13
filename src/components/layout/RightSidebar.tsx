import React, { useState } from 'react';
import { SimControls } from '../simulation/SimControls';
import { RollInput } from '../simulation/RollInput';
import { PitchInput } from '../simulation/PitchInput';
import { RoadSurfaceInput } from '../simulation/RoadSurfaceInput';

type InputMode = 'roll' | 'pitch' | 'road';

export function RightSidebar() {
  const [mode, setMode] = useState<InputMode>('roll');
  const [isPlaying, setIsPlaying] = useState(false);

  const reset = () => {
    setIsPlaying(false);
    setMode('roll');
  };

  return (
    <aside className="right-sidebar">
      <h3>Simulation Inputs</h3>
      <div className="input-mode-toggle">
        <button type="button" onClick={() => setMode('roll')} aria-pressed={mode === 'roll'}>
          Roll
        </button>
        <button type="button" onClick={() => setMode('pitch')} aria-pressed={mode === 'pitch'}>
          Pitch
        </button>
        <button type="button" onClick={() => setMode('road')} aria-pressed={mode === 'road'}>
          Road
        </button>
      </div>

      {mode === 'roll' && <RollInput />}
      {mode === 'pitch' && <PitchInput />}
      {mode === 'road' && <RoadSurfaceInput />}

      <SimControls
        isPlaying={isPlaying}
        onPlayPause={() => setIsPlaying((prev) => !prev)}
        onReset={reset}
      />
    </aside>
  );
}
