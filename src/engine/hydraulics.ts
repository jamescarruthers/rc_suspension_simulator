export type FlowRegime = 'laminar' | 'transitional' | 'turbulent';

export type HydraulicCylinder = {
  boreDiameter: number;
  rodDiameter?: number;
  dischargeCoefficient?: number;
};

export type HydraulicFluid = {
  density: number;
  dynamicViscosity: number;
  bulkModulus: number;
};

export function circleArea(diameter: number): number {
  const r = diameter / 2;
  return Math.PI * r * r;
}

export function effectiveCylinderArea(cylinder: HydraulicCylinder, side: 'cap' | 'rod' = 'cap'): number {
  const capArea = circleArea(cylinder.boreDiameter);
  if (side === 'cap') return capArea;
  return Math.max(capArea - circleArea(cylinder.rodDiameter ?? 0), 0);
}

export function reynoldsNumber(params: {
  velocity: number;
  diameter: number;
  fluid: HydraulicFluid;
}): number {
  const { velocity, diameter, fluid } = params;
  if (fluid.dynamicViscosity <= 0) return 0;
  return (fluid.density * Math.abs(velocity) * diameter) / fluid.dynamicViscosity;
}

export function classifyFlowRegime(re: number): FlowRegime {
  if (re < 2300) return 'laminar';
  if (re < 4000) return 'transitional';
  return 'turbulent';
}

export function pressureDropFromOrifice(params: {
  flowRate: number;
  orificeArea: number;
  fluid: HydraulicFluid;
  dischargeCoefficient?: number;
}): number {
  const cd = params.dischargeCoefficient ?? 0.67;
  if (params.orificeArea <= 0 || cd <= 0) return 0;
  const velocity = Math.abs(params.flowRate) / params.orificeArea;
  return (params.fluid.density * velocity * velocity) / (2 * cd * cd);
}

export function hydraulicForce(pressure: number, area: number): number {
  return pressure * area;
}

export function chamberPressure(params: {
  flowRate: number;
  volume: number;
  fluid: HydraulicFluid;
  basePressure?: number;
  dt: number;
}): number {
  const base = params.basePressure ?? 101325;
  if (params.volume <= 0 || params.dt <= 0) {
    return base;
  }
  const dVolume = params.flowRate * params.dt;
  const compression = -dVolume / params.volume;
  return Math.max(base + params.fluid.bulkModulus * compression, 0);
}
