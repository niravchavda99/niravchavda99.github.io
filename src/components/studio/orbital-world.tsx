"use client";
import { useEffect, useRef } from "react";
import {
  createParticles,
  pulseParticles,
  stepParticles,
  type FieldMode,
} from "@/src/lib/orbital-physics";
import { DEFAULT_CAMERA, OrbitalRenderer } from "@/src/lib/orbital-renderer";

export interface WorldControls {
  mode: FieldMode;
  pulse: number;
  reset: number;
}
const destinations = [
  { name: "Projects", href: "#work" },
  { name: "Skills", href: "#toolkit" },
  { name: "Journey", href: "#journey" },
];

/** Owns lifecycle/input only; physics, painting, and surface generation are separate. */
export function OrbitalWorld({ mode, pulse, reset }: WorldControls) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const markerRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const controls = useRef({ mode, pulse, reset });
  useEffect(() => {
    controls.current = { mode, pulse, reset };
    canvasRef.current?.dispatchEvent(new Event("world-controls"));
  }, [mode, pulse, reset]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !canvas.getContext("2d")) return;
    const renderer = new OrbitalRenderer(
      canvas,
      markerRefs.current.filter(
        (marker): marker is HTMLAnchorElement => !!marker,
      ),
    );
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0,
      previous = 0,
      lastDraw = 0,
      time = 0,
      ripple = 0;
    let active = true,
      paused = document.documentElement.dataset.motion === "paused";
    let field = controls.current.mode,
      pulseId = controls.current.pulse,
      resetId = controls.current.reset;
    const camera = { ...DEFAULT_CAMERA },
      targetCamera = { ...DEFAULT_CAMERA };
    let dragging = false,
      pointerX = 0,
      pointerY = 0;
    let particles = createParticles(window.innerWidth < 760 ? 230 : 460);
    const paint = () =>
      renderer.draw({ particles, time, mode: field, ripple, camera });
    function resetScene() {
      particles = createParticles(renderer.width < 760 ? 230 : 460, field);
      time = 0;
      ripple = 0;
      Object.assign(camera, DEFAULT_CAMERA);
      Object.assign(targetCamera, DEFAULT_CAMERA);
      // Pre-roll also gives reduced-motion visitors a fully formed orbital belt.
      for (let i = 0; i < 14; i++) {
        stepParticles(particles, 1 / 60, time, field);
        time += 1 / 60;
      }
    }
    function updateControls() {
      if (
        field !== controls.current.mode ||
        resetId !== controls.current.reset
      ) {
        field = controls.current.mode;
        resetId = controls.current.reset;
        resetScene();
      }
      if (pulseId !== controls.current.pulse) {
        pulseId = controls.current.pulse;
        pulseParticles(particles);
        ripple = 1;
      }
      paint();
    }
    function loop(now: number) {
      frame = 0;
      if (!active || paused || document.hidden || media.matches) {
        previous = 0;
        return;
      }
      frame = requestAnimationFrame(loop);
      if (now - lastDraw < 32) return;
      const dt = Math.min((now - (previous || now)) / 1000, 0.05);
      previous = now;
      lastDraw = now;
      const damping = 1 - Math.exp(-dt * 5);
      camera.yaw += (targetCamera.yaw - camera.yaw) * damping;
      camera.pitch += (targetCamera.pitch - camera.pitch) * damping;
      stepParticles(particles, dt, time, field);
      time += dt;
      ripple = Math.max(0, ripple - dt * 0.55);
      paint();
    }
    function schedule() {
      if (active && !paused && !document.hidden && !media.matches && !frame) {
        previous = 0;
        frame = requestAnimationFrame(loop);
      } else if (
        (!active || paused || document.hidden || media.matches) &&
        frame
      ) {
        cancelAnimationFrame(frame);
        frame = 0;
        previous = 0;
      }
    }
    function resize() {
      renderer.resize();
      paint();
    }
    function down(event: PointerEvent) {
      if (event.pointerType !== "mouse" || event.button !== 0) return;
      dragging = true;
      pointerX = event.clientX;
      pointerY = event.clientY;
      canvas!.setPointerCapture(event.pointerId);
      canvas!.dataset.dragging = "true";
    }
    function move(event: PointerEvent) {
      if (!dragging) return;
      targetCamera.yaw += (event.clientX - pointerX) * 0.006;
      targetCamera.pitch = Math.max(
        0.16,
        Math.min(1.1, targetCamera.pitch + (event.clientY - pointerY) * 0.004),
      );
      pointerX = event.clientX;
      pointerY = event.clientY;
      if (paused || media.matches) {
        Object.assign(camera, targetCamera);
        paint();
      }
    }
    function up() {
      dragging = false;
      delete canvas!.dataset.dragging;
    }
    function key(event: KeyboardEvent) {
      if (
        !["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown", "Home"].includes(
          event.key,
        )
      )
        return;
      event.preventDefault();
      if (event.key === "Home") Object.assign(targetCamera, DEFAULT_CAMERA);
      else if (event.key === "ArrowLeft" || event.key === "ArrowRight")
        targetCamera.yaw += event.key === "ArrowLeft" ? -0.18 : 0.18;
      else
        targetCamera.pitch = Math.max(
          0.16,
          Math.min(
            1.1,
            targetCamera.pitch + (event.key === "ArrowUp" ? -0.1 : 0.1),
          ),
        );
      if (paused || media.matches) {
        Object.assign(camera, targetCamera);
        paint();
      }
    }
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(canvas);
    const intersection = new IntersectionObserver(([entry]) => {
      active = entry.isIntersecting;
      schedule();
    });
    intersection.observe(canvas);
    const mutation = new MutationObserver(() => {
      paused = document.documentElement.dataset.motion === "paused";
      schedule();
    });
    mutation.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-motion"],
    });
    const mediaChanged = () => {
      schedule();
      paint();
    };
    canvas.addEventListener("pointerdown", down);
    canvas.addEventListener("pointermove", move);
    canvas.addEventListener("pointerup", up);
    canvas.addEventListener("pointercancel", up);
    canvas.addEventListener("lostpointercapture", up);
    canvas.addEventListener("keydown", key);
    canvas.addEventListener("world-controls", updateControls);
    media.addEventListener("change", mediaChanged);
    document.addEventListener("visibilitychange", schedule);
    renderer.resize();
    resetScene();
    paint();
    schedule();
    return () => {
      cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      intersection.disconnect();
      mutation.disconnect();
      canvas.removeEventListener("pointerdown", down);
      canvas.removeEventListener("pointermove", move);
      canvas.removeEventListener("pointerup", up);
      canvas.removeEventListener("pointercancel", up);
      canvas.removeEventListener("lostpointercapture", up);
      canvas.removeEventListener("keydown", key);
      canvas.removeEventListener("world-controls", updateControls);
      media.removeEventListener("change", mediaChanged);
      document.removeEventListener("visibilitychange", schedule);
    };
  }, []);

  return (
    <>
      <canvas
        ref={canvasRef}
        className="orbital-canvas"
        tabIndex={0}
        role="img"
        aria-label="Interactive orbital world. Drag or use arrow keys to orbit the camera. Home restores the view."
        aria-keyshortcuts="ArrowLeft ArrowRight ArrowUp ArrowDown Home"
      />
      {destinations.map((destination, index) => (
        <a
          key={destination.href}
          ref={(element) => {
            markerRefs.current[index] = element;
          }}
          className="world-marker"
          href={destination.href}
          aria-label={`Explore ${destination.name.toLowerCase()}`}
        >
          <span />
          {destination.name}
        </a>
      ))}
    </>
  );
}
