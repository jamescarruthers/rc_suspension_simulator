import type { FullPresetConfig } from './types';

export const touring110Preset: FullPresetConfig = {
  id: 'touring110',
  label: '1:10 Touring Car',
  vehicleParams: {
    massKg: 1.42,
    wheelbaseMm: 258,
    cgHeightMm: 41,
    frontWeightDistributionPct: 46,
    trackWidthFrontMm: 188,
    trackWidthRearMm: 190,
    tireRadiusMm: 32,
  },
  frontGeometry: {
    camberDeg: -2.2,
    casterDeg: 7,
    toeDeg: 1.2,
    rollCenterHeightMm: 9,
    antiDiveOrSquatPct: 8,
  },
  rearGeometry: {
    camberDeg: -2.7,
    casterDeg: 0,
    toeDeg: 2.7,
    rollCenterHeightMm: 10,
    antiDiveOrSquatPct: 12,
  },
  frontShocks: {
    springRateNPerMm: 1.15,
    preloadMm: 1,
    dampingCompression: 48,
    dampingRebound: 55,
    motionRatio: 0.97,
  },
  rearShocks: {
    springRateNPerMm: 1.25,
    preloadMm: 1.2,
    dampingCompression: 50,
    dampingRebound: 58,
    motionRatio: 0.96,
  },
  frontSwayBar: {
    enabled: true,
    stiffnessNmPerDeg: 2.2,
    bladePosition: 'hard',
  },
  rearSwayBar: {
    enabled: true,
    stiffnessNmPerDeg: 1.9,
    bladePosition: 'medium',
  },
  hydraulicDefaults: {
    pressureBar: 16,
    frontBiasPct: 54,
    valveResponseMs: 9,
    accumulatorVolumeCc: 10,
  },
};

export default touring110Preset;
