"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { SkillCategory, Technology } from "@/src/data/skills";
import { ThemeMode, useTheme } from "@/src/components/theme/theme-context";
import { cn } from "@/src/lib/utils";

interface SkillSphere3DProps {
  technologies: Technology[];
  activeCategory: SkillCategory | "All";
  hoveredTech: string | null;
  onHoverTech: (name: string | null) => void;
}

interface SphereNode {
  tech: Technology;
  baseX: number;
  baseY: number;
  baseZ: number;
}

export function SkillSphere3D({
  technologies,
  activeCategory,
  hoveredTech,
  onHoverTech,
}: SkillSphere3DProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const nodeRefs = useRef<(HTMLDivElement | null)[]>([]);
  const { mode } = useTheme();
  const modeRef = useRef(mode);
  const activeCategoryRef = useRef(activeCategory);
  const hoveredTechRef = useRef(hoveredTech);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    modeRef.current = mode;
  }, [mode]);

  useEffect(() => {
    activeCategoryRef.current = activeCategory;
  }, [activeCategory]);

  useEffect(() => {
    hoveredTechRef.current = hoveredTech;
  }, [hoveredTech]);

  // Compute uniform Fibonacci sphere coordinates once
  const nodes = useMemo<SphereNode[]>(() => {
    const n = technologies.length;
    const goldenAngle = Math.PI * (3 - Math.sqrt(5));
    return technologies.map((tech, i) => {
      const y = 1 - ((i + 0.5) / n) * 2;
      const radiusAtY = Math.sqrt(Math.max(0, 1 - y * y));
      const theta = goldenAngle * i;
      return {
        tech,
        baseX: Math.cos(theta) * radiusAtY,
        baseY: y,
        baseZ: Math.sin(theta) * radiusAtY,
      };
    });
  }, [technologies]);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = container.clientWidth;
    let height = container.clientHeight;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      width = container.clientWidth;
      height = container.clientHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();

    const ro = new ResizeObserver(resize);
    ro.observe(container);

    // Current 3D rotation state + angular velocity
    let rotX = 0.25;
    let rotY = 0.4;
    let velX = 0.0018;
    let velY = 0.0042;
    let dragging = false;
    let lastPointerX = 0;
    let lastPointerY = 0;

    const onPointerDown = (e: PointerEvent) => {
      dragging = true;
      setIsDragging(true);
      lastPointerX = e.clientX;
      lastPointerY = e.clientY;
      container.setPointerCapture?.(e.pointerId);
    };

    const onPointerMove = (e: PointerEvent) => {
      if (!dragging) return;
      const dx = e.clientX - lastPointerX;
      const dy = e.clientY - lastPointerY;
      lastPointerX = e.clientX;
      lastPointerY = e.clientY;
      velY = dx * 0.0065;
      velX = -dy * 0.0065;
      rotY += velY;
      rotX += velX;
    };

    const onPointerUp = (e: PointerEvent) => {
      if (!dragging) return;
      dragging = false;
      setIsDragging(false);
      container.releasePointerCapture?.(e.pointerId);
    };

    container.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("pointerup", onPointerUp, { passive: true });

    let rafId = 0;

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      if (!dragging) {
        // Decay drag momentum smoothly toward gentle base spin
        velX += (0.0012 - velX) * 0.04;
        velY += (0.0038 - velY) * 0.04;
        if (!hoveredTechRef.current) {
          rotX += velX;
          rotY += velY;
        } else {
          rotX += velX * 0.2;
          rotY += velY * 0.2;
        }
      }

      const cx = width * 0.5;
      const cy = height * 0.5;
      const sphereRadius = Math.min(width, height) * 0.36;
      const fov = 520;

      const cosX = Math.cos(rotX);
      const sinX = Math.sin(rotX);
      const cosY = Math.cos(rotY);
      const sinY = Math.sin(rotY);

      const projected = nodes.map((node) => {
        // Rotate Y then X
        const x1 = node.baseX * cosY + node.baseZ * sinY;
        const z1 = -node.baseX * sinY + node.baseZ * cosY;
        const y2 = node.baseY * cosX - z1 * sinX;
        const z2 = node.baseY * sinX + z1 * cosX;

        const worldZ = z2 * sphereRadius;
        // Negative worldZ = closer to viewer
        const persp = fov / (fov - worldZ);
        const sx = cx + x1 * sphereRadius * persp;
        const sy = cy + y2 * sphereRadius * persp;

        return {
          tech: node.tech,
          sx,
          sy,
          z: z2, // [-1, 1], +1 is front
          persp,
        };
      });

      const isDark = modeRef.current === ThemeMode.Dark;
      const lineRgb = isDark ? "255, 245, 235" : "24, 22, 20";
      const accentRgb = isDark ? "255, 88, 42" : "230, 62, 17";
      const currentCat = activeCategoryRef.current;

      // Draw subtle equatorial orbital guide circle
      ctx.beginPath();
      ctx.arc(cx, cy, sphereRadius * 1.04, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(${lineRgb}, ${isDark ? 0.07 : 0.08})`;
      ctx.lineWidth = 1;
      ctx.stroke();

      // Draw 3D constellation edges between nearby nodes
      for (let i = 0; i < projected.length; i++) {
        for (let j = i + 1; j < projected.length; j++) {
          const a = projected[i];
          const b = projected[j];
          const dist3D = Math.hypot(
            nodes[i].baseX - nodes[j].baseX,
            nodes[i].baseY - nodes[j].baseY,
            nodes[i].baseZ - nodes[j].baseZ,
          );
          if (dist3D < 0.82) {
            const avgDepth = ((a.z + b.z) * 0.5 + 1) * 0.5;
            const bothActive =
              currentCat === "All" ||
              (a.tech.category === currentCat &&
                b.tech.category === currentCat);

            ctx.beginPath();
            ctx.moveTo(a.sx, a.sy);
            ctx.lineTo(b.sx, b.sy);
            ctx.strokeStyle =
              currentCat !== "All" && bothActive
                ? `rgba(${accentRgb}, ${0.12 + avgDepth * 0.35})`
                : `rgba(${lineRgb}, ${(isDark ? 0.04 : 0.05) + avgDepth * 0.1})`;
            ctx.lineWidth = bothActive && currentCat !== "All" ? 1.2 : 0.8;
            ctx.stroke();
          }
        }
      }

      // Update DOM node transforms directly at 60fps without React re-renders
      for (let i = 0; i < projected.length; i++) {
        const el = nodeRefs.current[i];
        if (!el) continue;
        const p = projected[i];
        const depthNorm = (p.z + 1) * 0.5; // 0 (back) -> 1 (front)
        const matchesCategory =
          currentCat === "All" || p.tech.category === currentCat;
        const isHovered = hoveredTechRef.current === p.tech.name;

        const scale = (0.68 + depthNorm * 0.42) * (isHovered ? 1.16 : 1);
        const opacity = matchesCategory
          ? 0.28 + depthNorm * 0.72
          : 0.12 + depthNorm * 0.12;

        el.style.transform = `translate3d(${p.sx}px, ${p.sy}px, 0) translate(-50%, -50%) scale(${scale.toFixed(3)})`;
        el.style.opacity = opacity.toFixed(3);
        el.style.zIndex = String(
          Math.round(depthNorm * 40) + (isHovered ? 50 : 0),
        );
      }

      rafId = requestAnimationFrame(animate);
    };

    rafId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(rafId);
      ro.disconnect();
      container.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerUp);
    };
  }, [nodes]);

  return (
    <div
      ref={containerRef}
      data-cursor="DRAG 3D"
      className={cn(
        "relative w-full h-[380px] sm:h-[460px] rounded-3xl border border-border bg-card/65 backdrop-blur-xl overflow-hidden select-none touch-none",
        isDragging ? "cursor-grabbing" : "cursor-grab",
      )}
    >
      {/* Corner HUD labels */}
      <div className="absolute top-4 left-5 z-20 pointer-events-none font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
        ORBITAL SPHERE // {technologies.length} NODES
      </div>
      <div className="absolute bottom-4 right-5 z-20 pointer-events-none font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
        DRAG TO ROTATE IN 3D
      </div>

      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
      />

      {nodes.map((node, i) => {
        const isHighlighted =
          hoveredTech === node.tech.name ||
          (activeCategory !== "All" && node.tech.category === activeCategory);

        return (
          <div
            key={node.tech.name}
            ref={(el) => {
              nodeRefs.current[i] = el;
            }}
            onMouseEnter={() => onHoverTech(node.tech.name)}
            onMouseLeave={() => onHoverTech(null)}
            className="absolute top-0 left-0 will-change-transform"
          >
            <div
              className={cn(
                "flex items-center gap-2 px-2.5 py-1.5 rounded-xl border backdrop-blur-md shadow-md transition-colors duration-150",
                isHighlighted
                  ? "border-primary bg-card text-foreground shadow-primary/20"
                  : "border-border/90 bg-card/90 text-foreground/90 hover:border-primary/50",
              )}
            >
              <Image
                src={node.tech.darkIcon ?? node.tech.icon}
                alt={node.tech.name}
                width={18}
                height={18}
                draggable={false}
                className="w-[18px] h-[18px] object-contain dark:hidden pointer-events-none"
              />
              <Image
                src={node.tech.icon}
                alt={node.tech.name}
                width={18}
                height={18}
                draggable={false}
                className="w-[18px] h-[18px] object-contain hidden dark:block pointer-events-none"
              />
              <span className="font-mono text-[11px] font-medium whitespace-nowrap">
                {node.tech.name}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
