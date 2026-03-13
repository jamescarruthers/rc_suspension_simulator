import React from 'react';

type CamberLinkProps = {
  position?: [number, number, number];
  length?: number;
  color?: string;
};

export function CamberLink({ position = [0.95, 0.62, 0.62], length = 0.36, color = '#f59e0b' }: CamberLinkProps): JSX.Element {
  return (
    <mesh position={position} rotation={[0, 0, 0.3]} castShadow>
      <cylinderGeometry args={[0.014, 0.014, length, 12]} />
      <meshStandardMaterial color={color} metalness={0.35} roughness={0.4} />
    </mesh>
  );
}
