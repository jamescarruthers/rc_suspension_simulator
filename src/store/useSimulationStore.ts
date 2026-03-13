import { create } from 'zustand';

import { CORNERS, ChassisState, Corner, CornerState } from '../types/suspension';

const makeCornerValues = (initialValue = 0): Record<Corner, number> => ({
  [Corner.FrontLeft]: initialValue,
  [Corner.FrontRight]: initialValue,
  [Corner.RearLeft]: initialValue,
  [Corner.RearRight]: initialValue,
});

const defaultCornerState: CornerState = {
  wheel_z: makeCornerValues(0),
  wheel_vz: makeCornerValues(0),
  shock_compression: makeCornerValues(0),
  shock_velocity: makeCornerValues(0),
  accumulator_displacement: makeCornerValues(0),
  fluid_pressure: makeCornerValues(0),
};

const defaultChassisState: ChassisState = {
  roll: 0,
  rollRate: 0,
  pitch: 0,
  pitchRate: 0,
  z: 0,
  vz: 0,
};

type CornerChannel = keyof CornerState;

export interface SimulationStore {
  corners: CornerState;
  chassis: ChassisState;
  setCornerValue: (channel: CornerChannel, corner: Corner, value: number) => void;
  setCornerChannel: (channel: CornerChannel, values: Partial<Record<Corner, number>>) => void;
  setChassis: (chassis: Partial<ChassisState>) => void;
  resetSimulation: () => void;
}

export const useSimulationStore = create<SimulationStore>((set) => ({
  corners: defaultCornerState,
  chassis: defaultChassisState,

  setCornerValue: (channel, corner, value) =>
    set((state) => ({
      corners: {
        ...state.corners,
        [channel]: {
          ...state.corners[channel],
          [corner]: value,
        },
      },
    })),

  setCornerChannel: (channel, values) =>
    set((state) => ({
      corners: {
        ...state.corners,
        [channel]: {
          ...state.corners[channel],
          ...values,
        },
      },
    })),

  setChassis: (chassis) =>
    set((state) => ({
      chassis: {
        ...state.chassis,
        ...chassis,
      },
    })),

  resetSimulation: () =>
    set(() => ({
      corners: {
        wheel_z: makeCornerValues(0),
        wheel_vz: makeCornerValues(0),
        shock_compression: makeCornerValues(0),
        shock_velocity: makeCornerValues(0),
        accumulator_displacement: makeCornerValues(0),
        fluid_pressure: makeCornerValues(0),
      },
      chassis: { ...defaultChassisState },
    })),
}));

export { CORNERS };
