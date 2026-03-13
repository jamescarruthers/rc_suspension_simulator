import { DEFAULT_PRESET_ID, PRESET_LIST } from '../presets';
import { suspensionStore } from '../store/presetStore';
import type { SuspensionState } from '../store/presetStore';

type EditableSliceKey =
  | 'vehicleParams'
  | 'frontGeometry'
  | 'rearGeometry'
  | 'frontShocks'
  | 'rearShocks'
  | 'frontSwayBar'
  | 'rearSwayBar'
  | 'hydraulicDefaults';

/**
 * Right sidebar preset integration hooks.
 *
 * - applyPresetSelection overwrites all preset-backed slices.
 * - onUserEdit retains custom user values and sets mode to custom.
 */
export const rightSidebarControls = {
  presets: PRESET_LIST,
  defaultPresetId: DEFAULT_PRESET_ID,

  applyPresetSelection(presetId: string) {
    suspensionStore.applyPreset(presetId);
  },

  onUserEdit<K extends EditableSliceKey>(key: K, value: SuspensionState[K]) {
    suspensionStore.setCustom(key, value);
  },

  restoreCustomModeValues() {
    suspensionStore.applyCustomSnapshot();
  },
};
