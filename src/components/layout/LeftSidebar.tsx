import React, { useState } from 'react';
import { VehicleParams } from '../params/VehicleParams';
import { AxleGeometryParams } from '../params/AxleGeometryParams';
import { AxleShockParams } from '../params/AxleShockParams';
import { AxleSwayBarParams } from '../params/AxleSwayBarParams';
import { HydraulicParams } from '../params/HydraulicParams';
import { CopyAxleButton } from '../params/CopyAxleButton';

type SectionKey = 'vehicle' | 'geometry' | 'shock' | 'sway' | 'hydraulic';

export function LeftSidebar() {
  const [open, setOpen] = useState<Record<SectionKey, boolean>>({
    vehicle: true,
    geometry: true,
    shock: false,
    sway: false,
    hydraulic: false,
  });

  const toggle = (key: SectionKey) => setOpen((prev) => ({ ...prev, [key]: !prev[key] }));

  const handleCopy = (from: 'front' | 'rear', to: 'front' | 'rear') => {
    // Hook for state/store sync.
    // eslint-disable-next-line no-console
    console.info(`Copying ${from} axle values to ${to}`);
  };

  return (
    <aside className="left-sidebar">
      <section>
        <button type="button" onClick={() => toggle('vehicle')}>Vehicle Parameters</button>
        {open.vehicle && <VehicleParams />}
      </section>

      <section>
        <button type="button" onClick={() => toggle('geometry')}>Axle Geometry</button>
        {open.geometry && (
          <div className="stacked-axle-panels">
            <AxleGeometryParams axle="front" />
            <CopyAxleButton from="front" to="rear" onCopy={handleCopy} />
            <AxleGeometryParams axle="rear" />
            <CopyAxleButton from="rear" to="front" onCopy={handleCopy} />
          </div>
        )}
      </section>

      <section>
        <button type="button" onClick={() => toggle('shock')}>Shocks</button>
        {open.shock && (
          <div className="stacked-axle-panels">
            <AxleShockParams axle="front" />
            <CopyAxleButton from="front" to="rear" onCopy={handleCopy} />
            <AxleShockParams axle="rear" />
            <CopyAxleButton from="rear" to="front" onCopy={handleCopy} />
          </div>
        )}
      </section>

      <section>
        <button type="button" onClick={() => toggle('sway')}>Sway Bars</button>
        {open.sway && (
          <div className="stacked-axle-panels">
            <AxleSwayBarParams axle="front" />
            <CopyAxleButton from="front" to="rear" onCopy={handleCopy} />
            <AxleSwayBarParams axle="rear" />
            <CopyAxleButton from="rear" to="front" onCopy={handleCopy} />
          </div>
        )}
      </section>

      <section>
        <button type="button" onClick={() => toggle('hydraulic')}>Hydraulics</button>
        {open.hydraulic && (
          <div className="stacked-axle-panels">
            <HydraulicParams axle="front" />
            <CopyAxleButton from="front" to="rear" onCopy={handleCopy} />
            <HydraulicParams axle="rear" />
            <CopyAxleButton from="rear" to="front" onCopy={handleCopy} />
          </div>
        )}
      </section>
    </aside>
  );
}
