import React from 'react';

type ShockAbsorberProps = {
  position?: [number, number, number];
  compression?: number;
};

export function ShockAbsorber({ position = [0.58, 0.58, 0.62], compression = 0.25 }: ShockAbsorberProps): JSX.Element {
  const springLength = Math.max(0.34 - compression * 0.15, 0.16);

  return (
    <group position={position} rotation={[0, 0, 0.35]}>
      <mesh position={[0, 0.12, 0]} castShadow>
        <cylinderGeometry args={[0.018, 0.018, springLength, 12]} />
        <meshStandardMaterial color="#ef4444" roughness={0.3} metalness={0.5} />
      </mesh>
      <mesh position={[0, -0.1, 0]} castShadow>
        <cylinderGeometry args={[0.011, 0.011, 0.22, 10]} />
        <meshStandardMaterial color="#d4d4d8" roughness={0.35} metalness={0.85} />
      </mesh>
    </group>
  );
}
