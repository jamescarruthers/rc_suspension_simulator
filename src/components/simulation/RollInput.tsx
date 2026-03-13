import React from 'react';

export function RollInput() {
  return (
    <div className="input-mode-panel">
      <h4>Roll Input</h4>
      <label>
        Roll Angle (°)
        <input type="range" min={-10} max={10} step={0.1} defaultValue={0} name="roll-angle" />
      </label>
      <label>
        Roll Rate (°/s)
        <input type="number" defaultValue={0} name="roll-rate" />
      </label>
    </div>
  );
}
