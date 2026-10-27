"use client";
import { useState } from "react";
import Image from "next/image";
import { Orbit, Radio } from "lucide-react";
import portrait from "@/src/assets/images/profile.jpg";
import { OrbitalWorld } from "./orbital-world";
import type { FieldMode } from "@/src/lib/orbital-physics";
import { profile } from "@/src/content/portfolio";

export function CraftEngine() {
  const [mode, setMode] = useState<FieldMode>("orbit");
  const [pulse, setPulse] = useState(0);
  return (
    <div className="world-scene">
      <OrbitalWorld mode={mode} pulse={pulse} />
      <div className="world-coordinate">
        <span className="live-light" />N / C · ORBITAL OBSERVATORY
        <span>01 — A WORLD IN MOTION</span>
      </div>
      <div className="world-portrait">
        <Image
          src={portrait}
          alt="Portrait of Nirav Chavda"
          sizes="(max-width: 760px) 88px, 120px"
          priority
        />
        <div>
          <span>THE HUMAN IN THE LOOP</span>
          <strong>{profile.name}</strong>
          <span>
            {profile.role} · {profile.company}
          </span>
        </div>
      </div>
      <div className="world-controls" aria-label="Orbital simulation controls">
        <button
          aria-pressed={mode === "orbit"}
          onClick={() => setMode("orbit")}
        >
          <Orbit size={15} />
          Orbit
        </button>
        <button
          aria-pressed={mode === "binary"}
          onClick={() => setMode("binary")}
        >
          Binary field
        </button>
        <button onClick={() => setPulse((value) => value + 1)}>
          <Radio size={15} />
          Send a pulse
        </button>
      </div>
      <div className="world-caption" aria-live="polite">
        {mode === "orbit"
          ? "ONE CENTER. INFINITE POSSIBILITIES."
          : "TWO CENTERS. A NEW EQUILIBRIUM."}
        <span>Explore the field. Change its gravity.</span>
      </div>
    </div>
  );
}
