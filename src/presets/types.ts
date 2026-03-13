export type VehicleParams = {
  massKg: number;
  wheelbaseMm: number;
  cgHeightMm: number;
  frontWeightDistributionPct: number;
  trackWidthFrontMm: number;
  trackWidthRearMm: number;
  tireRadiusMm: number;
};

export type AxleGeometry = {
  camberDeg: number;
  casterDeg: number;
  toeDeg: number;
  rollCenterHeightMm: number;
  antiDiveOrSquatPct: number;
};

export type ShockConfig = {
  springRateNPerMm: number;
  preloadMm: number;
  dampingCompression: number;
  dampingRebound: number;
  motionRatio: number;
};

export type SwayBarConfig = {
  enabled: boolean;
  stiffnessNmPerDeg: number;
  bladePosition: 'soft' | 'medium' | 'hard';
};

export type HydraulicDefaults = {
  pressureBar: number;
  frontBiasPct: number;
  valveResponseMs: number;
  accumulatorVolumeCc: number;
};

export type FullPresetConfig = {
  id: string;
  label: string;
  vehicleParams: VehicleParams;
  frontGeometry: AxleGeometry;
  rearGeometry: AxleGeometry;
  frontShocks: ShockConfig;
  rearShocks: ShockConfig;
  frontSwayBar: SwayBarConfig;
  rearSwayBar: SwayBarConfig;
  hydraulicDefaults: HydraulicDefaults;
};
