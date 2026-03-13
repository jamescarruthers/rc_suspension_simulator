import { create } from 'zustand';

import {
  AxleGeometry,
  AxleShock,
  AxleSwayBar,
  HydraulicConfig,
  VehicleParams,
} from '../types/suspension';

const defaultVehicleParams: VehicleParams = {
  mass: 1800,
  sprungMass: 1500,
  cgHeight: 0.55,
  wheelbase: 2.8,
  gravity: 9.81,
  inertiaRoll: 750,
  inertiaPitch: 1200,
};

const defaultGeometry: AxleGeometry = {
  trackWidth: 1.6,
  motionRatio: 1,
  rollCenterHeight: 0.08,
  staticRideHeight: 0.16,
  unsprungMassPerWheel: 45,
};

const defaultShock: AxleShock = {
  springRate: 35000,
  bumpDamping: 2500,
  reboundDamping: 3200,
  maxCompression: 0.1,
  maxDroop: 0.08,
  preload: 0,
};

const defaultSwayBar: AxleSwayBar = {
  enabled: true,
  stiffness: 18000,
  preload: 0,
};

const defaultHydraulic: HydraulicConfig = {
  enabled: false,
  lineArea: 0.00025,
  accumulatorArea: 0.001,
  accumulatorSpringRate: 120000,
  accumulatorPreload: 0,
  fluidBulkModulus: 1400000000,
};

type Updater<T> = Partial<T>;

export interface VehicleStore {
  vehicle: VehicleParams;
  frontGeometry: AxleGeometry;
  rearGeometry: AxleGeometry;
  frontShock: AxleShock;
  rearShock: AxleShock;
  frontSwayBar: AxleSwayBar;
  rearSwayBar: AxleSwayBar;
  hydraulic: HydraulicConfig;
  setVehicle: (vehicle: Updater<VehicleParams>) => void;
  setFrontGeometry: (geometry: Updater<AxleGeometry>) => void;
  setRearGeometry: (geometry: Updater<AxleGeometry>) => void;
  setFrontShock: (shock: Updater<AxleShock>) => void;
  setRearShock: (shock: Updater<AxleShock>) => void;
  setFrontSwayBar: (swayBar: Updater<AxleSwayBar>) => void;
  setRearSwayBar: (swayBar: Updater<AxleSwayBar>) => void;
  setHydraulic: (hydraulic: Updater<HydraulicConfig>) => void;
  copyFrontGeometryToRear: () => void;
  copyRearGeometryToFront: () => void;
  copyFrontShockToRear: () => void;
  copyRearShockToFront: () => void;
  copyFrontSwayBarToRear: () => void;
  copyRearSwayBarToFront: () => void;
}

export const useVehicleStore = create<VehicleStore>((set) => ({
  vehicle: defaultVehicleParams,
  frontGeometry: defaultGeometry,
  rearGeometry: defaultGeometry,
  frontShock: defaultShock,
  rearShock: defaultShock,
  frontSwayBar: defaultSwayBar,
  rearSwayBar: defaultSwayBar,
  hydraulic: defaultHydraulic,

  setVehicle: (vehicle) =>
    set((state) => ({ vehicle: { ...state.vehicle, ...vehicle } })),
  setFrontGeometry: (geometry) =>
    set((state) => ({ frontGeometry: { ...state.frontGeometry, ...geometry } })),
  setRearGeometry: (geometry) =>
    set((state) => ({ rearGeometry: { ...state.rearGeometry, ...geometry } })),
  setFrontShock: (shock) =>
    set((state) => ({ frontShock: { ...state.frontShock, ...shock } })),
  setRearShock: (shock) =>
    set((state) => ({ rearShock: { ...state.rearShock, ...shock } })),
  setFrontSwayBar: (swayBar) =>
    set((state) => ({ frontSwayBar: { ...state.frontSwayBar, ...swayBar } })),
  setRearSwayBar: (swayBar) =>
    set((state) => ({ rearSwayBar: { ...state.rearSwayBar, ...swayBar } })),
  setHydraulic: (hydraulic) =>
    set((state) => ({ hydraulic: { ...state.hydraulic, ...hydraulic } })),

  copyFrontGeometryToRear: () =>
    set((state) => ({ rearGeometry: { ...state.frontGeometry } })),
  copyRearGeometryToFront: () =>
    set((state) => ({ frontGeometry: { ...state.rearGeometry } })),

  copyFrontShockToRear: () => set((state) => ({ rearShock: { ...state.frontShock } })),
  copyRearShockToFront: () =>
    set((state) => ({ frontShock: { ...state.rearShock } })),

  copyFrontSwayBarToRear: () =>
    set((state) => ({ rearSwayBar: { ...state.frontSwayBar } })),
  copyRearSwayBarToFront: () =>
    set((state) => ({ frontSwayBar: { ...state.rearSwayBar } })),
}));
