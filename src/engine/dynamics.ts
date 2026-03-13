export type Corner = 'frontLeft' | 'frontRight' | 'rearLeft' | 'rearRight';

export type CornerState = {
  displacement: number;
  velocity: number;
};

export type CornerSetup = {
  springRate: number;
  damperBump: number;
  damperRebound: number;
  motionRatio: number;
};

export type AxleSetup = {
  left: CornerSetup;
  right: CornerSetup;
  antiRollBarRate: number;
  track: number;
};

export type VehicleDynamicsSetup = {
  frontAxle: AxleSetup;
  rearAxle: AxleSetup;
  cgHeight: number;
  wheelbase: number;
  frontWeightDistribution: number;
  totalMass: number;
};

export type CornerForces = Record<Corner, number>;

const G = 9.80665;

function springForce(setup: CornerSetup, state: CornerState): number {
  const wheelRate = setup.springRate * setup.motionRatio * setup.motionRatio;
  return -wheelRate * state.displacement;
}

function damperForce(setup: CornerSetup, state: CornerState): number {
  const c = state.velocity >= 0 ? setup.damperBump : setup.damperRebound;
  return -c * state.velocity;
}

function antiRollForce(rate: number, leftDisp: number, rightDisp: number): { left: number; right: number } {
  const delta = leftDisp - rightDisp;
  return {
    left: -rate * delta,
    right: rate * delta,
  };
}

function lateralLoadTransfer(massOnAxle: number, lateralAccel: number, cgHeight: number, track: number): number {
  if (track === 0) return 0;
  return (massOnAxle * lateralAccel * cgHeight) / track;
}

export function calculateCornerForces(
  setup: VehicleDynamicsSetup,
  states: Record<Corner, CornerState>,
  inputs: {
    lateralAccel: number;
    longitudinalAccel: number;
    aeroDownforceFront?: number;
    aeroDownforceRear?: number;
  },
): CornerForces {
  const frontMass = setup.totalMass * setup.frontWeightDistribution;
  const rearMass = setup.totalMass - frontMass;

  const staticFront = (frontMass * G) / 2;
  const staticRear = (rearMass * G) / 2;

  const frontLatTransfer = lateralLoadTransfer(
    frontMass,
    inputs.lateralAccel,
    setup.cgHeight,
    setup.frontAxle.track,
  );
  const rearLatTransfer = lateralLoadTransfer(
    rearMass,
    inputs.lateralAccel,
    setup.cgHeight,
    setup.rearAxle.track,
  );

  const wheelbase = Math.max(setup.wheelbase, 1e-6);
  const longTransfer = (setup.totalMass * inputs.longitudinalAccel * setup.cgHeight) / wheelbase;

  const frontArb = antiRollForce(
    setup.frontAxle.antiRollBarRate,
    states.frontLeft.displacement,
    states.frontRight.displacement,
  );
  const rearArb = antiRollForce(
    setup.rearAxle.antiRollBarRate,
    states.rearLeft.displacement,
    states.rearRight.displacement,
  );

  const aeroFrontEach = (inputs.aeroDownforceFront ?? 0) / 2;
  const aeroRearEach = (inputs.aeroDownforceRear ?? 0) / 2;

  return {
    frontLeft:
      staticFront +
      springForce(setup.frontAxle.left, states.frontLeft) +
      damperForce(setup.frontAxle.left, states.frontLeft) +
      frontArb.left +
      longTransfer / 2 -
      frontLatTransfer / 2 +
      aeroFrontEach,
    frontRight:
      staticFront +
      springForce(setup.frontAxle.right, states.frontRight) +
      damperForce(setup.frontAxle.right, states.frontRight) +
      frontArb.right +
      longTransfer / 2 +
      frontLatTransfer / 2 +
      aeroFrontEach,
    rearLeft:
      staticRear +
      springForce(setup.rearAxle.left, states.rearLeft) +
      damperForce(setup.rearAxle.left, states.rearLeft) +
      rearArb.left -
      longTransfer / 2 -
      rearLatTransfer / 2 +
      aeroRearEach,
    rearRight:
      staticRear +
      springForce(setup.rearAxle.right, states.rearRight) +
      damperForce(setup.rearAxle.right, states.rearRight) +
      rearArb.right -
      longTransfer / 2 +
      rearLatTransfer / 2 +
      aeroRearEach,
  };
}
