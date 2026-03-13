import React from 'react';

type SteeringLinkageProps = {
  position?: [number, number, number];
  toeAngle?: number;
};

export function SteeringLinkage({ position = [0.88, 0.42, 0], toeAngle = 0 }: SteeringLinkageProps): JSX.Element {
  return (
    <group position={position}>
      <mesh position={[0, 0, 0.58]} rotation={[0, toeAngle, 0]} castShadow>
        <cylinderGeometry args={[0.01, 0.01, 0.24, 10]} />
        <meshStandardMaterial color="#f4f4f5" metalness={0.8} roughness={0.25} />
      </mesh>
      <mesh position={[0, 0, -0.58]} rotation={[0, toeAngle, 0]} castShadow>
        <cylinderGeometry args={[0.01, 0.01, 0.24, 10]} />
        <meshStandardMaterial color="#f4f4f5" metalness={0.8} roughness={0.25} />
      </mesh>
    </group>
  );
}
