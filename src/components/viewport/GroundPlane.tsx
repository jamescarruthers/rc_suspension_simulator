import React from 'react';

type GroundPlaneProps = {
  size?: number;
  color?: string;
  y?: number;
};

export function GroundPlane({ size = 80, color = '#3f3f46', y = 0 }: GroundPlaneProps): JSX.Element {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, y, 0]} receiveShadow>
      <planeGeometry args={[size, size]} />
      <meshStandardMaterial color={color} roughness={0.95} metalness={0.1} />
    </mesh>
  );
}
