import React from 'react';

type Axle = 'front' | 'rear';

type HydraulicParamsProps = {
  axle: Axle;
};

function AxleHydraulicPanel({ axle }: HydraulicParamsProps) {
  return (
    <div className="axle-panel">
      <h4>{axle === 'front' ? 'Front Hydraulic Circuit' : 'Rear Hydraulic Circuit'}</h4>
      <label>
        Target Pressure (bar)
        <input type="number" name={`${axle}-targetPressure`} defaultValue={axle === 'front' ? 65 : 58} />
      </label>
      <label>
        Accumulator Volume (cc)
        <input type="number" name={`${axle}-accumulator`} defaultValue={axle === 'front' ? 180 : 220} />
      </label>
      <label>
        Valve Response (ms)
        <input type="number" name={`${axle}-valveResponse`} defaultValue={14} />
      </label>
      <label>
        Bleed Rate (%)
        <input type="number" step="0.1" name={`${axle}-bleedRate`} defaultValue={1.5} />
      </label>
    </div>
  );
}

export function HydraulicParams({ axle }: HydraulicParamsProps) {
  return <AxleHydraulicPanel axle={axle} />;
}
