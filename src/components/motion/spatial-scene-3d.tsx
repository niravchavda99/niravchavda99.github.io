"use client";

import React, { useEffect, useRef } from "react";
import { ThemeMode, useTheme } from "@/src/components/theme/theme-context";

interface Vec3 {
  x: number;
  y: number;
  z: number;
}

interface Star {
  x: number;
  y: number;
  z: number;
  size: number;
}

// Generate an icosahedron + nested geodesic vertices & edges for the 3D sculptural core
function createPolyhedronGeometry(): {
  vertices: Vec3[];
  edges: [number, number][];
} {
  const t = (1 + Math.sqrt(5)) / 2;
  const raw: [number, number, number][] = [
    [-1, t, 0],
    [1, t, 0],
    [-1, -t, 0],
    [1, -t, 0],
    [0, -1, t],
    [0, 1, t],
    [0, -1, -t],
    [0, 1, -t],
    [t, 0, -1],
    [t, 0, 1],
    [-t, 0, -1],
    [-t, 0, 1],
  ];

  // Outer icosahedron normalized to radius 1
  const outer: Vec3[] = raw.map(([x, y, z]) => {
    const len = Math.hypot(x, y, z);
    return { x: x / len, y: y / len, z: z / len };
  });

  // Inner dual dodecahedron-like core scaled to 0.52
  const inner: Vec3[] = outer.map((v) => ({
    x: v.x * 0.52,
    y: -v.y * 0.52,
    z: v.z * 0.52,
  }));

  const vertices = [...outer, ...inner];
  const edges: [number, number][] = [];

  // Connect outer icosahedron edges (distance ~ 1.051)
  for (let i = 0; i < outer.length; i++) {
    for (let j = i + 1; j < outer.length; j++) {
      const d = Math.hypot(
        outer[i].x - outer[j].x,
        outer[i].y - outer[j].y,
        outer[i].z - outer[j].z,
      );
      if (d < 1.15) {
        edges.push([i, j]);
      }
    }
  }

  // Connect inner core edges
  const offset = outer.length;
  for (let i = 0; i < inner.length; i++) {
    for (let j = i + 1; j < inner.length; j++) {
      const d = Math.hypot(
        inner[i].x - inner[j].x,
        inner[i].y - inner[j].y,
        inner[i].z - inner[j].z,
      );
      if (d < 1.15 * 0.52) {
        edges.push([offset + i, offset + j]);
      }
    }
    // Tensegrity struts between outer and inner shells
    edges.push([i, offset + i]);
  }

  return { vertices, edges };
}

function rotate3D(v: Vec3, rx: number, ry: number, rz: number): Vec3 {
  // Rotate X
  const cosX = Math.cos(rx);
  const sinX = Math.sin(rx);
  const y1 = v.y * cosX - v.z * sinX;
  const z1 = v.y * sinX + v.z * cosX;

  // Rotate Y
  const cosY = Math.cos(ry);
  const sinY = Math.sin(ry);
  const x2 = v.x * cosY + z1 * sinY;
  const z2 = -v.x * sinY + z1 * cosY;

  // Rotate Z
  const cosZ = Math.cos(rz);
  const sinZ = Math.sin(rz);
  const x3 = x2 * cosZ - y1 * sinZ;
  const y3 = x2 * sinZ + y1 * cosZ;

  return { x: x3, y: y3, z: z2 };
}

export function SpatialScene3D() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { mode } = useTheme();
  const modeRef = useRef(mode);

  useEffect(() => {
    modeRef.current = mode;
  }, [mode]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    let width = window.innerWidth;
    let height = window.innerHeight;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();

    const { vertices, edges } = createPolyhedronGeometry();

    // Create 3D spatial depth particles
    const starCount = 110;
    const stars: Star[] = Array.from({ length: starCount }, () => ({
      x: (Math.random() - 0.5) * 2400,
      y: (Math.random() - 0.5) * 1800,
      z: Math.random() * 1400 + 100,
      size: Math.random() * 1.6 + 0.5,
    }));

    // Gyroscopic orbital ring sample points
    const ringSegments = 72;
    const ringPoints: Vec3[] = Array.from({ length: ringSegments }, (_, i) => {
      const a = (i / ringSegments) * Math.PI * 2;
      return { x: Math.cos(a) * 1.42, y: Math.sin(a) * 1.42, z: 0 };
    });
    const ringPoints2: Vec3[] = Array.from({ length: ringSegments }, (_, i) => {
      const a = (i / ringSegments) * Math.PI * 2;
      return { x: Math.cos(a) * 1.72, y: 0, z: Math.sin(a) * 1.72 };
    });

    let targetMouseX = 0;
    let targetMouseY = 0;
    let smoothMouseX = 0;
    let smoothMouseY = 0;

    let lastScrollY = window.scrollY;
    let scrollVelocity = 0;
    let scrollProgress = 0;

    const onPointerMove = (e: PointerEvent) => {
      targetMouseX = (e.clientX / Math.max(width, 1) - 0.5) * 2;
      targetMouseY = (e.clientY / Math.max(height, 1) - 0.5) * 2;
    };

    const onScroll = () => {
      const currentY = window.scrollY;
      const delta = currentY - lastScrollY;
      scrollVelocity = Math.max(-45, Math.min(45, delta));
      lastScrollY = currentY;
      const maxScroll = Math.max(
        document.documentElement.scrollHeight - height,
        1,
      );
      scrollProgress = Math.min(1, Math.max(0, currentY / maxScroll));
    };

    window.addEventListener("resize", resize, { passive: true });
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });

    let time = 0;
    let rafId = 0;

    const render = () => {
      const isDark = modeRef.current === ThemeMode.Dark;
      ctx.clearRect(0, 0, width, height);

      if (!prefersReducedMotion) {
        time += 0.0055;
      }

      smoothMouseX += (targetMouseX - smoothMouseX) * 0.055;
      smoothMouseY += (targetMouseY - smoothMouseY) * 0.055;
      scrollVelocity *= 0.92;

      const fov = 620;

      // 1. Render 3D warp starfield particles
      const starBaseColor = isDark ? "255, 245, 235" : "24, 22, 20";
      const accentRgb = isDark ? "255, 88, 42" : "230, 62, 17";
      const goldRgb = isDark ? "255, 181, 71" : "217, 119, 6";

      for (let i = 0; i < stars.length; i++) {
        const s = stars[i];
        if (!prefersReducedMotion) {
          s.z -= 0.45 + Math.abs(scrollVelocity) * 0.35;
          if (s.z <= 60) {
            s.z = 1500;
            s.x = (Math.random() - 0.5) * 2400;
            s.y = (Math.random() - 0.5) * 1800;
          }
        }

        const scale = fov / (fov + s.z);
        const px = width * 0.5 + (s.x - smoothMouseX * 90) * scale;
        const py = height * 0.5 + (s.y - smoothMouseY * 90) * scale;

        if (px < -20 || px > width + 20 || py < -20 || py > height + 20) {
          continue;
        }

        const depthAlpha =
          Math.min(1, (1500 - s.z) / 1100) * (isDark ? 0.42 : 0.22);
        ctx.fillStyle =
          i % 9 === 0
            ? `rgba(${accentRgb}, ${depthAlpha * 1.4})`
            : `rgba(${starBaseColor}, ${depthAlpha})`;

        const r = Math.max(0.5, s.size * scale * 1.5);
        ctx.beginPath();
        ctx.arc(px, py, r, 0, Math.PI * 2);
        ctx.fill();
      }

      // 2. Position & project the 3D Tensegrity Sculpture
      // Shifts smoothly from hero right-stage toward subtle center-left ambient orbit as user scrolls
      const heroWeight = Math.max(0, 1 - scrollProgress * 2.4);
      const centerX =
        width >= 1024
          ? width * (0.73 * heroWeight + 0.82 * (1 - heroWeight))
          : width * 0.5;
      const centerY =
        width >= 1024
          ? height * (0.46 * heroWeight + 0.52 * (1 - heroWeight))
          : height * 0.34;

      const baseRadius =
        Math.min(width, height) * (width >= 1024 ? 0.22 : 0.26);
      const sculptureScale = baseRadius * (1 - scrollProgress * 0.22);
      const sculptureOpacity =
        width >= 1024
          ? 0.88 - scrollProgress * 0.52
          : 0.32 - scrollProgress * 0.18;

      if (sculptureOpacity > 0.04) {
        // Subtle radial ambient glow behind the 3D core
        const glow = ctx.createRadialGradient(
          centerX + smoothMouseX * 22,
          centerY + smoothMouseY * 22,
          0,
          centerX,
          centerY,
          sculptureScale * 2.1,
        );
        glow.addColorStop(
          0,
          `rgba(${accentRgb}, ${(isDark ? 0.14 : 0.08) * sculptureOpacity})`,
        );
        glow.addColorStop(
          0.45,
          `rgba(${goldRgb}, ${(isDark ? 0.06 : 0.035) * sculptureOpacity})`,
        );
        glow.addColorStop(1, "rgba(0, 0, 0, 0)");
        ctx.fillStyle = glow;
        ctx.beginPath();
        ctx.arc(centerX, centerY, sculptureScale * 2.1, 0, Math.PI * 2);
        ctx.fill();

        const rx =
          time * 0.7 + smoothMouseY * 0.65 + scrollProgress * Math.PI * 1.2;
        const ry =
          time * 0.95 + smoothMouseX * 0.85 + scrollProgress * Math.PI * 1.6;
        const rz = time * 0.35;

        // Draw Gyroscopic Rings
        const drawRing = (
          pts: Vec3[],
          rX: number,
          rY: number,
          rZ: number,
          rgb: string,
          alphaMult: number,
        ) => {
          ctx.beginPath();
          for (let i = 0; i <= pts.length; i++) {
            const p = pts[i % pts.length];
            const rot = rotate3D(p, rX, rY, rZ);
            const zWorld = rot.z * sculptureScale;
            const persp = fov / (fov + zWorld + 220);
            const sx = centerX + rot.x * sculptureScale * persp;
            const sy = centerY + rot.y * sculptureScale * persp;
            if (i === 0) ctx.moveTo(sx, sy);
            else ctx.lineTo(sx, sy);
          }
          ctx.strokeStyle = `rgba(${rgb}, ${sculptureOpacity * alphaMult})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        };

        drawRing(
          ringPoints,
          rx * 0.6 + 0.5,
          ry * 0.5,
          -rz * 0.9,
          starBaseColor,
          isDark ? 0.15 : 0.14,
        );
        drawRing(
          ringPoints2,
          -rx * 0.45,
          ry * 0.8 + 0.4,
          rz * 0.7,
          accentRgb,
          isDark ? 0.24 : 0.2,
        );

        // Project polyhedron vertices
        const projected = vertices.map((v, idx) => {
          const isInner = idx >= 12;
          const rot = isInner
            ? rotate3D(v, -rx * 1.35, -ry * 1.2, rz * 1.1)
            : rotate3D(v, rx, ry, rz);
          const zWorld = rot.z * sculptureScale;
          const persp = fov / (fov + zWorld + 220);
          return {
            x: centerX + rot.x * sculptureScale * persp,
            y: centerY + rot.y * sculptureScale * persp,
            z: rot.z,
            persp,
            isInner,
          };
        });

        // Sort edges back-to-front for true 3D depth shading
        const sortedEdges = edges
          .map(([a, b]) => ({
            a,
            b,
            avgZ: (projected[a].z + projected[b].z) * 0.5,
          }))
          .sort((e1, e2) => e2.avgZ - e1.avgZ);

        for (const { a, b, avgZ } of sortedEdges) {
          const pa = projected[a];
          const pb = projected[b];
          // avgZ is roughly in [-1, 1]; negative Z is closer to viewer
          const depthFactor = Math.max(0.15, Math.min(1, (0.85 - avgZ) * 0.65));
          const isInnerEdge = pa.isInner && pb.isInner;
          const isStrut = pa.isInner !== pb.isInner;

          ctx.beginPath();
          ctx.moveTo(pa.x, pa.y);
          ctx.lineTo(pb.x, pb.y);

          if (isInnerEdge) {
            ctx.strokeStyle = `rgba(${accentRgb}, ${depthFactor * sculptureOpacity * 0.85})`;
            ctx.lineWidth = 1.35;
          } else if (isStrut) {
            ctx.strokeStyle = `rgba(${goldRgb}, ${depthFactor * sculptureOpacity * 0.28})`;
            ctx.lineWidth = 0.75;
          } else {
            ctx.strokeStyle = `rgba(${starBaseColor}, ${depthFactor * sculptureOpacity * (isDark ? 0.38 : 0.32)})`;
            ctx.lineWidth = 1.1;
          }
          ctx.stroke();
        }

        // Draw glowing 3D vertex nodes
        for (const p of projected) {
          const depthFactor = Math.max(0.2, Math.min(1, (0.9 - p.z) * 0.65));
          const nodeRadius = (p.isInner ? 2.4 : 3.0) * p.persp;
          ctx.beginPath();
          ctx.arc(p.x, p.y, nodeRadius, 0, Math.PI * 2);
          ctx.fillStyle = p.isInner
            ? `rgba(${accentRgb}, ${depthFactor * sculptureOpacity * 0.95})`
            : `rgba(${starBaseColor}, ${depthFactor * sculptureOpacity * 0.75})`;
          ctx.fill();
        }
      }

      rafId = requestAnimationFrame(render);
    };

    rafId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none z-0"
    />
  );
}
