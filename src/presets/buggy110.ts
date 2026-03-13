import type { FullPresetConfig } from './types';

export const buggy110Preset: FullPresetConfig = {
  id: 'buggy110',
  label: '1:10 Off-Road Buggy',
  vehicleParams: {
    massKg: 1.72,
    wheelbaseMm: 282,
    cgHeightMm: 52,
    frontWeightDistributionPct: 43,
    trackWidthFrontMm: 248,
    trackWidthRearMm: 252,
    tireRadiusMm: 44,
  },
  frontGeometry: {
    camberDeg: -1.2,
    casterDeg: 10,
    toeDeg: 0.3,
    rollCenterHeightMm: 11,
    antiDiveOrSquatPct: 15,
  },
  rearGeometry: {
    camberDeg: -1.8,
    casterDeg: 0,
    toeDeg: 2.4,
    rollCenterHeightMm: 15,
    antiDiveOrSquatPct: 20,
  },
  frontShocks: {
    springRateNPerMm: 1.35,
    preloadMm: 2,
    dampingCompression: 54,
    dampingRebound: 63,
    motionRatio: 0.91,
  },
  rearShocks: {
    springRateNPerMm: 1.5,
    preloadMm: 2.4,
    dampingCompression: 58,
    dampingRebound: 66,
    motionRatio: 0.89,
  },
  frontSwayBar: {
    enabled: true,
    stiffnessNmPerDeg: 1.2,
    bladePosition: 'soft',
  },
  rearSwayBar: {
    enabled: true,
    stiffnessNmPerDeg: 1.5,
    bladePosition: 'medium',
  },
  hydraulicDefaults: {
    pressureBar: 20,
    frontBiasPct: 51,
    valveResponseMs: 13,
    accumulatorVolumeCc: 14,
  },
};

export default buggy110Preset;
