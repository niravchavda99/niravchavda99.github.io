"use client";
import { useEffect, useRef } from "react";
import {
  createParticles,
  pulseParticles,
  stepParticles,
  type FieldMode,
} from "@/src/lib/orbital-physics";

export interface WorldControls {
  mode: FieldMode;
  pulse: number;
}

/** Original procedural world. No videos, textures, WebGL engine, or remote assets. */
export function OrbitalWorld({ mode, pulse }: WorldControls) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const controls = useRef({ mode, pulse });
  useEffect(() => {
    controls.current = { mode, pulse };
    canvasRef.current?.dispatchEvent(new Event("world-controls"));
  }, [mode, pulse]);
  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d", { alpha: false });
    if (!canvas || !context) return;
    const ctx = context;
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    let width = 1,
      height = 1,
      frame = 0,
      previous = 0,
      time = 0,
      lastDraw = 0;
    let active = true,
      paused = false,
      field = controls.current.mode,
      pulseId = controls.current.pulse;
    let particles = createParticles(window.innerWidth < 760 ? 140 : 260);
    let ripple = 0;
    const pointer = { x: 0, y: 0, targetX: 0, targetY: 0 };
    const stars = Array.from({ length: 110 }, (_, i) => ({
      x: ((i * 73.137) % 1000) / 1000,
      y: ((i * 127.319) % 1000) / 1000,
      r: 0.4 + (i % 4) * 0.25,
    }));

    function project(x: number, y: number, elevation = 0) {
      const angle = -0.32 + pointer.x * 0.15;
      const a = x * Math.cos(angle) - y * Math.sin(angle);
      const b = x * Math.sin(angle) + y * Math.cos(angle);
      const depth = b * 0.78;
      const perspective = 700 / (700 + depth);
      const scale =
        width < 760
          ? Math.min(width / 610, height / 470)
          : Math.min(width / 1050, height / 610);
      return {
        x: width * (width < 760 ? 0.5 : 0.72) + a * perspective * scale,
        y:
          height * (width < 760 ? 0.43 : 0.46) +
          (b * 0.43 - elevation) * perspective * scale +
          pointer.y * 12,
        scale: scale * perspective,
        depth,
      };
    }

    function sphere(x: number, y: number, radius: number, blue: boolean) {
      const p = project(x, y);
      const r = radius * p.scale;
      const glow = ctx.createRadialGradient(
        p.x,
        p.y,
        r * 0.7,
        p.x,
        p.y,
        r * 2.3,
      );
      glow.addColorStop(0, blue ? "#558cff40" : "#b7dbff30");
      glow.addColorStop(1, "#07101d00");
      ctx.fillStyle = glow;
      ctx.beginPath();
      ctx.arc(p.x, p.y, r * 2.3, 0, Math.PI * 2);
      ctx.fill();
      const body = ctx.createRadialGradient(
        p.x - r * 0.45,
        p.y - r * 0.6,
        0,
        p.x + r * 0.2,
        p.y + r * 0.2,
        r * 1.3,
      );
      body.addColorStop(0, blue ? "#689af1" : "#bdcee5");
      body.addColorStop(0.3, blue ? "#234476" : "#4a607e");
      body.addColorStop(0.75, "#0c192b");
      body.addColorStop(1, "#020711");
      ctx.fillStyle = body;
      ctx.beginPath();
      ctx.arc(p.x, p.y, r, 0, Math.PI * 2);
      ctx.fill();
      ctx.save();
      ctx.beginPath();
      ctx.arc(p.x, p.y, r - 0.5, 0, Math.PI * 2);
      ctx.clip();
      for (let j = -7; j <= 7; j++) {
        ctx.beginPath();
        for (let k = 0; k <= 70; k++) {
          const t = (k / 70) * Math.PI * 2;
          const px = Math.cos(t) * r * Math.sqrt(1 - (j / 8) ** 2);
          const py =
            (j / 8) * r + Math.sin(t + time * 0.12 + j * 0.2) * r * 0.13;
          if (k === 0) ctx.moveTo(p.x + px, p.y + py);
          else ctx.lineTo(p.x + px, p.y + py);
        }
        ctx.strokeStyle = "#a3c9ff1c";
        ctx.lineWidth = 0.7;
        ctx.stroke();
      }
      ctx.restore();
      ctx.strokeStyle = "#bedcff60";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(p.x, p.y, r, 0, Math.PI * 2);
      ctx.stroke();
    }

    function draw() {
      ctx.fillStyle = "#070d18";
      ctx.fillRect(0, 0, width, height);
      const center = project(0, 0);
      const atmosphere = ctx.createRadialGradient(
        center.x,
        center.y,
        0,
        center.x,
        center.y,
        width * 0.55,
      );
      atmosphere.addColorStop(0, "#183a683b");
      atmosphere.addColorStop(0.5, "#12264524");
      atmosphere.addColorStop(1, "#070d1800");
      ctx.fillStyle = atmosphere;
      ctx.fillRect(0, 0, width, height);
      for (let i = 0; i < stars.length; i++) {
        const star = stars[i];
        ctx.fillStyle = `rgba(191,215,255,${0.18 + (1 + Math.sin(time * 0.5 + i)) * 0.18})`;
        ctx.beginPath();
        ctx.arc(
          star.x * width + pointer.x * star.r * 4,
          star.y * height,
          star.r,
          0,
          Math.PI * 2,
        );
        ctx.fill();
      }
      // Perspective orbital lanes are geometry, not a background image.
      for (const radius of [112, 163, 220, 275]) {
        ctx.beginPath();
        for (let j = 0; j <= 100; j++) {
          const a = (j / 100) * Math.PI * 2;
          const p = project(Math.cos(a) * radius, Math.sin(a) * radius);
          if (!j) ctx.moveTo(p.x, p.y);
          else ctx.lineTo(p.x, p.y);
        }
        ctx.strokeStyle = "#7aa7e323";
        ctx.lineWidth = 0.8;
        ctx.stroke();
      }
      function dust(front: boolean) {
        for (const particle of particles) {
          const p = project(
            particle.x,
            particle.y,
            Math.sin(particle.phase + time * 0.15) * 4,
          );
          if (p.depth < 0 !== front) continue;
          ctx.beginPath();
          particle.trail.forEach(([x, y], i) => {
            const q = project(x, y);
            if (!i) ctx.moveTo(q.x, q.y);
            else ctx.lineTo(q.x, q.y);
          });
          ctx.strokeStyle = particle.size > 1.5 ? "#8db8ff65" : "#477ddf38";
          ctx.lineWidth = Math.max(0.5, particle.size * p.scale * 0.6);
          ctx.stroke();
          ctx.fillStyle = particle.size > 1.5 ? "#d0e6ff" : "#689eff";
          ctx.beginPath();
          ctx.arc(
            p.x,
            p.y,
            Math.max(0.5, particle.size * p.scale),
            0,
            Math.PI * 2,
          );
          ctx.fill();
        }
      }
      dust(false);
      if (field === "binary") {
        sphere(
          Math.cos(time * 0.35) * 47,
          Math.sin(time * 0.35) * 47,
          36,
          true,
        );
        sphere(
          -Math.cos(time * 0.35) * 47,
          -Math.sin(time * 0.35) * 47,
          26,
          false,
        );
      } else sphere(0, 0, 68, true);
      dust(true);
      for (let i = 0; i < 3; i++) {
        const a = time * (0.12 + i * 0.06) + i * 2.1;
        const p = project(
          Math.cos(a) * (160 + i * 40),
          Math.sin(a) * (160 + i * 40),
          18,
        );
        ctx.fillStyle = "#d2e4ff";
        ctx.beginPath();
        ctx.arc(p.x, p.y, (3 + i) * p.scale, 0, Math.PI * 2);
        ctx.fill();
        ctx.font = "10px monospace";
        ctx.fillStyle = "#a7bddb";
        ctx.fillText(
          ["INTERFACES", "SYSTEMS", "EXPERIMENTS"][i],
          p.x + 13,
          p.y - 12,
        );
      }
      if (ripple > 0) {
        ctx.beginPath();
        ctx.ellipse(
          center.x,
          center.y,
          (1 - ripple) * 330 * center.scale,
          (1 - ripple) * 140 * center.scale,
          -0.1,
          0,
          Math.PI * 2,
        );
        ctx.strokeStyle = `rgba(165,207,255,${ripple * 0.8})`;
        ctx.lineWidth = 2;
        ctx.stroke();
      }
    }

    function loop(now: number) {
      frame = requestAnimationFrame(loop);
      if (!active || paused || document.hidden || media.matches) {
        previous = now;
        return;
      }
      if (now - lastDraw < 32) return;
      const dt = Math.min((now - (previous || now)) / 1000, 0.05);
      previous = now;
      lastDraw = now;
      if (field !== controls.current.mode) {
        field = controls.current.mode;
        particles = createParticles(width < 760 ? 140 : 260);
      }
      if (pulseId !== controls.current.pulse) {
        pulseId = controls.current.pulse;
        pulseParticles(particles);
        ripple = 1;
      }
      time += dt;
      ripple = Math.max(0, ripple - dt * 0.55);
      pointer.x += (pointer.targetX - pointer.x) * 0.04;
      pointer.y += (pointer.targetY - pointer.y) * 0.04;
      stepParticles(particles, dt, time, field);
      draw();
    }
    function updateControls() {
      if (field !== controls.current.mode) {
        field = controls.current.mode;
        particles = createParticles(width < 760 ? 140 : 260);
      }
      if (pulseId !== controls.current.pulse) {
        pulseId = controls.current.pulse;
        pulseParticles(particles);
        ripple = 1;
      }
      draw();
    }
    function resize() {
      const bounds = canvas!.getBoundingClientRect();
      width = bounds.width;
      height = bounds.height;
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas!.width = width * dpr;
      canvas!.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      draw();
    }
    function move(event: PointerEvent) {
      if (event.pointerType !== "mouse") return;
      const rect = canvas!.getBoundingClientRect();
      pointer.targetX = (event.clientX - rect.left) / rect.width - 0.5;
      pointer.targetY = (event.clientY - rect.top) / rect.height - 0.5;
    }
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(canvas);
    const intersection = new IntersectionObserver(([entry]) => {
      active = entry.isIntersecting;
    });
    intersection.observe(canvas);
    const mutation = new MutationObserver(() => {
      paused = document.documentElement.dataset.motion === "paused";
    });
    mutation.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-motion"],
    });
    paused = document.documentElement.dataset.motion === "paused";
    canvas.addEventListener("pointermove", move);
    canvas.addEventListener("world-controls", updateControls);
    media.addEventListener("change", resize);
    resize();
    frame = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      intersection.disconnect();
      mutation.disconnect();
      canvas.removeEventListener("pointermove", move);
      canvas.removeEventListener("world-controls", updateControls);
      media.removeEventListener("change", resize);
    };
  }, []);
  return (
    <canvas
      ref={canvasRef}
      className="orbital-canvas"
      role="img"
      aria-label="A living orbital world: luminous particles follow gravitational paths around a blue planet"
    />
  );
}
