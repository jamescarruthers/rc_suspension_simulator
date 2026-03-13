import React from 'react';

type WheelProps = {
  position: [number, number, number];
  radius?: number;
  width?: number;
  color?: string;
};

export function Wheel({ position, radius = 0.31, width = 0.22, color = '#18181b' }: WheelProps): JSX.Element {
  return (
    <mesh position={position} rotation={[0, 0, Math.PI / 2]} castShadow receiveShadow>
      <cylinderGeometry args={[radius, radius, width, 24]} />
      <meshStandardMaterial color={color} roughness={0.8} metalness={0.15} />
    </mesh>
  );
}
