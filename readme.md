# RC Suspension Design Simulator — Unified Implementation Task

Build a single-page React + TypeScript + Vite web application that allows engineers/hobbyists to design and simulate 1:8 and 1:10 RC double-wishbone suspension systems across all four corners, including conventional spring/damper behavior, anti-roll bars, optional hydraulically linked suspension, real-time 3D wireframe visualization, and live telemetry graphs.

## Goal
Deliver one cohesive simulator with:
- Independent front/rear axle geometry, shocks, and anti-roll bars.
- Physics-informed static and dynamic responses to roll, pitch, and road inputs.
- A dark industrial HUD UI with live controls, force overlays, and charting.
- Presets for 1:8 buggy, 1:10 buggy, and 1:10 touring.

## Tech + Architecture
- React (hooks), Vite, TypeScript
- R3F (`@react-three/fiber`) + Drei for 3D
- Zustand for state
- Recharts for live plots
- Tailwind for UI styling

Implement code organization as:
- `src/types` for domain interfaces (`AxleGeometry`, `AxleShock`, `AxleSwayBar`, `HydraulicConfig`, etc.)
- `src/store` for `useVehicleStore` and `useSimulationStore`
- `src/components/layout`, `params`, `viewport`, `simulation`, `graphs`
- `src/engine` for kinematics, dynamics, hydraulics, integration, and road generators
- `src/presets` for three baseline setups

## UI + Visual Requirements
- Dark background `#0A0E14`
- Accent cyan `#00FFE0`; force/warning orange `#FF6B35`; grid `#1E2D3D`
- Wireframe/CAD-like rendering only (lines, joints, arrows; no solid body meshes)
- Layout: Header + Left params sidebar + Center 3D viewport + Right sim sidebar + Bottom collapsible graphs
- Numeric controls/readouts in mono font; labels/headings in clean sans

## Functional Scope

### 1) Parameter Panels (Left Sidebar)
Implement collapsible sections with real-time updates:
1. Vehicle params (scale, wheelbase, weight, F/R distribution, CG height, ride height)
2. Front suspension geometry (full front fields)
3. Rear suspension geometry (rear-specific fields; advanced KPI/caster hidden by default)
4. Front shocks
5. Rear shocks
6. Front anti-roll bar
7. Rear anti-roll bar
8. Hydraulic linked suspension settings

Requirements:
- Front/rear geometry sections stacked simultaneously (not tabs), independently collapsible.
- Same pattern for shocks.
- Copy buttons between front/rear sections (both directions).
- `trackWidth` belongs to each axle geometry, not top-level vehicle.

### 2) 3D Scene (Center)
Render:
- Ground grid plane (10 mm spacing)
- Chassis wireframe (trapezoid plan when front/rear track differ)
- Wheels (camber/toe oriented circles + contact markers)
- Wishbones (triangular lower arms using pivot spread)
- Upper links
- Hub/upright with dashed kingpin axis
- Shock representation (body + spring zig-zag)
- Anti-roll bars (U-shape + drop links)
- Hydraulic lines with pressure color mapping + flow dots (when enabled)
- Front steering linkage

Add:
- Orbit/pan/zoom controls
- Axis indicator and scale bar
- Camera preset buttons (front/side/top/iso)
- Screenshot export PNG

### 3) Forces Overlay (Toggleable)
Provide toggles + scale slider (0.5×–5×) for:
- Weight, per-corner load, ground reaction
- Spring and damping forces
- Sway bar force
- Hydraulic pressure force
- Tyre lateral force
- Tyre load transfer delta

### 4) Physics & Simulation
Implement fixed-step simulation loop (1 ms) with accumulator + semi-implicit Euler.

Core behaviors:
- Static equilibrium at rest (corner loads, spring compression via motion ratio)
- Kinematic update from wheel displacements
- Instant center and roll center per axle
- Spring/damper/sway bar force resolution
- Optional hydraulic coupling model with link topologies (lateral/diagonal/full)
- Combined roll + pitch + road inputs with superposition

### 5) Simulation Inputs (Right Sidebar)
- Roll slider + oscillation (freq/amplitude)
- Pitch slider + oscillation
- Road surface presets (flat/single bump/speed bump/diagonal twist/washboard/random)
- Play/Pause/Reset + sim speed controls
- Preset selector (1:8 buggy default, 1:10 buggy, 1:10 touring, custom)

### 6) Live Graphs (Bottom Panel)
Implement channel-selectable Recharts telemetry with time windows (2/5/10 s):
- Wheel displacement, chassis displacement/roll/pitch
- Spring/damper force, shock velocity
- Per-corner load + axle load transfer
- Camber + roll center height
- Hydraulic pressure/flow/accumulator displacement when enabled

Features:
- Collapsible/resizable panel
- Auto-scroll time axis
- Optional manual y-range vs autoscale
- Distinct line styles/colors by corner

### 7) Presets
Provide complete defaults for:
- 1:8 Off-Road Buggy (default)
- 1:10 4WD Buggy
- 1:10 Touring Car

Each preset should include full vehicle + front/rear geometry + front/rear shocks + front/rear sway bars.

## Delivery Plan (Single Combined Workstream)
1. Scaffold project + theme + base layout
2. Add domain types + Zustand stores + presets
3. Build left/right/bottom control UI + reusable axle components
4. Implement static 3D geometry rendering
5. Add kinematics and static equilibrium
6. Add dynamic integration + roll/pitch/road input execution
7. Add anti-roll + hydraulic modeling
8. Add force overlays + graph channels
9. Optimize performance (memoization, chart throttling, instancing)
10. Final QA pass + screenshot/export + polish

## Acceptance Criteria
- All major controls update model and graphs in real time.
- Front and rear axles are independently configurable and copyable.
- 3D wireframe accurately reflects geometry and dynamic state.
- Dynamics loop is stable and runs interactively near 60 fps target.
- Presets load correctly and provide meaningful baseline behavior.
- Hydraulic mode visibly and numerically changes suspension coupling behavior.
