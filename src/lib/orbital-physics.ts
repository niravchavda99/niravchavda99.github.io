export type FieldMode = "orbit" | "binary";
export interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  phase: number;
  trail: [number, number][];
}
const GRAVITY = 1_200_000;

/** Seeded initial conditions keep the scene reproducible across devices. */
export function createParticles(count: number): Particle[] {
  return Array.from({ length: count }, (_, i) => {
    const seed = Math.sin(i * 127.1 + 311.7) * 43758.5453;
    const fraction = seed - Math.floor(seed);
    const angle = i * 2.399963;
    const radius = 105 + fraction * 150;
    const speed = Math.sqrt(GRAVITY / radius) * (0.86 + fraction * 0.19);
    return {
      x: Math.cos(angle) * radius,
      y: Math.sin(angle) * radius,
      vx: -Math.sin(angle) * speed,
      vy: Math.cos(angle) * speed,
      size: 0.5 + fraction * 1.7,
      phase: angle,
      trail: [],
    };
  });
}

/** Softened Newtonian gravity, integrated in bounded substeps for stability. */
export function stepParticles(
  particles: Particle[],
  dt: number,
  time: number,
  mode: FieldMode,
) {
  const sources =
    mode === "binary"
      ? [
          {
            x: Math.cos(time * 0.35) * 47,
            y: Math.sin(time * 0.35) * 47,
            mass: 0.5,
          },
          {
            x: -Math.cos(time * 0.35) * 47,
            y: -Math.sin(time * 0.35) * 47,
            mass: 0.5,
          },
        ]
      : [{ x: 0, y: 0, mass: 1 }];
  for (const particle of particles) {
    for (const source of sources) {
      const dx = source.x - particle.x,
        dy = source.y - particle.y;
      const distanceSquared = dx * dx + dy * dy + 100;
      const force =
        (GRAVITY * source.mass) /
        (distanceSquared * Math.sqrt(distanceSquared));
      particle.vx += dx * force * dt;
      particle.vy += dy * force * dt;
    }
    particle.x += particle.vx * dt;
    particle.y += particle.vy * dt;
    particle.trail.push([particle.x, particle.y]);
    if (particle.trail.length > 18) particle.trail.shift();
  }
}

export function pulseParticles(particles: Particle[]) {
  for (const particle of particles) {
    const distance = Math.hypot(particle.x, particle.y) || 1;
    particle.vx += (particle.x / distance) * 23;
    particle.vy += (particle.y / distance) * 23;
  }
}
