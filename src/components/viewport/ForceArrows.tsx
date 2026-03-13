import React from 'react';

type ForceArrow = {
  origin: [number, number, number];
  direction: [number, number, number];
  magnitude: number;
  color?: string;
};

type ForceArrowsProps = {
  arrows: ForceArrow[];
  scale?: number;
};

export function ForceArrows({ arrows, scale = 0.0006 }: ForceArrowsProps): JSX.Element {
  return (
    <group>
      {arrows.map((arrow, idx) => {
        const length = Math.max(0.08, Math.abs(arrow.magnitude) * scale);
        const [dx, dy, dz] = arrow.direction;
        const yaw = Math.atan2(dx, dz);
        const pitch = -Math.atan2(dy, Math.sqrt(dx * dx + dz * dz));

        return (
          <group key={idx} position={arrow.origin} rotation={[pitch, yaw, 0]}>
            <mesh position={[0, length * 0.4, 0]}>
              <cylinderGeometry args={[0.01, 0.01, length * 0.8, 8]} />
              <meshStandardMaterial color={arrow.color ?? '#22d3ee'} />
            </mesh>
            <mesh position={[0, length * 0.9, 0]}>
              <coneGeometry args={[0.024, length * 0.2, 10]} />
              <meshStandardMaterial color={arrow.color ?? '#22d3ee'} />
            </mesh>
          </group>
        );
      })}
    </group>
  );
}
