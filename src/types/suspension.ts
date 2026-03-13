export enum AxlePosition {
  Front = 'front',
  Rear = 'rear',
}

export enum Corner {
  FrontLeft = 'front_left',
  FrontRight = 'front_right',
  RearLeft = 'rear_left',
  RearRight = 'rear_right',
}

export const CORNERS: Corner[] = [
  Corner.FrontLeft,
  Corner.FrontRight,
  Corner.RearLeft,
  Corner.RearRight,
];

export enum SimulationChannel {
  WheelZ = 'wheel_z',
  WheelVz = 'wheel_vz',
  ShockCompression = 'shock_compression',
  ShockVelocity = 'shock_velocity',
  AccumulatorDisplacement = 'accumulator_displacement',
  FluidPressure = 'fluid_pressure',
  Roll = 'roll',
  RollRate = 'roll_rate',
  Pitch = 'pitch',
  PitchRate = 'pitch_rate',
  Z = 'z',
  Vz = 'vz',
}

export interface VehicleParams {
  mass: number;
  sprungMass: number;
  cgHeight: number;
  wheelbase: number;
  gravity: number;
  inertiaRoll: number;
  inertiaPitch: number;
}

export interface AxleGeometry {
  trackWidth: number;
  motionRatio: number;
  rollCenterHeight: number;
  staticRideHeight: number;
  unsprungMassPerWheel: number;
}

export interface AxleShock {
  springRate: number;
  bumpDamping: number;
  reboundDamping: number;
  maxCompression: number;
  maxDroop: number;
  preload: number;
}

export interface AxleSwayBar {
  enabled: boolean;
  stiffness: number;
  preload: number;
}

export interface HydraulicConfig {
  enabled: boolean;
  lineArea: number;
  accumulatorArea: number;
  accumulatorSpringRate: number;
  accumulatorPreload: number;
  fluidBulkModulus: number;
}

export type CornerValues = Record<Corner, number>;

export interface ChassisState {
  roll: number;
  rollRate: number;
  pitch: number;
  pitchRate: number;
  z: number;
  vz: number;
}

export interface CornerState {
  wheel_z: CornerValues;
  wheel_vz: CornerValues;
  shock_compression: CornerValues;
  shock_velocity: CornerValues;
  accumulator_displacement: CornerValues;
  fluid_pressure: CornerValues;
}
