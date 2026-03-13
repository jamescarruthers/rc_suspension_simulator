import React, { useState } from 'react';

type Axle = 'front' | 'rear';

type AxleGeometryPanelProps = {
  axle: Axle;
};

function AxleGeometryPanel({ axle }: AxleGeometryPanelProps) {
  const [showAdvanced, setShowAdvanced] = useState(false);

  return (
    <div className="axle-panel">
      <h4>{axle === 'front' ? 'Front Axle Geometry' : 'Rear Axle Geometry'}</h4>
      <label>
        Track Width (mm)
        <input type="number" name={`${axle}-trackWidth`} defaultValue={1600} />
      </label>
      <label>
        Camber (°)
        <input type="number" step="0.1" name={`${axle}-camber`} defaultValue={-1.2} />
      </label>
      <label>
        Toe (°)
        <input type="number" step="0.1" name={`${axle}-toe`} defaultValue={0.1} />
      </label>
      <label>
        Roll Center Height (mm)
        <input type="number" name={`${axle}-rollCenter`} defaultValue={axle === 'front' ? 45 : 55} />
      </label>

      {axle === 'front' ? (
        <label>
          Anti-Dive (%)
          <input type="number" name="front-antiDive" defaultValue={10} />
        </label>
      ) : (
        <label>
          Anti-Squat (%)
          <input type="number" name="rear-antiSquat" defaultValue={15} />
        </label>
      )}

      {axle === 'rear' && (
        <>
          <button type="button" onClick={() => setShowAdvanced((prev) => !prev)}>
            {showAdvanced ? 'Hide' : 'Show'} Advanced KPI / Caster
          </button>
          {showAdvanced && (
            <div className="nested-advanced-grid">
              <label>
                KPI (°)
                <input type="number" step="0.1" name="rear-kpi" defaultValue={9} />
              </label>
              <label>
                Caster (°)
                <input type="number" step="0.1" name="rear-caster" defaultValue={5.5} />
              </label>
            </div>
          )}
        </>
      )}
    </div>
  );
}

type AxleGeometryParamsProps = {
  axle: Axle;
};

export function AxleGeometryParams({ axle }: AxleGeometryParamsProps) {
  return <AxleGeometryPanel axle={axle} />;
}
