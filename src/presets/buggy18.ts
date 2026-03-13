import type { FullPresetConfig } from './types';

export const buggy18Preset: FullPresetConfig = {
  id: 'buggy18',
  label: '1:8 Off-Road Buggy',
  vehicleParams: {
    massKg: 3.45,
    wheelbaseMm: 325,
    cgHeightMm: 58,
    frontWeightDistributionPct: 44,
    trackWidthFrontMm: 305,
    trackWidthRearMm: 310,
    tireRadiusMm: 57,
  },
  frontGeometry: {
    camberDeg: -1.5,
    casterDeg: 13,
    toeDeg: 0.5,
    rollCenterHeightMm: 14,
    antiDiveOrSquatPct: 18,
  },
  rearGeometry: {
    camberDeg: -2,
    casterDeg: 0,
    toeDeg: 2.8,
    rollCenterHeightMm: 18,
    antiDiveOrSquatPct: 24,
  },
  frontShocks: {
    springRateNPerMm: 2.1,
    preloadMm: 3,
    dampingCompression: 62,
    dampingRebound: 70,
    motionRatio: 0.92,
  },
  rearShocks: {
    springRateNPerMm: 2.3,
    preloadMm: 3.5,
    dampingCompression: 66,
    dampingRebound: 74,
    motionRatio: 0.9,
  },
  frontSwayBar: {
    enabled: true,
    stiffnessNmPerDeg: 1.9,
    bladePosition: 'medium',
  },
  rearSwayBar: {
    enabled: true,
    stiffnessNmPerDeg: 2.1,
    bladePosition: 'medium',
  },
  hydraulicDefaults: {
    pressureBar: 24,
    frontBiasPct: 52,
    valveResponseMs: 11,
    accumulatorVolumeCc: 18,
  },
};

export default buggy18Preset;
