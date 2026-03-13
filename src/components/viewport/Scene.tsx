import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { AntiRollBar } from './AntiRollBar';
import { CamberLink } from './CamberLink';
import { Chassis } from './Chassis';
import { ForceArrows } from './ForceArrows';
import { GroundPlane } from './GroundPlane';
import { HubCarrier } from './HubCarrier';
import { HydraulicLine } from './HydraulicLine';
import { ShockAbsorber } from './ShockAbsorber';
import { SteeringLinkage } from './SteeringLinkage';
import { Wheel } from './Wheel';
import { Wishbone } from './Wishbone';

type SceneProps = {
  cornerLoads?: {
    frontLeft: number;
    frontRight: number;
    rearLeft: number;
    rearRight: number;
  };
};

export function Scene({
  cornerLoads = {
    frontLeft: 3800,
    frontRight: 3950,
    rearLeft: 3100,
    rearRight: 3260,
  },
}: SceneProps): JSX.Element {
  return (
    <Canvas camera={{ position: [3.5, 2.2, 3], fov: 40 }} shadows>
      <ambientLight intensity={0.35} />
      <directionalLight
        position={[5, 6, 4]}
        castShadow
        intensity={1.1}
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
      />

      <GroundPlane />
      <Chassis />

      <Wheel position={[0.98, 0.31, 0.72]} />
      <Wheel position={[0.98, 0.31, -0.72]} />
      <Wheel position={[-0.98, 0.31, 0.72]} />
      <Wheel position={[-0.98, 0.31, -0.72]} />

      <Wishbone fromA={[0.52, 0.45, 0.5]} fromB={[0.52, 0.45, 0.74]} toUpright={[1.0, 0.42, 0.62]} />
      <Wishbone fromA={[0.52, 0.3, 0.49]} fromB={[0.52, 0.3, 0.75]} toUpright={[1.0, 0.34, 0.62]} />

      <HubCarrier />
      <CamberLink />
      <ShockAbsorber />
      <HydraulicLine />
      <SteeringLinkage />
      <AntiRollBar />

      <ForceArrows
        arrows={[
          { origin: [0.98, 0.32, 0.72], direction: [0, 1, 0], magnitude: cornerLoads.frontLeft, color: '#60a5fa' },
          { origin: [0.98, 0.32, -0.72], direction: [0, 1, 0], magnitude: cornerLoads.frontRight, color: '#60a5fa' },
          { origin: [-0.98, 0.32, 0.72], direction: [0, 1, 0], magnitude: cornerLoads.rearLeft, color: '#34d399' },
          { origin: [-0.98, 0.32, -0.72], direction: [0, 1, 0], magnitude: cornerLoads.rearRight, color: '#34d399' },
        ]}
      />

      <OrbitControls makeDefault enablePan enableZoom enableRotate />
    </Canvas>
  );
}
