"use client";

import React, { useEffect, useRef, useState } from "react";
import { cn } from "@/src/lib/utils";

interface PortraitHologram3DProps {
  imageSrc: string;
  className?: string;
}

const VERTEX_SHADER = `
  attribute vec3 aPosition;
  attribute vec3 aColor;
  attribute float aEdge;
  attribute float aRandom;

  uniform float uTime;
  uniform vec2 uRotation;
  uniform vec2 uPointer;
  uniform float uPointerActive;
  uniform vec3 uShockwave; // xy = origin, z = elapsed time
  uniform float uDpr;
  uniform float uViewportHeight;
  uniform float uAspect;
  uniform float uAssemble;

  varying vec3 vColor;
  varying float vAlpha;
  varying float vScanGlow;

  mat3 rotateY(float a) {
    float c = cos(a), s = sin(a);
    return mat3(
      c, 0.0, s,
      0.0, 1.0, 0.0,
      -s, 0.0, c
    );
  }

  mat3 rotateX(float a) {
    float c = cos(a), s = sin(a);
    return mat3(
      1.0, 0.0, 0.0,
      0.0, c, -s,
      0.0, s, c
    );
  }

  void main() {
    vec3 pos = aPosition;

    // Initial Volumetric Assembly from 3D space
    float scatter = 1.0 - uAssemble;
    pos.x += sin(aRandom * 41.3) * scatter * 0.85;
    pos.y += cos(aRandom * 27.9) * scatter * 0.85;
    pos.z += sin(aRandom * 19.1) * scatter * 1.25;

    // Subtle idle organic float
    pos.y += sin(uTime * 1.35 + aRandom * 6.28) * 0.003;
    pos.z += cos(uTime * 1.15 + pos.y * 3.2) * 0.006;

    // Autonomous vertical LiDAR laser scan plane
    float scanY = 1.18 - mod(uTime * 0.44, 2.55);
    float distToScan = abs(pos.y - scanY);
    float scanBand = smoothstep(0.11, 0.0, distToScan);
    pos.z += scanBand * 0.04;

    // Tactile pointer magnetic ripple
    float dPtr = distance(pos.xy, uPointer);
    float ptrForce = smoothstep(0.32, 0.0, dPtr) * uPointerActive;
    vec2 pushDir = normalize(pos.xy - uPointer + vec2(0.0001));
    pos.xy += pushDir * ptrForce * 0.024;
    pos.z += ptrForce * 0.085;

    // Click shockwave ring
    float waveGlow = 0.0;
    if (uShockwave.z >= 0.0 && uShockwave.z < 2.0) {
      float radius = uShockwave.z * 1.35;
      float dWave = abs(distance(pos.xy, uShockwave.xy) - radius);
      float ring = smoothstep(0.15, 0.0, dWave) * (1.0 - uShockwave.z / 2.0);
      pos.z += ring * 0.13;
      waveGlow = ring;
    }

    // 3D camera orbit rotation
    vec3 rotated = rotateX(uRotation.x) * rotateY(uRotation.y) * pos;

    // True perspective projection (+rotated.z is closer to camera -> negative clip Z)
    float fov = 2.45;
    float zDist = fov - rotated.z;
    float persp = fov / max(0.4, zDist);

    vec2 projected = rotated.xy * persp;
    projected.x /= max(0.5, uAspect);

    gl_Position = vec4(projected.x, projected.y, -rotated.z * 0.45, 1.0);

    // Dense optical micro-spheres sized to viewport height & DPR
    float baseSize = (uViewportHeight / 390.0) * 3.25 * uDpr;
    gl_PointSize = baseSize * persp * (1.0 + scanBand * 0.18 + waveGlow * 0.3);

    vColor = aColor;
    vScanGlow = clamp(scanBand * 0.8 + waveGlow * 1.1 + ptrForce * 0.4 + aEdge * 0.14, 0.0, 1.0);
    vAlpha = clamp(uAssemble * (0.9 + rotated.z * 0.25), 0.2, 1.0);
  }
`;

const FRAGMENT_SHADER = `
  precision mediump float;

  varying vec3 vColor;
  varying float vAlpha;
  varying float vScanGlow;

  void main() {
    vec2 uv = gl_PointCoord - vec2(0.5);
    float dist = length(uv);
    if (dist > 0.46) discard;

    float disc = smoothstep(0.46, 0.28, dist);

    // Blend studio-graded likeness with Electric Vermilion / Solar Gold LiDAR scan energy
    vec3 lidarEmber = mix(vec3(1.0, 0.35, 0.16), vec3(1.0, 0.76, 0.32), vScanGlow * 0.65);
    vec3 finalColor = mix(vColor, lidarEmber, vScanGlow * 0.75);

    gl_FragColor = vec4(finalColor, disc * vAlpha);
  }
`;

function compileShader(
  gl: WebGLRenderingContext,
  type: number,
  source: string,
): WebGLShader | null {
  const shader = gl.createShader(type);
  if (!shader) return null;
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    gl.deleteShader(shader);
    return null;
  }
  return shader;
}

// Extract Nirav's silhouette + compute smooth 3D anatomical bust relief from profile.jpg
function buildPointCloudData(img: HTMLImageElement) {
  const W = 180;
  const H = 204;
  const offscreen = document.createElement("canvas");
  offscreen.width = W;
  offscreen.height = H;
  const ctx = offscreen.getContext("2d", { willReadFrequently: true });
  if (!ctx) return null;

  // Tight upper-body crop around Nirav (aspect = 0.877)
  const sx = img.naturalWidth * 0.24;
  const sy = img.naturalHeight * 0.01;
  const sw = img.naturalWidth * 0.54;
  const sh = img.naturalHeight * 0.77;
  const cropAspect = sw / Math.max(1, sh);

  ctx.drawImage(img, sx, sy, sw, sh, 0, 0, W, H);
  const { data } = ctx.getImageData(0, 0, W, H);

  // 1. Border-seeded wood background flood-fill with anatomical core protection
  const isBgWood = (x: number, y: number) => {
    const nx = x / W;
    const ny = y / H;
    const inHead =
      ((nx - 0.475) / 0.172) ** 2 + ((ny - 0.235) / 0.178) ** 2 < 1.0;
    const inHands =
      ((nx - 0.44) / 0.185) ** 2 + ((ny - 0.46) / 0.195) ** 2 < 1.0;
    if (inHead || inHands) return false;

    const idx = (y * W + x) * 4;
    const r = data[idx];
    const g = data[idx + 1];
    const b = data[idx + 2];
    const lum = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
    return lum > 0.125 && r > g + 5 && r - b > 19;
  };

  const bg = new Uint8Array(W * H);
  const queue: number[] = [];

  for (let x = 0; x < W; x++) {
    if (isBgWood(x, 0)) {
      bg[x] = 1;
      queue.push(x);
    }
  }
  for (let y = 0; y < H; y++) {
    for (const x of [0, 1, W - 2, W - 1]) {
      const p = y * W + x;
      if (!bg[p] && isBgWood(x, y)) {
        bg[p] = 1;
        queue.push(p);
      }
    }
  }

  let head = 0;
  while (head < queue.length) {
    const p = queue[head++];
    const x = p % W;
    const y = (p / W) | 0;
    if (x + 1 < W && !bg[p + 1] && isBgWood(x + 1, y)) {
      bg[p + 1] = 1;
      queue.push(p + 1);
    }
    if (x - 1 >= 0 && !bg[p - 1] && isBgWood(x - 1, y)) {
      bg[p - 1] = 1;
      queue.push(p - 1);
    }
    if (y + 1 < H && !bg[p + W] && isBgWood(x, y + 1)) {
      bg[p + W] = 1;
      queue.push(p + W);
    }
    if (y - 1 >= 0 && !bg[p - W] && isBgWood(x, y - 1)) {
      bg[p - W] = 1;
      queue.push(p - W);
    }
  }

  // Remove isolated tiny background specks
  const cleanFg = new Uint8Array(W * H);
  for (let y = 1; y < H - 1; y++) {
    for (let x = 1; x < W - 1; x++) {
      const p = y * W + x;
      if (bg[p]) continue;
      let fgNeighbors = 0;
      for (let dy = -1; dy <= 1; dy++) {
        for (let dx = -1; dx <= 1; dx++) {
          if (!bg[(y + dy) * W + (x + dx)]) fgNeighbors++;
        }
      }
      if (fgNeighbors >= 5) cleanFg[p] = 1;
    }
  }

  const lumArr = new Float32Array(W * H);
  for (let i = 0; i < W * H; i++) {
    const idx = i * 4;
    lumArr[i] =
      (0.299 * data[idx] + 0.587 * data[idx + 1] + 0.114 * data[idx + 2]) / 255;
  }

  const positions: number[] = [];
  const colors: number[] = [];
  const edges: number[] = [];
  const randoms: number[] = [];

  const modelHeight = 1.84;
  const modelWidth = modelHeight * cropAspect;

  for (let y = 1; y < H - 1; y++) {
    for (let x = 1; x < W - 1; x++) {
      const p = y * W + x;
      if (!cleanFg[p]) continue;

      const nx = x / W;
      const ny = y / H;

      // Exact unstretched 3D model coordinates centered slightly left so figure sits dead-center
      const mx = (nx - 0.51) * modelWidth;
      const my = (0.49 - ny) * modelHeight;

      // Smooth 3x3 luminance average
      let smoothLum = 0;
      for (let dy = -1; dy <= 1; dy++) {
        for (let dx = -1; dx <= 1; dx++) {
          smoothLum += lumArr[(y + dy) * W + (x + dx)];
        }
      }
      smoothLum /= 9;

      // Sobel edge detector (highlights glasses rim, watch dial, fingers, blazer lapels)
      const gx = lumArr[p + 1] - lumArr[p - 1];
      const gy = lumArr[p + W] - lumArr[p - W];
      const edge = Math.min(1, Math.hypot(gx, gy) * 3.4);

      const isSilhouetteEdge =
        !cleanFg[p - 1] || !cleanFg[p + 1] || !cleanFg[p - W] || !cleanFg[p + W]
          ? 0.65
          : 0;

      // 2. Sculptural 3D Anatomical Depth Relief (+Z faces viewer)
      const torsoDist = Math.abs(nx - 0.52) / 0.42;
      const torsoZ = Math.cos(Math.min(1, torsoDist) * 1.35) * 0.16 - 0.08;

      const headDx = (nx - 0.475) / 0.185;
      const headDy = (ny - 0.215) / 0.195;
      const headR2 = headDx * headDx + headDy * headDy;
      const headZ = headR2 < 1 ? Math.sqrt(1 - headR2) * 0.23 : 0;

      const handsDx = (nx - 0.445) / 0.21;
      const handsDy = (ny - 0.475) / 0.23;
      const handsZ =
        Math.exp(-(handsDx * handsDx + handsDy * handsDy) * 1.65) * 0.25;

      const browDx = (nx - 0.445) / 0.09;
      const browDy = (ny - 0.225) / 0.065;
      const browZ =
        Math.exp(-(browDx * browDx + browDy * browDy) * 1.8) * 0.065;

      const mz = torsoZ + headZ + handsZ + browZ + (smoothLum - 0.35) * 0.12;

      // 3. Studio Color Grading with subtle titanium shadow fill & rim definition
      const idx = p * 4;
      let r = data[idx] / 255;
      let g = data[idx + 1] / 255;
      let b = data[idx + 2] / 255;

      const rimLift = 0.1 + edge * 0.2 + isSilhouetteEdge * 0.18;
      r = Math.min(1, Math.pow(r, 0.86) * 0.94 + rimLift * 0.95);
      g = Math.min(1, Math.pow(g, 0.86) * 0.94 + rimLift * 0.96);
      b = Math.min(1, Math.pow(b, 0.86) * 0.96 + rimLift * 1.08);

      const bottomFade = ny > 0.88 ? 1 - (ny - 0.88) / 0.12 : 1;

      positions.push(mx, my, mz);
      colors.push(r * bottomFade, g * bottomFade, b * bottomFade);
      edges.push(Math.max(edge, isSilhouetteEdge));
      randoms.push(Math.random());
    }
  }

  return {
    count: positions.length / 3,
    positions: new Float32Array(positions),
    colors: new Float32Array(colors),
    edges: new Float32Array(edges),
    randoms: new Float32Array(randoms),
  };
}

export function PortraitHologram3D({
  imageSrc,
  className,
}: PortraitHologram3DProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [ready, setReady] = useState(false);
  const [pointCount, setPointCount] = useState(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl =
      canvas.getContext("webgl", {
        alpha: true,
        antialias: true,
        premultipliedAlpha: false,
      }) ??
      (canvas.getContext("experimental-webgl") as WebGLRenderingContext | null);

    if (!gl) return;

    let disposed = false;
    let rafId = 0;

    const vs = compileShader(gl, gl.VERTEX_SHADER, VERTEX_SHADER);
    const fs = compileShader(gl, gl.FRAGMENT_SHADER, FRAGMENT_SHADER);
    if (!vs || !fs) return;

    const program = gl.createProgram();
    if (!program) return;
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return;

    gl.useProgram(program);
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
    gl.enable(gl.DEPTH_TEST);
    gl.depthFunc(gl.LEQUAL);

    let posBuf: WebGLBuffer | null = null;
    let colBuf: WebGLBuffer | null = null;
    let edgeBuf: WebGLBuffer | null = null;
    let rndBuf: WebGLBuffer | null = null;

    let targetRotX = -0.04;
    let targetRotY = 0.12;
    let rotX = -0.04;
    let rotY = 0.42;
    let pointerX = 0;
    let pointerY = 0;
    let targetPtrActive = 0;
    let ptrActive = 0;
    let dragging = false;
    let dragLastX = 0;
    let dragLastY = 0;
    let dragOffsetY = 0;
    let dragOffsetX = 0;
    let shockX = 0;
    let shockY = 0;
    let shockStart = -10;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = canvas.getBoundingClientRect();
      const w = Math.max(1, Math.round(rect.width * dpr));
      const h = Math.max(1, Math.round(rect.height * dpr));
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
      }
      gl.viewport(0, 0, canvas.width, canvas.height);
    };
    resize();

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    const onPointerMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      const aspect = rect.width / Math.max(1, rect.height);
      const nx = ((e.clientX - rect.left) / Math.max(1, rect.width)) * 2 - 1;
      const ny = 1 - ((e.clientY - rect.top) / Math.max(1, rect.height)) * 2;
      pointerX = nx * aspect * 0.9;
      pointerY = ny * 0.92;
      targetPtrActive = 1;

      if (dragging) {
        dragOffsetY += (e.clientX - dragLastX) * 0.008;
        dragOffsetX += (e.clientY - dragLastY) * 0.006;
        dragOffsetY = Math.max(-0.68, Math.min(0.68, dragOffsetY));
        dragOffsetX = Math.max(-0.38, Math.min(0.38, dragOffsetX));
        dragLastX = e.clientX;
        dragLastY = e.clientY;
      }

      targetRotY = nx * 0.34 + dragOffsetY;
      targetRotX = -ny * 0.22 + dragOffsetX;
    };

    const onPointerLeave = () => {
      targetPtrActive = 0;
      dragging = false;
      dragOffsetX *= 0.5;
      dragOffsetY *= 0.5;
      targetRotX = -0.03;
      targetRotY = 0.08;
    };

    const onPointerDown = (e: PointerEvent) => {
      dragging = true;
      dragLastX = e.clientX;
      dragLastY = e.clientY;
      const rect = canvas.getBoundingClientRect();
      const aspect = rect.width / Math.max(1, rect.height);
      shockX =
        (((e.clientX - rect.left) / Math.max(1, rect.width)) * 2 - 1) *
        aspect *
        0.88;
      shockY =
        (1 - ((e.clientY - rect.top) / Math.max(1, rect.height)) * 2) * 0.9;
      shockStart = performance.now() / 1000;
    };

    const onPointerUp = () => {
      dragging = false;
    };

    canvas.addEventListener("pointermove", onPointerMove, { passive: true });
    canvas.addEventListener("pointerleave", onPointerLeave, { passive: true });
    canvas.addEventListener("pointerdown", onPointerDown, { passive: true });
    window.addEventListener("pointerup", onPointerUp, { passive: true });

    const img = new window.Image();
    img.crossOrigin = "anonymous";
    img.src = imageSrc;

    img.onload = () => {
      if (disposed) return;
      const cloud = buildPointCloudData(img);
      if (!cloud) return;

      setPointCount(cloud.count);
      setReady(true);

      const bindAttr = (
        data: Float32Array,
        name: string,
        size: number,
      ): WebGLBuffer | null => {
        const buf = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, buf);
        gl.bufferData(gl.ARRAY_BUFFER, data, gl.STATIC_DRAW);
        const loc = gl.getAttribLocation(program, name);
        if (loc >= 0) {
          gl.enableVertexAttribArray(loc);
          gl.vertexAttribPointer(loc, size, gl.FLOAT, false, 0, 0);
        }
        return buf;
      };

      posBuf = bindAttr(cloud.positions, "aPosition", 3);
      colBuf = bindAttr(cloud.colors, "aColor", 3);
      edgeBuf = bindAttr(cloud.edges, "aEdge", 1);
      rndBuf = bindAttr(cloud.randoms, "aRandom", 1);

      const uTime = gl.getUniformLocation(program, "uTime");
      const uRotation = gl.getUniformLocation(program, "uRotation");
      const uPointer = gl.getUniformLocation(program, "uPointer");
      const uPointerActive = gl.getUniformLocation(program, "uPointerActive");
      const uShockwave = gl.getUniformLocation(program, "uShockwave");
      const uDpr = gl.getUniformLocation(program, "uDpr");
      const uViewportHeight = gl.getUniformLocation(program, "uViewportHeight");
      const uAspect = gl.getUniformLocation(program, "uAspect");
      const uAssemble = gl.getUniformLocation(program, "uAssemble");

      const startTime = performance.now() / 1000;
      let assemble = 0;

      const render = () => {
        if (disposed) return;
        const now = performance.now() / 1000;
        const t = now - startTime;

        assemble = Math.min(1, assemble + (1 - assemble) * 0.068 + 0.004);

        const idleY =
          targetPtrActive < 0.1 ? Math.sin(t * 0.72) * 0.17 : targetRotY;
        const idleX =
          targetPtrActive < 0.1 ? Math.cos(t * 0.52) * 0.06 - 0.03 : targetRotX;

        rotX += (idleX - rotX) * 0.08;
        rotY += (idleY - rotY) * 0.08;
        ptrActive += (targetPtrActive - ptrActive) * 0.09;

        gl.clearColor(0, 0, 0, 0);
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        const aspect = canvas.width / Math.max(1, canvas.height);

        gl.uniform1f(uTime, t);
        gl.uniform2f(uRotation, rotX, rotY);
        gl.uniform2f(uPointer, pointerX, pointerY);
        gl.uniform1f(uPointerActive, ptrActive);
        gl.uniform3f(
          uShockwave,
          shockX,
          shockY,
          shockStart > 0 ? now - shockStart : -1,
        );
        gl.uniform1f(uDpr, dpr);
        gl.uniform1f(uViewportHeight, canvas.height / dpr);
        gl.uniform1f(uAspect, aspect);
        gl.uniform1f(uAssemble, assemble);

        gl.drawArrays(gl.POINTS, 0, cloud.count);
        rafId = requestAnimationFrame(render);
      };

      rafId = requestAnimationFrame(render);
    };

    return () => {
      disposed = true;
      cancelAnimationFrame(rafId);
      ro.disconnect();
      canvas.removeEventListener("pointermove", onPointerMove);
      canvas.removeEventListener("pointerleave", onPointerLeave);
      canvas.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("pointerup", onPointerUp);
      if (posBuf) gl.deleteBuffer(posBuf);
      if (colBuf) gl.deleteBuffer(colBuf);
      if (edgeBuf) gl.deleteBuffer(edgeBuf);
      if (rndBuf) gl.deleteBuffer(rndBuf);
      gl.deleteProgram(program);
      gl.deleteShader(vs);
      gl.deleteShader(fs);
    };
  }, [imageSrc]);

  return (
    <div
      data-cursor="ORBIT / PULSE"
      className={cn(
        "relative w-full h-full bg-[#07070b] overflow-hidden select-none cursor-grab active:cursor-grabbing",
        className,
      )}
    >
      {/* Volumetric chamber lighting & scanline grid */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_38%,rgba(255,88,42,0.16),rgba(255,181,71,0.05)_42%,transparent_75%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-20 bg-[linear-gradient(to_bottom,rgba(255,255,255,0.06)_1px,transparent_1px)] bg-[length:100%_4px]"
      />

      {/* WebGL Volumetric Point-Cloud Stage */}
      <canvas ref={canvasRef} className="relative z-10 w-full h-full block" />

      {/* Top-Left Live Point-Cloud Telemetry */}
      <div className="pointer-events-none absolute top-3 left-3.5 z-20 flex items-center gap-2 px-2.5 py-1 rounded-full bg-black/55 backdrop-blur-md border border-white/10 font-mono text-[9px] uppercase tracking-[0.16em] text-white/75">
        <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
        <span>
          {ready
            ? `${pointCount.toLocaleString()} PTS // 3D LIDAR`
            : "SCANNING..."}
        </span>
      </div>
    </div>
  );
}
