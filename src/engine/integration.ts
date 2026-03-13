export type IntegratorState = {
  position: number;
  velocity: number;
};

export type DerivativeFunction = (state: IntegratorState, time: number) => { acceleration: number };

export function semiImplicitEuler(
  state: IntegratorState,
  derivative: DerivativeFunction,
  dt: number,
  time: number,
): IntegratorState {
  const { acceleration } = derivative(state, time);
  const velocity = state.velocity + acceleration * dt;
  const position = state.position + velocity * dt;
  return { position, velocity };
}

export class FixedTimestepAccumulator {
  private readonly fixedDt: number;
  private readonly maxSubSteps: number;
  private accumulator = 0;
  private simulationTime = 0;

  constructor(fixedDt = 0.001, maxSubSteps = 20) {
    this.fixedDt = fixedDt;
    this.maxSubSteps = maxSubSteps;
  }

  public reset(): void {
    this.accumulator = 0;
    this.simulationTime = 0;
  }

  public step(frameDt: number, callback: (dt: number, simulationTime: number) => void): number {
    this.accumulator += Math.max(frameDt, 0);
    let steps = 0;

    while (this.accumulator >= this.fixedDt && steps < this.maxSubSteps) {
      callback(this.fixedDt, this.simulationTime);
      this.accumulator -= this.fixedDt;
      this.simulationTime += this.fixedDt;
      steps += 1;
    }

    if (steps === this.maxSubSteps && this.accumulator >= this.fixedDt) {
      // Drop excess accumulated time to avoid spiral-of-death when overloaded.
      this.accumulator = 0;
    }

    return steps;
  }

  public get alpha(): number {
    return this.fixedDt > 0 ? this.accumulator / this.fixedDt : 0;
  }

  public get time(): number {
    return this.simulationTime;
  }
}
