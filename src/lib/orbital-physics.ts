export type FieldMode = "orbit" | "binary";
export type Point3 = [number, number, number];
export interface Particle {
  x: number;
  y: number;
  z: number;
  vx: number;
  vy: number;
  vz: number;
  size: number;
  phase: number;
  trail: Point3[];
}
export interface GravitySource {
  x: number;
  y: number;
  z: number;
  mass: number;
  radius: number;
  kind: "ocean" | "moon";
}
export const GRAVITY = 1_200_000;
const SOFTENING = 100;
const BINARY_RADIUS = 47;
const BINARY_RATE = Math.sqrt(GRAVITY / (2 * BINARY_RADIUS) ** 3);

export function fieldSources(time: number, mode: FieldMode): GravitySource[] {
  if (mode === "orbit")
    return [{ x: 0, y: 0, z: 0, mass: 1, radius: 76, kind: "ocean" }];
  const x = Math.cos(time * BINARY_RATE) * BINARY_RADIUS;
  const y = Math.sin(time * BINARY_RATE) * BINARY_RADIUS;
  return [
    { x, y, z: 0, mass: 0.5, radius: 36, kind: "ocean" },
    { x: -x, y: -y, z: 0, mass: 0.5, radius: 28, kind: "moon" },
  ];
}

/** Repeatable circular initial conditions with a small spread of inclinations. */
export function createParticles(
  count: number,
  mode: FieldMode = "orbit",
): Particle[] {
  return Array.from({ length: count }, (_, i) => {
    const seed = Math.sin(i * 127.1 + 311.7) * 43758.5453;
    const fraction = seed - Math.floor(seed);
    const angle = i * 2.399963;
    // Keep the belt outside the binary pair's unstable inner region.
    const radius =
      mode === "binary" ? 240 + fraction * 90 : 112 + fraction * 155;
    const inclination = Math.sin(i * 17.31) * 0.055;
    const speed = Math.sqrt(GRAVITY / radius) * (0.96 + fraction * 0.055);
    return {
      x: Math.cos(angle) * radius,
      y: Math.sin(angle) * radius * Math.cos(inclination),
      z: Math.sin(angle) * radius * Math.sin(inclination),
      vx: -Math.sin(angle) * speed,
      vy: Math.cos(angle) * speed * Math.cos(inclination),
      vz: Math.cos(angle) * speed * Math.sin(inclination),
      size: 0.25 + fraction * 0.85,
      phase: angle,
      trail: [],
    };
  });
}

function acceleration(particle: Particle, sources: GravitySource[]): Point3 {
  let ax = 0,
    ay = 0,
    az = 0;
  for (const source of sources) {
    const dx = source.x - particle.x,
      dy = source.y - particle.y,
      dz = source.z - particle.z;
    const r2 = dx * dx + dy * dy + dz * dz + SOFTENING;
    const force = (GRAVITY * source.mass) / (r2 * Math.sqrt(r2));
    ax += dx * force;
    ay += dy * force;
    az += dz * force;
  }
  return [ax, ay, az];
}

/** Velocity Verlet with <= 1/120 s substeps; frame pauses never cause a large leap. */
export function stepParticles(
  particles: Particle[],
  elapsed: number,
  time: number,
  mode: FieldMode,
) {
  const duration = Math.min(Math.max(elapsed, 0), 0.1);
  if (!duration) return;
  const steps = Math.ceil(duration * 120);
  const dt = duration / steps;
  for (let step = 0; step < steps; step++) {
    const startSources = fieldSources(time + step * dt, mode);
    const endSources = fieldSources(time + (step + 1) * dt, mode);
    for (const particle of particles) {
      const a = acceleration(particle, startSources);
      particle.x += particle.vx * dt + 0.5 * a[0] * dt * dt;
      particle.y += particle.vy * dt + 0.5 * a[1] * dt * dt;
      particle.z += particle.vz * dt + 0.5 * a[2] * dt * dt;
      const b = acceleration(particle, endSources);
      particle.vx += 0.5 * (a[0] + b[0]) * dt;
      particle.vy += 0.5 * (a[1] + b[1]) * dt;
      particle.vz += 0.5 * (a[2] + b[2]) * dt;
    }
  }
  for (const particle of particles) {
    particle.trail.push([particle.x, particle.y, particle.z]);
    if (particle.trail.length > 14) particle.trail.shift();
  }
}

export function pulseParticles(particles: Particle[]) {
  for (const particle of particles) {
    const distance = Math.hypot(particle.x, particle.y, particle.z) || 1;
    particle.vx += (particle.x / distance) * 18;
    particle.vy += (particle.y / distance) * 18;
    particle.vz += (particle.z / distance) * 18;
  }
}
