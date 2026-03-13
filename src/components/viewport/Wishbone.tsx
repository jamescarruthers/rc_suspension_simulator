import React from 'react';
import { Vector3 } from 'three';

type WishboneProps = {
  fromA: [number, number, number];
  fromB: [number, number, number];
  toUpright: [number, number, number];
  color?: string;
};

function Link({ from, to, color = '#a1a1aa' }: { from: Vector3; to: Vector3; color?: string }): JSX.Element {
  const dir = new Vector3().subVectors(to, from);
  const length = dir.length();
  const mid = new Vector3().addVectors(from, to).multiplyScalar(0.5);
  const rotation = new Vector3(Math.atan2(dir.z, dir.y), 0, -Math.atan2(dir.x, dir.y));

  return (
    <mesh position={[mid.x, mid.y, mid.z]} rotation={[rotation.x, rotation.y, rotation.z]} castShadow>
      <cylinderGeometry args={[0.018, 0.018, length, 10]} />
      <meshStandardMaterial color={color} metalness={0.4} roughness={0.45} />
    </mesh>
  );
}

export function Wishbone({ fromA, fromB, toUpright, color }: WishboneProps): JSX.Element {
  const a = new Vector3(...fromA);
  const b = new Vector3(...fromB);
  const c = new Vector3(...toUpright);

  return (
    <group>
      <Link from={a} to={c} color={color} />
      <Link from={b} to={c} color={color} />
    </group>
  );
}
