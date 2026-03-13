import { DEFAULT_PRESET_ID, PRESETS_BY_ID } from '../presets';
import type { FullPresetConfig } from '../presets/types';

export type PresetMode = 'preset' | 'custom';

export type SuspensionState = {
  selectedPresetId: string;
  mode: PresetMode;
  vehicleParams: FullPresetConfig['vehicleParams'];
  frontGeometry: FullPresetConfig['frontGeometry'];
  rearGeometry: FullPresetConfig['rearGeometry'];
  frontShocks: FullPresetConfig['frontShocks'];
  rearShocks: FullPresetConfig['rearShocks'];
  frontSwayBar: FullPresetConfig['frontSwayBar'];
  rearSwayBar: FullPresetConfig['rearSwayBar'];
  hydraulicDefaults: FullPresetConfig['hydraulicDefaults'];
  customSnapshot: Omit<
    SuspensionState,
    'selectedPresetId' | 'mode' | 'customSnapshot' | 'applyPreset' | 'setCustom' | 'applyCustomSnapshot'
  > | null;
  applyPreset: (presetId: string) => void;
  setCustom: <K extends keyof Omit<SuspensionState, 'selectedPresetId' | 'mode' | 'customSnapshot' | 'applyPreset' | 'setCustom' | 'applyCustomSnapshot'>>(
    key: K,
    value: SuspensionState[K],
  ) => void;
  applyCustomSnapshot: () => void;
};

const clonePreset = (preset: FullPresetConfig) => ({
  vehicleParams: { ...preset.vehicleParams },
  frontGeometry: { ...preset.frontGeometry },
  rearGeometry: { ...preset.rearGeometry },
  frontShocks: { ...preset.frontShocks },
  rearShocks: { ...preset.rearShocks },
  frontSwayBar: { ...preset.frontSwayBar },
  rearSwayBar: { ...preset.rearSwayBar },
  hydraulicDefaults: { ...preset.hydraulicDefaults },
});

const defaultPreset = PRESETS_BY_ID[DEFAULT_PRESET_ID];

export const suspensionStore: SuspensionState = {
  selectedPresetId: defaultPreset.id,
  mode: 'preset',
  ...clonePreset(defaultPreset),
  customSnapshot: null,
  applyPreset(presetId) {
    const preset = PRESETS_BY_ID[presetId];
    if (!preset) {
      return;
    }

    Object.assign(this, clonePreset(preset));
    this.selectedPresetId = preset.id;
    this.mode = 'preset';
  },
  setCustom(key, value) {
    (this as SuspensionState)[key] = value;
    this.mode = 'custom';
    this.customSnapshot = {
      vehicleParams: { ...this.vehicleParams },
      frontGeometry: { ...this.frontGeometry },
      rearGeometry: { ...this.rearGeometry },
      frontShocks: { ...this.frontShocks },
      rearShocks: { ...this.rearShocks },
      frontSwayBar: { ...this.frontSwayBar },
      rearSwayBar: { ...this.rearSwayBar },
      hydraulicDefaults: { ...this.hydraulicDefaults },
    };
  },
  applyCustomSnapshot() {
    if (!this.customSnapshot) {
      return;
    }

    Object.assign(this, this.customSnapshot);
    this.mode = 'custom';
  },
};
