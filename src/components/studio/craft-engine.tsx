"use client";
import { useRef, type PointerEvent } from "react";

/** Original SVG sculpture. CSS owns animation; pointer events only update transforms. */
export function CraftEngine() {
  const card = useRef<HTMLDivElement>(null);
  function move(event: PointerEvent<HTMLDivElement>) {
    if (
      event.pointerType !== "mouse" ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    )
      return;
    const bounds = event.currentTarget.getBoundingClientRect();
    card.current?.style.setProperty(
      "--tilt-x",
      `${((event.clientY - bounds.top) / bounds.height - 0.5) * -9}deg`,
    );
    card.current?.style.setProperty(
      "--tilt-y",
      `${((event.clientX - bounds.left) / bounds.width - 0.5) * 9}deg`,
    );
  }
  function reset() {
    card.current?.style.setProperty("--tilt-x", "0deg");
    card.current?.style.setProperty("--tilt-y", "0deg");
  }
  return (
    <div className="engine-wrap" onPointerMove={move} onPointerLeave={reset}>
      <div className="engine" ref={card}>
        <div className="engine-top">
          <span>
            <i /> THE CRAFT ENGINE
          </span>
          <span>FIG. 001</span>
        </div>
        <svg
          className="engine-art"
          viewBox="0 0 500 440"
          fill="none"
          role="img"
          aria-label="An original rotating orange orbital sculpture, representing ideas becoming software"
        >
          <defs>
            <linearGradient
              id="orbital"
              x1="100"
              y1="80"
              x2="390"
              y2="350"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#ffba7b" />
              <stop offset=".45" stopColor="#ff6b35" />
              <stop offset="1" stopColor="#ca3813" />
            </linearGradient>
            <radialGradient id="halo">
              <stop stopColor="#f46535" stopOpacity=".15" />
              <stop offset="1" stopColor="#f46535" stopOpacity="0" />
            </radialGradient>
          </defs>
          <circle cx="250" cy="216" r="205" fill="url(#halo)" />
          <g stroke="#ffffff" strokeOpacity=".08">
            {Array.from({ length: 9 }, (_, i) => (
              <path key={i} d={`M ${-200 + i * 110} 440 L 250 290`} />
            ))}
            {[315, 335, 365, 405, 439].map((y) => (
              <path key={y} d={`M 0 ${y} H 500`} />
            ))}
          </g>
          <g className="orbital-group" stroke="url(#orbital)" strokeWidth="1.6">
            {Array.from({ length: 24 }, (_, i) => (
              <ellipse
                key={i}
                cx="250"
                cy="213"
                rx={35 + Math.sin((i / 23) * Math.PI) * 123}
                ry="158"
                transform={`rotate(${i * 7.5} 250 213)`}
              />
            ))}
          </g>
          <g stroke="#f4f0e8" strokeWidth="1" opacity=".5">
            <path d="M34 72h18m-9-9v18M449 348h18m-9-9v18" />
            <circle cx="420" cy="112" r="4" />
            <path d="M391 113h19M420 122v19" />
          </g>
          <circle className="orbit-dot" cx="250" cy="28" r="6" fill="#e9efb4" />
        </svg>
        <div className="engine-bottom">
          <span>
            IDEA <b>→</b> ITERATE <b>→</b> CRAFT
          </span>
          <span>EST. 2022</span>
        </div>
      </div>
      <div className="engine-sticker">
        <span className="sticker-star">✳</span>
        <span>
          LESS NOISE.
          <br />
          MORE CRAFT.
        </span>
      </div>
    </div>
  );
}
