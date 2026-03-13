import React from 'react';

type AntiRollBarProps = {
  y?: number;
  width?: number;
  color?: string;
};

export function AntiRollBar({ y = 0.44, width = 1.05, color = '#10b981' }: AntiRollBarProps): JSX.Element {
  return (
    <group position={[0.1, y, 0]}>
      <mesh castShadow>
        <cylinderGeometry args={[0.012, 0.012, width, 14]} />
        <meshStandardMaterial color={color} metalness={0.3} roughness={0.45} />
      </mesh>
      <mesh position={[0.28, -0.08, width / 2 - 0.08]} rotation={[0, 0, 0.2]} castShadow>
        <cylinderGeometry args={[0.01, 0.01, 0.18, 10]} />
        <meshStandardMaterial color={color} metalness={0.3} roughness={0.45} />
      </mesh>
      <mesh position={[0.28, -0.08, -width / 2 + 0.08]} rotation={[0, 0, 0.2]} castShadow>
        <cylinderGeometry args={[0.01, 0.01, 0.18, 10]} />
        <meshStandardMaterial color={color} metalness={0.3} roughness={0.45} />
      </mesh>
    </group>
  );
}
