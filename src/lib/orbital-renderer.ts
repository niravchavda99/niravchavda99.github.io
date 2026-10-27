import {
  fieldSources,
  GRAVITY,
  type FieldMode,
  type Particle,
  type Point3,
} from "./orbital-physics";
import { PlanetSurface } from "./planet-surface";

export interface Camera {
  yaw: number;
  pitch: number;
}
export interface SceneFrame {
  particles: Particle[];
  time: number;
  mode: FieldMode;
  ripple: number;
  camera: Camera;
}
interface Projection {
  x: number;
  y: number;
  scale: number;
  depth: number;
}
interface Satellite {
  point: Projection;
  radius: number;
  index: number;
}
export const DEFAULT_CAMERA: Camera = { yaw: -0.28, pitch: 0.43 };

/** Projection and painting are independent of React and simulation scheduling. */
export class OrbitalRenderer {
  readonly context: CanvasRenderingContext2D;
  width = 1;
  height = 1;
  private ocean: PlanetSurface;
  private moon: PlanetSurface;
  private camera = { ...DEFAULT_CAMERA };
  private background = document.createElement("canvas");
  private stars = Array.from({ length: 170 }, (_, i) => ({
    x: ((i * 73.137) % 1000) / 1000,
    y: ((i * 127.319) % 1000) / 1000,
    size: 0.35 + (i % 11 === 0 ? 1.1 : (i % 5) * 0.14),
    alpha: 0.18 + (i % 7) * 0.08,
  }));

  constructor(
    private canvas: HTMLCanvasElement,
    private markers: HTMLAnchorElement[],
  ) {
    this.context = canvas.getContext("2d", { alpha: false })!;
    const mobile = window.innerWidth < 760;
    this.ocean = new PlanetSurface(mobile ? 160 : 240, "ocean");
    this.moon = new PlanetSurface(mobile ? 80 : 120, "moon");
  }

  resize() {
    const rect = this.canvas.getBoundingClientRect();
    this.width = Math.max(1, rect.width);
    this.height = Math.max(1, rect.height);
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    this.canvas.width = this.width * dpr;
    this.canvas.height = this.height * dpr;
    this.context.setTransform(dpr, 0, 0, dpr, 0, 0);
    this.paintBackground();
  }

  private project(x: number, y: number, z = 0): Projection {
    const yaw = this.camera.yaw,
      pitch = this.camera.pitch;
    const a = x * Math.cos(yaw) - y * Math.sin(yaw);
    const b = x * Math.sin(yaw) + y * Math.cos(yaw);
    const depth = b * Math.cos(pitch) + z * Math.sin(pitch);
    const perspective = 800 / Math.max(250, 800 + depth);
    const mobile = this.width < 760;
    const scale = mobile
      ? Math.min(this.width / 620, this.height / 470)
      : Math.min(this.width / 1090, this.height / 650);
    return {
      x: this.width * (mobile ? 0.5 : 0.72) + a * perspective * scale,
      y:
        this.height * (mobile ? 0.43 : 0.46) +
        (b * Math.sin(pitch) - z * Math.cos(pitch)) * perspective * scale,
      scale: scale * perspective,
      depth,
    };
  }

  private paintBackground() {
    this.background.width = this.width;
    this.background.height = this.height;
    const ctx = this.background.getContext("2d")!;
    ctx.fillStyle = "#070d18";
    ctx.fillRect(0, 0, this.width, this.height);
    const center = this.project(0, 0);
    const glow = ctx.createRadialGradient(
      center.x,
      center.y,
      0,
      center.x,
      center.y,
      this.width * 0.55,
    );
    glow.addColorStop(0, "#1b35652b");
    glow.addColorStop(0.5, "#16274818");
    glow.addColorStop(1, "#070d1800");
    ctx.fillStyle = glow;
    ctx.fillRect(0, 0, this.width, this.height);
    // Diffuse, overlapping clouds form a quiet distant nebula, cached on resize.
    for (let i = 0; i < 7; i++) {
      const x = this.width * (0.48 + i * 0.09),
        y = this.height * (0.25 + Math.sin(i * 0.7) * 0.11),
        radius = this.width * 0.15;
      const cloud = ctx.createRadialGradient(x, y, 0, x, y, radius);
      cloud.addColorStop(0, i % 2 ? "#3e477c0b" : "#3e688b0b");
      cloud.addColorStop(1, "#070d1800");
      ctx.fillStyle = cloud;
      ctx.fillRect(x - radius, y - radius, radius * 2, radius * 2);
    }
  }

  draw(frame: SceneFrame) {
    this.camera = frame.camera;
    const ctx = this.context,
      { time, mode, particles } = frame;
    ctx.drawImage(this.background, 0, 0, this.width, this.height);
    for (let i = 0; i < this.stars.length; i++) {
      const star = this.stars[i];
      const x =
        (star.x * this.width + this.camera.yaw * star.size * 15 + this.width) %
        this.width;
      const y =
        star.y * this.height +
        (this.camera.pitch - DEFAULT_CAMERA.pitch) * star.size * 12;
      ctx.fillStyle = `rgba(${i % 9 ? "169,195,233" : "221,215,201"},${star.alpha})`;
      ctx.beginPath();
      ctx.arc(x, y, star.size, 0, Math.PI * 2);
      ctx.fill();
      if (star.size > 1.2) {
        ctx.strokeStyle = "#bdd5f52b";
        ctx.lineWidth = 0.6;
        ctx.beginPath();
        ctx.moveTo(x - 4, y);
        ctx.lineTo(x + 4, y);
        ctx.moveTo(x, y - 4);
        ctx.lineTo(x, y + 4);
        ctx.stroke();
      }
    }

    const sources = fieldSources(time, mode);
    const bodies = sources.map((source) => ({
      source,
      point: this.project(source.x, source.y, source.z),
    }));
    const satellites: Satellite[] = [0, 1, 2].map((index) => {
      const radius = 177 + index * 43;
      const angle = time * Math.sqrt(GRAVITY / radius ** 3) + index * 2.1;
      return {
        point: this.project(
          Math.cos(angle) * radius,
          Math.sin(angle) * radius,
          Math.sin(angle + index) * 16,
        ),
        radius: 2.8 + index * 1.2,
        index,
      };
    });
    type RenderItem = { depth: number; paint: () => void };
    const objects: RenderItem[] = [];
    for (const body of bodies)
      objects.push({
        depth: body.point.depth,
        paint: () => {
          const surface = body.source.kind === "ocean" ? this.ocean : this.moon;
          surface.draw(
            ctx,
            body.point.x,
            body.point.y,
            body.source.radius * body.point.scale,
            time,
            this.camera.yaw,
          );
        },
      });

    for (const particle of particles) {
      const p = this.project(particle.x, particle.y, particle.z);
      if (
        p.x < -30 ||
        p.x > this.width + 30 ||
        p.y < -30 ||
        p.y > this.height + 30
      )
        continue;
      // Shadow the debris where a body blocks the fixed distant light source.
      let shadow = 1;
      for (const source of sources) {
        const dx = particle.x - source.x,
          dy = particle.y - source.y,
          dz = particle.z - source.z;
        const lightProjection = dx * -0.68 + dy * -0.43 + dz * 0.59;
        if (
          lightProjection < 0 &&
          dx * dx + dy * dy + dz * dz - lightProjection * lightProjection <
            source.radius ** 2
        )
          shadow = 0.16;
      }
      objects.push({
        depth: p.depth,
        paint: () => {
          const near = Math.max(0.3, Math.min(1, p.scale));
          const bright = particle.size > 0.92;
          if (particle.trail.length > 1) {
            ctx.beginPath();
            particle.trail.forEach((point: Point3, index: number) => {
              const q = this.project(...point);
              if (!index) ctx.moveTo(q.x, q.y);
              else ctx.lineTo(q.x, q.y);
            });
            ctx.strokeStyle = `rgba(117,156,205,${(bright ? 0.22 : 0.07) * near * shadow})`;
            ctx.lineWidth = Math.max(0.35, particle.size * p.scale * 0.45);
            ctx.stroke();
          }
          ctx.fillStyle = `rgba(${bright ? "206,222,241" : "113,151,200"},${(0.35 + particle.size * 0.45) * shadow})`;
          ctx.beginPath();
          ctx.arc(
            p.x,
            p.y,
            Math.max(0.4, particle.size * p.scale * 0.85),
            0,
            Math.PI * 2,
          );
          ctx.fill();
        },
      });
    }
    for (const satellite of satellites)
      objects.push({
        depth: satellite.point.depth,
        paint: () => this.drawSatellite(satellite),
      });
    objects
      .sort((a, b) => b.depth - a.depth)
      .forEach((object) => object.paint());

    satellites.forEach(({ point, index }) => {
      const marker = this.markers[index];
      if (!marker) return;
      const mobile = this.width < 760;
      const x = Math.max(15, Math.min(this.width - 85, point.x + 12));
      const y = Math.max(
        mobile ? 95 : 130,
        Math.min(mobile ? 263 : this.height - 250, point.y - 26),
      );
      marker.style.transform = `translate(${x}px, ${y}px)`;
    });
    if (frame.ripple > 0) this.drawPulse(frame.ripple);
  }

  private drawSatellite({ point: p, radius }: Satellite) {
    const ctx = this.context,
      r = radius * p.scale;
    const surface = ctx.createRadialGradient(
      p.x - r * 0.45,
      p.y - r * 0.5,
      0,
      p.x + r * 0.3,
      p.y + r * 0.2,
      r * 1.4,
    );
    surface.addColorStop(0, "#d5dce7");
    surface.addColorStop(0.55, "#66758e");
    surface.addColorStop(1, "#111b2c");
    ctx.fillStyle = surface;
    ctx.beginPath();
    ctx.arc(p.x, p.y, r, 0, Math.PI * 2);
    ctx.fill();
  }

  private drawPulse(strength: number) {
    const ctx = this.context,
      radius = (1 - strength) * 360;
    for (const offset of [0, -6]) {
      if (radius + offset <= 0) continue;
      ctx.beginPath();
      for (let i = 0; i <= 100; i++) {
        const angle = (i / 100) * Math.PI * 2,
          p = this.project(
            Math.cos(angle) * (radius + offset),
            Math.sin(angle) * (radius + offset),
          );
        if (!i) ctx.moveTo(p.x, p.y);
        else ctx.lineTo(p.x, p.y);
      }
      ctx.strokeStyle = `rgba(165,207,255,${strength * (offset ? 0.12 : 0.5)})`;
      ctx.lineWidth = offset ? 4 : 1;
      ctx.stroke();
    }
  }
}
