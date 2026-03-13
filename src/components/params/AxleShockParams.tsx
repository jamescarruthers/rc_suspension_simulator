import React from 'react';

type Axle = 'front' | 'rear';

type AxleShockPanelProps = {
  axle: Axle;
};

function AxleShockPanel({ axle }: AxleShockPanelProps) {
  return (
    <div className="axle-panel">
      <h4>{axle === 'front' ? 'Front Shock Setup' : 'Rear Shock Setup'}</h4>
      <label>
        Spring Rate (N/mm)
        <input type="number" name={`${axle}-springRate`} defaultValue={axle === 'front' ? 32 : 38} />
      </label>
      <label>
        Bump Damping
        <input type="number" name={`${axle}-bumpDamping`} defaultValue={axle === 'front' ? 2200 : 2400} />
      </label>
      <label>
        Rebound Damping
        <input type="number" name={`${axle}-reboundDamping`} defaultValue={axle === 'front' ? 2800 : 3200} />
      </label>
      <label>
        Motion Ratio
        <input type="number" step="0.01" name={`${axle}-motionRatio`} defaultValue={0.92} />
      </label>
    </div>
  );
}

type AxleShockParamsProps = {
  axle: Axle;
};

export function AxleShockParams({ axle }: AxleShockParamsProps) {
  return <AxleShockPanel axle={axle} />;
}
