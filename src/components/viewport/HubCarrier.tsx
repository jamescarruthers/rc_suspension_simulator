import React from 'react';

type HubCarrierProps = {
  position?: [number, number, number];
  color?: string;
};

export function HubCarrier({ position = [1.02, 0.38, 0.62], color = '#71717a' }: HubCarrierProps): JSX.Element {
  return (
    <mesh position={position} castShadow receiveShadow>
      <boxGeometry args={[0.09, 0.22, 0.12]} />
      <meshStandardMaterial color={color} metalness={0.45} roughness={0.45} />
    </mesh>
  );
}
