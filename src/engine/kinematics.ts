export type Vec3 = { x: number; y: number; z: number };

export type WishboneGeometryInput = {
  chassisFront: Vec3;
  chassisRear: Vec3;
  uprightPoint: Vec3;
};

export type WishboneGeometry = {
  pivotMidpoint: Vec3;
  span: number;
  armLength: number;
  normal: Vec3;
};

export type InstantCentre = {
  left?: Vec3;
  right?: Vec3;
};

export type RollCentre = {
  front: Vec3;
  rear: Vec3;
  heightAtCgX: number;
};

export type AxleGeometry = {
  upperLeft: WishboneGeometryInput;
  lowerLeft: WishboneGeometryInput;
  upperRight: WishboneGeometryInput;
  lowerRight: WishboneGeometryInput;
  contactPatchLeft: Vec3;
  contactPatchRight: Vec3;
};

const EPSILON = 1e-9;

export const add = (a: Vec3, b: Vec3): Vec3 => ({
  x: a.x + b.x,
  y: a.y + b.y,
  z: a.z + b.z,
});

export const subtract = (a: Vec3, b: Vec3): Vec3 => ({
  x: a.x - b.x,
  y: a.y - b.y,
  z: a.z - b.z,
});

export const scale = (v: Vec3, s: number): Vec3 => ({
  x: v.x * s,
  y: v.y * s,
  z: v.z * s,
});

export const dot = (a: Vec3, b: Vec3): number => a.x * b.x + a.y * b.y + a.z * b.z;

export const cross = (a: Vec3, b: Vec3): Vec3 => ({
  x: a.y * b.z - a.z * b.y,
  y: a.z * b.x - a.x * b.z,
  z: a.x * b.y - a.y * b.x,
});

export const magnitude = (v: Vec3): number => Math.sqrt(dot(v, v));

export const normalize = (v: Vec3): Vec3 => {
  const len = magnitude(v);
  if (len < EPSILON) {
    return { x: 0, y: 0, z: 0 };
  }
  return scale(v, 1 / len);
};

export function midpoint(a: Vec3, b: Vec3): Vec3 {
  return scale(add(a, b), 0.5);
}

export function calculateWishboneGeometry(input: WishboneGeometryInput): WishboneGeometry {
  const pivotVector = subtract(input.chassisFront, input.chassisRear);
  const pivotMidpoint = midpoint(input.chassisFront, input.chassisRear);
  const span = magnitude(pivotVector);
  const armVector = subtract(input.uprightPoint, pivotMidpoint);
  const armLength = magnitude(armVector);
  const normal = normalize(cross(pivotVector, armVector));

  return {
    pivotMidpoint,
    span,
    armLength,
    normal,
  };
}

type Line2D = {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
};

function lineIntersection2D(a: Line2D, b: Line2D): Vec3 | undefined {
  const denominator = (a.x1 - a.x2) * (b.y1 - b.y2) - (a.y1 - a.y2) * (b.x1 - b.x2);
  if (Math.abs(denominator) < EPSILON) {
    return undefined;
  }

  const detA = a.x1 * a.y2 - a.y1 * a.x2;
  const detB = b.x1 * b.y2 - b.y1 * b.x2;
  const x = (detA * (b.x1 - b.x2) - (a.x1 - a.x2) * detB) / denominator;
  const y = (detA * (b.y1 - b.y2) - (a.y1 - a.y2) * detB) / denominator;
  return { x, y, z: 0 };
}

function sideInstantCentre(upper: WishboneGeometryInput, lower: WishboneGeometryInput): Vec3 | undefined {
  // Front-view instant centre: intersect projected wishbone links in Y-Z plane.
  const upperLine: Line2D = {
    x1: upper.chassisFront.y,
    y1: upper.chassisFront.z,
    x2: upper.uprightPoint.y,
    y2: upper.uprightPoint.z,
  };
  const lowerLine: Line2D = {
    x1: lower.chassisFront.y,
    y1: lower.chassisFront.z,
    x2: lower.uprightPoint.y,
    y2: lower.uprightPoint.z,
  };
  return lineIntersection2D(upperLine, lowerLine);
}

export function calculateInstantCentres(axle: AxleGeometry): InstantCentre {
  const left = sideInstantCentre(axle.upperLeft, axle.lowerLeft);
  const right = sideInstantCentre(axle.upperRight, axle.lowerRight);
  return { left, right };
}

function rollCentreFromInstantCentre(
  instant: Vec3 | undefined,
  leftContactPatch: Vec3,
  rightContactPatch: Vec3,
): Vec3 {
  if (!instant) {
    return { x: 0, y: 0, z: 0 };
  }

  // Line from contact patch midpoint to instant centre intersects centerline (y=0).
  const patchMid = midpoint(leftContactPatch, rightContactPatch);
  const dy = instant.x - patchMid.y;
  if (Math.abs(dy) < EPSILON) {
    return { x: patchMid.x, y: 0, z: patchMid.z };
  }
  const t = (0 - patchMid.y) / (instant.x - patchMid.y);
  return {
    x: patchMid.x,
    y: 0,
    z: patchMid.z + (instant.y - patchMid.z) * t,
  };
}

export function calculateRollCentres(params: {
  frontAxle: AxleGeometry;
  rearAxle: AxleGeometry;
  cgX: number;
  wheelbase: number;
}): RollCentre {
  const frontIc = calculateInstantCentres(params.frontAxle);
  const rearIc = calculateInstantCentres(params.rearAxle);

  const front = rollCentreFromInstantCentre(
    frontIc.left ?? frontIc.right,
    params.frontAxle.contactPatchLeft,
    params.frontAxle.contactPatchRight,
  );
  const rear = rollCentreFromInstantCentre(
    rearIc.left ?? rearIc.right,
    params.rearAxle.contactPatchLeft,
    params.rearAxle.contactPatchRight,
  );

  const wheelbaseSafe = Math.max(Math.abs(params.wheelbase), EPSILON);
  const ratio = Math.min(Math.max(params.cgX / wheelbaseSafe, 0), 1);
  const heightAtCgX = front.z + (rear.z - front.z) * ratio;

  return { front, rear, heightAtCgX };
}
