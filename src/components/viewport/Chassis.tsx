import React from 'react';

type ChassisProps = {
  length?: number;
  width?: number;
  height?: number;
  color?: string;
  position?: [number, number, number];
};

export function Chassis({
  length = 2.2,
  width = 1.2,
  height = 0.25,
  color = '#2563eb',
  position = [0, 0.55, 0],
}: ChassisProps): JSX.Element {
  return (
    <mesh position={position} castShadow receiveShadow>
      <boxGeometry args={[length, height, width]} />
      <meshStandardMaterial color={color} metalness={0.35} roughness={0.45} />
    </mesh>
  );
}
