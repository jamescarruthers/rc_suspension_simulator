import React from 'react';

export function PitchInput() {
  return (
    <div className="input-mode-panel">
      <h4>Pitch Input</h4>
      <label>
        Pitch Angle (°)
        <input type="range" min={-8} max={8} step={0.1} defaultValue={0} name="pitch-angle" />
      </label>
      <label>
        Longitudinal Accel (g)
        <input type="number" step="0.01" defaultValue={0} name="pitch-accel" />
      </label>
    </div>
  );
}
