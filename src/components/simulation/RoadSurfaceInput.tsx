import React from 'react';

export function RoadSurfaceInput() {
  return (
    <div className="input-mode-panel">
      <h4>Road Surface Input</h4>
      <label>
        Surface Type
        <select name="road-surface" defaultValue="asphalt">
          <option value="asphalt">Asphalt</option>
          <option value="curb">Curb Strike</option>
          <option value="washboards">Washboard</option>
          <option value="bump">Single Bump</option>
        </select>
      </label>
      <label>
        Input Amplitude (mm)
        <input type="number" defaultValue={10} name="road-amplitude" />
      </label>
      <label>
        Vehicle Speed (km/h)
        <input type="number" defaultValue={80} name="road-speed" />
      </label>
    </div>
  );
}
