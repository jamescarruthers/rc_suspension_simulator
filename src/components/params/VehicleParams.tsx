import React from 'react';

export function VehicleParams() {
  return (
    <div className="vehicle-params">
      <label>
        Vehicle Mass (kg)
        <input type="number" name="vehicle-mass" defaultValue={1350} />
      </label>
      <label>
        Wheelbase (mm)
        <input type="number" name="vehicle-wheelbase" defaultValue={2720} />
      </label>
      <label>
        CG Height (mm)
        <input type="number" name="vehicle-cgHeight" defaultValue={510} />
      </label>
      <label>
        Weight Distribution Front (%)
        <input type="number" step="0.1" name="vehicle-frontWeight" defaultValue={52.5} />
      </label>
      <label>
        Tire Grip Scale
        <input type="number" step="0.01" name="vehicle-gripScale" defaultValue={1} />
      </label>
    </div>
  );
}
