export type RoadProfileType = 'flat' | 'bump' | 'speedBump' | 'diagonal' | 'washboard' | 'random';

export type RoadSampleInput = {
  x: number;
  y: number;
  time: number;
};

export type RoadProfileConfig = {
  type: RoadProfileType;
  amplitude?: number;
  wavelength?: number;
  bumpCenter?: number;
  bumpWidth?: number;
  seed?: number;
};

function hashNoise(n: number): number {
  const x = Math.sin(n * 127.1) * 43758.5453123;
  return x - Math.floor(x);
}

function valueNoise1D(x: number, seed = 1): number {
  const x0 = Math.floor(x);
  const x1 = x0 + 1;
  const t = x - x0;
  const smooth = t * t * (3 - 2 * t);
  const v0 = hashNoise(x0 + seed);
  const v1 = hashNoise(x1 + seed);
  return v0 + (v1 - v0) * smooth;
}

export function sampleRoadHeight(config: RoadProfileConfig, input: RoadSampleInput): number {
  const amplitude = config.amplitude ?? 0.03;
  const wavelength = config.wavelength ?? 1.5;
  const phase = (2 * Math.PI * input.x) / Math.max(wavelength, 1e-6);

  switch (config.type) {
    case 'flat':
      return 0;
    case 'bump': {
      const center = config.bumpCenter ?? 0;
      const width = config.bumpWidth ?? 0.6;
      const d = (input.x - center) / Math.max(width, 1e-6);
      return amplitude * Math.exp(-d * d);
    }
    case 'speedBump': {
      const center = config.bumpCenter ?? 0;
      const width = config.bumpWidth ?? 0.5;
      const local = Math.abs(input.x - center);
      if (local > width / 2) return 0;
      return amplitude * Math.sin((Math.PI * local) / (width / 2));
    }
    case 'diagonal':
      return amplitude * (input.x * 0.15 + input.y * 0.35);
    case 'washboard':
      return amplitude * Math.sin(phase + input.time * 4);
    case 'random': {
      const seed = config.seed ?? 11;
      const scale = 1 / Math.max(wavelength, 1e-6);
      return amplitude * (valueNoise1D(input.x * scale, seed) * 2 - 1);
    }
    default:
      return 0;
  }
}
