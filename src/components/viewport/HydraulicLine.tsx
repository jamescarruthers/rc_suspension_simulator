import React from 'react';

type HydraulicLineProps = {
  points?: [number, number, number][];
  color?: string;
};

export function HydraulicLine({
  points = [
    [0.55, 0.58, 0.62],
    [0.3, 0.62, 0.45],
    [0.1, 0.64, 0.15],
  ],
  color = '#38bdf8',
}: HydraulicLineProps): JSX.Element {
  return (
    <group>
      {points.slice(0, -1).map((start, i) => {
        const end = points[i + 1];
        const dx = end[0] - start[0];
        const dy = end[1] - start[1];
        const dz = end[2] - start[2];
        const len = Math.sqrt(dx * dx + dy * dy + dz * dz);
        const mid: [number, number, number] = [start[0] + dx / 2, start[1] + dy / 2, start[2] + dz / 2];
        return (
          <mesh key={i} position={mid} rotation={[Math.atan2(dz, dy), 0, -Math.atan2(dx, dy)]}>
            <cylinderGeometry args={[0.005, 0.005, len, 8]} />
            <meshStandardMaterial color={color} metalness={0.25} roughness={0.35} />
          </mesh>
        );
      })}
    </group>
  );
}
