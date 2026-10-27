import { expect, test } from "@playwright/test";
import {
  createParticles,
  pulseParticles,
  stepParticles,
} from "../src/lib/orbital-physics";

test("the orbital field stays finite through a sustained simulation", () => {
  for (const mode of ["orbit", "binary"] as const) {
    const particles = createParticles(40);
    for (let step = 0; step < 1800; step++)
      stepParticles(particles, 1 / 60, step / 60, mode);
    for (const particle of particles) {
      expect(
        [particle.x, particle.y, particle.vx, particle.vy].every(
          Number.isFinite,
        ),
      ).toBe(true);
      expect(Math.hypot(particle.x, particle.y)).toBeLessThan(2000);
      expect(particle.trail.length).toBeLessThanOrEqual(18);
    }
  }
});

test("a pulse adds an outward impulse without changing initial positions", () => {
  const particles = createParticles(12);
  const before = particles.map((p) => ({ ...p }));
  pulseParticles(particles);
  particles.forEach((particle, i) => {
    expect(particle.x).toBe(before[i].x);
    expect(particle.y).toBe(before[i].y);
    const radialChange =
      (particle.vx - before[i].vx) * particle.x +
      (particle.vy - before[i].vy) * particle.y;
    expect(radialChange).toBeGreaterThan(0);
  });
});
