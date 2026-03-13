import React from 'react';

type Axle = 'front' | 'rear';

type AxleSwayBarPanelProps = {
  axle: Axle;
};

function AxleSwayBarPanel({ axle }: AxleSwayBarPanelProps) {
  return (
    <div className="axle-panel">
      <h4>{axle === 'front' ? 'Front Sway Bar' : 'Rear Sway Bar'}</h4>
      <label>
        Bar Diameter (mm)
        <input type="number" name={`${axle}-barDiameter`} defaultValue={axle === 'front' ? 28 : 24} />
      </label>
      <label>
        Lever Arm Length (mm)
        <input type="number" name={`${axle}-leverArm`} defaultValue={180} />
      </label>
      <label>
        Blade Position
        <select name={`${axle}-bladePosition`} defaultValue="medium">
          <option value="soft">Soft</option>
          <option value="medium">Medium</option>
          <option value="stiff">Stiff</option>
        </select>
      </label>
      <label>
        Preload (Nm)
        <input type="number" name={`${axle}-preload`} defaultValue={0} />
      </label>
    </div>
  );
}

type AxleSwayBarParamsProps = {
  axle: Axle;
};

export function AxleSwayBarParams({ axle }: AxleSwayBarParamsProps) {
  return <AxleSwayBarPanel axle={axle} />;
}
