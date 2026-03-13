import buggy18Preset from './buggy18';
import buggy110Preset from './buggy110';
import touring110Preset from './touring110';
import type { FullPresetConfig } from './types';

export const PRESET_LIST: FullPresetConfig[] = [buggy18Preset, buggy110Preset, touring110Preset];

export const PRESETS_BY_ID: Record<string, FullPresetConfig> = Object.fromEntries(
  PRESET_LIST.map((preset) => [preset.id, preset]),
);

export const DEFAULT_PRESET_ID = buggy18Preset.id;
